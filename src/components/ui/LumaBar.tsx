"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { StarButton } from "./StarButton";

import { LimelightNav, NavItem } from "@/components/ui/limelight-nav";
import { Cpu, ShieldCheck, Layers, Lightbulb, Mail } from "lucide-react";

const NAV_ITEMS = [
  { name: "Capabilities", href: "#capabilities" },
  { name: "Why ENIF", href: "#why-enif" },
  { name: "Method", href: "#method" },
  { name: "Philosophy", href: "#philosophy" },
  { name: "Contact", href: "#contact" },
];

export const LumaBar = ({ className }: { className?: string }) => {
  const pathname = usePathname();
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

  const limelightNavItems: NavItem[] = [
    {
      id: "capabilities",
      icon: <Cpu />,
      label: "Capabilities",
      onClick: () => scrollToSection("capabilities", 0),
    },
    {
      id: "why-enif",
      icon: <ShieldCheck />,
      label: "Why ENIF",
      onClick: () => scrollToSection("why-enif", 1),
    },
    {
      id: "method",
      icon: <Layers />,
      label: "Method",
      onClick: () => scrollToSection("method", 2),
    },
    {
      id: "philosophy",
      icon: <Lightbulb />,
      label: "Philosophy",
      onClick: () => scrollToSection("philosophy", 3),
    },
    {
      id: "contact",
      icon: <Mail />,
      label: "Contact",
      onClick: () => scrollToSection("contact", 4),
    },
  ];

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

  // Dynamic Scroll-Spy using IntersectionObserver for high performance (avoids layout thrashing)
  useEffect(() => {
    const sectionIds = ["capabilities", "why-enif", "method", "philosophy", "contact"];
    
    // We'll track the currently visible sections
    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrollingRef.current) return;

        // Find the first intersecting entry
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionIds.indexOf(entry.target.id);
            if (index !== -1) {
              setActiveSectionIndex(index);
            }
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px", // Triggers when section is roughly in the top middle of viewport
        threshold: 0
      }
    );

    // Observe all sections
    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    // Handle unhighlighting when above the first section (in Hero)
    const handleTopScroll = () => {
      if (isClickScrollingRef.current) return;
      if (window.scrollY < window.innerHeight * 0.5) {
        setActiveSectionIndex(-1);
      }
    };
    
    // We still need a lightweight scroll listener just for the hero section un-highlighting, 
    // but we can throttle it or just let it be since window.scrollY doesn't cause reflows.
    window.addEventListener("scroll", handleTopScroll, { passive: true });
    handleTopScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleTopScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
    document.body.style.overflow = "";
  }, [pathname]);

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
          <div className="relative w-32 h-12 md:w-40 md:h-16 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/eniflogo.png"
              alt="ENIF Logo"
              fill
              sizes="(max-width: 768px) 128px, 160px"
              quality={100}
              className="object-contain drop-shadow-[0_0_15px_rgba(56,189,248,0.3)]"
              priority
            />
          </div>
        </Link>

        {/* Limelight Navigation Bar (Centered with Dynamic Scroll-Spy) */}
        <div className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2 z-20">
          <LimelightNav
            items={limelightNavItems}
            activeIndex={activeSectionIndex}
            onTabChange={(index) => setActiveSectionIndex(index)}
            className="bg-[#080C14]/90 border-[#38BDF8]/25 text-[#F8FAFC] backdrop-blur-md shadow-[0_8px_32px_rgba(4,7,13,0.8),0_0_15px_rgba(56,189,248,0.15)]"
            limelightClassName="bg-[#38BDF8] text-[#38BDF8] shadow-[0_0_15px_#38BDF8,0_0_30px_#38BDF8]"
            iconClassName="text-[#38BDF8]"
          />
        </div>

        {/* Right: BGH-Themed "Back to BGH" Button (Matching BGH Navbar Theme) */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="hidden sm:flex px-6 py-2.5 text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-[#F8FAFC] bg-[#04070D] border border-[#38BDF8]/20 rounded-full relative overflow-hidden group items-center justify-center min-h-[44px]"
          >
            <div className="absolute inset-0 bg-[#38BDF8]/15 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
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
                className="text-[#38BDF8] group-hover:-translate-x-1 transition-transform duration-500 ease-out"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span>Return to Group</span>
            </div>
          </Link>

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
                <div className="relative w-32 h-12">
                  <Image
                    src="/eniflogo.png"
                    alt="ENIF Logo"
                    fill
                    sizes="128px"
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
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex py-4 px-5 text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-[#F8FAFC] bg-[#04070D] border border-[#38BDF8]/20 rounded-full justify-center items-center gap-3 active:bg-[#38BDF8]/15"
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
                  className="text-[#38BDF8]"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                <span>Return to Group</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
