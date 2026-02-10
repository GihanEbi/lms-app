import { NextRequest } from "next/server";
import { db } from "@/db";
import { courses, instructors, subjectCategories } from "@/db/schema";
import { eq } from "drizzle-orm";
import { withAudit } from "@/src/lib/audit";
import { createResponse } from "@/src/lib/api-response";
import { requireAccess } from "@/src/lib/auth-guard";
import { AccessConstants } from "@/src/constants/AccessConstants";
import { courseBasicInfoSchema } from "@/src/services/validation/schemas/courses/courseBasicInfoSchema";
import { courseStatus } from "@/src/constants/courseConstants";

const getUserId = (req: Request): number => {
  const testId = req.headers.get("x-user-id");
  return testId ? parseInt(testId) : 0;
};

export async function POST(req: NextRequest) {
  const accessError = await requireAccess(
    req,
    AccessConstants.COURSE_CREATE_EDIT,
  );
  if (accessError) return accessError;

  try {
    const body = await req.json();
    const userId = getUserId(req);

    // 1. Validation
    const { error } = courseBasicInfoSchema.validate(body);
    if (error)
      return createResponse(false, error.details[0].message, null, 400);

    // 2. Resolve Instructor ID
    const instructorRecord = await db
      .select()
      .from(instructors)
      .where(eq(instructors.id, body.instructor_id)) //change later to eq(instructors.code, userId) when we have user_id in instructors table
      .limit(1);

    if (instructorRecord.length === 0) {
      return createResponse(
        false,
        "Instructor profile not found. Please register as an instructor.",
        null,
        403,
      );
    }
    const instructorId = instructorRecord[0].id;

    const {
      title,
      subtitle,
      category_id, // 🔄 Now getting ID
      level,
      description,
      thumbnail_url,
      promo_video_url,
    } = body;

    // 3. Verify Category Exists
    const categoryExists = await db
      .select()
      .from(subjectCategories)
      .where(eq(subjectCategories.id, category_id))
      .limit(1);

    if (categoryExists.length === 0) {
      return createResponse(false, "Invalid Category ID", null, 400);
    }

    // 4. Create Course
    const [newCourse] = await withAudit(
      userId,
      "CREATE",
      courses,
      null,
      async () => {
        return await db
          .insert(courses)
          .values({
            instructor_id: instructorId,
            title,
            subtitle: subtitle || null,
            category_id, // 🔄 Inserting ID
            level,
            description: description || null,
            thumbnail_url: thumbnail_url || null,
            promo_video_url: promo_video_url || null,
            status: courseStatus.DRAFT,
            user_created: userId,
          })
          .returning();
      },
    );

    return createResponse(
      true,
      "Course draft created successfully",
      newCourse,
      201,
    );
  } catch (error) {
    console.error("Create Course Error:", error);
    return createResponse(false, "Failed to create course", null, 500);
  }
}
