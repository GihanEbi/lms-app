import { NextRequest } from "next/server";
import { db } from "@/db";
import { instructors } from "@/db/schema";
import { eq } from "drizzle-orm";
import { withAudit } from "@/src/lib/audit";
import { createResponse } from "@/src/lib/api-response";
import { requireAccess } from "@/src/lib/auth-guard";
import { AccessConstants } from "@/src/constants/AccessConstants";
import { InstructorRegistrationVerifyRejectSchema } from "@/src/services/validation/schemas/instructors/InstructorRegistrationVerifyRejectSchema";
import { instructorRegistrationStatusConstants } from "@/src/constants/instructorConstants";

const getUserId = (req: Request): number => {
  const testId = req.headers.get("x-user-id");
  return testId ? parseInt(testId) : 1;
};

export async function PUT(req: NextRequest) {
  // 1. Access Control (Admin only)
  const accessError = await requireAccess(
    req,
    AccessConstants.INSTRUCTOR_CREATE_EDIT, // Or a specific INSTRUCTOR_VERIFY permission
  );
  if (accessError) return accessError;

  try {
    const body = await req.json();

    // 2. Validation
    const { error } = InstructorRegistrationVerifyRejectSchema.validate(body);
    if (error)
      return createResponse(false, error.details[0].message, null, 400);

    const { instructor_id, status, rejection_reason } = body;

    // 3. Check Existence
    const existing = await db
      .select()
      .from(instructors)
      .where(eq(instructors.id, instructor_id))
      .limit(1);

    if (existing.length === 0) {
      return createResponse(false, "Instructor not found", null, 404);
    }

    const userId = getUserId(req);

    // 4. Update Logic
    const [updatedInstructor] = await withAudit(
      userId,
      "UPDATE",
      instructors,
      instructor_id,
      async () => {
        return await db
          .update(instructors)
          .set({
            registration_status: status,
            // If approved, clear the rejection reason. If rejected, set it.
            rejection_reason:
              status === instructorRegistrationStatusConstants.APPROVED
                ? null
                : rejection_reason,
            user_modified: userId,
            updated_at: new Date(),
          })
          .where(eq(instructors.id, instructor_id))
          .returning({
            id: instructors.id,
            full_name: instructors.full_name,
            email: instructors.email,
            registration_status: instructors.registration_status,
            rejection_reason: instructors.rejection_reason,
          });
      },
    );

    return createResponse(
      true,
      `Instructor account ${status} successfully`,
      updatedInstructor,
      200,
    );
  } catch (error) {
    console.error("Verify/Reject Instructor Error:", error);
    return createResponse(
      false,
      "Failed to update instructor status",
      null,
      500,
    );
  }
}
