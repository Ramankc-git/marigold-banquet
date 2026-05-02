// src/lib/auth.ts — backward-compatible re-exports from centralized config

export {
  signAdminToken,
  verifyAdminToken,
  getAdminSession,
  hasPermission,
  COOKIE_NAME,
  ROLE_HIERARCHY,
} from "@/config";

export type { AdminPayload } from "@/types";
