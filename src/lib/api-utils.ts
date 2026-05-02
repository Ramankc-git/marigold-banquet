import { NextResponse } from "next/server";

// Standardized API response helpers
export function apiResponse(data: unknown, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function apiError(message: string, status = 500, details?: unknown) {
  return NextResponse.json(
    { success: false, error: message, ...(details ? { details } : {}) },
    { status }
  );
}

// Prisma error discrimination
export function handlePrismaError(error: unknown): NextResponse {
  if (error && typeof error === "object" && "code" in error) {
    const prismaError = error as { code: string; meta?: { target?: string[] } };

    switch (prismaError.code) {
      case "P2002":
        // Unique constraint violation
        const target = prismaError.meta?.target?.join(", ") || "field";
        return apiError(`Duplicate value for: ${target}. This record already exists.`, 409);

      case "P2025":
        // Record not found
        return apiError("Record not found.", 404);

      case "P2003":
        // Foreign key constraint failed
        return apiError("Related record not found. Check your references.", 400);

      case "P2014":
        // Required relation violation
        return apiError("Required relation is missing.", 400);

      case "P2011":
        // Null constraint violation
        return apiError("A required field is missing.", 400);

      default:
        console.error("Prisma error:", prismaError.code, prismaError);
        return apiError("Database operation failed.", 500);
    }
  }

  console.error("Unexpected error:", error);
  return apiError("An unexpected error occurred.", 500);
}

// Query param sanitization
export function clampInt(value: string | null, min: number, max: number, fallback: number): number {
  if (!value) return fallback;
  const parsed = parseInt(value, 10);
  if (isNaN(parsed)) return fallback;
  return Math.min(Math.max(parsed, min), max);
}

export function parseBoolean(value: string | null): boolean {
  return value === "true";
}

/**
 * Parse pagination parameters from a URL's search params.
 */
export function parsePagination(searchParams: URLSearchParams, defaults?: { limit?: number; offset?: number }) {
  const limit = clampInt(searchParams.get("limit"), 1, 100, defaults?.limit ?? 50);
  const offset = clampInt(searchParams.get("offset"), 0, 10000, defaults?.offset ?? 0);
  return { limit, offset };
}

/**
 * Parse filter parameters commonly used in list endpoints.
 */
export function parseFilters(searchParams: URLSearchParams) {
  const all = parseBoolean(searchParams.get("all"));
  const category = searchParams.get("category") || undefined;
  const status = searchParams.get("status") || undefined;
  const tier = searchParams.get("tier") || undefined;
  return { all, category, status, tier };
}
