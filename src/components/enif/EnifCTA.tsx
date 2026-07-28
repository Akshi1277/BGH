"use client";

import React from "react";
import { motion } from "framer-motion";
import MagneticButton from "../MagneticButton";

const ease = [0.25, 1, 0.5, 1] as const;

export default function EnifCTA() {
  return (
    <section id="contact" className="relative section-y bg-surface overflow-hidden">
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
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: "-25%",
          left: "-15%",
          width: "55%",
          height: "90%",
          background:
            "radial-gradient(ellipse, color-mix(in srgb, var(--color-cobalt) 16%, transparent), transparent 70%)",
          filter: "blur(80px)",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6 }}
      />

      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        <div className="text-center flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-eyebrow font-mono-ui text-cobalt block mb-6"
          >
            Let&rsquo;s Build
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-display text-ink max-w-3xl"
          >
            Let&rsquo;s build something{" "}
            <span className="italic text-cobalt">remarkable</span>.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lede text-ink-muted max-w-xl mt-8"
          >
            Whether you&rsquo;re launching a new venture, transforming an
            existing business or exploring the potential of artificial
            intelligence, ENIF Technologies provides the expertise to take
            ambitious ideas from concept to reality.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-12"
          >
            <MagneticButton
              href="mailto:hello@brahmglobalholdings.com?subject=Discovery Consultation"
              className="inline-flex items-center gap-3 bg-cobalt text-surface px-10 py-5 rounded-full text-label font-mono-ui uppercase tracking-[0.1em] hover:bg-cobalt-soft transition-colors duration-300 group"
            >
              Schedule a Discovery Consultation
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
