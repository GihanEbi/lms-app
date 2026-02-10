import { describe, it, expect, beforeEach } from "vitest";
import { POST, GET as GET_BY_INSTRUCTOR } from "./route";
import { PUT } from "./[id]/route";
import { NextRequest } from "next/server";
import { db } from "@/db";
import {
  instructorPreferences,
  instructorExpertise,
  instructors,
  degreeCertificate,
  users,
  userGroups,
  rules,
  groupRules,
  subjects,
  subjectCategories,
} from "@/db/schema";
import { AccessConstants } from "@/src/constants/AccessConstants";

const BASE_URL = "http://localhost:3000/api/instructor_preferences";

describe("Instructor Preferences API Integration Tests", () => {
  let testUserId: number;
  let testGroupId: number;
  let testInstructorId: number;
  let subId1: number;
  let subId2: number;

  beforeEach(async () => {
    // 1. User & Group
    const [group] = await db
      .insert(userGroups)
      .values({ name: `Pref Group ${Date.now()}`, is_active: true })
      .returning();
    testGroupId = group.id;
    const [user] = await db
      .insert(users)
      .values({
        full_name: "Pref User",
        email: `pref_${Date.now()}@test.com`,
        password_hash: "hash",
        group_id: testGroupId,
      })
      .returning();
    testUserId = user.id;

    // 2. Permissions
    const perms = [
      { name: "Get Prefs", code: AccessConstants.INSTRUCTOR_GET },
      {
        name: "Create/Edit Prefs",
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

    // 3. Dependencies: Degree, Instructor, Category, Subjects
    const [cert] = await db
      .insert(degreeCertificate)
      .values({ degree_certificate_name: "MSc", user_created: testUserId })
      .returning();

    const [inst] = await db
      .insert(instructors)
      .values({
        full_name: "Dr. Tester",
        email: `inst_${Date.now()}@edu.com`,
        password_hash: "hash",
        phone_number: `${Date.now()}`.slice(0, 10),
        highest_degree_certificate_id: cert.id,
        user_created: testUserId,
      })
      .returning();
    testInstructorId = inst.id;

    const [cat] = await db
      .insert(subjectCategories)
      .values({ subject_category_name: "IT", user_created: testUserId })
      .returning();
    const [s1] = await db
      .insert(subjects)
      .values({
        subject_name: "React",
        subject_category_id: cat.id,
        user_created: testUserId,
      })
      .returning();
    const [s2] = await db
      .insert(subjects)
      .values({
        subject_name: "NextJS",
        subject_category_id: cat.id,
        user_created: testUserId,
      })
      .returning();
    subId1 = s1.id;
    subId2 = s2.id;
  });

  async function createPreferences() {
    const req = new NextRequest(BASE_URL, {
      method: "POST",
      headers: {
        "x-user-id": testUserId.toString(),
        "x-group-id": testGroupId.toString(),
      },
      body: JSON.stringify({
        instructor_id: testInstructorId,
        teaching_methodology: "Project Based",
        student_capacity: 50,
        linkedin_url: "https://linkedin.com/in/tester",
        weekly_availability: [{ day: "Mon", slots: ["morning", "evening"] }],
        subject_ids: [subId1, subId2], // Expertise
      }),
    });
    req.headers.set("x-group-id", testGroupId.toString());
    const res = await POST(req);
    return await res.json();
  }

  // TEST 1: CREATE
  it("should save instructor preferences and expertise", async () => {
    const json = await createPreferences();
    expect(json.success).toBe(true);
    expect(json.data.teaching_methodology).toBe("Project Based");

    // Verify Join Table
    const expertise = await db.query.instructorExpertise.findMany({
      where: (t, { eq }) => eq(t.instructor_id, testInstructorId),
    });
    expect(expertise).toHaveLength(2);
  });

  // TEST 2: GET
  it("should fetch preferences with expertise", async () => {
    await createPreferences();
    const req = new NextRequest(
      `${BASE_URL}?instructor_id=${testInstructorId}`,
      { method: "GET" },
    );
    req.headers.set("x-user-id", testUserId.toString());
    req.headers.set("x-group-id", testGroupId.toString());

    const res = await GET_BY_INSTRUCTOR(req);
    const json = await res.json();

    expect(json.data.linkedin_url).toBe("https://linkedin.com/in/tester");
    expect(json.data.expertise).toHaveLength(2);
    expect(json.data.expertise[0].subject_name).toBeDefined();
  });

  // TEST 3: UPDATE
  it("should update preferences and replace expertise", async () => {
    const created = await createPreferences();
    const prefId = created.data.id;

    const req = new NextRequest(`${BASE_URL}/${prefId}`, {
      method: "PUT",
      headers: {
        "x-user-id": testUserId.toString(),
        "x-group-id": testGroupId.toString(),
      },
      body: JSON.stringify({
        student_capacity: 100,
        subject_ids: [subId1], // Removed subId2
      }),
    });
    req.headers.set("x-group-id", testGroupId.toString());

    const params = Promise.resolve({ id: prefId.toString() });
    const res = await PUT(req, { params });
    const json = await res.json();

    expect(json.data.student_capacity).toBe(100);

    // Verify Expertise Sync (Should only have 1 now)
    const expertise = await db.query.instructorExpertise.findMany({
      where: (t, { eq }) => eq(t.instructor_id, testInstructorId),
    });
    expect(expertise).toHaveLength(1);
    expect(expertise[0].subject_id).toBe(subId1);
  });
});
