import { NextResponse } from "next/server";
import { db } from "@/db";
import { subjects, subjectCategories } from "@/db/schema";
import { and, eq, ne } from "drizzle-orm";
import { withAudit } from "@/src/lib/audit";
import { createResponse } from "@/src/lib/api-response";
import { requireAccess } from "@/src/lib/auth-guard";
import { AccessConstants } from "@/src/constants/AccessConstants";
import { editSubjectSchema } from "@/src/services/validation/schemas/subjectSchema";

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
  const accessError = await requireAccess(
    req,
    AccessConstants.SYSTEM_SETTINGS_GET,
  );
  if (accessError) return accessError;

  try {
    const { id } = await params;
    if (!id) return createResponse(false, "ID is required", null, 400);

    const idAsNumber = parseInt(id);
    if (isNaN(idAsNumber))
      return createResponse(false, "Invalid ID", null, 400);

    const result = await db
      .select()
      .from(subjects)
      .where(eq(subjects.id, idAsNumber))
      .limit(1);

    if (result.length === 0)
      return createResponse(false, "Subject not found", null, 404);

    return createResponse(true, "Fetched successfully", result[0], 200);
  } catch (error) {
    console.error("Error fetching subject:", error);
    return createResponse(false, "Error fetching subject", null, 500);
  }
}

// 4. UPDATE
export async function PUT(req: Request, { params }: RouteParams) {
  //  ========================= ACCESS CONTROL CHECK =========================
  const accessError = await requireAccess(
    req,
    AccessConstants.SYSTEM_SETTINGS_ADD_EDIT,
  );
  if (accessError) return accessError;

  try {
    const { id } = await params;
    if (!id) return createResponse(false, "ID is required", null, 400);

    const idAsNumber = parseInt(id);
    if (isNaN(idAsNumber))
      return createResponse(false, "Invalid ID", null, 400);

    const body = await req.json();
    const { subject_name, description, is_active, subject_category_id } = body;

    // ====================== VALIDATION ======================
    const { error } = editSubjectSchema.validate(body);
    if (error)
      return createResponse(false, error.details[0].message, null, 400);

    // =======================  Validate Category Exists =======================
    const categoryExists = await db
      .select()
      .from(subjectCategories)
      .where(eq(subjectCategories.id, subject_category_id))
      .limit(1);

    if (categoryExists.length === 0) {
      return createResponse(false, "Invalid Subject Category ID", null, 400);
    }

    // ====================== CHECK AVAILABLE ID ======================
    const existing = await db
      .select()
      .from(subjects)
      .where(eq(subjects.id, idAsNumber))
      .limit(1);

    if (existing.length === 0)
      return createResponse(false, "Subject not found", null, 404);

    // ====================== 🛡️ ROBUST DUPLICATE CHECK ======================
    // Check if ANY user exists with the same subject_name ...
    // ...BUT exclude the user we are currently updating (id != idAsNumber)
    const duplicate = await db
      .select()
      .from(subjects)
      .where(
        and(
          eq(subjects.subject_name, subject_name),
          ne(subjects.id, idAsNumber),
        ),
      )
      .limit(1);

    if (duplicate.length > 0) {
      return createResponse(false, "Subject Name already exists", null, 409);
    }

    // ====================== UPDATE WITH AUDIT =======================
    const userId = getUserId(req);

    const [updatedItem] = await withAudit(
      userId,
      "UPDATE",
      subjects,
      idAsNumber,
      async () => {
        return await db
          .update(subjects)
          .set({
            subject_name,
            description,
            is_active,
            subject_category_id,
            user_modified: userId,
            updated_at: new Date(),
          })
          .where(eq(subjects.id, idAsNumber))
          .returning();
      },
    );

    return createResponse(true, "Updated successfully", updatedItem, 200);
  } catch (error) {
    console.error("Update Subject Error:", error);
    return createResponse(false, "Failed to update subject", null, 500);
  }
}

// 5. DELETE
export async function DELETE(req: Request, { params }: RouteParams) {
  //  ========================= ACCESS CONTROL CHECK =========================
  const accessError = await requireAccess(
    req,
    AccessConstants.SYSTEM_SETTINGS_DELETE,
  );
  if (accessError) return accessError;

  try {
    const { id } = await params;
    if (!id) return createResponse(false, "ID is required", null, 400);
    const idAsNumber = parseInt(id);
    if (isNaN(idAsNumber))
      return createResponse(false, "Invalid ID", null, 400);

    const existing = await db
      .select()
      .from(subjects)
      .where(eq(subjects.id, idAsNumber))
      .limit(1);

    if (existing.length === 0)
      return createResponse(false, "Subject not found", null, 404);

    // ====================== DELETE WITH AUDIT =======================
    const userId = getUserId(req);

    await withAudit(userId, "DELETE", subjects, idAsNumber, async () => {
      return await db
        .delete(subjects)
        .where(eq(subjects.id, idAsNumber))
        .returning();
    });

    return createResponse(true, "Deleted successfully");
  } catch (error) {
    console.error("Delete Subject Error:", error);
    return createResponse(false, "Failed to delete subject", null, 500);
  }
}
