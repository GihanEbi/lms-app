import { NextRequest } from "next/server";
import { db } from "@/db";
import { instructors, degreeCertificate } from "@/db/schema";
import { withAudit } from "@/src/lib/audit";
import { ilike, or, sql, desc, eq } from "drizzle-orm";
import { createResponse } from "@/src/lib/api-response";
import { requireAccess } from "@/src/lib/auth-guard";
import { AccessConstants } from "@/src/constants/AccessConstants"; // Ensure INSTRUCTOR_* constants exist
import { createInstructorPersonalInformationSchema } from "@/src/services/validation/schemas/instructors/instructorPersonalInformation";
import bcrypt from "bcryptjs";

const getUserId = (req: Request): number => {
  const testId = req.headers.get("x-user-id");
  return testId ? parseInt(testId) : 1;
};

// 1. GET (List)
export async function GET(req: NextRequest) {
  //  ========================= ACCESS CONTROL CHECK =========================
  const accessError = await requireAccess(req, AccessConstants.INSTRUCTOR_GET);
  if (accessError) return accessError;

  try {
    const searchParams = req.nextUrl.searchParams;
    const pageNo = parseInt(searchParams.get("pageNo") || "0");
    const pageSize = parseInt(searchParams.get("pageSize") || "0");
    const searchValue = searchParams.get("searchValue") || "";

    const searchFilter = searchValue
      ? or(
          ilike(instructors.full_name, `%${searchValue}%`),
          ilike(instructors.email, `%${searchValue}%`),
          ilike(instructors.phone_number, `%${searchValue}%`),
        )
      : undefined;

    // Join with Degree Certificate to show certificate name
    const baseQuery = db
      .select({
        id: instructors.id,
        full_name: instructors.full_name,
        email: instructors.email,
        phone_number: instructors.phone_number,
        is_active: instructors.is_active,
        highest_degree_name: degreeCertificate.degree_certificate_name,
        years_of_experience: instructors.years_of_experience,
        created_at: instructors.created_at,
      })
      .from(instructors)
      .leftJoin(
        degreeCertificate,
        eq(instructors.highest_degree_certificate_id, degreeCertificate.id),
      )
      .where(searchFilter);

    if (pageNo > 0 && pageSize > 0) {
      const offset = (pageNo - 1) * pageSize;

      const data = await baseQuery
        .limit(pageSize)
        .offset(offset)
        .orderBy(desc(instructors.created_at));

      const [totalCountRes] = await db
        .select({ count: sql<number>`count(*)` })
        .from(instructors)
        .where(searchFilter);

      return createResponse(
        true,
        "Instructors fetched successfully",
        {
          data,
          meta: {
            pageNo,
            pageSize,
            total: Number(totalCountRes.count),
            totalPages: Math.ceil(Number(totalCountRes.count) / pageSize),
          },
        },
        200,
      );
    } else {
      // Dropdown data
      const data = await db
        .select({
          value: instructors.id,
          label: instructors.full_name,
        })
        .from(instructors)
        .where(searchFilter)
        .orderBy(desc(instructors.created_at));

      return createResponse(true, "Fetched successfully", data, 200);
    }
  } catch (error) {
    console.error("Error fetching instructors:", error);
    return createResponse(false, "Error fetching instructors", null, 500);
  }
}

// 2. CREATE
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ====================== VALIDATION ======================
    const { error } = createInstructorPersonalInformationSchema.validate(body);
    if (error)
      return createResponse(false, error.details[0].message, null, 400);

    const {
      full_name,
      email,
      password,
      phone_number,
      highest_degree_certificate_id,
      years_of_experience,
      date_of_birth,
      address,
      profile_picture_url,
      resume_url,
    } = body;

    // ====================== 🛡️ ROBUST DUPLICATE CHECK ======================
    // Check if ANY user exists with the same Email or Phone Number...
    const existing = await db
      .select()
      .from(instructors)
      .where(
        or(
          eq(instructors.email, email),
          eq(instructors.phone_number, phone_number),
        ),
      )
      .limit(1);

    if (existing.length > 0) {
      const msg =
        existing[0].email === email
          ? "Email already exists"
          : "Phone number already exists";
      return createResponse(false, msg, null, 409);
    }

    // ================= CHECK highest_degree_certificate_id exists =================
    if (highest_degree_certificate_id) {
      const degreeCert = await db
        .select()
        .from(degreeCertificate)
        .where(eq(degreeCertificate.id, highest_degree_certificate_id))
        .limit(1);
      if (degreeCert.length === 0) {
        return createResponse(
          false,
          "Highest degree certificate does not exist",
          null,
          400,
        );
      }
    }

    // ================= Hash Password ==================
    const hashedPassword = await bcrypt.hash(password, 10);

    // ====================== CREATE WITH AUDIT =======================
    const userId = getUserId(req);

    const [newItem] = await withAudit(
      userId,
      "CREATE",
      instructors,
      null,
      async () => {
        return await db
          .insert(instructors)
          .values({
            email,
            phone_number,
            highest_degree_certificate_id:
              highest_degree_certificate_id || null,
            password_hash: hashedPassword,
            user_created: userId,
            full_name,
            years_of_experience,
            date_of_birth: date_of_birth || null,
            address: address || null,
            profile_picture_url: profile_picture_url || null,
            resume_url: resume_url || null,
          })
          .returning({
            id: instructors.id,
            full_name: instructors.full_name,
            email: instructors.email,
            phone_number: instructors.phone_number,
            highest_degree_certificate_id:
              instructors.highest_degree_certificate_id,
            years_of_experience: instructors.years_of_experience,
            date_of_birth: instructors.date_of_birth,
            address: instructors.address,
            profile_picture_url: instructors.profile_picture_url,
            resume_url: instructors.resume_url,
          });
      },
    );

    return createResponse(
      true,
      "Instructor created successfully",
      newItem,
      201,
    );
  } catch (error) {
    console.error("Create Instructor Error:", error);
    return createResponse(false, "Failed to create instructor", null, 500);
  }
}
