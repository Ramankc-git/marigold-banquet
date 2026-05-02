import { NextRequest } from "next/server";
import { apiResponse, apiError, handlePrismaError, parsePagination, parseFilters } from "@/lib/api-utils";
import { packageSchema } from "@/lib/validations";
import { PackageService } from "@/services";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const { limit, offset } = parsePagination(searchParams);
    const { all, category, tier } = parseFilters(searchParams);

    const result = await PackageService.list({
      limit, offset, all, category, tier,
      orderBy: { order: "asc" as const },
    });

    return apiResponse({ packages: result.items, total: result.total });
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = packageSchema.safeParse(body);
    if (!parsed.success) {
      return apiError("Validation failed", 400, parsed.error.flatten().fieldErrors);
    }
    const pkg = await PackageService.create(parsed.data);
    return apiResponse(pkg, 201);
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...rest } = body;
    if (!id || typeof id !== "string") {
      return apiError("Package ID is required", 400);
    }

    const partialSchema = packageSchema.partial();
    const parsed = partialSchema.safeParse(rest);
    if (!parsed.success) {
      return apiError("Validation failed", 400, parsed.error.flatten().fieldErrors);
    }
    if (Object.keys(parsed.data).length === 0) {
      return apiError("No valid fields provided for update", 400);
    }

    const pkg = await PackageService.update(id, parsed.data);
    return apiResponse(pkg);
  } catch (error) {
    if (error instanceof Error && error.message === "NOT_FOUND") {
      return apiError("Package not found", 404);
    }
    return handlePrismaError(error);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return apiError("Package ID is required", 400);

    await PackageService.delete(id);
    return apiResponse({ deleted: true });
  } catch (error) {
    if (error instanceof Error && error.message === "NOT_FOUND") {
      return apiError("Package not found", 404);
    }
    return handlePrismaError(error);
  }
}
