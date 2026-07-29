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
  accent?: "accent" | "cobalt" | "cyan";
  theme?: "light" | "dark";
}

export default function ProcessFlow({
  id,
  eyebrow,
  heading,
  description,
  steps,
  accent = "accent",
  theme = "light",
}: ProcessFlowProps) {
  const isDark = theme === "dark";

  const accentText =
    accent === "cyan"
      ? "text-[#38BDF8]"
      : accent === "cobalt"
      ? "text-cobalt"
      : "text-accent";

  const accentBorder =
    isDark
      ? "border-cyan-500/20 bg-[#0A101F]/80 text-[#F8FAFC]"
      : accent === "cobalt"
      ? "border-cobalt/30 bg-surface text-ink"
      : "border-accent/30 bg-surface text-ink";

  return (
    <section
      id={id}
      className={`section-y ${
        isDark
          ? "bg-[#04070D] text-[#F8FAFC] border-b border-cyan-500/20"
          : "bg-surface-soft"
      } relative overflow-hidden`}
    >
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        <div className="max-w-2xl mb-16">
          <motion.span
            className={`text-eyebrow font-mono-ui ${accentText} block mb-4 uppercase tracking-[0.2em]`}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
          >
            {eyebrow}
          </motion.span>
          <motion.h2
            className={`font-display text-display ${
              isDark ? "text-[#F8FAFC]" : "text-ink"
            }`}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease, delay: 0.08 }}
          >
            {heading}
          </motion.h2>
          {description && (
            <motion.p
              className={`${
                isDark ? "text-[#94A3B8]" : "text-ink-muted"
              } mt-4 max-w-lg text-lede`}
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
          className="flex flex-col md:flex-row md:flex-wrap items-stretch gap-3 md:gap-0"
        >
          {steps.map((step, i) => (
            <React.Fragment key={step}>
              <motion.div
                variants={item}
                className={`flex-1 min-w-[140px] border ${accentBorder} backdrop-blur-md rounded-xl p-5 md:p-6 flex flex-col gap-3 group hover:border-cyan-400/50 transition-all duration-300`}
              >
                <span className={`font-mono-ui text-[11px] tracking-widest ${accentText}`}>
                  0{i + 1}
                </span>
                <span
                  className={`font-display text-base md:text-lg leading-snug ${
                    isDark ? "text-[#F8FAFC]" : "text-ink"
                  }`}
                >
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
      </div>
    </section>
  );
}
