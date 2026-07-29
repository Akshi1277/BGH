"use client";

import React, { useRef, useEffect } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  duration: number;
  phase: number;
  opacity: number;
  driftX: number;
}

const STAR_COUNT = 45;
const STARS: Star[] = Array.from({ length: STAR_COUNT }, (_, i) => ({
  x: (i * 23.7) % 100,
  y: (i * 37.1) % 100,
  size: 1 + (i % 3) * 0.8,
  duration: 6 + (i % 5) * 2.5,
  phase: (i * 0.4 * Math.PI * 2) % (Math.PI * 2),
  opacity: 0.15 + (i % 4) * 0.12,
  driftX: i % 2 === 0 ? 5 : -5,
}));

export default function EnifConstellationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let rafId: number;

    const draw = (t: number) => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const computedStars: { x: number; y: number }[] = [];

      for (const s of STARS) {
        const cycle = t / 1000 / s.duration;
        const angle = cycle * Math.PI * 2 + s.phase;
        const dy = Math.sin(angle) * 8;
        const dx = Math.sin(angle) * s.driftX * 0.4;
        const alpha = s.opacity * (0.4 + 0.6 * (0.5 + 0.5 * Math.sin(angle)));

        const px = (s.x / 100) * w + dx;
        const py = (s.y / 100) * h + dy;
        computedStars.push({ x: px, y: py });

        // Draw twinkling star
        ctx.beginPath();
        ctx.arc(px, py, s.size / 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${alpha.toFixed(3)})`;
        ctx.fill();
      }

      // Draw subtle constellation connection lines between close stars
      ctx.strokeStyle = "rgba(56, 189, 248, 0.04)";
      ctx.lineWidth = 1;
      const maxDist = w < 768 ? 90 : 140;

      for (let i = 0; i < computedStars.length; i++) {
        for (let j = i + 1; j < computedStars.length; j++) {
          const dx = computedStars[i].x - computedStars[j].x;
          const dy = computedStars[i].y - computedStars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            ctx.beginPath();
            ctx.moveTo(computedStars[i].x, computedStars[i].y);
            ctx.lineTo(computedStars[j].x, computedStars[j].y);
            ctx.stroke();
          }
        }
      }

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
