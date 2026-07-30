"use client";

import React from "react";
import { motion } from "framer-motion";

const ease = [0.25, 1, 0.5, 1] as const;

const QUALITATIVE_STATS = [
  { value: "London", label: "Global Headquarters" },
  { value: "Multi-sector", label: "Business Group" },
  { value: "Founder-led", label: "Long-term Ownership" },
  { value: "Engineering-led", label: "Innovation" },
];

export default function FoundersVision() {
  return (
    <section className="py-24 md:py-32 bg-paper text-paper-ink border-t border-paper-line relative overflow-hidden">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        
        {/* Qualitative Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-24 divide-y md:divide-y-0 md:divide-x divide-paper-line border-b border-paper-line pb-16">
          {QUALITATIVE_STATS.map((s, i) => (
            <motion.div
              key={s.value}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease, delay: i * 0.08 }}
              className="flex flex-col items-center md:items-start pt-4 md:pt-0 md:pl-6 first:pl-0 text-center md:text-left"
            >
              <span className="font-display text-2xl md:text-3xl text-accent font-medium mb-1">
                {s.value}
              </span>
              <span className="font-mono-ui text-xs uppercase tracking-[0.18em] text-paper-muted">
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* The Vision Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <span className="font-mono-ui text-xs text-accent uppercase tracking-[0.25em] block">
              OUR FOUNDING PHILOSOPHY
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-paper-ink leading-tight">
              Beyond Business. <br /><span className="italic font-normal text-accent">Towards Legacy.</span>
            </h2>
            <p className="text-xl text-paper-ink font-light mt-2">
              BRAHM Global Holdings was established with a different ambition. <br/>
              Building Institutions That Endure.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="lg:col-span-7 flex flex-col gap-6 text-paper-muted font-light leading-relaxed"
          >
            <p>
              BRAHM Global Holdings was founded on the belief that the world's most respected organisations are not defined by the industries they enter, but by the principles upon which they are built.
            </p>
            <p>
              Markets evolve. Technologies advance. Industries are continually transformed. Yet integrity, disciplined leadership, operational excellence and long-term thinking remain the foundations of every enduring enterprise.
            </p>
            <p>
              For this reason, we do not measure success by the number of companies we establish, the speed at which we grow or the trends we pursue. We measure success by the strength of the institutions we build, the people they develop, the industries they strengthen and the value they continue to create over generations.
            </p>
            <p>
              Each company within BRAHM Global Holdings is established with a distinct purpose and independent identity, yet united by a common standard of excellence. Together, they form an organisation designed not simply to adapt to change, but to help shape it.
            </p>
            <div className="p-6 my-4 border border-accent/20 bg-accent/5 rounded-xl text-paper-ink">
              <p className="font-display text-xl leading-relaxed">
                Our ambition is neither to build the largest group nor the fastest-growing one. It is to build one of lasting significance.
              </p>
            </div>
            <p>
              One that earns trust through its actions, pursues excellence without compromise and creates enduring value for generations to come. That is the standard by which BRAHM Global Holdings intends to be judged.
            </p>
          </motion.div>
        </div>

        {/* Defining Institutional Quote */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease, delay: 0.3 }}
          className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6 mt-32"
        >
          <span className="font-mono-ui text-xs text-accent uppercase tracking-[0.25em] block">
            THE INSTITUTIONAL VISION
          </span>

          <blockquote className="font-display italic text-2xl md:text-4xl lg:text-5xl text-paper-ink leading-tight">
            &ldquo;We are not building businesses for the next quarter. We are building institutions for the next century.&rdquo;
          </blockquote>

          <div className="h-px w-20 bg-accent/40 my-2" />

          <p className="font-mono-ui text-xs uppercase tracking-[0.2em] text-paper-muted">
            BRAHM Global Holdings • London Headquarters
          </p>
        </motion.div>
      </div>
    </section>
  );
}
