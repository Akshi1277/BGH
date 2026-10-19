"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { sectors, sectorsIntro } from "./content";
import { EASE } from "./motion";
import ReelRing, {
  type ReelRingHandle,
  type ReelSectorItem,
} from "./ReelRing";

/*
 * GROUP SECTORS — 3D REEL RING LOADER & CYLINDER CAROUSEL:
 * Adapted from avivashishta.com's 3D Reel Ring Hero:
 * - 16 vertical cards (270 x 480 px, 9:16) sit on the inside of a cylinder.
 * - As the section enters view, cards start stacked at the front (-180 deg) of a small tilted
 *   ring (radius 460, tilt -22 deg, dutch roll -20 deg) and deal out around the circle while
 *   the tabular odometer climbs to 100%.
 * - When the deal completes and sector covers are decoded, the same ring opens into the
 *   full-width 3D carousel (radius 1800, level camera, perspective 450) with no scene handoff.
 * - Autoplay dwells on each sector before stepping on, and waits while the pointer rests on the section.
 * - Visitors can drag, swipe, horizontal-scroll, step, or pick any sector below to turn the cylinder.
 */

const groups = [...new Set(sectors.map((s) => s.group))];

export default function SectorReel() {
  const reduceMotion = useReducedMotion() ?? false;
  const stageRef = useRef<HTMLElement>(null);
  const ringRef = useRef<ReelRingHandle>(null);

  const [inView, setInView] = useState(false);
  const [chromeReady, setChromeReady] = useState(reduceMotion);
  const [immediate, setImmediate] = useState(reduceMotion);
  const [entered, setEntered] = useState(reduceMotion);
  const [active, setActive] = useState(0);
  const [focused, setFocused] = useState<number | null>(null);

  // Trigger the loader deal -> 3D carousel reveal when the section enters the viewport
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    if (reduceMotion) {
      setInView(true);
      setChromeReady(true);
      setImmediate(true);
      setEntered(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.18 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduceMotion]);

  // Live proximity: media loads and the reel loop runs only while the section is on (or about to be on) screen
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setNear(entry.isIntersecting),
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Subtle pointer parallax for the stage atmosphere
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 40, damping: 18, mass: 1 });
  const springY = useSpring(rawY, { stiffness: 40, damping: 18, mass: 1 });

  useEffect(() => {
    const fineMq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const redMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMove = (e: PointerEvent) => {
      if (fineMq.matches && !redMq.matches) {
        rawX.set((e.clientX / window.innerWidth) * 2 - 1);
        rawY.set((e.clientY / window.innerHeight) * 2 - 1);
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [rawX, rawY]);

  const handleChromeStart = useCallback((isImmediate = false) => {
    setImmediate(isImmediate);
    setChromeReady(true);
  }, []);

  const handleEntranceComplete = useCallback(() => {
    setEntered(true);
    setChromeReady(true);
  }, []);

  const handlePickSector = useCallback((idx: number) => {
    setActive(idx);
    ringRef.current?.spinToItem(idx);
  }, []);

  return (
    <section
      ref={stageRef}
      id="sectors"
      data-stage=""
      data-focus={focused !== null ? String(focused) : undefined}
      aria-labelledby="bx-sectors-title"
      className="bx-stage"
    >
      {/* 3D World Frame: houses both the tilted coin loader and the expanded 3D cylinder carousel */}
      <div
        className="bx-worldFrame"
        data-open={chromeReady ? undefined : ""}
        data-entering={entered ? undefined : ""}
        data-immediate={immediate ? "" : undefined}
      >
        <WorldBackdrop x={springX} y={springY} />

        <div className="bx-wallWrap">
          <ReelRing
            ref={ringRef}
            items={sectors}
            activeIndex={active}
            focusedIndex={focused}
            inView={inView}
            near={near}
            stageRef={stageRef}
            onSelect={setActive}
            onChromeStart={handleChromeStart}
            onEntranceComplete={handleEntranceComplete}
          />
        </div>

        <WorldForeground x={springX} y={springY} />
      </div>

      {/* Overlapping handoff: starts at 1.05s while the 3D cards are still settling */}
      <motion.div
        className="bx-below"
        initial={{ opacity: 0, y: 12 }}
        animate={{
          opacity: chromeReady ? 1 : 0,
          y: chromeReady ? 0 : 12,
        }}
        transition={{ duration: immediate ? 0 : 0.6, ease: EASE }}
      >
        <div className="mx-auto grid max-w-[var(--spacing-container-max)] items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Intro */}
          <div className="lg:col-span-5">
            <span className="text-eyebrow mb-3 block font-mono-ui uppercase text-accent">
              {sectorsIntro.eyebrow}
            </span>
            <h2
              id="bx-sectors-title"
              data-sectors-wordmark=""
              className="font-display text-3xl leading-[1.06] tracking-tight text-ink sm:text-4xl lg:text-5xl"
            >
              <MaskedWords
                text={sectorsIntro.title}
                ready={chromeReady}
                immediate={immediate}
                startIndex={0}
              />{" "}
              <span className="font-normal italic text-accent">
                <MaskedWords
                  text={`${sectorsIntro.titleAccent}.`}
                  ready={chromeReady}
                  immediate={immediate}
                  startIndex={2}
                />
              </span>
            </h2>
            <p className="mt-3 max-w-md text-sm font-light leading-relaxed text-ink-muted sm:text-base">
              {sectorsIntro.body}
            </p>
            <SectorStepper active={active} onPick={handlePickSector} />
          </div>

          {/* Right Column: Quiet Sector Index + Active Sector Details */}
          <div className="lg:col-span-7">
            <SectorIndex
              active={active}
              onPick={handlePickSector}
              onHover={setFocused}
            />
            <div className="grid grid-cols-[minmax(0,1fr)]">
              {sectors.map((s, i) => (
                <Details key={s.index} s={s} on={i === active} />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function MaskedWords({
  text,
  ready,
  immediate,
  startIndex = 0,
}: {
  text: string;
  ready: boolean;
  immediate: boolean;
  startIndex?: number;
}) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, idx) => (
        <Fragment key={idx}>
          {idx > 0 && " "}
          <span className="bx-wordMask">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: ready ? "0%" : "110%" }}
              transition={{
                duration: immediate ? 0 : 0.75,
                delay: immediate ? 0 : 0.04 + (startIndex + idx) * 0.035,
                ease: EASE,
              }}
            >
              {word}
            </motion.span>
          </span>
        </Fragment>
      ))}
    </>
  );
}

