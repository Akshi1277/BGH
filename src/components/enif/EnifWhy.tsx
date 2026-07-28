"use client";

import React from "react";
import { motion } from "framer-motion";

const ease = [0.25, 1, 0.5, 1] as const;

export default function EnifWhy() {
  return (
    <section className="section-y bg-paper text-paper-ink border-y border-paper-line relative">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="max-w-3xl">
          <motion.span
            className="font-mono-ui text-eyebrow text-cobalt block mb-5"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
          >
            Why ENIF
          </motion.span>
          <motion.h2
            className="font-display text-display text-paper-ink mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease, delay: 0.08 }}
          >
            British leadership.
            <br />
            <span className="italic font-normal text-cobalt">Global</span>{" "}
            engineering capability.
          </motion.h2>
          <motion.p
            className="text-lede text-paper-muted max-w-2xl"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease, delay: 0.16 }}
          >
            Our strategic leadership operates from the United Kingdom while
            our engineering teams collaborate globally to deliver
            high-quality digital solutions with efficiency and scale. Every
            project follows rigorous standards of architecture, security,
            usability and performance.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
