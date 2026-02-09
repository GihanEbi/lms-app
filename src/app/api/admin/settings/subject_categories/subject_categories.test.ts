import { describe, it, expect, beforeEach } from "vitest";
import { GET as GET_LIST, POST } from "./route";
import { PUT, DELETE, GET as GET_SINGLE } from "./[id]/route";
import { NextRequest } from "next/server";
import { db } from "@/db";
import {
  subjectCategories,
  users,
  userGroups,
  rules,
  groupRules,
} from "@/db/schema";
import { eq } from "drizzle-orm";
import { AccessConstants } from "@/src/constants/AccessConstants";

const BASE_URL = "http://localhost:3000/api/admin/settings/subject_categories";

describe("Subject Categories API Integration Tests", () => {
  let testUserId: number;
  let testGroupId: number;

  beforeEach(async () => {
    // 1. Group
    const [group] = await db
      .insert(userGroups)
      .values({ name: `SubCat Group ${Date.now()}`, is_active: true })
      .returning();
    testGroupId = group.id;

    // 2. User
    const [user] = await db
      .insert(users)
      .values({
        full_name: "SubCat Tester",
        email: `subcattester_${Date.now()}@example.com`,
        password_hash: "hashed",
        group_id: testGroupId,
        is_active: true,
      })
      .returning();
    testUserId = user.id;

    // 3. Permissions
    const permissionsNeeded = [
      { name: "Get SubCats", code: AccessConstants.SYSTEM_SETTINGS_GET },
      {
        name: "Create/Edit SubCats",
        code: AccessConstants.SYSTEM_SETTINGS_ADD_EDIT,
      },
      { name: "Delete SubCats", code: AccessConstants.SYSTEM_SETTINGS_DELETE },
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
  async function createTestCategory(customName?: string) {
    const name = customName || `Physics ${Date.now()}`;
    const req = new NextRequest(BASE_URL, {
      method: "POST",
      headers: {
        "x-user-id": testUserId.toString(),
        "x-group-id": testGroupId.toString(),
      },
      body: JSON.stringify({
        subject_category_name: name,
        description: "Science category",
      }),
    });
    req.headers.set("x-group-id", testGroupId.toString());

    const res = await POST(req);
    const json = await res.json();
    if (!res.ok) throw new Error(json.message);
    return json.data;
  }

  // --- TEST 1: CREATE ---
  it("should create a new category", async () => {
    const cat = await createTestCategory();
    expect(cat.id).toBeDefined();
    expect(cat.subject_category_name).toContain("Physics");
    expect(cat.is_active).toBe(true);
  });

  // --- TEST 2: LIST ---
  it("should list categories", async () => {
    const cat = await createTestCategory();
    const req = new NextRequest(`${BASE_URL}?pageNo=1&pageSize=10`, {
      method: "GET",
    });
    req.headers.set("x-user-id", testUserId.toString());
    req.headers.set("x-group-id", testGroupId.toString());

    const res = await GET_LIST(req);
    const body = await res.json();
    expect(res.status).toBe(200);
    expect(body.data.data.find((c: any) => c.id === cat.id)).toBeDefined();
  });

  // --- TEST 3: UPDATE (Success) ---
  it("should update a category", async () => {
    const cat = await createTestCategory();
    const req = new NextRequest(`${BASE_URL}/${cat.id}`, {
      method: "PUT",
      headers: { "x-user-id": testUserId.toString() },
      body: JSON.stringify({
        subject_category_name: "Quantum Physics",
        description: "Advanced",
        is_active: false,
      }),
    });
    req.headers.set("x-group-id", testGroupId.toString());

    const params = Promise.resolve({ id: cat.id.toString() });
    const res = await PUT(req, { params });
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.data.subject_category_name).toBe("Quantum Physics");
    expect(body.data.is_active).toBe(false);
  });

  // --- TEST 4: UPDATE (Duplicate Fail) ---
  it("should fail duplicate name on update", async () => {
    const catA = await createTestCategory("Biology");
    const catB = await createTestCategory("Chemistry");

    const req = new NextRequest(`${BASE_URL}/${catA.id}`, {
      method: "PUT",
      headers: { "x-user-id": testUserId.toString() },
      body: JSON.stringify({
        subject_category_name: "Chemistry", // Duplicate
        is_active: true,
      }),
    });
    req.headers.set("x-group-id", testGroupId.toString());

    const params = Promise.resolve({ id: catA.id.toString() });
    const res = await PUT(req, { params });
    expect(res.status).toBe(409);
  });

  // --- TEST 5: DELETE ---
  it("should delete a category", async () => {
    const cat = await createTestCategory();
    const req = new NextRequest(`${BASE_URL}/${cat.id}`, {
      method: "DELETE",
      headers: { "x-user-id": testUserId.toString() },
    });
    req.headers.set("x-group-id", testGroupId.toString());

    const params = Promise.resolve({ id: cat.id.toString() });
    const res = await DELETE(req, { params });
    expect(res.status).toBe(200);

    const check = await db
      .select()
      .from(subjectCategories)
      .where(eq(subjectCategories.id, cat.id));
    expect(check.length).toBe(0);
  });
});
