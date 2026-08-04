"use client";

import React from "react";

export function FilmReelCanvas() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]"
      style={{
        backgroundImage:
          "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }}
      aria-hidden="true"
    />
  );
}
