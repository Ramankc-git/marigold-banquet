import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { apiResponse, apiError, handlePrismaError, clampInt, parseBoolean } from "@/lib/api-utils";
import { vendorSchema } from "@/lib/validations";

// ── GET /api/vendors ─────────────────────────────────────────────────────────
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

    const [vendors, total] = await Promise.all([
      db.vendor.findMany({
        where,
        orderBy: { order: "asc" },
        take: limit,
        skip: offset,
      }),
      db.vendor.count({ where }),
    ]);

    return apiResponse({ vendors, total });
  } catch (error) {
    return handlePrismaError(error);
  }
}

// ── POST /api/vendors ────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = vendorSchema.safeParse(body);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      return apiError("Validation failed", 400, fieldErrors);
    }

    const data = parsed.data;

    const vendor = await db.vendor.create({
      data: {
        name: data.name,
        category: data.category,
        description: data.description || null,
        phone: data.phone || null,
        email: data.email || null,
        website: data.website || null,
        logo: data.logo || null,
        isActive: data.isActive ?? true,
        order: data.order ?? 0,
      },
    });

    return apiResponse(vendor, 201);
  } catch (error) {
    return handlePrismaError(error);
  }
}

// ── PATCH /api/vendors ───────────────────────────────────────────────────────
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...rest } = body;

    if (!id || typeof id !== "string") {
      return apiError("Vendor ID is required", 400);
    }

    const partialSchema = vendorSchema.partial();
    const parsed = partialSchema.safeParse(rest);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      return apiError("Validation failed", 400, fieldErrors);
    }

    if (Object.keys(parsed.data).length === 0) {
      return apiError("No valid fields provided for update", 400);
    }

    const existing = await db.vendor.findUnique({ where: { id } });
    if (!existing) {
      return apiError("Vendor not found", 404);
    }

    const vendor = await db.vendor.update({
      where: { id },
      data: parsed.data,
    });

    return apiResponse(vendor);
  } catch (error) {
    return handlePrismaError(error);
  }
}

// ── DELETE /api/vendors ──────────────────────────────────────────────────────
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return apiError("Vendor ID is required", 400);
    }

    const existing = await db.vendor.findUnique({ where: { id } });
    if (!existing) {
      return apiError("Vendor not found", 404);
    }

    await db.vendor.delete({ where: { id } });

    return apiResponse({ deleted: true });
  } catch (error) {
    return handlePrismaError(error);
  }
}
