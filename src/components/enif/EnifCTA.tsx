"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Icon from "../Icon";
import { StarButton } from "../ui/StarButton";

const ease = [0.16, 1, 0.3, 1] as const;

export default function EnifCTA() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Autoplay playback error:", err);
      });
    }
  }, []);

  return (
    <section id="contact" className="py-20 sm:py-32 md:py-36 bg-[#02040A] relative overflow-hidden border-t border-[#38BDF8]/10">
      {/* Dark Theme B Ambient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#050D1A_0%,#02040A_60%,#010206_100%)] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#38BDF8]/[0.08] blur-[140px] rounded-full pointer-events-none z-0" />

      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-16">

          {/* Left Side: Original ENIF CTA Content */}
          <div className="w-full md:w-7/12 flex flex-col items-start text-left">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease }}
              className="font-display text-4xl sm:text-5xl md:text-7xl text-white leading-[1.12] tracking-[-0.01em] mb-6"
            >
              Build What Matters.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease, delay: 0.1 }}
              className="text-[#94A3B8] text-base md:text-xl font-light leading-relaxed tracking-[0.01em] mb-10 max-w-xl"
            >
              Whether you're creating a new venture, modernising an established organisation, or building enterprise software to solve complex problems, we have the engineering capability to deliver.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease, delay: 0.2 }}
            >
              <StarButton href="mailto:hello@brahmglobalholdings.com?subject=Work With ENIF" icon={<Icon name="arrow-right" size={16} />}>
                Start a Conversation
              </StarButton>
            </motion.div>
          </div>

          {/* Right Side: Robot Waving Video */}
          <motion.div
            className="w-full md:w-5/12 h-[320px] sm:h-[400px] md:h-[440px] relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[#38BDF8]/30 bg-black shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <video
              ref={videoRef}
              src="/kling_20260730_VIDEO_Duration___5960_0 (online-video-cutter.com).mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover object-top scale-[1.65] sm:scale-[1.8] origin-top -translate-y-[6%] translate-x-[6%] pointer-events-none"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
