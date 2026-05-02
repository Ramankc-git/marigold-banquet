import { NextRequest } from "next/server";
import { apiResponse, apiError, handlePrismaError } from "@/lib/api-utils";
import { contactSchema } from "@/lib/validations";
import { EnquiryService } from "@/services";

export async function POST(req: NextRequest) {
  try {
    let body;
    try {
      body = await req.json();
    } catch {
      return apiError("Invalid request body. Expected JSON.", 400);
    }
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return apiError("Validation failed", 400, parsed.error.flatten().fieldErrors);
    }

    const { name, phone, email, message } = parsed.data;
    const referenceNumber = `MG-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;

    await EnquiryService.create({
      fullName: name,
      phone,
      email: email || null,
      eventType: "general_inquiry",
      specialReqs: message,
      referenceNumber,
    });

    return apiResponse({ referenceNumber }, 201);
  } catch (error) {
    return handlePrismaError(error);
  }
}
