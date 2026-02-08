import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { GET as GET_GROUPS, POST as CREATE_GROUP } from "./route";
import { PUT, DELETE } from "./[groupId]/route";
import {
  GET as GET_GROUP_RULES,
  POST as SYNC_RULES,
} from "./[groupId]/rules/route";
import { NextRequest } from "next/server";
import { db } from "@/db";
import { userGroups, users, rules } from "@/db/schema";
import { eq } from "drizzle-orm";

const BASE_URL = "http://localhost:3000/api/user_groups";

describe("User Groups API Integration Tests", () => {
  let testUserId: number;
  let bootstrapGroupId: number;

  // --- SETUP: Create Group & User ---
  beforeEach(async () => {
    // 1. Create a "Bootstrap Group" first
    // We need this because the Users table REQUIRES a group_id (notNull)
    const [bootGroup] = await db
      .insert(userGroups)
      .values({
        name: `Bootstrap Group ${Date.now()}`,
        description: "Temporary group to hold the test user",
        is_active: true,
        // user_created is null here, which is allowed for the very first group
      })
      .returning();
    bootstrapGroupId = bootGroup.id;

    // 2. Create the User assigned to the Bootstrap Group
    const [user] = await db
      .insert(users)
      .values({
        full_name: "Group Creator",
        email: `groupcreator_${Date.now()}@example.com`,
        password_hash: "hashed",
        is_active: true,
        group_id: bootstrapGroupId, // ✅ Satisfies the Schema Constraint
      })
      .returning();
    testUserId = user.id;
  });

  // --- HELPER: Create a fresh group ---
  async function createTestGroup() {
    const req = new NextRequest(BASE_URL, {
      method: "POST",
      headers: { "x-user-id": testUserId.toString() },
      body: JSON.stringify({
        name: `Test Group ${Date.now()}`, // Unique name
        description: "Created by integration test",
        is_active: true,
      }),
    });
    const res = await CREATE_GROUP(req);
    return await res.json();
  }

  // --- TEST 1: CREATE GROUP ---
  it("should create a new user group successfully", async () => {
    const group = await createTestGroup();

    expect(group.id).toBeDefined();
    expect(group.name).toContain("Test Group");
    expect(group.user_created).toBe(testUserId);
  });

  // --- TEST 2: GET GROUPS ---
  it("should list all user groups", async () => {
    const group = await createTestGroup();

    const req = new NextRequest(BASE_URL, { method: "GET" });
    const response = await GET_GROUPS();
    const body = await response.json();

    expect(response.status).toBe(200);
    const found = body.find((g: any) => g.id === group.id);
    expect(found).toBeDefined();
  });

  // --- TEST 3: UPDATE GROUP ---
  it("should update an existing group", async () => {
    const group = await createTestGroup();

    const req = new NextRequest(`${BASE_URL}/${group.id}`, {
      method: "PUT",
      headers: { "x-user-id": testUserId.toString() },
      body: JSON.stringify({
        name: "Updated Group Name",
        description: "Updated Desc",
        is_active: false,
      }),
    });

    const params = Promise.resolve({ groupId: group.id.toString() });
    const response = await PUT(req, { params });
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.name).toBe("Updated Group Name");
    expect(body.is_active).toBe(false);
  });

  // --- TEST 4: ASSIGN RULES TO GROUP ---
  it("should assign rules to a group", async () => {
    const group = await createTestGroup();

    // 1. Create 2 dummy rules
    // Note: Rules also need a 'user_created', so we pass our testUserId
    const [rule1] = await db
      .insert(rules)
      .values({ name: "Rule A", user_created: testUserId })
      .returning();
    const [rule2] = await db
      .insert(rules)
      .values({ name: "Rule B", user_created: testUserId })
      .returning();

    // 2. Sync rules
    const req = new NextRequest(`${BASE_URL}/${group.id}/rules`, {
      method: "POST",
      headers: { "x-user-id": testUserId.toString() },
      body: JSON.stringify({
        ruleIds: [rule1.id, rule2.id],
      }),
    });

    const params = Promise.resolve({ groupId: group.id.toString() });
    const response = await SYNC_RULES(req, { params });
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.assignedRuleIds).toHaveLength(2);
  });

  // --- TEST 5: GET ASSIGNED RULES ---
  it("should fetch rules assigned to a group", async () => {
    const group = await createTestGroup();
    const [rule] = await db
      .insert(rules)
      .values({ name: "Rule C", user_created: testUserId })
      .returning();

    // Assign Rule
    const assignReq = new NextRequest(`${BASE_URL}/${group.id}/rules`, {
      method: "POST",
      headers: { "x-user-id": testUserId.toString() },
      body: JSON.stringify({ ruleIds: [rule.id] }),
    });
    const params = Promise.resolve({ groupId: group.id.toString() });
    await SYNC_RULES(assignReq, { params });

    // Fetch Rules
    const getReq = new NextRequest(`${BASE_URL}/${group.id}/rules`, {
      method: "GET",
    });
    const response = await GET_GROUP_RULES(getReq, { params });
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body[0].name).toBe("Rule C");
  });

  // --- TEST 6: DELETE GROUP ---
  it("should delete a group", async () => {
    const group = await createTestGroup();

    const req = new NextRequest(`${BASE_URL}/${group.id}`, {
      method: "DELETE",
      headers: { "x-user-id": testUserId.toString() },
    });

    const params = Promise.resolve({ groupId: group.id.toString() });
    const response = await DELETE(req, { params });
    const body = await response.json();

    expect(body.success).toBe(true);

    const check = await db
      .select()
      .from(userGroups)
      .where(eq(userGroups.id, group.id));
    expect(check.length).toBe(0);
  });
});
