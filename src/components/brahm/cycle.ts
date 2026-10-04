"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useMotionValue, useReducedMotion } from "framer-motion";
import { EASE } from "./motion";

/**
 * Shared state for the turning showcases (the sector reel and the company arc).
 * `pos` is a continuous position in item units that only ever moves the short way round,
 * so a ring or arc driven by it never spins back through every item to reach a neighbour.
 * Advances on its own every `autoMs`, except while hovered, paused, or off screen.
 */
export function useCycle(n: number, autoMs = 5000) {
  const reduce = useReducedMotion();
  const pos = useMotionValue(0);
  const [at, setAt] = useState(0); // cumulative integer position
  const [hover, setHover] = useState(false);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const active = ((at % n) + n) % n;

  // move(0) settles back on the current item, e.g. after a short drag
  const move = (d: number) => {
    const t = at + d;
    if (d !== 0) setAt(t);
    animate(pos, t, reduce ? { duration: 0 } : { duration: 1.1, ease: EASE });
  };
  /** Go to item `i` the short way round. */
  const go = (i: number) => {
    let d = (((i - active) % n) + n) % n;
    if (d > n / 2) d -= n;
    move(d);
  };
  /** One item forwards or backwards (`move` takes any whole number of items). */
  const step = (dir: 1 | -1) => move(dir);

  useEffect(() => {
    if (paused || hover || !inView) return;
    const t = setTimeout(() => move(1), autoMs);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- move reads the current position
  }, [at, paused, hover, inView, autoMs]);

  return {
    ref,
    pos,
    at,
    active,
    go,
    step,
    move,
    paused,
    togglePause: () => setPaused((p) => !p),
    hoverProps: { onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false) },
  };
}
