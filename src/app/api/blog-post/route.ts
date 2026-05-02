import { NextRequest } from "next/server";
import { apiResponse, apiError, handlePrismaError } from "@/lib/api-utils";
import { BlogService } from "@/services";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    if (!slug) return apiError("Slug is required", 400);

    const post = await BlogService.getBySlug(slug);
    if (!post) return apiError("Post not found", 404);

    return apiResponse({ post });
  } catch (error) {
    return handlePrismaError(error);
  }
}
