import { describe, it, expect, beforeEach } from "vitest";
import { GET as GET_GROUPS, POST as CREATE_GROUP } from "./route";
import { PUT, DELETE } from "./[groupId]/route";
import {
  GET as GET_GROUP_RULES,
  POST as SYNC_RULES,
} from "./[groupId]/rules/route";
import { NextRequest } from "next/server";
import { db } from "@/db";
import { userGroups, users, rules, groupRules } from "@/db/schema";
import { eq } from "drizzle-orm";
import { AccessConstants } from "@/src/constants/AccessConstants";

const BASE_URL = "http://localhost:3000/api/user_groups";

describe("User Groups API Integration Tests", () => {
  let testUserId: number;
  let bootstrapGroupId: number;

  // --- SETUP ---
  beforeEach(async () => {
    // 1. Bootstrap Group
    const [bootGroup] = await db
      .insert(userGroups)
      .values({
        name: `Bootstrap Group ${Date.now()}`,
        description: "Temporary group",
        is_active: true,
      })
      .returning();
    bootstrapGroupId = bootGroup.id;

    // 2. Bootstrap User
    const [user] = await db
      .insert(users)
      .values({
        full_name: "Group Creator",
        email: `groupcreator_${Date.now()}@example.com`,
        password_hash: "hashed",
        is_active: true,
        group_id: bootstrapGroupId,
      })
      .returning();
    testUserId = user.id;

    // 3. Permissions
    const permissionsNeeded = [
      { name: "Get Groups", code: AccessConstants.USER_GROUP_GET },
      {
        name: "Create/Edit Groups",
        code: AccessConstants.USER_GROUP_CREATE_EDIT,
      },
      { name: "Delete Groups", code: AccessConstants.USER_GROUP_DELETE },
      {
        name: "Get Assigned Rules",
        code: AccessConstants.GET_ASSIGNED_GROUP_RULES,
      },
      { name: "Assign Rules", code: AccessConstants.ASSIGN_GROUP_RULES },
    ];

    const insertedPerms = await db
      .insert(rules)
      .values(
        permissionsNeeded.map((p) => ({
          name: p.name,
          code: p.code,
          user_created: testUserId,
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

  // --- HELPER ---
  async function createTestGroup() {
    const req = new NextRequest(BASE_URL, {
      method: "POST",
      headers: {
        "x-user-id": testUserId.toString(),
        "x-group-id": bootstrapGroupId.toString(),
      },
      body: JSON.stringify({
        name: `Test Group ${Date.now()}`,
        description: "Created by integration test",
        // ❌ REMOVED: is_active: true (Let the DB default handle this)
      }),
    });

    req.headers.set("x-group-id", bootstrapGroupId.toString());

    const res = await CREATE_GROUP(req);
    const json = await res.json();

    if (!res.ok) throw new Error(json.message || "Failed to create group");
    return json.data;
  }

  // --- TEST 1: CREATE ---
  it("should create a new user group successfully", async () => {
    const group = await createTestGroup();
    expect(group.id).toBeDefined();
    expect(group.name).toContain("Test Group");
    expect(group.is_active).toBe(true); // Default value from DB
  });

  // --- TEST 2: GET GROUPS ---
  it("should list all user groups", async () => {
    const group = await createTestGroup();

    const req = new NextRequest(BASE_URL, { method: "GET" });
    req.headers.set("x-user-id", testUserId.toString());
    req.headers.set("x-group-id", bootstrapGroupId.toString());

    const response = await GET_GROUPS(req);
    const body = await response.json();

    expect(response.status).toBe(200);
    // Adjust based on your GET return structure (value/label vs full object)
    const found = body.data.find(
      (g: any) => g.value === group.code || g.label === group.name,
    );
    expect(found).toBeDefined();
  });

  // --- TEST 3: UPDATE GROUP ---
  it("should update an existing group", async () => {
    const group = await createTestGroup();

    const req = new NextRequest(`${BASE_URL}/${group.id}`, {
      method: "PUT",
      headers: {
        "x-user-id": testUserId.toString(),
        "x-group-id": bootstrapGroupId.toString(),
      },
      body: JSON.stringify({
        name: "Updated Group Name",
        description: "Updated Desc",
        is_active: false, // 👈 Testing update logic
      }),
    });

    const params = Promise.resolve({ groupId: group.id.toString() });
    const response = await PUT(req, { params });
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data.name).toBe("Updated Group Name");
    expect(body.data.is_active).toBe(false);
  });

  // --- TEST 4: ASSIGN RULES ---
  it("should assign rules to a group", async () => {
    const group = await createTestGroup();

    const [rule1] = await db
      .insert(rules)
      .values({ name: "Rule A", code: "A", user_created: testUserId })
      .returning();
    const [rule2] = await db
      .insert(rules)
      .values({ name: "Rule B", code: "B", user_created: testUserId })
      .returning();

    const req = new NextRequest(`${BASE_URL}/${group.id}/rules`, {
      method: "POST",
      headers: {
        "x-user-id": testUserId.toString(),
        "x-group-id": bootstrapGroupId.toString(),
      },
      body: JSON.stringify({ ruleIds: [rule1.id, rule2.id] }),
    });

    const params = Promise.resolve({ groupId: group.id.toString() });
    const response = await SYNC_RULES(req, { params });
    expect(response.status).toBe(200);
  });

  // --- TEST 5: GET ASSIGNED RULES ---
  it("should fetch rules assigned to a group", async () => {
    const group = await createTestGroup();
    const [rule] = await db
      .insert(rules)
      .values({ name: "Rule C", code: "C", user_created: testUserId })
      .returning();
    await db
      .insert(groupRules)
      .values({ group_id: group.id, rule_id: rule.id });

    const getReq = new NextRequest(`${BASE_URL}/${group.id}/rules`, {
      method: "GET",
      headers: {
        "x-user-id": testUserId.toString(),
        "x-group-id": bootstrapGroupId.toString(),
      },
    });

    const params = Promise.resolve({ groupId: group.id.toString() });
    const response = await GET_GROUP_RULES(getReq, { params });
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data[0].name).toBe("Rule C");
  });

  // --- TEST 6: DELETE ---
  it("should delete a group", async () => {
    const group = await createTestGroup();
    const req = new NextRequest(`${BASE_URL}/${group.id}`, {
      method: "DELETE",
      headers: {
        "x-user-id": testUserId.toString(),
        "x-group-id": bootstrapGroupId.toString(),
      },
    });

    const params = Promise.resolve({ groupId: group.id.toString() });
    const response = await DELETE(req, { params });
    const body = await response.json();

    expect(body.success).toBe(true);
  });
});
