import { apiResponse } from "@/lib/api-utils";

export async function POST() {
  const response = apiResponse({ message: "Logged out successfully" });
  response.cookies.set({
    name: "marigold_admin_token",
    value: "",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0, // Immediately expire
  });
  return response;
}
