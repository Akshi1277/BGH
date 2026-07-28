"use client";

import React from "react";
import { motion } from "framer-motion";

const ease = [0.25, 1, 0.5, 1] as const;

const PHILOSOPHY = [
  {
    index: "01",
    title: "Markets Evolve",
    description:
      "Technologies change and consumer behaviour shifts — but businesses built on strong fundamentals don't move with every trend.",
  },
  {
    index: "02",
    title: "Built to Endure",
    description:
      "The organisations that endure are those built upon strong fundamentals, exceptional leadership and continuous innovation.",
  },
  {
    index: "03",
    title: "Category Leaders",
    description:
      "Every company within BRAHM Global Holdings is created with the ambition to become a category leader — not simply another participant.",
  },
];

const FACTS = [
  { label: "Headquartered", value: "London, UK" },
  { label: "Group Companies", value: "5" },
  { label: "Model",          value: "Venture Builder" },
];

const TAGS = ["Build with purpose", "Operate with excellence", "Scale with integrity"];

export default function About() {
  return (
    <section
      id="who-we-are"
      className="section-y bg-paper text-paper-ink border-y border-paper-line relative"
    >
      {/* ── Section edge gradients — soften Capabilities↔Portfolio transitions ── */}
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
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">

        {/* ── Left: editorial statement card ───────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease }}
          className="lg:col-span-5 lg:sticky lg:top-32"
        >
          {/* Philosophy card with brand-signature cream→pine gradient */}
          <div
            className="relative border border-paper-line rounded-2xl p-8 md:p-10 overflow-hidden"
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

            {/* Eyebrow */}
            <p className="font-mono-ui text-eyebrow text-accent block mb-8">
              Our Philosophy
            </p>

            {/* Quote */}
            <blockquote className="font-display italic text-[2rem] md:text-[2.25rem] text-paper-ink leading-snug mb-8">
              &ldquo;We don&rsquo;t follow industries.
              <br />
              We build them.&rdquo;
            </blockquote>

            {/* Accent rule */}
            <div className="h-px w-14 bg-accent-deep/50 mb-8" />

            {/* Fact rows */}
            <dl className="flex flex-col gap-5">
              {FACTS.map((f) => (
                <div
                  key={f.label}
                  className="flex items-center justify-between gap-4"
                >
                  <dt className="font-mono-ui text-[11px] uppercase tracking-[0.18em] text-paper-muted">
                    {f.label}
                  </dt>
                  <dd className="font-display text-sm text-paper-ink">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>

            {/* Attribution */}
            <p className="mt-10 font-mono-ui text-[10px] uppercase tracking-[0.22em] text-paper-muted/50">
              — Brahm Global Holdings
            </p>
          </div>
        </motion.div>

        {/* ── Right: headline + philosophy cards ───────────────────── */}
        <div className="lg:col-span-7">

          {/* Section header */}
          <div className="mb-12">
            <motion.span
              className="font-mono-ui text-eyebrow text-accent block mb-5"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease }}
            >
              Who We Are
            </motion.span>

            <motion.h2
              className="font-display text-display text-paper-ink mb-5 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.75, ease, delay: 0.08 }}
            >
              A long-term
              <br />
              <span className="italic font-normal text-accent">builder</span>{" "}
              of businesses.
            </motion.h2>

            <motion.p
              className="text-lede text-paper-muted max-w-xl"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, ease, delay: 0.16 }}
            >
              At BRAHM Global Holdings, we believe the world&rsquo;s most
              valuable organisations are built through vision, discipline and
              patience. Rather than focusing on a single industry, we create
              and support businesses capable of becoming leaders within their
              respective sectors. From software platforms and artificial
              intelligence to premium consumer brands and hospitality
              concepts, every company within our Group is united by one
              philosophy.
            </motion.p>
          </div>

          {/* 3-card philosophy grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 mb-10"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.11 } },
            }}
          >
            {PHILOSOPHY.map((p) => (
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
                {/* Ghost number — purely decorative */}
                <span
                  aria-hidden
                  className="absolute -top-3 -right-1 font-display text-[7rem] leading-none select-none pointer-events-none text-paper-ink/[0.04]"
                >
                  {p.index}
                </span>

                {/* Index — accent, consistent with eyebrows */}
                <span className="inline-block font-mono-ui text-[11px] tracking-widest text-accent mb-5">
                  {p.index}
                </span>

                {/* Title */}
                <h3 className="font-display text-lg text-paper-ink mb-3 leading-snug pr-6">
                  {p.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-paper-muted leading-relaxed">
                  {p.description}
                </p>

                {/* Bottom accent — slides in from left on hover */}
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent group-hover:w-full transition-[width] duration-500 ease-out" />
              </motion.div>
            ))}
          </motion.div>

          {/* Closing tag row — "Build with purpose. Operate with excellence. Scale with integrity." */}
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
