"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.25, 1, 0.5, 1] as const;

interface ProcessStep {
  title: string;
  description?: string;
}

interface ProcessFlowProps {
  id: string;
  eyebrow: string;
  heading: React.ReactNode;
  description?: string;
  steps: ProcessStep[];
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
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeStep = steps[activeIdx] || steps[0];

  // Auto-cycle through stages every 4.5 seconds
  useEffect(() => {
    if (isPaused || steps.length === 0) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % steps.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, steps.length]);

  const accentText =
    accent === "cyan"
      ? "text-[#38BDF8]"
      : accent === "cobalt"
      ? "text-cobalt"
      : "text-accent";

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
        
        {/* Header */}
        <div className="max-w-[65ch] mb-12 md:mb-16">
          <motion.span
            className={`text-eyebrow font-mono-ui ${accentText} block mb-3 uppercase tracking-[0.2em]`}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
          >
            {eyebrow}
          </motion.span>
          
          <motion.h2
            className={`font-display text-4xl md:text-5xl leading-tight mb-4 ${
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
              } text-lede font-light leading-relaxed`}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, ease, delay: 0.16 }}
            >
              {description}
            </motion.p>
          )}
        </div>

        {/* Connected Horizontal Timeline Stepper */}
        <div className="mb-10 overflow-x-auto pb-4 pt-2 no-scrollbar">
          <div className="flex items-center min-w-[720px] relative border-b border-surface-line/80 pb-6">
            {steps.map((step, idx) => {
              const isSelected = activeIdx === idx;
              return (
                <button
                  key={step.title}
                  onClick={() => {
                    setActiveIdx(idx);
                    setIsPaused(true);
                  }}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  className="flex-1 group text-left relative px-3 transition-all duration-300 focus:outline-none cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-mono-ui text-xs transition-all duration-300 ${
                      isSelected
                        ? "bg-accent text-surface shadow-md scale-110 font-bold"
                        : "bg-surface border border-surface-line text-ink-muted group-hover:border-accent/40"
                    }`}>
                      0{idx + 1}
                    </span>
                    <span className={`font-display text-base transition-colors duration-300 ${
                      isSelected ? "text-accent font-semibold" : "text-ink group-hover:text-accent"
                    }`}>
                      {step.title}
                    </span>
                  </div>

                  {/* Active Indicator Bar */}
                  {isSelected && (
                    <motion.div
                      layoutId="activePipelineBar"
                      className="absolute bottom-[-25px] left-0 right-0 h-[3px] bg-accent"
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Detail Card Inspector with Smooth Auto-Cycle Progress Bar */}
        <div 
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className={`border ${isDark ? "bg-[#0A101F]/80 border-cyan-500/20" : "bg-surface border-surface-line"} rounded-2xl p-8 md:p-12 shadow-sm min-h-[220px] flex flex-col justify-between relative overflow-hidden group`}
        >
          {/* Top Auto-Cycle Countdown Progress Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-surface-line/40 overflow-hidden pointer-events-none">
            {!isPaused && (
              <motion.div
                key={`progress-${activeIdx}`}
                className="h-full bg-accent"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 4.5, ease: "linear" }}
              />
            )}
          </div>

          <span className="absolute left-0 top-0 h-full w-[4px] bg-accent" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono-ui text-xs text-accent uppercase tracking-widest font-semibold">
                    STAGE 0{activeIdx + 1} OF 0{steps.length}
                  </span>
                </div>
                <h3 className={`font-display text-3xl ${isDark ? "text-white" : "text-ink"} font-normal mb-1`}>
                  {activeStep.title}
                </h3>
              </div>

              <div className={`lg:col-span-8 border-t lg:border-t-0 lg:border-l ${isDark ? "border-cyan-500/20" : "border-surface-line"} pt-6 lg:pt-0 lg:pl-8`}>
                <p className={`text-lg ${isDark ? "text-[#94A3B8]" : "text-ink-muted"} leading-relaxed font-light`}>
                  {activeStep.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}





