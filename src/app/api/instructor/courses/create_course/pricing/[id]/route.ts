import { NextRequest } from "next/server";
import { db } from "@/db";
import { courses_pricing, course_coupons, courses } from "@/db/schema";
import { eq } from "drizzle-orm";
import { withAudit } from "@/src/lib/audit";
import { createResponse } from "@/src/lib/api-response";
import { requireAccess } from "@/src/lib/auth-guard";
import { AccessConstants } from "@/src/constants/AccessConstants";
import { pricingSettingsSchema } from "@/src/services/validation/schemas/courses/coursePricingSchema";
import { PricingSettingsDTO } from "@/src/types/courses";

// Force dynamic to prevent caching issues in tests/production
export const dynamic = "force-dynamic";

interface RouteParams {
  params: Promise<{ id: string }>;
}

const getUserId = (req: Request) =>
  parseInt(req.headers.get("x-user-id") || "0");

// --- GET: Fetch Pricing & Coupons ---
export async function GET(req: NextRequest, { params }: RouteParams) {
  const accessError = await requireAccess(req, AccessConstants.COURSE_CREATE_EDIT);
  if (accessError) return accessError;

  try {
    const { id } = await params;
    const courseId = parseInt(id);
    if (isNaN(courseId))
      return createResponse(false, "Invalid Course ID", null, 400);

    // 1. Fetch Pricing Info
    const pricingRecord = await db
      .select()
      .from(courses_pricing)
      .where(eq(courses_pricing.course_id, courseId))
      .limit(1);

    // 2. Fetch Coupons
    const couponsRecord = await db
      .select({
        code: course_coupons.code,
        discount_type: course_coupons.discount_type,
        discount_value: course_coupons.discount_value,
        max_uses: course_coupons.max_uses,
      })
      .from(course_coupons)
      .where(eq(course_coupons.course_id, courseId));

    // If no pricing record exists yet (step not started), return null or default structure
    if (pricingRecord.length === 0) {
      return createResponse(true, "No pricing set yet", null, 200);
    }

    const responseData = {
      ...pricingRecord[0],
      coupons: couponsRecord,
    };

    return createResponse(true, "Pricing data fetched", responseData, 200);
  } catch (error) {
    console.error("Get Pricing Error:", error);
    return createResponse(false, "Failed to fetch pricing data", null, 500);
  }
}

// --- PUT: Update/Upsert Pricing & Coupons ---
export async function PUT(req: NextRequest, { params }: RouteParams) {
  const accessError = await requireAccess(
    req,
    AccessConstants.COURSE_CREATE_EDIT,
  );
  if (accessError) return accessError;

  try {
    const { id } = await params;
    const courseId = parseInt(id);
    if (isNaN(courseId))
      return createResponse(false, "Invalid Course ID", null, 400);

    const body: PricingSettingsDTO = await req.json();
    const userId = getUserId(req);

    // 1. Validation
    const { error } = pricingSettingsSchema.validate(body);
    if (error)
      return createResponse(false, error.details[0].message, null, 400);

    // 2. Check if course exists
    const courseExists = await db
      .select()
      .from(courses)
      .where(eq(courses.id, courseId))
      .limit(1);
    if (courseExists.length === 0)
      return createResponse(false, "Course not found", null, 404);

    // 3. Upsert Pricing Record (Insert if new, Update if exists)
    const existingPricing = await db
      .select()
      .from(courses_pricing)
      .where(eq(courses_pricing.course_id, courseId))
      .limit(1);

    let resultRecord;

    if (existingPricing.length > 0) {
      // UPDATE
      [resultRecord] = await withAudit(
        userId,
        "UPDATE",
        courses_pricing,
        existingPricing[0].id,
        async () => {
          return await db
            .update(courses_pricing)
            .set({
              is_paid: body.is_paid,
              price: body.is_paid ? body.price?.toString() : null, // Clear price if free
              currency: body.is_paid ? (body.currency as any) : null,
              language: body.language as any,
              has_certificate: body.has_certificate,
            })
            .where(eq(courses_pricing.id, existingPricing[0].id))
            .returning();
        },
      );
    } else {
      // INSERT
      [resultRecord] = await withAudit(
        userId,
        "CREATE",
        courses_pricing,
        null,
        async () => {
          return await db
            .insert(courses_pricing)
            .values({
              course_id: courseId,
              is_paid: body.is_paid,
              price: body.is_paid ? body.price?.toString() : null,
              currency: body.is_paid ? (body.currency as any) : null,
              language: body.language as any,
              has_certificate: body.has_certificate,
            })
            .returning();
        },
      );
    }

    // 4. Handle Coupons (Strategy: Delete All & Re-insert)
    // We only touch coupons if the array is present in the body
    if (body.coupons) {
      await db
        .delete(course_coupons)
        .where(eq(course_coupons.course_id, courseId));

      if (body.coupons.length > 0) {
        const couponValues = body.coupons.map((c) => ({
          course_id: courseId,
          code: c.code,
          discount_type: c.discount_type as any,
          discount_value: c.discount_value.toString(),
          max_uses: c.max_uses || null,
        }));

        await db.insert(course_coupons).values(couponValues);
      }
    }

    return createResponse(
      true,
      "Pricing and settings saved",
      resultRecord,
      200,
    );
  } catch (error) {
    console.error("Update Pricing Error:", error);
    return createResponse(false, "Failed to update pricing", null, 500);
  }
}
