import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import jwt, { type Secret, type SignOptions } from "jsonwebtoken";
import { createResponse } from "@/src/lib/api-response"; // <--- 1. Import the helper

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const userList = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    const user = userList[0];

    if (!user) {
      // Error Case 1: invalid user
      return createResponse(false, "Invalid credentials", null, 401);
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      // Error Case 2: invalid password
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
      },
      process.env.JWT_SECRET! as Secret,
      { expiresIn },
    );

    // Success Case
    return createResponse(true, "Login successful!", { token });
  } catch (error) {
    console.error(error);
    // Catch Block: The one you asked about!
    return createResponse(false, "Login failed", null, 500);
  }
}
