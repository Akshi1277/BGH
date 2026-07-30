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

      {/* Mobile Drawer (Inspired by BRAHM Navbar Drawer) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-[#04070D] text-[#F8FAFC] flex flex-col md:hidden pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)] overflow-y-auto"
          >
            {/* Header bar inside mobile menu */}
            <div className="flex justify-between items-center h-20 px-4 sm:px-8 shrink-0 border-b border-[#38BDF8]/20 bg-[#04070D]/80 backdrop-blur-xl">
              <Link href="/enif" onClick={() => setMobileMenuOpen(false)} className="flex items-center group">
                <div className="relative w-10 h-10">
                  <Image
                    src="/image copy 7.png"
                    alt="ENIF Logo"
                    fill
                    sizes="40px"
                    quality={100}
                    className="object-contain drop-shadow-[0_0_15px_rgba(56,189,248,0.3)]"
                    priority
                  />
                </div>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#F8FAFC] p-2 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-white/10 active:bg-white/15 transition-colors"
                aria-label="Close menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Menu Links with 01, 02 indices */}
            <div className="flex flex-col justify-center gap-4 sm:gap-6 px-6 sm:px-8 flex-1 py-8">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.06 * i }}
                >
                  <a
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="group flex items-baseline gap-4 py-3 border-b border-[#38BDF8]/15 active:text-[#38BDF8]"
                  >
                    <span className="font-mono text-xs tracking-widest text-[#38BDF8] font-bold">
                      0{i + 1}
                    </span>
                    <span className="font-display text-2xl sm:text-3xl text-white group-hover:text-[#38BDF8] transition-colors">
                      {item.name}
                    </span>
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Bottom Action Button - Return to Group */}
            <div className="p-6 sm:p-8 pb-[max(2.5rem,env(safe-area-inset-bottom))] shrink-0">
              <StarButton
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                shimmerColor="#34D399"
                shimmerDuration="3s"
                background="rgba(10, 13, 11, 0.95)"
                className="w-full py-4 h-auto justify-center font-mono-ui uppercase tracking-[0.14em] font-bold text-[#F4F4F0] border border-[#34D399]/40 shadow-[0_0_20px_rgba(52,211,153,0.2)]"
              >
                <div className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#34D399]">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  <span>RETURN TO GROUP</span>
                </div>
              </StarButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
