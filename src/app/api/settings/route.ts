import { NextRequest } from "next/server";
import { apiResponse, apiError, handlePrismaError } from "@/lib/api-utils";
import { settingsSchema } from "@/lib/validations";
import { SettingsService } from "@/services";
import { MAX_SETTINGS_PER_UPDATE } from "@/constants";

export async function GET() {
  try {
    const settingsMap = await SettingsService.getAll();
    return apiResponse({ settings: settingsMap });
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = settingsSchema.safeParse(body);
    if (!parsed.success) {
      return apiError("Validation failed", 400, parsed.error.flatten().fieldErrors);
    }

    const { settings } = parsed.data;
    const entries = Object.entries(settings);

    if (entries.length > MAX_SETTINGS_PER_UPDATE) {
      return apiError(`Too many settings in one request. Maximum is ${MAX_SETTINGS_PER_UPDATE}.`, 400);
    }

    const result = await SettingsService.upsert(settings);
    return apiResponse(result);
  } catch (error) {
    if (error instanceof Error && error.message === "TOO_MANY_SETTINGS") {
      return apiError(`Too many settings. Maximum is ${MAX_SETTINGS_PER_UPDATE}.`, 400);
    }
    return handlePrismaError(error);
  }
}
