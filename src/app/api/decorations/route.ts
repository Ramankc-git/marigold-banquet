import { NextRequest } from "next/server";
import { apiResponse, apiError, handlePrismaError, parsePagination, parseFilters } from "@/lib/api-utils";
import { decorationThemeSchema } from "@/lib/validations";
import { DecorationService } from "@/services";
import { decorations } from "@/repositories";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const { limit, offset } = parsePagination(searchParams);
    const { all, category } = parseFilters(searchParams);

    const result = await DecorationService.list({
      limit, offset, all, category,
      orderBy: { order: "asc" as const },
      include: { photos: { orderBy: { order: "asc" as const } } },
    });

    return apiResponse({ themes: result.items, total: result.total });
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = decorationThemeSchema.safeParse(body);
    if (!parsed.success) {
      return apiError("Validation failed", 400, parsed.error.flatten().fieldErrors);
    }
    const theme = await decorations.create(parsed.data, { include: { photos: true } });
    return apiResponse(theme, 201);
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...rest } = body;
    if (!id || typeof id !== "string") {
      return apiError("Decoration theme ID is required", 400);
    }

    const partialSchema = decorationThemeSchema.partial();
    const parsed = partialSchema.safeParse(rest);
    if (!parsed.success) {
      return apiError("Validation failed", 400, parsed.error.flatten().fieldErrors);
    }
    if (Object.keys(parsed.data).length === 0) {
      return apiError("No valid fields provided for update", 400);
    }

    const exists = await decorations.exists(id);
    if (!exists) return apiError("Decoration theme not found", 404);

    const theme = await decorations.update(id, parsed.data, { include: { photos: true } });
    return apiResponse(theme);
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return apiError("Decoration theme ID is required", 400);

    await DecorationService.delete(id);
    return apiResponse({ deleted: true });
  } catch (error) {
    if (error instanceof Error && error.message === "NOT_FOUND") {
      return apiError("Decoration theme not found", 404);
    }
    return handlePrismaError(error);
  }
}
