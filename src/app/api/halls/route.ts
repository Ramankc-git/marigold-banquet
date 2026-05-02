import { NextRequest } from "next/server";
import { apiResponse, apiError, handlePrismaError, parsePagination, parseFilters } from "@/lib/api-utils";
import { hallSchema } from "@/lib/validations";
import { HallService } from "@/services";
import { halls } from "@/repositories";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const { all } = parseFilters(searchParams);

    const result = await HallService.list({
      all,
      limit: 100,
      offset: 0,
      orderBy: { order: "asc" as const },
      include: { photos: { orderBy: { order: "asc" as const } } },
    });

    return apiResponse(result.items);
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = hallSchema.safeParse(body);
    if (!parsed.success) {
      return apiError("Validation failed", 400, parsed.error.flatten().fieldErrors);
    }
    const hall = await halls.create(parsed.data, { include: { photos: true } });
    return apiResponse(hall, 201);
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updateData } = body;

    if (!id) {
      return apiError("Hall ID is required", 400);
    }

    const parsed = hallSchema.partial().safeParse(updateData);
    if (!parsed.success) {
      return apiError("Validation failed", 400, parsed.error.flatten().fieldErrors);
    }

    const exists = await halls.exists(id);
    if (!exists) return apiError("Hall not found", 404);

    const hall = await halls.update(id, parsed.data, { include: { photos: true } });
    return apiResponse(hall);
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return apiError("Hall ID is required", 400);

    await HallService.delete(id);
    return apiResponse({ deleted: true });
  } catch (error) {
    if (error instanceof Error && error.message === "NOT_FOUND") {
      return apiError("Hall not found", 404);
    }
    return handlePrismaError(error);
  }
}
