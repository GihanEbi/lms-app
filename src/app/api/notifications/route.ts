import { NextRequest } from "next/server";
import { db } from "@/db";
import { notifications } from "@/db/schema";
import { eq, and, desc, ilike, sql } from "drizzle-orm";
import { createResponse } from "@/src/lib/api-response";
import { createNotificationSchema } from "@/src/services/validation/schemas/notificationSchema";

// Helper to get Identity from Headers
const getUserIdentity = (req: Request) => {
  const userId = req.headers.get("x-user-id");
  const userType = req.headers.get("x-user-type");

  return {
    userId: userId ? parseInt(userId) : null,
    userType: userType || null,
  };
};

// 1. GET Notifications (Pagination, Search, or Default Latest 5)
export async function GET(req: NextRequest) {
  const { userId, userType } = getUserIdentity(req);

  if (!userId || !userType) {
    return createResponse(
      false,
      "User ID and User Type headers required",
      null,
      401,
    );
  }

  try {
    const searchParams = req.nextUrl.searchParams;
    const pageNo = parseInt(searchParams.get("pageNo") || "0");
    const pageSize = parseInt(searchParams.get("pageSize") || "0");
    const searchValue = searchParams.get("searchValue") || "";
    // Allow overriding default limit of 5 if needed, e.g. ?limit=10
    const explicitLimit = searchParams.get("limit");

    // --- Build Filter Conditions ---
    const baseConditions = and(
      eq(notifications.receiver_id, userId),
      eq(notifications.user_type, userType as any),
    );

    const searchFilter = searchValue
      ? and(baseConditions, ilike(notifications.message, `%${searchValue}%`))
      : baseConditions;

    // --- CASE 1: PAGINATION REQUESTED ---
    if (pageNo > 0 && pageSize > 0) {
      const offset = (pageNo - 1) * pageSize;

      // Fetch Data
      const data = await db
        .select()
        .from(notifications)
        .where(searchFilter)
        .limit(pageSize)
        .offset(offset)
        .orderBy(desc(notifications.created_at));

      // Fetch Total Count (for meta)
      const [totalCountRes] = await db
        .select({ count: sql<number>`count(*)` })
        .from(notifications)
        .where(searchFilter);

      const total = Number(totalCountRes.count);

      return createResponse(
        true,
        "Notifications fetched successfully",
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
    }

    // --- CASE 2: DEFAULT (LATEST 5 OR EXPLICIT LIMIT) ---
    else {
      const limit = explicitLimit ? parseInt(explicitLimit) : 5; // Default to 5

      const data = await db
        .select()
        .from(notifications)
        .where(searchFilter)
        .limit(limit)
        .orderBy(desc(notifications.created_at));

      return createResponse(
        true,
        `Latest ${limit} notifications fetched`,
        data,
        200,
      );
    }
  } catch (error) {
    console.error("Fetch Notifications Error:", error);
    return createResponse(false, "Failed to fetch notifications", null, 500);
  }
}

// 2. POST (Internal/System use to create notifications)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { error } = createNotificationSchema.validate(body);
    if (error)
      return createResponse(false, error.details[0].message, null, 400);

    const newNotification = await db
      .insert(notifications)
      .values({
        receiver_id: body.receiver_id,
        user_type: body.user_type,
        notification_type: body.notification_type,
        message: body.message,
        is_read: false,
      })
      .returning();

    return createResponse(true, "Notification sent", newNotification[0], 201);
  } catch (error) {
    console.error("Create Notification Error:", error);
    return createResponse(false, "Failed to send notification", null, 500);
  }
}
