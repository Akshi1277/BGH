"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import RotatingEarth from "../ui/wireframe-dotted-globe";

const WHY_ITEMS = [
  {
    id: "01",
    tag: "APPROACH",
    title: "Purpose-Built Solutions",
    description: "We build systems tailored specifically to your business goals—eliminating unnecessary complexity and focusing purely on what drives value. Every system is designed to be easily understood and seamlessly adopted by your internal teams.",
    metrics: [
      { label: "Business Alignment", value: "100%" },
      { label: "Direct Ownership", value: "Client-held" }
    ]
  },
  {
    id: "02",
    tag: "LONGEVITY",
    title: "Built to Evolve, Not Rebuild",
    description: "Our approach ensures your digital platforms can grow and adapt seamlessly, avoiding the costly cycle of complete system replacements. Business rules are designed to accommodate rapid change without disrupting operations.",
    metrics: [
      { label: "Adaptive Foundations", value: "Modular" },
      { label: "Architecture", value: "Future-proof" }
    ]
  },
  {
    id: "03",
    tag: "RELIABILITY",
    title: "Uninterrupted Performance",
    description: "Consistent, high-speed performance across all regions, ensuring your team and customers have reliable access whenever they need it. We proactively monitor performance to guarantee consistent, high-quality experiences.",
    metrics: [
      { label: "Global Uptime", value: "99.999%" },
      { label: "Latency Target", value: "<50ms" }
    ]
  },
  {
    id: "04",
    tag: "TRUST",
    title: "Built-In Safety & Governance",
    description: "Comprehensive safety protocols integrated from day one, providing absolute peace of mind for you, your stakeholders, and your clients. Client information is kept strictly separated, ensuring regulatory compliance.",
    metrics: [
      { label: "Security Protocol", value: "Zero-Trust" },
      { label: "Compliance", value: "Enterprise Grade" }
    ]
  },
];

export default function EnifWhy() {
  const reduce = useReducedMotion();

  return (
    <section id="why-enif" className="py-24 md:py-32 lg:py-40 bg-[#04070D] border-b border-[#334155]/50 relative">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-24 max-w-2xl">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <span className="w-8 h-[2px] bg-[#38BDF8]" />
            <span className="font-mono text-[#38BDF8] text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold">
              The ENIF Advantage
            </span>
          </motion.div>
          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-tech-display text-4xl sm:text-5xl md:text-6xl text-[#F8FAFC] leading-[1.05] tracking-[-0.03em] mb-6"
          >
            Why Organisations Choose ENIF.
          </motion.h2>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#94A3B8] text-sm md:text-base leading-relaxed tracking-[0.01em] font-light"
          >
            We design software systems focused purely on business outcomes. Unmatched reliability, effortless scalability, and complete alignment with your operational goals.
          </motion.p>
        </div>

        {/* Dashboard Layout: Left Cards, Right Globe */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Data Cards */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {WHY_ITEMS.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={reduce ? false : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 md:p-8 bg-[#04070D] border border-[#334155]/50 rounded-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="font-mono text-[10px] text-[#38BDF8] tracking-widest font-bold">
                    {item.tag}
                  </div>
                </div>
                
                <h3 className="font-tech-display text-xl sm:text-2xl text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-[#94A3B8] text-sm font-light leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#334155]/30">
                  {item.metrics.map((metric, mIdx) => (
                    <div key={mIdx}>
                      <div className="font-mono text-[9px] text-[#64748B] uppercase tracking-widest mb-1">
                        {metric.label}
                      </div>
                      <div className="font-mono text-xs text-[#F8FAFC]">
                        {metric.value}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Sticky Globe Display */}
          <div className="lg:col-span-6 lg:sticky lg:top-32 h-[400px] lg:h-[600px] bg-[#04070D] border border-[#334155]/50 rounded-xl overflow-hidden flex flex-col relative">
            
            {/* Control Panel Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#334155]/50 bg-[#0F172A]">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] text-[#38BDF8] tracking-widest font-bold uppercase">
                  Global Infrastructure
                </span>
              </div>
            </div>

            {/* Globe Container */}
            <div className="flex-1 relative flex items-center justify-center overflow-hidden">
              <RotatingEarth
                width={500}
                height={500}
                enableZoom={false}
                className="w-[120%] h-[120%] md:w-full md:h-full object-cover mix-blend-screen opacity-80"
              />
              
              {/* Overlay Crosshairs */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-0 right-0 h-px bg-[#38BDF8]/10" />
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#38BDF8]/10" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-[#38BDF8]/20 rounded-full" />
              </div>
            </div>

            {/* Status Footer */}
            <div className="grid grid-cols-3 border-t border-[#334155]/50 bg-[#0F172A] divide-x divide-[#334155]/50">
              <div className="px-4 py-3 flex flex-col items-center justify-center">
                <span className="font-mono text-[9px] text-[#64748B] uppercase tracking-widest mb-1">Nodes</span>
                <span className="font-mono text-xs text-white">ACTIVE</span>
              </div>
              <div className="px-4 py-3 flex flex-col items-center justify-center">
                <span className="font-mono text-[9px] text-[#64748B] uppercase tracking-widest mb-1">Latency</span>
                <span className="font-mono text-xs text-[#38BDF8]">12ms</span>
              </div>
              <div className="px-4 py-3 flex flex-col items-center justify-center">
                <span className="font-mono text-[9px] text-[#64748B] uppercase tracking-widest mb-1">Sync</span>
                <span className="font-mono text-xs text-white">100%</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
