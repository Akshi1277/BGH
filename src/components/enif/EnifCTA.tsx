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
    <section className="py-32 md:py-48 bg-[#04070D] relative overflow-hidden border-t border-[#38BDF8]/10">
      {/* React Bits Waves background */}
      <Waves lineColor="rgba(56, 189, 248, 0.12)" waveSpeedX={0.02} waveAmpY={35} className="opacity-80" />

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-[#38BDF8]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
          className="font-display text-5xl md:text-7xl text-white mb-8"
        >
          Build What Matters.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
          className="text-[#94A3B8] text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto"
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
