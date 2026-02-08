import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { rules } from "@/db/schema";
import { withAudit } from "@/src/lib/audit";
import { ilike, or, sql, desc } from "drizzle-orm";
import { createResponse } from "@/src/lib/api-response";

// 🛠️ HELPER: Get User ID from Header (for Tests) or Default to 1
const getUserId = (req: Request): number => {
  const testId = req.headers.get("x-user-id");
  return testId ? parseInt(testId) : 1;
};

// 1. READ (Get all rules)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
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
          id: rules.id,
          code: rules.code,
          name: rules.name,
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
  try {
    const body = await req.json();
    const { name, description } = body;

    // ✅ FIX: Use Dynamic User ID
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
            user_created: userId, // ✅ Linked to the test user
          })
          .returning();
      },
    );

    return NextResponse.json(newRule, { status: 201 });
  } catch (error) {
    console.error("Create Rule Error:", error);
    return createResponse(false, "Failed to create rule", null, 500);
  }
}
