"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface SectionHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  breadcrumb?: { label: string; href?: string }[];
  ctaText?: string;
  ctaHref?: string;
}

export function SectionHero({
  title,
  subtitle,
  backgroundImage,
  breadcrumb,
  ctaText,
  ctaHref,
}: SectionHeroProps) {
  return (
    <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 hero-overlay" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Breadcrumb */}
        {breadcrumb && breadcrumb.length > 0 && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <ol className="flex items-center justify-center gap-2 text-sm text-ivory/70">
              {breadcrumb.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  {i > 0 && <span>/</span>}
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="hover:text-marigold-light transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-marigold-light">{item.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </motion.nav>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-ivory/90 max-w-2xl mx-auto mb-8"
          >
            {subtitle}
          </motion.p>
        )}

        {ctaText && ctaHref && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              href={ctaHref}
              className="inline-block bg-burgundy hover:bg-burgundy-dark text-white px-8 py-4 rounded-sm font-medium transition-all shadow-lg hover:shadow-xl"
            >
              {ctaText}
            </Link>
          </motion.div>
        )}

        {/* Decorative divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-8"
        >
          <div className="section-divider" />
        </motion.div>
      </div>
    </section>
  );
}
