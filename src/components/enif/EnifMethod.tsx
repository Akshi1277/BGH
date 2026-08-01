"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const STEPS = [
  { name: "Discover", detail: "Business alignment & constraint mapping" },
  { name: "Research", detail: "Technical feasibility & market analysis" },
  { name: "Architecture", detail: "System design & data modeling" },
  { name: "Design", detail: "Interface & user experience mapping" },
  { name: "Engineering", detail: "Core development & integration" },
  { name: "Validation", detail: "Security, load & QA testing" },
  { name: "Deployment", detail: "Phased rollout & monitoring" },
  { name: "Improvement", detail: "Optimization & scaling" }
];

export default function EnifMethod() {
  const reduce = useReducedMotion();

  return (
    <section id="method" className="py-24 md:py-32 bg-[#02040A] border-b border-[#38BDF8]/10 relative overflow-hidden">
      {/* Dark Theme Ambient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#050D1A_0%,#02040A_60%,#010206_100%)] pointer-events-none z-0" />
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[300px] bg-[#38BDF8]/[0.04] blur-[100px] rounded-full pointer-events-none z-0" />
      
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#38BDF8]/30 bg-[#38BDF8]/10 mb-5 backdrop-blur-md"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
              <span className="font-mono text-[#38BDF8] text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold">
                Delivery Framework
              </span>
            </motion.div>

            <motion.h2
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease, delay: 0.1 }}
              className="font-display text-4xl md:text-5xl text-white leading-[1.18] tracking-[-0.01em] mb-6"
            >
              The Engineering Method
            </motion.h2>
            
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease, delay: 0.2 }}
              className="text-[#94A3B8] font-sans text-sm md:text-base leading-relaxed tracking-[0.01em] max-w-lg font-light"
            >
              We don't just write code. We engineer systems. Our methodology ensures architecture precedes development, and operational excellence continues long after deployment.
            </motion.p>
          </div>
        </div>

        <div className="relative">
          <div className="relative">
            {/* Connecting line base */}
            <div className="absolute top-[28px] md:top-1/2 md:-translate-y-1/2 left-[5%] right-[5%] h-[2px] bg-[#38BDF8]/10 hidden md:block" />
            {/* Animated glowing progress line */}
            <motion.div 
              className="absolute top-[28px] md:top-1/2 md:-translate-y-1/2 h-[2px] bg-gradient-to-r from-transparent via-[#38BDF8] to-transparent hidden md:block"
              animate={reduce ? false : { left: ["-10%", "100%"] }}
              transition={{ duration: 4, ease: "linear", repeat: Infinity }}
              style={{ width: "25%" }}
            />
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 sm:gap-8 md:gap-4">
            {STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease, delay: i * 0.08 }}
                className="relative flex flex-col items-center text-center group p-3 rounded-xl border border-white/5 bg-white/[0.02] sm:border-0 sm:bg-transparent"
              >
                <div className="w-4 h-4 rounded-full bg-[#04070D] border-2 border-[#38BDF8]/50 z-10 mb-3 group-hover:bg-[#38BDF8] group-hover:border-[#38BDF8] transition-colors duration-300 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.5)] relative">
                   <motion.div 
                      className="absolute inset-0 rounded-full bg-[#38BDF8]"
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileHover={{ opacity: 1, scale: 1.5 }}
                      transition={{ duration: 0.2 }}
                   />
                </div>
                <span className="text-[#38BDF8] font-mono-ui text-[11px] mb-1 opacity-70 font-semibold">0{i + 1}</span>
                <span className="text-white font-display text-sm sm:text-sm md:text-base leading-snug mb-2">{step.name}</span>
                <span className="text-[#64748B] font-mono text-[9px] uppercase tracking-wide leading-tight hidden md:block">
                  {step.detail}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
