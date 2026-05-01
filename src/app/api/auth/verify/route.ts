import { apiResponse, apiError } from "@/lib/api-utils";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getAdminSession();

    if (!session) {
      return apiError("Not authenticated", 401);
    }

    return apiResponse(session);
  } catch (error) {
    console.error("Verify error:", error);
    return apiError("Verification failed", 500);
  }
}
