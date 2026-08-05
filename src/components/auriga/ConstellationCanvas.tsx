"use client";

import React, { useEffect, useRef } from "react";

export function ConstellationCanvas() {
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
      isRuby: boolean;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 1.5 + 0.5;
        this.isRuby = Math.random() > 0.85; // 15% are ruby red
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas!.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas!.height) this.vy = -this.vy;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.isRuby ? "#E0115F" : "rgba(255, 255, 255, 0.4)";
        if (this.isRuby) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = "#E0115F";
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }
    }

    const init = () => {
      resizeCanvas();
      particles = [];
      const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 12000);
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

          if (distance < 150) {
            ctx.beginPath();
            const opacity = 1 - distance / 150;
            
            // If either is ruby, tint the line red, else white
            if (particles[i].isRuby || particles[j].isRuby) {
              ctx.strokeStyle = `rgba(224, 17, 95, ${opacity * 0.5})`; // #E0115F
            } else {
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.15})`;
            }
            
            ctx.lineWidth = 1;
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
        className="w-full h-full opacity-60"
        style={{ background: "transparent" }}
      />
      {/* Subtle overlay to blend it perfectly with 7AURIGA */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0B0B] via-transparent to-[#0D0B0B]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D0B0B] via-transparent to-[#0D0B0B]" />

    </div>
  );
}

export default ConstellationCanvas;

