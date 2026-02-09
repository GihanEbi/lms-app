import { db } from "@/db";
import { subjectCategories } from "@/db/schema";
import { and, eq, ne } from "drizzle-orm";
import { withAudit } from "@/src/lib/audit";
import { createResponse } from "@/src/lib/api-response";
import { requireAccess } from "@/src/lib/auth-guard";
import { AccessConstants } from "@/src/constants/AccessConstants";
import { editSubjectCategorySchema } from "@/src/services/validation/schemas/subjectCategorySchema";

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
      .from(subjectCategories)
      .where(eq(subjectCategories.id, idAsNumber))
      .limit(1);

    if (result.length === 0)
      return createResponse(false, "Record not found", null, 404);

    return createResponse(true, "Fetched successfully", result[0], 200);
  } catch (error) {
    return createResponse(false, "Error fetching record", null, 500);
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
    const { subject_category_name, description, is_active } = body;

    // ====================== VALIDATION ======================
    const { error } = editSubjectCategorySchema.validate(body);
    if (error)
      return createResponse(false, error.details[0].message, null, 400);

    // ====================== CHECK AVAILABLE ID ======================
    const existing = await db
      .select()
      .from(subjectCategories)
      .where(eq(subjectCategories.id, idAsNumber))
      .limit(1);

    if (existing.length === 0)
      return createResponse(false, "Record not found", null, 404);

    // ====================== 🛡️ ROBUST DUPLICATE CHECK ======================
    // Check if ANY user exists with the same subject_category_name...
    // ...BUT exclude the user we are currently updating (id != idAsNumber)
    const duplicate = await db
      .select()
      .from(subjectCategories)
      .where(
        and(
          eq(subjectCategories.subject_category_name, subject_category_name),
          ne(subjectCategories.id, idAsNumber),
        ),
      )
      .limit(1);

    if (duplicate.length > 0) {
      return createResponse(
        false,
        "Subject Category Name already exists",
        null,
        409,
      );
    }

    // ====================== UPDATE WITH AUDIT =======================
    const userId = getUserId(req);

    const [updatedItem] = await withAudit(
      userId,
      "UPDATE",
      subjectCategories,
      idAsNumber,
      async () => {
        return await db
          .update(subjectCategories)
          .set({
            subject_category_name,
            description,
            is_active,
            user_modified: userId,
            updated_at: new Date(),
          })
          .where(eq(subjectCategories.id, idAsNumber))
          .returning();
      },
    );

    return createResponse(true, "Updated successfully", updatedItem, 200);
  } catch (error) {
    return createResponse(false, "Failed to update record", null, 500);
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
      .from(subjectCategories)
      .where(eq(subjectCategories.id, idAsNumber))
      .limit(1);

    if (existing.length === 0)
      return createResponse(false, "Record not found", null, 404);

    // ====================== DELETE WITH AUDIT =======================
    const userId = getUserId(req);

    await withAudit(
      userId,
      "DELETE",
      subjectCategories,
      idAsNumber,
      async () => {
        return await db
          .delete(subjectCategories)
          .where(eq(subjectCategories.id, idAsNumber))
          .returning();
      },
    );

    return createResponse(true, "Deleted successfully", null, 200);
  } catch (error) {
    return createResponse(false, "Failed to delete record", null, 500);
  }
}
