import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "marigold-banquet-default-secret-change-in-production"
);

const COOKIE_NAME = "marigold_admin_token";

// Routes that don't need auth
const PUBLIC_ROUTES = ["/admin/login"];

// API routes that need auth (all mutations + sensitive reads)
const PROTECTED_API_PATTERNS = [
  { method: "POST", pattern: /^\/api\/(enquiries|bookings|gallery|blogs|settings|contact)/ },
  { method: "PATCH", pattern: /^\/api\/(enquiries|bookings|blogs)/ },
  { method: "PUT", pattern: /^\/api\/settings/ },
  { method: "DELETE", pattern: /^\/api\/(gallery|blogs)/ },
  // Sensitive reads
  { method: "GET", pattern: /^\/api\/(enquiries|bookings)(\?|$)/ },
  { method: "GET", pattern: /^\/api\/settings/ },
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Add security headers to all responses
  const response = NextResponse.next();
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Check if this is a protected admin page route
  if (pathname.startsWith("/admin") && !PUBLIC_ROUTES.some((r) => pathname.startsWith(r))) {
    const token = request.cookies.get(COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      await jwtVerify(token, JWT_SECRET);
      // Token is valid, allow access
      return response;
    } catch {
      // Token invalid or expired, redirect to login
      const redirect = NextResponse.redirect(new URL("/admin/login", request.url));
      redirect.cookies.delete(COOKIE_NAME);
      return redirect;
    }
  }

  // Check if this is a protected API route
  const method = request.method;
  const isProtectedApi = PROTECTED_API_PATTERNS.some(
    (p) => p.method === method && p.pattern.test(pathname)
  );

  if (isProtectedApi) {
    // For API routes, check for admin token OR API key header
    const token = request.cookies.get(COOKIE_NAME)?.value;
    const apiKey = request.headers.get("x-api-key");

    if (apiKey === process.env.ADMIN_API_KEY) {
      return response;
    }

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    try {
      await jwtVerify(token, JWT_SECRET);
      return response;
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid or expired token" },
        { status: 401 }
      );
    }
  }

  return response;
}

export const config = {
  matcher: [
    // Admin pages
    "/admin/:path((?!login$).*)",
    "/admin/login",
    // API routes
    "/api/enquiries/:path*",
    "/api/bookings/:path*",
    "/api/gallery/:path*",
    "/api/blogs/:path*",
    "/api/settings/:path*",
  ],
};
