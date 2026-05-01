import { apiResponse } from "@/lib/api-utils";
import { clearAdminCookie } from "@/lib/auth";

export async function POST() {
  const response = apiResponse({ message: "Logged out successfully" });
  response.headers.set("Set-Cookie", clearAdminCookie());
  return response;
}
