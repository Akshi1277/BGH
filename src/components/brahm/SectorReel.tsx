"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { sectors, sectorsIntro } from "./content";
import { EASE } from "./motion";
import { useCycle } from "./cycle";
import ReelRing from "./ReelRing";

/*
 * GROUP SECTORS as a reel: the eight sectors as arcs of one ring. Pick a sector (its arc or its
 * name) and the ring turns it up to the marker, its photograph fills the centre and its details
 * sit alongside. Nothing moves until someone picks.
 */
const items = sectors.map((s) => ({ photo: s.image, label: s.title }));
const groups = [...new Set(sectors.map((s) => s.group))];

export default function SectorReel() {
  const { pos, active, go } = useCycle(sectors.length);

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

        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-20">
          <ReelRing items={items} pos={pos} active={active} onPick={go} />

          <div className="min-w-0">
            <SectorIndex active={active} onPick={go} />
            {/* all eight share one grid cell below the index, so the index never moves and the
                spare height of shorter sectors falls at the bottom of the column, out of sight */}
            <div className="mt-8 grid grid-cols-[minmax(0,1fr)] border-t border-ink/10 pt-8">
              {sectors.map((s, i) => (
                <Details key={s.index} s={s} on={i === active} />
              ))}
            </div>
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
      <h3 className="font-display text-[clamp(32px,3.4vw,52px)] font-normal leading-[1.05] text-ink">{s.title}</h3>
      <p className="mt-3 font-display text-lg font-light italic text-accent">{s.summary}</p>
      <p className="mt-6 max-w-[58ch] text-[15px] font-light leading-relaxed text-ink-muted">{s.description}</p>
      <p className="mt-6 text-[15px] leading-relaxed text-ink">
        <span className="text-ink-muted">Core capabilities: </span>
        {/* each capability stays whole; lines break only between them */}
        {s.focusAreas.map((a, k) => (
          <Fragment key={a}>
            <span className="whitespace-nowrap">{a}</span>
            {k < s.focusAreas.length - 1 && <span className="text-ink-muted"> · </span>}
          </Fragment>
        ))}
      </p>
    </motion.div>
  );
}

/* The sectors by name, grouped as on the current site: the way to pick one. */
function SectorIndex({ active, onPick }: { active: number; onPick: (i: number) => void }) {
  return (
    <div className="grid grid-cols-2 gap-x-8">
      {groups.map((g) => (
        <div key={g}>
          <p className="mb-2 text-[13px] text-ink-muted">{g}</p>
          <ul className="space-y-1">
            {sectors.map((s, i) =>
              s.group === g ? (
                <li key={s.index}>
                  <button
                    type="button"
                    onClick={() => onPick(i)}
                    aria-current={i === active}
                    className={`py-2 text-left text-[15px] transition-colors lg:py-0 ${i === active ? "text-ink underline decoration-accent decoration-1 underline-offset-[6px]" : "text-ink/45 hover:text-ink"}`}
                  >
                    {s.title}
                  </button>
                </li>
              ) : null,
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}
