import { NextRequest } from "next/server";
import { db } from "@/db";
import { courses, courseSections } from "@/db/schema";
import { eq } from "drizzle-orm";
import { withAudit } from "@/src/lib/audit";
import { createResponse } from "@/src/lib/api-response";
import { requireAccess } from "@/src/lib/auth-guard";
import { AccessConstants } from "@/src/constants/AccessConstants";
import { updateSectionSchema } from "@/src/services/validation/schemas/courses/curriculumSchema";
import { SectionContentItem } from "@/src/types/courses";

const getUserId = (req: Request) =>
  parseInt(req.headers.get("x-user-id") || "0");

const processContent = (content: any[]): SectionContentItem[] => {
  return content.map((item) => ({
    ...item,
    content_id: item.content_id || crypto.randomUUID(),
  }));
};

interface RouteParams {
  params: Promise<{ id: string }>;
}

// 3. PUT (Update Section & Content)
export async function PUT(req: NextRequest, { params }: RouteParams) {
  const accessError = await requireAccess(
    req,
    AccessConstants.COURSE_CREATE_EDIT,
  );
  if (accessError) return accessError;

  try {
    const { id } = await params;
    const sectionId = parseInt(id);
    const body = await req.json();
    const userId = getUserId(req);

    const { error } = updateSectionSchema.validate(body);
    if (error)
      return createResponse(false, error.details[0].message, null, 400);

    // check course_id exists if course_id is being updated
    if (body.course_id) {
      const courseExists = await db
        .select()
        .from(courses)
        .where(eq(courses.id, body.course_id))
        .limit(1);

      if (courseExists.length === 0) {
        return createResponse(false, "Invalid Course ID", null, 400);
      }
    }

    // If updating content array, ensure IDs exist
    let contentToUpdate = undefined;
    if (body.section_content) {
      contentToUpdate = processContent(body.section_content);
    }

    const [updated] = await withAudit(
      userId,
      "UPDATE",
      courseSections,
      sectionId,
      async () => {
        return await db
          .update(courseSections)
          .set({
            section_title: body.section_title,
            section_order: body.section_order,
            section_content: contentToUpdate, // Updates the whole JSON array
            user_modified: userId,
            updated_at: new Date(),
          })
          .where(eq(courseSections.id, sectionId))
          .returning();
      },
    );

    if (!updated) return createResponse(false, "Section not found", null, 404);

    return createResponse(true, "Section updated", updated, 200);
  } catch (error) {
    return createResponse(false, "Failed to update section", null, 500);
  }
}
