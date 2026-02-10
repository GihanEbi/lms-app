import { describe, it, expect, beforeEach } from "vitest";
import { GET as GET_ROUTE, POST } from "./route";
import { PUT, DELETE } from "./[id]/route";
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

    // 2. Create User (Admin/Staff)
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

    // 3. Create Degree Certificate
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
    const permissionsNeeded = [
      { name: "Get Instructors", code: AccessConstants.INSTRUCTOR_GET },
      {
        name: "Edit Instructors",
        code: AccessConstants.INSTRUCTOR_CREATE_EDIT,
      },
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
  async function createTestInstructor(isPublic = true) {
    const uniqueTime = Date.now();
    const req = new NextRequest(BASE_URL, {
      method: "POST",
      headers: isPublic
        ? {}
        : {
            "x-user-id": testUserId.toString(),
            "x-group-id": testGroupId.toString(),
          },
      body: JSON.stringify({
        full_name: "Professor Xavier",
        email: `profx_${uniqueTime}@test.com`,
        password: "SecurePassword123!",
        phone_number: `${uniqueTime}`.slice(0, 10),
        highest_degree_certificate_id: testDegreeId,
        years_of_experience: 15,
        date_of_birth: "1970-01-01",
        address: "1407 Graymalkin Lane",
      }),
    });

    if (!isPublic) {
      req.headers.set("x-group-id", testGroupId.toString());
    }

    const res = await POST(req);
    const json = await res.json();

    if (!res.ok) throw new Error(json.message || "Failed to create instructor");
    return json.data;
  }

  // --- TEST 1: CREATE (PUBLIC) ---
  it("should create a new instructor successfully without login", async () => {
    const inst = await createTestInstructor(true);

    expect(inst.id).toBeDefined();
    expect(inst.full_name).toBe("Professor Xavier");
    expect(inst.email).toContain("@test.com");

    const dbRecord = await db
      .select()
      .from(instructors)
      .where(eq(instructors.id, inst.id))
      .limit(1);

    expect(dbRecord[0].user_created).toBeNull();
  });

  // --- TEST 2: READ SINGLE (Query Param) ---
  it("should get a single instructor by query param ID", async () => {
    const inst = await createTestInstructor();

    // 🔄 Using strict query param structure
    const req = new NextRequest(`${BASE_URL}?instructor_id=${inst.id}`, {
      method: "GET",
    });

    req.headers.set("x-user-id", testUserId.toString());
    req.headers.set("x-group-id", testGroupId.toString());

    const res = await GET_ROUTE(req);
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.data.full_name).toBe(inst.full_name);
    expect(body.data.highest_degree_name).toBeDefined();
  });

  // --- TEST 3: UPDATE ---
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
        email: inst.email,
        phone_number: "0987654321",
        highest_degree_certificate_id: testDegreeId,
        years_of_experience: 20,
        date_of_birth: "1960-01-01",
        address: "Genosha",
        is_active: false,
      }),
    });

    const params = Promise.resolve({ id: inst.id.toString() });
    const res = await PUT(req, { params });
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.data.full_name).toBe("Professor Magneto");
    expect(body.data.is_active).toBe(false);
  });

  // --- TEST 4: DUPLICATE CHECK ---
  it("should fail to create instructor with duplicate email", async () => {
    const inst = await createTestInstructor();

    const req = new NextRequest(BASE_URL, {
      method: "POST",
      headers: {},
      body: JSON.stringify({
        full_name: "Copycat",
        email: inst.email,
        password: "Password123!",
        phone_number: "1112223333",
        highest_degree_certificate_id: testDegreeId,
        years_of_experience: 1,
        date_of_birth: "1990-01-01",
        address: "Street",
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(409);
  });

  // --- TEST 5: DELETE ---
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
