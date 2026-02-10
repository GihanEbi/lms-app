import { describe, it, expect, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { db } from "@/db";
import {
  users,
  userGroups,
  rules,
  groupRules,
  instructors,
  subjectCategories,
  courses,
  courses_pricing,
  course_coupons,
  courseSections,
} from "@/db/schema";
import { AccessConstants } from "@/src/constants/AccessConstants";
import {
  courseLevels,
  courseStatus,
  courseLanguageOptions,
  currencyOptions,
  discountTypeOptions,
} from "@/src/constants/courseConstants";
import { eq } from "drizzle-orm";

// --- IMPORT ROUTE HANDLERS ---
import { POST as CREATE_BASIC_INFO } from "@/src/app/api/instructor/courses/create_course/basic_information/route";
import { POST as CREATE_SECTION } from "@/src/app/api/instructor/courses/create_course/curriculum/route";
import { PUT as UPDATE_PRICING } from "@/src/app/api/instructor/courses/create_course/pricing/[id]/route";

// --- BASE URLS ---
const BASE_URL = "http://localhost:3000/api/instructor/courses/create_course";

describe("Course Creation Full Workflow (Sequential)", () => {
  let userId: number;
  let groupId: number;
  let instructorId: number;
  let categoryId: number;

  beforeEach(async () => {
    // 1. Setup User & Group
    const [group] = await db
      .insert(userGroups)
      .values({ name: `Workflow Group ${Date.now()}`, is_active: true })
      .returning();
    groupId = group.id;

    const [user] = await db
      .insert(users)
      .values({
        full_name: "Workflow Instructor",
        email: `flow_${Date.now()}@test.com`,
        password_hash: "hash",
        group_id: groupId,
      })
      .returning();
    userId = user.id;

    // 2. Grant Permissions
    const [rule] = await db
      .insert(rules)
      .values({
        name: "Create Course",
        code: AccessConstants.COURSE_CREATE_EDIT,
        user_created: userId,
      })
      .returning();
    await db.insert(groupRules).values({ group_id: groupId, rule_id: rule.id });

    // 3. Create Instructor Profile
    const [inst] = await db
      .insert(instructors)
      .values({
        full_name: "Workflow Instructor",
        email: user.email,
        password_hash: "hash",
        phone_number: `${Date.now()}`.slice(0, 10),
        user_created: userId,
      })
      .returning();
    instructorId = inst.id;

    // 4. Create Subject Category
    const [cat] = await db
      .insert(subjectCategories)
      .values({
        subject_category_name: "Software Engineering",
        user_created: userId,
      })
      .returning();
    categoryId = cat.id;
  });

  // --- SINGLE WORKFLOW TEST ---
  it("should successfully execute the complete course creation lifecycle", async () => {
    // =========================================================================
    // STEP 1: BASIC INFORMATION (Create Draft)
    // =========================================================================
    const basicInfoReq = new NextRequest(`${BASE_URL}/basic_information`, {
      method: "POST",
      headers: {
        "x-user-id": userId.toString(),
        "x-group-id": groupId.toString(),
      },
      body: JSON.stringify({
        instructor_id: instructorId,
        title: "Full Stack Workflow Test",
        subtitle: "Testing the entire flow",
        category_id: categoryId,
        level: courseLevels.INTERMEDIATE,
        description: "A comprehensive test of the system.",
        thumbnail_url: "https://test.com/image.jpg",
        promo_video_url: "https://test.com/promo.mp4",
      }),
    });

    const basicInfoRes = await CREATE_BASIC_INFO(basicInfoReq);
    const basicInfoJson = await basicInfoRes.json();

    expect(basicInfoRes.status).toBe(201);
    expect(basicInfoJson.data.id).toBeDefined();

    const createdCourseId = basicInfoJson.data.id; // Capture ID for next steps

    // =========================================================================
    // STEP 2: CURRICULUM (Add Sections)
    // =========================================================================
    const curriculumReq = new NextRequest(`${BASE_URL}/curriculum`, {
      method: "POST",
      headers: {
        "x-user-id": userId.toString(),
        "x-group-id": groupId.toString(),
      },
      body: JSON.stringify({
        course_id: createdCourseId,
        section_title: "Module 1: Introduction",
        section_order: 1,
        section_content: [
          {
            title: "Welcome Video",
            type: "video",
            video_url: "https://vid.com/1", // Use valid URI format
            video_duration: 120,
          },
          {
            title: "Reading: Prerequisites",
            type: "reading",
            reading_content: "<p>Read this...</p>",
          },
        ],
      }),
    });

    const curriculumRes = await CREATE_SECTION(curriculumReq);
    const curriculumJson = await curriculumRes.json();

    expect(curriculumRes.status).toBe(201);
    expect(curriculumJson.data.section_content).toHaveLength(2);

    // Verify DB insertion for Section
    const sectionDb = await db
      .select()
      .from(courseSections)
      .where(eq(courseSections.course_id, createdCourseId));
    expect(sectionDb).toHaveLength(1);

    // =========================================================================
    // STEP 3: PRICING & SETTINGS (Update Course)
    // =========================================================================
    const pricingReq = new NextRequest(
      `${BASE_URL}/pricing/${createdCourseId}`,
      {
        method: "PUT",
        headers: {
          "x-user-id": userId.toString(),
          "x-group-id": groupId.toString(),
        },
        body: JSON.stringify({
          is_paid: true,
          currency: currencyOptions.USD,
          price: 99.99,
          language: courseLanguageOptions.ENGLISH,
          has_certificate: true,
          coupons: [
            {
              code: "LAUNCH50",
              discount_type: discountTypeOptions.PERCENTAGE,
              discount_value: 50,
            },
          ],
        }),
      },
    );

    const params = Promise.resolve({ id: createdCourseId.toString() });
    const pricingRes = await UPDATE_PRICING(pricingReq, { params });
    const pricingJson = await pricingRes.json();

    expect(pricingRes.status).toBe(200);
    expect(pricingJson.data.is_paid).toBe(true);

    // Verify DB Pricing Update
    const courseDb = await db
      .select()
      .from(courses_pricing)
      .where(eq(courses_pricing.course_id, createdCourseId));
    expect(courseDb).toHaveLength(1);
    expect(Number(courseDb[0].price)).toBe(99.99);

    // Verify DB Coupons
    const couponsDb = await db
      .select()
      .from(course_coupons)
      .where(eq(course_coupons.course_id, createdCourseId));
    expect(couponsDb).toHaveLength(1);
    expect(couponsDb[0].code).toBe("LAUNCH50");
  });
});

// command = npx vitest run src/app/api/testing_workflows/course_creation_workflow.test.ts --no-file-parallelism
