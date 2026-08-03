"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface EnifLoaderProps {
  isLoading: boolean;
}

const ease = [0.16, 1, 0.3, 1] as const;

export function EnifLoader({ isLoading }: EnifLoaderProps) {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);

  // Fast percentage counter for smooth visual feedback
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          return 100;
        }
        return Math.min(100, p + Math.floor(Math.random() * 15 + 10));
      });
    }, 80);

    return () => clearInterval(timer);
  }, []);

  // Safety fallback: Auto-dismiss loader after 1.2s max so user is NEVER trapped waiting
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      setShow(false);
    }, 1200);

    if (!isLoading) {
      const dismissTimer = setTimeout(() => setShow(false), 200);
      return () => clearTimeout(dismissTimer);
    }

    return () => clearTimeout(fallbackTimer);
  }, [isLoading]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="enif-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.4, ease }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#04070D] pointer-events-none select-none"
        >
          {/* Subtle Ambient Radial Glow */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#38BDF8] rounded-full opacity-[0.04] blur-[100px] pointer-events-none" 
            style={{ transform: 'translate3d(-50%, -50%, 0)' }}
          />

          <div className="relative z-10 flex flex-col items-center">
            {/* Clean ENIF Brand Wordmark */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="w-6 h-px bg-[#38BDF8]" />
              <span className="text-3xl sm:text-4xl font-display tracking-[-0.035em] text-white font-medium">
                ENIF
              </span>
              <span className="w-6 h-px bg-[#38BDF8]" />
            </motion.div>

            {/* Razor-Thin Minimal Progress Line */}
            <div className="w-40 sm:w-48 h-[1px] bg-white/10 overflow-hidden relative mb-3 rounded-full">
              <motion.div
                className="absolute inset-y-0 left-0 bg-[#38BDF8] rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              />
            </div>

            {/* Quiet Monospace Percentage Counter */}
            <div className="font-mono text-[10px] text-[#38BDF8]/80 tracking-[0.25em] uppercase font-semibold">
              {progress}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
