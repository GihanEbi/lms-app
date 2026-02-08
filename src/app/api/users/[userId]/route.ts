import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { withAudit } from "@/src/lib/audit";
import { createResponse } from "@/src/lib/api-response";
import bcrypt from "bcryptjs";

const getUserId = (req: Request): number => {
  const testId = req.headers.get("x-user-id");
  return testId ? parseInt(testId) : 1;
};

interface RouteParams {
  params: Promise<{ userId: string }>;
}

// 3. GET SINGLE USER
export async function GET(req: Request, { params }: RouteParams) {
  try {
    const { userId } = await params;
    const idAsNumber = parseInt(userId);

    if (isNaN(idAsNumber))
      return createResponse(false, "Invalid ID", null, 400);

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
  try {
    const { userId } = await params;
    const idAsNumber = parseInt(userId);

    if (isNaN(idAsNumber))
      return createResponse(false, "Invalid ID", null, 400);

    const body = await req.json();
    const { full_name, email, password, group_id, is_active } = body;
    const reqUserId = getUserId(req);

    const updateData: any = {
      full_name,
      email,
      group_id,
      is_active,
      user_modified: reqUserId,
      updated_at: new Date(),
    };

    if (password && password.trim() !== "") {
      updateData.password_hash = await bcrypt.hash(password, 10);
    }

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
  try {
    const { userId } = await params;
    const idAsNumber = parseInt(userId);
    const reqUserId = getUserId(req);

    if (isNaN(idAsNumber))
      return createResponse(false, "Invalid ID", null, 400);

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
