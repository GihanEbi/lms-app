import { db } from "@/db";
import {
  instructorPreferences,
  instructorExpertise,
  subjects,
  instructors,
} from "@/db/schema";
import { eq, inArray } from "drizzle-orm";
import { withAudit } from "@/src/lib/audit";
import { createResponse } from "@/src/lib/api-response";
import { requireAccess } from "@/src/lib/auth-guard";
import { AccessConstants } from "@/src/constants/AccessConstants";
import { editInstructorPreferenceSchema } from "@/src/services/validation/schemas/instructors/instructorPreferencesSchema";

const getUserId = (req: Request): number => {
  const testId = req.headers.get("x-user-id");
  return testId ? parseInt(testId) : 1;
};

interface RouteParams {
  params: Promise<{ id: string }>;
}

// 3. UPDATE
export async function PUT(req: Request, { params }: RouteParams) {
  //  ========================= ACCESS CONTROL CHECK =========================
  const accessError = await requireAccess(
    req,
    AccessConstants.INSTRUCTOR_CREATE_EDIT,
  );
  if (accessError) return accessError;

  try {
    const { id } = await params;
    if (!id) return createResponse(false, "ID is required", null, 400);
    const idAsNumber = parseInt(id);
    if (isNaN(idAsNumber))
      return createResponse(false, "Invalid ID", null, 400);

    const body = await req.json();
    // ====================== VALIDATION ======================
    const { error } = editInstructorPreferenceSchema.validate(body);
    if (error)
      return createResponse(false, error.details[0].message, null, 400);

    const {
      subject_ids,
      teaching_methodology,
      student_capacity,
      linkedin_url,
      portfolio_url,
      weekly_availability,
    } = body;

    // Check Existence
    const existing = await db
      .select()
      .from(instructorPreferences)
      .where(eq(instructorPreferences.id, idAsNumber))
      .limit(1);
    if (existing.length === 0)
      return createResponse(false, "Preference record not found", null, 404);

    const instructorId = existing[0].instructor_id;
    // Check if Instructor Exists
    const instExists = await db
      .select()
      .from(instructors)
      .where(eq(instructors.id, instructorId))
      .limit(1);
    if (instExists.length === 0) {
      return createResponse(false, "Instructor not found", null, 404);
    }
    // ====================== UPDATE WITH AUDIT =======================
    const userId = getUserId(req);

    // Transaction
    const updated = await db.transaction(async (tx) => {
      // 1. Update Base Preferences
      const [upd] = await withAudit(
        userId,
        "UPDATE",
        instructorPreferences,
        idAsNumber,
        async () => {
          return await tx
            .update(instructorPreferences)
            .set({
              teaching_methodology,
              student_capacity,
              linkedin_url,
              portfolio_url,
              weekly_availability,
              user_modified: userId,
              updated_at: new Date(),
            })
            .where(eq(instructorPreferences.id, idAsNumber))
            .returning();
        },
      );

      // 2. Sync Expertise (If provided)
      if (subject_ids) {
        // Delete old
        await tx
          .delete(instructorExpertise)
          .where(eq(instructorExpertise.instructor_id, instructorId));

        // Insert new
        if (subject_ids.length > 0) {
          // Verify subjects
          const validSubjects = await tx
            .select()
            .from(subjects)
            .where(inArray(subjects.id, subject_ids));
          if (validSubjects.length !== subject_ids.length)
            throw new Error("Invalid Subject IDs provided");

          await tx.insert(instructorExpertise).values(
            subject_ids.map((sid: number) => ({
              instructor_id: instructorId,
              subject_id: sid,
            })),
          );
        }
      }
      return upd;
    });

    return createResponse(true, "Updated successfully", updated, 200);
  } catch (error: any) {
    return createResponse(
      false,
      error.message || "Failed to update",
      null,
      500,
    );
  }
}
