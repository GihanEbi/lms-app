import { describe, it, expect, beforeEach } from "vitest";
import { GET as GET_LIST, POST } from "./route";
import { PUT, DELETE } from "./[id]/route";
import { NextRequest } from "next/server";
import { db } from "@/db";
import {
  subjects,
  subjectCategories,
  users,
  userGroups,
  rules,
  groupRules,
} from "@/db/schema";
import { eq } from "drizzle-orm";
import { AccessConstants } from "@/src/constants/AccessConstants";

const BASE_URL = "http://localhost:3000/api/admin/settings/subjects";

describe("Subjects API Integration Tests", () => {
  let testUserId: number;
  let testGroupId: number;
  let testCategoryId: number; // We need a category to create a subject

  beforeEach(async () => {
    // 1. Group
    const [group] = await db
      .insert(userGroups)
      .values({ name: `Sub Group ${Date.now()}`, is_active: true })
      .returning();
    testGroupId = group.id;

    // 2. User
    const [user] = await db
      .insert(users)
      .values({
        full_name: "Sub Tester",
        email: `subtester_${Date.now()}@example.com`,
        password_hash: "hashed",
        group_id: testGroupId,
        is_active: true,
      })
      .returning();
    testUserId = user.id;

    // 3. Permissions
    const permissionsNeeded = [
      { name: "Get Subjects", code: AccessConstants.SYSTEM_SETTINGS_GET },
      {
        name: "Create/Edit Subjects",
        code: AccessConstants.SYSTEM_SETTINGS_ADD_EDIT,
      },
      { name: "Delete Subjects", code: AccessConstants.SYSTEM_SETTINGS_DELETE },
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

    // 4. DEPENDENCY: Create a Subject Category
    const [cat] = await db
      .insert(subjectCategories)
      .values({
        subject_category_name: `Science Cat ${Date.now()}`,
        description: "Test Category",
        user_created: testUserId,
      })
      .returning();
    testCategoryId = cat.id;
  });

  // --- HELPER ---
  async function createTestSubject(customName?: string) {
    const name = customName || `Mathematics ${Date.now()}`;
    const req = new NextRequest(BASE_URL, {
      method: "POST",
      headers: {
        "x-user-id": testUserId.toString(),
        "x-group-id": testGroupId.toString(),
      },
      body: JSON.stringify({
        subject_name: name,
        description: "Math subject",
        subject_category_id: testCategoryId, // Required
      }),
    });
    req.headers.set("x-group-id", testGroupId.toString());

    const res = await POST(req);
    const json = await res.json();
    if (!res.ok) throw new Error(json.message);
    return json.data;
  }

  // --- TEST 1: CREATE ---
  it("should create a new subject", async () => {
    const sub = await createTestSubject();
    expect(sub.id).toBeDefined();
    expect(sub.subject_name).toContain("Mathematics");
    expect(sub.subject_category_id).toBe(testCategoryId);
    expect(sub.is_active).toBe(true);
  });

  // --- TEST 2: LIST ---
  it("should list subjects", async () => {
    const sub = await createTestSubject();
    const req = new NextRequest(`${BASE_URL}?pageNo=1&pageSize=10`, {
      method: "GET",
    });
    req.headers.set("x-user-id", testUserId.toString());
    req.headers.set("x-group-id", testGroupId.toString());

    const res = await GET_LIST(req);
    const body = await res.json();
    expect(res.status).toBe(200);
    // Find item
    const found = body.data.data.find((s: any) => s.id === sub.id);
    expect(found).toBeDefined();
    expect(found.category_name).toBeDefined(); // Check join worked
  });

  // --- TEST 3: UPDATE (Success) ---
  it("should update a subject", async () => {
    const sub = await createTestSubject();
    const req = new NextRequest(`${BASE_URL}/${sub.id}`, {
      method: "PUT",
      headers: { "x-user-id": testUserId.toString() },
      body: JSON.stringify({
        subject_name: "Advanced Mathematics",
        description: "Harder math",
        subject_category_id: testCategoryId,
        is_active: false,
      }),
    });
    req.headers.set("x-group-id", testGroupId.toString());

    const params = Promise.resolve({ id: sub.id.toString() });
    const res = await PUT(req, { params });
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.data.subject_name).toBe("Advanced Mathematics");
    expect(body.data.is_active).toBe(false);
  });

  // --- TEST 4: DELETE ---
  it("should delete a subject", async () => {
    const sub = await createTestSubject();
    const req = new NextRequest(`${BASE_URL}/${sub.id}`, {
      method: "DELETE",
      headers: { "x-user-id": testUserId.toString() },
    });
    req.headers.set("x-group-id", testGroupId.toString());

    const params = Promise.resolve({ id: sub.id.toString() });
    const res = await DELETE(req, { params });
    expect(res.status).toBe(200);

    const check = await db
      .select()
      .from(subjects)
      .where(eq(subjects.id, sub.id));
    expect(check.length).toBe(0);
  });
});
