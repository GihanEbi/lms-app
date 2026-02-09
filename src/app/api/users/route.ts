import { NextRequest } from "next/server";
import { db } from "@/db";
import { userGroups, users } from "@/db/schema";
import { withAudit } from "@/src/lib/audit";
import { ilike, or, sql, desc, eq, and } from "drizzle-orm";
import { createResponse } from "@/src/lib/api-response";
import bcrypt from "bcryptjs";
import { requireAccess } from "@/src/lib/auth-guard";
import { AccessConstants } from "@/src/constants/AccessConstants";
import { createUserSchema } from "@/src/services/validation/schemas/userSchem";

// 🛠️ HELPER: Get User ID from Header
const getUserId = (req: Request): number => {
  const testId = req.headers.get("x-user-id");
  return testId ? parseInt(testId) : 1;
};

// 1. GET (Read all users)
export async function GET(req: NextRequest) {
  //  ========================= ACCESS CONTROL CHECK =========================
  const accessError = await requireAccess(req, AccessConstants.USER_GET); // <-- Use the actual code for "Get User"
  if (accessError) return accessError; // <--- Stops execution if denied
  try {
    const searchParams = req.nextUrl.searchParams;
    const pageNo = parseInt(searchParams.get("pageNo") || "0");
    const pageSize = parseInt(searchParams.get("pageSize") || "0");
    const searchValue = searchParams.get("searchValue") || "";

    const searchFilter = searchValue
      ? or(
          ilike(users.full_name, `%${searchValue}%`),
          ilike(users.email, `%${searchValue}%`),
        )
      : undefined;

    // Defined columns to return (Safe list)
    const safeColumns = {
      id: users.id,
      code: users.code,
      full_name: users.full_name,
      email: users.email,
      is_active: users.is_active,
      group_id: users.group_id,
      user_created: users.user_created, // ✅ Added for consistency
      created_at: users.created_at,
    };

    if (pageNo > 0 && pageSize > 0) {
      const offset = (pageNo - 1) * pageSize;

      const data = await db
        .select(safeColumns)
        .from(users)
        .where(searchFilter)
        .limit(pageSize)
        .offset(offset)
        .orderBy(desc(users.created_at));

      const [totalCountRes] = await db
        .select({ count: sql<number>`count(*)` })
        .from(users)
        .where(searchFilter);

      const total = Number(totalCountRes.count);

      return createResponse(
        true,
        "Users fetched successfully",
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
          value: users.code,
          label: users.full_name,
        })
        .from(users)
        .where(searchFilter)
        .orderBy(desc(users.created_at));

      return createResponse(true, "Users fetched successfully", data, 200);
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    return createResponse(false, "Error fetching users", null, 500);
  }
}

// 2. CREATE USER
export async function POST(req: Request) {
  //  ========================= ACCESS CONTROL CHECK =========================
  const accessError = await requireAccess(
    req,
    AccessConstants.USER_CREATE_EDIT,
  ); // <-- Use the actual code for "Create/Edit User"
  if (accessError) return accessError; // <--- Stops execution if denied
  try {
    const body = await req.json();
    const {
      full_name,
      email,
      password,
      group_id,
      phone_no,
      profile_image_url,
    } = body;

    // ====================== VALIDATION ======================
    const { error } = createUserSchema.validate(body);
    if (error) {
      return createResponse(false, error.details[0].message, null, 400);
    }
    const userId = getUserId(req);

    // ====================== 🛡️ ROBUST DUPLICATE CHECK ======================
    // Check if ANY user exists with the same Email or Phone Number...
    // ...BUT exclude the user we are currently updating (id != idAsNumber)
    const conflictingUser = await db
      .select()
      .from(users)
      .where(
        and(
          or(eq(users.email, email), eq(users.phone_no, phone_no)), // Match Email OR Phone Number
        ),
      )
      .limit(1);

    if (conflictingUser.length > 0) {
      const msg =
        conflictingUser[0].email === email
          ? "A user with this Email already exists."
          : "A user with this Phone Number already exists.";

      return createResponse(false, msg, null, 409);
    }

    // check user group exists
    const groupCheck = await db
      .select()
      .from(userGroups)
      .where(eq(sql`id`, group_id))
      .limit(1);

    if (groupCheck.length === 0) {
      return createResponse(false, "User group does not exist", null, 400);
    }

    // ====================== HASH PASSWORD =======================
    const hashedPassword = await bcrypt.hash(password, 10);

    // ====================== CREATE WITH AUDIT =======================
    const [newUser] = await withAudit(
      userId,
      "CREATE",
      users,
      null,
      async () => {
        return await db
          .insert(users)
          .values({
            full_name,
            email,
            password_hash: hashedPassword,
            group_id: parseInt(group_id),
            is_active: true,
            phone_no,
            profile_image_url,
            user_created: userId,
          })
          .returning({
            id: users.id,
            full_name: users.full_name,
            email: users.email,
            phone_no: users.phone_no,
            profile_image_url: users.profile_image_url,
            is_active: users.is_active,
            group_id: users.group_id,
            user_created: users.user_created, // ✅ FIX: This was missing!
            // Do not return password_hash
          });
      },
    );

    return createResponse(true, "User created successfully", newUser, 201);
  } catch (error) {
    console.error("Create User Error:", error);
    return createResponse(false, "Failed to create user", null, 500);
  }
}
