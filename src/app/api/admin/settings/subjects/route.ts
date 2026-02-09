import { NextRequest } from "next/server";
import { db } from "@/db";
import { subjects, subjectCategories } from "@/db/schema"; // Import both for joins
import { withAudit } from "@/src/lib/audit";
import { ilike, or, sql, desc, eq } from "drizzle-orm";
import { createResponse } from "@/src/lib/api-response";
import { requireAccess } from "@/src/lib/auth-guard";
import { AccessConstants } from "@/src/constants/AccessConstants"; // Add SUBJECT_* constants
import { createSubjectSchema } from "@/src/services/validation/schemas/subjectSchema";

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
          ilike(subjects.subject_name, `%${searchValue}%`),
          ilike(subjects.description, `%${searchValue}%`),
        )
      : undefined;

    // We join with categories to show category name in the list
    const baseQuery = db
      .select({
        id: subjects.id,
        subject_name: subjects.subject_name,
        description: subjects.description,
        is_active: subjects.is_active,
        subject_category_id: subjects.subject_category_id,
        category_name: subjectCategories.subject_category_name, // Joined field
        created_at: subjects.created_at,
      })
      .from(subjects)
      .leftJoin(
        subjectCategories,
        eq(subjects.subject_category_id, subjectCategories.id),
      )
      .where(searchFilter);

    if (pageNo > 0 && pageSize > 0) {
      const offset = (pageNo - 1) * pageSize;

      const data = await baseQuery
        .limit(pageSize)
        .offset(offset)
        .orderBy(desc(subjects.created_at));

      const [totalCountRes] = await db
        .select({ count: sql<number>`count(*)` })
        .from(subjects)
        .where(searchFilter);

      const total = Number(totalCountRes.count);

      return createResponse(
        true,
        "Subjects fetched successfully",
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
          value: subjects.id,
          label: subjects.subject_name,
        })
        .from(subjects)
        .where(searchFilter)
        .orderBy(desc(subjects.created_at));

      return createResponse(true, "Subjects fetched successfully", data, 200);
    }
  } catch (error) {
    console.error("Error fetching subjects:", error);
    return createResponse(false, "Error fetching subjects", null, 500);
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
    const { subject_name, description, subject_category_id } = body;

    // ====================== VALIDATION ======================
    const { error } = createSubjectSchema.validate(body);
    if (error)
      return createResponse(false, error.details[0].message, null, 400);

    // =======================  Validate Category Exists =======================
    const categoryExists = await db
      .select()
      .from(subjectCategories)
      .where(eq(subjectCategories.id, subject_category_id))
      .limit(1);

    if (categoryExists.length === 0) {
      return createResponse(false, "Invalid Subject Category ID", null, 400);
    }

    // ====================== CHECK DUPLICATES (subject_name) ======================
    const existing = await db
      .select()
      .from(subjects)
      .where(eq(subjects.subject_name, subject_name))
      .limit(1);

    if (existing.length > 0) {
      return createResponse(false, "Subject Name already exists", null, 409);
    }

    // ====================== CREATE WITH AUDIT =======================
    const userId = getUserId(req);

    const [newItem] = await withAudit(
      userId,
      "CREATE",
      subjects,
      null,
      async () => {
        return await db
          .insert(subjects)
          .values({
            subject_name,
            description,
            subject_category_id,
            user_created: userId,
          })
          .returning();
      },
    );

    return createResponse(true, "Subject created successfully", newItem, 201);
  } catch (error) {
    console.error("Create Subject Error:", error);
    return createResponse(false, "Failed to create subject", null, 500);
  }
}
