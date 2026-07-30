"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { StarButton } from "./StarButton";

const NAV_ITEMS = [
  { name: "Capabilities", href: "#capabilities" },
  { name: "Why ENIF", href: "#why-enif" },
  { name: "Method", href: "#method" },
  { name: "Philosophy", href: "#philosophy" },
  { name: "Tech Stack", href: "#tech" },
];

export const LumaBar = ({ className }: { className?: string }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full py-3 pt-[calc(0.75rem+env(safe-area-inset-top,0px))] transition-colors duration-500 pointer-events-auto",
        className
      )}
    >
      {/* Smooth Fading Background Overlay on Scroll */}
      <div
        className={cn(
          "absolute inset-0 pointer-events-none transition-all duration-500 ease-in-out",
          isScrolled
            ? "opacity-100 bg-[#04070D]/90 backdrop-blur-xl border-b border-[#38BDF8]/20 shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
            : "opacity-0 bg-transparent border-b border-transparent backdrop-blur-none"
        )}
      />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 md:px-12 flex items-center justify-between">
        {/* Left: ENIF Logo (High-Res & Crisp Rendering) */}
        <Link href="/enif" className="flex items-center group select-none">
          <div className="relative w-10 h-10 md:w-16 md:h-16 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/image copy 7.png"
              alt="ENIF Logo"
              fill
              sizes="(max-width: 768px) 40px, 64px"
              quality={100}
              className="object-contain drop-shadow-[0_0_15px_rgba(56,189,248,0.3)]"
              priority
            />
          </div>
        </Link>

        {/* 21st.dev Tubelight Sliding Tabs (100% Mathematically Centered) */}
        <nav className="hidden md:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="relative px-4 py-1.5 text-xs font-medium tracking-wide text-[#94A3B8] hover:text-white transition-colors duration-200 select-none"
            >
              <span className="relative z-10">{item.name}</span>
            </a>
          ))}
        </nav>

        {/* Right: BGH-Themed "Back to BGH" Button (Matching BGH Navbar Theme) */}
        <div className="flex items-center gap-3">
          <StarButton
            href="/"
            shimmerColor="#34D399"
            shimmerDuration="3s"
            background="rgba(10, 13, 11, 0.95)"
            className="hidden sm:inline-flex py-2 px-5 text-[11px] font-mono-ui uppercase tracking-[0.14em] font-bold text-[#F4F4F0] hover:text-[#34D399] transition-colors border border-[#34D399]/30 hover:border-[#34D399]/70 shadow-[0_0_15px_rgba(52,211,153,0.15)] group"
          >
            <div className="flex items-center gap-2">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#34D399] group-hover:-translate-x-1 transition-transform duration-200"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span>RETURN TO GROUP</span>
            </div>
          </StarButton>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#94A3B8] hover:text-[#38BDF8] hover:bg-white/10 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Toggle navigation menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 md:hidden mt-2 p-4 rounded-2xl bg-[#04070D]/95 border border-[#38BDF8]/30 backdrop-blur-2xl shadow-2xl flex flex-col gap-2 mx-4 max-h-[calc(100vh-6rem)] overflow-y-auto"
          >
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-xl text-xs font-mono-ui uppercase tracking-[0.14em] font-bold text-[#F4F4F0] bg-[#0A0D0B] border border-[#34D399]/40 hover:bg-[#141A16] transition-colors flex items-center justify-center gap-2 min-h-[44px]"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#34D399]">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span>RETURN TO GROUP</span>
            </Link>
            {NAV_ITEMS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => {
                  setMobileMenuOpen(false);
                }}
                className="px-4 py-3 rounded-xl text-sm text-[#94A3B8] hover:text-white hover:bg-[#38BDF8]/10 transition-colors font-medium min-h-[44px] flex items-center"
              >
                {item.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
