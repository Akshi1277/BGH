"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import { usePathname } from "next/navigation";

const COLUMNS = [
  {
    heading: "Group Companies",
    links: [
      { label: "Talent Pro League", href: "/#companies" },
      { label: "LSA", href: "/#companies" },
      { label: "Luxure De Eden", href: "/#companies" },
      { label: "Alayn", href: "/#companies" },
      { label: "ENIF Technologies", href: "/enif" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Who We Are", href: "/#who-we-are" },
      { label: "How We Build", href: "/#how-we-build" },
      { label: "Why Trust Us", href: "/#trust" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "Start a Project", href: "/#contact" },
      { label: "LinkedIn", href: "#" },
      { label: "Careers", href: "#" },
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
          <p
            className={`text-sm leading-relaxed max-w-xs ${
              isDark ? "text-[#94A3B8]" : "text-ink-muted"
            }`}
          >
            Building enduring businesses. A British venture builder and
            holding company creating, acquiring and scaling exceptional
            businesses across technology, education, sport, hospitality and
            luxury consumer products.
          </p>
        </div>

        <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-10">
          {COLUMNS.map((col) => (
            <div key={col.heading} className="flex flex-col gap-4">
              <span
                className={`font-mono-ui text-label uppercase tracking-[0.1em] mb-1 ${
                  isDark ? "text-[#38BDF8]" : "text-ink-faint"
                }`}
              >
                {col.heading}
              </span>
              {col.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-sm inline-block transition-all duration-200 hover:translate-x-0.5 ${
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

      <div
        className={`border-t ${
          isDark ? "border-cyan-500/20" : "border-surface-line"
        }`}
      >
        <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div
            className={`text-[11px] font-mono-ui uppercase tracking-[0.1em] text-center md:text-left ${
              isDark ? "text-[#94A3B8]" : "text-ink-faint"
            }`}
          >
            &copy; {new Date().getFullYear()} Brahm Global Holdings.{" "}
            <span className="inline-block md:inline whitespace-nowrap">
              All rights reserved.
            </span>
          </div>
          <div
            className={`flex gap-6 text-[11px] font-mono-ui uppercase tracking-[0.1em] ${
              isDark ? "text-[#94A3B8]" : "text-ink-faint"
            }`}
          >
            <Link
              href="#"
              className={`transition-colors ${
                isDark ? "hover:text-[#38BDF8]" : "hover:text-accent"
              }`}
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className={`transition-colors ${
                isDark ? "hover:text-[#38BDF8]" : "hover:text-accent"
              }`}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
