"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, type MotionValue } from "framer-motion";
import { philosophy } from "./content";
import { EASE, useRange } from "./motion";
import NetworkMark from "./NetworkMark";

/*
 * OUR PHILOSOPHY, read as you scroll. The four principles are set as large rows that come up
 * from faint to full ink as each reaches the middle of the screen, a pine rule drawing across
 * above it. The group's standard closes the section as a pull quote that fills in word by word,
 * over the group's network mark turning slowly with the scroll. Nothing is pinned: the page
 * scrolls normally between the two pinned sequences around it.
 */
export default function PhilosophySection() {
  const reduce = useReducedMotion() ?? false;
  return (
    <section id="standard" aria-labelledby="bx-philosophy-title" className="section-y relative overflow-hidden border-y border-surface-line bg-surface text-ink">
      <div className="mx-auto max-w-[var(--spacing-container-max)] px-margin-mobile md:px-margin-desktop">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="lg:col-span-7"
          >
            <span className="text-eyebrow mb-4 block font-mono-ui uppercase tracking-[0.2em] text-accent">{philosophy.eyebrow}</span>
            <h2 id="bx-philosophy-title" className="font-display text-[clamp(38px,4.4vw,68px)] font-normal leading-[1.04] tracking-[-0.01em] text-ink">
              {philosophy.title}
              <br />
              <span className="italic text-accent">{philosophy.titleAccent}</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="space-y-4 text-[17px] font-light leading-relaxed text-ink-muted lg:col-span-5"
          >
            {philosophy.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </motion.div>
        </div>

        <ul className="mt-16 md:mt-24">
          {philosophy.principles.map((p, i) => (
            <Principle key={p.title} title={p.title} description={p.description} italic={i % 2 === 1} still={reduce} />
          ))}
        </ul>
      </div>

      <Quote still={reduce} />
    </section>
  );
}

function Principle({ title, description, italic, still }: { title: string; description: string; italic: boolean; still: boolean }) {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 92%", "start 45%"] });
  const ink = useRange(scrollYProgress, [0, 1], [0.16, 1]);
  const rule = useRange(scrollYProgress, [0, 1], [0, 1]);
  return (
    <li ref={ref} className="relative grid gap-4 py-9 md:py-12 lg:grid-cols-12 lg:items-end lg:gap-16">
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-ink/10" />
      <motion.span aria-hidden="true" style={{ scaleX: still ? 1 : rule }} className="absolute inset-x-0 top-0 h-px origin-left bg-accent" />
      <motion.h3
        style={{ opacity: still ? 1 : ink }}
        className={`font-display text-[clamp(44px,6.4vw,108px)] font-normal leading-[0.98] tracking-[-0.02em] lg:col-span-7 ${italic ? "pb-1 italic text-accent" : "text-ink"}`}
      >
        {title}
      </motion.h3>
      <motion.p style={{ opacity: still ? 1 : ink }} className="max-w-[44ch] text-[17px] font-light leading-relaxed text-ink-muted lg:col-span-4 lg:col-start-9 lg:pb-3">
        {description}
      </motion.p>
    </li>
  );
}

function Quote({ still }: { still: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 60%"] });
  const turn = useRange(scrollYProgress, [0, 1], [-24, 18]);
  const words = philosophy.quote.split(" ");
  return (
    <figure ref={ref} className="relative mt-20 md:mt-32">
      {/* the group's mark, faint, turning with the scroll */}
      <motion.div aria-hidden="true" style={{ rotate: still ? 0 : turn }} className="pointer-events-none absolute -right-[18vw] top-1/2 w-[min(90vw,900px)] -translate-y-1/2 opacity-[0.22] md:-right-[8vw]">
        <NetworkMark tone="ink" className="h-auto w-full" />
      </motion.div>

      <div className="relative mx-auto max-w-[var(--spacing-container-max)] px-margin-mobile md:px-margin-desktop">
        <p className="mb-8 text-[13px] uppercase tracking-[0.14em] text-ink-muted">{philosophy.quoteLabel}</p>
        <blockquote className="max-w-[20ch] font-display text-[clamp(34px,5vw,80px)] font-normal italic leading-[1.08] tracking-[-0.01em] text-ink sm:max-w-[24ch]">
          <span aria-hidden="true">&ldquo;</span>
          {words.map((w, i) => (
            <Word key={i} p={scrollYProgress} from={i / words.length} to={(i + 1) / words.length} still={still} last={i === words.length - 1}>
              {w}
            </Word>
          ))}
          <span aria-hidden="true">&rdquo;</span>
        </blockquote>
        <figcaption className="mt-10 flex items-center gap-4 text-[14px] text-ink-muted">
          <span aria-hidden="true" className="h-px w-10 bg-accent" />
          {philosophy.attribution}
        </figcaption>
      </div>
    </figure>
  );
}

function Word({ p, from, to, still, last, children }: { p: MotionValue<number>; from: number; to: number; still: boolean; last: boolean; children: string }) {
  // each word comes up from faint as the reader scrolls past its share of the quote
  const o = useRange(p, [from * 0.85, to * 0.85 + 0.05], [0.14, 1]);
  return (
    <>
      <motion.span style={{ opacity: still ? 1 : o }}>{children}</motion.span>
      {!last && " "}
    </>
  );
}
