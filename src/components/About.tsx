"use client";

import React from "react";
import { motion } from "framer-motion";

const ease = [0.25, 1, 0.5, 1] as const;

const PRINCIPLES = [
  {
    index: "01",
    title: "Vision",
    description: "Seeing opportunities others overlook and designing ventures with generational scale in mind.",
  },
  {
    index: "02",
    title: "Discipline",
    description: "Executing with consistency, precision, accountability, and commercial rigour.",
  },
  {
    index: "03",
    title: "Legacy",
    description: "Creating enterprises designed to endure and remain relevant long after their founders.",
  },
];

const FACTS = [
  { label: "Headquartered", value: "London, UK" },
  { label: "Ownership",      value: "Privately Held" },
  { label: "Horizon",        value: "Long-term" },
];

const TAGS = [
  "Disciplined Execution",
  "Long-term Stewardship",
  "Commercial Excellence",
  "Operational Rigour",
];

export default function About() {
  return (
    <section
      id="who-we-are"
      className="section-y bg-paper text-paper-ink border-y border-paper-line relative"
    >
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-24 pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, var(--color-surface), transparent)" }}
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-10"
        style={{ background: "linear-gradient(to top, var(--color-surface), transparent)" }}
      />
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start relative z-20">

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
              background:
                "linear-gradient(160deg, #F8F6F2 0%, #EAF2EC 60%, #D8EBE1 100%)",
            }}
          >
            {/* Corner bracket decorations */}
            <span className="absolute top-4 left-4   w-5 h-5 border-t border-l border-accent-deep/40" />
            <span className="absolute top-4 right-4  w-5 h-5 border-t border-r border-accent-deep/40" />
            <span className="absolute bottom-4 left-4  w-5 h-5 border-b border-l border-accent-deep/40" />
            <span className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-accent-deep/40" />

            <p className="font-mono-ui text-eyebrow text-accent block mb-6 uppercase tracking-[0.2em]">
              PRIVATELY HELD BUSINESS GROUP
            </p>

            <blockquote className="font-display italic text-[1.85rem] md:text-[2.1rem] text-paper-ink leading-snug mb-8">
              &ldquo;The strongest businesses are built with the patience to endure and the ambition to lead.&rdquo;
            </blockquote>

            <div className="h-px w-14 bg-accent-deep/50 mb-8" />

            <dl className="flex flex-col gap-4">
              {FACTS.map((f) => (
                <div
                  key={f.label}
                  className="flex items-center justify-between gap-4"
                >
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

        {/* ── Right: headline + principles cards ───────────────────── */}
        <div className="lg:col-span-7">

          <div className="mb-12">
            <motion.span
              className="font-mono-ui text-eyebrow text-accent block mb-3 uppercase tracking-[0.2em]"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease }}
            >
              WHO WE ARE
            </motion.span>

            <motion.h2
              className="font-display text-3xl md:text-5xl text-paper-ink mb-4 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.75, ease, delay: 0.08 }}
            >
              Built for Generations.{" "}
              <br />
              <span className="italic font-normal text-accent">Not Market Cycles.</span>
            </motion.h2>

            <motion.div
              className="space-y-4 text-paper-muted font-light leading-relaxed"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, ease, delay: 0.16 }}
            >
              <p>
                <strong className="text-paper-ink font-medium">BRAHM Global Holdings</strong> is an independent, privately held business group established with a long-term vision. Our ambition extends beyond creating successful companies. We create enduring enterprises designed to evolve across generations, guided by disciplined leadership, exceptional execution and an uncompromising pursuit of excellence.
              </p>
              <p>
                Every business within the Group contributes to a greater purpose: To build an institution that continues to grow, adapt and lead for generations to come.
              </p>
              <p>
                We believe exceptional businesses are created through vision, disciplined execution and the courage to think beyond the next quarter. Our responsibility is not simply to build companies. It is to create enterprises capable of remaining relevant for generations.
              </p>
            </motion.div>

            {/* One Group One Standard Banner */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, ease, delay: 0.22 }}
              className="mt-8 p-6 rounded-xl border border-accent/20 bg-accent/5 text-paper-ink"
            >
              <h4 className="font-display text-xl text-accent font-semibold mb-2">One Group. One Standard.</h4>
              <p className="text-sm text-paper-muted font-light leading-relaxed">
                Every company within BRAHM Global Holdings operates independently while benefiting from the Group's leadership, engineering capability, operational expertise and long-term strategic direction. Different industries. One philosophy. One uncompromising standard of excellence.
              </p>
            </motion.div>
          </div>

          {/* 3-card principles grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-10"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.11 } },
            }}
          >
            {PRINCIPLES.map((p) => (
              <motion.div
                key={p.index}
                variants={{
                  hidden: { opacity: 0, y: 22 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.55, ease: "easeOut" },
                  },
                }}
                className="group relative bg-paper-high border border-paper-line rounded-2xl p-6 md:p-7 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_10px_30px_-10px_rgba(31,92,67,0.12)]"
              >
                <span
                  aria-hidden
                  className="absolute -top-3 -right-1 font-display text-[7rem] leading-none select-none pointer-events-none text-paper-ink/[0.04]"
                >
                  {p.index}
                </span>

                <span className="inline-block font-mono-ui text-[11px] tracking-widest text-accent mb-4">
                  {p.index}
                </span>

                <h3 className="font-display text-xl text-paper-ink mb-3 leading-snug pr-4">
                  {p.title}
                </h3>

                <p className="text-sm text-paper-muted font-light leading-relaxed">
                  {p.description}
                </p>

                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent group-hover:w-full transition-[width] duration-500 ease-out" />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
          >
            {TAGS.map((tag) => (
              <span
                key={tag}
                className="font-mono-ui text-[11px] uppercase tracking-[0.12em] text-accent border border-accent/30 rounded-full px-4 py-2"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
