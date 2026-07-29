"use client";

import React from "react";
import { motion } from "framer-motion";
import { Waves } from "../reactbits/Waves";

const ease = [0.16, 1, 0.3, 1] as const;

export default function EnifPhilosophy() {
  return (
    <section id="philosophy" className="py-24 md:py-32 bg-[#04070D] border-b border-[#38BDF8]/10 relative overflow-hidden">
      {/* React Bits Waves background */}
      <Waves lineColor="rgba(56, 189, 248, 0.08)" waveSpeedX={0.015} waveAmpY={30} className="opacity-70" />

      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease }}
              className="font-display text-4xl md:text-5xl text-white mb-6"
            >
              Our Philosophy
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease, delay: 0.1 }}
              className="text-[#94A3B8] text-lg md:text-xl leading-relaxed mb-8 font-light"
            >
              We believe exceptional software is invisible. The greatest technology removes friction, simplifies complexity and enables people to achieve more with less effort.
            </motion.p>
          </div>
          
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease, delay: 0.2 }}
              className="w-full rounded-2xl border border-[#38BDF8]/20 bg-[#04070D]/90 backdrop-blur-md shadow-[0_0_40px_rgba(56,189,248,0.15)] overflow-hidden"
            >
              <div className="flex items-center px-4 py-3 border-b border-[#38BDF8]/20 bg-[#38BDF8]/5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                </div>
                <div className="mx-auto text-xs font-mono text-[#38BDF8]/60">enif-sys-core.ts</div>
              </div>
              <div className="p-6 font-mono text-sm md:text-base leading-relaxed text-[#38BDF8]/70">
                <p><span className="text-[#38BDF8]">const</span> <span className="text-white">corePrinciple</span> = <span className="text-green-400">"Simplicity through engineering"</span>;</p>
                <br />
                <p><span className="text-[#38BDF8]">function</span> <span className="text-yellow-200">buildSystem</span>() {'{'}</p>
                <p className="pl-4">removeFriction();</p>
                <p className="pl-4">simplifyComplexity();</p>
                <p className="pl-4">enableHumanPotential();</p>
                <p className="pl-4"><span className="text-[#38BDF8]">return</span> <span className="text-white">InvisibleSoftware</span>;</p>
                <p>{'}'}</p>
                <br />
                <p className="animate-pulse">_</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
