import { NextResponse } from "next/server";
import { db } from "@/db";
import { groupRules, rules, userGroups } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";
import { withAudit } from "@/src/lib/audit";
import { requireAccess } from "@/src/lib/auth-guard";
import { AccessConstants } from "@/src/constants/AccessConstants";
import { createResponse } from "@/src/lib/api-response";

// 🛠️ HELPER
const getUserId = (req: Request): number => {
  const testId = req.headers.get("x-user-id");
  return testId ? parseInt(testId) : 1;
};

interface RouteParams {
  params: Promise<{ groupId: string }>;
}

// 1. GET assign group Rules
export async function GET(req: Request, { params }: RouteParams) {
  //  ========================= ACCESS CONTROL CHECK =========================
  const accessError = await requireAccess(
    req,
    AccessConstants.GET_ASSIGNED_GROUP_RULES,
  ); // <-- Use the actual code for "Get Assigned Group Rules"
  if (accessError) return accessError; // <--- Stops execution if denied
  const { groupId } = await params;
  const groupIdNum = parseInt(groupId);

  // check if group id is provided and is a valid number
  if (!groupId) {
    return createResponse(false, "Group ID is required", null, 400);
  }

  if (isNaN(groupIdNum))
    return createResponse(false, "Invalid Group ID", null, 400);

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

  return createResponse(
    true,
    "Assigned rules fetched successfully",
    assignedRules,
    200,
  );
}

// 2. POST (Sync Rules)
export async function POST(req: Request, { params }: RouteParams) {
  //  ========================= ACCESS CONTROL CHECK =========================
  const accessError = await requireAccess(
    req,
    AccessConstants.ASSIGN_GROUP_RULES,
  ); // <-- Use the actual code for "Create Rule"
  if (accessError) return accessError; // <--- Stops execution if denied
  const { groupId } = await params;
  // check if group id is provided and is a valid number
  if (!groupId) {
    return createResponse(false, "Group ID is required", null, 400);
  }
  const groupIdNum = parseInt(groupId);
  if (isNaN(groupIdNum))
    return createResponse(false, "Invalid Group ID", null, 400);

  const body = await req.json();
  // check if body contains ruleIds array and is valid and exists in db
  if (!body || !Array.isArray(body.ruleIds)) {
    return createResponse(
      false,
      "ruleIds array is required in the request body",
      null,
      400,
    );
  }

  // check if all ruleIds are numbers
  if (!body.ruleIds.every((id: any) => typeof id === "number")) {
    return createResponse(false, "All ruleIds must be numbers", null, 400);
  }

  try {
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
      return createResponse(
        false,
        "User Group not found or inactive",
        null,
        404,
      );
    }

    // Check rules exist
    const existingRules = await db
      .select()
      .from(rules)
      .where(inArray(rules.id, ruleIds));
    const existingRuleIds = existingRules.map((rule) => rule.id);

    if (existingRuleIds.length !== ruleIds.length) {
      return createResponse(false, "Some ruleIds are invalid", null, 400);
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
          await tx
            .delete(groupRules)
            .where(eq(groupRules.group_id, groupIdNum));

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

    return createResponse(true, "Group rules updated successfully", null, 200);
  } catch (error) {
    console.error("Error updating group rules:", error);
    return createResponse(false, "Failed to update group rules", null, 500);
  }
}
