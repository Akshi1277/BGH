'use client';

import React, { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

export interface GradientCardProps {
  index?: string;
  title?: string;
  description?: string;
  items?: string[];
  learnMoreText?: string;
  learnMoreHref?: string;
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  theme?: "light" | "dark";
}

export const GradientCard: React.FC<GradientCardProps> = ({
  index,
  title = "AI-Powered Solution",
  description = "High-performance enterprise software platform built for scale.",
  items,
  learnMoreText = "Learn More",
  learnMoreHref = "#",
  icon,
  className = "",
  style,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  // Smooth throttled mouse move for subtle tilt effect
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const cx = e.clientX;
    const cy = e.clientY;
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = cx - rect.left - rect.width / 2;
      const y = cy - rect.top - rect.height / 2;
      const rotateX = -(y / rect.height) * 4;
      const rotateY = (x / rect.width) * 4;
      setRotation({ x: rotateX, y: rotateY });
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  }, []);

  return (
    <div className={`w-full flex items-center justify-center ${className}`}>
      <motion.div
        ref={cardRef}
        className="relative rounded-3xl overflow-hidden w-full border border-white/10 bg-[#070C18] transition-shadow duration-300 antialiased"
        style={{
          minHeight: "440px",
          boxShadow: isHovered
            ? "0 20px 50px rgba(56, 189, 248, 0.15), 0 0 30px rgba(168, 85, 247, 0.12)"
            : "0 10px 40px rgba(0, 0, 0, 0.5)",
          ...style,
        }}
        animate={{
          y: isHovered ? -4 : 0,
          rotateX: rotation.x,
          rotateY: rotation.y,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        {/* Hardware-Accelerated Ambient Glow Background */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            background: `
              radial-gradient(ellipse at bottom right, rgba(168, 85, 247, 0.25) 0%, transparent 65%),
              radial-gradient(ellipse at bottom left, rgba(56, 189, 248, 0.2) 0%, transparent 65%),
              radial-gradient(circle at center top, rgba(14, 165, 233, 0.05) 0%, transparent 70%)
            `,
            opacity: isHovered ? 1 : 0.75,
          }}
        />

        {/* Bottom Ambient Glow Pill */}
        <div
          className="absolute -bottom-10 inset-x-0 h-44 pointer-events-none transition-opacity duration-500"
          style={{
            background: "radial-gradient(ellipse at center, rgba(147, 51, 234, 0.3) 0%, rgba(56, 189, 248, 0.15) 50%, transparent 80%)",
            filter: "blur(30px)",
            opacity: isHovered ? 0.9 : 0.6,
          }}
        />

        {/* Card Content - Crisp 2D Typography Layer */}
        <div className="relative z-10 flex flex-col justify-between h-full p-6 sm:p-8">
          <div>
            {/* Header Index & Icon */}
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              {index && (
                <span className="font-mono text-[#38BDF8] text-xs sm:text-sm font-bold tracking-widest uppercase">
                  0{index.replace(/^0+/, "")}
                </span>
              )}

              {/* Icon Container */}
              <div
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-white/15 text-[#38BDF8] shadow-lg transition-transform duration-300 group-hover:scale-105"
              >
                {icon || (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2l9 5v10l-9 5-9-5V7l9-5z" />
                  </svg>
                )}
              </div>
            </div>

            {/* Title & Description with Crisp Rendering */}
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-3 subpixel-antialiased">
              {title}
            </h3>

            <p className="text-xs sm:text-sm text-[#CBD5E1] font-normal leading-relaxed tracking-normal subpixel-antialiased mb-6">
              {description}
            </p>
          </div>

          {/* List Items or CTA */}
          <div className="pt-4 border-t border-white/10">
            {items && items.length > 0 ? (
              <ul className="space-y-2.5">
                {items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 font-mono text-xs text-[#94A3B8] subpixel-antialiased">
                    <svg className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                    <span className="text-white/80 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <a
                href={learnMoreHref}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#38BDF8] hover:text-white transition-colors group"
              >
                <span>{learnMoreText}</span>
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
