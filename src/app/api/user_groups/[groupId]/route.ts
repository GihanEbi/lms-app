import { NextResponse } from "next/server";
import { db } from "@/db";
import { userGroups } from "@/db/schema";
import { and, eq, ne, or } from "drizzle-orm";
import { withAudit } from "@/src/lib/audit";
import { createResponse } from "@/src/lib/api-response";
import { requireAccess } from "@/src/lib/auth-guard";
import { AccessConstants } from "@/src/constants/AccessConstants";
import { editUserGroupsSchema } from "@/src/services/validation/schemas/userGroupsSchema";

// 🛠️ HELPER: Get User ID from Header
const getUserId = (req: Request): number => {
  const testId = req.headers.get("x-user-id");
  return testId ? parseInt(testId) : 1;
};

interface RouteParams {
  params: Promise<{ groupId: string }>;
}

// 3. UPDATE GROUP
export async function PUT(req: Request, { params }: RouteParams) {
  //  ========================= ACCESS CONTROL CHECK =========================
  const accessError = await requireAccess(
    req,
    AccessConstants.USER_GROUP_CREATE_EDIT,
  );
  if (accessError) return accessError;

  try {
    const { groupId } = await params;
    if (!groupId)
      return createResponse(false, "Group ID is required", null, 400);

    const idAsNumber = parseInt(groupId);
    if (isNaN(idAsNumber))
      return createResponse(false, "Invalid Group ID", null, 400);

    const body = await req.json();
    const { name, description, is_active } = body;

    // ====================== VALIDATION ======================
    const { error } = editUserGroupsSchema.validate(body);
    if (error) {
      return createResponse(false, error.details[0].message, null, 400);
    }

    // ====================== CHECK IF GROUP EXISTS ======================
    const existingGroupById = await db
      .select()
      .from(userGroups)
      .where(eq(userGroups.id, idAsNumber))
      .limit(1);

    if (existingGroupById.length === 0) {
      return createResponse(false, "Group not found", null, 404);
    }

    // ====================== CHECK DUPLICATES (Name) - Excluding Self ======================
    const conflictingGroup = await db
      .select()
      .from(userGroups)
      .where(
        and(
          or(eq(userGroups.name, name)), // Match Name
          ne(userGroups.id, idAsNumber), // Exclude Self
        ),
      )
      .limit(1);

    if (conflictingGroup.length > 0) {
      const msg = `A group with the name "${name}" already exists. Please choose a different name.`;
      return createResponse(false, msg, null, 409);
    }

    // ====================== UPDATE WITH AUDIT ======================
    const userId = getUserId(req);

    const [updatedGroup] = await withAudit(
      userId,
      "UPDATE",
      userGroups,
      idAsNumber,
      async () => {
        return await db
          .update(userGroups)
          .set({
            name,
            description,
            is_active, // ✅ Correctly updating status
            user_modified: userId,
            updated_at: new Date(),
          })
          .where(eq(userGroups.id, idAsNumber))
          .returning();
      },
    );

    return createResponse(
      true,
      "Group updated successfully",
      updatedGroup,
      200,
    );
  } catch (error) {
    console.error("Update Group Error:", error);
    return createResponse(false, "Failed to update group", null, 500);
  }
}

// 4. DELETE GROUP
export async function DELETE(req: Request, { params }: RouteParams) {
  //  ========================= ACCESS CONTROL CHECK =========================
  const accessError = await requireAccess(
    req,
    AccessConstants.USER_GROUP_DELETE,
  );
  if (accessError) return accessError;

  try {
    const { groupId } = await params;
    if (!groupId)
      return createResponse(false, "Group ID is required", null, 400);

    const idAsNumber = parseInt(groupId);
    if (isNaN(idAsNumber))
      return createResponse(false, "Invalid Group ID", null, 400);

    // ====================== CHECK IF GROUP EXISTS ======================
    const existingGroupById = await db
      .select()
      .from(userGroups)
      .where(eq(userGroups.id, idAsNumber))
      .limit(1);

    if (existingGroupById.length === 0) {
      return createResponse(false, "Group not found", null, 404);
    }

    // ====================== DELETE WITH AUDIT ======================
    const userId = getUserId(req);

    await withAudit(userId, "DELETE", userGroups, idAsNumber, async () => {
      return await db
        .delete(userGroups)
        .where(eq(userGroups.id, idAsNumber))
        .returning();
    });

    return createResponse(true, "Group deleted successfully");
  } catch (error) {
    console.error("Delete Group Error:", error);
    return createResponse(
      false,
      "Could not delete group. It might be assigned to users.",
      null,
      500,
    );
  }
}
