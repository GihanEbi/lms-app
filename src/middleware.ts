import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const publicRoutes = ["/api/auth/login", "/api/register"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Bypass public routes
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // 2. Check for Token
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Unauthorized: Missing token" },
      { status: 401 },
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    // 3. Verify Token
    const { payload } = await jwtVerify(token, secret);

    // 4. 🚀 CRITICAL STEP: Inject User Info into Headers
    // This allows the API Route to know WHO the user is without parsing the token again.
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", String(payload.userId));
    requestHeaders.set("x-group-id", String(payload.group_id)); // Ensure your Login API puts this in the token!

    // Pass the modified headers to the actual route
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Unauthorized: Invalid token" },
      { status: 401 },
    );
  }
}

export const config = {
  matcher: "/api/:path*",
};
