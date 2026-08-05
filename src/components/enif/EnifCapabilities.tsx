"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Icon from "../Icon";

// Custom Apple-esque cubic bezier for UI elements
const springEase = [0.23, 1, 0.32, 1] as const;
const slowEase = [0.16, 1, 0.3, 1] as const;

const CAPABILITIES = [
  {
    index: "01",
    tag: "Software",
    title: "Software Engineering",
    shortline: "Custom enterprise applications.",
    description: "Custom enterprise applications engineered to eliminate operational friction and map perfectly to your business logic.",
    items: ["Process Digitisation", "Operational Tools", "Core Business Systems"],
    // Span 2 columns in the bento grid for the first item
    colSpan: "md:col-span-2 lg:col-span-8",
    height: "h-full min-h-[420px]"
  },
  {
    index: "02",
    tag: "AI & Data",
    title: "Artificial Intelligence",
    shortline: "Data systems and predictive models.",
    description: "Data architectures and predictive models designed to unlock insights and automate complex workflows.",
    items: ["Data Architecture", "Predictive Modelling", "Workflow Automation"],
    colSpan: "md:col-span-2 lg:col-span-4",
    height: "h-full min-h-[420px]"
  },
  {
    index: "03",
    tag: "Platforms",
    title: "Digital Platforms",
    shortline: "Scalable B2B and consumer systems.",
    description: "Scalable platforms built for high-performance and absolute reliability under immense load.",
    items: ["Platform Architecture", "Scalability", "B2B Ecosystems"],
    colSpan: "md:col-span-2 lg:col-span-4",
    height: "h-full min-h-[380px]"
  },
  {
    index: "04",
    tag: "Infrastructure",
    title: "Cloud & Infrastructure",
    shortline: "Secure, highly available environments.",
    description: "Secure, highly available environments architected for maximum uptime and zero-trust security.",
    items: ["Cloud Architecture", "DevOps Pipelines", "Zero-Trust Security"],
    colSpan: "md:col-span-2 lg:col-span-8",
    height: "h-full min-h-[380px]"
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: slowEase } }
};

export default function EnifCapabilities() {
  const reduce = useReducedMotion();

  return (
    <section id="capabilities" className="py-24 md:py-32 lg:py-40 bg-[#0B1121] relative overflow-hidden">
      {/* Ethereal Glass Background Elements */}
      <div className="absolute inset-0 bg-[#0B1121] pointer-events-none z-0" />

      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: slowEase }}
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-[#38BDF8]/40" />
              <span className="text-[#38BDF8] font-mono text-xs tracking-[0.2em] uppercase font-semibold">Capabilities</span>
            </div>
            <h2 className="font-tech-display text-4xl sm:text-5xl md:text-6xl text-white leading-[1.1] tracking-[-0.025em] max-w-2xl">
              Institutional-Grade Engineering
            </h2>
          </div>
          <p className="text-[#94A3B8] text-base md:text-lg max-w-md leading-relaxed font-light">
            We architect, engineer, and scale complex technical systems for global enterprises.
          </p>
        </motion.div>

        {/* Asymmetrical Bento Grid */}
        <motion.div 
          variants={reduce ? {} : containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6"
        >
          {CAPABILITIES.map((cap) => (
            <motion.div 
              key={cap.index}
              variants={itemVariants}
              className={`group ${cap.colSpan} ${cap.height}`}
            >
              {/* Solid Architectural Card */}
              <div className="h-full w-full bg-[#0F172A] rounded-[2rem] sm:rounded-[2.5rem] border border-[#334155] hover:border-[#475569] p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden transition-colors duration-500 z-10 group-hover:bg-[#1E293B]">
                  
                  {/* Top: Badges */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-white/[0.03] text-white/70 border border-white/[0.05] rounded-full font-mono text-[10px] sm:text-xs tracking-[0.18em] uppercase shadow-sm">
                        {cap.tag}
                      </span>
                    </div>
                    <span className="font-mono text-white/20 text-xs tracking-widest font-bold">
                      {cap.index}
                    </span>
                  </div>

                  {/* Bottom: Content */}
                  <div className="mt-12 sm:mt-16 relative z-10">
                    <h3 className="font-tech-display text-3xl sm:text-4xl text-[#F8FAFC] leading-[1.1] tracking-[-0.025em] mb-4">
                      {cap.title}
                    </h3>
                    <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed max-w-lg mb-4">
                      {cap.description}
                    </p>

                    {/* Key Outcomes Pills */}
                    <div className="flex flex-wrap gap-2.5">
                      {cap.items.map((item, idx) => (
                        <div 
                          key={idx}
                          className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-black/40 border border-white/[0.06] rounded-full group/pill hover:bg-white/[0.04] hover:border-white/[0.1] active:scale-[0.97] transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-default"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]/40 group-hover/pill:bg-[#38BDF8] transition-all duration-300" />
                          <span className="text-white/70 font-mono text-[10px] sm:text-xs tracking-wide">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Subtle noise/texture overlay for the editorial luxury feel */}
                  <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.015] pointer-events-none mix-blend-overlay" />
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
