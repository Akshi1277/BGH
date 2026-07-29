"use client";

import React from "react";
import { motion } from "framer-motion";
import Icon, { IconName } from "./Icon";
import MagneticButton from "./MagneticButton";

const ease = [0.25, 1, 0.5, 1] as const;

/* ─── The four conversation pathways ────────────────────────────── */
const PATHWAYS: { icon: IconName; title: string; description: string; href: string; accent: string }[] = [
  {
    icon: "layers",
    title: "BUILD WITH BRAHM",
    description:
      "From new ventures to established enterprises, we partner with organisations to create businesses, products and platforms built for long-term success.",
    href: "mailto:hello@brahmglobalholdings.com?subject=Build With BRAHM",
    accent: "var(--color-accent)",
  },
  {
    icon: "cpu",
    title: "WORK WITH ENIF",
    description:
      "Partner with our engineering division to design, build and scale intelligent software, AI-powered platforms and enterprise technology tailored to your organisation.",
    href: "/enif#contact",
    accent: "#38BDF8",
  },
  {
    icon: "users",
    title: "PARTNER WITH US",
    description:
      "We welcome strategic partnerships, joint ventures and commercial collaborations that create sustainable value for all parties.",
    href: "mailto:hello@brahmglobalholdings.com?subject=Partnership Inquiry",
    accent: "var(--color-persimmon)",
  },
  {
    icon: "compass",
    title: "INVESTMENT OPPORTUNITIES",
    description:
      "We explore opportunities aligned with our long-term philosophy and our core sectors of technology, education, hospitality, sport, luxury consumer brands and emerging industries.",
    href: "mailto:hello@brahmglobalholdings.com?subject=Investment Opportunity",
    accent: "var(--color-cobalt)",
  },
];

function PathwayCard({
  pathway,
  delay,
}: {
  pathway: (typeof PATHWAYS)[0];
  delay: number;
}) {
  return (
    <motion.a
      href={pathway.href}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease }}
      whileHover="hover"
      className="group relative bg-paper border border-surface-line rounded-2xl p-7 md:p-8 flex flex-col justify-between overflow-hidden cursor-pointer hover:border-accent/40 transition-colors"
    >
      <motion.div
        className="absolute top-0 left-0 h-[2.5px] w-full origin-left"
        style={{ background: pathway.accent }}
        variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
        initial="rest"
        transition={{ duration: 0.35, ease }}
      />

      <div>
        <div className="flex items-center justify-between mb-6">
          <motion.div
            className="w-10 h-10 rounded-xl border border-surface-line flex items-center justify-center"
            style={{ color: pathway.accent }}
            variants={{
              rest: { borderColor: "var(--color-surface-line)" },
              hover: { borderColor: pathway.accent, scale: 1.08 },
            }}
            transition={{ duration: 0.25 }}
          >
            <Icon name={pathway.icon} size={18} />
          </motion.div>
          <motion.span
            className="text-ink-muted group-hover:text-accent transition-colors"
            variants={{ rest: { x: 0 }, hover: { x: 4 } }}
            transition={{ duration: 0.2 }}
          >
            <Icon name="arrow-right" size={15} />
          </motion.span>
        </div>

        <h3 className="font-mono-ui text-xs font-bold text-ink uppercase tracking-[0.14em] mb-3">
          {pathway.title}
        </h3>

        <p className="text-sm leading-relaxed text-ink-muted font-light">
          {pathway.description}
        </p>
      </div>

      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(ellipse at top left, color-mix(in srgb, ${pathway.accent} 8%, transparent), transparent 70%)`,
        }}
        variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
        transition={{ duration: 0.4 }}
      />
    </motion.a>
  );
}

export default function CTA() {
  return (
    <section
      id="contact"
      className="relative section-y bg-surface overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-surface-line) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          opacity: 0.6,
        }}
      />

      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: "-30%",
          left: "-20%",
          width: "60%",
          height: "100%",
          background:
            "radial-gradient(ellipse, color-mix(in srgb, var(--color-accent) 16%, transparent), transparent 70%)",
          filter: "blur(70px)",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6 }}
      />

      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop relative z-10">

        {/* ── Hero text block ─────────────────────────────── */}
        <div className="text-center flex flex-col items-center mb-16 md:mb-20">

          <motion.span
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-eyebrow font-mono-ui text-accent block mb-4 uppercase tracking-[0.2em]"
          >
            LET'S BUILD
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-3xl md:text-5xl text-ink max-w-3xl leading-tight"
          >
            Every Enduring Enterprise Begins With a Conversation.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-4 text-ink-muted text-base md:text-lg max-w-2xl mt-6 font-light leading-relaxed"
          >
            <p>
              Whether you are establishing a new venture, seeking a strategic technology partner, exploring investment opportunities or considering a long-term partnership, we welcome conversations with ambitious organisations and exceptional people who share our commitment to building lasting value.
            </p>
            <p className="text-ink font-normal italic">
              If your ambition is to create something designed to endure, we would be pleased to begin the conversation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10"
          >
            <MagneticButton href="mailto:hello@brahmglobalholdings.com">
              START A CONVERSATION
            </MagneticButton>
          </motion.div>
        </div>

        {/* ── 4 Pathway cards ───────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PATHWAYS.map((p, i) => (
            <PathwayCard key={p.title} pathway={p} delay={0.35 + i * 0.08} />
          ))}
        </div>

      </div>
    </section>
  );
}