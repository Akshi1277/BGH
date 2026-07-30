"use client";

import React from "react";
import { motion } from "framer-motion";
import { MeshGradient } from "@paper-design/shaders-react";
import Icon from "../Icon";
import { StarButton } from "../ui/StarButton";

const ease = [0.16, 1, 0.3, 1] as const;

export default function EnifHero() {
  return (
    <section className="relative overflow-hidden bg-[#04070D] text-[#F8FAFC] pt-32 pb-20 md:pt-40 md:pb-28 min-h-[90vh] flex items-center border-b border-[#38BDF8]/20">
      {/* Dark Mesh Shader Background - Color Tuned to ENIF Logo Palette */}
      <div className="absolute inset-0 z-0 opacity-80">
        <MeshGradient
          className="absolute inset-0 w-full h-full"
          colors={["#020612", "#051329", "#0A284D", "#0E3E75", "#030B1C"]}
          speed={0.3}
        />
        <MeshGradient
          className="absolute inset-0 w-full h-full opacity-40 mix-blend-screen pointer-events-none"
          colors={["#030A1D", "#0284C7", "#38BDF8", "#00D2FF", "#0B2B52"]}
          speed={0.25}
        />
      </div>

      {/* Smooth Bottom Blend Transition Layer */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-b from-transparent via-[#051329]/80 to-[#04070D] pointer-events-none z-[1]" />

      {/* Structural grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.04] z-0 mix-blend-overlay"
        style={{
          backgroundImage:
            "linear-gradient(to right, #38BDF8 1px, transparent 1px), linear-gradient(to bottom, #38BDF8 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

        {/* ── Centered Hero Content ── */}
        <div className="lg:col-span-12 flex flex-col items-center justify-center text-center">

          {/* Eyebrow pill */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-[#38BDF8]/20 bg-[#38BDF8]/[0.05] backdrop-blur-md mb-10 shadow-[0_0_15px_rgba(56,189,248,0.03)]"
          >
            <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-[#38BDF8]/90 font-medium">
              ENIF Technologies — A BRAHM Global Holdings Company
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[1.12] tracking-[-0.01em] text-[#F8FAFC] mb-6 drop-shadow-2xl max-w-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
          >
            Engineering the{" "}
            <motion.span
              className="inline-block pr-3 -mr-3 italic font-normal bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(56,189,248,0.3)]"
              style={{
                backgroundImage:
                  "linear-gradient(110deg, #38BDF8 0%, #7DD3FC 40%, #FFFFFF 54%, #7DD3FC 68%, #38BDF8 100%)",
                backgroundSize: "260% 100%",
              }}
              animate={{ backgroundPosition: ["-100% 0%", "200% 0%"] }}
              transition={{
                duration: 4.5,
                delay: 1.2,
                repeat: Infinity,
                repeatDelay: 4,
                ease: "easeInOut",
              }}
            >
              Future
            </motion.span>{" "}
            of Digital Enterprise.
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-[#38BDF8]/60 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.22 }}
          >
            — Beyond the Stars
          </motion.p>

          {/* Description */}
          <motion.p
            className="text-base md:text-lg text-[#94A3B8] max-w-xl mb-8 font-light tracking-wide leading-[1.8] drop-shadow-sm"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.3 }}
          >
            We design, engineer, and operate mission-critical digital products — from enterprise software platforms to autonomous AI pipelines. End-to-end responsibility, from first principle to production.
          </motion.p>

          {/* Ethos pull-quote */}
          <motion.blockquote
            className="text-base md:text-lg font-display text-[#64748B] italic mb-12 border-l-2 border-[#38BDF8]/30 pl-5 tracking-wide leading-relaxed max-w-lg mx-auto md:mx-0 text-left"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.4 }}
          >
            "Technology can be outsourced. Responsibility cannot."
          </motion.blockquote>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.46 }}
            className="flex flex-wrap items-center gap-4 mb-12"
          >
            <StarButton href="#contact" icon={<Icon name="arrow-right" size={16} />}>
              Start a Conversation
            </StarButton>
            <a
              href="#capabilities"
              className="px-6 py-3 rounded-3xl border border-white/15 bg-white/[0.04] hover:bg-white/[0.07] hover:border-[#38BDF8]/35 text-[#F8FAFC] text-sm font-medium transition-all duration-200 active:scale-[0.97] backdrop-blur-sm flex items-center gap-2 group shadow-xl"
            >
              <span>Explore Capabilities</span>
              <Icon
                name="arrow-right"
                size={14}
                className="text-[#38BDF8] group-hover:translate-x-1 transition-transform duration-200"
              />
            </a>
          </motion.div>


        </div>
      </div>
    </section>
  );
}