import { NextResponse } from "next/server";
import { db } from "@/db";
import { userGroups } from "@/db/schema";
import { eq } from "drizzle-orm";
import { withAudit } from "@/src/lib/audit";
import { createResponse } from "@/src/lib/api-response";

// 🛠️ HELPER
const getUserId = (req: Request): number => {
  const testId = req.headers.get("x-user-id");
  return testId ? parseInt(testId) : 1;
};

interface RouteParams {
  params: Promise<{ groupId: string }>;
}

// 3. UPDATE GROUP
export async function PUT(req: Request, { params }: RouteParams) {
  const { groupId } = await params;
  const idAsNumber = parseInt(groupId);

  if (isNaN(idAsNumber)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const body = await req.json();
  const { name, description, is_active } = body;
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
          is_active,
          user_modified: userId, // ✅ Track who modified
        })
        .where(eq(userGroups.id, idAsNumber))
        .returning();
    },
  );

  return NextResponse.json(updatedGroup);
}

// 4. DELETE GROUP
export async function DELETE(req: Request, { params }: RouteParams) {
  const { groupId } = await params;
  const idAsNumber = parseInt(groupId);

  if (isNaN(idAsNumber)) return createResponse(false, "Invalid ID", null, 400);

  const userId = getUserId(req);

  try {
    await withAudit(userId, "DELETE", userGroups, idAsNumber, async () => {
      return await db
        .delete(userGroups)
        .where(eq(userGroups.id, idAsNumber))
        .returning();
    });

    return createResponse(true, "Group deleted");
  } catch (error) {
    return createResponse(
      false,
      "Could not delete group. It might be assigned to users.",
      null,
      500,
    );
  }
}
