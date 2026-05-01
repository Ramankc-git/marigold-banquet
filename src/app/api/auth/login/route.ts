import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { loginSchema } from "@/lib/validations";
import { apiError, apiResponse } from "@/lib/api-utils";
import { signAdminToken, createAdminCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return apiError("Invalid input", 400, parsed.error.flatten());
    }

    const { email, password } = parsed.data;

    // Find admin user
    const admin = await db.adminUser.findUnique({
      where: { email },
    });

    if (!admin) {
      return apiError("Invalid email or password", 401);
    }

    // Simple password check (in production, use bcrypt)
    // For now, comparing directly. TODO: hash passwords with bcrypt
    if (admin.password !== password) {
      return apiError("Invalid email or password", 401);
    }

    // Generate JWT
    const token = await signAdminToken({
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role as "super_admin" | "event_manager" | "content_editor",
    });

    // Set cookie and return response
    const response = apiResponse({
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    });

    response.headers.set("Set-Cookie", createAdminCookie(token));

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return apiError("Login failed", 500);
  }
}
