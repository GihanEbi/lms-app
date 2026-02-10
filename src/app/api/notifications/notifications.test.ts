import { describe, it, expect, beforeEach } from "vitest";
import { GET, POST } from "./route";
import { NextRequest } from "next/server";
import { db } from "@/db";
import { instructors, users, userGroups } from "@/db/schema";

const BASE_URL = "http://localhost:3000/api/notifications";

// Mock Constants
const SYSTEM_USER_TYPE = "system";
const INSTRUCTOR_USER_TYPE = "instructor";

describe("Notifications API Integration Tests", () => {
  let instructorId: number;
  let systemUserId: number;

  beforeEach(async () => {
    // 1. Setup Group
    const [group] = await db
      .insert(userGroups)
      .values({ name: `Notif Group ${Date.now()}`, is_active: true })
      .returning();

    // 2. Create System User (Admin)
    const [sysUser] = await db
      .insert(users)
      .values({
        full_name: "System Admin",
        email: `admin_${Date.now()}@test.com`,
        password_hash: "hash",
        group_id: group.id,
      })
      .returning();
    systemUserId = sysUser.id;

    // 3. Create Instructor
    const [inst] = await db
      .insert(instructors)
      .values({
        full_name: "Instructor John",
        email: `inst_${Date.now()}@test.com`,
        password_hash: "hash",
        phone_number: `${Date.now()}`.slice(0, 10),
        user_created: systemUserId,
      })
      .returning();
    instructorId = inst.id;
  });

  // --- HELPER: Send Notification ---
  async function sendNotification(
    targetId: number,
    userType: string,
    msg: string,
  ) {
    const req = new NextRequest(BASE_URL, {
      method: "POST",
      body: JSON.stringify({
        receiver_id: targetId,
        user_type: userType,
        notification_type: "info",
        message: msg,
      }),
    });
    return await POST(req);
  }

  // --- TEST 1: CREATE NOTIFICATION ---
  it("should create a notification for an instructor", async () => {
    const res = await sendNotification(
      instructorId,
      INSTRUCTOR_USER_TYPE,
      "Welcome Instructor",
    );
    const json = await res.json();

    expect(res.status).toBe(201);
    expect(json.data.receiver_id).toBe(instructorId);
    expect(json.data.user_type).toBe(INSTRUCTOR_USER_TYPE);
  });

  // --- TEST 2: GET ALL (Default Behavior - Latest 5) ---
  it("should return latest 5 notifications by default when no pagination is provided", async () => {
    // Seed 7 notifications
    for (let i = 1; i <= 7; i++) {
      await sendNotification(
        instructorId,
        INSTRUCTOR_USER_TYPE,
        `Update #${i}`,
      );
    }

    const req = new NextRequest(BASE_URL, {
      method: "GET",
      headers: {
        "x-user-id": instructorId.toString(),
        "x-user-type": INSTRUCTOR_USER_TYPE,
      },
    });

    const res = await GET(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    // Should be a direct array of 5
    expect(Array.isArray(json.data)).toBe(true);
    expect(json.data).toHaveLength(5);
    // Descending order check: First item should be the last one created (#7)
    expect(json.data[0].message).toBe("Update #7");
  });

  // --- TEST 3: PAGINATION ---
  it("should return paginated data structure when pageNo/pageSize are provided", async () => {
    // Seed 10 notifications
    for (let i = 1; i <= 10; i++) {
      await sendNotification(instructorId, INSTRUCTOR_USER_TYPE, `Notif ${i}`);
    }

    // Request Page 1, Size 3
    const req = new NextRequest(`${BASE_URL}?pageNo=1&pageSize=3`, {
      method: "GET",
      headers: {
        "x-user-id": instructorId.toString(),
        "x-user-type": INSTRUCTOR_USER_TYPE,
      },
    });

    const res = await GET(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    // Should have { data, meta } structure
    expect(json.data.data).toBeDefined();
    expect(json.data.meta).toBeDefined();

    expect(json.data.data).toHaveLength(3);
    expect(json.data.meta.total).toBe(10);
    expect(json.data.meta.totalPages).toBe(4); // 10 / 3 rounded up
  });

  // --- TEST 4: SEARCH FILTER ---
  it("should filter notifications by search value", async () => {
    await sendNotification(
      instructorId,
      INSTRUCTOR_USER_TYPE,
      "Urgent: Server Down",
    );
    await sendNotification(
      instructorId,
      INSTRUCTOR_USER_TYPE,
      "Info: Maintenance",
    );
    await sendNotification(
      instructorId,
      INSTRUCTOR_USER_TYPE,
      "Urgent: Payment Failed",
    );

    // Search for "Urgent"
    const req = new NextRequest(`${BASE_URL}?searchValue=Urgent`, {
      method: "GET",
      headers: {
        "x-user-id": instructorId.toString(),
        "x-user-type": INSTRUCTOR_USER_TYPE,
      },
    });

    const res = await GET(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.data).toHaveLength(2); // Should find 2 "Urgent" messages
    expect(json.data[0].message).toContain("Urgent");
  });

  // --- TEST 5: POLYMORPHIC ISOLATION ---
  it("should isolate notifications by user type (Admin vs Instructor)", async () => {
    // Both users might theoretically have ID = 1 (in different tables)
    // We simulate this by using our generated IDs but changing the type header

    await sendNotification(
      instructorId,
      INSTRUCTOR_USER_TYPE,
      "For Instructor Only",
    );

    // Try to fetch using Instructor ID but claim to be "system" type
    const req = new NextRequest(BASE_URL, {
      method: "GET",
      headers: {
        "x-user-id": instructorId.toString(),
        "x-user-type": SYSTEM_USER_TYPE, // Wrong type
      },
    });

    const res = await GET(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    // Should be empty because type doesn't match
    expect(json.data).toHaveLength(0);
  });
});


// command = npx vitest run src/app/api/notifications/notifications.test.ts --no-file-parallelism
