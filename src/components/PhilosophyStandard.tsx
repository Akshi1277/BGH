"use client";

import React from "react";
import { motion } from "framer-motion";
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
    description: "Decisions made for the next century, prioritizing enduring value over short-term market cycles.",
    icon: "layers" as const,
  },
];

export default function PhilosophyStandard() {
  return (
    <section id="standard" className="section-y bg-paper text-paper-ink border-y border-paper-line relative overflow-hidden">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start relative z-20">
        
        {/* ── Left: editorial statement card ───────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease }}
          className="lg:col-span-5 lg:sticky lg:top-32"
        >
          <div
            className="relative border border-paper-line rounded-2xl p-8 md:p-10 overflow-hidden shadow-sm"
            style={{
              background: "linear-gradient(160deg, #F8F6F2 0%, #EAF2EC 60%, #D8EBE1 100%)",
            }}
          >
            {/* Corner bracket decorations */}
            <span className="absolute top-4 left-4   w-5 h-5 border-t border-l border-accent-deep/40" />
            <span className="absolute top-4 right-4  w-5 h-5 border-t border-r border-accent-deep/40" />
            <span className="absolute bottom-4 left-4  w-5 h-5 border-b border-l border-accent-deep/40" />
            <span className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-accent-deep/40" />

            <p className="font-mono-ui text-eyebrow text-accent block mb-6 uppercase tracking-[0.2em]">
              THE INSTITUTIONAL STANDARD
            </p>

            <blockquote className="font-display italic text-[1.85rem] md:text-[2.1rem] text-paper-ink leading-snug mb-8">
              &ldquo;The strongest businesses are built with the patience to endure and the ambition to lead.&rdquo;
            </blockquote>

            <div className="h-px w-14 bg-accent-deep/50 mb-8" />

            <dl className="flex flex-col gap-4">
              {FACTS.map((f) => (
                <div key={f.label} className="flex items-center justify-between gap-4">
                  <dt className="font-mono-ui text-[11px] uppercase tracking-[0.18em] text-paper-muted">
                    {f.label}
                  </dt>
                  <dd className="font-display text-sm text-paper-ink font-medium">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-8 font-mono-ui text-[10px] uppercase tracking-[0.22em] text-paper-muted/60">
              — BRAHM Global Holdings
            </p>
          </div>
        </motion.div>

        {/* ── Right: principles grid ───────────────────── */}
        <div className="lg:col-span-7">
          <div className="mb-12">
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
              className="font-display text-3xl md:text-5xl text-paper-ink leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.75, ease, delay: 0.08 }}
            >
              One Group. <br />
              <span className="italic font-normal text-accent">One Enduring Standard.</span>
            </motion.h2>
            <motion.p
              className="text-paper-muted font-light leading-relaxed text-lg max-w-xl"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, ease, delay: 0.16 }}
            >
              Every company within BRAHM Global Holdings operates independently while being governed by the same institutional principles. Different industries. One philosophy.
            </motion.p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.11 } },
            }}
          >
            {PRINCIPLES.map((p, i) => (
              <motion.div
                key={p.title}
                variants={{
                  hidden: { opacity: 0, y: 22 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
                }}
                className="group p-7 rounded-2xl border border-paper-line bg-paper-high flex flex-col justify-between hover:border-accent/40 hover:shadow-[0_10px_30px_-10px_rgba(31,92,67,0.12)] transition-all duration-300 relative overflow-hidden"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                    <Icon name={p.icon} size={20} />
                  </div>
                  <h3 className="font-display text-xl text-paper-ink mb-3">{p.title}</h3>
                  <p className="text-sm text-paper-muted font-light leading-relaxed">{p.description}</p>
                </div>
                
                {/* Accent hover line */}
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent group-hover:w-full transition-[width] duration-500 ease-out" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
