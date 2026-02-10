import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { instructorVerifications, instructors } from "@/db/schema";
import { withAudit } from "@/src/lib/audit";
import { eq } from "drizzle-orm";
import { createResponse } from "@/src/lib/api-response";
import { requireAccess } from "@/src/lib/auth-guard";
import { AccessConstants } from "@/src/constants/AccessConstants";
import { createInstructorVerificationSchema } from "@/src/services/validation/schemas/instructors/instructorVerificationSchema";
import { certificateVerificationConstants } from "@/src/constants/instructorConstants";

const getUserId = (req: Request): number => {
  const testId = req.headers.get("x-user-id");
  return testId ? parseInt(testId) : 1;
};

// 1. GET (By Instructor ID)
export async function GET(req: NextRequest) {
  //  ========================= ACCESS CONTROL CHECK =========================
  const accessError = await requireAccess(req, AccessConstants.INSTRUCTOR_GET);
  if (accessError) return accessError;

  const instructorId = req.nextUrl.searchParams.get("instructor_id");
  if (!instructorId)
    return createResponse(false, "instructor_id is required", null, 400);

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

    const data = await db.query.instructorVerifications.findFirst({
      where: eq(instructorVerifications.instructor_id, parseInt(instructorId)),
    });

    if (!data)
      return createResponse(true, "No verification record found", null, 200);

    return createResponse(true, "Fetched successfully", data, 200);
  } catch (error) {
    return createResponse(false, "Error fetching verification", null, 500);
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
    const { error } = createInstructorVerificationSchema.validate(body);
    if (error)
      return createResponse(false, error.details[0].message, null, 400);

    const {
      instructor_id,
      identity_document_urls,
      certification_document_urls,
      professional_license_number,
      background_check_consent,
      digital_signature,
    } = body;

    // Check Instructor Exists
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
      .from(instructorVerifications)
      .where(eq(instructorVerifications.instructor_id, instructor_id))
      .limit(1);
    if (existing.length > 0)
      return createResponse(
        false,
        "Verification record already exists",
        null,
        409,
      );

    // ====================== CREATE WITH AUDIT =======================
    const userId = getUserId(req);

    const [newRecord] = await withAudit(
      userId,
      "CREATE",
      instructorVerifications,
      null,
      async () => {
        return await db
          .insert(instructorVerifications)
          .values({
            instructor_id,
            identity_document_urls, // ✅ Array handled automatically by jsonb
            certification_document_urls, // ✅ Array handled automatically by jsonb
            user_created: userId,
            status: certificateVerificationConstants.PENDING,
            professional_license_number,
            background_check_consent,
            digital_signature,
          })
          .returning();
      },
    );

    return createResponse(
      true,
      "Verification documents submitted",
      newRecord,
      201,
    );
  } catch (error) {
    console.error("Verification Create Error:", error);
    return createResponse(false, "Failed to submit documents", null, 500);
  }
}
