"use client";

import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Copy, Check } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const TERMINAL_LINES = [
  { type: "comment", text: "// Architecture Before Code" },
  { type: "command", text: "enif init --rigorous" },
  { type: "output", text: "→ Initializing enterprise architecture..." },
  { type: "output", text: "→ Mapping constraints... Done." },
  { type: "comment", text: "// Technology Should Reduce Complexity" },
  { type: "command", text: "enif optimize --simplify" },
  { type: "output", text: "→ Resolving technical debt... Eliminated." },
  { type: "comment", text: "// Responsibility Outlives Deployment" },
  { type: "command", text: "enif deploy --long-term" },
  { type: "output", text: "→ Securing systems for multi-year horizon." },
  { type: "success", text: "✓ Engineering complete. Systems optimal." },
];

function InteractiveCodeTerminal() {
  const [displayedLines, setDisplayedLines] = useState<number>(0);
  const [copied, setCopied] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      setDisplayedLines(TERMINAL_LINES.length);
      return;
    }

    let current = 0;
    const interval = setInterval(() => {
      if (current < TERMINAL_LINES.length) {
        setDisplayedLines(current + 1);
        current++;
      } else {
        clearInterval(interval);
      }
    }, 600);

    return () => clearInterval(interval);
  }, [reduce]);

  const handleCopy = () => {
    navigator.clipboard.writeText("enif init --rigorous && enif optimize --simplify && enif deploy --long-term");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-[#38BDF8]/20 bg-[#02040A] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#081A33]/80 border-b border-[#38BDF8]/20 backdrop-blur-sm">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="font-mono text-[10px] text-[#94A3B8] tracking-widest">
          enif-core-sys
        </div>
        <button
          onClick={handleCopy}
          className="text-[#94A3B8] hover:text-[#38BDF8] transition-colors"
          title="Copy command"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>

      {/* Terminal Body */}
      <div className="p-5 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto">
        <div className="flex flex-col gap-2 min-h-[240px]">
          {TERMINAL_LINES.slice(0, displayedLines).map((line, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex gap-3 whitespace-nowrap ${
                line.type === "comment"
                  ? "text-[#64748B] mt-2"
                  : line.type === "command"
                  ? "text-white font-semibold"
                  : line.type === "success"
                  ? "text-[#38BDF8] font-semibold mt-2"
                  : "text-[#38BDF8]/80"
              }`}
            >
              {line.type === "command" && (
                <span className="text-[#38BDF8] select-none">$</span>
              )}
              <span>{line.text}</span>
            </motion.div>
          ))}
          {displayedLines < TERMINAL_LINES.length && (
            <motion.div
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-2 h-4 bg-[#38BDF8] ml-5 mt-1"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function EnifPhilosophy() {
  const reduce = useReducedMotion();

  return (
    <section id="philosophy" className="py-24 md:py-32 bg-[#04070D] text-[#F8FAFC] relative overflow-hidden border-b border-[#38BDF8]/10">
      {/* Deep Space Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#081A33_0%,#05101F_40%,#04070D_80%)] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[400px] bg-[#38BDF8]/[0.05] blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          <div className="lg:col-span-5">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease }}
              className="inline-flex items-center gap-3 mb-8"
            >
              <span className="w-8 h-px bg-[#38BDF8]" />
              <span className="font-mono text-[#38BDF8] text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold">
                Philosophy
              </span>
            </motion.div>

            <motion.h2
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl text-[#F8FAFC] leading-[1.05] tracking-[-0.03em] mb-6"
            >
              Principles of Engineering.
            </motion.h2>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease, delay: 0.2 }}
              className="text-[#94A3B8] text-lg md:text-xl leading-relaxed tracking-wide mb-12 font-light max-w-xl"
            >
              Thoughtful systems outperform fashionable technology. We build for the long term.
            </motion.p>
            
            <div className="flex flex-col gap-8">
              {[
                {
                  title: "Architecture Before Code",
                  desc: "True engineering requires rigorous system design, constraint mapping, and data modeling."
                },
                {
                  title: "Technology Should Reduce Complexity",
                  desc: "We engineer systems that clarify and simplify your business, rather than adding layers of debt."
                },
                {
                  title: "Responsibility Outlives Deployment",
                  desc: "We design systems to be secure, reliable, and scalable over a multi-year horizon."
                }
              ].map((tenet, idx) => (
                <motion.div 
                  key={idx}
                  initial={reduce ? false : { opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, ease, delay: 0.1 + (idx * 0.1) }}
                  className="group flex gap-4"
                >
                  <div className="mt-1 font-mono text-[10px] text-[#38BDF8] font-bold tracking-widest shrink-0">
                    0{idx + 1}
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-white mb-2">
                      {tenet.title}
                    </h3>
                    <p className="text-[#64748B] text-sm md:text-base leading-relaxed font-light">
                      {tenet.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 mt-8 lg:mt-0">
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.95, rotateY: 5 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease }}
              style={{ perspective: 1000 }}
            >
              <InteractiveCodeTerminal />
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
