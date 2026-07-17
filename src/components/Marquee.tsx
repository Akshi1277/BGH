"use client";

import React from "react";
import { motion } from "framer-motion";

const ease = [0.25, 1, 0.5, 1] as const;

const CREDENTIALS = [
  { stat: "UK", label: "Headquartered & Engineered" },
  { stat: "4", label: "Active Ventures" },
  { stat: "3+", label: "Industry Sectors" },
  { stat: "100%", label: "Built In-House" },
];

export default function Marquee() {
  return (
    <div className="border-y border-ink-line bg-ink-soft">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-ink-line">
          {CREDENTIALS.map((c, i) => (
            <motion.div
              key={c.stat}
              className="flex flex-col items-center justify-center gap-1 py-8 px-6 text-center"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease, delay: i * 0.08 }}
            >
              <span className="font-display text-2xl md:text-3xl text-cream">
                {c.stat}
              </span>
              <span className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-cream-faint">
                {c.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
