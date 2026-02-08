import { NextResponse } from "next/server";
import { db } from "@/db";
import { rules } from "@/db/schema";
import { eq } from "drizzle-orm";
import { withAudit } from "@/src/lib/audit";
import { createResponse } from "@/src/lib/api-response";

interface RouteParams {
  params: Promise<{ ruleId: string }>;
}

// 🛠️ HELPER: Get User ID
const getUserId = (req: Request): number => {
  const testId = req.headers.get("x-user-id");
  return testId ? parseInt(testId) : 1;
};

// 3. UPDATE
export async function PUT(req: Request, { params }: RouteParams) {
  try {
    const { ruleId } = await params;
    const idAsNumber = parseInt(ruleId);

    if (isNaN(idAsNumber))
      return createResponse(false, "Invalid ID", null, 400);

    const body = await req.json();
    const { name, description } = body;
    const userId = getUserId(req);

    const [updatedRule] = await withAudit(
      userId,
      "UPDATE",
      rules,
      idAsNumber,
      async () => {
        return await db
          .update(rules)
          .set({
            name,
            description,
            user_modified: userId, // ✅ Track modification
            updated_at: new Date(),
          })
          .where(eq(rules.id, idAsNumber))
          .returning();
      },
    );

    return NextResponse.json(updatedRule);
  } catch (error) {
    return createResponse(false, "Failed to update rule", null, 500);
  }
}

// 4. DELETE
export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    const { ruleId } = await params;
    const idAsNumber = parseInt(ruleId);
    const userId = getUserId(req);

    await withAudit(userId, "DELETE", rules, idAsNumber, async () => {
      return await db.delete(rules).where(eq(rules.id, idAsNumber)).returning();
    });

    return NextResponse.json({ success: true, message: "Rule deleted" });
  } catch (error) {
    return createResponse(false, "Failed to delete rule", null, 500);
  }
}
