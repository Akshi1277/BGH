"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LimelightNav, NavItem } from "@/components/ui/limelight-nav";
import { Cpu, ShieldCheck, Layers, Lightbulb, Mail } from "lucide-react";
import Icon from "../Icon";
import { StarButton } from "./StarButton";

const NAV_ITEMS = [
  { name: "Who We Are", href: "#who-we-are" },
  { name: "Capabilities", href: "#capabilities" },
  { name: "Standard", href: "#standard" },
  { name: "Philosophy", href: "#how-we-work" },
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
          className="drop-shadow-[0_0_12px_rgba(255,45,85,0.6)]"
        >
          {/* Top Angled Clapperboard Stick */}
          <path d="M10 28 L145 5 L155 24 L20 47 Z" fill="#E0115F" />
          <path d="M42 22 L56 20 L48 39 L34 41 Z" fill="#04070D" />
          <path d="M74 17 L88 15 L80 34 L66 36 Z" fill="#04070D" />
          <path d="M106 12 L120 10 L112 29 L98 31 Z" fill="#04070D" />
          {/* Bottom 7A Block */}
          <path d="M10 48 H150 V64 H72 L32 118 H10 L48 64 H10 V48 Z" fill="#E0115F" />
          <path d="M72 64 L112 118 H148 L108 64 Z" fill="#E0115F" />
          <path d="M80 84 H124 V94 H88 Z" fill="#E0115F" />
        </svg>
      </div>

      {/* 7AURIGA Wordmark */}
      <div className="flex flex-col leading-none">
        <span className="font-display font-medium text-xl tracking-[-0.035em] text-white">
          7AURIGA
        </span>
        <span className="font-mono text-[9px] tracking-[0.25em] text-[#E0115F] font-semibold uppercase mt-0.5">
          Brand · Media · Comms
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

  const limelightNavItems: NavItem[] = [
    {
      id: "who-we-are",
      icon: <ShieldCheck />,
      label: "Who We Are",
      onClick: () => scrollToSection("who-we-are", 0),
    },
    {
      id: "capabilities",
      icon: <Cpu />,
      label: "Capabilities",
      onClick: () => scrollToSection("capabilities", 1),
    },
    {
      id: "standard",
      icon: <Layers />,
      label: "Standard",
      onClick: () => scrollToSection("standard", 2),
    },
    {
      id: "how-we-work",
      icon: <Lightbulb />,
      label: "Philosophy",
      onClick: () => scrollToSection("how-we-work", 3),
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
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ["who-we-are", "capabilities", "standard", "how-we-work", "contact"];
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
          "fixed top-0 inset-x-0 z-50 transition-all duration-300 pt-[env(safe-area-inset-top,0px)]",
          isScrolled
            ? "bg-[#04070D]/90 backdrop-blur-md border-b border-[#E0115F]/20 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            : "bg-transparent border-b border-transparent",
          className
        )}
      >
        <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop flex items-center justify-between h-20">
          
          <Link href="/7auriga" className="flex items-center group select-none">
            <AurigaClapboardLogo />
          </Link>

          {/* Center Floating Limelight Bar with Logo Red Spotlight */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2">
            <LimelightNav
              items={limelightNavItems}
              activeIndex={activeSectionIndex}
              limelightClassName="!bg-[#E0115F] !text-[#E0115F] !shadow-[0_0_20px_#E0115F,0_0_40px_#E0115F]"
              activeIconClassName="text-[#E0115F]"
            />
          </div>

          {/* Desktop Right Links */}
          <div className="hidden md:flex items-center gap-6">
            <StarButton
              href="/"
              shimmerColor="#E0115F"
              shimmerDuration="3s"
              background="rgba(10, 13, 11, 0.95)"
              className="hidden sm:inline-flex py-2 px-5 text-[11px] font-sans font-bold tracking-[0.14em] uppercase text-[#F4F4F0] hover:text-[#E0115F] transition-colors border border-[#E0115F]/30 hover:border-[#E0115F]/70 shadow-[0_0_15px_rgba(224,17,95,0.15)] group"
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
                  className="text-[#E0115F] group-hover:-translate-x-1 transition-transform duration-200"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                <span>RETURN TO GROUP</span>
              </div>
            </StarButton>
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
            className="fixed inset-0 z-[60] bg-[#04070D] text-[#F8FAFC] flex flex-col justify-between p-6 md:hidden"
          >
            <div className="flex justify-between items-center h-16 border-b border-white/10">
              <AurigaClapboardLogo />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-white"
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
                  className="font-display text-2xl tracking-wider text-white hover:text-[#E0115F] border-b border-white/10 pb-3 flex items-center justify-between"
                >
                  <span>{item.name}</span>
                  <span className="font-mono text-xs text-[#E0115F]">0{i + 1}</span>
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <StarButton
                href="/"
                shimmerColor="#E0115F"
                shimmerDuration="3s"
                background="rgba(10, 13, 11, 0.95)"
                className="w-full flex py-3.5 px-5 text-[12px] font-sans font-bold uppercase tracking-[0.14em] text-[#F4F4F0] border border-[#E0115F]/30 shadow-[0_0_15px_rgba(224,17,95,0.15)] justify-center"
              >
                <div className="flex items-center gap-2">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#E0115F]"
                  >
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  <span>RETURN TO GROUP</span>
                </div>
              </StarButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
