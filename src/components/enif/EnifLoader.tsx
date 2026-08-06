"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CHECKS = [
  "INITIALIZING GLOBAL INFRASTRUCTURE...",
  "ESTABLISHING SECURE HANDSHAKE...",
  "SYNCING DISTRIBUTED DATABASES...",
  "CALIBRATING NEURAL ARCHITECTURES...",
  "SYSTEMS ONLINE."
];

// Custom spring and easing derived from Emil Kowalski & Apple guidelines
const springTrans = { type: "spring", duration: 0.8, bounce: 0 };
const easeOutStrong = [0.23, 1, 0.32, 1] as const;

export default function EnifLoader({ onComplete }: { onComplete: () => void }) {
  const [loading, setLoading] = useState(true);
  const [currentCheck, setCurrentCheck] = useState(0);

  useEffect(() => {
    // Disable scroll while loading
    document.body.style.overflow = "hidden";

    // Sequence the checks
    const interval = setInterval(() => {
      setCurrentCheck((prev) => {
        if (prev < CHECKS.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 400); // 400ms per check

    // Complete loading after sequence finishes
    const totalTime = CHECKS.length * 400 + 800; 
    const timeout = setTimeout(() => {
      setLoading(false);
      setTimeout(() => {
        document.body.style.overflow = "auto";
        onComplete();
      }, 1000); // Wait for exit animation to finish before unmounting completely
    }, totalTime);

    return () => {
      document.body.style.overflow = "auto";
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="enif-loader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.05,
            filter: "blur(10px)",
          }}
          transition={{ duration: 0.8, ease: easeOutStrong }}
          className="fixed inset-0 z-[9999] bg-[#04070D] flex flex-col items-center justify-center pointer-events-none"
        >
          {/* Main Logo Reveal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: easeOutStrong }}
            className="flex flex-col items-center gap-8 mb-16"
          >
            <div className="w-16 h-16 relative">
              <svg viewBox="0 0 100 100" className="w-full h-full text-white">
                <path d="M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M35 30 L65 30 M35 50 L65 50 M35 70 L65 70" stroke="currentColor" strokeWidth="4" />
                <path d="M35 30 L35 70" stroke="currentColor" strokeWidth="4" />
              </svg>
            </div>
            <h1 className="font-tech-display text-4xl tracking-[0.2em] text-white">
              ENIF
            </h1>
          </motion.div>

          {/* Fluid Progress Bar */}
          <div className="w-64 max-w-[80vw] h-[2px] bg-[#334155]/30 rounded-full overflow-hidden mb-6 relative">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 2, ease: easeOutStrong }}
              className="absolute inset-y-0 left-0 w-full bg-[#38BDF8]"
            />
          </div>

          {/* Terminal Checks */}
          <div className="h-6 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCheck}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="font-mono text-[10px] sm:text-xs text-[#94A3B8] tracking-widest uppercase"
              >
                {CHECKS[currentCheck]}
              </motion.div>
            </AnimatePresence>
          </div>
          
        </motion.div>
      )}
    </AnimatePresence>
  );
}
