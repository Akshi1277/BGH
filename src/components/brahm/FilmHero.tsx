"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";

/*
 * THE HERO: the doors open, as a film scrubbed by scroll. A single continuous shot (made in
 * Google Flow) walks up to a palace; its doors open and the camera passes into a marble hall.
 * The clip is cut into 128 stills; scrolling plays them forward and back. The headline sits in
 * the sky above the roof; the invitation, with the group's description, waits inside the hall.
 *
 * Frames load in passes (every 16th, then every 8th, 4th, 2nd, all), so the scene can be
 * scrubbed before everything has arrived, drawing the nearest frame that has loaded. Phones get
 * a portrait crop of the centre. The displayed frame eases toward the scroll position, so jumps
 * of the wheel still read as motion. Runs only while on screen; reduced motion gets a still.
 */
const N = 128;
const src = (set: "d" | "m", i: number) => `/images/hero/doors/${set}/${String(i).padStart(3, "0")}.webp`;

export default function FilmHero() {
  return useReducedMotion() ? <Still /> : <Film />;
}

/* The opening words sit in the sky above the palace roof; the invitation waits inside the hall. */
function Copy({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center px-5 text-center ${className}`}>
      <h1 className="font-display text-[clamp(38px,min(4.8vw,7.6vh),76px)] font-normal leading-[1.05] tracking-[-0.015em] text-ink lg:whitespace-nowrap">
        Building Businesses <br className="lg:hidden" />
        That <span className="italic font-light text-accent">Endure.</span>
      </h1>
      <p className="mt-3 max-w-3xl text-[clamp(15px,1.25vw,19px)] font-medium leading-snug text-ink">
        Building enterprises with the ambition to shape industries and drive lasting value.
      </p>
    </div>
  );
}

function Invitation() {
  return (
    <Link href="/#contact" className="mt-7 flex items-center gap-3 rounded-full bg-surface px-8 py-4 font-mono-ui text-xs font-bold uppercase tracking-[0.15em] text-ink">
      Explore The Group →
    </Link>
  );
}

function Still() {
  return (
    <section className="relative h-[100svh] overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element -- a single still frame */}
      <img src={src("d", 0)} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <Copy className="relative pt-[clamp(96px,12vh,120px)]" />
      <div className="relative mt-6 flex justify-center">
        <Link href="/#contact" className="flex items-center gap-3 rounded-full bg-ink px-8 py-4 font-mono-ui text-xs font-bold uppercase tracking-[0.15em] text-surface">
          Explore The Group →
        </Link>
      </div>
    </section>
  );
}

function Film() {
  const trackRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const capRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLSpanElement>(null);
  const shadeRef = useRef<HTMLDivElement>(null);
  const [poster, setPoster] = useState(true);

  useEffect(() => {
    const track = trackRef.current, cv = canvasRef.current, copy = copyRef.current, cap = capRef.current, cue = cueRef.current, shade = shadeRef.current;
    const ctx = cv?.getContext("2d");
    if (!track || !cv || !ctx || !copy || !cap || !cue || !shade) return;

    const set: "d" | "m" = window.innerWidth / window.innerHeight < 0.9 ? "m" : "d";
    const imgs: (HTMLImageElement | null)[] = Array(N).fill(null);

    // load in passes so the whole scene is roughly scrubbable early
    const order: number[] = [];
    const seen = new Set<number>();
    for (const step of [16, 8, 4, 2, 1]) {
      for (let i = 0; i < N; i += step) {
        if (seen.has(i)) continue;
        seen.add(i);
        order.push(i);
      }
    }
    if (!seen.has(N - 1)) order.splice(1, 0, N - 1);
    let next = 0, alive = true;
    const pump = () => {
      if (!alive || next >= order.length) return;
      const i = order[next++];
      const im = new Image();
      im.decoding = "async";
      im.onload = () => {
        imgs[i] = im;
        dirty = true;
        pump();
      };
      im.onerror = pump;
      im.src = src(set, i);
    };
    for (let c = 0; c < 6; c++) pump();

    let W = 0, H = 0;
    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      W = cv.clientWidth;
      H = cv.clientHeight;
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dirty = true;
    };

    const nearest = (f: number) => {
      for (let d = 0; d < N; d++) {
        if (f - d >= 0 && imgs[f - d]) return imgs[f - d];
        if (f + d < N && imgs[f + d]) return imgs[f + d];
      }
      return null;
    };
    let shown = 0, drawnIdx = -1, dirty = true;
    const draw = () => {
      const f = Math.round(shown);
      const im = nearest(f);
      if (!im) return;
      // object-fit: cover
      const s = Math.max(W / im.naturalWidth, H / im.naturalHeight);
      const w = im.naturalWidth * s, h = im.naturalHeight * s;
      ctx.drawImage(im, (W - w) / 2, (H - h) / 2, w, h);
      drawnIdx = f;
      dirty = false;
      setPoster(false);
    };

    const ramp = (p: number, a: number, b: number) => Math.min(1, Math.max(0, (p - a) / (b - a)));
    let raf = 0, visible = true;
    const tick = () => {
      raf = 0;
      if (!alive) return;
      const r = track.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - window.innerHeight)));
      const target = p * (N - 1);
      shown += (target - shown) * 0.22;
      if (Math.abs(target - shown) < 0.02) shown = target;
      if (Math.round(shown) !== drawnIdx || dirty) draw();
      // the headline leaves first; the line about the institution arrives inside the hall
      const out = ramp(p, 0.02, 0.14);
      copy.style.opacity = String(1 - out);
      copy.style.transform = `translateY(${(-out * 120).toFixed(1)}px)`;
      cue.style.opacity = String(1 - ramp(p, 0, 0.05));
      const inn = ramp(p, 0.84, 0.95);
      cap.style.opacity = String(inn);
      shade.style.opacity = String(0.4 + 0.6 * ramp(p, 0.78, 0.92));
      cap.style.transform = `translateY(${((1 - inn) * 24).toFixed(1)}px)`;
      if (visible && (Math.abs(target - shown) > 0 || dirty)) raf = requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!raf && visible) raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      kick();
    });
    io.observe(track);
    window.addEventListener("scroll", kick, { passive: true });
    const ro = new ResizeObserver(() => {
      resize();
      kick();
    });
    ro.observe(cv);
    resize();
    const poll = window.setInterval(() => dirty && kick(), 120); // repaint as better frames arrive
    kick();

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      clearInterval(poll);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("scroll", kick);
    };
  }, []);

  return (
    <section ref={trackRef} className="relative h-[420vh] bg-surface">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* the first frame, shown until the canvas has painted */}
        {poster && (
          // eslint-disable-next-line @next/next/no-img-element -- first frame of the film
          <img src={src("d", 0)} alt="" className="absolute inset-0 h-full w-full object-cover" />
        )}
        <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
        {/* a soft light behind the headline so it reads over the sky */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[42%] bg-[radial-gradient(ellipse_55%_65%_at_50%_32%,rgba(248,246,242,0.7),transparent_72%)]" />
        <div ref={copyRef} className="absolute inset-x-0 top-[clamp(96px,12vh,120px)] z-10 will-change-transform">
          <Copy />
        </div>
        <span ref={cueRef} className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 font-mono-ui text-[10px] uppercase tracking-[0.2em] text-ink/60">
          Scroll
        </span>
        {/* shade at the foot of the frame, deepening only as the hall arrives, so the closing words read over bright marble */}
        <div ref={shadeRef} aria-hidden="true" style={{ opacity: 0.4 }} className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-black/75 via-black/35 to-transparent" />
        <div ref={capRef} style={{ opacity: 0 }} className="absolute inset-x-0 bottom-[10vh] z-10 flex flex-col items-center px-6 text-center will-change-transform">
          <p className="font-display text-[clamp(28px,3.4vw,52px)] italic text-surface [text-shadow:0_2px_24px_rgba(0,0,0,0.35)]">We are building institutions for the next century.</p>
          <p className="mt-4 max-w-2xl text-[clamp(14px,1.05vw,16px)] font-normal leading-relaxed text-surface/90 [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">
            BRAHM Global Holdings is an international venture builder and holding company creating exceptional businesses across technology, education, sport, hospitality and premium consumer brands.
          </p>
          <Invitation />
        </div>
      </div>
    </section>
  );
}
