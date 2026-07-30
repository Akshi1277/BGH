"use client";

import React from "react";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const TECHNOLOGIES = [
  "Cloud Infrastructure",
  "Artificial Intelligence",
  "Machine Learning",
  "React",
  "Next.js",
  "Flutter",
  "Node.js",
  "Python",
  "Azure",
  "AWS",
  "PostgreSQL",
  "Docker",
  "Kubernetes",
];

export default function EnifTech() {
  return (
    <section id="tech" className="py-24 md:py-32 bg-[#04070D] border-b border-[#38BDF8]/10 overflow-hidden relative">
      {/* Deep Space Radial Background - Theme A */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#081A33_0%,#05101F_40%,#04070D_80%)] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#38BDF8]/[0.07] blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        <div className="mb-12 md:mb-16 max-w-2xl text-center mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease }}
            className="text-[#38BDF8] font-mono-ui text-xs md:text-sm uppercase tracking-[0.25em] mb-4 block font-semibold"
          >
            TECHNOLOGY STACK
          </motion.h3>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="font-display text-3xl md:text-5xl text-white leading-[1.18] tracking-[-0.01em]"
          >
            Built using proven technologies trusted by global leaders.
          </motion.h2>
        </div>

        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {TECHNOLOGIES.map((tech, i) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease, delay: i * 0.05 }}
              className="px-6 py-3 rounded-full border border-white/10 bg-white/[0.03] text-[#F8FAFC]/90 text-sm md:text-base font-medium shadow-sm hover:border-[#38BDF8]/50 hover:bg-[#38BDF8]/10 hover:text-[#38BDF8] hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all cursor-pointer"
            >
              {tech}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
