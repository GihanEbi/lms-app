import { NextRequest } from "next/server";
import { db } from "@/db";
import { subjectCategories } from "@/db/schema";
import { withAudit } from "@/src/lib/audit";
import { ilike, or, sql, desc, eq } from "drizzle-orm";
import { createResponse } from "@/src/lib/api-response";
import { requireAccess } from "@/src/lib/auth-guard";
import { AccessConstants } from "@/src/constants/AccessConstants"; // Ensure you add SUBJECT_CATEGORY_* constants
import { createSubjectCategorySchema } from "@/src/services/validation/schemas/subjectCategorySchema";

const getUserId = (req: Request): number => {
  const testId = req.headers.get("x-user-id");
  return testId ? parseInt(testId) : 1;
};

// 1. GET (List)
export async function GET(req: NextRequest) {
  //  ========================= ACCESS CONTROL CHECK =========================
  const accessError = await requireAccess(
    req,
    AccessConstants.SYSTEM_SETTINGS_GET,
  );
  if (accessError) return accessError;

  try {
    const searchParams = req.nextUrl.searchParams;
    const pageNo = parseInt(searchParams.get("pageNo") || "0");
    const pageSize = parseInt(searchParams.get("pageSize") || "0");
    const searchValue = searchParams.get("searchValue") || "";

    const searchFilter = searchValue
      ? or(
          ilike(subjectCategories.subject_category_name, `%${searchValue}%`),
          ilike(subjectCategories.description, `%${searchValue}%`),
        )
      : undefined;

    if (pageNo > 0 && pageSize > 0) {
      const offset = (pageNo - 1) * pageSize;

      const data = await db
        .select()
        .from(subjectCategories)
        .where(searchFilter)
        .limit(pageSize)
        .offset(offset)
        .orderBy(desc(subjectCategories.created_at));

      const [totalCountRes] = await db
        .select({ count: sql<number>`count(*)` })
        .from(subjectCategories)
        .where(searchFilter);

      const total = Number(totalCountRes.count);

      return createResponse(
        true,
        "Subject Categories fetched successfully",
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
      const data = await db
        .select({
          value: subjectCategories.id,
          label: subjectCategories.subject_category_name,
        })
        .from(subjectCategories)
        .where(searchFilter)
        .orderBy(desc(subjectCategories.created_at));

      return createResponse(true, "Fetched successfully", data, 200);
    }
  } catch (error) {
    console.error("Error fetching subject categories:", error);
    return createResponse(false, "Error fetching data", null, 500);
  }
}

// 2. CREATE
export async function POST(req: Request) {
  //  ========================= ACCESS CONTROL CHECK =========================
  const accessError = await requireAccess(
    req,
    AccessConstants.SYSTEM_SETTINGS_ADD_EDIT,
  );
  if (accessError) return accessError;

  try {
    const body = await req.json();
    const { subject_category_name, description } = body;

    // ====================== VALIDATION ======================
    const { error } = createSubjectCategorySchema.validate(body);
    if (error)
      return createResponse(false, error.details[0].message, null, 400);

    // ====================== CHECK DUPLICATES (subject_category_name) ======================
    const existing = await db
      .select()
      .from(subjectCategories)
      .where(eq(subjectCategories.subject_category_name, subject_category_name))
      .limit(1);

    if (existing.length > 0) {
      return createResponse(
        false,
        "Subject Category Name already exists",
        null,
        409,
      );
    }

    // ====================== CREATE WITH AUDIT =======================
    const userId = getUserId(req);

    const [newItem] = await withAudit(
      userId,
      "CREATE",
      subjectCategories,
      null,
      async () => {
        return await db
          .insert(subjectCategories)
          .values({
            subject_category_name,
            description,
            user_created: userId,
          })
          .returning();
      },
    );

    return createResponse(true, "Created successfully", newItem, 201);
  } catch (error) {
    console.error("Create Subject Category Error:", error);
    return createResponse(false, "Failed to create", null, 500);
  }
}
