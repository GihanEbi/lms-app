import { NextRequest } from "next/server";
import { db } from "@/db";
import {
  instructors,
  degreeCertificate,
  instructorPreferences,
  instructorVerifications,
  instructorExpertise,
  subjects,
} from "@/db/schema";
import { eq } from "drizzle-orm";
import { createResponse } from "@/src/lib/api-response";
import { requireAccess } from "@/src/lib/auth-guard";
import { AccessConstants } from "@/src/constants/AccessConstants";

export async function GET(req: NextRequest) {
  // 1. Admin Access Check
  const accessError = await requireAccess(req, AccessConstants.INSTRUCTOR_GET);
  if (accessError) return accessError;

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
    // 2. Fetch Personal Info + Degree Name
    const personalInfo = await db
      .select({
        id: instructors.id,
        code: instructors.code,
        full_name: instructors.full_name,
        email: instructors.email,
        phone_number: instructors.phone_number,
        is_active: instructors.is_active,
        registration_status: instructors.registration_status,
        highest_degree_certificate_id:
          instructors.highest_degree_certificate_id,
        degree_certificate_name: degreeCertificate.degree_certificate_name, // Joined
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

    if (personalInfo.length === 0) {
      return createResponse(false, "Instructor not found", null, 404);
    }

    // 3. Fetch Preferences (1-to-1)
    const preferences = await db.query.instructorPreferences.findFirst({
      where: eq(instructorPreferences.instructor_id, idAsNumber),
    });

    // 4. Fetch Verifications (1-to-1)
    const verifications = await db.query.instructorVerifications.findFirst({
      where: eq(instructorVerifications.instructor_id, idAsNumber),
    });

    // 5. Fetch Expertise (Many-to-Many -> Subjects)
    const expertise = await db
      .select({
        subject_id: subjects.id,
        subject_name: subjects.subject_name,
      })
      .from(instructorExpertise)
      .innerJoin(subjects, eq(instructorExpertise.subject_id, subjects.id))
      .where(eq(instructorExpertise.instructor_id, idAsNumber));

    // 6. Construct Final Response Object
    const responseData = {
      personal_information: personalInfo[0],
      preferences: preferences || null,
      expertise: expertise || [],
      verifications: verifications || null,
    };

    return createResponse(
      true,
      "Instructor details fetched successfully",
      responseData,
      200,
    );
  } catch (error) {
    console.error("Error fetching instructor details:", error);
    return createResponse(
      false,
      "Error fetching instructor details",
      null,
      500,
    );
  }
}
