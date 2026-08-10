"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const STEPS = [
  { id: "01", name: "Discover", detail: "Business alignment & constraint mapping" },
  { id: "02", name: "Research", detail: "Technical feasibility & market analysis" },
  { id: "03", name: "Architecture", detail: "System design & data modeling" },
  { id: "04", name: "Design", detail: "Interface & user experience mapping" },
  { id: "05", name: "Engineering", detail: "Core development & integration" },
  { id: "06", name: "Validation", detail: "Security, load & QA testing" },
  { id: "07", name: "Deployment", detail: "Phased rollout & monitoring" },
  { id: "08", name: "Improvement", detail: "Optimization & scaling" }
];

export default function EnifMethod() {
  const reduce = useReducedMotion();

  return (
    <section id="method" className="py-24 md:py-32 lg:py-40 bg-[#0F172A] border-y border-[#334155]/50 relative">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        
        {/* Header */}
        <div className="mb-20 max-w-2xl">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <span className="w-8 h-[2px] bg-[#38BDF8]" />
            <span className="font-mono text-[#38BDF8] text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold">
              Delivery Framework
            </span>
          </motion.div>

          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-tech-display text-4xl sm:text-5xl md:text-6xl text-[#F8FAFC] leading-[1.05] tracking-[-0.03em] mb-6"
          >
            The Engineering Method.
          </motion.h2>
          
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#94A3B8] text-sm md:text-base leading-relaxed tracking-[0.01em] font-light"
          >
            We don't just write code. We engineer systems. Our methodology ensures architecture precedes development, and operational excellence continues long after deployment.
          </motion.p>
        </div>

        {/* Mechanical Timeline */}
        <div className="relative pl-6 md:pl-8">
          {/* Vertical Base Line */}
          <div className="absolute top-0 bottom-0 left-[7px] w-px bg-[#334155]/50" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
            {STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={reduce ? false : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.1 }}
                className="relative flex flex-col group"
              >
                {/* Node Connector */}
                <div className="absolute top-1.5 -left-[30px] md:-left-[38px] w-4 h-4 rounded-none border border-[#38BDF8] bg-[#04070D] flex items-center justify-center transition-colors duration-300 group-hover:bg-[#38BDF8]">
                  <div className="w-1 h-1 bg-[#38BDF8] group-hover:bg-[#04070D] transition-colors duration-300" />
                </div>
                {/* Horizontal Tick */}
                <div className="absolute top-[13px] -left-[14px] md:-left-[22px] w-[14px] md:w-[22px] h-px bg-[#334155]/50" />

                {/* Content */}
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[10px] text-[#64748B] tracking-widest uppercase">
                    {step.id}
                  </span>
                  <span className="font-tech-display text-xl sm:text-2xl text-white tracking-tight">
                    {step.name}
                  </span>
                  <span className="text-[#94A3B8] font-mono text-[11px] leading-relaxed mt-2 opacity-80 border-t border-[#334155]/30 pt-3">
                    {step.detail}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
