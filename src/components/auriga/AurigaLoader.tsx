"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface AurigaLoaderProps {
  isLoading: boolean;
}

const ease = [0.16, 1, 0.3, 1] as const;

export function AurigaLoader({ isLoading }: AurigaLoaderProps) {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      setProgress(100);
      const dismissTimer = setTimeout(() => setShow(false), 450);
      return () => clearTimeout(dismissTimer);
    }

    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 90) return 90;
        return Math.min(90, p + Math.floor(Math.random() * 8 + 4));
      });
    }, 120);

    const fallbackTimer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setShow(false), 400);
    }, 12000);

    return () => {
      clearInterval(timer);
      clearTimeout(fallbackTimer);
    };
  }, [isLoading]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="auriga-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.4, ease }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#04070D] pointer-events-none select-none"
        >
          {/* Subtle Ambient Radial Glow */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#E0115F] rounded-full opacity-[0.06] blur-[100px] pointer-events-none" 
            style={{ transform: 'translate3d(-50%, -50%, 0)' }}
          />

          <div className="relative z-10 flex flex-col items-center">
            {/* Clean 7AURIGA Brand Wordmark */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="w-6 h-px bg-[#E0115F]" />
              <span className="text-3xl sm:text-4xl font-display tracking-[-0.035em] text-white font-medium">
                7AURIGA
              </span>
              <span className="w-6 h-px bg-[#E0115F]" />
            </motion.div>

            {/* Razor-Thin Minimal Progress Line */}
            <div className="w-40 sm:w-48 h-[1px] bg-white/10 overflow-hidden relative mb-3 rounded-full">
              <motion.div
                className="absolute inset-y-0 left-0 bg-[#E0115F] rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              />
            </div>

            {/* Monospace Percentage Counter */}
            <div className="font-sans font-semibold text-[10px] text-[#E0115F]/90 tracking-[0.25em] uppercase">
              {progress}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
