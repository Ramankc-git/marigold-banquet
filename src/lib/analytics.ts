/**
 * Analytics utility for tracking custom events
 * Works with Google Analytics 4 custom events and Vercel Analytics
 */

// ── Google Analytics 4 Custom Events ────────────────────────────────────

/**
 * Track a custom event in Google Analytics 4
 * GA4 automatically collects page_view events; use this for business events
 */
export function trackEvent(eventName: string, params?: Record<string, string | number | boolean>) {
  if (typeof window !== "undefined" && "gtag" in window) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).gtag("event", eventName, params);
  }
}

// ── Pre-defined Business Events ─────────────────────────────────────────

/** Track when a user submits an enquiry form */
export function trackEnquiry(eventType: string, hallPreference?: string) {
  trackEvent("enquiry_submitted", {
    event_type: eventType,
    hall_preference: hallPreference || "none",
  });
}

/** Track when a user starts the booking process */
export function trackBookingStarted(eventType: string, hallId?: string) {
  trackEvent("booking_started", {
    event_type: eventType,
    hall_id: hallId || "none",
  });
}

/** Track when a user completes a booking */
export function trackBookingCompleted(eventType: string, totalAmount?: number) {
  trackEvent("booking_completed", {
    event_type: eventType,
    value: totalAmount || 0,
    currency: "NPR",
  });
}

/** Track when a user clicks the WhatsApp button */
export function trackWhatsAppClick(page: string) {
  trackEvent("whatsapp_click", {
    page_source: page,
  });
}

/** Track when a user clicks a phone number */
export function trackPhoneClick(page: string) {
  trackEvent("phone_click", {
    page_source: page,
  });
}

/** Track gallery photo views */
export function trackGalleryView(category: string, source: string) {
  trackEvent("gallery_photo_view", {
    category,
    source, // "manual" or "instagram"
  });
}

/** Track Instagram profile click from gallery */
export function trackInstagramClick() {
  trackEvent("instagram_profile_click", {});
}

/** Track CTA button clicks (Book Now, Get Quote, etc.) */
export function trackCTAClick(ctaName: string, page: string) {
  trackEvent("cta_click", {
    cta_name: ctaName,
    page_source: page,
  });
}

/** Track package/package view */
export function trackPackageView(packageName: string, tier: string) {
  trackEvent("package_view", {
    package_name: packageName,
    tier,
  });
}

/** Track blog post read */
export function trackBlogRead(slug: string, category: string) {
  trackEvent("blog_read", {
    slug,
    category,
  });
}
