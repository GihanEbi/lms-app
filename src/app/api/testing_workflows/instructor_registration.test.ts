import { describe, it, expect, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { db } from "@/db";
import {
  users,
  userGroups,
  rules,
  groupRules,
  degreeCertificate,
  subjectCategories,
  subjects,
  instructors,
  instructorPreferences,
  instructorVerifications,
} from "@/db/schema";
import { eq } from "drizzle-orm";
import { AccessConstants } from "@/src/constants/AccessConstants";

// Import the actual route handlers
import { POST as CREATE_INSTRUCTOR } from "../instructor/profile/personal_information/route";
import { POST as CREATE_PREFERENCES } from "../instructor/profile/instructor_preferences/route";
import { POST as SUBMIT_VERIFICATION } from "../instructor/profile/instructor_verifications/route";
import { PUT as REVIEW_VERIFICATION } from "../instructor/profile/instructor_verifications/[id]/route";
import { certificateVerificationConstants } from "@/src/constants/instructorConstants";

// Base URLs (used only for constructing NextRequest objects)
const INSTRUCTOR_URL =
  "http://localhost:3000/api/instructor/profile/personal_information";
const PREFERENCES_URL =
  "http://localhost:3000/api/instructor/profile/instructor_preferences";
const VERIFICATION_URL =
  "http://localhost:3000/api/instructor/profile/instructor_verifications";

describe("Instructor Registration Workflow (End-to-End)", () => {
  // Global Test Data
  let adminUserId: number;
  let adminGroupId: number;
  let degreeId: number;
  let subjectId1: number;
  let subjectId2: number;

  // Variables to hold data generated during the workflow
  let createdInstructorId: number;
  let createdVerificationId: number;

  // --- 1. GLOBAL SETUP ---
  beforeEach(async () => {
    // A. Create Admin User & Group (The "System" performing the actions)
    const [group] = await db
      .insert(userGroups)
      .values({ name: `Workflow Group ${Date.now()}`, is_active: true })
      .returning();
    adminGroupId = group.id;

    const [user] = await db
      .insert(users)
      .values({
        full_name: "Workflow Admin",
        email: `admin_${Date.now()}@test.com`,
        password_hash: "hash",
        group_id: adminGroupId,
      })
      .returning();
    adminUserId = user.id;

    // B. Assign ALL necessary permissions to this group
    const permissions = [
      {
        name: "Create Instructor",
        code: AccessConstants.INSTRUCTOR_CREATE_EDIT,
      },
      { name: "Create Prefs", code: AccessConstants.INSTRUCTOR_CREATE_EDIT },
      { name: "Create Verif", code: AccessConstants.INSTRUCTOR_CREATE_EDIT },
    ];

    const insertedRules = await db
      .insert(rules)
      .values(permissions.map((p) => ({ ...p, user_created: adminUserId })))
      .returning();

    await db
      .insert(groupRules)
      .values(
        insertedRules.map((r) => ({ group_id: adminGroupId, rule_id: r.id })),
      );

    // C. Seed Dropdown Data (Degrees, Subjects)
    const [cert] = await db
      .insert(degreeCertificate)
      .values({
        degree_certificate_name: "PhD Computer Science",
        user_created: adminUserId,
      })
      .returning();
    degreeId = cert.id;

    const [cat] = await db
      .insert(subjectCategories)
      .values({
        subject_category_name: "Technology",
        user_created: adminUserId,
      })
      .returning();

    const [s1] = await db
      .insert(subjects)
      .values({
        subject_name: "React.js",
        subject_category_id: cat.id,
        user_created: adminUserId,
      })
      .returning();
    subjectId1 = s1.id;

    const [s2] = await db
      .insert(subjects)
      .values({
        subject_name: "Node.js",
        subject_category_id: cat.id,
        user_created: adminUserId,
      })
      .returning();
    subjectId2 = s2.id;
  });

  // --- THE WORKFLOW TEST ---
  it("should successfully register an instructor from start to finish", async () => {
    // =========================================================================
    // STEP 1: Personal Information (Create Instructor Record)
    // =========================================================================
    console.log("👉 Step 1: Submitting Personal Information...");

    const personalInfoReq = new NextRequest(INSTRUCTOR_URL, {
      method: "POST",
      headers: {
        "x-user-id": adminUserId.toString(),
        "x-group-id": adminGroupId.toString(),
      },
      body: JSON.stringify({
        full_name: "John Workflow Doe",
        email: `john_${Date.now()}@workflow.com`,
        password: "SecurePassword123!",
        phone_number: `${Date.now()}`.slice(0, 10),
        highest_degree_certificate_id: degreeId,
        years_of_experience: 5,
        date_of_birth: "1990-05-15",
        address: "123 Tech Park, Silicon Valley",
      }),
    });
    // Manually mocking middleware header injection
    personalInfoReq.headers.set("x-group-id", adminGroupId.toString());

    const step1Res = await CREATE_INSTRUCTOR(personalInfoReq);
    const step1Json = await step1Res.json();

    expect(step1Res.status).toBe(201);
    expect(step1Json.data.id).toBeDefined();

    // SAVE ID FOR NEXT STEPS
    createdInstructorId = step1Json.data.id;
    console.log(`   ✅ Instructor Created with ID: ${createdInstructorId}`);

    // =========================================================================
    // STEP 2: Preferences & Expertise
    // =========================================================================
    console.log("👉 Step 2: Submitting Preferences & Expertise...");

    const preferencesReq = new NextRequest(PREFERENCES_URL, {
      method: "POST",
      headers: {
        "x-user-id": adminUserId.toString(),
        "x-group-id": adminGroupId.toString(),
      },
      body: JSON.stringify({
        instructor_id: createdInstructorId, // Linking to Step 1
        teaching_methodology: "Interactive project-based learning",
        student_capacity: 50,
        linkedin_url: "https://linkedin.com/in/johndoe",
        weekly_availability: [
          { day: "Mon", slots: ["morning"] },
          { day: "Fri", slots: ["evening"] },
        ],
        subject_ids: [subjectId1, subjectId2], // Many-to-Many link
      }),
    });
    preferencesReq.headers.set("x-group-id", adminGroupId.toString());

    const step2Res = await CREATE_PREFERENCES(preferencesReq);
    const step2Json = await step2Res.json();

    expect(step2Res.status).toBe(201);
    expect(step2Json.data.student_capacity).toBe(50);
    console.log("   ✅ Preferences Saved");

    // =========================================================================
    // STEP 3: Document Verification
    // =========================================================================
    console.log("👉 Step 3: Uploading Verification Documents...");

    const verificationReq = new NextRequest(VERIFICATION_URL, {
      method: "POST",
      headers: {
        "x-user-id": adminUserId.toString(),
        "x-group-id": adminGroupId.toString(),
      },
      body: JSON.stringify({
        instructor_id: createdInstructorId, // Linking to Step 1
        identity_document_urls: ["https://s3.aws.com/passport.jpg"],
        certification_document_urls: [
          "https://s3.aws.com/phd_scan.pdf",
          "https://s3.aws.com/aws_cert.pdf",
        ],
        professional_license_number: "EDU-LIC-2024",
        background_check_consent: true,
        digital_signature: "John W. Doe",
      }),
    });
    verificationReq.headers.set("x-group-id", adminGroupId.toString());

    const step3Res = await SUBMIT_VERIFICATION(verificationReq);
    const step3Json = await step3Res.json();

    expect(step3Res.status).toBe(201);
    expect(step3Json.data.status).toBe(
      certificateVerificationConstants.PENDING,
    ); // Default status

    createdVerificationId = step3Json.data.id;
    console.log(
      `   ✅ Documents Submitted. Verification ID: ${createdVerificationId}`,
    );

    // =========================================================================
    // STEP 4: Admin Review (Approval)
    // =========================================================================
    console.log("👉 Step 4: Admin Reviewing Application...");

    const reviewReq = new NextRequest(
      `${VERIFICATION_URL}/${createdVerificationId}`,
      {
        method: "PUT",
        headers: {
          "x-user-id": adminUserId.toString(),
          "x-group-id": adminGroupId.toString(),
        },
        body: JSON.stringify({
          status: certificateVerificationConstants.VERIFIED,
          rejection_reason: "",
        }),
      },
    );
    reviewReq.headers.set("x-group-id", adminGroupId.toString());

    const params = Promise.resolve({ id: createdVerificationId.toString() });
    const step4Res = await REVIEW_VERIFICATION(reviewReq, { params });
    const step4Json = await step4Res.json();

    expect(step4Res.status).toBe(200);
    expect(step4Json.data.status).toBe(
      certificateVerificationConstants.VERIFIED,
    );
    console.log("   ✅ Instructor Verified Successfully!");

    // =========================================================================
    // FINAL DATA INTEGRITY CHECK
    // =========================================================================
    const prefCheck = await db.query.instructorPreferences.findFirst({
      where: eq(instructorPreferences.instructor_id, createdInstructorId),
    });
    const verifCheck = await db.query.instructorVerifications.findFirst({
      where: eq(instructorVerifications.instructor_id, createdInstructorId),
    });

    expect(prefCheck).toBeDefined();
    expect(verifCheck?.status).toBe(certificateVerificationConstants.VERIFIED);
  });
});
