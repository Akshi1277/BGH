"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Icon from "../Icon";

const ease = [0.25, 1, 0.5, 1] as const;

export default function EnifHero() {
  return (
    <section className="relative overflow-hidden bg-surface pt-40 pb-20 md:pt-48 md:pb-28">
      {/* ── Dot grid background, cobalt-tinted ─────────────────────── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-surface-line) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          opacity: 0.6,
        }}
      />
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          top: "-20%",
          right: "-10%",
          width: "55%",
          height: "80%",
          background:
            "radial-gradient(ellipse, color-mix(in srgb, var(--color-cobalt) 14%, transparent), transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        <div className="max-w-3xl">
          <motion.span
            className="text-eyebrow font-mono-ui text-cobalt block mb-6"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            ENIF Technologies — A BRAHM Global Holdings Company
          </motion.span>

          <motion.h1
            className="font-display text-hero text-ink mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
          >
            Engineering the{" "}
            <span className="italic font-normal text-cobalt">businesses</span>{" "}
            of tomorrow.
          </motion.h1>

          <motion.p
            className="text-lede text-ink-muted max-w-2xl mb-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.22 }}
          >
            ENIF Technologies is the technology and innovation division of
            BRAHM Global Holdings. We design, engineer and maintain digital
            products, intelligent platforms and enterprise software for both
            our own ventures and ambitious organisations worldwide.
          </motion.p>

          <motion.p
            className="text-lede text-ink-muted max-w-2xl mb-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.3 }}
          >
            Whether developing a minimum viable product for a start-up or
            delivering enterprise-scale systems for established
            organisations, our focus remains the same: exceptional
            engineering, elegant design, long-term scalability.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.4 }}
          >
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 bg-cobalt text-surface px-6 py-3.5 md:px-8 md:py-4 rounded-full text-label font-mono-ui uppercase tracking-[0.1em] hover:bg-cobalt-soft transition-colors duration-300 group"
            >
              Schedule a Discovery Consultation
              <Icon
                name="arrow-right"
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
