"use client";

import React from "react";
import { motion } from "framer-motion";

const ease = [0.25, 1, 0.5, 1] as const;

const SECTORS = [
  {
    index: "01",
    title: "Technology & Artificial Intelligence",
    description: "Building intelligent software and digital infrastructure.",
  },
  {
    index: "02",
    title: "Sports & Media",
    description: "Digital competition, talent and entertainment.",
  },
  {
    index: "03",
    title: "Education",
    description: "Global learning platforms for the next generation.",
  },
  {
    index: "04",
    title: "Hospitality",
    description: "Premium concepts combining design, service and experience.",
  },
  {
    index: "05",
    title: "Luxury Consumer Brands",
    description: "Refined fragrance and lifestyle collections.",
  },
  {
    index: "06",
    title: "Digital Commerce",
    description: "Commercial infrastructure for global scale.",
  },
];

export default function GroupSectors() {
  return (
    <section id="sectors" className="section-y bg-surface relative">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop">
        
        <div className="max-w-2xl mb-16 md:mb-20">
          <motion.span
            className="text-eyebrow font-mono-ui text-accent block mb-4 uppercase tracking-[0.2em]"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
          >
            THE BRAHM GROUP
          </motion.span>
          <motion.h2
            className="font-display text-4xl md:text-5xl text-ink leading-tight"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease, delay: 0.08 }}
          >
            Group <span className="italic font-normal text-accent">Sectors</span>.
          </motion.h2>
          <motion.p
            className="text-lede text-ink-muted mt-6 max-w-lg font-light leading-relaxed"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease, delay: 0.16 }}
          >
            Our companies operate independently while benefiting from the strategic direction, governance, technology capabilities and operational expertise of the Group.
          </motion.p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.05 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-surface-line border border-surface-line"
        >
          {SECTORS.map((sector) => (
            <motion.div
              key={sector.index}
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
              }}
              className="bg-surface p-8 md:p-10 flex flex-col gap-8 group relative overflow-hidden transition-colors duration-500 hover:bg-surface-soft"
            >
              <span className="absolute left-0 top-0 h-full w-[2px] bg-accent origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out" />
              
              <span className="font-mono-ui text-[11px] uppercase tracking-widest text-accent">
                {sector.index}
              </span>
              
              <div>
                <h3 className="font-display text-2xl text-ink mb-3 group-hover:text-accent transition-colors duration-300">
                  {sector.title}
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed font-light">
                  {sector.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
