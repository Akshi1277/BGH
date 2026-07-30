"use client";

import React, { useRef, ReactNode, useCallback } from "react";

interface MagnetProps {
  children: ReactNode;
  padding?: number;
  disabled?: boolean;
  magnetStrength?: number;
  className?: string;
}

export function Magnet({
  children,
  padding = 100,
  disabled = false,
  magnetStrength = 2,
  className = "",
}: MagnetProps) {
  const magnetRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !magnetRef.current) return;

    const x = e.clientX;
    const y = e.clientY;

    if (rafRef.current !== null) return; // already have a frame queued

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      if (!magnetRef.current) return;
      const { left, top, width, height } = magnetRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const distX = Math.abs(centerX - x);
      const distY = Math.abs(centerY - y);

      if (distX < width / 2 + padding && distY < height / 2 + padding) {
        const offsetX = (x - centerX) / magnetStrength;
        const offsetY = (y - centerY) / magnetStrength;
        magnetRef.current.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
      } else {
        magnetRef.current.style.transform = `translate3d(0px, 0px, 0)`;
      }
    });
  }, [disabled, magnetStrength, padding]);

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (magnetRef.current) {
      magnetRef.current.style.transform = `translate3d(0px, 0px, 0)`;
    }
  }, []);

  return (
    <div
      ref={magnetRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block transition-transform duration-200 ease-out ${className}`}
      style={{ willChange: 'transform' }}
    >
      {children}
    </div>
  );
}
