import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";

const footerLinks = {
  events: [
    { label: "Weddings", href: "/weddings" },
    { label: "Private Parties", href: "/parties" },
    { label: "Corporate Events", href: "/corporate" },
    { label: "Explore Spaces", href: "/spaces" },
  ],
  services: [
    { label: "Food & Drinks", href: "/food" },
    { label: "Decoration & Themes", href: "/decoration" },
    { label: "Gallery", href: "/gallery" },
    { label: "Blog", href: "/blog" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Offers", href: "/offers" },
  ],
  legal: [
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Refund Policy", href: "/refund" },
    { label: "Vendor Directory", href: "/vendors" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-burgundy text-white">
      {/* Main footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-marigold to-marigold-dark flex items-center justify-center shadow-lg">
                <span className="text-white font-serif text-2xl font-bold">
                  M
                </span>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold">
                  Marigold Banquet
                </h3>
                <p className="text-marigold-light text-sm tracking-wider uppercase">
                  & Party Palace
                </p>
              </div>
            </div>
            <p className="text-ivory/80 mb-6 max-w-md leading-relaxed">
              Where Every Celebration Becomes a Memory. Premium banquet hall and
              party palace in the heart of Tokha, Kathmandu, offering
              world-class venues for weddings, parties, and corporate events.
            </p>

            {/* Contact info */}
            <div className="space-y-3 mb-6">
              <a
                href="tel:+9779851111191"
                className="flex items-center gap-3 text-ivory/80 hover:text-marigold-light transition-colors"
              >
                <Phone className="w-4 h-4 text-marigold" />
                +977-9851111191
              </a>
              <a
                href="mailto:info@marigoldbanquet.com.np"
                className="flex items-center gap-3 text-ivory/80 hover:text-marigold-light transition-colors"
              >
                <Mail className="w-4 h-4 text-marigold" />
                info@marigoldbanquet.com.np
              </a>
              <a
                href="https://maps.google.com/?q=27.7466368,85.320588"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-ivory/80 hover:text-marigold-light transition-colors"
              >
                <MapPin className="w-4 h-4 text-marigold" />
                Tokha-07, Gairigaun, Kathmandu
              </a>
              <div className="flex items-center gap-3 text-ivory/80">
                <Clock className="w-4 h-4 text-marigold" />
                6:00 AM – 10:00 PM, 7 days a week
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com/MarigoldBanquetcafeHealthClub/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-marigold flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-marigold flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/9779851111191"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-green-600 flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
<WhatsAppIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 text-marigold-light">
              Events
            </h4>
            <ul className="space-y-2">
              {footerLinks.events.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-ivory/70 hover:text-marigold-light transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 text-marigold-light">
              Services
            </h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-ivory/70 hover:text-marigold-light transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 text-marigold-light">
              Company
            </h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-ivory/70 hover:text-marigold-light transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-ivory/70 hover:text-marigold-light transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-ivory/50 text-sm text-center sm:text-left">
            &copy; {new Date().getFullYear()} Marigold Banquet Hall & Party
            Palace. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-ivory/50 text-xs">
            <span>Sister Brand:</span>
            <a
              href="#"
              className="text-marigold-light hover:text-marigold transition-colors"
            >
              Marigold Swimming Pool & Sauna
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
