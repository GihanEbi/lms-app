import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import jwt, { type Secret, type SignOptions } from "jsonwebtoken";
import { createResponse } from "@/src/lib/api-response";
import { systemUserTypes } from "@/src/constants/systemConstants";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // ✅ FIX: Validate input before using it
    if (!email || !password) {
      return createResponse(
        false,
        "Email and password are required",
        null,
        400,
      );
    }

    const userList = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    const user = userList[0];

    if (!user) {
      return createResponse(false, "Invalid credentials", null, 401);
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return createResponse(false, "Invalid credentials", null, 401);
    }

    const expiresIn = (process.env.JWT_SECRET_EXPIRES_IN ||
      "1d") as SignOptions["expiresIn"];
    const token = jwt.sign(
      {
        userId: user.id,
        code: user.code,
        email: user.email,
        group_id: user.group_id,
        user_type: systemUserTypes.SYSTEM
      },
      process.env.JWT_SECRET! as Secret,
      { expiresIn },
    );

    return createResponse(true, "Login successful!", { token });
  } catch (error) {
    console.error(error);
    return createResponse(false, "Login failed", null, 500);
  }
}
