import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "marigold-banquet-default-secret-change-in-production"
);

const COOKIE_NAME = "marigold_admin_token";

// Routes that don't need auth
const PUBLIC_ROUTES = ["/admin/login"];

// Public API routes that anyone can access (form submissions from the website)
const PUBLIC_API_ROUTES = [
  { method: "POST", pattern: /^\/api\/(enquiries|contact)$/ },
  { method: "POST", pattern: /^\/api\/bookings$/ },
];

// API routes that need auth (admin-only operations)
const PROTECTED_API_PATTERNS = [
  // Admin reads (sensitive data with PII)
  { method: "GET", pattern: /^\/api\/(enquiries|bookings)(\?|$|\/)/ },
  { method: "GET", pattern: /^\/api\/settings/ },
  // Admin mutations on ALL content routes
  { method: "POST", pattern: /^\/api\/(gallery|blogs|halls|packages|menu|decorations|offers|vendors|team|faq|testimonials)$/ },
  { method: "PATCH", pattern: /^\/api\/(enquiries|bookings|blogs|gallery|halls|packages|menu|decorations|offers|vendors|team|faq|testimonials)/ },
  { method: "PUT", pattern: /^\/api\/settings/ },
  { method: "DELETE", pattern: /^\/api\/(gallery|blogs|halls|packages|menu|decorations|offers|vendors|team|faq|testimonials|enquiries|bookings)/ },
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;

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

  // Allow public API routes (enquiry form, contact form, booking form)
  const isPublicApi = PUBLIC_API_ROUTES.some(
    (p) => p.method === method && p.pattern.test(pathname)
  );
  if (isPublicApi) {
    return response;
  }

  // Check if this is a protected API route
  const isProtectedApi = PROTECTED_API_PATTERNS.some(
    (p) => p.method === method && p.pattern.test(pathname)
  );

  if (isProtectedApi) {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    const apiKey = request.headers.get("x-api-key");

    if (apiKey && apiKey === process.env.ADMIN_API_KEY) {
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
    "/api/halls/:path*",
    "/api/packages/:path*",
    "/api/menu/:path*",
    "/api/decorations/:path*",
    "/api/offers/:path*",
    "/api/vendors/:path*",
    "/api/team/:path*",
    "/api/faq/:path*",
    "/api/testimonials/:path*",
    "/api/contact",
  ],
};
