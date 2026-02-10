import { describe, it, expect, beforeEach } from "vitest";
import { PUT as UPDATE_PRICING, GET as GET_PRICING } from "./[id]/route";
import { NextRequest } from "next/server";
import { db } from "@/db";
import {
  users,
  userGroups,
  rules,
  groupRules,
  instructors,
  courses,
  subjectCategories,
  courses_pricing,
  course_coupons,
} from "@/db/schema";
import { AccessConstants } from "@/src/constants/AccessConstants";
import {
  courseLanguageOptions,
  currencyOptions,
  discountTypeOptions,
} from "@/src/constants/courseConstants";
import { eq } from "drizzle-orm";

const BASE_URL = "http://localhost:3000/api/instructor/courses/create_course/pricing";

describe("Course Pricing API Tests", () => {
  let userId: number;
  let groupId: number;
  let courseId: number;

  beforeEach(async () => {
    // 1. Setup User & Permissions
    const [group] = await db
      .insert(userGroups)
      .values({ name: `Pricing Group ${Date.now()}`, is_active: true })
      .returning();
    groupId = group.id;

    const [user] = await db
      .insert(users)
      .values({
        full_name: "Instructor",
        email: `inst_${Date.now()}@test.com`,
        password_hash: "x",
        group_id: groupId,
      })
      .returning();
    userId = user.id;

    const [rule] = await db
      .insert(rules)
      .values({
        name: "Edit Course",
        code: AccessConstants.COURSE_CREATE_EDIT,
        user_created: userId,
      })
      .returning();
    await db.insert(groupRules).values({ group_id: groupId, rule_id: rule.id });

    // 2. Setup Course Dependencies
    const [inst] = await db
      .insert(instructors)
      .values({
        full_name: "Inst",
        email: user.email,
        password_hash: "x",
        phone_number: `${Date.now()}`.slice(0, 10),
        user_created: userId,
      })
      .returning();

    const [cat] = await db
      .insert(subjectCategories)
      .values({ subject_category_name: "Tech", user_created: userId })
      .returning();

    // 3. Create Draft Course
    const [course] = await db
      .insert(courses)
      .values({
        instructor_id: inst.id,
        title: "Draft Course",
        category_id: cat.id,
        user_created: userId,
      })
      .returning();
    courseId = course.id;
  });

  // --- TEST 1: SET PAID COURSE WITH COUPONS ---
  it("should create pricing record for Paid course and add coupons", async () => {
    const req = new NextRequest(`${BASE_URL}/${courseId}`, {
      method: "PUT",
      headers: {
        "x-user-id": userId.toString(),
        "x-group-id": groupId.toString(),
      },
      body: JSON.stringify({
        is_paid: true,
        currency: currencyOptions.USD,
        price: 49.99,
        language: courseLanguageOptions.SINHALA,
        has_certificate: true,
        coupons: [
          {
            code: "WELCOME20",
            discount_type: discountTypeOptions.PERCENTAGE,
            discount_value: 20,
          },
          {
            code: "FLAT10",
            discount_type: discountTypeOptions.FIXED,
            discount_value: 10,
          },
        ],
      }),
    });

    const params = Promise.resolve({ id: courseId.toString() });
    const res = await UPDATE_PRICING(req, { params });
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.data.is_paid).toBe(true);
    expect(json.data.language).toBe(courseLanguageOptions.SINHALA);
    // Note: Drizzle/PG often returns decimal types as strings to preserve precision
    expect(Number(json.data.price)).toBe(49.99);

    // Verify DB
    const savedCoupons = await db
      .select()
      .from(course_coupons)
      .where(eq(course_coupons.course_id, courseId));
    expect(savedCoupons).toHaveLength(2);
    expect(savedCoupons[0].code).toBe("WELCOME20");
  });

  // --- TEST 2: SWITCH TO FREE TIER ---
  it("should switch course to Free tier and clear price", async () => {
    const req = new NextRequest(`${BASE_URL}/${courseId}`, {
      method: "PUT",
      headers: {
        "x-user-id": userId.toString(),
        "x-group-id": groupId.toString(),
      },
      body: JSON.stringify({
        is_paid: false,
        // Currency/Price omitted
        language: courseLanguageOptions.ENGLISH,
        has_certificate: false,
        coupons: [],
      }),
    });

    const params = Promise.resolve({ id: courseId.toString() });
    const res = await UPDATE_PRICING(req, { params });
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.data.is_paid).toBe(false);
    expect(json.data.price).toBeNull(); // Should be null in DB
  });

  // --- TEST 3: VALIDATION ERROR (Missing Price for Paid) ---
  it("should fail if paid course has no price", async () => {
    const req = new NextRequest(`${BASE_URL}/${courseId}`, {
      method: "PUT",
      headers: {
        "x-user-id": userId.toString(),
        "x-group-id": groupId.toString(),
      },
      body: JSON.stringify({
        is_paid: true,
        currency: currencyOptions.LKR,
        // Price missing
        language: courseLanguageOptions.TAMIL,
        has_certificate: true,
      }),
    });

    const params = Promise.resolve({ id: courseId.toString() });
    const res = await UPDATE_PRICING(req, { params });
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.message).toContain("price");
  });

  // --- TEST 4: GET PRICING & COUPONS ---
  it("should retrieve pricing and coupons correctly", async () => {
    // 1. Manually Seed Pricing
    await db.insert(courses_pricing).values({
      course_id: courseId,
      is_paid: true,
      price: "100.00",
      currency: "USD",
      language: "English",
    });

    // 2. Manually Seed Coupon
    await db.insert(course_coupons).values({
      course_id: courseId,
      code: "TESTCODE",
      discount_type: "FIXED",
      discount_value: "10.00",
    });

    const req = new NextRequest(`${BASE_URL}/${courseId}`, {
      method: "GET",
      headers: {
        "x-user-id": userId.toString(),
        "x-group-id": groupId.toString(),
      },
    });

    const params = Promise.resolve({ id: courseId.toString() });
    const res = await GET_PRICING(req, { params });
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.data.price).toBe("100.00");
    expect(json.data.coupons).toHaveLength(1);
    expect(json.data.coupons[0].code).toBe("TESTCODE");
  });
});

//command = npx vitest run src/app/api/instructor/courses/create_course/pricing/pricing.test.ts --no-file-parallelism
