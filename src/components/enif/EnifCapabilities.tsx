"use client";

import React from "react";
import { motion } from "framer-motion";
import { SpotlightCard } from "../ui/SpotlightCard";
import Icon from "../Icon";

import DotField from "../reactbits/DotField";

const ease = [0.16, 1, 0.3, 1] as const;

export default function EnifCapabilities() {
  return (
    <section id="capabilities" className="py-24 md:py-32 bg-[#04070D] text-white border-b border-[#38BDF8]/10 relative overflow-hidden">
      {/* Background radial for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.05),transparent_50%)] pointer-events-none z-0" />
      
      {/* Interactive DotField Background */}
      <div className="absolute inset-0 z-0 opacity-100 pointer-events-none">
        <DotField
          dotRadius={1.5}
          dotSpacing={14}
          cursorRadius={500}
          cursorForce={0.1}
          bulgeOnly={true}
          bulgeStrength={67}
          glowRadius={160}
          waveAmplitude={0}
          sparkle={false}
          gradientFrom="rgba(56, 189, 248, 0.85)"
          gradientTo="rgba(56, 189, 248, 0.55)"
          glowColor="#04070D"
        />
      </div>

      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        <div className="mb-16 md:mb-24 max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease }}
            className="font-display text-3xl md:text-5xl leading-tight mb-6"
          >
            Engineering across the entire product lifecycle.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="text-[#94A3B8] text-lg md:text-xl leading-relaxed font-light"
          >
            Every engagement combines strategic thinking, product design and enterprise-grade engineering into one disciplined delivery model. We take responsibility from first principle through to production—and beyond.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Software Engineering */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
          >
            <SpotlightCard className="h-full p-8 md:p-10 flex flex-col justify-between">
              <div>
                <span className="text-[#38BDF8] font-mono-ui text-sm font-bold tracking-widest mb-4 block">
                  01
                </span>
                <h3 className="text-2xl font-display mb-4">Software Engineering</h3>
                <p className="text-[#94A3B8] text-sm md:text-base leading-relaxed mb-6">
                  Enterprise software engineered for performance, resilience and long-term maintainability. We design bespoke digital products tailored to the operational requirements of modern organisations—not constrained by off-the-shelf solutions.
                </p>
              </div>
              <ul className="space-y-2 mt-4 text-sm text-white/70">
                {["Enterprise Platforms", "Business Systems", "Customer Portals", "Mobile Applications", "Internal Platforms", "Cloud-native Applications"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Icon name="arrow-right" size={14} className="text-[#38BDF8]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </motion.div>

          {/* Card 2: Artificial Intelligence */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
          >
            <SpotlightCard className="h-full p-8 md:p-10 flex flex-col justify-between">
              <div>
                <span className="text-[#38BDF8] font-mono-ui text-sm font-bold tracking-widest mb-4 block">
                  02
                </span>
                <h3 className="text-2xl font-display mb-4">Artificial Intelligence</h3>
                <p className="text-[#94A3B8] text-sm md:text-base leading-relaxed mb-6">
                  Practical intelligence. Commercial impact. Our AI capabilities automate workflows, enhance decision-making, and unlock new revenue streams. We move beyond the hype to build robust, scalable AI solutions.
                </p>
              </div>
              <ul className="space-y-2 mt-4 text-sm text-white/70">
                {["Predictive Analytics", "Large Language Models", "Process Automation", "Computer Vision", "Machine Learning Ops", "Data Engineering"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Icon name="arrow-right" size={14} className="text-[#38BDF8]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
