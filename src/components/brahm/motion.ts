"use client";

import { useEffect, useState } from "react";
import { transform as mapRange, useReducedMotion, useTransform, type MotionValue } from "framer-motion";

/** The one easing curve for the whole site: a long, weighted ease-out. No springs, no bounce. */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Wide screen (≥1024px) with motion allowed: where the scroll-driven sequences run. */
export function useChoreo() {
  const reduce = useReducedMotion();
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return wide && !reduce;
}

/** Mouse or trackpad with motion allowed: where cursor-driven depth and hover reveals run. */
export function useFinePointer() {
  const reduce = useReducedMotion();
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const on = () => setFine(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return fine && !reduce;
}

/** Index of the step a 0..1 progress value falls in, for n equal steps. */
export const stepOf = (v: number, n: number) => Math.min(n - 1, Math.max(0, Math.floor(v * n)));

/**
 * Scroll-linked mapping, computed on every update. framer-motion can hand plain
 * `useTransform(v, input, output)` on opacity to the browser's native scroll timeline, which
 * evaluated these pinned sections incorrectly; the function form always runs in JavaScript.
 */
export function useRange(v: MotionValue<number>, input: number[], output: number[]): MotionValue<number>;
export function useRange(v: MotionValue<number>, input: number[], output: string[]): MotionValue<string>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- implementation signature for the overloads above
export function useRange(v: MotionValue<number>, input: number[], output: (number | string)[]): MotionValue<any> {
  return useTransform(v, (x: number) => mapRange(x, input, output as number[]));
}
