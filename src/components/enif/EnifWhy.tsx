"use client";

import React from "react";
import { motion } from "framer-motion";
import { ContainerScroll, CardSticky } from "../ui/cards-stack";
import RotatingEarth from "../ui/wireframe-dotted-globe";

const ease = [0.16, 1, 0.3, 1] as const;

interface ScrollCardItem {
  id: string;
  tag: string;
  title: string;
  description: string;
  icon: string;
  visual: React.ReactNode;
}

const WHY_CARDS: ScrollCardItem[] = [
  {
    id: "01",
    tag: "ARCHITECTURE",
    title: "First-Principles Engineering",
    description: "We design systems from first principles — no bloated frameworks, no speculative abstractions, no dependency we can't justify.",
    icon: "cpu",
    visual: (
      <div className="w-full max-w-full overflow-hidden p-3 sm:p-4 rounded-2xl bg-[#020408]/90 border border-white/10 font-mono text-xs text-[#38BDF8] shadow-inner">
        <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-white/40 mb-2 sm:mb-3 pb-2 border-b border-white/5">
          <span>WHAT WE DELIBERATELY CUT</span>
          <span className="text-emerald-400 font-semibold">● OPINIONATED</span>
        </div>
        <div className="flex flex-col gap-1.5 sm:gap-2 text-[10px] sm:text-[11px]">
          {[
            "Framework lock-in",
            "Speculative abstractions",
            "Unowned third-party dependencies",
          ].map((cut) => (
            <div key={cut} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/[0.02] border border-white/5">
              <span className="text-red-400/70 font-bold shrink-0">✕</span>
              <span className="text-[#CBD5E1]">{cut}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "02",
    tag: "LONGEVITY",
    title: "Built to Evolve, Not Rebuild",
    description: "Modular architecture designed to grow with your business for a decade or more, without forcing a costly full rebuild.",
    icon: "layers",
    visual: (
      <div className="w-full max-w-full overflow-hidden p-3 sm:p-4 rounded-2xl bg-[#020408]/90 border border-white/10 shadow-inner">
        <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-white/40 mb-2 sm:mb-3 pb-2 border-b border-white/5">
          <span>PLATFORM LIFECYCLE</span>
          <span className="text-[#38BDF8]">ACTIVE</span>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:gap-3 font-mono text-xs">
          <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="text-[9px] sm:text-[10px] text-[#94A3B8] mb-0.5 sm:mb-1">AVAILABILITY TARGET</div>
            <div className="text-base sm:text-lg font-bold text-white">99.999%</div>
          </div>
          <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="text-[9px] sm:text-[10px] text-[#94A3B8] mb-0.5 sm:mb-1">DESIGN LIFECYCLE</div>
            <div className="text-base sm:text-lg font-bold text-emerald-400">10+ Years</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "03",
    tag: "RELIABILITY",
    title: "Global Operations & Edge Coverage",
    description: "Multi-region deployments across four continents, backed by round-the-clock telemetry and a sub-10ms edge-response target.",
    icon: "globe",
    visual: (
      <div className="w-full max-w-full overflow-hidden rounded-2xl bg-[#020408]/90 border border-white/10 shadow-inner">
        <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-white/40 px-3 sm:px-4 pt-3 sm:pt-4">
          <span>GLOBAL EDGE COVERAGE</span>
          <span className="text-emerald-400">&lt; 10ms TARGET</span>
        </div>
        <RotatingEarth
          width={360}
          height={240}
          enableZoom={false}
          className="w-full h-48 sm:h-56"
        />
      </div>
    ),
  },
  {
    id: "04",
    tag: "GOVERNANCE",
    title: "Enterprise-Grade Security & Standards",
    description: "Engineered to align with SOC2 Type II, ISO 27001, and zero-trust data-sovereignty standards from day one.",
    icon: "shield",
    visual: (
      <div className="w-full max-w-full overflow-hidden p-3 sm:p-4 rounded-2xl bg-[#020408]/90 border border-white/10 shadow-inner">
        <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-white/40 mb-2 sm:mb-3 pb-2 border-b border-white/5">
          <span>SECURITY STANDARDS</span>
          <span className="text-[#38BDF8]">BUILT-IN</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5 sm:gap-2 text-xs">
          {[
            { label: "SOC2 Type II", val: "Aligned" },
            { label: "ISO 27001", val: "Aligned" },
            { label: "Zero-Trust", val: "Enforced" },
            { label: "Audit Logs", val: "Immutable" },
          ].map((s) => (
            <div key={s.label} className="p-1.5 sm:p-2 rounded-lg bg-[#38BDF8]/[0.04] border border-[#38BDF8]/20 flex flex-col">
              <span className="text-[#94A3B8] text-[9px] font-mono">{s.label}</span>
              <span className="text-white font-medium text-[11px] sm:text-xs mt-0.5">{s.val}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

export default function EnifWhy() {
  return (
    <section id="why-enif" className="bg-[#04070D] border-b border-[#38BDF8]/10 relative">
      {/* Deep Space Radial Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#081A33_0%,#05101F_40%,#04070D_80%)]" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[300px] bg-[#38BDF8]/[0.07] blur-[100px] rounded-full" />
      </div>

      <div className="max-w-[var(--spacing-container-max)] mx-auto px-4 sm:px-margin-mobile md:px-margin-desktop relative z-10 pt-14 md:pt-32">
        
        <div className="grid md:grid-cols-12 md:gap-12 items-start">
          
          {/* Section Header (Sticky on Desktop) */}
          <div className="md:col-span-5 md:sticky md:top-32 md:h-fit mb-8 md:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#38BDF8]/30 bg-[#38BDF8]/10 mb-4 sm:mb-6 backdrop-blur-md"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#38BDF8] font-semibold">
                The ENIF Advantage
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease, delay: 0.1 }}
              className="font-display text-3xl sm:text-4xl md:text-6xl text-white leading-[1.15] tracking-[-0.01em] mb-4 sm:mb-6"
            >
              Why Organisations Choose ENIF.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease, delay: 0.2 }}
              className="text-[#94A3B8] text-sm md:text-lg leading-relaxed tracking-[0.01em] font-light max-w-lg"
            >
              We design software systems from core physics upward. Zero bloated frameworks, zero unnecessary abstractions, and zero technical debt.
            </motion.p>
          </div>

          {/* Scroll-Driven Card Stack */}
          <div className="md:col-span-7 w-full">
            <ContainerScroll className="min-h-[220vh] md:min-h-[300vh] flex flex-col gap-4 sm:gap-6 md:gap-8 pb-16 md:pb-32">
              {WHY_CARDS.map((card, index) => (
                <CardSticky
                  key={card.id}
                  index={index}
                  incrementY={28}
                  className="rounded-2xl sm:rounded-3xl border border-[#38BDF8]/30 bg-[#080E1B] p-5 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] w-full antialiased"
                >
                  <div className="flex flex-col gap-4 sm:gap-8 items-start w-full max-w-full">
                    <div className="flex items-center justify-between gap-4 w-full mb-1 sm:mb-2">
                      <div className="px-2.5 py-1 bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/30 rounded-full font-mono text-[9px] sm:text-[10px] tracking-widest uppercase font-bold">
                        {card.tag}
                      </div>
                      <h3 className="text-xl sm:text-3xl font-bold text-[#38BDF8] opacity-60 font-mono">
                        {String(index + 1).padStart(2, "0")}
                      </h3>
                    </div>
                    
                    <div className="w-full max-w-full">
                      <h3 className="text-lg sm:text-2xl md:text-3xl font-bold tracking-tight text-white mb-2 sm:mb-4 subpixel-antialiased">
                        {card.title}
                      </h3>

                      <p className="text-[#CBD5E1] text-xs sm:text-sm md:text-base leading-relaxed mb-4 sm:mb-8 font-normal subpixel-antialiased">
                        {card.description}
                      </p>

                      <div className="w-full max-w-full overflow-hidden">
                        {card.visual}
                      </div>
                    </div>
                  </div>
                </CardSticky>
              ))}
            </ContainerScroll>
          </div>

        </div>

      </div>
    </section>
  );
}
