"use client";

import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";

export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/9779851111191?text=Hello%20Marigold%20Banquet%2C%20I%20would%20like%20to%20enquire%20about%20booking."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg whatsapp-pulse transition-colors"
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon className="w-7 h-7 text-white" />
    </a>
  );
}
