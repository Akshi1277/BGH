"use client";

import { motion } from "framer-motion";
import { sectors, sectorsIntro } from "./content";
import { EASE } from "./motion";
import { useCycle } from "./cycle";
import ReelRing from "./ReelRing";
import CycleControls from "./CycleControls";

/*
 * GROUP SECTORS as a reel: the eight sectors as arcs of one ring. The ring turns each sector up
 * to the marker in turn, its photograph fills the centre and its details sit alongside.
 */
const items = sectors.map((s) => ({ photo: s.image, label: s.title }));
const steps = sectors.map((s) => ({ number: s.index, name: s.title }));

export default function SectorReel() {
  const { ref, pos, active, go, paused, togglePause, hoverProps } = useCycle(sectors.length);

  return (
    <section id="sectors" aria-labelledby="bx-sectors-title" className="section-y relative overflow-hidden border-y border-surface-line/50 bg-paper text-ink">
      <div className="relative z-10 mx-auto max-w-[var(--spacing-container-max)] px-margin-mobile md:px-margin-desktop">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-14 max-w-2xl md:mb-20"
        >
          <span className="text-eyebrow mb-3 block font-mono-ui uppercase tracking-[0.2em] text-accent">{sectorsIntro.eyebrow}</span>
          <h2 id="bx-sectors-title" className="mb-4 font-display text-3xl leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
            {sectorsIntro.title} <span className="font-normal italic text-accent">{sectorsIntro.titleAccent}</span>.
          </h2>
          <p className="text-sm font-light leading-relaxed text-ink-muted sm:text-base">{sectorsIntro.body}</p>
        </motion.div>

        <div ref={ref} {...hoverProps} className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-20">
          <ReelRing items={items} pos={pos} active={active} onPick={go} />

          <div className="flex min-w-0 flex-col">
            {/* all eight share one grid cell, so the column keeps the tallest one's height */}
            <div className="grid">
              {sectors.map((s, i) => (
                <Details key={s.index} s={s} on={i === active} />
              ))}
            </div>
            <CycleControls
              steps={steps}
              active={active}
              paused={paused}
              onPause={togglePause}
              onPick={go}
              className="order-first mb-10 lg:order-none lg:mb-0 lg:mt-12 lg:border-t lg:border-ink/10 lg:pt-6"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Details({ s, on }: { s: (typeof sectors)[number]; on: boolean }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: on ? 1 : 0, y: on ? 0 : 12 }}
      transition={{ duration: on ? 0.5 : 0.25, delay: on ? 0.2 : 0, ease: EASE }}
      aria-hidden={!on}
      inert={!on}
      className={`[grid-area:1/1] ${on ? "" : "pointer-events-none"}`}
    >
      <p className="font-mono-ui text-[11px] uppercase tracking-[0.2em] text-accent">
        Sector {s.index} <span className="text-ink/35">• {s.group}</span>
      </p>
      <h3 className="mt-4 font-display text-[clamp(32px,3.4vw,52px)] font-normal leading-[1.05] text-ink">{s.title}</h3>
      <p className="mt-3 font-display text-lg font-light italic text-accent">{s.summary}</p>
      <p className="mt-6 max-w-[58ch] text-[15px] font-light leading-relaxed text-ink-muted">{s.description}</p>
      <p className="mt-8 font-mono-ui text-[10px] font-medium uppercase tracking-widest text-ink-muted">Core Capabilities</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {s.focusAreas.map((a) => (
          <li key={a} className="rounded-full border border-surface-line bg-surface px-3 py-1.5 font-mono-ui text-[11px] text-ink">
            {a}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
