"use client";

import React from "react";
import { motion } from "framer-motion";
import { MeshGradient } from "@paper-design/shaders-react";
import Icon from "../Icon";
import { StarButton } from "../ui/StarButton";

const ease = [0.16, 1, 0.3, 1] as const;

export default function EnifHero() {
  return (
    <section className="relative overflow-hidden bg-[#04070D] text-[#F8FAFC] pt-28 pb-20 md:pt-36 md:pb-28 border-b border-[#38BDF8]/10 min-h-[90vh] flex items-center">
      {/* Dark Mesh Shader Background */}
      <div className="absolute inset-0 z-0 opacity-70">
        <MeshGradient
          className="absolute inset-0 w-full h-full"
          colors={["#02040A", "#05101F", "#081A33", "#0C2547", "#05101F"]}
          speed={0.15}
        />
        <MeshGradient
          className="absolute inset-0 w-full h-full opacity-30 mix-blend-screen pointer-events-none"
          colors={["#04070D", "#0A1F3D", "#38BDF8", "#0EA5E9"]}
          speed={0.1}
        />
      </div>

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
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#38BDF8]/25 bg-[#38BDF8]/[0.08] backdrop-blur-md mb-8 shadow-[0_0_15px_rgba(56,189,248,0.05)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse shadow-[0_0_6px_#38BDF8]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#38BDF8] font-medium">
              ENIF Technologies — A BRAHM Global Holdings Company
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-display text-[2.8rem] sm:text-5xl xl:text-[3.6rem] leading-[1.06] tracking-tight text-[#F8FAFC] mb-5 drop-shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
          >
            Engineering the{" "}
            <motion.span
              className="italic font-normal bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(56,189,248,0.3)]"
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
            className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#38BDF8]/50 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.22 }}
          >
            — Beyond the Stars
          </motion.p>

          {/* Description */}
          <motion.p
            className="text-[1.05rem] md:text-lg text-[#94A3B8] max-w-[480px] mb-5 font-light leading-relaxed drop-shadow-sm"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.3 }}
          >
            We design, engineer, and operate mission-critical digital products — from enterprise software platforms to autonomous AI pipelines. End-to-end responsibility, from first principle to production.
          </motion.p>

          {/* Ethos pull-quote */}
          <motion.blockquote
            className="text-sm text-[#64748B] italic mb-10 border-l-2 border-[#38BDF8]/20 pl-4"
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