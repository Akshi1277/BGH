"use client";

import React, { useEffect, useRef } from "react";

export function LightConstellationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      isPine: boolean;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.radius = Math.random() * 1.5 + 0.8;
        this.isPine = Math.random() > 0.75;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas!.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas!.height) this.vy = -this.vy;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.isPine ? "rgba(31, 92, 67, 0.6)" : "rgba(28, 31, 30, 0.25)";
        ctx.fill();
      }
    }

    const init = () => {
      resizeCanvas();
      particles = [];
      const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 14000);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 140) {
            ctx.beginPath();
            const opacity = (1 - distance / 140) * 0.18;
            
            if (particles[i].isPine || particles[j].isPine) {
              ctx.strokeStyle = `rgba(31, 92, 67, ${opacity * 1.5})`;
            } else {
              ctx.strokeStyle = `rgba(28, 31, 30, ${opacity})`;
            }
            
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    window.addEventListener("resize", init);

    return () => {
      window.removeEventListener("resize", init);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-70"
        style={{ background: "transparent" }}
      />
      {/* Soft Vignette Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-transparent to-surface opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-r from-surface via-transparent to-surface opacity-90" />
    </div>
  );
}

export default LightConstellationCanvas;
