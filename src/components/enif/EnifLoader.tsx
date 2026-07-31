"use client";

import { motion, AnimatePresence } from "framer-motion";
import { BlurText } from "@/components/ui/blur-text";
import { useEffect, useState } from "react";

interface EnifLoaderProps {
  isLoading: boolean;
}

export function EnifLoader({ isLoading }: EnifLoaderProps) {
  // Ensure the loader stays on screen for a minimum amount of time 
  // so the user actually sees the beautiful animation before it cuts away.
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      // Small artificial delay if Spline loads extremely fast from cache
      const timer = setTimeout(() => setShow(false), 800);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="enif-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#04070D] pointer-events-none"
        >
          {/* Subtle glow behind the text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#38BDF8] rounded-full blur-[120px] opacity-10" />
          
          <div className="relative z-10 flex flex-col items-center gap-6">
            <span className="w-8 h-8 rounded-full border-[1px] border-[#38BDF8]/20 border-t-[#38BDF8]/80 animate-spin" />
            <BlurText 
              text="Entering the ENIF environment..." 
              className="text-[#94A3B8] font-mono tracking-widest text-xs uppercase"
              delay={0.2}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
