import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { and, eq, ne, or } from "drizzle-orm";
import { withAudit } from "@/src/lib/audit";
import { createResponse } from "@/src/lib/api-response";
import { requireAccess } from "@/src/lib/auth-guard";
import { AccessConstants } from "@/src/constants/AccessConstants";
import { editUserSchema } from "@/src/services/validation/schemas/userSchem";

const getUserId = (req: Request): number => {
  const testId = req.headers.get("x-user-id");
  return testId ? parseInt(testId) : 1;
};

interface RouteParams {
  params: Promise<{ userId: string }>;
}

// 3. GET SINGLE USER
export async function GET(req: Request, { params }: RouteParams) {
  //  ========================= ACCESS CONTROL CHECK =========================
  const accessError = await requireAccess(req, AccessConstants.USER_GET);
  if (accessError) return accessError;

  try {
    const { userId } = await params;
    if (!userId) return createResponse(false, "User ID is required", null, 400);
    const idAsNumber = parseInt(userId);

    if (isNaN(idAsNumber))
      return createResponse(false, "Invalid User ID", null, 400);

    const result = await db
      .select({
        id: users.id,
        code: users.code,
        full_name: users.full_name,
        email: users.email,
        is_active: users.is_active,
        group_id: users.group_id,
        created_at: users.created_at,
        user_created: users.user_created, // ✅ Added for consistency
      })
      .from(users)
      .where(eq(users.id, idAsNumber))
      .limit(1);

    if (result.length === 0)
      return createResponse(false, "User not found", null, 404);

    return createResponse(true, "User fetched successfully", result[0], 200);
  } catch (error) {
    return createResponse(false, "Error fetching user", null, 500);
  }
}

// 4. UPDATE USER
export async function PUT(req: Request, { params }: RouteParams) {
  //  ========================= ACCESS CONTROL CHECK =========================
  const accessError = await requireAccess(
    req,
    AccessConstants.USER_CREATE_EDIT,
  );
  if (accessError) return accessError;

  try {
    const { userId } = await params;
    if (!userId) return createResponse(false, "User ID is required", null, 400);
    const idAsNumber = parseInt(userId);

    if (isNaN(idAsNumber))
      return createResponse(false, "Invalid User ID", null, 400);

    const body = await req.json();
    const {
      full_name,
      email,
      group_id,
      is_active,
      phone_no,
      profile_image_url,
    } = body;

    // ====================== VALIDATION ======================
    const { error } = editUserSchema.validate(body);
    if (error)
      return createResponse(false, error.details[0].message, null, 400);

    // ====================== CHECK AVAILABLE ID ======================
    const existingUserById = await db
      .select()
      .from(users)
      .where(eq(users.id, idAsNumber))
      .limit(1);

    if (existingUserById.length === 0) {
      return createResponse(false, "User not found", null, 404);
    }

    // ====================== 🛡️ ROBUST DUPLICATE CHECK ======================
    // Check if ANY user exists with the same Email or Phone Number...
    // ...BUT exclude the user we are currently updating (id != idAsNumber)
    const conflictingUser = await db
      .select()
      .from(users)
      .where(
        and(
          or(eq(users.email, email), eq(users.phone_no, phone_no)), // Match Email OR Phone Number
          ne(users.id, idAsNumber), // Exclude Self
        ),
      )
      .limit(1);

    if (conflictingUser.length > 0) {
      const msg =
        conflictingUser[0].email === email
          ? "A user with this Email already exists."
          : "A user with this Phone Number already exists.";

      return createResponse(false, msg, null, 409);
    }

    // ====================== UPDATE WITH AUDIT =======================
    const reqUserId = getUserId(req);

    const updateData: any = {
      full_name,
      email,
      group_id,
      is_active,
      phone_no,
      profile_image_url,
      user_modified: reqUserId,
      updated_at: new Date(),
    };

    const [updatedUser] = await withAudit(
      reqUserId,
      "UPDATE",
      users,
      idAsNumber,
      async () => {
        return await db
          .update(users)
          .set(updateData)
          .where(eq(users.id, idAsNumber))
          .returning({
            id: users.id,
            full_name: users.full_name,
            email: users.email,
            phone_no: users.phone_no,
            profile_image_url: users.profile_image_url,
            is_active: users.is_active,
            user_modified: users.user_modified, // ✅ Added for potential tests
          });
      },
    );

    if (!updatedUser) {
      return createResponse(false, "User not found", null, 404);
    }

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Update User Error:", error);
    return createResponse(false, "Failed to update user", null, 500);
  }
}

// 5. DELETE USER
export async function DELETE(req: Request, { params }: RouteParams) {
  //  ========================= ACCESS CONTROL CHECK =========================
  const accessError = await requireAccess(req, AccessConstants.USER_DELETE); // <-- Use the actual code for "Delete User"
  if (accessError) return accessError;
  try {
    const { userId } = await params;
    if (!userId) return createResponse(false, "User ID is required", null, 400);
    const idAsNumber = parseInt(userId);

    if (isNaN(idAsNumber))
      return createResponse(false, "Invalid User ID", null, 400);
    const reqUserId = getUserId(req);

    if (isNaN(idAsNumber))
      return createResponse(false, "Invalid ID", null, 400);

    // ====================== CHECK AVAILABLE ID ======================
    const existingUserById = await db
      .select()
      .from(users)
      .where(eq(users.id, idAsNumber))
      .limit(1);
    if (existingUserById.length === 0) {
      return createResponse(false, "User not found", null, 404);
    }

    // ====================== DELETE WITH AUDIT =======================
    await withAudit(reqUserId, "DELETE", users, idAsNumber, async () => {
      return await db.delete(users).where(eq(users.id, idAsNumber)).returning();
    });

    return createResponse(true, "User deleted successfully");
  } catch (error) {
    console.error("Delete User Error:", error);
    return createResponse(
      false,
      "Failed to delete user. They might be linked to other records.",
      null,
      500,
    );
  }
}
