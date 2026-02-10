import { NextRequest } from "next/server";
import { db } from "@/db";
import { courses, courseSections } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import { withAudit } from "@/src/lib/audit";
import { createResponse } from "@/src/lib/api-response";
import { requireAccess } from "@/src/lib/auth-guard";
import { AccessConstants } from "@/src/constants/AccessConstants";
import { courseSectionSchema } from "@/src/services/validation/schemas/courses/curriculumSchema";
import { SectionContentItem } from "@/src/types/courses";

// 🔴 Fix: Ensure Next.js treats this as a dynamic route (prevent static caching)
export const dynamic = "force-dynamic";

const getUserId = (req: Request) =>
  parseInt(req.headers.get("x-user-id") || "0");

const processContent = (content: any[]): SectionContentItem[] => {
  return content.map((item) => ({
    ...item,
    content_id: item.content_id || crypto.randomUUID(),
  }));
};

// 1. GET (Fetch Curriculum for a Course)
export async function GET(req: NextRequest) {
  // Use the exact same permission as POST to ensure consistency
  const accessError = await requireAccess(
    req,
    AccessConstants.COURSE_CREATE_EDIT,
  );
  if (accessError) return accessError;

  const courseId = req.nextUrl.searchParams.get("course_id");
  if (!courseId) return createResponse(false, "Course ID required", null, 400);

  try {
    const sections = await db
      .select()
      .from(courseSections)
      .where(eq(courseSections.course_id, parseInt(courseId)))
      .orderBy(asc(courseSections.section_order));

    return createResponse(true, "Curriculum fetched", sections, 200);
  } catch (error) {
    console.error("Fetch Curriculum Error:", error);
    return createResponse(false, "Failed to fetch curriculum", null, 500);
  }
}

// 2. POST (Create New Section)
export async function POST(req: NextRequest) {
  const accessError = await requireAccess(
    req,
    AccessConstants.COURSE_CREATE_EDIT,
  );
  if (accessError) return accessError;

  try {
    const body = await req.json();
    const userId = getUserId(req);

    const { error } = courseSectionSchema.validate(body);
    if (error)
      return createResponse(false, error.details[0].message, null, 400);

    // Optional: Verify course_id exists before creating section
    const courseExists = await db
      .select()
      .from(courses)
      .where(eq(courses.id, body.course_id))
      .limit(1);

    if (courseExists.length === 0) {
      return createResponse(false, "Invalid Course ID", null, 400);
    }

    const processedContent = processContent(body.section_content || []);

    const [newSection] = await withAudit(
      userId,
      "CREATE",
      courseSections,
      null,
      async () => {
        return await db
          .insert(courseSections)
          .values({
            course_id: body.course_id,
            section_title: body.section_title,
            section_order: body.section_order,
            section_content: processedContent,
            user_created: userId,
          })
          .returning();
      },
    );

    return createResponse(
      true,
      "Section created successfully",
      newSection,
      201,
    );
  } catch (error) {
    console.error("Create Section Error:", error);
    return createResponse(false, "Failed to create section", null, 500);
  }
}
