import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { apiResponse, apiError, handlePrismaError, clampInt } from "@/lib/api-utils";
import { enquirySchema, enquiryStatusSchema } from "@/lib/validations";

const ALLOWED_ENQUIRY_STATUSES = ["new", "contacted", "confirmed", "cancelled"] as const;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const limit = clampInt(searchParams.get("limit"), 1, 100, 50);
    const offset = clampInt(searchParams.get("offset"), 0, 10000, 0);
    const status = searchParams.get("status");

    const where = status && ALLOWED_ENQUIRY_STATUSES.includes(status as typeof ALLOWED_ENQUIRY_STATUSES[number])
      ? { status }
      : {};

    const [enquiries, total] = await Promise.all([
      db.enquiry.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: offset,
      }),
      db.enquiry.count({ where }),
    ]);

    return apiResponse({ enquiries, total });
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = enquirySchema.safeParse(body);

    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      return apiError("Validation failed", 400, errors);
    }

    const enquiry = await db.enquiry.create({
      data: {
        fullName: parsed.data.fullName,
        phone: parsed.data.phone,
        email: parsed.data.email || null,
        eventType: parsed.data.eventType,
        hallPreference: parsed.data.hallPreference || null,
        expectedGuests: parsed.data.expectedGuests ?? null,
        preferredDate: parsed.data.preferredDate || null,
        budgetRange: parsed.data.budgetRange || null,
        specialReqs: parsed.data.specialReqs || null,
        referenceNumber: parsed.data.referenceNumber || `MG-${Date.now().toString(36).toUpperCase()}`,
      },
    });

    return apiResponse(enquiry, 201);
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = enquiryStatusSchema.safeParse(body);

    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      return apiError("Validation failed", 400, errors);
    }

    const { id, status, notes } = parsed.data;

    const existing = await db.enquiry.findUnique({ where: { id } });
    if (!existing) {
      return apiError("Enquiry not found", 404);
    }

    const enquiry = await db.enquiry.update({
      where: { id },
      data: {
        status,
        ...(notes !== undefined ? { notes } : {}),
      },
    });

    return apiResponse(enquiry);
  } catch (error) {
    return handlePrismaError(error);
  }
}
