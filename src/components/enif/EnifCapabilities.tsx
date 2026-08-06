"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { 
  Terminal, BrainCircuit, Layers, Server
} from "lucide-react";

const CAPABILITIES = [
  {
    index: "01",
    title: "Software Engineering",
    shortline: "Custom enterprise applications engineered for absolute reliability.",
    description: "We build bespoke software systems designed to eliminate operational friction and map perfectly to your unique business logic. Resilient, highly scalable, and structurally sound.",
    items: ["Process Digitisation", "Operational Tools", "Core Business Systems"],
    icon: Terminal
  },
  {
    index: "02",
    title: "Artificial Intelligence",
    shortline: "Data architectures and predictive models at scale.",
    description: "Unlock the latent value in your proprietary data. We architect intelligent systems and deploy predictive models designed to automate workflows and drive algorithmic decision making.",
    items: ["Data Architecture", "Predictive Modelling", "Workflow Automation"],
    icon: BrainCircuit
  },
  {
    index: "03",
    title: "Digital Platforms",
    shortline: "Scalable B2B and consumer ecosystem platforms.",
    description: "We engineer scalable platforms built for high-performance and zero downtime under immense load. Designed for massive consumer reach and intricate multi-tenant B2B architectures.",
    items: ["Platform Architecture", "Scalability Engineering", "B2B Ecosystems"],
    icon: Layers
  },
  {
    index: "04",
    title: "Cloud & Infrastructure",
    shortline: "Secure, highly available deployment environments.",
    description: "Mission-critical applications require an ironclad foundation. We design secure environments architected for maximum uptime, horizontal scalability, and zero-trust security.",
    items: ["Cloud Architecture", "DevOps Pipelines", "Zero-Trust Security"],
    icon: Server
  },
];

export default function EnifCapabilities() {
  const reduce = useReducedMotion();

  return (
    <section 
      id="capabilities" 
      className="py-24 md:py-32 lg:py-40 bg-[#0F172A] border-y border-[#334155]/50 relative"
    >
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <motion.div 
              initial={reduce ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 mb-6"
            >
              <span className="w-8 h-[2px] bg-[#38BDF8]" />
              <span className="text-[#38BDF8] font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-bold">Capabilities</span>
            </motion.div>
            <motion.h2 
              initial={reduce ? false : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-tech-display text-4xl sm:text-5xl md:text-6xl text-[#F8FAFC] leading-[1.05] tracking-[-0.03em]"
            >
              Institutional-Grade Engineering
            </motion.h2>
          </div>
          <motion.p 
            initial={reduce ? false : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#94A3B8] text-sm md:text-base max-w-md leading-relaxed font-light"
          >
            We architect, engineer, and scale complex technical systems for global enterprises. No gimmicks, just robust infrastructure.
          </motion.p>
        </div>

        {/* Industrial Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#334155]/50 border border-[#334155]/50 rounded-xl overflow-hidden">
          {CAPABILITIES.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.index}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#0F172A] p-8 md:p-12 hover:bg-[#152033] transition-colors duration-300 group flex flex-col h-full"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between mb-8">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[11px] text-[#94A3B8] tracking-widest uppercase">
                      0{cap.index}
                    </span>
                  </div>
                  <Icon className="text-[#334155] group-hover:text-[#38BDF8] transition-colors duration-300" size={32} strokeWidth={1.5} />
                </div>

                {/* Content */}
                <h3 className="font-tech-display text-2xl sm:text-3xl text-white mb-3 tracking-tight">
                  {cap.title}
                </h3>
                <p className="text-[#94A3B8] font-mono text-[11px] uppercase tracking-wide mb-6 opacity-70">
                  {cap.shortline}
                </p>
                <p className="text-[#CBD5E1] text-sm font-light leading-relaxed mb-10 flex-grow">
                  {cap.description}
                </p>

                {/* Capabilities List */}
                <div className="space-y-3 pt-6 border-t border-[#334155]/40 mt-auto">
                  {cap.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="w-1 h-1 rounded-full bg-[#38BDF8]/40" />
                      <span className="text-[13px] text-[#94A3B8]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
