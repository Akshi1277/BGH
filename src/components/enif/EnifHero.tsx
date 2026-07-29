"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Icon from "../Icon";
import EnifConstellationCanvas from "./EnifConstellationCanvas";

const ease = [0.25, 1, 0.5, 1] as const;

export default function EnifHero() {
  return (
    <section className="relative overflow-hidden bg-[#04070D] text-[#F8FAFC] pt-36 pb-20 md:pt-44 md:pb-28 border-b border-cyan-500/20">
      {/* Starfield & Constellation Canvas */}
      <EnifConstellationCanvas />

      {/* Cyan Ambient Radial Washes */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          top: "-20%",
          left: "-10%",
          width: "60%",
          height: "90%",
          background:
            "radial-gradient(ellipse, rgba(14, 165, 233, 0.15), transparent 70%)",
          filter: "blur(100px)",
        }}
      />
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          bottom: "-20%",
          right: "-10%",
          width: "55%",
          height: "80%",
          background:
            "radial-gradient(ellipse, rgba(56, 189, 248, 0.12), transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column Text */}
        <div className="lg:col-span-7 flex flex-col items-start">
          {/* Eyebrow with glowing dot */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 backdrop-blur-md mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse shadow-[0_0_8px_#38BDF8]" />
            <span className="font-mono-ui text-xs uppercase tracking-[0.2em] text-[#38BDF8] font-semibold">
              Beyond the Stars — ENIF Technologies
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-display text-hero text-[#F8FAFC] mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
          >
            Engineering the{" "}
            <motion.span
              className="italic font-normal relative inline-block pb-2 -mb-2 bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(110deg, #38BDF8 0%, #38BDF8 35%, #FFFFFF 50%, #38BDF8 65%, #38BDF8 100%)",
                backgroundSize: "250% 100%",
              }}
              animate={{ backgroundPosition: ["-100% 0%", "200% 0%"] }}
              transition={{
                duration: 3.5,
                delay: 1,
                repeat: Infinity,
                repeatDelay: 2.5,
                ease: "easeInOut",
              }}
            >
              businesses
            </motion.span>{" "}
            of tomorrow.
          </motion.h1>

          {/* Paragraphs */}
          <motion.p
            className="text-lede text-[#94A3B8] max-w-2xl mb-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.22 }}
          >
            <span className="text-[#38BDF8] font-semibold">ENIF Technologies</span> is
            the technology and innovation division of BRAHM Global Holdings. We design,
            engineer and maintain digital products, intelligent platforms and enterprise
            software for both our own ventures and ambitious organisations worldwide.
          </motion.p>

          <motion.p
            className="text-lede text-[#94A3B8] max-w-2xl mb-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.3 }}
          >
            Whether developing a minimum viable product for a start-up or delivering
            enterprise-scale systems for established organisations, our focus remains
            the same: exceptional engineering, elegant design, long-term scalability.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="#contact"
              className="inline-flex items-center gap-2.5 bg-[#0EA5E9] text-[#020617] px-8 py-4 rounded-full text-label font-mono-ui uppercase tracking-[0.12em] font-bold hover:bg-[#38BDF8] transition-all duration-300 shadow-[0_0_25px_rgba(14,165,233,0.4)] group"
            >
              Schedule a Discovery Consultation
              <Icon
                name="arrow-right"
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </Link>
          </motion.div>
        </div>

        {/* Right Column Holographic Logo Emblem */}
        <div className="lg:col-span-5 flex justify-center items-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease, delay: 0.2 }}
            className="relative w-full max-w-[340px] aspect-square flex items-center justify-center"
          >
            {/* Outer rotating celestial diamond ring */}
            <motion.div
              className="absolute inset-0 rounded-3xl border border-cyan-500/20"
              style={{ transform: "rotate(45deg)" }}
              animate={{ rotate: [45, 405] }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Inner pulsing cyan ring */}
            <div className="absolute inset-4 rounded-full border border-dashed border-cyan-400/30" />

            {/* Logo image container with glassmorphic backdrop */}
            <div className="relative w-64 h-64 rounded-2xl overflow-hidden border border-cyan-500/40 bg-[#070C18]/80 backdrop-blur-xl p-4 shadow-[0_0_50px_rgba(14,165,233,0.25)] group hover:border-cyan-400 transition-colors duration-500">
              <Image
                src="/eniflogo.png"
                alt="ENIF Technologies — Beyond The Stars"
                fill
                sizes="256px"
                className="object-contain p-2"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
