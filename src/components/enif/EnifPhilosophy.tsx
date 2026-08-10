"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const PRINCIPLES = [
  {
    title: "Architecture Before Code.",
    desc: "True engineering requires rigorous system design, constraint mapping, and data modeling. We do not write a single line of logic until the foundation is proven sound."
  },
  {
    title: "Reduce Complexity.",
    desc: "Technology is often used to mask organizational chaos. We engineer systems that clarify and simplify your business, deliberately eliminating layers of technical debt."
  },
  {
    title: "Responsibility Outlives Deployment.",
    desc: "A launch is a beginning, not an end. We design systems to be secure, reliable, and scalable over a multi-year horizon, taking full accountability for their long-term performance."
  }
];

export default function EnifPhilosophy() {
  const reduce = useReducedMotion();

  return (
    <section id="philosophy" className="py-32 md:py-48 bg-[#04070D] text-[#F8FAFC] relative overflow-hidden border-b border-[#334155]/50">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Bold Typographic Statement */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 mb-8"
            >
              <span className="w-8 h-[2px] bg-[#38BDF8]" />
              <span className="font-mono text-[#38BDF8] text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold">
                Philosophy
              </span>
            </motion.div>

            <motion.h2
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-tech-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[0.95] tracking-[-0.04em] mb-8"
            >
              Principles of Engineering.
            </motion.h2>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#94A3B8] text-lg md:text-xl leading-relaxed font-light max-w-sm"
            >
              Thoughtful systems outperform fashionable technology. We build for the long term.
            </motion.p>
          </div>

          {/* Right Column: Brutally Minimal Principles */}
          <div className="lg:col-span-7 flex flex-col gap-16 md:gap-24">
            {PRINCIPLES.map((tenet, idx) => (
              <motion.div 
                key={idx}
                initial={reduce ? false : { opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 + (idx * 0.1) }}
                className="group relative"
              >
                {/* Number Watermark */}
                <div className="absolute -left-4 md:-left-12 -top-8 font-tech-display text-8xl md:text-9xl text-[#334155]/20 select-none z-0 tracking-tighter">
                  0{idx + 1}
                </div>
                
                <div className="relative z-10 pl-4 md:pl-0">
                  <h3 className="font-tech-display text-2xl md:text-3xl text-white mb-4 tracking-tight">
                    {tenet.title}
                  </h3>
                  <div className="w-12 h-px bg-[#38BDF8] mb-6" />
                  <p className="text-[#94A3B8] text-base md:text-lg leading-relaxed font-light">
                    {tenet.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
