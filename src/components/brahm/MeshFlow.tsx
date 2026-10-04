"use client";

import { useEffect, useRef } from "react";

/*
 * Mesh Flow: a dot grid that sits almost invisible until the pointer draws it into a well,
 * the lines bending like a rubber sheet under a weight. One gaussian drives everything: how far
 * each point is pulled, its dot size and brightness, and the brightness of its lines. Before
 * the pointer arrives (and always on touch screens) the well drifts on a slow Lissajous path.
 * Canvas 2D; draws only while on screen and the tab is visible; still with reduced motion.
 * Listens for the pointer on its parent, so it can sit behind content without blocking it.
 */
const STEP = 26;
const BUCKETS = 24; // alpha levels, so lines and dots draw in a few batched paths

export default function MeshFlow({ className = "", line = "127,183,155", dot = "248,246,242" }: { className?: string; line?: string; dot?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    const host = cv?.parentElement;
    const ctx = cv?.getContext("2d");
    if (!cv || !host || !ctx) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(hover: none)").matches;

    let W = 0, H = 0, cols = 0, rows = 0;
    let bx = new Float32Array(0), by = new Float32Array(0);
    let px = new Float32Array(0), py = new Float32Array(0), pg = new Float32Array(0);

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      W = host.clientWidth;
      H = host.clientHeight;
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      cv.style.width = `${W}px`;
      cv.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.floor(W / STEP) + 2;
      rows = Math.floor(H / STEP) + 2;
      const ox = (W - (cols - 1) * STEP) / 2;
      const oy = (H - (rows - 1) * STEP) / 2;
      const n = cols * rows;
      bx = new Float32Array(n); by = new Float32Array(n);
      px = new Float32Array(n); py = new Float32Array(n); pg = new Float32Array(n);
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
        bx[r * cols + c] = ox + c * STEP;
        by[r * cols + c] = oy + r * STEP;
      }
      if (still) draw(0);
    };

    // the pointer: drifts until a mouse first enters, then follows it
    let entered = false;
    const target = { x: 0.5, y: 0.5 };
    const eased = { x: -1, y: -1 };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = host.getBoundingClientRect();
      entered = true;
      target.x = (e.clientX - r.left) / W;
      target.y = (e.clientY - r.top) / H;
    };
    if (!touch) host.addEventListener("pointermove", onMove);

    const lineBuckets: number[][] = Array.from({ length: BUCKETS }, () => []);
    const dotBuckets: number[][] = Array.from({ length: BUCKETS }, () => []);

    function draw(t: number) {
      if (!entered) {
        target.x = 0.5 + 0.34 * Math.sin(t * 0.7) * Math.cos(t * 0.23);
        target.y = 0.5 + 0.3 * Math.sin(t * 0.52 + 1.1);
      }
      const tx = target.x * W, ty = target.y * H;
      if (eased.x < 0 || still) { eased.x = tx; eased.y = ty; }
      eased.x += (tx - eased.x) * 0.1;
      eased.y += (ty - eased.y) * 0.1;

      // sized from the screen, not the canvas: the section is taller than a screen, and a well
      // scaled to it swallowed half the grid. A tight, gentle well reads as a dent, not a disc.
      const m = Math.min(W, window.innerHeight);
      const SIG = 0.16 * m, PULL = 0.12 * m, s2 = 2 * SIG * SIG;
      for (let k = 0; k < bx.length; k++) {
        const dx = eased.x - bx[k], dy = eased.y - by[k];
        const d = Math.sqrt(dx * dx + dy * dy) || 1;
        const g = Math.exp(-(d * d) / s2);
        // pull toward the well, but stop well short so the centre never packs into a solid patch
        const move = Math.min(g * PULL, d * 0.4);
        px[k] = bx[k] + (dx / d) * move;
        py[k] = by[k] + (dy / d) * move;
        pg[k] = g;
      }

      ctx!.clearRect(0, 0, W, H);
      for (const b of lineBuckets) b.length = 0;
      for (const b of dotBuckets) b.length = 0;
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
        const k = r * cols + c;
        if (c + 1 < cols) {
          const a = (pg[k] + pg[k + 1]) / 2;
          if (a >= 0.004) lineBuckets[Math.min(BUCKETS - 1, Math.floor(a * BUCKETS))].push(k, k + 1);
        }
        if (r + 1 < rows) {
          const a = (pg[k] + pg[k + cols]) / 2;
          if (a >= 0.004) lineBuckets[Math.min(BUCKETS - 1, Math.floor(a * BUCKETS))].push(k, k + cols);
        }
        dotBuckets[Math.min(BUCKETS - 1, Math.floor(pg[k] * BUCKETS))].push(k);
      }
      ctx!.lineWidth = 1;
      lineBuckets.forEach((b, i) => {
        if (!b.length) return;
        ctx!.strokeStyle = `rgba(${line},${(0.04 + ((i + 0.5) / BUCKETS) * 0.62).toFixed(3)})`;
        ctx!.beginPath();
        for (let j = 0; j < b.length; j += 2) {
          ctx!.moveTo(px[b[j]], py[b[j]]);
          ctx!.lineTo(px[b[j + 1]], py[b[j + 1]]);
        }
        ctx!.stroke();
      });
      dotBuckets.forEach((b, i) => {
        if (!b.length) return;
        const g = (i + 0.5) / BUCKETS;
        const rad = 0.9 + g * 1.9;
        ctx!.fillStyle = `rgba(${dot},${(0.16 + g * 0.62).toFixed(3)})`;
        ctx!.beginPath();
        for (const k of b) {
          ctx!.moveTo(px[k] + rad, py[k]);
          ctx!.arc(px[k], py[k], rad, 0, Math.PI * 2);
        }
        ctx!.fill();
      });
    }

    let raf = 0;
    let visible = false;
    const t0 = performance.now();
    const loop = (now: number) => {
      draw((now - t0) / 1000);
      raf = requestAnimationFrame(loop);
    };
    const sync = () => {
      const run = visible && !document.hidden && !still;
      if (run && !raf) raf = requestAnimationFrame(loop);
      if (!run && raf) { cancelAnimationFrame(raf); raf = 0; }
    };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; sync(); });
    io.observe(host);
    document.addEventListener("visibilitychange", sync);
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", sync);
      host.removeEventListener("pointermove", onMove);
    };
  }, [line, dot]);

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`} />;
}
