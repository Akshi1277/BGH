"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Icon, { IconName } from "./Icon";

const ease = [0.25, 1, 0.5, 1] as const;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Subtle float effect on scroll
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] w-full flex flex-col justify-center items-center overflow-hidden pt-20 pb-16"
    >
      {/* Abstract Institutional Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/brahm_abstract_hero.png"
          alt="Abstract Institutional Background"
          fill
          priority
          quality={100}
          unoptimized
          className="object-cover opacity-80 mix-blend-multiply"
        />
        {/* Soft gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-surface/30 via-transparent to-surface" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto w-full">
        {/* Main Heading */}
        <motion.div style={{ y: yText, opacity }} className="flex flex-col items-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease, delay: 0.2 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] leading-[1.05] tracking-tight text-ink"
          >
            Building Businesses
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease, delay: 0.3 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] leading-[1.05] tracking-tight text-ink"
          >
            That <span className="italic font-light text-accent">Endure.</span>
          </motion.h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.4 }}
          className="text-lg md:text-xl text-ink font-medium max-w-3xl mb-4 leading-snug"
        >
          Building enterprises with the ambition to shape industries and drive lasting value.
        </motion.p>

        {/* Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.5 }}
          className="text-sm md:text-base text-ink-muted font-light max-w-2xl mb-8 leading-relaxed"
        >
          BRAHM Global Holdings is an international venture builder and holding company creating exceptional businesses across technology, education, sport, hospitality and premium consumer brands.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease, delay: 0.6 }}
        >
          <Link
            href="/#contact"
            className="px-8 py-4 bg-ink text-surface rounded-full text-xs font-mono-ui uppercase tracking-[0.15em] font-bold hover:bg-accent transition-colors shadow-xl flex items-center gap-3 group"
          >
            Explore The Group
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </motion.div>
      </div>

      {/* Bottom Ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.8 }}
        className="absolute bottom-0 inset-x-0 border-t border-surface-line/50 bg-transparent py-4"
      >
        <div className="max-w-[1200px] mx-auto px-6 flex justify-center flex-wrap gap-x-12 gap-y-4">
          {[
            { text: "LONDON HEADQUARTERS", icon: "compass" as IconName },
            { text: "GLOBAL OPERATIONS", icon: "globe" as IconName },
            { text: "ENGINEERING EXCELLENCE", icon: "cube" as IconName },
            { text: "LONG-TERM OWNERSHIP", icon: "shield" as IconName },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-3">
              <Icon name={item.icon} size={14} className="text-accent" />
              <span className="font-mono-ui text-[10px] tracking-[0.15em] uppercase text-ink-muted font-medium">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
