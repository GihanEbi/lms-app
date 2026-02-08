import { NextResponse } from "next/server";
import { db } from "@/db";
import { groupRules, rules, userGroups } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";
import { withAudit } from "@/src/lib/audit";

// 🛠️ HELPER
const getUserId = (req: Request): number => {
  const testId = req.headers.get("x-user-id");
  return testId ? parseInt(testId) : 1;
};

interface RouteParams {
  params: Promise<{ groupId: string }>;
}

// 1. GET Rules
export async function GET(req: Request, { params }: RouteParams) {
  const { groupId } = await params;
  const groupIdNum = parseInt(groupId);

  if (isNaN(groupIdNum))
    return NextResponse.json({ error: "Invalid Group ID" }, { status: 400 });

  const assignedRules = await db
    .select({
      ruleId: rules.id,
      code: rules.code,
      name: rules.name,
      description: rules.description,
    })
    .from(groupRules)
    .innerJoin(rules, eq(groupRules.rule_id, rules.id))
    .where(eq(groupRules.group_id, groupIdNum));

  return NextResponse.json(assignedRules);
}

// 2. POST (Sync Rules)
export async function POST(req: Request, { params }: RouteParams) {
  const { groupId } = await params;
  const groupIdNum = parseInt(groupId);

  if (isNaN(groupIdNum))
    return NextResponse.json({ error: "Invalid Group ID" }, { status: 400 });

  const body = await req.json();
  const { ruleIds } = body;
  const userId = getUserId(req);

  // Check group exists
  const userGroup = await db
    .select()
    .from(userGroups)
    .where(eq(userGroups.id, groupIdNum))
    .limit(1)
    .then((res) => res[0]);

  if (!userGroup || !userGroup.is_active) {
    return NextResponse.json(
      { error: "User Group not found or inactive" },
      { status: 404 },
    );
  }

  // Check rules exist
  const existingRules = await db
    .select()
    .from(rules)
    .where(inArray(rules.id, ruleIds));
  const existingRuleIds = existingRules.map((rule) => rule.id);

  if (existingRuleIds.length !== ruleIds.length) {
    return NextResponse.json(
      { error: "Some ruleIds are invalid" },
      { status: 400 },
    );
  }

  // Audit and Execute
  await withAudit(
    userId,
    "UPDATE",
    userGroups, // We audit the Group Table
    groupIdNum,
    async () => {
      return await db.transaction(async (tx) => {
        // Wipe old rules
        await tx.delete(groupRules).where(eq(groupRules.group_id, groupIdNum));

        // Insert new rules
        if (ruleIds.length > 0) {
          const valuesToInsert = ruleIds.map((ruleId: number) => ({
            group_id: groupIdNum,
            rule_id: ruleId,
          }));
          await tx.insert(groupRules).values(valuesToInsert);
        }
        return { success: true };
      });
    },
  );

  return NextResponse.json({
    message: "Rules updated successfully",
    assignedRuleIds: ruleIds,
  });
}
