import { NextRequest } from "next/server";
import { apiResponse, apiError, handlePrismaError, parsePagination, parseFilters } from "@/lib/api-utils";
import { galleryPhotoSchema } from "@/lib/validations";
import { GalleryService } from "@/services";
import { GALLERY_CATEGORIES } from "@/constants";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const { limit, offset } = parsePagination(searchParams);
    const { all, category } = parseFilters(searchParams);

    if (category && !GALLERY_CATEGORIES.includes(category as any)) {
      return apiError(`Invalid category. Allowed: ${GALLERY_CATEGORIES.join(", ")}`, 400);
    }

    const result = await GalleryService.list({ limit, offset, all, category });
    return apiResponse(result);
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = galleryPhotoSchema.safeParse(body);
    if (!parsed.success) {
      return apiError("Validation failed", 400, parsed.error.flatten().fieldErrors);
    }

    const data = parsed.data;
    if (!GALLERY_CATEGORIES.includes(data.category as any)) {
      return apiError(`Invalid category. Allowed: ${GALLERY_CATEGORIES.join(", ")}`, 400);
    }

    const photo = await GalleryService.create(data);
    return apiResponse(photo, 201);
  } catch (error) {
    if (error instanceof Error && error.message === "DUPLICATE_INSTAGRAM") {
      return apiError("This Instagram post has already been imported", 409);
    }
    return handlePrismaError(error);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updateData } = body;
    if (!id) return apiError("Photo ID is required", 400);

    const parsed = galleryPhotoSchema.partial().safeParse(updateData);
    if (!parsed.success) {
      return apiError("Validation failed", 400, parsed.error.flatten().fieldErrors);
    }
    if (parsed.data.category && !GALLERY_CATEGORIES.includes(parsed.data.category as any)) {
      return apiError(`Invalid category. Allowed: ${GALLERY_CATEGORIES.join(", ")}`, 400);
    }

    const photo = await GalleryService.update(id, parsed.data);
    return apiResponse(photo);
  } catch (error) {
    if (error instanceof Error && error.message === "NOT_FOUND") {
      return apiError("Gallery photo not found", 404);
    }
    return handlePrismaError(error);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return apiError("Photo ID is required", 400);

    await GalleryService.delete(id);
    return apiResponse({ deleted: true });
  } catch (error) {
    if (error instanceof Error && error.message === "NOT_FOUND") {
      return apiError("Gallery photo not found", 404);
    }
    return handlePrismaError(error);
  }
}
