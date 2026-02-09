import { describe, it, expect, beforeEach } from "vitest";
import { GET as GET_USERS, POST as CREATE_USER } from "./route";
import { PUT, DELETE } from "./[userId]/route";
import { NextRequest } from "next/server";
import { db } from "@/db";
import { users, userGroups, rules, groupRules } from "@/db/schema";
import { eq } from "drizzle-orm";
import { AccessConstants } from "@/src/constants/AccessConstants";

const BASE_URL = "http://localhost:3000/api/users";

describe("Users API Integration Tests", () => {
  let bootstrapGroupId: number;
  let testCreatorId: number;

  beforeEach(async () => {
    // 1. Group
    const [group] = await db
      .insert(userGroups)
      .values({
        name: `User Test Group ${Date.now()}`,
        is_active: true,
      })
      .returning();
    bootstrapGroupId = group.id;

    // 2. User
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

    // 3. Permissions
    const permissionsNeeded = [
      { name: "Get Users", code: AccessConstants.USER_GET },
      { name: "Create/Edit Users", code: AccessConstants.USER_CREATE_EDIT },
      { name: "Delete Users", code: AccessConstants.USER_DELETE },
    ];

    const insertedPerms = await db
      .insert(rules)
      .values(
        permissionsNeeded.map((p) => ({
          name: p.name,
          code: p.code,
          user_created: testCreatorId,
        })),
      )
      .returning();

    await db.insert(groupRules).values(
      insertedPerms.map((perm) => ({
        group_id: bootstrapGroupId,
        rule_id: perm.id,
      })),
    );
  });

  // --- HELPER: Create a fresh user for testing ---
  async function createTestUser() {
    const uniqueEmail = `testuser_${Date.now()}@example.com`;
    const req = new NextRequest(BASE_URL, {
      method: "POST",
      headers: {
        "x-user-id": testCreatorId.toString(),
        "x-group-id": bootstrapGroupId.toString(),
      },
      body: JSON.stringify({
        full_name: "Integration Test User",
        email: uniqueEmail,
        password: "securePassword123",
        group_id: bootstrapGroupId,
        phone_no: "1234567890", // Valid phone
      }),
    });

    req.headers.set("x-group-id", bootstrapGroupId.toString());

    const res = await CREATE_USER(req);
    const json = await res.json();

    if (!res.ok) throw new Error(json.message || "Failed to create test user");
    return json.data;
  }

  // --- TEST 1: CREATE USER ---
  it("should create a new user successfully", async () => {
    const newUser = await createTestUser();

    expect(newUser.id).toBeDefined();
    expect(newUser.full_name).toBe("Integration Test User");
    expect(newUser.password_hash).toBeUndefined();
    expect(newUser.user_created).toBe(testCreatorId);
  });

  // --- TEST 2: LIST USERS ---
  it("should list users with pagination", async () => {
    const user = await createTestUser();

    const url = `${BASE_URL}?pageNo=1&pageSize=10`;
    const req = new NextRequest(url, { method: "GET" });
    req.headers.set("x-user-id", testCreatorId.toString());
    req.headers.set("x-group-id", bootstrapGroupId.toString());

    const response = await GET_USERS(req);
    const body = await response.json();

    expect(response.status).toBe(200);
    const found = body.data.data.find((u: any) => u.id === user.id);
    expect(found).toBeDefined();
    expect(found.email).toBe(user.email);
  });

  // --- TEST 3: SEARCH USER ---
  it("should search for a user by name", async () => {
    await createTestUser();

    const url = `${BASE_URL}?pageNo=1&pageSize=10&searchValue=Integration`;
    const req = new NextRequest(url, { method: "GET" });
    req.headers.set("x-user-id", testCreatorId.toString());
    req.headers.set("x-group-id", bootstrapGroupId.toString());

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
      headers: {
        "x-user-id": testCreatorId.toString(),
        "x-group-id": bootstrapGroupId.toString(),
      },
      body: JSON.stringify({
        full_name: "Updated Name",
        email: user.email,
        group_id: bootstrapGroupId,
        is_active: false,
        phone_no: "0987654321",
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
      headers: {
        "x-user-id": testCreatorId.toString(),
        "x-group-id": bootstrapGroupId.toString(),
      },
    });

    const params = Promise.resolve({ userId: user.id.toString() });
    const response = await DELETE(req, { params });
    const body = await response.json();

    expect(body.success).toBe(true);

    const check = await db.select().from(users).where(eq(users.id, user.id));
    expect(check.length).toBe(0);
  });

  // --- TEST 6: FAIL DUPLICATE EMAIL ---
  // --- TEST 6: FAIL DUPLICATE EMAIL ---
  it("should fail when creating a user with duplicate email", async () => {
    // 1. Create first user
    const firstUser = await createTestUser();

    // 2. Try creating another with SAME email
    const req = new NextRequest(BASE_URL, {
      method: "POST",
      headers: {
        "x-user-id": testCreatorId.toString(),
        "x-group-id": bootstrapGroupId.toString(),
      },
      body: JSON.stringify({
        full_name: "Copycat User",
        email: firstUser.email, // Duplicate!
        password: "SecurePassword123!", // ✅ FIX: Use a strong password to pass validation
        group_id: bootstrapGroupId,
        phone_no: "1122334455", // Unique phone to ensure only Email fails
      }),
    });

    req.headers.set("x-group-id", bootstrapGroupId.toString());

    const response = await CREATE_USER(req);

    // Optional: Log the error if it fails again to see exactly what went wrong
    if (response.status !== 409) {
      const json = await response.json();
      console.log("Unexpected Error Response:", json);
    }

    expect(response.status).toBe(409); // Conflict
  });
});
