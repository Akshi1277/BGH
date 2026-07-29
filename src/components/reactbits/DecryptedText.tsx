"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: "start" | "end" | "center";
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  encryptedClassName?: string;
  animateOn?: "view" | "hover";
}

export function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+",
  className = "",
  encryptedClassName = "text-[#38BDF8]",
  animateOn = "view",
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolledIntoView, setIsScrolledIntoView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let iteration = 0;

    const shouldAnimate =
      (animateOn === "view" && isScrolledIntoView) ||
      (animateOn === "hover" && isHovered);

    if (!shouldAnimate) {
      setDisplayText(text);
      return;
    }

    interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (iteration > maxIterations) return char;

            const randomChar = characters[Math.floor(Math.random() * characters.length)];
            return Math.random() < iteration / maxIterations ? char : randomChar;
          })
          .join("")
      );

      iteration += 1;
      if (iteration > maxIterations + 2) {
        clearInterval(interval);
        setDisplayText(text);
        setHasAnimated(true);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [isHovered, isScrolledIntoView, text, speed, maxIterations, characters, animateOn]);

  return (
    <motion.span
      ref={containerRef}
      onViewportEnter={() => setIsScrolledIntoView(true)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`inline-block ${className}`}
    >
      {displayText.split("").map((char, i) => {
        const isOriginal = char === text[i];
        return (
          <span
            key={i}
            className={isOriginal ? "" : encryptedClassName}
          >
            {char}
          </span>
        );
      })}
    </motion.span>
  );
}
