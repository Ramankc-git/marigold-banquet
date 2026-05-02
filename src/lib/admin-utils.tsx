// src/lib/admin-utils.ts

import { Badge } from "@/components/ui/badge";

/**
 * Get a styled status badge for enquiry/booking statuses.
 */
export function getStatusBadge(status: string) {
  const map: Record<string, { label: string; className: string }> = {
    new: { label: "New", className: "bg-blue-100 text-blue-800 hover:bg-blue-100" },
    contacted: { label: "Contacted", className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" },
    confirmed: { label: "Confirmed", className: "bg-green-100 text-green-800 hover:bg-green-100" },
    cancelled: { label: "Cancelled", className: "bg-red-100 text-red-800 hover:bg-red-100" },
    pending: { label: "Pending", className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" },
    completed: { label: "Completed", className: "bg-green-100 text-green-800 hover:bg-green-100" },
  };
  const s = map[status] || { label: status, className: "bg-gray-100 text-gray-800 hover:bg-gray-100" };
  return <Badge className={s.className}>{s.label}</Badge>;
}

/**
 * Format a number as Nepali Rupees.
 */
export function formatCurrency(amount: number): string {
  return `Rs. ${amount.toLocaleString("en-NP")}`;
}

/**
 * Format an ISO date string for display.
 */
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
