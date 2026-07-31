"use client";

import { motion } from "framer-motion";

export function BlurText({ text, delay = 0, className }: { text: string; delay?: number; className?: string }) {
  const words = text.split(" ");
  return (
    <div className={`flex flex-wrap justify-center gap-x-2 gap-y-1 ${className || ""}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: "blur(12px)", y: 8 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.8, delay: delay + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