function SectorStepper({
  active,
  onPick,
}: {
  active: number;
  onPick: (i: number) => void;
}) {
  const total = sectors.length;
  const stepClass =
    "grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-full border border-surface-line text-ink-muted transition-colors hover:border-accent/40 hover:text-accent";

  return (
    <div className="mt-8 flex items-center gap-4">
      <button
        type="button"
        aria-label="Previous sector"
        onClick={() => onPick((active - 1 + total) % total)}
        className={stepClass}
      >
        <span aria-hidden="true">←</span>
      </button>
      <span className="font-mono-ui text-xs tabular-nums tracking-[0.14em] text-ink-muted">
        <span className="text-ink">{sectors[active].index}</span> /{" "}
        {String(total).padStart(2, "0")}
      </span>
      <button
        type="button"
        aria-label="Next sector"
        onClick={() => onPick((active + 1) % total)}
        className={stepClass}
      >
        <span aria-hidden="true">→</span>
      </button>
      <span className="ml-2 hidden text-xs font-light text-ink-muted sm:inline">
        Drag the reel or choose a sector
      </span>
    </div>
  );
}

function SectorIndex({
  active,
  onPick,
  onHover,
}: {
  active: number;
  onPick: (i: number) => void;
  onHover: (i: number | null) => void;
}) {
  return (
    <div className="mb-8 space-y-5">
      {groups.map((g) => (
        <div key={g}>
          <p className="mb-2 font-mono-ui text-[10px] uppercase tracking-[0.2em] text-ink-muted">
            {g}
          </p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
            {sectors.map((s, i) =>
              s.group === g ? (
                <button
                  key={s.index}
                  type="button"
                  onClick={() => onPick(i)}
                  onPointerEnter={(e) => {
                    if (e.pointerType === "mouse") onHover(i);
                  }}
                  onPointerLeave={() => onHover(null)}
                  onFocus={() => onHover(i)}
                  onBlur={() => onHover(null)}
                  aria-current={active === i}
                  className={`relative cursor-pointer justify-self-start py-1 text-left font-display text-lg leading-snug transition-colors duration-300 ${
                    active === i
                      ? "text-ink"
                      : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {s.title}
                  {active === i && (
                    <span className="absolute inset-x-0 bottom-0 h-px bg-accent" />
                  )}
                </button>
              ) : null,
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function Details({ s, on }: { s: ReelSectorItem; on: boolean }) {
  return (
    <motion.div
      id={`sector-detail-${s.index}`}
      initial={false}
      animate={{ opacity: on ? 1 : 0, y: on ? 0 : 14 }}
      transition={{
        duration: on ? 0.5 : 0.25,
        delay: on ? 0.14 : 0,
        ease: EASE,
      }}
      aria-hidden={!on}
      inert={!on}
      className={`[grid-area:1/1] ${on ? "" : "pointer-events-none"}`}
    >
      <h3 className="font-display text-[clamp(28px,3vw,44px)] font-normal leading-[1.06] text-ink">
        {s.title}
      </h3>
      <p className="mt-2 font-display text-lg font-light italic text-accent">
        {s.summary}
      </p>
      <p className="mt-5 max-w-[56ch] text-[15px] font-light leading-relaxed text-ink-muted">
        {s.description}
      </p>
      <p className="mt-5 text-[15px] leading-relaxed text-ink">
        <span className="text-ink-muted">Core capabilities: </span>
        {s.focusAreas.map((a, k) => (
          <Fragment key={a}>
            <span className="whitespace-nowrap">{a}</span>
            {k < s.focusAreas.length - 1 && (
              <span className="text-ink-muted"> · </span>
            )}
          </Fragment>
        ))}
      </p>
    </motion.div>
  );
}

function WorldBackdrop({
  x,
  y,
}: {
  x: MotionValue<number>;
  y: MotionValue<number>;
}) {
  const dx = useTransform(x, (v) => -v * 12);
  const dy = useTransform(y, (v) => -v * 6);

  return (
    <div className="bx-worldView" aria-hidden="true">
      <motion.div style={{ x: dx, y: dy }} className="absolute inset-0">
        <div className="bx-grid absolute inset-0 opacity-60" />
      </motion.div>
    </div>
  );
}

function WorldForeground({
  x,
  y,
}: {
  x: MotionValue<number>;
  y: MotionValue<number>;
}) {
  const dx = useTransform(x, (v) => -v * 24);
  const dy = useTransform(y, (v) => -v * 12);

  return (
    <div className="bx-worldView bx-worldFront" aria-hidden="true">
      <motion.div
        style={{ x: dx, y: dy }}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-surface/80 to-transparent"
      />
    </div>
  );
}
