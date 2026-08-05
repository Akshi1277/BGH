"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Icon from "../Icon";

const NAV_ITEMS = [
  { name: "Who We Are", href: "#who-we-are" },
  { name: "Practices", href: "#capabilities" },
  { name: "Standard", href: "#standard" },
  { name: "Organisations", href: "#work-with-us" },
  { name: "Contact", href: "#contact" },
];

export function AurigaClapboardLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Vibrant Red Clapboard 7A Emblem */}
      <div className="relative flex items-center justify-center">
        <svg
          width="42"
          height="32"
          viewBox="0 0 160 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_12px_rgba(155,28,46,0.6)]"
        >
          {/* Top Angled Clapperboard Stick */}
          <path d="M10 28 L145 5 L155 24 L20 47 Z" fill="#9B1C2E" />
          <path d="M42 22 L56 20 L48 39 L34 41 Z" fill="#0D0B0B" />
          <path d="M74 17 L88 15 L80 34 L66 36 Z" fill="#0D0B0B" />
          <path d="M106 12 L120 10 L112 29 L98 31 Z" fill="#0D0B0B" />
          {/* Bottom 7A Block */}
          <path d="M10 48 H150 V64 H72 L32 118 H10 L48 64 H10 V48 Z" fill="#9B1C2E" />
          <path d="M72 64 L112 118 H148 L108 64 Z" fill="#9B1C2E" />
          <path d="M80 84 H124 V94 H88 Z" fill="#9B1C2E" />
        </svg>
      </div>

      {/* 7AURIGA Wordmark */}
      <div className="flex flex-col leading-none">
        <span className="font-display font-medium text-xl tracking-[-0.035em] text-[#FAF7F5]">
          7AURIGA
        </span>
        <span className="font-mono text-[8px] tracking-[0.25em] text-[#C8374F] font-semibold uppercase mt-0.5">
          Brand · Media · Communications
        </span>
      </div>
    </div>
  );
}

export const AurigaBar = ({ className }: { className?: string }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSectionIndex, setActiveSectionIndex] = useState(-1);

  const isClickScrollingRef = React.useRef(false);
  const clickTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const scrollToSection = (targetId: string, index: number) => {
    isClickScrollingRef.current = true;
    setActiveSectionIndex(index);

    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }

    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 850);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ["who-we-are", "capabilities", "standard", "work-with-us", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrollingRef.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionIds.indexOf(entry.target.id);
            if (index !== -1) {
              setActiveSectionIndex(index);
            }
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500 pt-[env(safe-area-inset-top,0px)]",
          isScrolled
            ? "bg-[#0D0B0B]/80 backdrop-blur-xl border-b border-[#2E2424]/50 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
            : "bg-transparent border-b border-transparent",
          className
        )}
      >
        <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop flex items-center justify-between h-20">
          
          <Link href="/7auriga" className="flex items-center group select-none">
            <AurigaClapboardLogo />
          </Link>

          {/* Desktop Center Links: Architectural Horizon */}
          <nav className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {NAV_ITEMS.map((item, i) => {
              const isActive = activeSectionIndex === i;
              return (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href.replace('#', ''), i)}
                  className="relative group py-2 flex items-center gap-2"
                >
                  <span
                    className={cn(
                      "font-sans text-[11px] tracking-[0.2em] uppercase transition-colors duration-300",
                      isActive ? "text-[#FAF7F5] font-bold" : "text-[#9C8F8F] font-semibold group-hover:text-[#FAF7F5]"
                    )}
                  >
                    {item.name}
                  </span>
                  
                  {/* The pulsing constellation star indicator */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="w-1.5 h-1.5 rounded-full bg-[#C8374F] shadow-[0_0_8px_#C8374F] animate-star-pulse"
                      />
                    )}
                  </AnimatePresence>

                  {/* The precision line (hover) */}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-[1px] bg-[#2E2424] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] w-0 group-hover:w-full" />
                  
                  {/* The precision line (active) */}
                  {isActive && (
                    <motion.div
                      layoutId="auriga-active-nav"
                      className="absolute -bottom-1 left-0 right-0 h-[1px] bg-[#9B1C2E] shadow-[0_0_8px_rgba(155,28,46,0.6)]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Right Links: Brutalist Outline Button */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="hidden sm:inline-flex items-center justify-center py-2.5 px-6 text-[10px] font-sans font-bold tracking-[0.2em] uppercase text-[#FAF7F5] border border-[#2E2424] hover:border-[#9B1C2E] hover:bg-[#9B1C2E]/5 transition-all duration-500 group relative overflow-hidden"
            >
              <div className="flex items-center gap-3 relative z-10">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#C8374F] group-hover:-translate-x-1 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                <span>Return to Group</span>
              </div>
              {/* Subtle hover fill line */}
              <div className="absolute bottom-0 left-0 h-[2px] bg-[#9B1C2E] w-0 group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" />
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden text-white p-2"
            aria-label="Open menu"
          >
            <Icon name="menu" size={24} />
          </button>

        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#0D0B0B] text-[#FAF7F5] flex flex-col justify-between p-6 md:hidden"
          >
            <div className="flex justify-between items-center h-16 border-b border-[#2E2424]">
              <AurigaClapboardLogo />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-[#9C8F8F] hover:text-[#FAF7F5] transition-colors"
                aria-label="Close menu"
              >
                <Icon name="close" size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-6 my-auto">
              {NAV_ITEMS.map((item, i) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-sans font-bold text-2xl uppercase tracking-[0.1em] text-[#FAF7F5]/80 hover:text-[#C8374F] border-b border-[#2E2424] pb-4 flex items-center justify-between transition-colors"
                >
                  <span>{item.name}</span>
                  <span className="font-mono text-xs text-[#9B1C2E]">0{i + 1}</span>
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <Link
                href="/"
                className="w-full flex py-4 px-5 text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-[#FAF7F5] border border-[#2E2424] justify-center items-center gap-3 active:bg-[#9B1C2E]/10"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#C8374F]"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                <span>Return to Group</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
