"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260806_133255_956f653f-5d80-4b06-abd5-0f46c98b60fa.mp4";

export default function EnifHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (!videoRef.current) return;

    videoRef.current.playbackRate = 0.85;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play().catch(() => {});
          } else {
            videoRef.current?.pause();
          }
        });
      },
      { threshold: 0 }
    );

    observer.observe(videoRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#04070D] text-[#F8FAFC] pt-28 pb-16 sm:pt-36 sm:pb-24 md:pt-44 md:pb-32 min-h-[100svh] min-h-screen flex flex-col justify-center border-b border-[#1E293B]/60">
      {/* ── High-Vibrancy Right-Aligned 3D Video Scene ── */}
      <div className="absolute inset-0 z-0 opacity-100 pointer-events-none flex items-center justify-end overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          onCanPlayThrough={() => setVideoLoaded(true)}
          onLoadedData={() => setVideoLoaded(true)}
          className="w-full h-full object-cover origin-right translate-x-[24%] md:translate-x-[34%] lg:translate-x-[40%]"
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
      </div>

      {/* Smooth Bottom Blend Transition Layer */}
      <div className="absolute bottom-0 inset-x-0 h-28 md:h-40 bg-gradient-to-b from-transparent via-[#04070D]/80 to-[#04070D] pointer-events-none z-[1]" />

      {/* Left-side ambient dark gradient for crisp text contrast */}
      <div className="absolute inset-y-0 left-0 w-full md:w-3/5 bg-gradient-to-r from-[#04070D] via-[#04070D]/90 to-transparent pointer-events-none z-[1]" />

      {/* Structural grid overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.035] z-0 mix-blend-overlay"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* Subtle Cyan Radial Backlight */}
      <div
        aria-hidden
        className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#38BDF8]/10 rounded-full blur-[140px] pointer-events-none z-0"
      />

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 relative z-10 md:my-auto">
        {/* ── Left-Aligned Architectural Hero Content ── */}
        <div className="flex flex-col items-start justify-center text-left w-full md:w-2/3 lg:w-[58%]">
          
          {/* Eyebrow Badge (Ultra-precise micro-chrome pill) */}
          <motion.div
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#38BDF8]/10 border border-[#38BDF8]/25 backdrop-blur-md mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#38BDF8] font-semibold">
              ENIF Technologies — BRAHM Global Holdings
            </span>
          </motion.div>

          {/* Headline with High-End Sora 200 Ultra-Light Typography */}
          <motion.h1
            className="font-display font-extralight text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[5.75rem] leading-[0.98] tracking-[-0.025em] text-[#F8FAFC] mb-6 sm:mb-8 drop-shadow-2xl max-w-4xl"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
          >
            Engineer Your{" "}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[#38BDF8]/70 font-light">
              Enterprise.
            </span>
          </motion.h1>

          {/* Description Paragraph with Cyan Border Accent */}
          <motion.p
            className="text-sm sm:text-base md:text-lg text-[#94A3B8] max-w-[52ch] mb-8 sm:mb-10 font-light tracking-[0.01em] leading-relaxed drop-shadow-sm border-l-2 border-[#38BDF8]/40 pl-5 sm:pl-6"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease, delay: 0.3 }}
          >
            We build and operate the mission-critical digital platforms, AI systems, and enterprise software that power our group and ambitious organisations worldwide.
          </motion.p>

          {/* High-End Nested Island CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 0.42 }}
            className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-4"
          >
            {/* Primary Engage Button */}
            <a
              href="#contact"
              className="group relative px-7 py-3.5 rounded-full bg-white text-[#04070D] font-mono text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#F1F5F9] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] active:scale-[0.98] flex items-center justify-center gap-3"
            >
              <span>Engage ENIF</span>
              <span className="w-7 h-7 rounded-full bg-[#04070D]/10 flex items-center justify-center group-hover:translate-x-0.5 transition-transform duration-300">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="text-[#04070D]"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </a>

            {/* Secondary Capabilities Button */}
            <a
              href="#capabilities"
              className="group px-7 py-3.5 rounded-full bg-white/5 border border-white/15 text-[#F8FAFC] backdrop-blur-md font-mono text-xs sm:text-sm font-medium uppercase tracking-[0.16em] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white/10 hover:border-[#38BDF8]/40 hover:shadow-[0_0_25px_rgba(56,189,248,0.15)] active:scale-[0.98] flex items-center justify-center gap-3"
            >
              <span>Capabilities</span>
              <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-y-0.5 transition-transform duration-300">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="text-[#38BDF8]"
                >
                  <path d="M12 5v14M19 12l-7 7-7-7" />
                </svg>
              </span>
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}