"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { trackEnquiry, trackWhatsAppClick } from "@/lib/analytics";

interface FieldErrors {
  [key: string]: string;
}

interface EnquiryFormProps {
  variant?: "default" | "compact" | "booking";
  prefillEventType?: string;
  title?: string;
  subtitle?: string;
}

export function EnquiryForm({
  variant = "default",
  prefillEventType,
  title = "Make an Enquiry",
  subtitle = "Fill in the details below and we'll get back to you within 24 hours",
}: EnquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refNumber, setRefNumber] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [eventType, setEventType] = useState(prefillEventType ?? "");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const validate = (data: FormData): FieldErrors => {
    const errors: FieldErrors = {};
    const fullName = data.get("fullName") as string;
    const phone = data.get("phone") as string;
    const email = data.get("email") as string;

    if (!fullName?.trim()) errors.fullName = "Please enter your full name.";
    if (!phone?.trim()) errors.phone = "Please enter your phone number.";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!eventType) errors.eventType = "Please select an event type.";
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const data = new FormData(form);

    const errors = validate(data);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setLoading(true);

    const ref = "MG-" + Date.now().toString(36).toUpperCase();
    setRefNumber(ref);

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: data.get("fullName"),
          phone: data.get("phone"),
          email: data.get("email"),
          eventType: eventType,
          hallPreference: data.get("hallPreference"),
          expectedGuests: data.get("expectedGuests")
            ? parseInt(data.get("expectedGuests") as string)
            : null,
          preferredDate: data.get("preferredDate"),
          budgetRange: data.get("budgetRange"),
          specialReqs: data.get("specialReqs"),
          referenceNumber: ref,
        }),
      });

      if (res.ok) {
        form.reset();
        setEventType(prefillEventType ?? "");
        setFieldErrors({});
        setSubmitted(true);
        trackEnquiry(eventType, data.get("hallPreference") as string | undefined);
      } else {
        setError("Something went wrong. Please try again or contact us on WhatsApp.");
      }
    } catch (err) {
      console.error("Enquiry submission failed:", err);
      setError("Something went wrong. Please try again or contact us on WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12 px-6"
      >
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="font-serif text-2xl text-burgundy mb-3">
          Thank You!
        </h3>
        <p className="text-muted-foreground mb-2">
          Your enquiry has been submitted successfully.
        </p>
        <p className="text-sm text-muted-foreground">
          Reference Number:{" "}
          <span className="font-mono font-bold text-burgundy">{refNumber}</span>
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          We will contact you within 24 hours. You can also reach us on{" "}
          <a
            href="https://wa.me/9779851111191"
            className="text-green-600 underline"
          >
            WhatsApp
          </a>
          .
        </p>
      </motion.div>
    );
  }

  return (
    <div className={variant === "compact" ? "max-w-lg mx-auto" : ""}>
      <div className="text-center mb-8">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-burgundy mb-3">
          {title}
        </h2>
        <p className="text-muted-foreground">{subtitle}</p>
        <div className="section-divider mt-4" />
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              name="fullName"
              placeholder="Your full name"
              className={`mt-1.5 ${fieldErrors.fullName ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
            />
            {fieldErrors.fullName && <p className="text-sm text-red-600 mt-1">{fieldErrors.fullName}</p>}
          </div>
          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="+977-XXXXXXXXXX"
              className={`mt-1.5 ${fieldErrors.phone ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
            />
            {fieldErrors.phone && <p className="text-sm text-red-600 mt-1">{fieldErrors.phone}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              className={`mt-1.5 ${fieldErrors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
            />
            {fieldErrors.email && <p className="text-sm text-red-600 mt-1">{fieldErrors.email}</p>}
          </div>
          <div>
            <Label htmlFor="eventType">Event Type *</Label>
            <Select
              name="eventType"
              value={eventType}
              onValueChange={(val) => {
                setEventType(val);
                setFieldErrors((prev) => {
                  const next = { ...prev };
                  delete next.eventType;
                  return next;
                });
              }}
            >
              <SelectTrigger className={`mt-1.5 ${fieldErrors.eventType ? 'border-red-500' : ''}`}>
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="wedding">Wedding</SelectItem>
                <SelectItem value="engagement">Engagement</SelectItem>
                <SelectItem value="birthday">Birthday Party</SelectItem>
                <SelectItem value="anniversary">Anniversary</SelectItem>
                <SelectItem value="bratabandha">Bratabandha</SelectItem>
                <SelectItem value="pasni">Pasni</SelectItem>
                <SelectItem value="baby_shower">Baby Shower</SelectItem>
                <SelectItem value="corporate">Corporate Event</SelectItem>
                <SelectItem value="seminar">Seminar</SelectItem>
                <SelectItem value="farewell">Farewell</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {fieldErrors.eventType && (
              <p className="text-sm text-red-600 mt-1">{fieldErrors.eventType}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <Label htmlFor="expectedGuests">Expected Guests</Label>
            <Input
              id="expectedGuests"
              name="expectedGuests"
              type="number"
              placeholder="Number of guests"
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="preferredDate">Preferred Date</Label>
            <Input
              id="preferredDate"
              name="preferredDate"
              type="date"
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="budgetRange">Budget Range (NPR)</Label>
            <Select name="budgetRange">
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Select budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="under_50k">Under NPR 50,000</SelectItem>
                <SelectItem value="50k_100k">NPR 50,000 - 1,00,000</SelectItem>
                <SelectItem value="100k_200k">
                  NPR 1,00,000 - 2,00,000
                </SelectItem>
                <SelectItem value="200k_500k">
                  NPR 2,00,000 - 5,00,000
                </SelectItem>
                <SelectItem value="500k_plus">Above NPR 5,00,000</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="specialReqs">Special Requirements</Label>
          <Textarea
            id="specialReqs"
            name="specialReqs"
            placeholder="Tell us about any special requirements..."
            className="mt-1.5"
            rows={3}
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-start gap-3">
            <p className="text-sm flex-1">{error}</p>
            <button
              type="button"
              onClick={() => setError(null)}
              className="text-red-500 hover:text-red-700 shrink-0"
              aria-label="Dismiss error"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Button
            type="submit"
            disabled={loading}
            className="bg-burgundy hover:bg-burgundy-dark text-white px-8 py-3 rounded-sm w-full sm:w-auto"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Enquiry"
            )}
          </Button>
          <span className="text-muted-foreground text-sm">or</span>
          <a
            href="https://wa.me/9779851111191?text=Hello%20Marigold%20Banquet%2C%20I%20would%20like%20to%20enquire%20about%20your%20venue."
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center gap-1"
            onClick={() => trackWhatsAppClick("enquiry_form")}
          >
            <WhatsAppIcon className="w-4 h-4" />
            Chat on WhatsApp
          </a>
        </div>
      </form>
    </div>
  );
}
