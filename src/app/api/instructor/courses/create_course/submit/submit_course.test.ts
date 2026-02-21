import { describe, it, expect, beforeEach } from "vitest";
import { POST } from "./[id]/route"; // Adjust if the route file is in a different relative path
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
} from "@/db/schema";
import { eq } from "drizzle-orm";
import { AccessConstants } from "@/src/constants/AccessConstants";
import { courseStatus } from "@/src/constants/courseConstants";

const BASE_URL =
  "http://localhost:3000/api/instructor/courses/create_course/submit"; // Adjust to your actual URL path

describe("Submit Course For Review API Tests", () => {
  let userId: number;
  let groupId: number;
  let instructorId: number;
  let categoryId: number;

  let draftCourseId: number;
  let nonDraftCourseId: number;

  beforeEach(async () => {
    // 1. Setup User & Group
    const [group] = await db
      .insert(userGroups)
      .values({ name: `Submit Group ${Date.now()}`, is_active: true })
      .returning();
    groupId = group.id;

    const [user] = await db
      .insert(users)
      .values({
        full_name: "Test Instructor",
        email: `submit_${Date.now()}@test.com`,
        password_hash: "hash",
        group_id: groupId,
      })
      .returning();
    userId = user.id;

    // 2. Grant Permissions
    const [rule] = await db
      .insert(rules)
      .values({
        name: "Create/Edit Course",
        code: AccessConstants.COURSE_CREATE_EDIT,
        user_created: userId,
      })
      .returning();
    await db.insert(groupRules).values({ group_id: groupId, rule_id: rule.id });

    // 3. Create Instructor Profile
    const [inst] = await db
      .insert(instructors)
      .values({
        full_name: "Test Instructor",
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
      .values({ subject_category_name: "Testing", user_created: userId })
      .returning();
    categoryId = cat.id;

    // 5. Create a DRAFT course (Valid for submission)
    const [draftCourse] = await db
      .insert(courses)
      .values({
        instructor_id: instructorId,
        title: "Draft Test Course",
        category_id: categoryId,
        status: courseStatus.DRAFT,
        user_created: userId,
      })
      .returning();
    draftCourseId = draftCourse.id;

    // 6. Create a PENDING_REVIEW course (Invalid for submission to test restrictions)
    const [nonDraftCourse] = await db
      .insert(courses)
      .values({
        instructor_id: instructorId,
        title: "Already Submitted Course",
        category_id: categoryId,
        status: courseStatus.PENDING_REVIEW, // Assuming this is defined in your constants
        user_created: userId,
      })
      .returning();
    nonDraftCourseId = nonDraftCourse.id;
  });

  // --- TEST 1: SUCCESSFUL SUBMISSION ---
  it("should successfully submit a DRAFT course for review", async () => {
    const req = new NextRequest(`${BASE_URL}/${draftCourseId}`, {
      method: "POST",
      headers: {
        "x-user-id": userId.toString(),
        "x-group-id": groupId.toString(),
      },
    });

    const params = Promise.resolve({ id: draftCourseId.toString() });
    const res = await POST(req, { params });
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.data.status).toBe(courseStatus.PENDING_REVIEW);

    // Verify DB update
    const dbCourse = await db
      .select()
      .from(courses)
      .where(eq(courses.id, draftCourseId))
      .limit(1);

    expect(dbCourse[0].status).toBe(courseStatus.PENDING_REVIEW);
  });

  // --- TEST 2: FAIL - COURSE NOT IN DRAFT STATUS ---
  it("should fail to submit a course that is not in DRAFT status", async () => {
    const req = new NextRequest(`${BASE_URL}/${nonDraftCourseId}`, {
      method: "POST",
      headers: {
        "x-user-id": userId.toString(),
        "x-group-id": groupId.toString(),
      },
    });

    const params = Promise.resolve({ id: nonDraftCourseId.toString() });
    const res = await POST(req, { params });
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.message).toContain(
      "Course cannot be submitted. Current status",
    );

    // Verify DB was NOT changed
    const dbCourse = await db
      .select()
      .from(courses)
      .where(eq(courses.id, nonDraftCourseId))
      .limit(1);
    expect(dbCourse[0].status).toBe(courseStatus.PENDING_REVIEW); // Unchanged
  });

  // --- TEST 3: FAIL - COURSE NOT FOUND ---
  it("should return 404 if the course does not exist", async () => {
    const nonExistentId = "999999";
    const req = new NextRequest(`${BASE_URL}/${nonExistentId}`, {
      method: "POST",
      headers: {
        "x-user-id": userId.toString(),
        "x-group-id": groupId.toString(),
      },
    });

    const params = Promise.resolve({ id: nonExistentId });
    const res = await POST(req, { params });
    const json = await res.json();

    expect(res.status).toBe(404);
    expect(json.message).toBe("Course not found");
  });

  // --- TEST 4: FAIL - INVALID ID ---
  it("should return 400 for an invalid (non-numeric) course ID", async () => {
    const invalidId = "abc";
    const req = new NextRequest(`${BASE_URL}/${invalidId}`, {
      method: "POST",
      headers: {
        "x-user-id": userId.toString(),
        "x-group-id": groupId.toString(),
      },
    });

    const params = Promise.resolve({ id: invalidId });
    const res = await POST(req, { params });
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.message).toBe("Invalid Course ID");
  });
});

// command = npx vitest run src/app/api/instructor/courses/create_course/submit/submit_course.test.ts --no-file-parallelism
