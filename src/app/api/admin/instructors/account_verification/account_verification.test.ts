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
  notifications, // 👈 Import notifications table
} from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { AccessConstants } from "@/src/constants/AccessConstants";
import {
  instructorRegistrationStatusConstants,
  certificateVerificationConstants,
} from "@/src/constants/instructorConstants";
import {
  systemUserTypes,
  notificationTypes,
} from "@/src/constants/systemConstants";

// --- IMPORT ROUTE HANDLERS ---
import { GET as GET_INSTRUCTOR_DETAILS } from "./get_instructor_by_id/route";
import { PUT as VERIFY_CERTIFICATE } from "./verify_reject_certificate/route";
import { PUT as VERIFY_ACCOUNT } from "./verify_reject_instructor_account/route";

// --- BASE URLS ---
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

    // 3. Create Dependencies
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

    // 4. Create Target Instructor
    const [inst] = await db
      .insert(instructors)
      .values({
        full_name: "Candidate John",
        email: `candidate_${Date.now()}@test.com`,
        password_hash: "hash",
        phone_number: `${Date.now()}`.slice(0, 10),
        highest_degree_certificate_id: cert.id,
        registration_status: instructorRegistrationStatusConstants.PENDING,
        user_created: adminUserId,
      })
      .returning();
    targetInstructorId = inst.id;

    // 5. Seed Data
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

  // --- TEST 1: GET DETAILS ---
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
    expect(json.data.personal_information.full_name).toBe("Candidate John");
    expect(json.data.preferences).not.toBeNull();
  });

  // --- TEST 2: VERIFY DOCUMENTS & CHECK NOTIFICATION ---
  it("should verify documents and send a success notification", async () => {
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

    // 🔔 Verify Notification
    const notif = await db.query.notifications.findFirst({
      where: and(
        eq(notifications.receiver_id, targetInstructorId),
        eq(notifications.notification_type, notificationTypes.INFO),
      ),
      orderBy: (notifications, { desc }) => [desc(notifications.created_at)],
    });

    expect(notif).toBeDefined();
    expect(notif?.message).toContain("successfully verified");
    expect(notif?.user_type).toBe(systemUserTypes.INSTRUCTOR);
  });

  // --- TEST 3: REJECT DOCUMENTS & CHECK NOTIFICATION ---
  it("should reject documents and send an error notification", async () => {
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

    // 🔔 Verify Notification
    const notif = await db.query.notifications.findFirst({
      where: and(
        eq(notifications.receiver_id, targetInstructorId),
        eq(notifications.notification_type, notificationTypes.ERROR),
      ),
      orderBy: (notifications, { desc }) => [desc(notifications.created_at)],
    });

    expect(notif).toBeDefined();
    expect(notif?.message).toContain("rejected");
    expect(notif?.message).toContain("Blurry image");
  });

  // --- TEST 4: APPROVE ACCOUNT & CHECK NOTIFICATION ---
  it("should approve account and send a success notification", async () => {
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

    // 🔔 Verify Notification
    const notif = await db.query.notifications.findFirst({
      where: and(
        eq(notifications.receiver_id, targetInstructorId),
        eq(notifications.notification_type, notificationTypes.INFO),
      ),
      orderBy: (notifications, { desc }) => [desc(notifications.created_at)],
    });

    expect(notif).toBeDefined();
    expect(notif?.message).toContain("account has been approved");
  });

  // --- TEST 5: REJECT ACCOUNT & CHECK NOTIFICATION ---
  it("should reject account and send an error notification", async () => {
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

    // 🔔 Verify Notification
    const notif = await db.query.notifications.findFirst({
      where: and(
        eq(notifications.receiver_id, targetInstructorId),
        eq(notifications.notification_type, notificationTypes.ERROR),
      ),
      orderBy: (notifications, { desc }) => [desc(notifications.created_at)],
    });

    expect(notif).toBeDefined();
    expect(notif?.message).toContain("registration was rejected");
    expect(notif?.message).toContain("Failed background check");
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
