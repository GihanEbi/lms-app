import { describe, it, expect, beforeEach } from "vitest";
import { GET as GET_LIST, POST } from "./route";
import { PUT, DELETE } from "./[ruleId]/route";
import { NextRequest } from "next/server";
import { db } from "@/db";
import { rules, users, userGroups } from "@/db/schema";
import { eq } from "drizzle-orm";

const BASE_URL = "http://localhost:3000/api/rules";

describe("Rules API Integration Tests", () => {
  let testUserId: number;
  let testGroupId: number;

  // 🔄 CHANGED: Use beforeEach instead of beforeAll
  // This ensures the User exists even if the DB was wiped by global cleanup
  beforeEach(async () => {
    // 1. Create Group
    const [group] = await db
      .insert(userGroups)
      .values({
        name: "Rules Test Group",
        is_active: true,
      })
      .returning();
    testGroupId = group.id;

    // 2. Create User
    const [user] = await db
      .insert(users)
      .values({
        full_name: "Rules Tester",
        email: `rulestester_${Date.now()}@example.com`, // Unique email per test
        password_hash: "hashed",
        group_id: testGroupId,
        is_active: true,
      })
      .returning();
    testUserId = user.id;
  });

  // --- HELPER: Create a fresh rule for each test ---
  async function createTestRule() {
    const req = new NextRequest(BASE_URL, {
      method: "POST",
      headers: { "x-user-id": testUserId.toString() },
      body: JSON.stringify({
        name: "Independent Rule",
        description: "Created for testing",
      }),
    });
    const res = await POST(req);
    return await res.json();
  }

  // --- TEST 1: CREATE ---
  it("should create a new rule successfully", async () => {
    const newRule = await createTestRule();

    expect(newRule.id).toBeDefined();
    expect(newRule.name).toBe("Independent Rule");
    expect(newRule.user_created).toBe(testUserId);
  });

  // --- TEST 2: READ LIST ---
  it("should get a list of rules with pagination", async () => {
    const rule = await createTestRule(); // Ensure at least one exists

    const url = `${BASE_URL}?pageNo=1&pageSize=10`;
    const req = new NextRequest(url, { method: "GET" });

    const response = await GET_LIST(req);
    const body = await response.json();

    expect(response.status).toBe(200);
    // Find our specific rule
    const found = body.data.data.find((r: any) => r.id === rule.id);
    expect(found).toBeDefined();
  });

  // --- TEST 3: SEARCH ---
  it("should search for the specific rule", async () => {
    await createTestRule(); // Create 'Independent Rule'

    const url = `${BASE_URL}?pageNo=1&pageSize=10&searchValue=Independent`;
    const req = new NextRequest(url, { method: "GET" });

    const response = await GET_LIST(req);
    const body = await response.json();

    expect(body.data.data.length).toBeGreaterThan(0);
    expect(body.data.data[0].name).toContain("Independent");
  });

  // --- TEST 4: UPDATE ---
  it("should update an existing rule", async () => {
    const rule = await createTestRule();

    const req = new NextRequest(`${BASE_URL}/${rule.id}`, {
      method: "PUT",
      headers: { "x-user-id": testUserId.toString() },
      body: JSON.stringify({
        name: "Updated Rule Name",
        description: "Updated Desc",
      }),
    });

    // Mock Params
    const params = Promise.resolve({ ruleId: rule.id.toString() });
    const response = await PUT(req, { params });
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.name).toBe("Updated Rule Name");
    expect(body.user_modified).toBe(testUserId);
  });

  // --- TEST 5: DELETE ---
  it("should delete the rule", async () => {
    const rule = await createTestRule();

    const req = new NextRequest(`${BASE_URL}/${rule.id}`, {
      method: "DELETE",
      headers: { "x-user-id": testUserId.toString() },
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
