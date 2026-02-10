import { NextRequest } from "next/server";
import { db } from "@/db";
import {
  instructorPreferences,
  instructorExpertise,
  instructors,
  subjects,
} from "@/db/schema";
import { withAudit } from "@/src/lib/audit";
import { eq, inArray } from "drizzle-orm";
import { createResponse } from "@/src/lib/api-response";
import { requireAccess } from "@/src/lib/auth-guard";
import { AccessConstants } from "@/src/constants/AccessConstants"; // Add INSTRUCTOR_PREFERENCE_*
import { createInstructorPreferenceSchema } from "@/src/services/validation/schemas/instructors/instructorPreferencesSchema";

const getUserId = (req: Request): number => {
  const testId = req.headers.get("x-user-id");
  return testId ? parseInt(testId) : 1;
};

// 1. GET (Get Preference by Instructor ID via query param)
// Usage: /api/instructor_preferences?instructor_id=123
export async function GET(req: NextRequest) {
  //  ========================= ACCESS CONTROL CHECK =========================
  const accessError = await requireAccess(req, AccessConstants.INSTRUCTOR_GET);
  if (accessError) return accessError;

  const instructorId = req.nextUrl.searchParams.get("instructor_id");

  if (!instructorId) {
    return createResponse(
      false,
      "instructor_id query parameter is required",
      null,
      400,
    );
  }

  try {
    // check instructor id exists
    const instExists = await db
      .select()
      .from(instructors)
      .where(eq(instructors.id, parseInt(instructorId)))
      .limit(1);
    if (instExists.length === 0) {
      return createResponse(false, "Instructor not found", null, 404);
    }

    // Fetch Preferences
    const pref = await db.query.instructorPreferences.findFirst({
      where: eq(instructorPreferences.instructor_id, parseInt(instructorId)),
    });

    if (!pref) {
      // It's valid to not have preferences yet, return null data but success 200
      return createResponse(
        true,
        "No preferences found for this instructor",
        null,
        200,
      );
    }

    // Fetch Expertise (Subjects)
    const expertise = await db
      .select({
        subject_id: subjects.id,
        subject_name: subjects.subject_name,
      })
      .from(instructorExpertise)
      .innerJoin(subjects, eq(instructorExpertise.subject_id, subjects.id))
      .where(eq(instructorExpertise.instructor_id, parseInt(instructorId)));

    return createResponse(
      true,
      "Fetched successfully",
      { ...pref, expertise },
      200,
    );
  } catch (error) {
    console.error("Fetch Prefs Error:", error);
    return createResponse(false, "Error fetching preferences", null, 500);
  }
}

// 2. CREATE
export async function POST(req: Request) {
  //  ========================= ACCESS CONTROL CHECK =========================
  const accessError = await requireAccess(
    req,
    AccessConstants.INSTRUCTOR_CREATE_EDIT,
  );
  if (accessError) return accessError;

  try {
    const body = await req.json();
    // ====================== VALIDATION ======================
    const { error } = createInstructorPreferenceSchema.validate(body);
    if (error)
      return createResponse(false, error.details[0].message, null, 400);

    const {
      instructor_id,
      subject_ids,
      teaching_methodology,
      student_capacity,
      linkedin_url,
      portfolio_url,
      weekly_availability,
    } = body;

    // Check if Instructor Exists
    const instExists = await db
      .select()
      .from(instructors)
      .where(eq(instructors.id, instructor_id))
      .limit(1);
    if (instExists.length === 0)
      return createResponse(false, "Instructor not found", null, 404);

    // ====================== 🛡️ ROBUST DUPLICATE CHECK ======================
    // Check if ANY user exists with the same id...
    const existing = await db
      .select()
      .from(instructorPreferences)
      .where(eq(instructorPreferences.instructor_id, instructor_id))
      .limit(1);
    if (existing.length > 0)
      return createResponse(
        false,
        "Preferences already exist for this instructor. Use PUT to update.",
        null,
        409,
      );

    // ====================== CREATE WITH AUDIT =======================
    const userId = getUserId(req);

    // Transaction: Create Prefs + Insert Expertise
    const result = await db.transaction(async (tx) => {
      // 1. Insert Preferences
      const [newPref] = await withAudit(
        userId,
        "CREATE",
        instructorPreferences,
        null,
        async () => {
          return await tx
            .insert(instructorPreferences)
            .values({
              instructor_id,
              user_created: userId,
              teaching_methodology,
              student_capacity,
              linkedin_url,
              portfolio_url,
              weekly_availability,
            })
            .returning();
        },
      );

      // 2. Insert Expertise (Subjects)
      if (subject_ids && subject_ids.length > 0) {
        // Optional: Verify subjects exist
        const validSubjects = await tx
          .select()
          .from(subjects)
          .where(inArray(subjects.id, subject_ids));
        if (validSubjects.length !== subject_ids.length)
          throw new Error("One or more Invalid Subject IDs");

        await tx.insert(instructorExpertise).values(
          subject_ids.map((sid: number) => ({
            instructor_id: instructor_id,
            subject_id: sid,
          })),
        );
      }

      return newPref;
    });

    return createResponse(true, "Preferences saved successfully", result, 201);
  } catch (error: any) {
    console.error("Create Prefs Error:", error);
    return createResponse(
      false,
      error.message || "Failed to save preferences",
      null,
      500,
    );
  }
}
