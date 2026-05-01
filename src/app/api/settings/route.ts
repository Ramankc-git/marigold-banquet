import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { apiResponse, apiError, handlePrismaError } from "@/lib/api-utils";
import { settingsSchema } from "@/lib/validations";

const MAX_SETTINGS_PER_UPDATE = 50;

export async function GET() {
  try {
    const settings = await db.siteSetting.findMany();
    const settingsMap: Record<string, string> = {};
    settings.forEach((s) => {
      settingsMap[s.key] = s.value;
    });
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
      return apiError(
        `Too many settings in one request. Maximum is ${MAX_SETTINGS_PER_UPDATE}.`,
        400
      );
    }

    const upserts = entries.map(([key, value]) =>
      db.siteSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      })
    );

    await Promise.all(upserts);

    return apiResponse({ updated: entries.length });
  } catch (error) {
    return handlePrismaError(error);
  }
}
