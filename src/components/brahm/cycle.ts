"use client";

import { useState } from "react";
import { animate, useMotionValue, useReducedMotion } from "framer-motion";
import { EASE } from "./motion";

/**
 * Selection state for the sector reel. `pos` is a continuous position in item units that only
 * ever moves the short way round, so the ring never spins back through every item to reach a
 * neighbour. Nothing moves on its own: the ring turns only when someone picks an item.
 */
export function useCycle(n: number) {
  const reduce = useReducedMotion();
  const pos = useMotionValue(0);
  const [at, setAt] = useState(0); // cumulative integer position
  const active = ((at % n) + n) % n;

  /** Go to item `i` the short way round. */
  const go = (i: number) => {
    let d = (((i - active) % n) + n) % n;
    if (d > n / 2) d -= n;
    if (d === 0) return;
    setAt(at + d);
    animate(pos, at + d, reduce ? { duration: 0 } : { duration: 1.1, ease: EASE });
  };

  return { pos, active, go };
}
