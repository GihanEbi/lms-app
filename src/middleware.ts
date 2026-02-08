import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// 1. Define routes that don't need authentication
const publicRoutes = [
  "/api/auth/login",
  "/api/register",
  "/api/rules",
  "/api/rules/[ruleId]",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 2. Check if the current path is public
  // If it is, we return "next()" to let the request pass through immediately
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // 3. If it's NOT public, check for the token
  const authHeader = request.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Unauthorized: Missing token" },
      { status: 401 },
    );
  }

  // Extract the actual token string
  const token = authHeader.split(" ")[1];

  try {
    // 4. Verify the token
    // We need to encode the secret for the 'jose' library
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    // If this fails, it throws an error and goes to the catch block
    await jwtVerify(token, secret);

    // 5. Token is valid! Let the request proceed
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json(
      { error: "Unauthorized: Invalid token" },
      { status: 401 },
    );
  }
}

// Configure where this middleware runs
// We only want it to run on routes starting with /api
export const config = {
  matcher: "/api/:path*",
};
