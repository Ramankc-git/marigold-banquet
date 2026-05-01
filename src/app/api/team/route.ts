import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { apiResponse, apiError, handlePrismaError, clampInt, parseBoolean } from "@/lib/api-utils";
import { teamMemberSchema } from "@/lib/validations";

// ── GET /api/team ────────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const limit = clampInt(searchParams.get("limit"), 1, 100, 50);
    const offset = clampInt(searchParams.get("offset"), 0, 10000, 0);
    const all = parseBoolean(searchParams.get("all"));

    const where = all ? {} : { isActive: true };

    const [members, total] = await Promise.all([
      db.teamMember.findMany({
        where,
        orderBy: { order: "asc" },
        take: limit,
        skip: offset,
      }),
      db.teamMember.count({ where }),
    ]);

    return apiResponse({ members, total });
  } catch (error) {
    return handlePrismaError(error);
  }
}

// ── POST /api/team ───────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = teamMemberSchema.safeParse(body);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      return apiError("Validation failed", 400, fieldErrors);
    }

    const data = parsed.data;

    const member = await db.teamMember.create({
      data: {
        name: data.name,
        role: data.role,
        bio: data.bio || null,
        photo: data.photo || null,
        isActive: data.isActive ?? true,
        order: data.order ?? 0,
      },
    });

    return apiResponse(member, 201);
  } catch (error) {
    return handlePrismaError(error);
  }
}

// ── PATCH /api/team ──────────────────────────────────────────────────────────
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...rest } = body;

    if (!id || typeof id !== "string") {
      return apiError("Team member ID is required", 400);
    }

    const partialSchema = teamMemberSchema.partial();
    const parsed = partialSchema.safeParse(rest);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      return apiError("Validation failed", 400, fieldErrors);
    }

    if (Object.keys(parsed.data).length === 0) {
      return apiError("No valid fields provided for update", 400);
    }

    const existing = await db.teamMember.findUnique({ where: { id } });
    if (!existing) {
      return apiError("Team member not found", 404);
    }

    const member = await db.teamMember.update({
      where: { id },
      data: parsed.data,
    });

    return apiResponse(member);
  } catch (error) {
    return handlePrismaError(error);
  }
}

// ── DELETE /api/team ─────────────────────────────────────────────────────────
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return apiError("Team member ID is required", 400);
    }

    const existing = await db.teamMember.findUnique({ where: { id } });
    if (!existing) {
      return apiError("Team member not found", 404);
    }

    await db.teamMember.delete({ where: { id } });

    return apiResponse({ deleted: true });
  } catch (error) {
    return handlePrismaError(error);
  }
}
