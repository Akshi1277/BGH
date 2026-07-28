"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Icon from "./Icon";

interface MagneticButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

/* ─── Magnetic button — floats toward cursor within 140px ─────────── */
export default function MagneticButton({
  href,
  children,
  className = "inline-flex items-center gap-3 bg-accent text-surface px-10 py-5 rounded-full text-label font-mono-ui uppercase tracking-[0.1em] hover:bg-accent-soft transition-colors duration-300 group",
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 180, damping: 18, mass: 0.6 });

  const onMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const { left, top, width, height } = el.getBoundingClientRect();
      const cx = left + width / 2;
      const cy = top + height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const pull = 140;
      if (dist < pull) {
        const f = ((pull - dist) / pull) * 0.42;
        x.set(dx * f);
        y.set(dy * f);
      } else {
        x.set(0);
        y.set(0);
      }
    },
    [x, y]
  );

  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  useEffect(() => {
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [onMove]);

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: sx, y: sy }}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={className}
    >
      {children}
      <motion.span
        className="inline-flex"
        variants={{ rest: { x: 0 }, hover: { x: 5 } }}
        initial="rest"
        whileHover="hover"
        transition={{ duration: 0.2 }}
      >
        <Icon name="arrow-right" size={18} />
      </motion.span>
    </motion.a>
  );
}
