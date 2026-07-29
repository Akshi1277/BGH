"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface ShootingStar {
  id: number;
  x: number;
  y: number;
  angle: number;
  scale: number;
  speed: number;
  distance: number;
}

export const ShootingStars = ({
  minSpeed = 15,
  maxSpeed = 35,
  minDelay = 600,
  maxDelay = 1800,
  starColor = "#38BDF8", // Electric cyan
  trailColor = "rgba(14, 165, 233, 0.8)",
  starWidth = 140,
  starHeight = 2,
  className,
}: {
  minSpeed?: number;
  maxSpeed?: number;
  minDelay?: number;
  maxDelay?: number;
  starColor?: string;
  trailColor?: string;
  starWidth?: number;
  starHeight?: number;
  className?: string;
}) => {
  const [star, setStar] = useState<ShootingStar | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const createStar = () => {
      if (!svgRef.current) return;
      const { width, height } = svgRef.current.getBoundingClientRect();
      
      const newStar: ShootingStar = {
        id: Date.now(),
        x: Math.random() * width,
        y: 0,
        angle: 45, // Assuming fixed angle for consistency (diagonal from top-right to bottom-left)
        scale: Math.random() * 0.5 + 0.5,
        speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
        distance: Math.sqrt(width * width + height * height) * 1.5, // Make sure it goes off screen
      };
      setStar(newStar);

      const randomDelay = Math.random() * (maxDelay - minDelay) + minDelay;
      setTimeout(createStar, randomDelay);
    };

    const initialDelay = Math.random() * 2000;
    const timeout = setTimeout(createStar, initialDelay);
    return () => clearTimeout(timeout);
  }, [minSpeed, maxSpeed, minDelay, maxDelay]);

  return (
    <svg
      ref={svgRef}
      className={cn("absolute inset-0 w-full h-full pointer-events-none", className)}
      preserveAspectRatio="none"
    >
      {star && (
        <rect
          key={star.id}
          x={star.x}
          y={star.y}
          width={starWidth * star.scale}
          height={starHeight * star.scale}
          fill="url(#gradient)"
          transform={`rotate(${star.angle}, ${star.x}, ${star.y})`}
        >
          <animate
            attributeName="x"
            from={star.x}
            to={star.x - star.distance * Math.cos((star.angle * Math.PI) / 180)}
            dur={`${star.distance / star.speed}s`}
            begin="0s"
            repeatCount="1"
          />
          <animate
            attributeName="y"
            from={star.y}
            to={star.y + star.distance * Math.sin((star.angle * Math.PI) / 180)}
            dur={`${star.distance / star.speed}s`}
            begin="0s"
            repeatCount="1"
          />
        </rect>
      )}
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={trailColor} stopOpacity="0" />
          <stop offset="100%" stopColor={starColor} stopOpacity="1" />
        </linearGradient>
      </defs>
    </svg>
  );
};
