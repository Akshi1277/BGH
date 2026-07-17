"use client";

import React from "react";
import { motion } from "framer-motion";
import Icon, { IconName } from "./Icon";

const ease = [0.25, 1, 0.5, 1] as const;

const CREDENTIALS: { icon: IconName; stat: string; label: string }[] = [
  { icon: "globe",   stat: "UK",    label: "Headquartered & Engineered" },
  { icon: "layers",  stat: "4",     label: "Active Ventures" },
  { icon: "compass", stat: "3+",    label: "Industry Sectors" },
  { icon: "shield",  stat: "100%",  label: "Built In-House" },
];

export default function Marquee() {
  return (
    <div className="border-y border-surface-line bg-surface-soft">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-surface-line">
          {CREDENTIALS.map((c, i) => (
            <motion.div
              key={c.stat}
              className="flex flex-col items-center justify-center gap-1.5 py-10 px-6 text-center group relative overflow-hidden"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease, delay: i * 0.08 }}
            >
              {/* Left border reveal on hover — same treatment as Capabilities/GlobalPresence */}
              <span className="absolute left-0 top-0 h-full w-[2px] bg-accent origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out" />

              <Icon
                name={c.icon}
                size={15}
                className="text-accent opacity-75 mb-0.5"
              />
              <span className="font-display text-2xl md:text-3xl text-ink">
                {c.stat}
              </span>
              <span className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-ink-faint leading-tight text-center">
                {c.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
