'use client';

import React, { useRef } from 'react';
import {
  useScroll,
  useSpring,
  useTransform,
  motion,
  useReducedMotion,
} from 'framer-motion';
import CameraScrollCanvas from './CameraScrollCanvas';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll tracking for pinning (~350vh total outer height)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth spring physics for butter-smooth scrubbing
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 26,
    restDelta: 0.0005,
  });

  // Transform ranges for 4 distinct narrative stages
  // Stage 1: 0 - 0.22 (Assembled Camera)
  const stage1Opacity = useTransform(smoothProgress, [0, 0.15, 0.22], [1, 1, 0]);
  const stage1Y = useTransform(smoothProgress, [0, 0.22], [0, -30]);

  // Stage 2: 0.22 - 0.48 (Lens Separation) - Left Aligned
  const stage2Opacity = useTransform(smoothProgress, [0.20, 0.26, 0.42, 0.48], [0, 1, 1, 0]);
  const stage2Y = useTransform(smoothProgress, [0.20, 0.26, 0.42, 0.48], [20, 0, 0, -20]);

  // Stage 3: 0.48 - 0.75 (Internal Mechanism Exposed) - Right Aligned
  const stage3Opacity = useTransform(smoothProgress, [0.46, 0.52, 0.68, 0.75], [0, 1, 1, 0]);
  const stage3Y = useTransform(smoothProgress, [0.46, 0.52, 0.68, 0.75], [20, 0, 0, -20]);

  // Stage 4: 0.75 - 1.0 (Full Exploded Stack) - Centered
  const stage4Opacity = useTransform(smoothProgress, [0.73, 0.80, 1.0], [0, 1, 1]);
  const stage4Y = useTransform(smoothProgress, [0.73, 0.80, 1.0], [25, 0, 0]);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#000000] text-[#FAF7F5] selection:bg-white/20 selection:text-white"
      style={{ height: shouldReduceMotion ? '100vh' : '350vh' }}>
      
      {/* Pinned Viewport Container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#000000] flex flex-col justify-between">
        
        {/* Main Center Canvas Stage */}
        <div className="absolute inset-0 z-0 w-full h-full">
          {shouldReduceMotion ? (
            <div className="w-full h-full flex items-center justify-center p-8">
              <img
                src="/camera-frames/frame-0192.webp"
                alt="7AURIGA Exploded Camera"
                className="max-h-[70vh] object-contain opacity-90"
              />
            </div>
          ) : (
            <CameraScrollCanvas
              scrollYProgress={smoothProgress}
            />
          )}
        </div>

        {/* Narrative Overlay Layer - Pure typography, no cards, no borders */}
        <div className="relative z-10 w-full h-full max-w-[90rem] mx-auto px-6 md:px-12 flex items-center pointer-events-none">
          
          {/* STAGE 1: Assembled Camera (0% - 22%) */}
          <motion.div
            style={{ opacity: stage1Opacity, y: stage1Y }}
            className="absolute left-6 md:left-12 max-w-sm pointer-events-auto mt-20">
            
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-6 bg-[#9B1C2E]" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C8374F]">
                01 — Identity Intelligence
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#FAF7F5] mb-6 tracking-tight leading-tight">
              7AURIGA
            </h1>

            <p className="text-sm md:text-base font-light text-[#9C8F8F] leading-relaxed">
              We Build Identities That Endure.<br/>
              Brand • Media • Communications
            </p>
          </motion.div>

          {/* STAGE 2: Lens Separation (22% - 48%) - Left Aligned */}
          <motion.div
            style={{ opacity: stage2Opacity, y: stage2Y }}
            className="absolute left-6 md:left-12 max-w-sm pointer-events-auto">
            
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-6 bg-[#9B1C2E]" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C8374F]">
                Strategic Communications
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-[#FAF7F5] mb-5 leading-tight tracking-tight">
              7AURIGA builds perception.
            </h2>

            <p className="text-sm md:text-base text-[#9C8F8F] font-light leading-relaxed">
              7AURIGA is the communications and creative company of BRAHM Global Holdings. Our work extends beyond communication. We exist to shape how organisations are understood, experienced and remembered.
            </p>
          </motion.div>

          {/* STAGE 3: Mechanism Exposed (48% - 75%) - Right Aligned */}
          <motion.div
            style={{ opacity: stage3Opacity, y: stage3Y }}
            className="absolute right-6 md:right-12 max-w-sm text-right pointer-events-auto">
            
            <div className="flex items-center justify-end gap-3 mb-4">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C8374F]">
                Disciplined Execution
              </span>
              <span className="h-px w-6 bg-[#9B1C2E]" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-[#FAF7F5] mb-5 leading-tight tracking-tight">
              Enduring commercial value.
            </h2>

            <p className="text-sm md:text-base text-[#9C8F8F] font-light leading-relaxed ml-auto">
              Through strategic thinking, creative excellence and disciplined execution, we build enduring identities that strengthen reputation, inspire confidence and create lasting commercial value.
            </p>
          </motion.div>

          {/* STAGE 4: Full Exploded Stack (75% - 100%) - Centered */}
          <motion.div
            style={{ opacity: stage4Opacity, y: stage4Y }}
            className="absolute w-full left-0 flex flex-col items-center text-center pointer-events-auto mt-[40vh]">
            
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-6 bg-[#9B1C2E]" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C8374F]">
                The Art of Building Influence.
              </span>
              <span className="h-px w-6 bg-[#9B1C2E]" />
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-[#FAF7F5] mb-5 leading-tight tracking-tight">
              Building Modern Icons.
            </h2>

            <div className="mt-4 flex items-center justify-center">
              <a
                href="#who-we-are"
                className="inline-block pb-1 border-b border-[#C8374F] hover:border-[#FAF7F5] text-[#FAF7F5] text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-300">
                Explore The Practice
              </a>
            </div>
          </motion.div>

        </div>
        
        {/* Very subtle scroll indicator */}
        <motion.div 
          style={{ opacity: stage1Opacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20 pointer-events-none">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C8374F]">
            Scroll to deconstruct
          </span>
        </motion.div>

      </div>
    </div>
  );
}
