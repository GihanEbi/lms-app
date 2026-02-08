import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { withAudit } from "@/src/lib/audit";
import { ilike, or, sql, desc, eq } from "drizzle-orm";
import { createResponse } from "@/src/lib/api-response";
import bcrypt from "bcryptjs";

// 🛠️ HELPER: Get User ID from Header
const getUserId = (req: Request): number => {
  const testId = req.headers.get("x-user-id");
  return testId ? parseInt(testId) : 1;
};

// 1. GET (Read all users)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
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
        .select(safeColumns)
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
  try {
    const body = await req.json();
    const { full_name, email, password, group_id, is_active } = body;
    const userId = getUserId(req);

    if (!full_name || !email || !password || !group_id) {
      return createResponse(false, "Missing required fields", null, 400);
    }

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      return createResponse(false, "Email already exists", null, 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

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
            is_active: is_active ?? true,
            user_created: userId,
          })
          .returning({
            id: users.id,
            full_name: users.full_name,
            email: users.email,
            user_created: users.user_created, // ✅ FIX: This was missing!
            // Do not return password_hash
          });
      },
    );

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Create User Error:", error);
    return createResponse(false, "Failed to create user", null, 500);
  }
}
