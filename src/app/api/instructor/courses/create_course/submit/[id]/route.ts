import { NextRequest } from "next/server";
import { db } from "@/db";
import { courses } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { withAudit } from "@/src/lib/audit";
import { createResponse } from "@/src/lib/api-response";
import { requireAccess } from "@/src/lib/auth-guard";
import { AccessConstants } from "@/src/constants/AccessConstants";
import { courseStatus } from "@/src/constants/courseConstants";

const getUserId = (req: Request): number => {
  const testId = req.headers.get("x-user-id");
  return testId ? parseInt(testId) : 0;
};

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function POST(req: NextRequest, { params }: RouteParams) {
  const accessError = await requireAccess(
    req,
    AccessConstants.COURSE_CREATE_EDIT,
  );
  if (accessError) return accessError;

  try {
    const { id } = await params;
    const courseId = parseInt(id);
    const userId = getUserId(req);

    if (isNaN(courseId)) {
      return createResponse(false, "Invalid Course ID", null, 400);
    }

    // 1. Check if course exists and is in DRAFT status
    const courseRecord = await db
      .select()
      .from(courses)
      .where(eq(courses.id, courseId))
      .limit(1);

    if (courseRecord.length === 0) {
      return createResponse(false, "Course not found", null, 404);
    }

    const course = courseRecord[0];

    // Optional: Check if the user has permission to submit this specific course
    // if (course.user_created !== userId) {
    //   return createResponse(false, "Unauthorized", null, 403);
    // }

    if (course.status !== courseStatus.DRAFT) {
      return createResponse(
        false,
        `Course cannot be submitted. Current status: ${course.status}`,
        null,
        400,
      );
    }

    // 2. Update status to PENDING_REVIEW
    const [updatedCourse] = await withAudit(
      userId,
      "UPDATE",
      courses,
      course.id,
      async () => {
        return await db
          .update(courses)
          .set({
            status: courseStatus.PENDING_REVIEW,
            user_modified: userId,
          })
          .where(eq(courses.id, courseId))
          .returning();
      },
    );

    return createResponse(
      true,
      "Course submitted for review successfully",
      updatedCourse,
      200,
    );
  } catch (error) {
    console.error("Submit Course Error:", error);
    return createResponse(false, "Failed to submit course", null, 500);
  }
}
