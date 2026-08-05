"use client";

import React, { CSSProperties } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
}

export const ShimmerButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ShimmerButtonProps
>(
  (
    {
      shimmerColor = "#38BDF8",
      shimmerSize = "0.08em",
      shimmerDuration = "3s",
      borderRadius = "9999px",
      background = "rgba(6, 12, 24, 0.9)",
      className,
      children,
      icon,
      href,
      onClick,
      ...props
    },
    ref
  ) => {
    const content = (
      <>
        {/* Shimmering beam effect */}
        <div
          className="-z-30 absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-none"
        >
          <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] opacity-80 will-change-transform">
            <div
              className="w-full h-full"
              style={{
                background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 270deg, ${shimmerColor} 340deg, transparent 360deg)`,
              }}
            />
          </div>
        </div>

        {/* Inner glass background */}
        <div
          className="absolute inset-[1.5px] -z-20 transition-colors duration-300 group-hover:bg-[#0C1A30] rounded-[inherit] backdrop-blur-md"
          style={{ background }}
        />

        {/* Label & Icon */}
        <span className="relative z-10 flex items-center justify-center gap-2 text-[11px] font-mono-ui uppercase tracking-widest text-[#F8FAFC] group-hover:text-white transition-colors font-semibold">
          {children}
          {icon && (
            <span
              className="inline-flex items-center group-hover:translate-x-1 transition-transform duration-200"
              style={{ color: shimmerColor }}
            >
              {icon}
            </span>
          )}
        </span>

        {/* Ambient Bloom */}
        <div 
          className="absolute inset-0 rounded-[inherit] pointer-events-none transition-all duration-300 opacity-30 group-hover:opacity-70"
          style={{
            boxShadow: `inset 0 0 0 1px ${shimmerColor}, 0 0 20px ${shimmerColor}`,
          }}
        />
      </>
    );

    const containerClasses = cn(
      "group relative inline-flex items-center justify-center overflow-hidden whitespace-nowrap px-6 py-2.5 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] cursor-pointer font-sans text-sm font-medium rounded-full",
      className
    );

    if (href) {
      return (
        <Link
          href={href}
          className={containerClasses}
          style={
            {
              borderRadius,
              "--shimmer-color": shimmerColor,
              "--radius": borderRadius,
              "--speed": shimmerDuration,
              "--cut": shimmerSize,
              "--bg": background,
            } as CSSProperties
          }
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={containerClasses}
        onClick={onClick}
        style={
          {
            borderRadius,
            "--shimmer-color": shimmerColor,
            "--radius": borderRadius,
            "--speed": shimmerDuration,
            "--cut": shimmerSize,
            "--bg": background,
          } as CSSProperties
        }
        {...props}
      >
        {content}
      </button>
    );
  }
);

ShimmerButton.displayName = "ShimmerButton";
