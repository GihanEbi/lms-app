import { NextRequest } from "next/server";
import { db } from "@/db";
import { courses, subjectCategories } from "@/db/schema";
import { eq } from "drizzle-orm";
import { withAudit } from "@/src/lib/audit";
import { createResponse } from "@/src/lib/api-response";
import { requireAccess } from "@/src/lib/auth-guard";
import { AccessConstants } from "@/src/constants/AccessConstants";
import { courseBasicInfoSchema } from "@/src/services/validation/schemas/courses/courseBasicInfoSchema";

const getUserId = (req: Request): number => {
  const testId = req.headers.get("x-user-id");
  return testId ? parseInt(testId) : 0;
};

interface RouteParams {
  params: Promise<{ id: string }>;
}

// 1. GET Single Course by ID
export async function GET(req: NextRequest, { params }: RouteParams) {
  const accessError = await requireAccess(req, AccessConstants.COURSE_GET);
  if (accessError) return accessError;

  try {
    const { id } = await params;
    const courseId = parseInt(id);
    if (isNaN(courseId)) return createResponse(false, "Invalid ID", null, 400);

    const course = await db
      .select({
        id: courses.id,
        title: courses.title,
        subtitle: courses.subtitle,
        category_id: courses.category_id,
        category_name: subjectCategories.subject_category_name, // Join for display
        level: courses.level,
        description: courses.description,
        thumbnail_url: courses.thumbnail_url,
        promo_video_url: courses.promo_video_url,
        status: courses.status,
        instructor_id: courses.instructor_id,
        created_at: courses.created_at,
        updated_at: courses.updated_at,
      })
      .from(courses)
      .leftJoin(
        subjectCategories,
        eq(courses.category_id, subjectCategories.id),
      )
      .where(eq(courses.id, courseId))
      .limit(1);

    if (course.length === 0) {
      return createResponse(false, "Course not found", null, 404);
    }

    return createResponse(true, "Course fetched successfully", course[0], 200);
  } catch (error) {
    console.error("Get Course Error:", error);
    return createResponse(false, "Failed to fetch course", null, 500);
  }
}

// 2. PUT (Update Course Basic Info)
export async function PUT(req: NextRequest, { params }: RouteParams) {
  const accessError = await requireAccess(
    req,
    AccessConstants.COURSE_CREATE_EDIT,
  );
  if (accessError) return accessError;

  try {
    const { id } = await params;
    const courseId = parseInt(id);
    if (isNaN(courseId)) return createResponse(false, "Invalid ID", null, 400);

    const body = await req.json();
    const userId = getUserId(req);

    // Validate
    const { error } = courseBasicInfoSchema.validate(body);
    if (error)
      return createResponse(false, error.details[0].message, null, 400);

    // Check Existence
    const existing = await db
      .select()
      .from(courses)
      .where(eq(courses.id, courseId))
      .limit(1);

    if (existing.length === 0) {
      return createResponse(false, "Course not found", null, 404);
    }

    // Verify Category Exists
    const categoryExists = await db
      .select()
      .from(subjectCategories)
      .where(eq(subjectCategories.id, body.category_id))
      .limit(1);

    if (categoryExists.length === 0) {
      return createResponse(false, "Invalid Category ID", null, 400);
    }

    // Update with Audit
    const [updatedCourse] = await withAudit(
      userId,
      "UPDATE",
      courses,
      courseId,
      async () => {
        return await db
          .update(courses)
          .set({
            instructor_id: body.instructor_id, // Allow update if admin transfers, typically stays same
            title: body.title,
            subtitle: body.subtitle,
            category_id: body.category_id,
            level: body.level,
            description: body.description,
            thumbnail_url: body.thumbnail_url,
            promo_video_url: body.promo_video_url,
            // Status is usually managed by a separate publish workflow, but can be updated here if sent
            user_modified: userId,
            updated_at: new Date(),
          })
          .where(eq(courses.id, courseId))
          .returning();
      },
    );

    return createResponse(
      true,
      "Course updated successfully",
      updatedCourse,
      200,
    );
  } catch (error) {
    console.error("Update Course Error:", error);
    return createResponse(false, "Failed to update course", null, 500);
  }
}

// 3. DELETE Course
export async function DELETE(req: NextRequest, { params }: RouteParams) {
  // Assuming DELETE permission constant exists, otherwise fallback to CREATE_EDIT
  const accessError = await requireAccess(req, AccessConstants.COURSE_DELETE);
  if (accessError) return accessError;

  try {
    const { id } = await params;
    const courseId = parseInt(id);
    if (isNaN(courseId)) return createResponse(false, "Invalid ID", null, 400);

    const userId = getUserId(req);

    // Check Existence
    const existing = await db
      .select()
      .from(courses)
      .where(eq(courses.id, courseId))
      .limit(1);

    if (existing.length === 0) {
      return createResponse(false, "Course not found", null, 404);
    }

    // Delete with Audit
    await withAudit(userId, "DELETE", courses, courseId, async () => {
      return await db
        .delete(courses)
        .where(eq(courses.id, courseId))
        .returning();
    });

    return createResponse(true, "Course deleted successfully", null, 200);
  } catch (error) {
    console.error("Delete Course Error:", error);
    return createResponse(false, "Failed to delete course", null, 500);
  }
}
