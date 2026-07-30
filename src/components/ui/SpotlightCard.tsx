"use client";
import React, { useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

export const SpotlightCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  // Throttle via rAF — only one update per frame regardless of mouse speed
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || !spotlightRef.current) return;

    const x = e.clientX;
    const y = e.clientY;

    if (rafRef.current !== null) return; // already scheduled this frame

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      if (!divRef.current || !spotlightRef.current) return;
      const rect = divRef.current.getBoundingClientRect();
      const posX = x - rect.left;
      const posY = y - rect.top;
      spotlightRef.current.style.background = `radial-gradient(500px circle at ${posX}px ${posY}px, rgba(56, 189, 248, 0.25), transparent 60%)`;
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (spotlightRef.current) spotlightRef.current.style.opacity = "1";
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (spotlightRef.current) spotlightRef.current.style.opacity = "0";
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative rounded-3xl border border-white/10 bg-[#04070D]/90 backdrop-blur-md overflow-hidden transition-colors duration-300 hover:border-[#38BDF8]/40",
        className
      )}
    >
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{ opacity: 0, willChange: 'background' }}
      />
      {children}
    </div>
  );
};
