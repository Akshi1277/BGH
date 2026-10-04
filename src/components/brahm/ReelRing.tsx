"use client";

import Image from "next/image";
import { AnimatePresence, motion, useTransform, type MotionValue } from "framer-motion";
import { EASE } from "./motion";

/*
 * The reel: a ring cut into one arc per item, each arc a window onto that item's photograph.
 * The ring turns to bring the selected item to the pine marker at 12 o'clock while its photo
 * fills the centre. Photos counter-rotate inside their arcs so they stay upright as the ring
 * turns. Everything moves by transform only.
 */
const GAP = 1.6; // degrees of chalk between arcs

function arcPath(step: number) {
  const pts = ["50% 50%"];
  const from = -step / 2 + GAP / 2;
  const to = step / 2 - GAP / 2;
  for (let i = 0; i <= 12; i++) {
    const r = ((from + ((to - from) * i) / 12) * Math.PI) / 180;
    pts.push(`${(50 + 75 * Math.sin(r)).toFixed(2)}% ${(50 - 75 * Math.cos(r)).toFixed(2)}%`);
  }
  return `polygon(${pts.join(", ")})`;
}

type Item = { photo: string; label: string };

export default function ReelRing({ items, pos, active, onPick }: { items: Item[]; pos: MotionValue<number>; active: number; onPick: (i: number) => void }) {
  const step = 360 / items.length;
  const clip = arcPath(step);
  const turn = useTransform(pos, (p) => -p * step);
  const cur = items[active];
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[min(88vw,600px)]">
      <motion.div style={{ rotate: turn }} className="absolute inset-0 overflow-hidden rounded-full">
        {items.map((it, k) => (
          <Arc key={it.label} k={k} step={step} clip={clip} pos={pos} item={it} on={k === active} onPick={() => onPick(k)} />
        ))}
      </motion.div>

      {/* centre: the selected item, framed in chalk */}
      <div className="absolute left-1/2 top-1/2 aspect-square w-[60%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-[6px] border-surface bg-[#101412]">
        <AnimatePresence initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="absolute inset-0"
          >
            <Image src={cur.photo} alt="" fill sizes="(max-width: 1024px) 55vw, 360px" className="object-cover" />
          </motion.div>
        </AnimatePresence>
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#101412]/70 via-transparent to-transparent" />
        <span className="absolute bottom-[16%] left-1/2 max-w-[80%] -translate-x-1/2 truncate bg-accent px-2.5 py-1 font-mono-ui text-[10px] uppercase tracking-[0.16em] text-surface">
          {cur.label}
        </span>
      </div>

      {/* the marker the selected arc turns to */}
      <span aria-hidden="true" className="absolute -top-3 left-1/2 h-[23%] w-px -translate-x-1/2 bg-accent" />
      <span aria-hidden="true" className="absolute -top-3 left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
    </div>
  );
}

function Arc({ k, step, clip, pos, item, on, onPick }: { k: number; step: number; clip: string; pos: MotionValue<number>; item: Item; on: boolean; onPick: () => void }) {
  // keep the photo upright while the ring turns
  const upright = useTransform(pos, (p) => (p - k) * step);
  return (
    <button
      type="button"
      onClick={onPick}
      aria-label={`Show ${item.label}`}
      tabIndex={-1}
      className="absolute inset-0 cursor-pointer"
      style={{ clipPath: clip, transform: `rotate(${k * step}deg)` }}
    >
      <motion.span style={{ rotate: upright }} className="absolute inset-0 block">
        <Image
          src={item.photo}
          alt=""
          fill
          sizes="(max-width: 1024px) 88vw, 600px"
          className={`object-cover transition-[filter,opacity] duration-700 ${on ? "" : "opacity-75 grayscale"}`}
        />
      </motion.span>
    </button>
  );
}
