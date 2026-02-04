import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      // Error Case 2: invalid password
      return createResponse(false, "Invalid credentials", null, 401);
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" },
    );

    // Success Case
    return createResponse(true, "Login successful!", { token });
  } catch (error) {
    console.error(error);
    // Catch Block: The one you asked about!
    return createResponse(false, "Login failed", null, 500);
  }
}
