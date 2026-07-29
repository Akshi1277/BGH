"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

const ease = [0.25, 1, 0.5, 1] as const;

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.03 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
};

interface PillListProps {
  eyebrow: string;
  heading: React.ReactNode;
  items: string[];
  tone?: "surface" | "soft";
}

export default function PillList({ eyebrow, heading, items }: PillListProps) {
  return (
    <section className="section-y bg-[#04070D] text-[#F8FAFC] relative overflow-hidden border-b border-cyan-500/20">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        <div className="max-w-2xl mb-12">
          <motion.span
            className="text-eyebrow font-mono-ui text-[#38BDF8] block mb-4 uppercase tracking-[0.2em]"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
          >
            {eyebrow}
          </motion.span>
          <motion.h2
            className="font-display text-display text-[#F8FAFC]"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease, delay: 0.08 }}
          >
            {heading}
          </motion.h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-wrap gap-3"
        >
          {items.map((it) => (
            <motion.span
              key={it}
              variants={item}
              className="font-mono-ui text-xs uppercase tracking-[0.1em] text-[#94A3B8] border border-cyan-500/20 bg-[#0A101F]/80 backdrop-blur-md rounded-full px-5 py-2.5 hover:border-cyan-400 hover:text-[#38BDF8] hover:shadow-[0_0_15px_rgba(56,189,248,0.2)] transition-all duration-300"
            >
              {it}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
