"use client";

import React, { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

function InteractiveCodeTerminal() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-80px" });
  const [activeStep, setActiveStep] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  // Re-run execution animation every time section enters viewport
  useEffect(() => {
    if (!isInView) {
      setActiveStep(0);
      return;
    }

    const timers: NodeJS.Timeout[] = [];
    
    // Step 0: Const declaration (0ms)
    // Step 1: Function header (400ms)
    timers.push(setTimeout(() => setActiveStep(1), 400));
    // Step 2: removeFriction() executed (900ms)
    timers.push(setTimeout(() => setActiveStep(2), 900));
    // Step 3: simplifyComplexity() executed (1400ms)
    timers.push(setTimeout(() => setActiveStep(3), 1400));
    // Step 4: enableHumanPotential() executed (1900ms)
    timers.push(setTimeout(() => setActiveStep(4), 1900));
    // Step 5: Return statement (2400ms)
    timers.push(setTimeout(() => setActiveStep(5), 2400));
    // Step 6: Complete (2800ms)
    timers.push(setTimeout(() => setActiveStep(6), 2800));

    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  const handleReRun = () => {
    setActiveStep(0);
    setTimeout(() => setActiveStep(1), 300);
    setTimeout(() => setActiveStep(2), 800);
    setTimeout(() => setActiveStep(3), 1300);
    setTimeout(() => setActiveStep(4), 1800);
    setTimeout(() => setActiveStep(5), 2300);
    setTimeout(() => setActiveStep(6), 2700);
  };

  const handleCopy = () => {
    const codeText = `const corePrinciple = "Simplicity through engineering";\n\nfunction buildSystem() {\n  removeFriction();\n  simplifyComplexity();\n  enableHumanPotential();\n  return InvisibleSoftware;\n}`;
    navigator.clipboard.writeText(codeText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div ref={containerRef} className="w-full rounded-2xl border border-[#38BDF8]/30 bg-[#04070D]/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
      {/* Terminal macOS Titlebar Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#38BDF8]/20 bg-[#08101E]/90">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors shadow-[0_0_8px_rgba(239,68,68,0.5)] cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors shadow-[0_0_8px_rgba(234,179,8,0.5)] cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition-colors shadow-[0_0_8px_rgba(16,185,129,0.5)] cursor-pointer" />
        </div>

      

       
      </div>

      {/* Code Editor Body */}
      <div className="p-6 sm:p-8 font-mono text-xs sm:text-sm md:text-base leading-relaxed text-[#F8FAFC] select-none">
        {/* Line 1 */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={activeStep >= 0 ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-3 py-0.5"
        >
          <span className="text-[#38BDF8]/40 text-xs w-5 text-right shrink-0">1</span>
          <p>
            <span className="text-[#38BDF8] font-bold">const</span>{" "}
            <span className="text-white font-semibold">corePrinciple</span> ={" "}
            <span className="text-emerald-400 font-medium drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]">
              "Simplicity through engineering"
            </span>
            ;
          </p>
        </motion.div>

        {/* Blank line */}
        <div className="py-1" />

        {/* Line 3: Function declaration */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={activeStep >= 1 ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-3 py-0.5"
        >
          <span className="text-[#38BDF8]/40 text-xs w-5 text-right shrink-0">2</span>
          <p>
            <span className="text-[#38BDF8] font-bold">function</span>{" "}
            <span className="text-yellow-300 font-bold">buildSystem</span>() {"{"}
          </p>
        </motion.div>

        {/* Line 4: removeFriction() */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={activeStep >= 2 ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.3 }}
          className={`flex items-center justify-between py-1 px-2 rounded-lg transition-colors duration-300 ${
            activeStep === 2 ? "bg-[#38BDF8]/15 border-l-2 border-[#38BDF8]" : "hover:bg-white/5"
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="text-[#38BDF8]/40 text-xs w-5 text-right shrink-0">3</span>
            <p className="pl-4 text-[#38BDF8]">
              <span className="text-sky-300">removeFriction</span>();
            </p>
          </div>
          {activeStep >= 2 && (
            <span className="text-emerald-400 font-mono text-[10px] tracking-wider uppercase flex items-center gap-1 font-bold">
              <span>✓ EXECUTED</span>
            </span>
          )}
        </motion.div>

        {/* Line 5: simplifyComplexity() */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={activeStep >= 3 ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.3 }}
          className={`flex items-center justify-between py-1 px-2 rounded-lg transition-colors duration-300 ${
            activeStep === 3 ? "bg-[#38BDF8]/15 border-l-2 border-[#38BDF8]" : "hover:bg-white/5"
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="text-[#38BDF8]/40 text-xs w-5 text-right shrink-0">4</span>
            <p className="pl-4 text-[#38BDF8]">
              <span className="text-sky-300">simplifyComplexity</span>();
            </p>
          </div>
          {activeStep >= 3 && (
            <span className="text-emerald-400 font-mono text-[10px] tracking-wider uppercase flex items-center gap-1 font-bold">
              <span>✓ EXECUTED</span>
            </span>
          )}
        </motion.div>

        {/* Line 6: enableHumanPotential() */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={activeStep >= 4 ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.3 }}
          className={`flex items-center justify-between py-1 px-2 rounded-lg transition-colors duration-300 ${
            activeStep === 4 ? "bg-[#38BDF8]/15 border-l-2 border-[#38BDF8]" : "hover:bg-white/5"
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="text-[#38BDF8]/40 text-xs w-5 text-right shrink-0">5</span>
            <p className="pl-4 text-[#38BDF8]">
              <span className="text-sky-300">enableHumanPotential</span>();
            </p>
          </div>
          {activeStep >= 4 && (
            <span className="text-emerald-400 font-mono text-[10px] tracking-wider uppercase flex items-center gap-1 font-bold">
              <span>✓ EXECUTED</span>
            </span>
          )}
        </motion.div>

        {/* Line 7: return InvisibleSoftware */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={activeStep >= 5 ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-3 py-1"
        >
          <span className="text-[#38BDF8]/40 text-xs w-5 text-right shrink-0">6</span>
          <p className="pl-4">
            <span className="text-[#38BDF8] font-bold">return</span>{" "}
            <span className="text-white font-bold tracking-wide drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]">
              InvisibleSoftware
            </span>
            ;
          </p>
        </motion.div>

        {/* Line 8: Closing brace */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={activeStep >= 5 ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-3 py-0.5"
        >
          <span className="text-[#38BDF8]/40 text-xs w-5 text-right shrink-0">7</span>
          <p>{"}"}</p>
        </motion.div>

        {/* Active Typing Cursor Line */}
        <div className="flex items-center gap-3 py-1 mt-1">
          <span className="text-[#38BDF8]/40 text-xs w-5 text-right shrink-0">8</span>
          <div className="flex items-center gap-1">
            <span className="text-[#38BDF8] font-bold text-xs">$</span>
            <span className="w-2 h-4 bg-[#38BDF8] animate-pulse inline-block" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EnifPhilosophy() {
  return (
    <section id="philosophy" className="py-24 md:py-32 bg-[#02040A] border-b border-[#38BDF8]/10 relative overflow-hidden">
      {/* Dark Theme B Ambient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#050D1A_0%,#02040A_60%,#010206_100%)] pointer-events-none z-0" />
      <div className="absolute bottom-1/3 left-1/3 w-[500px] h-[300px] bg-[#38BDF8]/[0.06] blur-[100px] rounded-full pointer-events-none z-0" />

      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease }}
              className="font-display text-4xl md:text-5xl text-white leading-[1.18] tracking-[-0.01em] mb-6"
            >
              Our Philosophy
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease, delay: 0.1 }}
              className="text-[#94A3B8] text-lg md:text-xl leading-relaxed tracking-[0.01em] mb-8 font-light max-w-xl"
            >
              We believe exceptional software is invisible. The greatest technology removes friction, simplifies complexity and enables people to achieve more with less effort.
            </motion.p>
          </div>
          
          <div className="lg:col-span-7">
            <InteractiveCodeTerminal />
          </div>
        </div>
      </div>
    </section>
  );
}
