"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Icon from "../Icon";
import { StarButton } from "../ui/StarButton";
import { Waves } from "../reactbits/Waves";

const ease = [0.16, 1, 0.3, 1] as const;

export default function EnifCTA() {
  return (
    <section id="contact" className="py-20 sm:py-32 md:py-48 bg-[#02040A] relative overflow-hidden border-t border-[#38BDF8]/10">
      {/* Dark Theme B Ambient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#050D1A_0%,#02040A_60%,#010206_100%)] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#38BDF8]/[0.08] blur-[140px] rounded-full pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto px-4 sm:px-margin-mobile md:px-margin-desktop text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
          className="font-display text-4xl sm:text-5xl md:text-7xl text-white leading-[1.12] tracking-[-0.01em] mb-6 sm:mb-8"
        >
          Build What Matters.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
          className="text-[#94A3B8] text-lg md:text-xl font-light leading-relaxed tracking-[0.01em] mb-12 max-w-2xl mx-auto"
        >
          Whether you're creating a new venture, modernising an established organisation, or building enterprise software to solve complex problems, we have the engineering capability to deliver.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
        >
          <StarButton href="#contact" icon={<Icon name="arrow-right" size={16} />}>
            Start a Conversation
          </StarButton>
        </motion.div>
      </div>
    </section>
  );
}
