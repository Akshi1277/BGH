"use client";

import React, { useRef, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ease = [0.16, 1, 0.3, 1] as const;

const CAPABILITIES = [
  {
    index: "01",
    tag: "SOFTWARE",
    title: "Custom Solutions",
    shortline: "Tailored applications built for your exact operational needs.",
    description:
      "We design and develop unique digital solutions that map perfectly to how your business operates, eliminating the friction of rigid, off-the-shelf software.",
    tags: ["Business Applications", "Client Portals", "Operational Tools", "Process Digitization"],
  },
  {
    index: "02",
    tag: "AI & DATA",
    title: "Applied Intelligence",
    shortline: "Turning information into measurable efficiency.",
    description:
      "We help you leverage your data to automate routine tasks and uncover insights, allowing your team to focus on high-value strategic work rather than manual administration.",
    tags: ["Workflow Automation", "Insight Generation", "Data Strategy", "Decision Support"],
  },
  {
    index: "03",
    tag: "RESILIENCE",
    title: "Scalable Foundations",
    shortline: "Foundations that grow reliably alongside your business.",
    description:
      "We ensure your digital presence is built on highly reliable foundations that remain stable during peak demand, keeping your business running smoothly without interruption.",
    tags: ["Reliability Planning", "Growth Readiness", "Performance Optimisation", "Business Continuity"],
  },
  {
    index: "04",
    tag: "TRUST",
    title: "Secure Operations",
    shortline: "Protecting what matters most without compromising speed.",
    description:
      "We embed foundational safety measures into everything we build, ensuring your critical information remains strictly confidential and your business stays fully compliant.",
    tags: ["Information Privacy", "Access Governance", "Risk Mitigation", "Regulatory Alignment"],
  },
];

// ─── Right-side detail panel ───────────────────────────────────────────────
function DetailPanel({ cap }: { cap: (typeof CAPABILITIES)[0] }) {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-[#94A3B8] font-sans text-sm md:text-base leading-relaxed font-light tracking-[0.01em]">
        {cap.description}
      </p>

      <div>
        <div className="font-mono text-[10px] sm:text-[11px] text-[#38BDF8] font-semibold tracking-[0.2em] uppercase mb-3">
          Key Outcomes
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {cap.tags.map((tag) => (
            <div
              key={tag}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-[#CBD5E1] font-mono"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] shrink-0" />
              <span>{tag}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Single capability row ────────────────────────────────────────────────
function CapRow({ cap }: { cap: (typeof CAPABILITIES)[0] }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const dimRef = useRef<HTMLSpanElement>(null);
  const brightRef = useRef<HTMLSpanElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rowRef.current || !dimRef.current || !brightRef.current) return;

    const ctx = gsap.context(() => {
      // Bright text wipes in from left to right on scroll
      gsap.fromTo(
        brightRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          ease: "none",
          scrollTrigger: {
            trigger: rowRef.current,
            start: "top 82%",
            end: "top 30%",
            scrub: 0.8,
          },
        }
      );

      // Detail panel fades and translates up
      if (detailRef.current) {
        gsap.fromTo(
          detailRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: rowRef.current,
              start: "top 70%",
              end: "top 38%",
              scrub: 0.6,
            },
          }
        );
      }

      // Horizontal divider wipes in
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: rowRef.current,
              start: "top 90%",
              end: "top 78%",
              scrub: 0.5,
            },
          }
        );
      }
    }, rowRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rowRef} className="group relative">
      {/* Structural divider line */}
      <div
        ref={lineRef}
        className="absolute top-0 left-0 right-0 h-px bg-[#38BDF8]/20 origin-left"
        style={{ transformOrigin: "left center" }}
      />

      <div className="pt-10 pb-12 md:pt-14 md:pb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* ── Left: title & meta ── */}
        <div className="lg:col-span-7">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-2.5 py-0.5 bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/25 rounded-full font-mono text-[9px] sm:text-[10px] tracking-[0.18em] uppercase font-semibold">
              {cap.tag}
            </span>
            <span className="font-mono text-[#38BDF8]/50 text-xs tracking-widest shrink-0 font-bold">
              {cap.index}
            </span>
          </div>

          {/* Wipe animation container */}
          <div className="relative inline-block w-full">
            {/* Ghost stroke layer — dim "blueprint" outline */}
            <span
              ref={dimRef}
              aria-hidden
              className="block font-sans font-semibold leading-[1.1] tracking-[-0.03em] select-none text-transparent"
              style={{
                fontSize: "clamp(1.75rem, 3.2vw, 3.25rem)",
                WebkitTextStroke: "1px rgba(248, 250, 252, 0.18)",
              }}
            >
              {cap.title}
            </span>

            {/* Solid bright layer — wipes left → right */}
            <span
              ref={brightRef}
              className="block font-sans font-semibold leading-[1.1] tracking-[-0.03em] text-[#F8FAFC] absolute inset-0"
              style={{
                fontSize: "clamp(1.75rem, 3.2vw, 3.25rem)",
                clipPath: "inset(0 100% 0 0)",
              }}
            >
              {cap.title}
            </span>
          </div>

          <p className="text-[#94A3B8] text-xs sm:text-sm font-mono tracking-wide mt-2.5">
            {cap.shortline}
          </p>
        </div>

        {/* ── Right: detail panel ── */}
        <div ref={detailRef} className="lg:col-span-5 opacity-0 pt-1 lg:pt-3">
          <DetailPanel cap={cap} />
        </div>
      </div>
    </div>
  );
}

// ─── Section Header ────────────────────────────────────────────────────────
function SectionHeader() {
  const reduce = useReducedMotion();
  return (
    <div className="mb-16 md:mb-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#38BDF8]/30 bg-[#38BDF8]/10 mb-5 backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
          <span className="font-mono text-[#38BDF8] text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold">
            Capabilities
          </span>
        </motion.div>

        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
          className="font-sans font-semibold text-3xl sm:text-4xl md:text-5xl text-[#F8FAFC] leading-[1.15] tracking-[-0.03em]"
        >
          What We Build,{" "}
          <span className="text-[#38BDF8]">
            & How We Build It.
          </span>
        </motion.h2>
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease, delay: 0.2 }}
        className="lg:col-span-5 lg:pt-10"
      >
        <p className="text-[#94A3B8] font-sans text-sm md:text-base leading-relaxed tracking-[0.01em] font-light max-w-lg">
          Every engagement combines strategic thinking, product design, and reliable delivery into one disciplined model — tailored to your business, not borrowed from a template.
        </p>
      </motion.div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────
export default function EnifCapabilities() {
  return (
    <section
      id="capabilities"
      className="bg-[#04070D] text-[#F8FAFC] border-b border-[#38BDF8]/10 relative overflow-hidden"
    >
      {/* Deep space radial background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#081A33_0%,#05101F_40%,#04070D_80%)]" />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[300px] bg-[#38BDF8]/[0.05] blur-[100px] rounded-full" />
      </div>

      <div className="max-w-[var(--spacing-container-max)] mx-auto px-4 sm:px-8 md:px-16 relative z-10 py-20 md:py-28">
        <SectionHeader />

        {/* Capability Rows */}
        <div className="relative">
          {CAPABILITIES.map((cap) => (
            <CapRow key={cap.index} cap={cap} />
          ))}
          {/* Bottom structural divider */}
          <div className="h-px bg-[#38BDF8]/20" />
        </div>
      </div>
    </section>
  );
}
