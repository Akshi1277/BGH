"use client";

import React from "react";
import { motion } from "framer-motion";
import Icon from "./Icon";

const ease = [0.25, 1, 0.5, 1] as const;

export default function WhyBRAHM() {
  return (
    <section id="why-brahm" className="section-y bg-surface relative overflow-hidden">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        
        {/* Header */}
        <div className="max-w-[65ch] mb-16">
          <motion.span
            className="text-eyebrow font-mono-ui text-accent block mb-3 uppercase tracking-[0.2em]"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
          >
            THE BRAHM DIFFERENCE
          </motion.span>
          <motion.h2
            className="font-display text-4xl md:text-5xl text-ink leading-tight"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease, delay: 0.08 }}
          >
            Built <span className="italic text-accent">differently</span>.
          </motion.h2>
        </div>

        {/* 3-Column Comparison Matrix — 100% Horizontally Aligned Across All 3 Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          
          {/* 01 Traditional VC */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="bg-surface-soft border border-surface-line rounded-2xl p-8 flex flex-col justify-between"
          >
            <div>
              <span className="font-mono-ui text-[11px] uppercase tracking-widest text-ink-muted block mb-3 font-semibold">
                01 • TRADITIONAL VC
              </span>
              <h3 className="font-display text-2xl text-ink mb-6 h-[3.25rem] flex items-center font-normal">
                Deploy & Pray
              </h3>
              <ul className="space-y-3.5 text-sm text-ink-muted font-light">
                <li className="flex items-start gap-2.5 min-h-[3.25rem]">
                  <span className="text-red-500/70 font-mono font-bold mt-0.5">✕</span>
                  <span>Outsources technology & core operations</span>
                </li>
                <li className="flex items-start gap-2.5 min-h-[3.25rem]">
                  <span className="text-red-500/70 font-mono font-bold mt-0.5">✕</span>
                  <span>Short 3-5 year exit pressure</span>
                </li>
                <li className="flex items-start gap-2.5 min-h-[3.25rem]">
                  <span className="text-red-500/70 font-mono font-bold mt-0.5">✕</span>
                  <span>Passive board governance</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t border-surface-line text-xs font-mono-ui text-ink-muted/70 uppercase">
              Horizon: Short-Term Exit
            </div>
          </motion.div>

          {/* 02 Private Equity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            className="bg-surface-soft border border-surface-line rounded-2xl p-8 flex flex-col justify-between"
          >
            <div>
              <span className="font-mono-ui text-[11px] uppercase tracking-widest text-ink-muted block mb-3 font-semibold">
                02 • PRIVATE EQUITY
              </span>
              <h3 className="font-display text-2xl text-ink mb-6 h-[3.25rem] flex items-center font-normal">
                Financial Engineering
              </h3>
              <ul className="space-y-3.5 text-sm text-ink-muted font-light">
                <li className="flex items-start gap-2.5 min-h-[3.25rem]">
                  <span className="text-red-500/70 font-mono font-bold mt-0.5">✕</span>
                  <span>Cost cutting over product innovation</span>
                </li>
                <li className="flex items-start gap-2.5 min-h-[3.25rem]">
                  <span className="text-red-500/70 font-mono font-bold mt-0.5">✕</span>
                  <span>Financial leverage & debt loading</span>
                </li>
                <li className="flex items-start gap-2.5 min-h-[3.25rem]">
                  <span className="text-red-500/70 font-mono font-bold mt-0.5">✕</span>
                  <span>Transactional turnarounds</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t border-surface-line text-xs font-mono-ui text-ink-muted/70 uppercase">
              Horizon: 5-Year Liquidation
            </div>
          </motion.div>

          {/* 03 BRAHM Global Holdings (Highlighted) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
            className="bg-[#051A10] text-white border border-emerald-500/30 rounded-2xl p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden"
          >
            <span className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <span className="font-mono-ui text-[11px] uppercase tracking-widest text-emerald-400 block mb-3 font-semibold">
                03 • THE BRAHM WAY
              </span>

              <h3 className="font-display text-2xl text-white mb-6 h-[3.25rem] flex items-center italic font-normal">
                Direct Enterprise Building
              </h3>

              <ul className="space-y-3.5 text-sm text-emerald-100/90 font-light">
                <li className="flex items-start gap-2.5 min-h-[3.25rem]">
                  <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                  <span><strong>100% In-House Tech:</strong> Core powered directly by our engineering arm ENIF</span>
                </li>
                <li className="flex items-start gap-2.5 min-h-[3.25rem]">
                  <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                  <span><strong>Generational Horizon:</strong> Building institutions designed for lasting permanence</span>
                </li>
                <li className="flex items-start gap-2.5 min-h-[3.25rem] mb-4">
                  <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                  <span><strong>Direct Execution:</strong> Strategic leadership, governance & operational control</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-emerald-900/80 text-xs font-mono-ui text-emerald-400 uppercase font-semibold">
              Horizon: Generational
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

