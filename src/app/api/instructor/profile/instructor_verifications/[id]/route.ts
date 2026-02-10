import { NextResponse } from "next/server";
import { db } from "@/db";
import { instructorVerifications } from "@/db/schema";
import { eq } from "drizzle-orm";
import { withAudit } from "@/src/lib/audit";
import { createResponse } from "@/src/lib/api-response";
import { requireAccess } from "@/src/lib/auth-guard";
import { AccessConstants } from "@/src/constants/AccessConstants";
import { editInstructorVerificationSchema } from "@/src/services/validation/schemas/instructors/instructorVerificationSchema";

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
    const { error } = editInstructorVerificationSchema.validate(body);
    if (error)
      return createResponse(false, error.details[0].message, null, 400);

    // Check Existence
    const existing = await db
      .select()
      .from(instructorVerifications)
      .where(eq(instructorVerifications.id, idAsNumber))
      .limit(1);

    if (existing.length === 0) {
      return createResponse(false, "Record not found", null, 404);
    }

    // ====================== UPDATE WITH AUDIT =======================
    const userId = getUserId(req);

    const [updatedRecord] = await withAudit(
      userId,
      "UPDATE",
      instructorVerifications,
      idAsNumber,
      async () => {
        return await db
          .update(instructorVerifications)
          .set({
            ...body, // Includes updated arrays if present
            user_modified: userId,
            updated_at: new Date(),
          })
          .where(eq(instructorVerifications.id, idAsNumber))
          .returning();
      },
    );

    if (!updatedRecord)
      return createResponse(false, "Record not found", null, 404);

    return createResponse(true, "Verification updated", updatedRecord, 200);
  } catch (error) {
    console.error("Update Verification Error:", error);
    return createResponse(false, "Failed to update verification", null, 500);
  }
}
