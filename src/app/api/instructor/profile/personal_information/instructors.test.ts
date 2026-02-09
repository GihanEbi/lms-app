import { describe, it, expect, beforeEach } from "vitest";
import { GET as GET_LIST, POST } from "./route";
import { PUT, DELETE, GET as GET_SINGLE } from "./[id]/route";
import { NextRequest } from "next/server";
import { db } from "@/db";
import {
  instructors,
  degreeCertificate,
  users,
  userGroups,
  rules,
  groupRules,
} from "@/db/schema";
import { eq } from "drizzle-orm";
import { AccessConstants } from "@/src/constants/AccessConstants";

const BASE_URL = "http://localhost:3000/api/instructors";

describe("Instructors API Integration Tests", () => {
  let testUserId: number;
  let testGroupId: number;
  let testDegreeId: number;

  // --- SETUP ---
  beforeEach(async () => {
    // 1. Create Group
    const [group] = await db
      .insert(userGroups)
      .values({ name: `Inst Group ${Date.now()}`, is_active: true })
      .returning();
    testGroupId = group.id;

    // 2. Create User
    const [user] = await db
      .insert(users)
      .values({
        full_name: "Inst Tester",
        email: `insttester_${Date.now()}@example.com`,
        password_hash: "hashed",
        group_id: testGroupId,
        is_active: true,
      })
      .returning();
    testUserId = user.id;

    // 3. Create Degree Certificate (Dependency)
    const [degree] = await db
      .insert(degreeCertificate)
      .values({
        degree_certificate_name: `PhD ${Date.now()}`,
        description: "Doctorate",
        user_created: testUserId,
      })
      .returning();
    testDegreeId = degree.id;

    // 4. Permissions
    // Note: Your POST uses INSTRUCTOR_CREATE_EDIT, but PUT uses INSTRUCTOR_EDIT.
    // We verify both exist to avoid 403 errors.
    const permissionsNeeded = [
      { name: "Get Instructors", code: AccessConstants.INSTRUCTOR_GET },
      {
        name: "Create Instructors",
        code: AccessConstants.INSTRUCTOR_EDIT,
      },
      { name: "Edit Instructors", code: AccessConstants.INSTRUCTOR_EDIT },
      { name: "Delete Instructors", code: AccessConstants.INSTRUCTOR_DELETE },
    ];

    const insertedPerms = await db
      .insert(rules)
      .values(
        permissionsNeeded.map((p) => ({ ...p, user_created: testUserId })),
      )
      .returning();

    await db
      .insert(groupRules)
      .values(
        insertedPerms.map((p) => ({ group_id: testGroupId, rule_id: p.id })),
      );
  });

  // --- HELPER ---
  async function createTestInstructor() {
    const uniqueTime = Date.now();
    const req = new NextRequest(BASE_URL, {
      method: "POST",
      headers: {
        "x-user-id": testUserId.toString(),
        "x-group-id": testGroupId.toString(),
      },
      body: JSON.stringify({
        full_name: "Professor Xavier",
        email: `profx_${uniqueTime}@test.com`,
        password: "SecurePassword123!",
        phone_number: `${uniqueTime}`.slice(0, 10), // Ensure 10 digits
        highest_degree_certificate_id: testDegreeId,
        years_of_experience: 15,
        date_of_birth: "1970-01-01", // ISO Format
        address: "1407 Graymalkin Lane",
      }),
    });

    req.headers.set("x-group-id", testGroupId.toString());

    const res = await POST(req);
    const json = await res.json();

    if (!res.ok) throw new Error(json.message || "Failed to create instructor");
    return json.data;
  }

  // --- TEST 1: CREATE ---
  it("should create a new instructor successfully", async () => {
    const inst = await createTestInstructor();

    expect(inst.id).toBeDefined();
    expect(inst.full_name).toBe("Professor Xavier");
    expect(inst.email).toContain("@test.com");
    // Verify DB insertion
    const dbRecord = await db
      .select()
      .from(instructors)
      .where(eq(instructors.id, inst.id))
      .limit(1);
    expect(dbRecord[0].user_created).toBe(testUserId);
    expect(dbRecord[0].code).toBeDefined(); // Check generated column
  });

  // --- TEST 2: READ LIST ---
  it("should get a list of instructors", async () => {
    const inst = await createTestInstructor();

    const req = new NextRequest(`${BASE_URL}?pageNo=1&pageSize=10`, {
      method: "GET",
    });
    req.headers.set("x-user-id", testUserId.toString());
    req.headers.set("x-group-id", testGroupId.toString());

    const res = await GET_LIST(req);
    const body = await res.json();

    expect(res.status).toBe(200);
    const found = body.data.data.find((i: any) => i.id === inst.id);
    expect(found).toBeDefined();
    // Check if the join worked (degree name should be present)
    expect(found.highest_degree_name).toBeDefined();
  });

  // --- TEST 3: READ SINGLE ---
  it("should get a single instructor by ID", async () => {
    const inst = await createTestInstructor();

    const req = new NextRequest(`${BASE_URL}/${inst.id}`, { method: "GET" });
    req.headers.set("x-user-id", testUserId.toString());
    req.headers.set("x-group-id", testGroupId.toString());

    const params = Promise.resolve({ id: inst.id.toString() });
    const res = await GET_SINGLE(req, { params });
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.data.full_name).toBe(inst.full_name);
  });

  // --- TEST 4: UPDATE ---
  it("should update an instructor", async () => {
    const inst = await createTestInstructor();

    const req = new NextRequest(`${BASE_URL}/${inst.id}`, {
      method: "PUT",
      headers: {
        "x-user-id": testUserId.toString(),
        "x-group-id": testGroupId.toString(),
      },
      body: JSON.stringify({
        full_name: "Professor Magneto",
        email: inst.email, // Keep email same
        phone_number: "0987654321", // New phone
        highest_degree_certificate_id: testDegreeId,
        years_of_experience: 20,
        date_of_birth: "1960-01-01",
        address: "Genosha",
        is_active: false, // Joi schema requires is_active on update
      }),
    });

    const params = Promise.resolve({ id: inst.id.toString() });
    const res = await PUT(req, { params });
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.data.full_name).toBe("Professor Magneto");
    expect(body.data.is_active).toBe(false);
  });

  // --- TEST 5: DUPLICATE CHECK ---
  it("should fail to create instructor with duplicate email", async () => {
    const inst = await createTestInstructor();

    const req = new NextRequest(BASE_URL, {
      method: "POST",
      headers: { "x-user-id": testUserId.toString() },
      body: JSON.stringify({
        full_name: "Copycat",
        email: inst.email, // Duplicate Email
        password: "Password123!",
        phone_number: "1112223333", // Unique phone
        highest_degree_certificate_id: testDegreeId,
        years_of_experience: 1,
        date_of_birth: "1990-01-01",
        address: "Street",
      }),
    });
    req.headers.set("x-group-id", testGroupId.toString());

    const res = await POST(req);
    expect(res.status).toBe(409); // Conflict
  });

  // --- TEST 6: DELETE ---
  it("should delete an instructor", async () => {
    const inst = await createTestInstructor();

    const req = new NextRequest(`${BASE_URL}/${inst.id}`, {
      method: "DELETE",
      headers: {
        "x-user-id": testUserId.toString(),
        "x-group-id": testGroupId.toString(),
      },
    });

    const params = Promise.resolve({ id: inst.id.toString() });
    const res = await DELETE(req, { params });
    const body = await res.json();

    expect(body.success).toBe(true);

    const check = await db
      .select()
      .from(instructors)
      .where(eq(instructors.id, inst.id));
    expect(check.length).toBe(0);
  });
});
