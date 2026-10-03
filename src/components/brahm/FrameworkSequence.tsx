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
 * THE BRAHM FRAMEWORK: How We Build
 * Light Theme (Chalk & Pine):
 * - Background: Chalk base (#F8F6F2) with architectural hairline grid
 * - Typography: Playfair Display / Garamond display serif, warm graphite ink (#1C1F1E),
 *   muted graphite (#706A62), forest/pine accent (#1F5C43), and JetBrains Mono for eyebrows.
 * - Evolving visual structure SVG: crisp technical lines, nodes, frames, and foundation.
 */

const N = framework.length;

export default function FrameworkSequence() {
  const choreo = useChoreo();
  return (
    <section
      id="how-we-build"
      aria-labelledby="bx-framework-title"
      className="relative bg-surface text-ink border-b border-surface-line/60"
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
      <div className="sticky top-0 h-[100dvh] overflow-hidden bg-surface">
        <div aria-hidden="true" className="bx-grid absolute inset-0 pointer-events-none opacity-60" />
        <div className="relative mx-auto grid h-full max-w-[1400px] grid-cols-12 gap-8 px-8 lg:px-14 pb-[6vh] pt-[clamp(88px,12vh,124px)]">
          {/* left: header and stage index */}
          <div className="col-span-4 flex flex-col justify-between z-10">
            <Head compact />
            <ol className="mt-8 pr-4" aria-label="Framework stages">
              {framework.map((s, k) => {
                const isActive = k === i;
                const isPast = k < i;
                return (
                  <li key={s.title}>
                    <button
                      type="button"
                      onClick={() => scrollToStep(k)}
                      className="group flex w-full items-center gap-4 border-t border-surface-line/70 py-3 text-left transition-colors cursor-pointer"
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

          {/* centre: active stage showcase */}
          <div className="col-span-4 flex flex-col justify-end pb-4 z-10" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="relative"
              >
                <p
                  className="font-display text-[clamp(72px,8vw,140px)] font-normal leading-none text-ink/[0.08] select-none"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="-mt-[0.32em] font-display text-[clamp(64px,7vw,124px)] font-normal leading-[0.95] tracking-tight text-ink">
                  {step.title}
                </h3>
                <p className="mt-6 max-w-[40ch] text-[16px] md:text-[17px] font-light leading-relaxed text-ink-muted">
                  {step.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* right: dynamic abstract structure */}
          <div className="col-span-4 flex items-center justify-center z-10">
            <Structure p={p} />
          </div>
        </div>
      </div>
    </div>
  );
}

/** One abstract object that evolves through the six stages, driven continuously by scroll. */
function Structure({ p, still }: { p?: MotionValue<number>; still?: number }) {
  const fallback = useMotionValue(still ?? 1);
  const v = p ?? fallback;
  const seg = (k: number) => [k / N, (k + 0.7) / N];

  // 1 identify: a single point and its crosshair
  const point = useRange(v, [0, 0.04], [0, 1]);
  // 2 validate: points around it, connected back
  const net = useRange(v, seg(1), [0, 1]);
  // 3 build: a frame
  const frame = useRange(v, seg(2), [0, 1]);
  // 4 operate: the frame begins to turn; an orbit appears
  const orbit = useRange(v, seg(3), [0, 1]);
  const turn = useRange(v, [3 / N, 1], [0, 90]);
  // 5 grow: rings expand outward
  const grow = useRange(v, seg(4), [0, 1]);
  const ringR = useRange(v, seg(4), [60, 190]);
  const ringR2 = useTransform(ringR, (r) => r * 0.72);
  // 6 endure: a base and columns, the structure settles
  const endure = useRange(v, seg(5), [0, 1]);

  const PTS = [0, 72, 144, 216, 288].map((a) => {
    const r = (a - 90) * (Math.PI / 180);
    return { x: 200 + 110 * Math.cos(r), y: 200 + 110 * Math.sin(r) };
  });

  const lineBase = {
    stroke: "rgba(28, 31, 30, 0.28)",
    strokeWidth: 1.2,
    vectorEffect: "non-scaling-stroke" as const,
    fill: "none",
  };

  return (
    <div className="relative aspect-square w-full max-w-[440px] flex items-center justify-center p-4">

      <svg
        viewBox="0 0 400 400"
        className="w-full h-full overflow-visible"
        aria-hidden="true"
      >
        {/* grow: ripple rings */}
        <motion.circle
          cx={200}
          cy={200}
          r={ringR}
          {...lineBase}
          stroke="rgba(31, 92, 67, 0.35)"
          strokeWidth={1.5}
          style={{ opacity: grow }}
        />
        <motion.circle
          cx={200}
          cy={200}
          r={ringR2}
          {...lineBase}
          stroke="rgba(31, 92, 67, 0.22)"
          strokeDasharray="3 6"
          style={{ opacity: grow }}
        />

        {/* operate: orbit ring */}
        <motion.circle
          cx={200}
          cy={200}
          r={150}
          {...lineBase}
          stroke="rgba(31, 92, 67, 0.38)"
          strokeDasharray="2 7"
          style={{ opacity: orbit, rotate: turn, transformOrigin: "200px 200px" }}
        />

        {/* build: a square frame (rotating once operate begins) */}
        <motion.g style={{ rotate: turn, transformOrigin: "200px 200px" }}>
          <motion.rect
            x={110}
            y={110}
            width={180}
            height={180}
            {...lineBase}
            stroke="rgba(31, 92, 67, 0.5)"
            strokeWidth={1.4}
            style={{ pathLength: frame, opacity: frame }}
          />
          <motion.rect
            x={140}
            y={140}
            width={120}
            height={120}
            {...lineBase}
            stroke="rgba(28, 31, 30, 0.2)"
            style={{ pathLength: frame, opacity: frame }}
          />
        </motion.g>

        {/* validate: points connected back to the origin & perimeter polygon */}
        {PTS.map((q, k) => (
          <g key={k}>
            <motion.line
              x1={200}
              y1={200}
              x2={q.x}
              y2={q.y}
              {...lineBase}
              stroke="rgba(28, 31, 30, 0.25)"
              style={{ pathLength: net, opacity: net }}
            />
            <motion.circle
              cx={q.x}
              cy={q.y}
              r={4.5}
              fill="#FFFFFF"
              stroke="#1F5C43"
              strokeWidth={1.8}
              style={{ opacity: net }}
            />
          </g>
        ))}
        {PTS.map((q, k) => {
          const m = PTS[(k + 1) % PTS.length];
          return (
            <motion.line
              key={`e${k}`}
              x1={q.x}
              y1={q.y}
              x2={m.x}
              y2={m.y}
              {...lineBase}
              stroke="rgba(28, 31, 30, 0.35)"
              style={{ pathLength: net, opacity: net }}
            />
          );
        })}

        {/* endure: foundation base & architectural columns */}
        <motion.g style={{ opacity: endure }}>
          <motion.line
            x1={60}
            y1={340}
            x2={340}
            y2={340}
            {...lineBase}
            stroke="#1F5C43"
            strokeWidth={2.5}
            style={{ pathLength: endure }}
          />
          <motion.line
            x1={80}
            y1={352}
            x2={320}
            y2={352}
            {...lineBase}
            stroke="rgba(31, 92, 67, 0.4)"
            strokeWidth={1.5}
            style={{ pathLength: endure }}
          />
          {[110, 160, 240, 290].map((x) => (
            <motion.line
              key={x}
              x1={x}
              y1={340}
              x2={x}
              y2={300}
              {...lineBase}
              stroke="#1F5C43"
              strokeWidth={1.5}
              style={{ pathLength: endure }}
            />
          ))}
        </motion.g>

        {/* identify: center point and crosshair */}
        <motion.g style={{ opacity: point }}>
          <line x1={186} y1={200} x2={214} y2={200} {...lineBase} stroke="rgba(28, 31, 30, 0.3)" />
          <line x1={200} y1={186} x2={200} y2={214} {...lineBase} stroke="rgba(28, 31, 30, 0.3)" />
          <circle cx={200} cy={200} r={5} fill="#1F5C43" />
        </motion.g>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ phone, tablet, reduced motion */

function Stacked() {
  return (
    <div className="bx-grid bg-surface px-6 pb-24 pt-20 md:px-12">
      <div className="mx-auto max-w-[1280px]">
        <Head />

        {/* Visual structure preview */}
        <div className="mx-auto my-10 w-[min(100%,340px)]">
          <Structure still={1} />
        </div>

        {/* Step list for mobile/tablet */}
        <ol className="border-t border-surface-line">
          {framework.map((s, k) => (
            <li key={s.title} className="grid grid-cols-[3rem_1fr] gap-x-4 border-b border-surface-line py-7">
              <span className="pt-3 font-mono-ui text-xs tracking-wider text-accent">{String(k + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-display text-[clamp(40px,10vw,64px)] font-normal leading-none text-ink">{s.title}</h3>
                <p className="mt-3 max-w-[52ch] text-[15px] font-light leading-relaxed text-ink-muted">{s.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
