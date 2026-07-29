"use client";

import React, { useEffect, useRef } from "react";

/**
 * GridMotion component from React Bits.
 * Creates a futuristic, 3D perspective animated grid background.
 */
interface GridMotionProps {
  color?: string;
  size?: number;
  speed?: number;
  angle?: number;
  className?: string;
}

export function GridMotion({
  color = "rgba(56, 189, 248, 0.15)",
  size = 40,
  speed = 20,
  angle = 65,
  className = "",
}: GridMotionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let offset = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener("resize", resize);
    resize();

    const drawGrid = () => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // We want to create a 3D perspective effect manually in canvas 
      // or we can just draw a flat grid and apply CSS 3D transforms to the canvas!
      // Using CSS 3D transforms on the canvas element is much smoother and authentic to the synthwave/tech look.
      
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;

      // Draw vertical lines
      for (let x = 0; x <= width * 2; x += size) {
        ctx.moveTo(x - width/2, 0);
        ctx.lineTo(x - width/2, height * 2);
      }

      const movingOffset = offset % size;
      // Draw horizontal lines with movement
      for (let y = 0; y <= height * 2; y += size) {
        const yPos = y + movingOffset; 
        if(yPos <= height * 2) {
           ctx.moveTo(-width/2, yPos);
           ctx.lineTo(width * 1.5, yPos);
        }
      }

      ctx.stroke();

      offset += speed * 0.05;
      animationFrameId = requestAnimationFrame(drawGrid);
    };

    drawGrid();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, size, speed]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`} style={{ perspective: "1000px" }}>
      {/* The canvas is rotated in 3D space to create the futuristic receding grid effect */}
      <canvas
        ref={canvasRef}
        className="absolute w-[200vw] h-[200vh] left-[-50vw] top-[20vh]"
        style={{
          transformOrigin: "top center",
          transform: `rotateX(${angle}deg)`,
          maskImage: "linear-gradient(to bottom, transparent 0%, black 40%, black 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 40%, black 100%)"
        }}
      />
      {/* Fog/fade at the horizon */}
      <div className="absolute top-0 left-0 right-0 h-[60vh] bg-gradient-to-b from-[#04070D] via-[#04070D]/80 to-transparent z-10" />
    </div>
  );
}
