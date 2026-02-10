import { describe, it, expect, beforeEach } from "vitest";
import { POST as CREATE_SECTION, GET as GET_SECTIONS } from "./route";
import { PUT as UPDATE_SECTION } from "./[id]/route";
import { NextRequest } from "next/server";
import { db } from "@/db";
import {
  users,
  userGroups,
  rules,
  groupRules,
  instructors,
  courses,
  courseSections,
  subjectCategories,
} from "@/db/schema";
import { AccessConstants } from "@/src/constants/AccessConstants";

const SECTIONS_URL =
  "http://localhost:3000/api/instructor/courses/create_course/curriculum";

describe("Curriculum (JSONB) API Tests", () => {
  let userId: number;
  let groupId: number;
  let courseId: number;

  beforeEach(async () => {
    // 1. Setup Group
    const [group] = await db
      .insert(userGroups)
      .values({ name: `Curr Group ${Date.now()}`, is_active: true })
      .returning();
    groupId = group.id;

    // 2. Setup User
    const [user] = await db
      .insert(users)
      .values({
        full_name: "Tutor",
        email: `tutor_${Date.now()}@test.com`,
        password_hash: "x",
        group_id: groupId,
      })
      .returning();
    userId = user.id;

    // 3. Setup Permissions
    // We ensure the permission exists and is linked to the group
    const [rule] = await db
      .insert(rules)
      .values({
        name: "Edit Course",
        code: AccessConstants.COURSE_CREATE_EDIT,
        user_created: userId,
      })
      .returning();

    await db.insert(groupRules).values({ group_id: groupId, rule_id: rule.id });

    // 4. Setup Instructor & Course Dependencies
    const [inst] = await db
      .insert(instructors)
      .values({
        full_name: "Tutor",
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

    const [course] = await db
      .insert(courses)
      .values({
        instructor_id: inst.id,
        title: "React Course",
        category_id: cat.id,
        user_created: userId,
      })
      .returning();
    courseId = course.id;
  });

  // --- HELPER: Create a Section ---
  async function createSectionHelper() {
    const req = new NextRequest(SECTIONS_URL, {
      method: "POST",
      headers: {
        "x-user-id": userId.toString(),
        "x-group-id": groupId.toString(),
      },
      body: JSON.stringify({
        course_id: courseId,
        section_title: "Helper Section",
        section_order: 1,
        section_content: [
          {
            title: "Video 1",
            type: "video",
            video_url: "http://vid.com",
          },
        ],
      }),
    });
    const res = await CREATE_SECTION(req);
    const json = await res.json();
    return json.data;
  }

  // --- TEST 1: CREATE SECTION WITH CONTENT ---
  it("should create a section with auto-generated content IDs", async () => {
    const section = await createSectionHelper();

    expect(section.section_title).toBe("Helper Section");
    expect(section.section_content).toHaveLength(1);
    expect(section.section_content[0].content_id).toBeDefined();
    expect(section.section_content[0].type).toBe("video");
  });

  // --- TEST 2: GET CURRICULUM BY COURSE ID ---
  it("should fetch all sections for a given course ID", async () => {
    // 1. Create Data
    await createSectionHelper();
    await createSectionHelper();

    // 2. Perform GET
    const req = new NextRequest(`${SECTIONS_URL}?course_id=${courseId}`, {
      method: "GET",
      headers: {
        "x-user-id": userId.toString(),
        "x-group-id": groupId.toString(),
      },
    });

    const res = await GET_SECTIONS(req);
    const json = await res.json();

    // 3. Debugging (Optional: logs 403 details if it fails)
    if (res.status === 403) {
      console.log("403 Error Details:", json);
    }

    expect(res.status).toBe(200);
    expect(Array.isArray(json.data)).toBe(true);
    expect(json.data.length).toBeGreaterThanOrEqual(2);
    expect(json.data[0].section_title).toBeDefined();
  });

  // --- TEST 3: UPDATE SECTION (ADD CONTENT) ---
  it("should update section content array", async () => {
    const section = await createSectionHelper();

    const req = new NextRequest(`${SECTIONS_URL}/${section.id}`, {
      method: "PUT",
      headers: {
        "x-user-id": userId.toString(),
        "x-group-id": groupId.toString(),
      },
      body: JSON.stringify({
        section_title: "Updated Intro",
        section_content: [
          {
            title: "New Quiz",
            type: "quiz",
            quiz_id: 101,
          },
        ],
      }),
    });

    const params = Promise.resolve({ id: section.id.toString() });
    const res = await UPDATE_SECTION(req, { params });
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.data.section_title).toBe("Updated Intro");
    expect(json.data.section_content[0].type).toBe("quiz");
    expect(json.data.section_content[0].content_id).toBeDefined();
  });
});
