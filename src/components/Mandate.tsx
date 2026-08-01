"use client";

import React from "react";
import { motion } from "framer-motion";

const ease = [0.25, 1, 0.5, 1] as const;

export default function Mandate() {
  return (
    <section id="mandate" className="section-y bg-paper text-paper-ink border-b border-paper-line relative overflow-hidden">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left: Pull Quote */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 text-eyebrow font-mono-ui text-accent tracking-[0.2em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>THE MANDATE</span>
            </div>
            
            <blockquote className="font-display italic text-3xl md:text-4xl lg:text-5xl text-paper-ink leading-tight mt-4">
              "We are not building businesses for the next quarter. We are building institutions for the next century."
            </blockquote>
            
            <div className="h-px w-16 bg-accent/30 mt-4 mb-2" />
            
            <p className="font-mono-ui text-[11px] uppercase tracking-[0.18em] text-paper-muted">
              BRAHM Global Holdings
            </p>
          </motion.div>

          {/* Right: Body Copy */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="lg:col-span-7 flex flex-col gap-6 text-paper-muted font-light leading-relaxed text-lg"
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
            <div className="pl-6 border-l border-accent mt-4 text-paper-ink">
              <p className="font-display text-xl leading-relaxed">
                Our ambition is neither to build the largest group nor the fastest-growing one. It is to build one of lasting significance.
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
