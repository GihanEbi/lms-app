import { db } from "@/db";
import { groupRules, rules } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { createResponse } from "@/src/lib/api-response";
import { NextResponse } from "next/server";

/**
 * Checks if the current user's group has access to the specific Rule Code.
 * Returns null if allowed, or a NextResponse error if blocked.
 */
export async function requireAccess(req: Request, requiredRuleCode: string) {
  // 1. Get Group ID from the header (injected by Middleware)
  const groupIdHeader = req.headers.get("x-group-id");
  
  if (!groupIdHeader) {
    // Should typically be caught by middleware, but safe to check
    return NextResponse.json(
      { success: false, message: "Unauthorized: No Group ID found" }, 
      { status: 401 }
    );
  }

  const groupId = parseInt(groupIdHeader);

  // 2. Check Database: Join GroupRules -> Rules
  // "Does this Group ID have a link to a Rule with this Code?"
  const hasPermission = await db
    .select({ ruleCode: rules.code })
    .from(groupRules)
    .innerJoin(rules, eq(groupRules.rule_id, rules.id))
    .where(
      and(
        eq(groupRules.group_id, groupId),
        eq(rules.code, requiredRuleCode) // e.g., 'USER_CREATE'
      )
    )
    .limit(1);

  // 3. If no record found, BLOCK access
  if (hasPermission.length === 0) {
    return createResponse(
      false, 
      `Forbidden: You need rule '${requiredRuleCode}' to perform this action.`, 
      null, 
      403
    );
  }

  // 4. Allow access (return null means "Go ahead")
  return null;
}