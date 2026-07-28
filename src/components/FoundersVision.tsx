"use client";

import React from "react";
import { motion } from "framer-motion";

const ease = [0.25, 1, 0.5, 1] as const;

export default function FoundersVision() {
  return (
    <section className="section-y bg-paper text-paper-ink border-t border-paper-line relative overflow-hidden">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="max-w-3xl mx-auto flex flex-col items-center gap-6"
        >
          <span className="font-mono-ui text-eyebrow text-accent uppercase tracking-[0.2em] block">
            Founders Vision
          </span>

          <blockquote className="font-display italic text-2xl md:text-4xl text-paper-ink leading-tight">
            &ldquo;We believe the next generation of global businesses will
            combine technology, operational excellence and unforgettable customer
            experiences.&rdquo;
          </blockquote>

          <div className="h-px w-16 bg-accent/40 my-2" />

          <p className="font-mono-ui text-sm uppercase tracking-[0.15em] text-accent font-medium">
            BRAHM Global Holdings exists to build those businesses.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
