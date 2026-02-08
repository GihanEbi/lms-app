import { NextResponse } from "next/server";
import { db } from "@/db";
import { userGroups } from "@/db/schema";
import { withAudit } from "@/src/lib/audit";

// 🛠️ HELPER: Get User ID from Header (Test Mode) or Default to 1
const getUserId = (req: Request): number => {
  const testId = req.headers.get("x-user-id");
  return testId ? parseInt(testId) : 1;
};

// 1. GET ALL GROUPS
export async function GET() {
  const allGroups = await db.select().from(userGroups).orderBy(userGroups.id);
  return NextResponse.json(allGroups);
}

// 2. CREATE GROUP
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, is_active } = body;
    const userId = getUserId(req);

    const [newGroup] = await withAudit(
      userId,
      "CREATE",
      userGroups,
      null,
      async () => {
        return await db
          .insert(userGroups)
          .values({
            name,
            description,
            is_active: is_active ?? true,
            user_created: userId, // ✅ Dynamic ID
          })
          .returning();
      },
    );

    return NextResponse.json(newGroup, { status: 201 });
  } catch (error: any) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "Group name already exists" },
        { status: 409 },
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
