import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { headers } from "next/headers"; // <--- New import
import jwt from "jsonwebtoken"; // <--- New import

export async function GET() {
  try {
    // 1. Get the headers
    const headersList = await headers();
    const authHeader = headersList.get("authorization");

    // 2. Check if the header exists
    if (!authHeader) {
      return NextResponse.json(
        { error: "Unauthorized: No token provided" },
        { status: 401 },
      );
    }

    // 3. Extract the token (Format is usually "Bearer <token>")
    const token = authHeader.split(" ")[1];

    // 4. Verify the token
    try {
      jwt.verify(token, process.env.JWT_SECRET!);
    } catch (err) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid token" },
        { status: 401 },
      );
    }

    // 5. If we get here, the user is valid! Fetch the data.
    const allUsers = await db.select().from(users);

    // Crucial: Don't send back passwords!
    // We map over the users to remove the password field before sending
    const safeUsers = allUsers.map(({ password, ...rest }) => rest);

    return NextResponse.json(safeUsers);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    // 1. Get data from the user
    const { name, email, password } = await request.json();

    // 2. Check if user already exists
    // We search the database for a user with this email
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 },
      );
    }

    // 3. Hash the password
    // 10 is the "salt rounds" - higher is safer but slower
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Save to database
    // Notice we save 'hashedPassword', NOT the plain 'password' variable!
    const newUser = await db
      .insert(users)
      .values({
        name,
        email,
        password: hashedPassword,
        role: "student", // Default role
      })
      .returning({ id: users.id, email: users.email, name: users.name });

    return NextResponse.json(newUser[0], { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
