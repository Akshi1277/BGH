"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "./Icon";

const ease = [0.25, 1, 0.5, 1] as const;

const FACTS = [
  { label: "Headquartered", value: "London, UK" },
  { label: "Ownership",      value: "Privately Held" },
  { label: "Horizon",        value: "Long-term" },
];

const PRINCIPLES = [
  {
    title: "Vision",
    description: "Seeing opportunities others overlook and designing ventures with generational scale in mind.",
    icon: "compass" as const,
  },
  {
    title: "Discipline",
    description: "Executing with consistency, precision, accountability, and commercial rigour.",
    icon: "shield" as const,
  },
  {
    title: "Excellence",
    description: "Uncompromising standards across leadership, engineering, operations, and customer experience.",
    icon: "cube" as const,
  },
  {
    title: "Long-term Thinking",
    description: "Decisions made for the next century, weighed against decades rather than the next quarter's market cycle.",
    icon: "layers" as const,
  },
];

export default function PhilosophyStandard() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="standard" className="section-y bg-transparent text-ink border-y border-surface-line relative overflow-hidden">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start relative z-20">
        
        {/* Left: Editorial Statement Card */}
        <div className="lg:col-span-5 lg:sticky lg:top-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, ease }}
            className="relative border border-surface-line rounded-2xl p-8 md:p-10 overflow-hidden bg-paper/80 backdrop-blur-sm shadow-sm"
          >
            <span className="absolute top-4 left-4   w-5 h-5 border-t border-l border-accent/40" />
            <span className="absolute top-4 right-4  w-5 h-5 border-t border-r border-accent/40" />
            <span className="absolute bottom-4 left-4  w-5 h-5 border-b border-l border-accent/40" />
            <span className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-accent/40" />

            <p className="font-mono-ui text-eyebrow text-accent block mb-6 uppercase tracking-[0.2em]">
              THE INSTITUTIONAL STANDARD
            </p>

            <blockquote className="font-display italic text-[1.85rem] md:text-[2.1rem] text-ink leading-snug mb-8">
              &ldquo;The strongest businesses are built on patience most competitors don't have, and ambition most competitors won't risk.&rdquo;
            </blockquote>

            <div className="h-px w-14 bg-accent/40 mb-6" />

           

            <p className="mt-6 font-mono-ui text-[10px] uppercase tracking-[0.22em] text-ink-muted/70">
              — BRAHM Global Holdings
            </p>
          </motion.div>
        </div>

        {/* Right: Interactive Accordion List */}
        <div className="lg:col-span-7">
          <div className="mb-10">
            <motion.span
              className="font-mono-ui text-eyebrow text-accent block mb-3 uppercase tracking-[0.2em]"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease }}
            >
              OUR PHILOSOPHY
            </motion.span>
            <motion.h2
              className="font-display text-3xl md:text-5xl text-ink leading-tight mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.75, ease, delay: 0.08 }}
            >
              One Group. <br />
              <span className="italic font-normal text-ink/70">One Discipline, Applied Everywhere.</span>
            </motion.h2>
            <motion.div
              className="text-paper-muted font-light leading-relaxed text-lg max-w-xl space-y-4"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, ease, delay: 0.16 }}
            >
              <p>
                We believe exceptional businesses are created through vision, disciplined execution and the courage to think beyond the next quarter.
              </p>
              <p>
                Our responsibility is not simply to build companies. It is to create enterprises capable of remaining relevant for generations.
              </p>
            </motion.div>
          </div>

          {/* Accordion Container */}
          <div className="divide-y divide-paper-line border-y border-paper-line">
            {PRINCIPLES.map((p, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div key={p.title} className={`py-5 transition-all duration-300 ${isOpen ? "pl-3 border-l-2 border-accent bg-accent/5" : ""}`}>
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                        isOpen ? "bg-accent text-surface" : "bg-accent/10 text-accent group-hover:bg-accent/20"
                      }`}>
                        <Icon name={p.icon} size={20} />
                      </div>
                      <h3 className={`font-display text-2xl transition-colors duration-300 ${
                        isOpen ? "text-accent" : "text-paper-ink group-hover:text-accent"
                      }`}>
                        {p.title}
                      </h3>
                    </div>

                    <span className={`w-8 h-8 rounded-full border flex items-center justify-center font-mono-ui text-sm transition-all duration-300 ${
                      isOpen ? "border-accent text-accent rotate-45" : "border-paper-line text-paper-muted group-hover:border-accent"
                    }`}>
                      +
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease }}
                        className="overflow-hidden"
                      >
                        <p className="pt-4 pl-14 text-base text-paper-muted font-light leading-relaxed max-w-xl">
                          {p.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

