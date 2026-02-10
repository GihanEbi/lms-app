import { describe, it, expect, beforeEach } from "vitest";
import { POST } from "./route";
import { GET, PUT, DELETE } from "./[id]/route";
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
import { courseLevels, courseStatus } from "@/src/constants/courseConstants";

const BASE_URL =
  "http://localhost:3000/api/instructor/courses/create_course/basic_information";

describe("Course Basic Information CRUD Tests", () => {
  let instructorUserId: number;
  let instructorGroupId: number;
  let instructorId: number;
  let categoryId: number;

  beforeEach(async () => {
    // 1. Setup User & Group
    const [group] = await db
      .insert(userGroups)
      .values({ name: `Instructor Group ${Date.now()}`, is_active: true })
      .returning();
    instructorGroupId = group.id;

    const [user] = await db
      .insert(users)
      .values({
        full_name: "Course Creator",
        email: `creator_${Date.now()}@test.com`,
        password_hash: "hash",
        group_id: instructorGroupId,
      })
      .returning();
    instructorUserId = user.id;

    // 2. Grant Permissions (Create, Edit, Delete)
    const permissions = [
      { name: "Create/Edit Course", code: AccessConstants.COURSE_CREATE_EDIT },
      { name: "Get Course", code: AccessConstants.COURSE_GET },
      { name: "Delete Course", code: AccessConstants.COURSE_DELETE },
    ];

    const rulesList = await db
      .insert(rules)
      .values(
        permissions.map((p) => ({ ...p, user_created: instructorUserId })),
      )
      .returning();

    await db
      .insert(groupRules)
      .values(
        rulesList.map((r) => ({ group_id: instructorGroupId, rule_id: r.id })),
      );

    // 3. Create Instructor Profile
    const [inst] = await db
      .insert(instructors)
      .values({
        full_name: "Professor X",
        email: `creator_${Date.now()}@test.com`,
        password_hash: "hash",
        phone_number: `${Date.now()}`.slice(0, 10),
        user_created: instructorUserId,
      })
      .returning();
    instructorId = inst.id;

    // 4. Create Subject Category
    const [cat] = await db
      .insert(subjectCategories)
      .values({
        subject_category_name: "Web Development",
        user_created: instructorUserId,
      })
      .returning();
    categoryId = cat.id;
  });

  // --- HELPER: Create a Course for Testing ---
  async function createCourseHelper() {
    const req = new NextRequest(BASE_URL, {
      method: "POST",
      headers: {
        "x-user-id": instructorUserId.toString(),
        "x-group-id": instructorGroupId.toString(),
      },
      body: JSON.stringify({
        instructor_id: instructorId,
        title: "Test Course",
        subtitle: "Subtitle",
        category_id: categoryId,
        level: courseLevels.BEGINNER,
        description: "Desc",
        thumbnail_url: "https://example.com/img.jpg",
        promo_video_url: "https://example.com/vid.mp4",
      }),
    });
    const res = await POST(req);
    const json = await res.json();
    return json.data;
  }

  // --- TEST 1: CREATE (POST) ---
  it("should create a new course successfully", async () => {
    const createdCourse = await createCourseHelper();

    expect(createdCourse.id).toBeDefined();
    expect(createdCourse.title).toBe("Test Course");
    expect(createdCourse.status).toBe(courseStatus.DRAFT);

    // Verify DB
    const dbCourse = await db.query.courses.findFirst({
      where: eq(courses.id, createdCourse.id),
    });
    expect(dbCourse).toBeDefined();
    expect(dbCourse?.category_id).toBe(categoryId);
  });

  // --- TEST 2: READ (GET) ---
  it("should fetch the created course by ID", async () => {
    const createdCourse = await createCourseHelper();

    const req = new NextRequest(`${BASE_URL}/${createdCourse.id}`, {
      method: "GET",
      headers: {
        "x-user-id": instructorUserId.toString(),
        "x-group-id": instructorGroupId.toString(),
      },
    });

    const params = Promise.resolve({ id: createdCourse.id.toString() });
    const res = await GET(req, { params });
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.data.id).toBe(createdCourse.id);
    expect(json.data.category_name).toBe("Web Development"); // Check JOIN
  });

  // --- TEST 3: UPDATE (PUT) ---
  it("should update course details", async () => {
    const createdCourse = await createCourseHelper();

    const req = new NextRequest(`${BASE_URL}/${createdCourse.id}`, {
      method: "PUT",
      headers: {
        "x-user-id": instructorUserId.toString(),
        "x-group-id": instructorGroupId.toString(),
      },
      body: JSON.stringify({
        instructor_id: instructorId,
        title: "Updated: Next.js 15 Mastery",
        subtitle: "Updated subtitle",
        category_id: categoryId,
        level: courseLevels.ADVANCED,
        description: "Updated description",
        thumbnail_url: "https://example.com/new_thumb.jpg",
        promo_video_url: "https://example.com/new_video.mp4",
      }),
    });

    const params = Promise.resolve({ id: createdCourse.id.toString() });
    const res = await PUT(req, { params });
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.data.title).toBe("Updated: Next.js 15 Mastery");
    expect(json.data.level).toBe(courseLevels.ADVANCED);
  });

  // --- TEST 4: DELETE (DELETE) ---
  it("should delete the course", async () => {
    const createdCourse = await createCourseHelper();

    const req = new NextRequest(`${BASE_URL}/${createdCourse.id}`, {
      method: "DELETE",
      headers: {
        "x-user-id": instructorUserId.toString(),
        "x-group-id": instructorGroupId.toString(),
      },
    });

    const params = Promise.resolve({ id: createdCourse.id.toString() });
    const res = await DELETE(req, { params });
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);

    // Verify Deletion
    const check = await db
      .select()
      .from(courses)
      .where(eq(courses.id, createdCourse.id));
    expect(check.length).toBe(0);
  });

  // --- TEST 5: ERROR HANDLING (Get Deleted Course) ---
  it("should return 404 when fetching a deleted course", async () => {
    // 1. Create
    const createdCourse = await createCourseHelper();

    // 2. Delete directly via DB (to simulate non-existence or deleted state)
    await db.delete(courses).where(eq(courses.id, createdCourse.id));

    // 3. Try Fetch
    const req = new NextRequest(`${BASE_URL}/${createdCourse.id}`, {
      method: "GET",
      headers: {
        "x-user-id": instructorUserId.toString(),
        "x-group-id": instructorGroupId.toString(),
      },
    });

    const params = Promise.resolve({ id: createdCourse.id.toString() });
    const res = await GET(req, { params });

    expect(res.status).toBe(404);
  });
});
// command = npx vitest run src/app/api/instructor/courses/create_course/basic_information/basic_information.test.ts --no-file-parallelism
