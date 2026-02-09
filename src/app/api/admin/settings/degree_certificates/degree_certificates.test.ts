import { describe, it, expect, beforeEach } from "vitest";
import { GET as GET_LIST, POST } from "./route";
import { PUT, DELETE, GET as GET_SINGLE } from "./[id]/route";
import { NextRequest } from "next/server";
import { db } from "@/db";
import {
  degreeCertificate,
  users,
  userGroups,
  rules,
  groupRules,
} from "@/db/schema";
import { eq } from "drizzle-orm";
import { AccessConstants } from "@/src/constants/AccessConstants";

const BASE_URL = "http://localhost:3000/api/admin/settings/degree_certificates";

describe("Degree Certificates API Integration Tests", () => {
  let testUserId: number;
  let testGroupId: number;

  // --- SETUP ---
  beforeEach(async () => {
    // 1. Create Group
    const [group] = await db
      .insert(userGroups)
      .values({
        name: `Cert Group ${Date.now()}`,
        is_active: true,
      })
      .returning();
    testGroupId = group.id;

    // 2. Create User
    const [user] = await db
      .insert(users)
      .values({
        full_name: "Cert Tester",
        email: `certtester_${Date.now()}@example.com`,
        password_hash: "hashed",
        group_id: testGroupId,
        is_active: true,
      })
      .returning();
    testUserId = user.id;

    // 3. Seed Permissions
    const permissionsNeeded = [
      { name: "Get Certs", code: AccessConstants.SYSTEM_SETTINGS_GET },
      {
        name: "Create/Edit Certs",
        code: AccessConstants.SYSTEM_SETTINGS_ADD_EDIT,
      },
      { name: "Delete Certs", code: AccessConstants.SYSTEM_SETTINGS_DELETE },
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
  async function createTestCertificate(customName?: string) {
    const name = customName || `Bachelor of Testing ${Date.now()}`;

    const req = new NextRequest(BASE_URL, {
      method: "POST",
      headers: {
        "x-user-id": testUserId.toString(),
        "x-group-id": testGroupId.toString(),
      },
      body: JSON.stringify({
        degree_certificate_name: name,
        description: "Integration test description",
        // Note: create schema does NOT accept is_active, relies on DB default
      }),
    });

    // Mock header for guard
    req.headers.set("x-group-id", testGroupId.toString());

    const res = await POST(req);
    const json = await res.json();

    if (!res.ok)
      throw new Error(json.message || "Failed to create certificate");
    return json.data;
  }

  // --- TEST 1: CREATE ---
  it("should create a new degree certificate successfully", async () => {
    const cert = await createTestCertificate();

    expect(cert.id).toBeDefined();
    expect(cert.degree_certificate_name).toContain("Bachelor of Testing");
    expect(cert.is_active).toBe(true); // Check DB default
    expect(cert.user_created).toBe(testUserId);
  });

  // --- TEST 2: READ LIST ---
  it("should get a list of certificates with pagination", async () => {
    const cert = await createTestCertificate();

    const url = `${BASE_URL}?pageNo=1&pageSize=10`;
    const req = new NextRequest(url, { method: "GET" });
    req.headers.set("x-user-id", testUserId.toString());
    req.headers.set("x-group-id", testGroupId.toString());

    const response = await GET_LIST(req);
    const body = await response.json();

    expect(response.status).toBe(200);
    const found = body.data.data.find((c: any) => c.id === cert.id);
    expect(found).toBeDefined();
  });

  // --- TEST 3: READ SINGLE ---
  it("should get a single certificate by ID", async () => {
    const cert = await createTestCertificate();

    const req = new NextRequest(`${BASE_URL}/${cert.id}`, { method: "GET" });
    req.headers.set("x-user-id", testUserId.toString());
    req.headers.set("x-group-id", testGroupId.toString());

    const params = Promise.resolve({ id: cert.id.toString() });
    const response = await GET_SINGLE(req, { params });
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data.degree_certificate_name).toBe(
      cert.degree_certificate_name,
    );
  });

  // --- TEST 4: UPDATE (Success) ---
  it("should update an existing certificate", async () => {
    const cert = await createTestCertificate();

    const req = new NextRequest(`${BASE_URL}/${cert.id}`, {
      method: "PUT",
      headers: {
        "x-user-id": testUserId.toString(),
        "x-group-id": testGroupId.toString(),
      },
      body: JSON.stringify({
        degree_certificate_name: "Master of Updates",
        description: "Updated description",
        is_active: false, // Update schema requires this
      }),
    });

    const params = Promise.resolve({ id: cert.id.toString() });
    const response = await PUT(req, { params });
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data.degree_certificate_name).toBe("Master of Updates");
    expect(body.data.is_active).toBe(false);
    expect(body.data.user_modified).toBe(testUserId);
  });

  // --- TEST 5: UPDATE (Fail on Duplicate Name) ---
  it("should fail to update if name exists on another record", async () => {
    const certA = await createTestCertificate("Cert A");
    const certB = await createTestCertificate("Cert B");

    // Try to rename A to B
    const req = new NextRequest(`${BASE_URL}/${certA.id}`, {
      method: "PUT",
      headers: {
        "x-user-id": testUserId.toString(),
        "x-group-id": testGroupId.toString(),
      },
      body: JSON.stringify({
        degree_certificate_name: "Cert B", // Conflict
        description: "Trying duplicate",
        is_active: true,
      }),
    });

    const params = Promise.resolve({ id: certA.id.toString() });
    const response = await PUT(req, { params });

    expect(response.status).toBe(409);
  });

  // --- TEST 6: UPDATE (Success on Same Name) ---
  it("should succeed updating with own existing name", async () => {
    const certA = await createTestCertificate("Unique Cert Name");

    const req = new NextRequest(`${BASE_URL}/${certA.id}`, {
      method: "PUT",
      headers: {
        "x-user-id": testUserId.toString(),
        "x-group-id": testGroupId.toString(),
      },
      body: JSON.stringify({
        degree_certificate_name: "Unique Cert Name", // Same name
        description: "Just updating desc",
        is_active: true,
      }),
    });

    const params = Promise.resolve({ id: certA.id.toString() });
    const response = await PUT(req, { params });

    expect(response.status).toBe(200);
  });

  // --- TEST 7: DELETE ---
  it("should delete a certificate", async () => {
    const cert = await createTestCertificate();

    const req = new NextRequest(`${BASE_URL}/${cert.id}`, {
      method: "DELETE",
      headers: {
        "x-user-id": testUserId.toString(),
        "x-group-id": testGroupId.toString(),
      },
    });

    const params = Promise.resolve({ id: cert.id.toString() });
    const response = await DELETE(req, { params });
    const body = await response.json();

    expect(body.success).toBe(true);

    // Verify
    const check = await db
      .select()
      .from(degreeCertificate)
      .where(eq(degreeCertificate.id, cert.id));
    expect(check.length).toBe(0);
  });
});
