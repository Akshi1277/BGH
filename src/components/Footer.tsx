"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const COLUMNS = [
  {
    heading: "PORTFOLIO",
    links: [
      { label: "ENIF", href: "/enif" },
      { label: "7 AURIGA", href: "/7auriga" },
      { label: "Talent Pro League", href: "/#companies" },
      { label: "London School of Academics & Arts", href: "/#companies" },
      { label: "Alayn", href: "/#companies" },
      { label: "Luxure De Eden", href: "/#companies" },
    ],
  },
  {
    heading: "ORGANISATION",
    links: [
      { label: "About BGH", href: "/about" },
      { label: "Vision & Mandate", href: "/#vision" },
      { label: "Industry Sectors", href: "/#sectors" },
      { label: "How We Build", href: "/#how-we-build" },
      { label: "Philosophy & Standard", href: "/#standard" },
    ],
  },
  {
    heading: "INQUIRIES",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "brahmglobalholdings@gmail.com", href: "mailto:brahmglobalholdings@gmail.com" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

interface FooterProps {
  theme?: "light" | "dark" | "auriga";
}

export default function Footer({ theme }: FooterProps) {
  const pathname = usePathname();
  const isAuriga = theme === "auriga" || pathname === "/7auriga";
  const isEnif = theme === "dark" || pathname === "/enif";

  return (
    <motion.footer
      className={`w-full ${
        isAuriga
          ? "bg-[#0D0B0B] text-[#FAF7F5] border-t border-[#2E2424]"
          : isEnif
          ? "bg-[#04070D] text-[#F8FAFC] border-t border-cyan-500/20"
          : "bg-paper border-t border-surface-line"
      }`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
    >
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop py-16 md:py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Brand Block */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 w-fit group">
              <span
                className={`relative w-9 h-9 rounded-full overflow-hidden border shrink-0 transition-transform duration-300 group-hover:scale-105 ${
                  isAuriga
                    ? "border-[#9B1C2E]/40 bg-[#161212]"
                    : isEnif
                    ? "border-cyan-500/40 bg-[#141A16]"
                    : "border-accent/30 bg-surface-high"
                }`}
              >
                <Image
                  src="/whatsapp.svg"
                  alt="Brahm Global Holdings"
                  fill
                  sizes="36px"
                  className="object-cover opacity-90"
                />
              </span>
              <span className="flex flex-col leading-none">
                <span
                  className={`font-display text-lg tracking-[0.12em] ${
                    isAuriga
                      ? "text-[#FAF7F5]"
                      : isEnif
                      ? "text-[#F8FAFC]"
                      : "text-ink"
                  }`}
                >
                  BRAHM
                </span>
                <span
                  className={`font-mono-ui text-[9px] tracking-[0.32em] mt-1 ${
                    isAuriga
                      ? "text-[#C8374F]"
                      : isEnif
                      ? "text-[#38BDF8]"
                      : "text-accent"
                  }`}
                >
                  GLOBAL HOLDINGS
                </span>
              </span>
            </Link>

            <p
              className={`text-sm leading-relaxed font-light max-w-sm ${
                isAuriga
                  ? "text-[#9C8F8F]"
                  : isEnif
                  ? "text-[#94A3B8]"
                  : "text-ink-muted"
              }`}
            >
              Building enduring enterprises across technology, education, sport, and luxury.
            </p>
          </div>

          <div className="space-y-1 text-xs font-mono-ui uppercase tracking-wider">
            <p
              className={
                isAuriga
                  ? "text-[#FAF7F5]/50"
                  : isEnif
                  ? "text-white/60"
                  : "text-ink/60"
              }
            >
              Headquartered in London
            </p>
            <p
              className={
                isAuriga
                  ? "text-[#FAF7F5]/30"
                  : isEnif
                  ? "text-white/40"
                  : "text-ink/40"
              }
            >
              Built for international markets
            </p>
          </div>
        </div>

        {/* Navigation Columns */}
        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10">
          {COLUMNS.map((col) => (
            <div key={col.heading} className="flex flex-col gap-3 sm:gap-4">
              <span
                className={`font-mono-ui uppercase tracking-[0.18em] mb-1 font-semibold text-[11px] ${
                  isAuriga
                    ? "text-[#C8374F]"
                    : isEnif
                    ? "text-[#38BDF8]"
                    : "text-accent"
                }`}
              >
                {col.heading}
              </span>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className={`text-sm font-light inline-block transition-all duration-200 hover:translate-x-1 ${
                        isAuriga
                          ? "text-[#9C8F8F] hover:text-[#FAF7F5]"
                          : isEnif
                          ? "text-[#94A3B8] hover:text-[#38BDF8]"
                          : "text-ink-muted hover:text-accent"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className={`border-t ${
          isAuriga
            ? "border-[#2E2424]"
            : isEnif
            ? "border-cyan-500/20"
            : "border-surface-line"
        }`}
      >
        <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div
            className={`text-[11px] font-mono-ui uppercase tracking-[0.14em] text-center sm:text-left ${
              isAuriga
                ? "text-[#9C8F8F]"
                : isEnif
                ? "text-[#94A3B8]"
                : "text-ink-muted"
            }`}
          >
            &copy; {new Date().getFullYear()} BRAHM Global Holdings Ltd. All Rights Reserved.
          </div>
          <div
            className={`text-[11px] font-mono-ui uppercase tracking-[0.14em] flex items-center gap-4 ${
              isAuriga
                ? "text-[#9C8F8F]/70"
                : isEnif
                ? "text-[#94A3B8]/70"
                : "text-ink-muted/70"
            }`}
          >
            <span>London, United Kingdom</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
