import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { userGroups } from "@/db/schema";
import { withAudit } from "@/src/lib/audit";
import { requireAccess } from "@/src/lib/auth-guard";
import { AccessConstants } from "@/src/constants/AccessConstants";
import { createUserGroupsSchema } from "@/src/services/validation/schemas/userGroupsSchema";
import { createResponse } from "@/src/lib/api-response";
import { ilike, or, sql, desc, eq } from "drizzle-orm";

// 🛠️ HELPER: Get User ID from Header (Test Mode) or Default to 1
const getUserId = (req: Request): number => {
  const testId = req.headers.get("x-user-id");
  return testId ? parseInt(testId) : 1;
};

// 1. GET ALL GROUPS
export async function GET(req: NextRequest) {
  //  ========================= ACCESS CONTROL CHECK =========================
  const accessError = await requireAccess(req, AccessConstants.USER_GROUP_GET); // <-- Use the actual code for "Get User Group"
  if (accessError) return accessError; // <--- Stops execution if denied

  try {
    const searchParams = req.nextUrl.searchParams;
    const pageNo = parseInt(searchParams.get("pageNo") || "0");
    const pageSize = parseInt(searchParams.get("pageSize") || "0");
    const searchValue = searchParams.get("searchValue") || "";

    const searchFilter = searchValue
      ? or(
          ilike(userGroups.name, `%${searchValue}%`),
          ilike(userGroups.description, `%${searchValue}%`),
        )
      : undefined;

    if (pageNo > 0 && pageSize > 0) {
      // --- Scenario A: Pagination ---
      const offset = (pageNo - 1) * pageSize;
      const data = await db
        .select()
        .from(userGroups)
        .where(searchFilter)
        .limit(pageSize)
        .offset(offset)
        .orderBy(desc(userGroups.created_at));

      const [totalCountRes] = await db
        .select({ count: sql<number>`count(*)` })
        .from(userGroups)
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
          value: userGroups.code,
          label: userGroups.name,
        })
        .from(userGroups)
        .where(searchFilter)
        .orderBy(desc(userGroups.created_at));

      return createResponse(true, "Successfully get data", data, 200);
    }
  } catch (error) {
    console.error("Error fetching user groups:", error);
    return createResponse(false, "Error fetching user groups ", null, 500);
  }
}

// 2. CREATE GROUP
export async function POST(req: Request) {
  //  ========================= ACCESS CONTROL CHECK =========================
  const accessError = await requireAccess(
    req,
    AccessConstants.USER_GROUP_CREATE_EDIT,
  );
  if (accessError) return accessError;
  try {
    const body = await req.json();
    const { name, description } = body;

    // ====================== VALIDATION ======================
    const { error } = createUserGroupsSchema.validate(body);
    if (error) {
      return createResponse(false, error.details[0].message, null, 400);
    }
    // ====================== CHECK DUPLICATES (Name) ======================
    const existingGroup = await db
      .select()
      .from(userGroups)
      .where(eq(userGroups.name, name))
      .limit(1);
    if (existingGroup.length > 0) {
      const msg = `Group name "${name}" already exists. Please choose a different name.`;
      return createResponse(false, msg, null, 409);
    }

    // ====================== CREATE WITH AUDIT =======================
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
            user_created: userId, // ✅ Dynamic ID
          })
          .returning();
      },
    );

    return createResponse(true, "Group created successfully", newGroup, 201);
  } catch (error) {
    console.error("Create Group Error:", error);
    return createResponse(false, "Failed to create group", null, 500);
  }
}
