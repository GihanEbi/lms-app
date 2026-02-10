import { describe, it, expect, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { db } from "@/db";
import {
  users,
  userGroups,
  rules,
  groupRules,
  instructors,
  instructorVerifications,
  instructorPreferences,
  instructorExpertise,
  degreeCertificate,
  subjects,
  subjectCategories,
} from "@/db/schema";
import { eq } from "drizzle-orm";
import { AccessConstants } from "@/src/constants/AccessConstants";
import {
  instructorRegistrationStatusConstants,
  certificateVerificationConstants,
} from "@/src/constants/instructorConstants";

// --- IMPORT ROUTE HANDLERS ---
// Adjust these relative paths if your folder structure differs slightly
import { GET as GET_INSTRUCTOR_DETAILS } from "./get_instructor_by_id/route";
import { PUT as VERIFY_CERTIFICATE } from "./verify_reject_certificate/route";
import { PUT as VERIFY_ACCOUNT } from "./verify_reject_instructor_account/route";

// --- BASE URLS (for NextRequest construction) ---
const DETAILS_URL =
  "http://localhost:3000/api/admin/instructors/account_verification/get_instructor_by_id";
const CERT_URL =
  "http://localhost:3000/api/admin/instructors/account_verification/verify_reject_certificate";
const ACCOUNT_URL =
  "http://localhost:3000/api/admin/instructors/account_verification/verify_reject_instructor_account";

describe("Admin Instructor Verification Workflow Tests", () => {
  let adminUserId: number;
  let adminGroupId: number;
  let targetInstructorId: number;

  // --- SETUP ---
  beforeEach(async () => {
    // 1. Create Admin Group & User
    const [group] = await db
      .insert(userGroups)
      .values({ name: `Admin Group ${Date.now()}`, is_active: true })
      .returning();
    adminGroupId = group.id;

    const [admin] = await db
      .insert(users)
      .values({
        full_name: "Super Admin",
        email: `admin_${Date.now()}@test.com`,
        password_hash: "hash",
        group_id: adminGroupId,
      })
      .returning();
    adminUserId = admin.id;

    // 2. Grant Permissions
    // We need permission to GET instructors and EDIT (verify) them
    const permissions = [
      { name: "Get Instructors", code: AccessConstants.INSTRUCTOR_GET },
      {
        name: "Verify Instructors",
        code: AccessConstants.INSTRUCTOR_CREATE_EDIT,
      },
    ];
    const rulesList = await db
      .insert(rules)
      .values(permissions.map((p) => ({ ...p, user_created: adminUserId })))
      .returning();
    await db
      .insert(groupRules)
      .values(
        rulesList.map((r) => ({ group_id: adminGroupId, rule_id: r.id })),
      );

    // 3. Create Dependencies (Degree, Category, Subject)
    const [cert] = await db
      .insert(degreeCertificate)
      .values({ degree_certificate_name: "PhD", user_created: adminUserId })
      .returning();
    const [cat] = await db
      .insert(subjectCategories)
      .values({ subject_category_name: "Tech", user_created: adminUserId })
      .returning();
    const [sub] = await db
      .insert(subjects)
      .values({
        subject_name: "React",
        subject_category_id: cat.id,
        user_created: adminUserId,
      })
      .returning();

    // 4. Create Target Instructor (The one being verified)
    const [inst] = await db
      .insert(instructors)
      .values({
        full_name: "Candidate John",
        email: `candidate_${Date.now()}@test.com`,
        password_hash: "hash",
        phone_number: `${Date.now()}`.slice(0, 10),
        highest_degree_certificate_id: cert.id,
        registration_status: instructorRegistrationStatusConstants.PENDING,
        user_created: adminUserId, // Simulated self-reg or admin created
      })
      .returning();
    targetInstructorId = inst.id;

    // 5. Seed Related Data (Preferences, Verifications, Expertise)
    await db.insert(instructorPreferences).values({
      instructor_id: targetInstructorId,
      teaching_methodology: "Agile",
      user_created: adminUserId,
    });

    await db.insert(instructorVerifications).values({
      instructor_id: targetInstructorId,
      identity_document_urls: ["id.jpg"],
      certification_document_urls: ["cert.pdf"],
      digital_signature: "John",
      status: certificateVerificationConstants.PENDING,
      user_created: adminUserId,
    });

    await db.insert(instructorExpertise).values({
      instructor_id: targetInstructorId,
      subject_id: sub.id,
    });
  });

  // --- TEST 1: GET COMPLETE DETAILS ---
  it("should fetch complete instructor profile with all relations", async () => {
    const req = new NextRequest(
      `${DETAILS_URL}?instructor_id=${targetInstructorId}`,
      {
        method: "GET",
        headers: {
          "x-user-id": adminUserId.toString(),
          "x-group-id": adminGroupId.toString(),
        },
      },
    );

    const res = await GET_INSTRUCTOR_DETAILS(req);
    const json = await res.json();

    expect(res.status).toBe(200);

    // Check Personal Info
    expect(json.data.personal_information.full_name).toBe("Candidate John");
    expect(json.data.personal_information.degree_certificate_name).toBe("PhD");

    // Check Relations
    expect(json.data.preferences).not.toBeNull();
    expect(json.data.verifications).not.toBeNull();
    expect(json.data.expertise).toHaveLength(1);
    expect(json.data.expertise[0].subject_name).toBe("React");
  });

  // --- TEST 2: VERIFY DOCUMENTS (Certificates) ---
  it("should approve the instructor documents", async () => {
    const req = new NextRequest(CERT_URL, {
      method: "PUT",
      headers: {
        "x-user-id": adminUserId.toString(),
        "x-group-id": adminGroupId.toString(),
      },
      body: JSON.stringify({
        instructor_id: targetInstructorId,
        status: certificateVerificationConstants.VERIFIED,
      }),
    });

    const res = await VERIFY_CERTIFICATE(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.data.status).toBe(certificateVerificationConstants.VERIFIED);
    expect(json.data.rejection_reason).toBeNull();

    // Verify DB update
    const dbRecord = await db.query.instructorVerifications.findFirst({
      where: eq(instructorVerifications.instructor_id, targetInstructorId),
    });
    expect(dbRecord?.status).toBe(certificateVerificationConstants.VERIFIED);
  });

  // --- TEST 3: REJECT DOCUMENTS (Certificates) ---
  it("should reject documents if reason is provided", async () => {
    const req = new NextRequest(CERT_URL, {
      method: "PUT",
      headers: {
        "x-user-id": adminUserId.toString(),
        "x-group-id": adminGroupId.toString(),
      },
      body: JSON.stringify({
        instructor_id: targetInstructorId,
        status: certificateVerificationConstants.REJECTED,
        rejection_reason: "Blurry image",
      }),
    });

    const res = await VERIFY_CERTIFICATE(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.data.status).toBe(certificateVerificationConstants.REJECTED);
    expect(json.data.rejection_reason).toBe("Blurry image");
  });

  // --- TEST 4: APPROVE INSTRUCTOR ACCOUNT ---
  it("should approve the instructor account status", async () => {
    const req = new NextRequest(ACCOUNT_URL, {
      method: "PUT",
      headers: {
        "x-user-id": adminUserId.toString(),
        "x-group-id": adminGroupId.toString(),
      },
      body: JSON.stringify({
        instructor_id: targetInstructorId,
        status: instructorRegistrationStatusConstants.APPROVED,
      }),
    });

    const res = await VERIFY_ACCOUNT(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.data.registration_status).toBe(
      instructorRegistrationStatusConstants.APPROVED,
    );

    // Verify DB update
    const dbRecord = await db.query.instructors.findFirst({
      where: eq(instructors.id, targetInstructorId),
    });
    expect(dbRecord?.registration_status).toBe(
      instructorRegistrationStatusConstants.APPROVED,
    );
  });

  // --- TEST 5: REJECT INSTRUCTOR ACCOUNT ---
  it("should reject the instructor account with a reason", async () => {
    const req = new NextRequest(ACCOUNT_URL, {
      method: "PUT",
      headers: {
        "x-user-id": adminUserId.toString(),
        "x-group-id": adminGroupId.toString(),
      },
      body: JSON.stringify({
        instructor_id: targetInstructorId,
        status: instructorRegistrationStatusConstants.REJECTED,
        rejection_reason: "Failed background check",
      }),
    });

    const res = await VERIFY_ACCOUNT(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.data.registration_status).toBe(
      instructorRegistrationStatusConstants.REJECTED,
    );
    expect(json.data.rejection_reason).toBe("Failed background check");
  });

  // --- TEST 6: FAIL REJECTION WITHOUT REASON ---
  it("should fail rejection if reason is missing", async () => {
    const req = new NextRequest(ACCOUNT_URL, {
      method: "PUT",
      headers: {
        "x-user-id": adminUserId.toString(),
        "x-group-id": adminGroupId.toString(),
      },
      body: JSON.stringify({
        instructor_id: targetInstructorId,
        status: instructorRegistrationStatusConstants.REJECTED,
        // Missing rejection_reason
      }),
    });

    const res = await VERIFY_ACCOUNT(req);
    expect(res.status).toBe(400); // Validation error
  });
});


// TEST COMMAND : npx vitest run src/app/api/admin/instructors/account_verification/account_verification.test.ts --no-file-parallelism
