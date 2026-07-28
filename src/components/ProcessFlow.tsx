"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import Icon from "./Icon";

const ease = [0.25, 1, 0.5, 1] as const;

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};

interface ProcessFlowProps {
  id: string;
  eyebrow: string;
  heading: React.ReactNode;
  description?: string;
  steps: string[];
  accent?: "accent" | "cobalt";
}

export default function ProcessFlow({
  id,
  eyebrow,
  heading,
  description,
  steps,
  accent = "accent",
}: ProcessFlowProps) {
  const accentText = accent === "cobalt" ? "text-cobalt" : "text-accent";
  const accentBorder = accent === "cobalt" ? "border-cobalt/30" : "border-accent/30";
  const accentBg = accent === "cobalt" ? "bg-cobalt" : "bg-accent";

  return (
    <section id={id} className="section-y bg-surface-soft relative">
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-20 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, var(--color-surface), transparent)" }}
      />
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="max-w-2xl mb-16">
          <motion.span
            className={`text-eyebrow font-mono-ui ${accentText} block mb-5`}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
          >
            {eyebrow}
          </motion.span>
          <motion.h2
            className="font-display text-display text-ink"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease, delay: 0.08 }}
          >
            {heading}
          </motion.h2>
          {description && (
            <motion.p
              className="text-ink-muted mt-4 max-w-lg"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, ease, delay: 0.16 }}
            >
              {description}
            </motion.p>
          )}
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col md:flex-row md:flex-wrap items-stretch gap-0"
        >
          {steps.map((step, i) => (
            <React.Fragment key={step}>
              <motion.div
                variants={item}
                className={`flex-1 min-w-[140px] bg-surface border ${accentBorder} rounded-xl p-5 md:p-6 flex flex-col gap-3`}
              >
                <span className={`font-mono-ui text-[11px] tracking-widest ${accentText}`}>
                  0{i + 1}
                </span>
                <span className="font-display text-base md:text-lg text-ink leading-snug">
                  {step}
                </span>
              </motion.div>

              {i < steps.length - 1 && (
                <motion.div
                  variants={item}
                  className="flex items-center justify-center shrink-0 py-2 md:py-0 md:px-2"
                >
                  <span className={`${accentText} opacity-60 rotate-90 md:rotate-0`}>
                    <Icon name="arrow-right" size={16} />
                  </span>
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </motion.div>

        <div className={`h-px w-full ${accentBg} opacity-10 mt-14`} />
      </div>
    </section>
  );
}
