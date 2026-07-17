"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Icon from "./Icon";

export default function CTA() {
  return (
    <section id="contact" className="relative section-y bg-ink overflow-hidden">
      {/* One-time reveal glow — only appears once when section enters view */}
      <motion.div
        className="absolute inset-0 glow-gold pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2 }}
      />

      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop relative z-10 text-center flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-eyebrow font-mono-ui text-gold block mb-6"
        >
          Let&rsquo;s Build
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-display text-cream max-w-3xl"
        >
          Tell us what you want to build.{" "}
          <span className="italic text-gold">We&rsquo;ll engineer it.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lede text-cream-muted max-w-xl mt-8"
        >
          Whether it&rsquo;s a new product, a platform to scale, or an
          ecosystem to connect — we start every conversation the same way:
          by understanding the problem worth solving.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12"
        >
          <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
            <Link
              href="mailto:hello@brahmglobalholdings.com"
              className="inline-flex items-center gap-3 bg-gold text-ink px-10 py-5 rounded-full text-label font-mono-ui uppercase tracking-[0.1em] hover:bg-gold-soft transition-colors duration-300 group"
            >
              Start a Conversation
              <Icon
                name="arrow-right"
                size={18}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
