import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

if (!process.env.JWT_SECRET) {
  throw new Error("FATAL: JWT_SECRET environment variable is not set.");
}
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

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
  // Instagram admin operations
  { method: "POST", pattern: /^\/api\/instagram$/ },
  { method: "PATCH", pattern: /^\/api\/instagram/ },
  { method: "DELETE", pattern: /^\/api\/instagram/ },
  // Blog post admin operations
  { method: "POST", pattern: /^\/api\/blog-post$/ },
];

function withSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  return response;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  // ── Redirect www to non-www (canonical domain) ──────────────────────────
  const host = request.headers.get("host") || "";
  if (host.startsWith("www.")) {
    const url = request.nextUrl.clone();
    url.host = host.replace("www.", "");
    return NextResponse.redirect(url, 301);
  }

  // ── Add geo-based headers for Nepal visitors ────────────────────────────
  const response = NextResponse.next();
  // Vercel provides geo data on NextRequest (types may not include it)
  const geo = (request as unknown as { geo?: { country?: string; city?: string } }).geo;
  const _country = geo?.country;
  const _city = geo?.city;

  // Set Vary header for proper CDN caching
  response.headers.set("Vary", "Accept-Encoding");

  // ── Check if this is a protected admin page route ───────────────────────
  if (pathname.startsWith("/admin") && !PUBLIC_ROUTES.some((r) => pathname.startsWith(r))) {
    const token = request.cookies.get(COOKIE_NAME)?.value;

    if (!token) {
      return withSecurityHeaders(NextResponse.redirect(new URL("/admin/login", request.url)));
    }

    try {
      await jwtVerify(token, JWT_SECRET);
      // Token is valid, allow access
      return withSecurityHeaders(NextResponse.next());
    } catch {
      // Token invalid or expired, redirect to login
      const redirect = withSecurityHeaders(NextResponse.redirect(new URL("/admin/login", request.url)));
      redirect.cookies.delete(COOKIE_NAME);
      return redirect;
    }
  }

  // ── Allow public API routes (enquiry form, contact form, booking form) ──
  const isPublicApi = PUBLIC_API_ROUTES.some(
    (p) => p.method === method && p.pattern.test(pathname)
  );
  if (isPublicApi) {
    return withSecurityHeaders(NextResponse.next());
  }

  // ── Check if this is a protected API route ──────────────────────────────
  const isProtectedApi = PROTECTED_API_PATTERNS.some(
    (p) => p.method === method && p.pattern.test(pathname)
  );

  if (isProtectedApi) {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    const apiKey = request.headers.get("x-api-key");

    if (apiKey && apiKey === process.env.ADMIN_API_KEY) {
      return withSecurityHeaders(NextResponse.next());
    }

    if (!token) {
      return withSecurityHeaders(NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      ));
    }

    try {
      await jwtVerify(token, JWT_SECRET);
      return withSecurityHeaders(NextResponse.next());
    } catch {
      return withSecurityHeaders(NextResponse.json(
        { success: false, error: "Invalid or expired token" },
        { status: 401 }
      ));
    }
  }

  return withSecurityHeaders(response);
}

export const config = {
  matcher: [
    // All routes (for www redirect + geo headers)
    "/(.*)",
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
    "/api/instagram/:path*",
    "/api/blog-post/:path*",
  ],
};
