import { NextRequest } from "next/server";
import { db } from "@/db";
import { rules } from "@/db/schema";
import { withAudit } from "@/src/lib/audit";
import { ilike, or, sql, desc, eq } from "drizzle-orm";
import { createResponse } from "@/src/lib/api-response";
import { requireAccess } from "@/src/lib/auth-guard";
import { AccessConstants } from "@/src/constants/AccessConstants";
import { rulesSchema } from "@/src/services/validation/schemas/rulesSchema";

// 🛠️ HELPER: Get User ID from Header (for Tests) or Default to 1
const getUserId = (req: Request): number => {
  const testId = req.headers.get("x-user-id");
  return testId ? parseInt(testId) : 1;
};

// 1. READ (Get all rules)
export async function GET(req: NextRequest) {
  //  ========================= ACCESS CONTROL CHECK =========================
  const accessError = await requireAccess(req, AccessConstants.RULE_GET); // <-- Use the actual code for "Get Rule"
  if (accessError) return accessError; // <--- Stops execution if denied

  try {
    const searchParams = req.nextUrl.searchParams;
    const pageNo = parseInt(searchParams.get("pageNo") || "0");
    const pageSize = parseInt(searchParams.get("pageSize") || "0");
    const searchValue = searchParams.get("searchValue") || "";

    const searchFilter = searchValue
      ? or(
          ilike(rules.name, `%${searchValue}%`),
          ilike(rules.description, `%${searchValue}%`),
        )
      : undefined;

    if (pageNo > 0 && pageSize > 0) {
      // --- Scenario A: Pagination ---
      const offset = (pageNo - 1) * pageSize;

      const data = await db
        .select()
        .from(rules)
        .where(searchFilter)
        .limit(pageSize)
        .offset(offset)
        .orderBy(desc(rules.created_at));

      const [totalCountRes] = await db
        .select({ count: sql<number>`count(*)` })
        .from(rules)
        .where(searchFilter);

      const total = Number(totalCountRes.count);

      return createResponse(
        true,
        "Successfully get data",
        {
          data,
          meta: {
            pageNo,
            pageSize,
            total,
            totalPages: Math.ceil(total / pageSize),
          },
        },
        200,
      );
    } else {
      // --- Scenario B: No Pagination ---
      const data = await db
        .select({
          value: rules.code,
          label: rules.name,
        })
        .from(rules)
        .where(searchFilter)
        .orderBy(desc(rules.created_at));

      return createResponse(true, "Successfully get data", data, 200);
    }
  } catch (error) {
    console.error("Error fetching rules:", error);
    return createResponse(false, "Error fetching rules", null, 500);
  }
}

// 2. CREATE - Audit Required 📝
export async function POST(req: Request) {
  //  ========================= ACCESS CONTROL CHECK =========================
  const accessError = await requireAccess(
    req,
    AccessConstants.RULE_CREATE_EDIT,
  ); // <-- Use the actual code for "Create Rule"
  if (accessError) return accessError; // <--- Stops execution if denied

  try {
    const body = await req.json();
    const { name, description, code } = body;

    // ====================== VALIDATION ======================
    const { error } = rulesSchema.validate(body);
    if (error) {
      return createResponse(false, error.details[0].message, null, 400);
    }
    // ====================== CHECK DUPLICATES (Name OR Code) ======================
    const existingRule = await db
      .select()
      .from(rules)
      .where(or(eq(rules.name, name), eq(rules.code, code)))
      .limit(1);

    if (existingRule.length > 0) {
      // Optional: Be specific about what failed
      const msg =
        existingRule[0].code === code
          ? "A rule with this Code already exists."
          : "A rule with this Name already exists.";

      return createResponse(false, msg, null, 409); // 409 Conflict
    }

    // ====================== CREATE WITH AUDIT =======================
    const userId = getUserId(req);

    const [newRule] = await withAudit(
      userId,
      "CREATE",
      rules,
      null,
      async () => {
        return await db
          .insert(rules)
          .values({
            name,
            description,
            code,
            user_created: userId, // ✅ Linked to the test user
          })
          .returning();
      },
    );

    return createResponse(true, "Rule created successfully", newRule, 201);
  } catch (error) {
    console.error("Create Rule Error:", error);
    return createResponse(false, "Failed to create rule", null, 500);
  }
}
