import { NextRequest } from "next/server";
import { db } from "@/db";
import { instructors, degreeCertificate } from "@/db/schema";
import { withAudit } from "@/src/lib/audit";
import { or, eq } from "drizzle-orm";
import { createResponse } from "@/src/lib/api-response";
import { requireAccess } from "@/src/lib/auth-guard";
import { AccessConstants } from "@/src/constants/AccessConstants"; // Ensure INSTRUCTOR_* constants exist
import { createInstructorPersonalInformationSchema } from "@/src/services/validation/schemas/instructors/instructorPersonalInformation";
import bcrypt from "bcryptjs";

// 🛠️ HELPER: Get User ID (Returns null if not logged in)
const getUserId = (req: Request): number | null => {
  const testId = req.headers.get("x-user-id");
  return testId ? parseInt(testId) : null;
};

// 1. GET (Get personal info by Instructor ID via query param)
// Usage: /api/instructor_preferences?instructor_id=123
export async function GET(req: NextRequest) {
  const instructorId = req.nextUrl.searchParams.get("instructor_id");

  if (!instructorId) {
    return createResponse(
      false,
      "instructor_id query parameter is required",
      null,
      400,
    );
  }

  const idAsNumber = parseInt(instructorId);
  if (isNaN(idAsNumber)) {
    return createResponse(false, "Invalid instructor_id", null, 400);
  }
  try {
    const result = await db
      .select({
        id: instructors.id,
        code: instructors.code,
        full_name: instructors.full_name,
        email: instructors.email,
        phone_number: instructors.phone_number,
        is_active: instructors.is_active,

        // Joined Degree Info
        highest_degree_certificate_id:
          instructors.highest_degree_certificate_id,
        highest_degree_name: degreeCertificate.degree_certificate_name,

        // Other Personal Details
        years_of_experience: instructors.years_of_experience,
        date_of_birth: instructors.date_of_birth,
        address: instructors.address,
        profile_picture_url: instructors.profile_picture_url,
        resume_url: instructors.resume_url,
        created_at: instructors.created_at,
      })
      .from(instructors)
      .leftJoin(
        degreeCertificate,
        eq(instructors.highest_degree_certificate_id, degreeCertificate.id),
      )
      .where(eq(instructors.id, idAsNumber))
      .limit(1);

    if (result.length === 0) {
      return createResponse(false, "Instructor not found", null, 404);
    }

    return createResponse(
      true,
      "Instructor personal information fetched successfully",
      result[0], // Return single object
      200,
    );
  } catch (error) {
    console.error("Error fetching instructor:", error);
    return createResponse(false, "Error fetching instructor", null, 500);
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
      userId ?? 0,
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
