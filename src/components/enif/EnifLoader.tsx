"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface EnifLoaderProps {
  isLoading: boolean;
}

const ease = [0.16, 1, 0.3, 1] as const;

export function EnifLoader({ isLoading }: EnifLoaderProps) {
  const [show, setShow] = useState(true);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // Cycle through subtle terminal-like phases
    const interval = setInterval(() => {
      setPhase((p) => (p + 1) % 3);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setShow(false), 600);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="enif-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2, ease }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#04070D] pointer-events-none"
        >
          {/* Subtle ambient glow - optimized with translateZ to force GPU rendering */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#38BDF8] rounded-full opacity-[0.03] blur-[100px]" 
            style={{ transform: 'translate3d(-50%, -50%, 0)' }}
          />

          <div className="relative z-10 flex flex-col items-center">
            {/* Elegant ENIF Monogram */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease }}
              className="text-4xl md:text-5xl font-display text-transparent bg-clip-text mb-8"
              style={{
                backgroundImage: "linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.5) 100%)",
              }}
            >
              ENIF
            </motion.div>

            {/* Premium minimal progress indicator */}
            <div className="w-48 h-[1px] bg-white/10 overflow-hidden relative mb-4">
              <motion.div
                className="absolute inset-y-0 left-0 bg-[#38BDF8]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.5, ease: "linear", repeat: Infinity }}
              />
            </div>

            {/* Unique, engaging status text */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex items-center gap-2"
            >
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#94A3B8]/60">
                {phase === 0 && "Polishing every pixel"}
                {phase === 1 && "Warming up the engines"}
                {phase === 2 && "Preparing your experience"}
              </span>
              <motion.span 
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="w-1 h-3 bg-[#38BDF8]/60 inline-block"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
