import { NextResponse } from "next/server";
import { db } from "@/db";
import { degreeCertificate, instructors } from "@/db/schema";
import { and, eq, is, ne, or } from "drizzle-orm";
import { withAudit } from "@/src/lib/audit";
import { createResponse } from "@/src/lib/api-response";
import { requireAccess } from "@/src/lib/auth-guard";
import { AccessConstants } from "@/src/constants/AccessConstants";
import { editInstructorPersonalInformationSchema } from "@/src/services/validation/schemas/instructors/instructorPersonalInformation";
import bcrypt from "bcryptjs";

const getUserId = (req: Request): number => {
  const testId = req.headers.get("x-user-id");
  return testId ? parseInt(testId) : 1;
};

interface RouteParams {
  params: Promise<{ id: string }>;
}

// 3. GET SINGLE
export async function GET(req: Request, { params }: RouteParams) {
  //  ========================= ACCESS CONTROL CHECK =========================
  const accessError = await requireAccess(req, AccessConstants.INSTRUCTOR_GET);
  if (accessError) return accessError;

  try {
    const { id } = await params;
    if (!id) return createResponse(false, "ID is required", null, 400);
    const idAsNumber = parseInt(id);
    if (isNaN(idAsNumber))
      return createResponse(false, "Invalid ID", null, 400);

    const result = await db
      .select({
        id: instructors.id,
        full_name: instructors.full_name,
        email: instructors.email,
        phone_number: instructors.phone_number,
        is_active: instructors.is_active,
        address: instructors.address,
        date_of_birth: instructors.date_of_birth,
        resume_url: instructors.resume_url,
        profile_picture_url: instructors.profile_picture_url,
        years_of_experience: instructors.years_of_experience,
        highest_degree_certificate_id:
          instructors.highest_degree_certificate_id,
        highest_degree_name: degreeCertificate.degree_certificate_name,
        // Exclude password_hash
      })
      .from(instructors)
      .leftJoin(
        degreeCertificate,
        eq(instructors.highest_degree_certificate_id, degreeCertificate.id),
      )
      .where(eq(instructors.id, idAsNumber))
      .limit(1);

    if (result.length === 0)
      return createResponse(false, "Instructor not found", null, 404);

    return createResponse(true, "Fetched successfully", result[0], 200);
  } catch (error) {
    return createResponse(false, "Error fetching instructor", null, 500);
  }
}

// 4. UPDATE
export async function PUT(req: Request, { params }: RouteParams) {
  const accessError = await requireAccess(req, AccessConstants.INSTRUCTOR_CREATE_EDIT);
  if (accessError) return accessError;

  try {
    const { id } = await params;
    if (!id) return createResponse(false, "ID is required", null, 400);
    const idAsNumber = parseInt(id);
    if (isNaN(idAsNumber))
      return createResponse(false, "Invalid ID", null, 400);

    const body = await req.json();

    // ====================== VALIDATION ======================
    const { error } = editInstructorPersonalInformationSchema.validate(body);
    if (error)
      return createResponse(false, error.details[0].message, null, 400);

    // Extract fields
    const {
      full_name,
      email,
      phone_number,
      highest_degree_certificate_id,
      years_of_experience,
      date_of_birth,
      address,
      profile_picture_url,
      resume_url,
      is_active,
    } = body;

    // ====================== CHECK AVAILABLE ID ======================
    const existing = await db
      .select()
      .from(instructors)
      .where(eq(instructors.id, idAsNumber))
      .limit(1);

    if (existing.length === 0)
      return createResponse(false, "Instructor not found", null, 404);

    // ====================== 🛡️ ROBUST DUPLICATE CHECK ======================
    // Check if ANY user exists with the same Email or Phone Number...
    // ...BUT exclude the user we are currently updating (id != idAsNumber)
    const duplicate = await db
      .select()
      .from(instructors)
      .where(
        and(
          or(
            eq(instructors.email, email),
            eq(instructors.phone_number, phone_number),
          ),
          ne(instructors.id, idAsNumber),
        ),
      )
      .limit(1);

    if (duplicate.length > 0) {
      const msg =
        duplicate[0].email === email
          ? "Email already exists"
          : "Phone number already exists";
      return createResponse(false, msg, null, 409);
    }

    // ====================== UPDATE WITH AUDIT =======================
    const userId = getUserId(req);
    const updateValues: any = {
      email,
      phone_number,
      highest_degree_certificate_id: highest_degree_certificate_id || null,
      user_created: userId,
      full_name,
      years_of_experience,
      date_of_birth: date_of_birth || null,
      address: address || null,
      profile_picture_url: profile_picture_url || null,
      resume_url: resume_url || null,
      is_active,
      user_modified: userId,
      updated_at: new Date(),
    };

    const [updatedItem] = await withAudit(
      userId,
      "UPDATE",
      instructors,
      idAsNumber,
      async () => {
        return await db
          .update(instructors)
          .set(updateValues)
          .where(eq(instructors.id, idAsNumber))
          .returning({
            id: instructors.id,
            full_name: instructors.full_name,
            email: instructors.email,
            phone_number: instructors.phone_number,
            highest_degree_certificate_id:
              instructors.highest_degree_certificate_id,
            years_of_experience: instructors.years_of_experience,
            date_of_birth: instructors.date_of_birth,
            address: instructors.address,
            profile_picture_url: instructors.profile_picture_url,
            resume_url: instructors.resume_url,
            is_active: instructors.is_active,
          });
      },
    );

    return createResponse(true, "Updated successfully", updatedItem, 200);
  } catch (error) {
    return createResponse(false, "Failed to update instructor", null, 500);
  }
}

// 5. DELETE
export async function DELETE(req: Request, { params }: RouteParams) {
  //  ========================= ACCESS CONTROL CHECK =========================
  const accessError = await requireAccess(
    req,
    AccessConstants.INSTRUCTOR_DELETE,
  );
  if (accessError) return accessError;

  try {
    const { id } = await params;
    if (!id) return createResponse(false, "ID is required", null, 400);
    const idAsNumber = parseInt(id);
    if (isNaN(idAsNumber))
      return createResponse(false, "Invalid ID", null, 400);

    // ====================== CHECK AVAILABLE ID ======================
    const existing = await db
      .select()
      .from(instructors)
      .where(eq(instructors.id, idAsNumber))
      .limit(1);

    if (existing.length === 0)
      return createResponse(false, "Instructor not found", null, 404);

    // ====================== DELETE WITH AUDIT =======================
    const userId = getUserId(req);

    await withAudit(userId, "DELETE", instructors, idAsNumber, async () => {
      return await db
        .delete(instructors)
        .where(eq(instructors.id, idAsNumber))
        .returning();
    });

    return createResponse(true, "Deleted successfully");
  } catch (error) {
    return createResponse(false, "Failed to delete instructor", null, 500);
  }
}
