import { NextRequest } from "next/server";
import { apiResponse, apiError, handlePrismaError, parsePagination, parseFilters } from "@/lib/api-utils";
import { menuItemSchema } from "@/lib/validations";
import { MenuService } from "@/services";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const { limit, offset } = parsePagination(searchParams);
    const { all, category } = parseFilters(searchParams);

    const result = await MenuService.list({
      limit, offset, all, category,
      orderBy: { order: "asc" as const },
    });

    return apiResponse({ items: result.items, total: result.total });
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = menuItemSchema.safeParse(body);
    if (!parsed.success) {
      return apiError("Validation failed", 400, parsed.error.flatten().fieldErrors);
    }
    const item = await MenuService.create(parsed.data);
    return apiResponse(item, 201);
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...rest } = body;
    if (!id || typeof id !== "string") {
      return apiError("Menu item ID is required", 400);
    }

    const partialSchema = menuItemSchema.partial();
    const parsed = partialSchema.safeParse(rest);
    if (!parsed.success) {
      return apiError("Validation failed", 400, parsed.error.flatten().fieldErrors);
    }
    if (Object.keys(parsed.data).length === 0) {
      return apiError("No valid fields provided for update", 400);
    }

    const item = await MenuService.update(id, parsed.data);
    return apiResponse(item);
  } catch (error) {
    if (error instanceof Error && error.message === "NOT_FOUND") {
      return apiError("Menu item not found", 404);
    }
    return handlePrismaError(error);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return apiError("Menu item ID is required", 400);

    await MenuService.delete(id);
    return apiResponse({ deleted: true });
  } catch (error) {
    if (error instanceof Error && error.message === "NOT_FOUND") {
      return apiError("Menu item not found", 404);
    }
    return handlePrismaError(error);
  }
}
