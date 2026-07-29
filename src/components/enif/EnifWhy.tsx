"use client";

import React from "react";
import { motion } from "framer-motion";
import { SpotlightCard } from "../ui/SpotlightCard";
import { Globe } from "../ui/Globe";
import Icon from "../Icon";

const ease = [0.16, 1, 0.3, 1] as const;

const PILLARS = [
  {
    title: "Engineering First",
    description: "Architecture before code.",
    colSpan: "md:col-span-1",
  },
  {
    title: "Long-Term Thinking",
    description: "Built to evolve. Not rebuild.",
    colSpan: "md:col-span-1",
  },
  {
    title: "Global Delivery",
    description: "International leadership. Worldwide engineering capability.",
    colSpan: "md:col-span-2",
    hasGlobe: true,
  },
  {
    title: "Enterprise Standards",
    description: "Engineered to meet the strict compliance and operational demands of global enterprises.",
    colSpan: "md:col-span-2",
    isStandards: true,
  }
];

export default function EnifWhy() {
  return (
    <section id="why-enif" className="py-24 md:py-32 bg-[#04070D] border-b border-[#38BDF8]/10 relative overflow-hidden">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease }}
              className="font-display text-4xl md:text-5xl text-white leading-tight mb-6"
            >
              Why organisations choose ENIF.
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="max-w-sm pl-6 border-l border-[#38BDF8]/30"
          >
            <p className="text-[#38BDF8] font-display text-xl leading-snug">
              "Technology can be outsourced. Responsibility cannot."
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease, delay: i * 0.1 }}
              className={pillar.colSpan}
            >
              <SpotlightCard className={`h-full p-8 md:p-10 flex flex-col justify-between relative ${pillar.hasGlobe ? 'min-h-[320px]' : ''}`}>
                <div className="z-10 relative max-w-md">
                  <span className="text-[#38BDF8] font-mono-ui text-sm font-bold tracking-widest mb-4 block">
                    0{i + 1}
                  </span>
                  <h3 className="text-2xl font-display text-white mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-[#94A3B8] text-base md:text-lg">
                    {pillar.description}
                  </p>
                </div>
                {pillar.isStandards && (
                  <div className="mt-8 md:mt-0 md:absolute md:top-1/2 md:-translate-y-1/2 md:right-10 grid grid-cols-2 gap-4 w-full md:w-auto">
                    {[
                      { icon: "shield", label: "Security" },
                      { icon: "zap", label: "Performance" },
                      { icon: "activity", label: "Reliability" },
                      { icon: "lock", label: "Governance" }
                    ].map(std => (
                      <div key={std.label} className="flex flex-col items-center justify-center p-4 min-w-[120px] border border-[#38BDF8]/10 rounded-xl bg-[#38BDF8]/[0.03] shadow-inner shadow-[#38BDF8]/5">
                        <Icon name={std.icon as any} size={20} className="text-[#38BDF8] mb-2" />
                        <span className="text-[#F8FAFC] font-medium text-sm">{std.label}</span>
                      </div>
                    ))}
                  </div>
                )}
                {pillar.hasGlobe && (
                  <div className="mt-6 md:mt-0 md:absolute md:top-1/2 md:-translate-y-1/2 md:right-4 w-full md:w-[350px] h-[280px] flex items-center justify-center">
                    <Globe className="w-full h-full max-w-[280px]" />
                  </div>
                )}
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
