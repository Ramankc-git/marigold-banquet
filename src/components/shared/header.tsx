"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { trackPhoneClick, trackCTAClick } from "@/lib/analytics";
import { NAV_ITEMS, BUSINESS } from "@/constants";

const navItems = [...NAV_ITEMS] as { label: string; href: string; children?: { label: string; href: string }[] }[];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-marigold/20"
          : "bg-transparent"
      }`}
    >
      {/* Top bar */}
      <div
        className={`transition-all duration-500 overflow-hidden ${
          scrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
        }`}
      >
        <div className="bg-burgundy text-white text-sm">
          <div className="container mx-auto px-4 flex justify-between items-center h-10">
            <div className="flex items-center gap-4">
              <a
                href={`tel:${BUSINESS.phone}`}
                className="flex items-center gap-1 hover:text-marigold-light transition-colors"
                onClick={() => trackPhoneClick('header')}
              >
                <Phone className="w-3 h-3" />
                {BUSINESS.phone}
              </a>
              <span className="hidden sm:inline text-ivory/70">|</span>
              <span className="hidden sm:inline text-ivory/80">
                6:00 AM – 10:00 PM
              </span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={BUSINESS.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-marigold-light transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href={BUSINESS.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-marigold-light transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-marigold to-marigold-dark flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <span className="text-white font-serif text-xl font-bold">M</span>
            </div>
            <div className="hidden sm:block">
              <div
                className={`font-serif text-lg font-bold leading-tight transition-colors ${
                  scrolled ? "text-burgundy" : "text-white"
                }`}
              >
                Marigold
              </div>
              <p
                className={`text-xs tracking-wider uppercase transition-colors ${
                  scrolled ? "text-marigold-dark" : "text-marigold-light"
                }`}
              >
                Banquet & Party Palace
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) =>
              item.children ? (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-burgundy/10 data-[state=open]:bg-burgundy/10">
                    <span
                      className={scrolled ? "text-burgundy" : "text-white"}
                    >
                      {item.label}
                    </span>
                    <ChevronDown
                      className={`w-3 h-3 ${
                        scrolled ? "text-burgundy" : "text-white"
                      }`}
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center">
                    {item.children.map((child) => (
                      <DropdownMenuItem key={child.label} asChild>
                        <Link href={child.href}>{child.label}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-burgundy/10 ${
                    scrolled ? "text-burgundy" : "text-white"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA + Mobile */}
          <div className="flex items-center gap-3">
            <Link href="/booking" onClick={() => trackCTAClick('book_viewing_header', 'header')}>
              <Button className="hidden md:flex bg-burgundy hover:bg-burgundy-dark text-white rounded-sm px-6 shadow-md hover:shadow-lg transition-all">
                Book a Viewing
              </Button>
            </Link>

            <a
              href={`tel:${BUSINESS.phone}`}
              className={`md:hidden flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                scrolled
                  ? "text-burgundy hover:bg-burgundy/10"
                  : "text-white hover:bg-white/20"
              }`}
              onClick={() => trackPhoneClick('header_mobile')}
            >
              <Phone className="w-5 h-5" />
            </a>

            {/* Mobile hamburger */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button
                  className={`lg:hidden flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                    scrolled
                      ? "text-burgundy hover:bg-burgundy/10"
                      : "text-white hover:bg-white/20"
                  }`}
                  aria-label="Open menu"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-80 bg-ivory p-0"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-6 border-b border-marigold/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-marigold to-marigold-dark flex items-center justify-center">
                        <span className="text-white font-serif text-lg font-bold">
                          M
                        </span>
                      </div>
                      <div>
                        <h2 className="font-serif text-burgundy font-bold">
                          Marigold
                        </h2>
                        <p className="text-xs text-marigold-dark tracking-wider uppercase">
                          Banquet & Party Palace
                        </p>
                      </div>
                    </div>
                    <SheetClose asChild>
                      <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-burgundy/10 text-burgundy">
                        <X className="w-5 h-5" />
                      </button>
                    </SheetClose>
                  </div>

                  <nav className="flex-1 overflow-y-auto py-4">
                    {navItems.map((item) => (
                      <div key={item.label}>
                        <Link
                          href={item.href === "#" ? item.children![0].href : item.href}
                          onClick={() => setMobileOpen(false)}
                          className="block px-6 py-3 text-burgundy font-medium hover:bg-burgundy/5 transition-colors"
                        >
                          {item.label}
                        </Link>
                        {item.children?.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="block px-10 py-2 text-burgundy/70 text-sm hover:bg-burgundy/5 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </nav>

                  <div className="p-6 border-t border-marigold/20">
                    <Link href="/booking" onClick={() => { setMobileOpen(false); trackCTAClick('book_viewing_mobile', 'header'); }}>
                      <Button className="w-full bg-burgundy hover:bg-burgundy-dark text-white rounded-sm">
                        Book a Viewing
                      </Button>
                    </Link>
                    <a
                      href={`tel:${BUSINESS.phone}`}
                      className="flex items-center justify-center gap-2 mt-3 text-burgundy hover:text-burgundy-dark transition-colors"
                      onClick={() => trackPhoneClick('header_mobile_menu')}
                    >
                      <Phone className="w-4 h-4" />
                      {BUSINESS.phone}
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
