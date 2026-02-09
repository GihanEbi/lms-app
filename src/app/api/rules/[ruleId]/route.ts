import { db } from "@/db";
import { rules } from "@/db/schema";
import { eq, or, ne, and } from "drizzle-orm"; // 👈 Add 'ne' and 'and'
import { withAudit } from "@/src/lib/audit";
import { createResponse } from "@/src/lib/api-response";
import { requireAccess } from "@/src/lib/auth-guard";
import { AccessConstants } from "@/src/constants/AccessConstants";
import { rulesSchema } from "@/src/services/validation/schemas/rulesSchema";

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
  //  ========================= ACCESS CONTROL CHECK =========================
  const accessError = await requireAccess(
    req,
    AccessConstants.RULE_CREATE_EDIT,
  );
  if (accessError) return accessError;

  try {
    const { ruleId } = await params;
    if (!ruleId) return createResponse(false, "Rule ID is required", null, 400);

    const idAsNumber = parseInt(ruleId);
    if (isNaN(idAsNumber))
      return createResponse(false, "Invalid Rule ID", null, 400);

    const body = await req.json();
    const { name, description, code } = body;

    // ====================== VALIDATION ======================
    const { error } = rulesSchema.validate(body);
    if (error)
      return createResponse(false, error.details[0].message, null, 400);

    // ====================== CHECK AVAILABLE ID ======================
    const existingRuleById = await db
      .select()
      .from(rules)
      .where(eq(rules.id, idAsNumber))
      .limit(1);

    if (existingRuleById.length === 0) {
      return createResponse(false, "Rule not found", null, 404);
    }

    // ====================== 🛡️ ROBUST DUPLICATE CHECK ======================
    // Check if ANY rule exists with the same Name or Code...
    // ...BUT exclude the rule we are currently updating (id != idAsNumber)
    const conflictingRule = await db
      .select()
      .from(rules)
      .where(
        and(
          or(eq(rules.name, name), eq(rules.code, code)), // Match Name OR Code
          ne(rules.id, idAsNumber), // Exclude Self
        ),
      )
      .limit(1);

    if (conflictingRule.length > 0) {
      const msg =
        conflictingRule[0].code === code
          ? "A rule with this Code already exists."
          : "A rule with this Name already exists.";

      return createResponse(false, msg, null, 409);
    }

    // ====================== UPDATE WITH AUDIT =======================
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
            code,
            user_modified: userId,
            updated_at: new Date(),
          })
          .where(eq(rules.id, idAsNumber))
          .returning();
      },
    );

    return createResponse(true, "Rule updated successfully", updatedRule, 200);
  } catch (error) {
    return createResponse(false, "Failed to update rule", null, 500);
  }
}

// 4. DELETE
export async function DELETE(req: Request, { params }: RouteParams) {
  //  ========================= ACCESS CONTROL CHECK =========================
  const accessError = await requireAccess(req, AccessConstants.RULE_DELETE); // <-- Use the actual code for "Delete Rule"
  if (accessError) return accessError;

  try {
    const { ruleId } = await params;
    // check if rule id is provided and is a valid number
    if (!ruleId) {
      return createResponse(false, "Rule ID is required", null, 400);
    }
    const idAsNumber = parseInt(ruleId);
    if (isNaN(idAsNumber)) {
      return createResponse(false, "Invalid Rule ID", null, 400);
    }

    // ====================== CHECK AVAILABLE ID ======================
    const existingRuleById = await db
      .select()
      .from(rules)
      .where(eq(rules.id, idAsNumber))
      .limit(1);
    if (existingRuleById.length === 0) {
      return createResponse(false, "Rule not found", null, 404);
    }

    // ====================== DELETE WITH AUDIT =======================
    const userId = getUserId(req);

    await withAudit(userId, "DELETE", rules, idAsNumber, async () => {
      return await db.delete(rules).where(eq(rules.id, idAsNumber)).returning();
    });

    return createResponse(true, "Rule deleted successfully", null, 200);
  } catch (error) {
    return createResponse(false, "Failed to delete rule", null, 500);
  }
}
