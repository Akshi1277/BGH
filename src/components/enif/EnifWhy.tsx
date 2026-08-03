"use client";

import React from "react";
import { motion } from "framer-motion";
import { ContainerScroll, CardSticky } from "../ui/cards-stack";
import RotatingEarth from "../ui/wireframe-dotted-globe";

const ease = [0.16, 1, 0.3, 1] as const;

interface ScrollCardItem {
  id: string;
  tag: string;
  title: string;
  description: string;
  icon: string;
  visual: React.ReactNode;
}

const WHY_CARDS: ScrollCardItem[] = [
  {
    id: "01",
    tag: "APPROACH",
    title: "Purpose-Built Solutions",
    description: "We build systems tailored specifically to your business goals—eliminating unnecessary complexity and focusing purely on what drives value.",
    icon: "cpu",
    visual: (
      <div className="w-full max-w-full overflow-hidden p-4 rounded-2xl bg-[#02040A]/90 border border-white/10 text-xs shadow-inner">
        <div className="flex items-center justify-between text-[10px] font-mono text-[#38BDF8] mb-3 pb-2 border-b border-white/5">
          <span>BUSINESS ALIGNMENT</span>
          <span className="text-[#38BDF8] font-semibold">● DIRECT OWNERSHIP</span>
        </div>
        <div className="flex flex-col gap-2.5">
          {[
            {
              title: "Focused Execution",
              desc: "We prioritize your core business objectives over unnecessary, unproven technology.",
            },
            {
              title: "Clear Processes",
              desc: "Every system is designed to be easily understood and seamlessly adopted by your internal teams.",
            },
            {
              title: "Long-Term Flexibility",
              desc: "You retain complete control over your digital assets, ensuring agility as your business evolves.",
            },
          ].map((item, idx) => (
            <div key={idx} className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-0.5">
              <span className="text-white font-medium text-xs flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                {item.title}
              </span>
              <span className="text-[#94A3B8] text-[11px] font-light leading-relaxed pl-3.5">
                {item.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "02",
    tag: "LONGEVITY",
    title: "Built to Evolve, Not Rebuild",
    description: "Our approach ensures your digital platforms can grow and adapt seamlessly, avoiding the costly cycle of complete system replacements.",
    icon: "layers",
    visual: (
      <div className="w-full max-w-full overflow-hidden p-4 rounded-2xl bg-[#02040A]/90 border border-white/10 shadow-inner">
        <div className="flex items-center justify-between text-[10px] font-mono text-[#38BDF8] mb-3 pb-2 border-b border-white/5">
          <span>ADAPTIVE FOUNDATIONS</span>
          <span className="text-[#38BDF8] font-semibold">● FUTURE-PROOF</span>
        </div>
        <div className="grid grid-cols-1 gap-2 text-xs">
          {[
            {
              title: "Flexible Architecture",
              desc: "Business rules are designed to accommodate rapid change without disrupting your daily operations.",
            },
            {
              title: "Seamless Transitions",
              desc: "New capabilities are introduced smoothly, ensuring your team and customers experience zero friction.",
            },
            {
              title: "Continuous Optimization",
              desc: "We proactively monitor performance to guarantee consistent, high-quality experiences day after day.",
            },
          ].map((item, idx) => (
            <div key={idx} className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-0.5">
              <span className="text-white font-medium text-xs flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                {item.title}
              </span>
              <span className="text-[#94A3B8] text-[11px] font-light leading-relaxed pl-3.5">
                {item.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "03",
    tag: "RELIABILITY",
    title: "Uninterrupted Performance",
    description: "Consistent, high-speed performance across all regions, ensuring your team and customers have reliable access whenever they need it.",
    icon: "globe",
    visual: (
      <div className="w-full max-w-full overflow-hidden rounded-2xl bg-[#02040A]/90 border border-white/10 shadow-inner">
        <div className="flex items-center justify-between text-[10px] font-mono text-[#38BDF8] px-4 pt-4">
          <span>GLOBAL ACCESSIBILITY</span>
          <span className="text-[#38BDF8] font-semibold">● ALWAYS ONLINE</span>
        </div>
        <RotatingEarth
          width={360}
          height={220}
          enableZoom={false}
          className="w-full h-48 sm:h-52"
        />
      </div>
    ),
  },
  {
    id: "04",
    tag: "TRUST",
    title: "Built-In Safety & Governance",
    description: "Comprehensive safety protocols integrated from day one, providing absolute peace of mind for you, your stakeholders, and your clients.",
    icon: "shield",
    visual: (
      <div className="w-full max-w-full overflow-hidden p-4 rounded-2xl bg-[#02040A]/90 border border-white/10 shadow-inner">
        <div className="flex items-center justify-between text-[10px] font-mono text-[#38BDF8] mb-3 pb-2 border-b border-white/5">
          <span>SECURITY & COMPLIANCE</span>
          <span className="text-[#38BDF8] font-semibold">● PROTECTED</span>
        </div>
        <div className="grid grid-cols-1 gap-2 text-xs">
          {[
            {
              title: "Transparent Operations",
              desc: "Every action within the system is carefully logged, providing a clear and reliable operational history.",
            },
            {
              title: "Data Privacy Focus",
              desc: "Client information is kept strictly separated, ensuring absolute confidentiality and regulatory compliance.",
            },
            {
              title: "Proactive Protection",
              desc: "Foundational safety measures are embedded natively to protect against modern business risks.",
            },
          ].map((item, idx) => (
            <div key={idx} className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-0.5">
              <span className="text-white font-medium text-xs flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                {item.title}
              </span>
              <span className="text-[#94A3B8] text-[11px] font-light leading-relaxed pl-3.5">
                {item.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

export default function EnifWhy() {
  return (
    <section id="why-enif" className="bg-[#04070D] border-b border-[#38BDF8]/10 relative">
      {/* Deep Space Radial Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#081A33_0%,#05101F_40%,#04070D_80%)]" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[300px] bg-[#38BDF8]/[0.07] blur-[100px] rounded-full" />
      </div>

      <div className="max-w-[var(--spacing-container-max)] mx-auto px-4 sm:px-margin-mobile md:px-margin-desktop relative z-10 pt-14 md:pt-32">
        
        <div className="grid md:grid-cols-12 md:gap-12 items-start">
          
          {/* Section Header (Sticky on Desktop) */}
          <div className="md:col-span-5 md:sticky md:top-32 md:h-fit mb-8 md:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#38BDF8]/30 bg-[#38BDF8]/10 mb-4 sm:mb-6 backdrop-blur-md"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#38BDF8] font-semibold">
                The ENIF Advantage
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease, delay: 0.1 }}
              className="font-display text-3xl sm:text-4xl md:text-6xl text-white leading-[1.15] tracking-[-0.01em] mb-4 sm:mb-6"
            >
              Why Organisations Choose ENIF.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease, delay: 0.2 }}
              className="text-[#94A3B8] text-sm md:text-lg leading-relaxed tracking-[0.01em] font-light max-w-lg"
            >
              We design software systems focused purely on business outcomes. Unmatched reliability, effortless scalability, and complete alignment with your operational goals.
            </motion.p>
          </div>

          {/* Scroll-Driven Card Stack */}
          <div className="md:col-span-7 w-full">
            <ContainerScroll className="min-h-[220vh] md:min-h-[300vh] flex flex-col gap-4 sm:gap-6 md:gap-8 pb-16 md:pb-32">
              {WHY_CARDS.map((card, index) => (
                <CardSticky
                  key={card.id}
                  index={index}
                  incrementY={28}
                  className="rounded-2xl sm:rounded-3xl border border-[#38BDF8]/30 bg-[#04070D]/95 p-5 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] w-full antialiased"
                >
                  <div className="flex flex-col gap-4 sm:gap-8 items-start w-full max-w-full">
                    <div className="flex items-center justify-between gap-4 w-full mb-1 sm:mb-2">
                      <div className="px-2.5 py-1 bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/30 rounded-full font-mono text-[9px] sm:text-[10px] tracking-widest uppercase font-bold">
                        {card.tag}
                      </div>
                      <h3 className="text-xl sm:text-3xl font-bold text-[#38BDF8] opacity-60 font-mono">
                        {String(index + 1).padStart(2, "0")}
                      </h3>
                    </div>
                    
                    <div className="w-full max-w-full">
                      <h3 className="font-display text-lg sm:text-2xl md:text-3xl font-medium tracking-[-0.01em] text-white mb-2 sm:mb-4 subpixel-antialiased">
                        {card.title}
                      </h3>

                      <p className="text-[#CBD5E1] text-xs sm:text-sm md:text-base leading-relaxed mb-4 sm:mb-8 font-normal subpixel-antialiased">
                        {card.description}
                      </p>

                      <div className="w-full max-w-full overflow-hidden">
                        {card.visual}
                      </div>
                    </div>
                  </div>
                </CardSticky>
              ))}
            </ContainerScroll>
          </div>

        </div>

      </div>
    </section>
  );
}
