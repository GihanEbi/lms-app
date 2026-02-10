import { NextRequest } from "next/server";
import { db } from "@/db";
import { instructorVerifications } from "@/db/schema";
import { eq } from "drizzle-orm";
import { withAudit } from "@/src/lib/audit";
import { createResponse } from "@/src/lib/api-response";
import { requireAccess } from "@/src/lib/auth-guard";
import { AccessConstants } from "@/src/constants/AccessConstants";
import { verifyRejectCertificateSchema } from "@/src/services/validation/schemas/instructors/verifyRejectCertificateSchema";
import { certificateVerificationConstants } from "@/src/constants/instructorConstants";

const getUserId = (req: Request): number => {
  const testId = req.headers.get("x-user-id");
  return testId ? parseInt(testId) : 1;
};

export async function PUT(req: NextRequest) {
  // 1. Admin Access Check
  const accessError = await requireAccess(
    req,
    AccessConstants.INSTRUCTOR_CREATE_EDIT, 
  );
  if (accessError) return accessError;

  try {
    const body = await req.json();

    // 2. Validation
    const { error } = verifyRejectCertificateSchema.validate(body);
    if (error)
      return createResponse(false, error.details[0].message, null, 400);

    const { instructor_id, status, rejection_reason } = body;

    // 3. Check Existence (using instructor_id as key)
    const existing = await db
      .select()
      .from(instructorVerifications)
      .where(eq(instructorVerifications.instructor_id, instructor_id))
      .limit(1);

    if (existing.length === 0) {
      return createResponse(
        false,
        "Verification record not found for this instructor",
        null,
        404,
      );
    }

    const verificationRecordId = existing[0].id;
    const userId = getUserId(req);

    // 4. Update Logic with Audit
    const [updatedVerification] = await withAudit(
      userId,
      "UPDATE",
      instructorVerifications,
      verificationRecordId,
      async () => {
        return await db
          .update(instructorVerifications)
          .set({
            status: status,
            // Clear reason if verified, otherwise set it
            rejection_reason:
              status === certificateVerificationConstants.VERIFIED
                ? null
                : rejection_reason,
            user_modified: userId,
            updated_at: new Date(),
          })
          .where(eq(instructorVerifications.id, verificationRecordId))
          .returning({
            id: instructorVerifications.id,
            instructor_id: instructorVerifications.instructor_id,
            status: instructorVerifications.status,
            rejection_reason: instructorVerifications.rejection_reason,
          });
      },
    );

    return createResponse(
      true,
      `Certificate status updated to ${status}`,
      updatedVerification,
      200,
    );
  } catch (error) {
    console.error("Verify/Reject Certificate Error:", error);
    return createResponse(
      false,
      "Failed to update certificate status",
      null,
      500,
    );
  }
}
