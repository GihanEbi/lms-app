import { NextRequest } from "next/server";
import { db } from "@/db";
import { degreeCertificate } from "@/db/schema";
import { withAudit } from "@/src/lib/audit";
import { ilike, or, sql, desc, eq } from "drizzle-orm";
import { createResponse } from "@/src/lib/api-response";
import { requireAccess } from "@/src/lib/auth-guard";
import { AccessConstants } from "@/src/constants/AccessConstants";
import { createDegreeCertificateSchema } from "@/src/services/validation/schemas/degreeCertificate";

// 🛠️ HELPER: Get User ID
const getUserId = (req: Request): number => {
  const testId = req.headers.get("x-user-id");
  return testId ? parseInt(testId) : 1;
};

// 1. GET (List all)
export async function GET(req: NextRequest) {
  //  ========================= ACCESS CONTROL CHECK =========================
  const accessError = await requireAccess(
    req,
    AccessConstants.SYSTEM_SETTINGS_GET,
  );
  if (accessError) return accessError;

  try {
    const searchParams = req.nextUrl.searchParams;
    const pageNo = parseInt(searchParams.get("pageNo") || "0");
    const pageSize = parseInt(searchParams.get("pageSize") || "0");
    const searchValue = searchParams.get("searchValue") || "";

    const searchFilter = searchValue
      ? or(
          ilike(degreeCertificate.degree_certificate_name, `%${searchValue}%`),
          ilike(degreeCertificate.description, `%${searchValue}%`),
        )
      : undefined;

    // Defined columns to return
    const columns = {
      id: degreeCertificate.id,
      degree_certificate_name: degreeCertificate.degree_certificate_name,
      description: degreeCertificate.description,
      is_active: degreeCertificate.is_active,
      created_at: degreeCertificate.created_at,
    };

    if (pageNo > 0 && pageSize > 0) {
      const offset = (pageNo - 1) * pageSize;

      const data = await db
        .select(columns)
        .from(degreeCertificate)
        .where(searchFilter)
        .limit(pageSize)
        .offset(offset)
        .orderBy(desc(degreeCertificate.created_at));

      const [totalCountRes] = await db
        .select({ count: sql<number>`count(*)` })
        .from(degreeCertificate)
        .where(searchFilter);

      const total = Number(totalCountRes.count);

      return createResponse(
        true,
        "Degree Certificates fetched successfully",
        {
          data,
          meta: {
            pageNo,
            pageSize,
            total,
            totalPages: Math.ceil(total / pageSize),
          },
        },
        200,
      );
    } else {
      // No Pagination (e.g., for dropdowns)
      const data = await db
        .select({
          value: degreeCertificate.id,
          label: degreeCertificate.degree_certificate_name,
        })
        .from(degreeCertificate)
        .where(searchFilter)
        .orderBy(desc(degreeCertificate.created_at));

      return createResponse(
        true,
        "Degree Certificates fetched successfully",
        data,
        200,
      );
    }
  } catch (error) {
    console.error("Error fetching degree certificates:", error);
    return createResponse(
      false,
      "Error fetching degree certificates",
      null,
      500,
    );
  }
}

// 2. CREATE
export async function POST(req: Request) {
  //  ========================= ACCESS CONTROL CHECK =========================
  const accessError = await requireAccess(
    req,
    AccessConstants.SYSTEM_SETTINGS_ADD_EDIT,
  );
  if (accessError) return accessError;

  try {
    const body = await req.json();
    const { degree_certificate_name, description } = body;

    // ====================== VALIDATION ======================
    const { error } = createDegreeCertificateSchema.validate(body);
    if (error) {
      return createResponse(false, error.details[0].message, null, 400);
    }

    // ====================== CHECK DUPLICATES (degree_certificate_name) ======================
    const existing = await db
      .select()
      .from(degreeCertificate)
      .where(
        eq(degreeCertificate.degree_certificate_name, degree_certificate_name),
      )
      .limit(1);

    if (existing.length > 0) {
      return createResponse(
        false,
        "Degree Certificate Name already exists",
        null,
        409,
      );
    }

    // ====================== CREATE WITH AUDIT =======================
    const userId = getUserId(req);

    const [newItem] = await withAudit(
      userId,
      "CREATE",
      degreeCertificate,
      null,
      async () => {
        return await db
          .insert(degreeCertificate)
          .values({
            degree_certificate_name,
            description,
            user_created: userId,
            // is_active defaults to true in DB
          })
          .returning();
      },
    );

    return createResponse(
      true,
      "Degree Certificate created successfully",
      newItem,
      201,
    );
  } catch (error) {
    console.error("Create Degree Certificate Error:", error);
    return createResponse(
      false,
      "Failed to create degree certificate",
      null,
      500,
    );
  }
}
