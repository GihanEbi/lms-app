import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { GET as GET_USERS, POST as CREATE_USER } from "./route";
import { PUT, DELETE } from "./[userId]/route";
import { NextRequest } from "next/server";
import { db } from "@/db";
import { users, userGroups } from "@/db/schema";
import { eq } from "drizzle-orm";

const BASE_URL = "http://localhost:3000/api/users";

describe("Users API Integration Tests", () => {
  let bootstrapGroupId: number;
  let testCreatorId: number; // The ID of the admin running the tests

  // --- SETUP: Create Group & Creator User ---
  beforeEach(async () => {
    // 1. Create a Group (Users cannot exist without a group)
    const [group] = await db
      .insert(userGroups)
      .values({
        name: `User Test Group ${Date.now()}`,
        is_active: true,
      })
      .returning();
    bootstrapGroupId = group.id;

    // 2. Create an "Admin" User to be the 'user_created' reference
    const [admin] = await db
      .insert(users)
      .values({
        full_name: "User Creator Admin",
        email: `admin_${Date.now()}@example.com`,
        password_hash: "hashed_secret",
        group_id: bootstrapGroupId,
        is_active: true,
      })
      .returning();
    testCreatorId = admin.id;
  });

  // --- HELPER: Create a fresh user for testing ---
  async function createTestUser() {
    const uniqueEmail = `testuser_${Date.now()}@example.com`;
    const req = new NextRequest(BASE_URL, {
      method: "POST",
      headers: { "x-user-id": testCreatorId.toString() },
      body: JSON.stringify({
        full_name: "Integration Test User",
        email: uniqueEmail,
        password: "securePassword123", // API should hash this
        group_id: bootstrapGroupId,
        is_active: true,
      }),
    });
    const res = await CREATE_USER(req);
    return await res.json();
  }

  // --- TEST 1: CREATE USER ---
  it("should create a new user successfully", async () => {
    const newUser = await createTestUser();

    expect(newUser.id).toBeDefined();
    expect(newUser.full_name).toBe("Integration Test User");
    expect(newUser.password_hash).toBeUndefined(); // Security check: never return hash
    expect(newUser.user_created).toBe(testCreatorId); // Audit check
  });

  // --- TEST 2: LIST USERS ---
  it("should list users with pagination", async () => {
    const user = await createTestUser();

    const url = `${BASE_URL}?pageNo=1&pageSize=10`;
    const req = new NextRequest(url, { method: "GET" });

    const response = await GET_USERS(req);
    const body = await response.json();

    expect(response.status).toBe(200);
    // Find our specific user
    const found = body.data.data.find((u: any) => u.id === user.id);
    expect(found).toBeDefined();
    expect(found.email).toBe(user.email);
  });

  // --- TEST 3: SEARCH USER ---
  it("should search for a user by name", async () => {
    await createTestUser(); // name is "Integration Test User"

    const url = `${BASE_URL}?pageNo=1&pageSize=10&searchValue=Integration`;
    const req = new NextRequest(url, { method: "GET" });

    const response = await GET_USERS(req);
    const body = await response.json();

    expect(body.data.data.length).toBeGreaterThan(0);
    expect(body.data.data[0].full_name).toContain("Integration");
  });

  // --- TEST 4: UPDATE USER ---
  it("should update an existing user", async () => {
    const user = await createTestUser();

    const req = new NextRequest(`${BASE_URL}/${user.id}`, {
      method: "PUT",
      headers: { "x-user-id": testCreatorId.toString() },
      body: JSON.stringify({
        full_name: "Updated Name",
        email: user.email, // Keep email same
        group_id: bootstrapGroupId,
        is_active: false,
      }),
    });

    const params = Promise.resolve({ userId: user.id.toString() });
    const response = await PUT(req, { params });
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.full_name).toBe("Updated Name");
    expect(body.is_active).toBe(false);
  });

  // --- TEST 5: DELETE USER ---
  it("should delete a user", async () => {
    const user = await createTestUser();

    const req = new NextRequest(`${BASE_URL}/${user.id}`, {
      method: "DELETE",
      headers: { "x-user-id": testCreatorId.toString() },
    });

    const params = Promise.resolve({ userId: user.id.toString() });
    const response = await DELETE(req, { params });
    const body = await response.json();

    expect(body.success).toBe(true);

    // Verify deletion
    const check = await db.select().from(users).where(eq(users.id, user.id));
    expect(check.length).toBe(0);
  });

  // --- TEST 6: FAIL DUPLICATE EMAIL ---
  it("should fail when creating a user with duplicate email", async () => {
    // 1. Create first user
    const firstUser = await createTestUser();

    // 2. Try creating another with SAME email
    const req = new NextRequest(BASE_URL, {
      method: "POST",
      headers: { "x-user-id": testCreatorId.toString() },
      body: JSON.stringify({
        full_name: "Copycat User",
        email: firstUser.email, // Duplicate!
        password: "password",
        group_id: bootstrapGroupId,
      }),
    });

    const response = await CREATE_USER(req);
    expect(response.status).toBe(409); // Conflict
  });
});
