"use client";

import React from "react";
import RotatingEarth from "./wireframe-dotted-globe";
import { cn } from "@/lib/utils";

export const Globe = ({ className }: { className?: string }) => {
  return (
    <div className={cn("relative w-full h-full flex items-center justify-center overflow-hidden", className)}>
      <RotatingEarth width={320} height={280} className="w-full h-full" />
    </div>
  );
};
