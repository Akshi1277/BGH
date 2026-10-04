"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { difference, differenceIntro } from "./content";
import { EASE, stepOf, useChoreo } from "./motion";

/*
 * THE BRAHM DIFFERENCE: a strategic comparison, not an attack ad.
 * Three models side by side as columns of a ledger, on the Chalk & Pine light ground. As you
 * scroll, each opens in turn (Traditional VC, Private Equity, The BRAHM Way) and shows its points
 * while the others narrow to their labels; the sequence comes to rest on The BRAHM Way.
 * Neutral markers for the first two, the group's own pine green only for the third.
 */
type Model = (typeof difference)[number];

export default function DifferenceSequence() {
  const choreo = useChoreo();
  return (
    <section id="why-brahm" aria-labelledby="bx-difference-title" className="relative border-b border-surface-line/60 bg-paper text-ink">
      {choreo ? <Pinned /> : <Stacked />}
    </section>
  );
}

function Head() {
  return (
    <div>
      <span className="text-eyebrow mb-3 block font-mono-ui uppercase tracking-[0.2em] text-accent">{differenceIntro.eyebrow}</span>
      <h2 id="bx-difference-title" className="font-display text-[clamp(52px,7vw,120px)] font-normal leading-[0.95] tracking-[-0.02em] text-ink">
        {differenceIntro.title} <span className="italic text-accent">{differenceIntro.titleAccent}</span>.
      </h2>
    </div>
  );
}

function Pinned() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // starts on Traditional VC and comes to rest on The BRAHM Way
  const [i, setI] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setI(stepOf(v * 1.15, difference.length)));

  return (
    <div ref={ref} className="relative h-[240vh]">
      <div className="sticky top-0 flex h-[100dvh] flex-col overflow-hidden bg-paper">
        <div aria-hidden="true" className="bx-grid pointer-events-none absolute inset-0 opacity-50" />
        <div className="relative mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-10 pb-[7vh] pt-[clamp(96px,14vh,136px)]">
          <Head />
          <div className="mt-[clamp(28px,5vh,56px)] flex min-h-0 flex-1 gap-3">
            {difference.map((m, k) => (
              <motion.div
                key={m.label}
                animate={{ flexGrow: k === i ? 3.2 : 1 }}
                transition={{ duration: 0.8, ease: EASE }}
                className={`relative min-w-0 basis-0 overflow-hidden transition-colors duration-700 ${
                  m.tone === "brahm" && k === i ? "bg-[#101412] text-surface" : "border border-ink/10 bg-surface text-ink"
                }`}
              >
                <Column m={m} open={k === i} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Column({ m, open }: { m: Model; open: boolean }) {
  const brahm = m.tone === "brahm";
  const dark = brahm && open;
  return (
    <div className="relative flex h-full flex-col p-[clamp(20px,2.4vw,40px)]">
      {/* the model's number, set large and quiet in the open column */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute bottom-[-0.12em] right-[0.04em] font-display text-[clamp(120px,15vw,240px)] font-normal leading-none transition-opacity duration-700 ${
          open ? "opacity-100" : "opacity-0"
        } ${dark ? "text-surface/[0.07]" : "text-ink/[0.05]"}`}
      >
        {m.number}
      </span>
      <p className={`font-mono-ui text-[11px] uppercase tracking-[0.2em] ${dark ? "text-[#7FB79B]" : brahm ? "text-accent" : "text-ink/50"}`}>
        {m.number} • {m.label}
      </p>
      <h3
        className={`mt-4 font-display font-normal leading-[1.02] transition-[font-size] duration-700 ${
          open ? "text-[clamp(36px,3.6vw,60px)]" : "text-[clamp(22px,1.8vw,30px)]"
        } ${brahm ? "italic" : ""}`}
      >
        {m.title}
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.25 }}
            className="relative mt-[clamp(24px,4vh,48px)] grid max-w-[760px] gap-x-10 gap-y-5 md:grid-cols-2"
          >
            {m.points.map((pt) => (
              <Point key={pt.text} pt={pt} brahm={brahm} />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

function Point({ pt, brahm }: { pt: { lead?: string; text: string }; brahm: boolean }) {
  return (
    <li className={`flex gap-3 border-t pt-4 text-[16px] font-light leading-relaxed ${brahm ? "border-surface/15 text-surface/80" : "border-ink/10 text-ink/65"}`}>
      <span aria-hidden="true" className={`mt-0.5 font-mono-ui text-[13px] ${brahm ? "text-[#7FB79B]" : "text-ink/35"}`}>
        {brahm ? "✓" : "×"}
      </span>
      <span>
        {pt.lead && <strong className="font-medium text-surface">{pt.lead} </strong>}
        {pt.text}
      </span>
    </li>
  );
}

function Stacked() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
      <Head />
      <div className="mt-12 grid gap-3 md:grid-cols-3">
        {difference.map((m) => {
          const brahm = m.tone === "brahm";
          return (
            <div key={m.label} className={brahm ? "bg-[#101412] p-7 text-surface" : "border border-ink/10 bg-surface p-7 text-ink"}>
              <p className={`font-mono-ui text-[11px] uppercase tracking-[0.2em] ${brahm ? "text-[#7FB79B]" : "text-ink/50"}`}>
                {m.number} • {m.label}
              </p>
              <h3 className={`mt-4 font-display text-[32px] font-normal leading-tight ${brahm ? "italic" : ""}`}>{m.title}</h3>
              <ul className="mt-6 grid gap-4">
                {m.points.map((pt) => (
                  <Point key={pt.text} pt={pt} brahm={brahm} />
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
