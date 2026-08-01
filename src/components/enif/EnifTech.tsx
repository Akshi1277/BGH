"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import OrbitingSkills from "../ui/orbiting-skills";

const ease = [0.16, 1, 0.3, 1] as const;

const TECH_LAYERS = [
  {
    layer: "Frontend & Interfaces",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "WebGL"]
  },
  {
    layer: "Backend & Systems",
    technologies: ["Node.js", "Python", "Go", "GraphQL", "RESTful APIs", "gRPC"]
  },
  {
    layer: "Data & AI Pipelines",
    technologies: ["PostgreSQL", "Redis", "Vector Databases", "TensorFlow", "PyTorch", "Kafka"]
  },
  {
    layer: "Infrastructure & Security",
    technologies: ["AWS", "Azure", "Kubernetes", "Docker", "Terraform", "Zero Trust Auth"]
  }
];

export default function EnifTech() {
  const reduce = useReducedMotion();

  return (
    <section id="tech" className="py-24 md:py-32 bg-[#04070D] border-b border-[#38BDF8]/10 overflow-hidden relative">
      {/* Deep Space Radial Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#081A33_0%,#05101F_40%,#04070D_80%)] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#38BDF8]/[0.07] blur-[120px] rounded-full pointer-events-none z-0" />
      
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        <div className="mb-8 md:mb-12 max-w-2xl text-center mx-auto">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-3 px-3 py-1 border border-[#38BDF8]/20 bg-[#38BDF8]/10 rounded-full mb-6 mx-auto"
          >
            <span className="w-1.5 h-1.5 bg-[#38BDF8] rounded-full animate-pulse" />
            <span className="font-mono text-[#38BDF8] text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold">
              System Architecture
            </span>
          </motion.div>

          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="font-display text-3xl md:text-5xl text-white leading-[1.18] tracking-[-0.01em]"
          >
            Enterprise Technology Stack.
          </motion.h2>
        </div>

        {/* 21st.dev Orbiting Skills Animated Component */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
          className="mb-16 mt-8"
        >
          <OrbitingSkills />
        </motion.div>

        {/* Enterprise Tech Layers integrated below the animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-white/5 bg-[#02040A]/50 backdrop-blur-sm rounded-xl overflow-hidden mt-8">
          {TECH_LAYERS.map((layer, i) => (
            <motion.div
              key={layer.layer}
              initial={reduce ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 md:p-8 border-b border-r border-white/5 flex flex-col hover:bg-[#38BDF8]/5 transition-colors duration-300 min-h-[220px]"
            >
              <div className="mb-6 border-b border-white/5 pb-4">
                <span className="font-mono text-[#38BDF8] text-[10px] tracking-widest font-bold block mb-2 opacity-80">
                  LAYER 0{i + 1}
                </span>
                <h3 className="font-display text-lg md:text-xl text-white font-medium">
                  {layer.layer}
                </h3>
              </div>
              
              <ul className="flex flex-col gap-2 flex-grow font-mono text-xs text-[#94A3B8]">
                {layer.technologies.map(tech => (
                  <li key={tech} className="flex items-center gap-3">
                    <span className="text-[#38BDF8]/40">├</span>
                    <span className="hover:text-white transition-colors duration-200">{tech}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
