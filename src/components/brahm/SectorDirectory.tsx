"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { sectors, sectorsIntro } from "./content";
import { EASE } from "./motion";

/*
 * GROUP SECTORS: a sector directory. Every sector stays visible as an indexed list, grouped into
 * Core Sectors and Emerging Focus, so the whole portfolio reads at a glance. Opening a sector
 * reveals its description and focus areas in place; on wide screens a pinned photo beside the
 * list follows the sector you point at or open. Same words as before.
 */

type Sector = (typeof sectors)[number];

const groups = [...new Set(sectors.map((s) => s.group))];

export default function SectorDirectory() {
  const reduce = useReducedMotion() ?? false;
  const [open, setOpen] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const shown = sectors[hover ?? open];

  return (
    <section
      id="sectors"
      aria-labelledby="bx-sectors-title"
      className="section-y scroll-mt-[calc(5rem+env(safe-area-inset-top,0px))] border-y border-surface-line/60 bg-paper text-ink"
    >
      <div className="mx-auto max-w-[var(--spacing-container-max)] px-margin-mobile md:px-margin-desktop">
        {/* intro */}
        <div className="grid items-end gap-6 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <span className="text-eyebrow mb-3 block font-mono-ui uppercase tracking-[0.2em] text-accent">
              {sectorsIntro.eyebrow}
            </span>
            <h2
              id="bx-sectors-title"
              className="font-display text-3xl leading-[1.06] tracking-tight text-ink sm:text-4xl lg:text-5xl"
            >
              {sectorsIntro.title} <span className="font-normal italic text-accent">{sectorsIntro.titleAccent}.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm font-light leading-relaxed text-ink-muted sm:text-base lg:col-span-5 lg:col-start-8">
            {sectorsIntro.body}
          </p>
        </div>

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12">
          {/* the directory */}
          <div className="space-y-12 lg:col-span-7" onPointerLeave={() => setHover(null)}>
            {groups.map((g) => {
              const inGroup = sectors.map((s, i) => [s, i] as const).filter(([s]) => s.group === g);
              return (
                <div key={g}>
                  <div className="flex items-baseline justify-between border-b border-ink/15 pb-3">
                    <h3 className="font-mono-ui text-[11px] uppercase tracking-[0.2em] text-ink-muted">{g}</h3>
                    <span className="font-mono-ui text-[11px] tabular-nums tracking-[0.14em] text-ink-muted">
                      {String(inGroup.length).padStart(2, "0")}
                    </span>
                  </div>
                  <ul>
                    {inGroup.map(([s, i]) => (
                      <Row
                        key={s.index}
                        s={s}
                        isOpen={open === i}
                        reduce={reduce}
                        onToggle={() => setOpen(open === i ? -1 : i)}
                        onPoint={() => setHover(i)}
                      />
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* pinned photo of the sector in focus (wide screens) */}
          <aside className="hidden lg:col-span-5 lg:block" aria-hidden="true">
            <div className="sticky top-[calc(5rem+2rem)]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface-line/40">
                <AnimatePresence initial={false}>
                  {shown && (
                    <motion.div
                      key={shown.index}
                      className="absolute inset-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
                    >
                      <Image src={shown.image} alt="" fill sizes="(min-width: 1024px) 40vw, 0px" className="object-cover" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {shown && (
                <p className="mt-4 flex items-baseline gap-3">
                  <span className="font-mono-ui text-[11px] tabular-nums tracking-[0.14em] text-accent">{shown.index}</span>
                  <span className="font-display text-lg text-ink">{shown.title}</span>
                  <span className="text-sm font-light text-ink-muted">{shown.summary}</span>
                </p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Row({
  s,
  isOpen,
  reduce,
  onToggle,
  onPoint,
}: {
  s: Sector;
  isOpen: boolean;
  reduce: boolean;
  onToggle: () => void;
  onPoint: () => void;
}) {
  const panelId = useId();

  return (
    <li className="border-b border-surface-line">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") onPoint();
        }}
        onFocus={onPoint}
        className="group grid w-full cursor-pointer grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 py-5 text-left sm:grid-cols-[3rem_1fr_auto] sm:py-6"
      >
        <span className={`font-mono-ui text-xs tabular-nums tracking-wider ${isOpen ? "text-accent" : "text-ink-muted"}`}>
          {s.index}
        </span>
        <span>
          <span
            className={`block font-display text-2xl leading-tight transition-colors duration-300 sm:text-[28px] ${
              isOpen ? "text-ink" : "text-ink/75 group-hover:text-ink"
            }`}
          >
            {s.title}
          </span>
          <span className="mt-1 block text-sm font-light text-ink-muted">{s.summary}</span>
        </span>
        <span
          aria-hidden="true"
          className={`grid h-9 w-9 place-items-center self-center rounded-full border text-ink-muted transition-[transform,border-color,color] duration-300 ${
            isOpen ? "rotate-45 border-accent/40 text-accent" : "border-surface-line group-hover:border-ink/30 group-hover:text-ink"
          }`}
        >
          +
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="pb-7 pl-[3.5rem] sm:pl-[4rem]">
              {/* the photo lives in the row on narrow screens, beside the list on wide ones */}
              <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-xl bg-surface-line/40 lg:hidden">
                <Image src={s.image} alt="" fill sizes="(max-width: 1023px) 90vw, 0px" className="object-cover" />
              </div>
              <p className="max-w-[56ch] text-[15px] font-light leading-relaxed text-ink-muted">{s.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${s.title} focus areas`}>
                {s.focusAreas.map((a) => (
                  <li
                    key={a}
                    className="rounded-full border border-surface-line px-3 py-1.5 font-mono-ui text-[11px] uppercase tracking-[0.08em] text-ink"
                  >
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
