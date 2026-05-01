import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { apiResponse, apiError, handlePrismaError, clampInt, parseBoolean } from "@/lib/api-utils";
import { faqSchema } from "@/lib/validations";

// ── GET /api/faq ─────────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const limit = clampInt(searchParams.get("limit"), 1, 100, 50);
    const offset = clampInt(searchParams.get("offset"), 0, 10000, 0);
    const all = parseBoolean(searchParams.get("all"));
    const category = searchParams.get("category") || undefined;

    const where = {
      ...(all ? {} : { isActive: true }),
      ...(category ? { category } : {}),
    };

    const [faqs, total] = await Promise.all([
      db.fAQ.findMany({
        where,
        orderBy: { order: "asc" },
        take: limit,
        skip: offset,
      }),
      db.fAQ.count({ where }),
    ]);

    return apiResponse({ faqs, total });
  } catch (error) {
    return handlePrismaError(error);
  }
}

// ── POST /api/faq ────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = faqSchema.safeParse(body);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      return apiError("Validation failed", 400, fieldErrors);
    }

    const data = parsed.data;

    const faq = await db.fAQ.create({
      data: {
        question: data.question,
        answer: data.answer,
        category: data.category,
        isActive: data.isActive ?? true,
        order: data.order ?? 0,
      },
    });

    return apiResponse(faq, 201);
  } catch (error) {
    return handlePrismaError(error);
  }
}

// ── PATCH /api/faq ───────────────────────────────────────────────────────────
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...rest } = body;

    if (!id || typeof id !== "string") {
      return apiError("FAQ ID is required", 400);
    }

    const partialSchema = faqSchema.partial();
    const parsed = partialSchema.safeParse(rest);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      return apiError("Validation failed", 400, fieldErrors);
    }

    if (Object.keys(parsed.data).length === 0) {
      return apiError("No valid fields provided for update", 400);
    }

    const existing = await db.fAQ.findUnique({ where: { id } });
    if (!existing) {
      return apiError("FAQ not found", 404);
    }

    const faq = await db.fAQ.update({
      where: { id },
      data: parsed.data,
    });

    return apiResponse(faq);
  } catch (error) {
    return handlePrismaError(error);
  }
}

// ── DELETE /api/faq ──────────────────────────────────────────────────────────
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return apiError("FAQ ID is required", 400);
    }

    const existing = await db.fAQ.findUnique({ where: { id } });
    if (!existing) {
      return apiError("FAQ not found", 404);
    }

    await db.fAQ.delete({ where: { id } });

    return apiResponse({ deleted: true });
  } catch (error) {
    return handlePrismaError(error);
  }
}
