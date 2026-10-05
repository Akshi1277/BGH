"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import { philosophy } from "./content";
import { EASE, useRange } from "./motion";

/*
 * OUR PHILOSOPHY, read beside its principles. On wide screens the statement stays in place on
 * the left (the heading, the two paragraphs, and the group's standard as a quiet quote) while
 * the four principles pass on the right. Each principle comes to full ink with a pine marker as
 * it crosses the middle of the screen and rests softly either side of it, so they are read one
 * at a time. Type is kept at a conversational scale. On phones it simply stacks. Same words.
 */
export default function PhilosophySection() {
  const still = useReducedMotion() ?? false;
  return (
    <section id="standard" aria-labelledby="bx-philosophy-title" className="section-y border-y border-surface-line bg-surface text-ink">
      <div className="mx-auto grid max-w-[var(--spacing-container-max)] gap-14 px-margin-mobile md:px-margin-desktop lg:grid-cols-12 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="lg:col-span-5 lg:self-start lg:sticky lg:top-[clamp(96px,16vh,150px)]"
        >
          <span className="text-eyebrow mb-4 block font-mono-ui uppercase tracking-[0.2em] text-accent">{philosophy.eyebrow}</span>
          <h2 id="bx-philosophy-title" className="font-display text-[clamp(30px,3vw,44px)] font-normal leading-[1.12] tracking-[-0.01em] text-ink">
            {philosophy.title}
            <br />
            <span className="italic text-accent">{philosophy.titleAccent}</span>
          </h2>
          <div className="mt-6 space-y-4 text-[16px] font-light leading-relaxed text-ink-muted">
            {philosophy.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <figure className="mt-10 border-l border-accent/40 pl-6">
            <p className="mb-3 text-[12px] uppercase tracking-[0.14em] text-ink-muted">{philosophy.quoteLabel}</p>
            <blockquote className="font-display text-[clamp(19px,1.6vw,24px)] font-normal italic leading-[1.4] text-ink">
              &ldquo;{philosophy.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-4 text-[13px] text-ink-muted">{philosophy.attribution}</figcaption>
          </figure>
        </motion.div>

        <ol className="lg:col-span-6 lg:col-start-7 lg:pt-2">
          {philosophy.principles.map((p) => (
            <Principle key={p.title} title={p.title} description={p.description} still={still} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function Principle({ title, description, still }: { title: string; description: string; still: boolean }) {
  const ref = useRef<HTMLLIElement>(null);
  // 0 as the principle enters from below, 1 as it leaves above; it is at full ink through the middle
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 15%"] });
  const ink = useRange(scrollYProgress, [0, 0.3, 0.7, 1], [0.32, 1, 1, 0.32]);
  const mark = useRange(scrollYProgress, [0.15, 0.35, 0.65, 0.85], [0, 1, 1, 0]);
  return (
    <li ref={ref} className="relative border-t border-ink/10 py-10 pl-7 last:border-b md:py-14">
      <motion.span aria-hidden="true" style={{ scaleY: still ? 1 : mark }} className="absolute left-0 top-10 h-[calc(100%-5rem)] w-[2px] origin-top bg-accent md:top-14 md:h-[calc(100%-7rem)]" />
      <motion.div style={{ opacity: still ? 1 : ink }}>
        <h3 className="font-display text-[clamp(26px,2.4vw,34px)] font-normal leading-tight text-ink">{title}</h3>
        <p className="mt-3 max-w-[46ch] text-[16px] font-light leading-relaxed text-ink-muted">{description}</p>
      </motion.div>
    </li>
  );
}
