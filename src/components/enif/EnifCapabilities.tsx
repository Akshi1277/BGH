"use client";

import React from "react";
import { motion } from "framer-motion";
import { GradientCard } from "../ui/gradient-card";

const ease = [0.16, 1, 0.3, 1] as const;

export default function EnifCapabilities() {
  return (
    <section id="capabilities" className="py-24 md:py-32 bg-[#0A101F] text-[#F8FAFC] border-b border-[#38BDF8]/10 relative overflow-hidden">
      {/* Seamless Camouflage Gradient Blend & Ambient Space Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0D1B36_0%,#0A101F_40%,#04070D_80%)] pointer-events-none z-0" />
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#081A33] to-transparent pointer-events-none z-0" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#38BDF8]/[0.05] blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        <div className="mb-16 md:mb-24 max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease }}
            className="font-display text-3xl md:text-5xl leading-[1.18] tracking-[-0.01em] mb-6 text-white"
          >
            Engineering across the entire product lifecycle.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="text-[#94A3B8] text-lg md:text-xl leading-relaxed tracking-[0.01em] font-light max-w-2xl"
          >
            Every engagement combines strategic thinking, product design and enterprise-grade engineering into one disciplined delivery model. We take responsibility from first principle through to production—and beyond.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: Software Engineering */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="h-full flex"
          >
            <GradientCard
              index="01"
              title="Software Engineering"
              description="Enterprise software engineered for performance, resilience and long-term maintainability. We design bespoke digital products tailored to the operational requirements of modern organisations—not constrained by off-the-shelf solutions."
              items={[
                "Enterprise Platforms",
                "Business Systems",
                "Customer Portals",
                "Mobile Applications",
                "Internal Platforms",
                "Cloud-native Applications"
              ]}
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l9 5v10l-9 5-9-5V7l9-5z" />
                  <path d="M3 7l9 5 9-5M12 12v9" />
                </svg>
              }
            />
          </motion.div>

          {/* Card 2: Artificial Intelligence */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="h-full flex"
          >
            <GradientCard
              index="02"
              title="Artificial Intelligence"
              description="Practical intelligence. Commercial impact. Our AI capabilities automate workflows, enhance decision-making, and unlock new revenue streams. We move beyond the hype to build robust, scalable AI solutions."
              items={[
                "Predictive Analytics",
                "Large Language Models",
                "Process Automation",
                "Computer Vision",
                "Machine Learning Ops",
                "Data Engineering"
              ]}
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="7" y="7" width="10" height="10" rx="1.5" />
                  <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
                </svg>
              }
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
