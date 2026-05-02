// src/middleware.ts

import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

if (!process.env.JWT_SECRET) {
  throw new Error("FATAL: JWT_SECRET environment variable is not set.");
}
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
const COOKIE_NAME = "marigold_admin_token";

const PUBLIC_ROUTES = ["/admin/login"];

const PUBLIC_API_ROUTES = [
  { method: "POST", pattern: /^\/api\/(enquiries|contact)$/ },
  { method: "POST", pattern: /^\/api\/bookings$/ },
];

const PROTECTED_API_PATTERNS = [
  { method: "GET", pattern: /^\/api\/(enquiries|bookings)(\?|$|\/)/ },
  { method: "GET", pattern: /^\/api\/settings/ },
  { method: "POST", pattern: /^\/api\/(gallery|blogs|halls|packages|menu|decorations|offers|vendors|team|faq|testimonials)$/ },
  { method: "PATCH", pattern: /^\/api\/(enquiries|bookings|blogs|gallery|halls|packages|menu|decorations|offers|vendors|team|faq|testimonials)/ },
  { method: "PUT", pattern: /^\/api\/settings/ },
  { method: "DELETE", pattern: /^\/api\/(gallery|blogs|halls|packages|menu|decorations|offers|vendors|team|faq|testimonials|enquiries|bookings)/ },
  { method: "POST", pattern: /^\/api\/instagram$/ },
  { method: "PATCH", pattern: /^\/api\/instagram/ },
  { method: "DELETE", pattern: /^\/api\/instagram/ },
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

  // www → non-www redirect
  const host = request.headers.get("host") || "";
  if (host.startsWith("www.")) {
    const url = request.nextUrl.clone();
    url.host = host.replace("www.", "");
    return NextResponse.redirect(url, 301);
  }

  const response = NextResponse.next();
  response.headers.set("Vary", "Accept-Encoding");

  // Protected admin pages
  if (pathname.startsWith("/admin") && !PUBLIC_ROUTES.some((r) => pathname.startsWith(r))) {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (!token) {
      return withSecurityHeaders(NextResponse.redirect(new URL("/admin/login", request.url)));
    }
    try {
      await jwtVerify(token, JWT_SECRET);
      return withSecurityHeaders(NextResponse.next());
    } catch {
      const redirect = withSecurityHeaders(NextResponse.redirect(new URL("/admin/login", request.url)));
      redirect.cookies.delete(COOKIE_NAME);
      return redirect;
    }
  }

  // Public API routes
  const isPublicApi = PUBLIC_API_ROUTES.some((p) => p.method === method && p.pattern.test(pathname));
  if (isPublicApi) return withSecurityHeaders(NextResponse.next());

  // Protected API routes
  const isProtectedApi = PROTECTED_API_PATTERNS.some((p) => p.method === method && p.pattern.test(pathname));
  if (isProtectedApi) {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    const apiKey = request.headers.get("x-api-key");

    if (apiKey && apiKey === process.env.ADMIN_API_KEY) {
      return withSecurityHeaders(NextResponse.next());
    }

    if (!token) {
      return withSecurityHeaders(NextResponse.json({ success: false, error: "Authentication required" }, { status: 401 }));
    }

    try {
      await jwtVerify(token, JWT_SECRET);
      return withSecurityHeaders(NextResponse.next());
    } catch {
      return withSecurityHeaders(NextResponse.json({ success: false, error: "Invalid or expired token" }, { status: 401 }));
    }
  }

  return withSecurityHeaders(response);
}

export const config = {
  matcher: [
    "/(.*)",
    "/admin/:path((?!login$).*)",
    "/admin/login",
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
