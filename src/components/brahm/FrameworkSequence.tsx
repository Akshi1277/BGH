"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { framework, frameworkIntro } from "./content";
import { EASE, stepOf, useChoreo, useRange } from "./motion";

/*
 * THE BRAHM FRAMEWORK: How We Build. A pinned sequence: the six stages are listed on the left;
 * the current stage is named beneath a drawing of a building that is put up stage by stage as
 * you scroll. A survey marker on an empty plot (Identify), the site set out and measured
 * (Validate), plinth, columns and beam (Build), light in the door and windows (Operate), wings
 * either side (Grow), and the pediment and foundation that finish it while the construction
 * guides fade (Endure). Same words as before.
 */

const N = framework.length;

export default function FrameworkSequence() {
  const choreo = useChoreo();
  return (
    <section
      id="how-we-build"
      aria-labelledby="bx-framework-title"
      className="relative bg-paper text-ink border-b border-surface-line/60"
    >
      {choreo ? <Pinned /> : <Stacked />}
    </section>
  );
}

function Head({ compact = false }: { compact?: boolean }) {
  return (
    <div>
      <span className="text-eyebrow font-mono-ui text-accent block uppercase tracking-[0.2em] mb-3">
        {frameworkIntro.eyebrow}
      </span>
      <h2
        id="bx-framework-title"
        className={`font-display text-ink font-normal leading-[1.08] ${
          compact
            ? "text-3xl md:text-4xl lg:text-[44px]"
            : "text-4xl md:text-5xl lg:text-6xl"
        }`}
      >
        {frameworkIntro.title}{" "}
        <span className="italic text-accent">{frameworkIntro.titleAccent}</span>{" "}
        {frameworkIntro.titleEnd}
      </h2>
      <p className="mt-4 max-w-[46ch] text-[15px] md:text-base font-light leading-relaxed text-ink-muted">
        {frameworkIntro.body}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ desktop: pinned sequence */

function Pinned() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const [i, setI] = useState(0);
  useMotionValueEvent(p, "change", (v) => setI(stepOf(v, N)));
  const step = framework[i];

  const scrollToStep = (idx: number) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const scrollY = window.scrollY;
    const elementTop = rect.top + scrollY;
    const scrollableDistance = ref.current.scrollHeight - window.innerHeight;
    const targetScroll = elementTop + (idx / Math.max(1, N - 1)) * scrollableDistance;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
    setI(idx);
  };

  return (
    <div ref={ref} className="relative h-[320vh]">
      <div className="sticky top-0 h-[100dvh] overflow-hidden bg-paper">
        <div aria-hidden="true" className="bx-grid absolute inset-0 pointer-events-none opacity-60" />
        <div className="relative mx-auto grid h-full max-w-[1400px] grid-cols-12 grid-rows-[minmax(0,1fr)] gap-8 px-8 lg:px-14 pb-[6vh] pt-[clamp(88px,12vh,124px)]">
          {/* left: header and stage index; the list takes whatever height is left, so all six stages fit short screens */}
          <div className="col-span-4 flex min-h-0 flex-col z-10">
            <Head compact />
            <ol className="mt-[clamp(14px,3vh,32px)] flex min-h-0 flex-1 flex-col justify-end pr-4" aria-label="Framework stages">
              {framework.map((s, k) => {
                const isActive = k === i;
                const isPast = k < i;
                return (
                  <li key={s.title} className="flex max-h-[52px] min-h-[30px] flex-1">
                    <button
                      type="button"
                      onClick={() => scrollToStep(k)}
                      className="group flex w-full items-center gap-4 border-t border-surface-line/70 text-left transition-colors cursor-pointer"
                    >
                      <span
                        className={`font-mono-ui text-[12px] tracking-wider transition-colors duration-300 ${
                          isActive
                            ? "text-accent font-semibold"
                            : isPast
                            ? "text-ink/60"
                            : "text-ink/35 group-hover:text-ink/70"
                        }`}
                      >
                        {String(k + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`font-display text-[19px] transition-colors duration-300 ${
                          isActive
                            ? "text-ink font-semibold"
                            : isPast
                            ? "text-ink/75"
                            : "text-ink/35 group-hover:text-ink/70"
                        }`}
                      >
                        {s.title}
                      </span>
                      <span
                        aria-hidden="true"
                        className="relative ml-auto h-px w-14 bg-surface-line overflow-hidden"
                      >
                        <span
                          className="absolute inset-y-0 left-0 bg-accent transition-[width] duration-500 ease-out"
                          style={{ width: isPast ? "100%" : isActive ? "50%" : "0%" }}
                        />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* the building and the stage it is at, as one composition */}
          <div className="col-span-8 col-start-5 flex min-h-0 flex-col z-10" aria-live="polite">
            <div className="flex min-h-0 flex-1 items-end justify-center">
              <Elevation p={p} />
            </div>
            <div className="mt-[clamp(16px,3vh,36px)] min-h-[clamp(150px,22vh,210px)]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="grid grid-cols-8 items-end gap-8"
                >
                  <h3 className="col-span-4 font-display text-[clamp(44px,4.6vw,76px)] font-normal leading-[0.98] tracking-tight text-ink">
                    {step.title}
                  </h3>
                  <p className="col-span-4 max-w-[42ch] pb-2 text-[16px] font-light leading-relaxed text-ink-muted">{step.description}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* A classical building drawn in elevation, put up one stage at a time as the scroll advances. */
const INK = "rgba(28, 31, 30, 0.5)";
const FAINT = "rgba(28, 31, 30, 0.22)";
const PINE = "#1F5C43";
const LIGHT = "#E9C77B";
const stroke = { fill: "none", vectorEffect: "non-scaling-stroke" as const, strokeLinecap: "round" as const };
const COLS = [272, 336, 400, 480, 544, 608];
const WINGS = [96, 640];
const BAYS = [296, 360, 504, 568];

function Elevation({ p, still, crop = false }: { p?: MotionValue<number>; still?: number; crop?: boolean }) {
  const fallback = useMotionValue(still ?? 1);
  const v = p ?? fallback;
  const seg = (k: number, a = 0, b = 0.7) => [(k + a) / N, (k + b) / N];

  // 2 validate: the site set out and measured
  const validate = useRange(v, seg(1), [0, 1]);
  // 3 build: plinth, columns rising one after another, the beam across them
  const plinth = useRange(v, seg(2, 0, 0.25), [0, 1]);
  const beam = useRange(v, seg(2, 0.5, 0.75), [0, 1]);
  // 4 operate: light in the door and windows
  const operate = useRange(v, seg(3), [0, 1]);
  const glow = useTransform(operate, (o) => o * 0.55);
  // 5 grow: wings either side
  const grow = useRange(v, seg(4), [0, 1]);
  const growLight = useRange(v, seg(4, 0.4, 0.9), [0, 0.55]);
  // 6 endure: pediment and foundation finish it; the construction guides fade
  const endure = useRange(v, seg(5), [0, 1]);
  const guides = useTransform(() => validate.get() * (1 - endure.get() * 0.85));
  const vision = useRange(v, seg(5, 0.2, 0.9), [1, 0]);

  return (
    <svg viewBox={crop ? "176 80 528 312" : "60 80 760 320"} className="h-full max-h-[min(56vh,520px)] w-full overflow-visible" aria-hidden="true">
      {/* the vision: the finished building, faint and dashed, until it is real */}
      <motion.g style={{ opacity: vision }}>
        <Ghost />
      </motion.g>

      {/* 1 identify: ground, and a survey marker on the empty plot */}
      <line x1={40} y1={360} x2={840} y2={360} {...stroke} stroke={INK} strokeWidth={1.2} />
      <g>
        <line x1={440} y1={360} x2={440} y2={318} {...stroke} stroke={PINE} strokeWidth={1.4} />
        <path d="M440 318 L462 326 L440 334 Z" fill={PINE} opacity={0.85} />
        <circle cx={440} cy={360} r={4} fill={PINE} />
        <line x1={424} y1={360} x2={456} y2={360} {...stroke} stroke={PINE} strokeWidth={1.4} />
      </g>

      {/* 2 validate: setting-out lines, the footprint, and its dimension */}
      <motion.g style={{ opacity: guides }}>
        <motion.line x1={240} y1={360} x2={240} y2={92} {...stroke} stroke={FAINT} strokeDasharray="4 6" style={{ pathLength: validate }} />
        <motion.line x1={640} y1={360} x2={640} y2={92} {...stroke} stroke={FAINT} strokeDasharray="4 6" style={{ pathLength: validate }} />
        <motion.line x1={210} y1={170} x2={670} y2={170} {...stroke} stroke={FAINT} strokeDasharray="4 6" style={{ pathLength: validate }} />
        <motion.rect x={240} y={340} width={400} height={20} {...stroke} stroke={PINE} strokeOpacity={0.5} strokeDasharray="3 5" style={{ pathLength: validate }} />
        <motion.g style={{ opacity: validate }}>
          <line x1={240} y1={384} x2={640} y2={384} {...stroke} stroke={FAINT} />
          <line x1={240} y1={378} x2={240} y2={390} {...stroke} stroke={FAINT} />
          <line x1={640} y1={378} x2={640} y2={390} {...stroke} stroke={FAINT} />
        </motion.g>
      </motion.g>

      {/* 5 grow: wings either side */}
      {WINGS.map((x) => (
        <g key={x}>
          <motion.rect x={x} y={232} width={144} height={128} {...stroke} stroke={INK} strokeWidth={1.2} style={{ pathLength: grow, opacity: grow }} />
          <motion.line x1={x - 6} y1={232} x2={x + 150} y2={232} {...stroke} stroke={INK} strokeWidth={1.2} style={{ pathLength: grow, opacity: grow }} />
          {[0, 1, 2].map((k) => (
            <g key={k}>
              <motion.rect x={x + 20 + k * 40} y={262} width={24} height={40} {...stroke} stroke={INK} style={{ opacity: grow }} />
              <motion.rect x={x + 21 + k * 40} y={263} width={22} height={38} fill={LIGHT} style={{ opacity: growLight }} />
            </g>
          ))}
        </g>
      ))}

      {/* 3 build: plinth, columns, beam */}
      <motion.rect x={232} y={336} width={416} height={24} {...stroke} stroke={INK} strokeWidth={1.4} style={{ pathLength: plinth, opacity: plinth }} />
      {COLS.map((x, k) => (
        <Column key={x} x={x} v={v} from={(2.2 + k * 0.06) / N} to={(2.45 + k * 0.06) / N} />
      ))}
      <motion.rect x={224} y={170} width={432} height={22} {...stroke} stroke={INK} strokeWidth={1.4} style={{ pathLength: beam, opacity: beam }} />
      <motion.line x1={232} y1={202} x2={648} y2={202} {...stroke} stroke={INK} style={{ pathLength: beam, opacity: beam }} />

      {/* 4 operate: the door and windows light up */}
      <motion.g style={{ opacity: operate }}>
        <path d="M418 336 V276 Q440 254 462 276 V336" {...stroke} stroke={INK} strokeWidth={1.3} />
        {BAYS.map((x) => (
          <rect key={x} x={x - 2} y={234} width={28} height={64} {...stroke} stroke={INK} />
        ))}
      </motion.g>
      <motion.g style={{ opacity: glow }}>
        <path d="M419 335 V277 Q440 256 461 277 V335 Z" fill={LIGHT} />
        {BAYS.map((x) => (
          <rect key={x} x={x - 1} y={235} width={26} height={62} fill={LIGHT} />
        ))}
      </motion.g>

      {/* 6 endure: the pediment caps it; a heavy foundation settles beneath */}
      <motion.path d="M214 170 L440 98 L666 170" {...stroke} stroke={PINE} strokeWidth={1.8} style={{ pathLength: endure, opacity: endure }} />
      <motion.path d="M262 158 L440 112 L618 158" {...stroke} stroke={PINE} strokeOpacity={0.45} style={{ pathLength: endure, opacity: endure }} />
      <motion.line x1={70} y1={366} x2={810} y2={366} {...stroke} stroke={PINE} strokeWidth={2.6} style={{ pathLength: endure, opacity: endure }} />
      <motion.line x1={96} y1={374} x2={784} y2={374} {...stroke} stroke={PINE} strokeOpacity={0.4} strokeWidth={1.4} style={{ pathLength: endure, opacity: endure }} />
    </svg>
  );
}

/* The whole building as a faint dashed outline: what the plot is for, seen before it is built. */
function Ghost() {
  const g = { ...stroke, stroke: "rgba(28, 31, 30, 0.16)", strokeDasharray: "3 6" };
  return (
    <g>
      <path d="M214 170 L440 98 L666 170" {...g} />
      <rect x={224} y={170} width={432} height={22} {...g} />
      <rect x={232} y={336} width={416} height={24} {...g} />
      {COLS.map((x) => (
        <g key={x}>
          <line x1={x - 9} y1={336} x2={x - 9} y2={192} {...g} />
          <line x1={x + 9} y1={336} x2={x + 9} y2={192} {...g} />
        </g>
      ))}
      {WINGS.map((x) => (
        <rect key={x} x={x} y={232} width={144} height={128} {...g} />
      ))}
      <path d="M418 336 V276 Q440 254 462 276 V336" {...g} />
    </g>
  );
}

function Column({ x, v, from, to }: { x: number; v: MotionValue<number>; from: number; to: number }) {
  const rise = useRange(v, [from, to], [0, 1]);
  return (
    <motion.g style={{ opacity: rise }}>
      <motion.line x1={x - 9} y1={336} x2={x - 9} y2={192} {...stroke} stroke={INK} strokeWidth={1.3} style={{ pathLength: rise }} />
      <motion.line x1={x + 9} y1={336} x2={x + 9} y2={192} {...stroke} stroke={INK} strokeWidth={1.3} style={{ pathLength: rise }} />
      <rect x={x - 14} y={186} width={28} height={6} {...stroke} stroke={INK} />
      <rect x={x - 14} y={330} width={28} height={6} {...stroke} stroke={INK} />
    </motion.g>
  );
}

/* ------------------------------------------------------------------ phone, tablet, reduced motion */

function Stacked() {
  return (
    <div className="bx-grid bg-paper px-6 pb-24 pt-20 md:px-12">
      <div className="mx-auto max-w-[1280px]">
        <Head />

        {/* Visual structure preview */}
        <div className="mx-auto my-10 w-full max-w-[560px]">
          <Elevation still={1} crop />
        </div>

        {/* Step list for mobile/tablet */}
        <ol className="border-t border-surface-line">
          {framework.map((s, k) => (
            <li key={s.title} className="grid grid-cols-[3rem_1fr] gap-x-4 border-b border-surface-line py-7">
              <span className="pt-3 font-mono-ui text-xs tracking-wider text-accent">{String(k + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-display text-[clamp(28px,7.4vw,40px)] font-normal leading-tight text-ink">{s.title}</h3>
                <p className="mt-3 max-w-[52ch] text-[15px] font-light leading-relaxed text-ink-muted">{s.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
