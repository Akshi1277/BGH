"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const COLUMNS = [
  {
    heading: "OUR GROUP",
    links: [
      { label: "ENIF", href: "/enif" },
      { label: "Talent Pro League", href: "/#companies" },
      { label: "London School of Academics & Arts", href: "/#companies" },
      { label: "Alayn", href: "/#companies" },
      { label: "Luxure De Eden", href: "/#companies" },
    ],
  },
  {
    heading: "THE GROUP",
    links: [
      { label: "The Mandate", href: "/#mandate" },
      { label: "Our Sectors", href: "/#sectors" },
      { label: "Our Philosophy", href: "/#standard" },
      { label: "Group Companies", href: "/#companies" },
    ],
  },
  {
    heading: "CONNECT",
    links: [
      { label: "Start a Conversation", href: "mailto:hello@brahmglobalholdings.com" },
      { label: "Careers", href: "#" },
      { label: "LinkedIn", href: "#" },
    ],
  },
];

interface FooterProps {
  theme?: "light" | "dark";
}

export default function Footer({ theme }: FooterProps) {
  const pathname = usePathname();
  const isDark = theme === "dark" || pathname === "/enif";

  return (
    <motion.footer
      className={`w-full ${
        isDark
          ? "bg-[#04070D] text-[#F8FAFC] border-t border-cyan-500/20"
          : "bg-surface border-t border-surface-line"
      }`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
    >
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop py-20 grid grid-cols-1 md:grid-cols-12 gap-16">
        
        {/* Brand Block */}
        <div className="md:col-span-5 flex flex-col gap-6">
          <Link href="/" className="flex items-center gap-3 w-fit">
            <span
              className={`relative w-9 h-9 rounded-full overflow-hidden border shrink-0 ${
                isDark
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
                  isDark ? "text-[#F8FAFC]" : "text-ink"
                }`}
              >
                BRAHM
              </span>
              <span
                className={`font-mono-ui text-[9px] tracking-[0.32em] mt-1 ${
                  isDark ? "text-[#38BDF8]" : "text-accent"
                }`}
              >
                GLOBAL HOLDINGS
              </span>
            </span>
          </Link>

          <div className="space-y-2 max-w-sm">
            <h4
              className={`font-display text-base font-semibold ${
                isDark ? "text-[#38BDF8]" : "text-accent"
              }`}
            >
              Building Institutions That Endure.
            </h4>
            <p
              className={`text-sm leading-relaxed font-light ${
                isDark ? "text-[#94A3B8]" : "text-ink-muted"
              }`}
            >
              BRAHM Global Holdings is an independent, privately held business group dedicated to creating, developing and growing enduring enterprises across technology, education, sport, hospitality, luxury consumer brands and emerging industries.
            </p>
            <p
              className={`text-xs font-mono-ui uppercase tracking-wider ${
                isDark ? "text-white/60" : "text-ink/60"
              }`}
            >
              Headquartered in London. Built for international markets.
            </p>
          </div>
        </div>

        {/* Links Columns */}
        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10">
          {COLUMNS.map((col) => (
            <div key={col.heading} className="flex flex-col gap-3 sm:gap-4">
              <span
                className={`font-mono-ui text-label uppercase tracking-[0.15em] mb-1 font-bold ${
                  isDark ? "text-[#38BDF8]" : "text-accent"
                }`}
              >
                {col.heading}
              </span>
              {col.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-sm inline-block py-1 transition-all duration-200 hover:translate-x-0.5 ${
                    isDark
                      ? "text-[#94A3B8] hover:text-[#38BDF8]"
                      : "text-ink-muted hover:text-accent"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Copyright Bar */}
      <div
        className={`border-t ${
          isDark ? "border-cyan-500/20" : "border-surface-line"
        }`}
      >
        <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div
            className={`text-[11px] font-mono-ui uppercase tracking-[0.12em] text-center md:text-left ${
              isDark ? "text-[#94A3B8]" : "text-ink-muted"
            }`}
          >
            &copy; 2026 BRAHM Global Holdings Ltd. All Rights Reserved.
          </div>
         
        </div>
      </div>
    </motion.footer>
  );
}
