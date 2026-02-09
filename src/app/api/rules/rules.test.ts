import { describe, it, expect, beforeEach } from "vitest";
import { GET as GET_LIST, POST } from "./route";
import { PUT, DELETE } from "./[ruleId]/route";
import { NextRequest } from "next/server";
import { db } from "@/db";
import { rules, users, userGroups, groupRules } from "@/db/schema";
import { eq } from "drizzle-orm";
import { AccessConstants } from "@/src/constants/AccessConstants";

const BASE_URL = "http://localhost:3000/api/rules";

describe("Rules API Integration Tests", () => {
  let testUserId: number;
  let testGroupId: number;

  // 🔄 SETUP: Create User, Group, AND Assign Permissions
  beforeEach(async () => {
    // 1. Create Group
    const [group] = await db
      .insert(userGroups)
      .values({
        name: `Rules Test Group ${Date.now()}`,
        is_active: true,
      })
      .returning();
    testGroupId = group.id;

    // 2. Create User assigned to this Group
    const [user] = await db
      .insert(users)
      .values({
        full_name: "Rules Tester",
        email: `rulestester_${Date.now()}@example.com`,
        password_hash: "hashed",
        group_id: testGroupId,
        is_active: true,
      })
      .returning();
    testUserId = user.id;

    // 3. 🛡️ SEED PERMISSIONS
    const permissionsNeeded = [
      { name: "Permission: Get Rules", code: AccessConstants.RULE_GET },
      {
        name: "Permission: Create/Edit Rules",
        code: AccessConstants.RULE_CREATE_EDIT,
      },
      { name: "Permission: Delete Rules", code: AccessConstants.RULE_DELETE },
    ];

    // Insert these into the DB
    const insertedPermissions = await db
      .insert(rules)
      .values(
        permissionsNeeded.map((p) => ({
          name: p.name,
          code: p.code,
          description: "System permission for testing",
          user_created: testUserId,
        })),
      )
      .returning();

    // Link these permissions to the Test Group
    await db.insert(groupRules).values(
      insertedPermissions.map((perm) => ({
        group_id: testGroupId,
        rule_id: perm.id,
      })),
    );
  });

  // --- HELPER: Create Rule with UNIQUE Name & Code ---
  async function createTestRule(customCode?: string) {
    const uniqueCode = customCode || `CODE_${Date.now()}_${Math.random()}`;
    const uniqueName = `Rule ${uniqueCode}`; // 👈 Ensure Name is Unique

    const req = new NextRequest(BASE_URL, {
      method: "POST",
      headers: { "x-user-id": testUserId.toString() },
      body: JSON.stringify({
        name: uniqueName,
        description: "Test Desc",
        code: uniqueCode,
      }),
    });

    // Mock header for auth guard (direct call bypasses middleware)
    req.headers.set("x-group-id", testGroupId.toString());

    const res = await POST(req);
    const json = await res.json();

    if (!res.ok) throw new Error(json.message || "Failed to create rule");
    return json.data;
  }

  // --- TEST 1: CREATE ---
  it("should create a new rule successfully", async () => {
    const newRule = await createTestRule();

    expect(newRule.id).toBeDefined();
    expect(newRule.name).toContain("Rule CODE_");
    expect(newRule.user_created).toBe(testUserId);
  });

  // --- TEST 2: READ LIST ---
  it("should get a list of rules with pagination", async () => {
    const rule = await createTestRule(); // Ensure at least one exists

    const url = `${BASE_URL}?pageNo=1&pageSize=10`;
    const req = new NextRequest(url, { method: "GET" });
    req.headers.set("x-user-id", testUserId.toString());
    req.headers.set("x-group-id", testGroupId.toString());

    const response = await GET_LIST(req);
    const body = await response.json();

    expect(response.status).toBe(200);
    // Find our specific rule
    const found = body.data.data.find((r: any) => r.id === rule.id);
    expect(found).toBeDefined();
  });

  // --- TEST 3: SEARCH ---
  it("should search for the specific rule", async () => {
    // Helper creates a name like "Rule CODE_123..."
    const rule = await createTestRule();
    // We search for just the unique code part to ensure specific matching
    const searchPart = rule.code;

    const url = `${BASE_URL}?pageNo=1&pageSize=10&searchValue=${searchPart}`;
    const req = new NextRequest(url, { method: "GET" });
    req.headers.set("x-user-id", testUserId.toString());
    req.headers.set("x-group-id", testGroupId.toString());

    const response = await GET_LIST(req);
    const body = await response.json();

    expect(body.data.data.length).toBeGreaterThan(0);
    expect(body.data.data[0].code).toBe(rule.code);
  });

  // --- TEST 4: UPDATE (Success) ---
  it("should update an existing rule", async () => {
    const rule = await createTestRule();
    const updatedCode = `${rule.code}_UPDATED`;

    const req = new NextRequest(`${BASE_URL}/${rule.id}`, {
      method: "PUT",
      headers: {
        "x-user-id": testUserId.toString(),
        "x-group-id": testGroupId.toString(),
      },
      body: JSON.stringify({
        name: "Updated Rule Name",
        description: "Updated Desc",
        code: updatedCode,
      }),
    });

    const params = Promise.resolve({ ruleId: rule.id.toString() });
    const response = await PUT(req, { params });
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data.name).toBe("Updated Rule Name");
    expect(body.data.user_modified).toBe(testUserId);
  });

  // --- TEST 5: UPDATE (Fail on Duplicate Code) ---
  it("should fail to update if the new code already exists on ANOTHER rule", async () => {
    // 1. Create Rule A
    const ruleA = await createTestRule("CODE_A");
    // 2. Create Rule B
    const ruleB = await createTestRule("CODE_B");

    // 3. Try to update Rule A to use "CODE_B"
    const req = new NextRequest(`${BASE_URL}/${ruleA.id}`, {
      method: "PUT",
      headers: {
        "x-user-id": testUserId.toString(),
        "x-group-id": testGroupId.toString(),
      },
      body: JSON.stringify({
        name: ruleA.name, // Keep name same
        description: "Updated Desc",
        code: "CODE_B", // ❌ Conflict! This belongs to ruleB
      }),
    });

    const params = Promise.resolve({ ruleId: ruleA.id.toString() });
    const response = await PUT(req, { params });

    expect(response.status).toBe(409); // Conflict
  });

  // --- TEST 6: UPDATE (Success on Same Code) ---
  it("should succeed updating a rule with its own existing code", async () => {
    const ruleA = await createTestRule("CODE_UNIQUE");

    const req = new NextRequest(`${BASE_URL}/${ruleA.id}`, {
      method: "PUT",
      headers: {
        "x-user-id": testUserId.toString(),
        "x-group-id": testGroupId.toString(),
      },
      body: JSON.stringify({
        name: "New Name For Rule A",
        description: "Updated Desc",
        code: "CODE_UNIQUE", // ✅ Same code (Self), allowed
      }),
    });

    const params = Promise.resolve({ ruleId: ruleA.id.toString() });
    const response = await PUT(req, { params });

    expect(response.status).toBe(200);
  });

  // --- TEST 7: DELETE ---
  it("should delete the rule", async () => {
    const rule = await createTestRule();

    const req = new NextRequest(`${BASE_URL}/${rule.id}`, {
      method: "DELETE",
      headers: {
        "x-user-id": testUserId.toString(),
        "x-group-id": testGroupId.toString(),
      },
    });

    const params = Promise.resolve({ ruleId: rule.id.toString() });
    const response = await DELETE(req, { params });
    const body = await response.json();

    expect(body.success).toBe(true);

    // Verify it is gone
    const check = await db.select().from(rules).where(eq(rules.id, rule.id));
    expect(check.length).toBe(0);
  });
});
