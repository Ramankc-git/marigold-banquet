import { NextRequest, NextResponse } from "next/server";
import { loginSchema } from "@/lib/validations";
import { apiError, apiResponse } from "@/lib/api-utils";
import { signAdminToken } from "@/lib/auth";

// Fallback admin credentials from environment variables
// This ensures login works on Vercel even if the database is empty/ephemeral
const ENV_ADMINS: Record<string, { password: string; name: string; role: string }> = {
  "admin@marigoldbanquet.com.np": {
    password: process.env.ADMIN_PASSWORD || "admin123",
    name: "Super Admin",
    role: "super_admin",
  },
  "manager@marigoldbanquet.com.np": {
    password: process.env.MANAGER_PASSWORD || "manager123",
    name: "Event Manager",
    role: "event_manager",
  },
  "editor@marigoldbanquet.com.np": {
    password: process.env.EDITOR_PASSWORD || "editor123",
    name: "Content Editor",
    role: "content_editor",
  },
};

function createAuthResponse(data: object, token: string) {
  const response = apiResponse(data);
  // Set cookie with proper attributes for Vercel (HTTPS + cross-site compatible)
  response.cookies.set({
    name: "marigold_admin_token",
    value: token,
    httpOnly: true,
    secure: true,
    sameSite: "lax", // Use "lax" instead of "strict" for better compatibility
    path: "/",
    maxAge: 86400, // 24 hours
  });
  return response;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return apiError("Invalid input", 400, parsed.error.flatten());
    }

    const { email, password } = parsed.data;

    // Try database first (if available)
    try {
      const { db } = await import("@/lib/db");
      const admin = await db.adminUser.findUnique({
        where: { email },
      });

      if (admin && admin.password === password) {
        const token = await signAdminToken({
          id: admin.id,
          email: admin.email,
          name: admin.name,
          role: admin.role as "super_admin" | "event_manager" | "content_editor",
        });

        return createAuthResponse(
          {
            id: admin.id,
            email: admin.email,
            name: admin.name,
            role: admin.role,
          },
          token
        );
      }
    } catch (dbError) {
      // Database not available (e.g., Vercel ephemeral filesystem or no DB configured)
      console.log("DB lookup failed, falling back to env credentials:", dbError instanceof Error ? dbError.message : "unknown error");
    }

    // Fallback: Check environment variable credentials
    const envAdmin = ENV_ADMINS[email];
    if (envAdmin && envAdmin.password === password) {
      const token = await signAdminToken({
        id: `env-${email.split("@")[0]}`,
        email,
        name: envAdmin.name,
        role: envAdmin.role as "super_admin" | "event_manager" | "content_editor",
      });

      return createAuthResponse(
        {
          id: `env-${email.split("@")[0]}`,
          email,
          name: envAdmin.name,
          role: envAdmin.role,
        },
        token
      );
    }

    return apiError("Invalid email or password", 401);
  } catch (error) {
    console.error("Login error:", error);
    return apiError("Login failed", 500);
  }
}
