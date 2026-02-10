import { describe, it, expect, beforeEach } from "vitest";
import { POST, GET as GET_BY_INSTRUCTOR } from "./route";
import { PUT } from "./[id]/route";
import { NextRequest } from "next/server";
import { db } from "@/db";
import {
  instructorVerifications,
  instructors,
  degreeCertificate,
  users,
  userGroups,
  rules,
  groupRules,
} from "@/db/schema";
import { AccessConstants } from "@/src/constants/AccessConstants";

const BASE_URL = "http://localhost:3000/api/instructor_verifications";

describe("Instructor Verification API Integration Tests", () => {
  let testUserId: number;
  let testGroupId: number;
  let testInstructorId: number;

  beforeEach(async () => {
    // 1. User & Group
    const [group] = await db
      .insert(userGroups)
      .values({ name: `Verif Group ${Date.now()}`, is_active: true })
      .returning();
    testGroupId = group.id;
    const [user] = await db
      .insert(users)
      .values({
        full_name: "Verif User",
        email: `verif_${Date.now()}@test.com`,
        password_hash: "hash",
        group_id: testGroupId,
      })
      .returning();
    testUserId = user.id;

    // 2. Permissions
    const perms = [
      { name: "Get Instructors", code: AccessConstants.INSTRUCTOR_GET },
      {
        name: "Create/Edit Instructors",
        code: AccessConstants.INSTRUCTOR_CREATE_EDIT,
      },
    ];
    const insertedPerms = await db
      .insert(rules)
      .values(perms.map((p) => ({ ...p, user_created: testUserId })))
      .returning();
    await db
      .insert(groupRules)
      .values(
        insertedPerms.map((p) => ({ group_id: testGroupId, rule_id: p.id })),
      );

    // 3. Instructor Dependency
    const [cert] = await db
      .insert(degreeCertificate)
      .values({ degree_certificate_name: "PhD", user_created: testUserId })
      .returning();
    const [inst] = await db
      .insert(instructors)
      .values({
        full_name: "Dr. Verification",
        email: `verif_inst_${Date.now()}@edu.com`,
        password_hash: "hash",
        phone_number: `${Date.now()}`.slice(0, 10),
        highest_degree_certificate_id: cert.id,
        user_created: testUserId,
      })
      .returning();
    testInstructorId = inst.id;
  });

  async function createVerification() {
    const req = new NextRequest(BASE_URL, {
      method: "POST",
      headers: {
        "x-user-id": testUserId.toString(),
        "x-group-id": testGroupId.toString(),
      },
      body: JSON.stringify({
        instructor_id: testInstructorId,
        // 🔄 CHANGED: Now sending Arrays
        identity_document_urls: [
          "https://s3.aws.com/id_front.jpg",
          "https://s3.aws.com/id_back.jpg",
        ],
        certification_document_urls: ["https://s3.aws.com/cert_1.pdf"],
        professional_license_number: "LIC-999",
        background_check_consent: true,
        digital_signature: "Dr. Verification",
      }),
    });
    req.headers.set("x-group-id", testGroupId.toString());
    const res = await POST(req);
    return await res.json();
  }

  // TEST 1: CREATE
  it("should submit multiple verification documents successfully", async () => {
    const json = await createVerification();
    expect(json.success).toBe(true);
    // Verify it is an array in the response
    expect(Array.isArray(json.data.identity_document_urls)).toBe(true);
    expect(json.data.identity_document_urls).toHaveLength(2);
  });

  // TEST 2: GET
  it("should fetch verification status by instructor id", async () => {
    await createVerification();
    const req = new NextRequest(
      `${BASE_URL}?instructor_id=${testInstructorId}`,
      { method: "GET" },
    );
    req.headers.set("x-user-id", testUserId.toString());
    req.headers.set("x-group-id", testGroupId.toString());

    const res = await GET_BY_INSTRUCTOR(req);
    const json = await res.json();

    expect(json.success).toBe(true);
    expect(json.data.professional_license_number).toBe("LIC-999");
    expect(json.data.certification_document_urls[0]).toContain(".pdf");
  });

  // TEST 3: UPDATE
  it("should update verification details (e.g., admin approval)", async () => {
    const created = await createVerification();
    const verifId = created.data.id;

    const req = new NextRequest(`${BASE_URL}/${verifId}`, {
      method: "PUT",
      headers: {
        "x-user-id": testUserId.toString(),
        "x-group-id": testGroupId.toString(),
      },
      body: JSON.stringify({
        status: "verified",
        rejection_reason: "All good",
        // Adding another document during update
        identity_document_urls: ["https://s3.aws.com/new_doc.jpg"],
      }),
    });
    req.headers.set("x-group-id", testGroupId.toString());

    const params = Promise.resolve({ id: verifId.toString() });
    const res = await PUT(req, { params });
    const json = await res.json();

    expect(json.data.status).toBe("verified");
    expect(json.data.identity_document_urls).toHaveLength(1);
  });
});
