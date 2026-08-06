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
        {/* Label & Icon */}
        <span 
          className="relative z-10 flex items-center justify-center gap-2 text-[12px] font-mono-ui uppercase tracking-widest font-bold transition-all duration-300 group-hover:brightness-125"
          style={{ color: shimmerColor }}
        >
          {children}
          {icon && (
            <span
              className="inline-flex items-center group-hover:translate-x-1 transition-transform duration-200"
            >
              {icon}
            </span>
          )}
          
          {/* Animated Underline */}
          <span 
            className="absolute -bottom-1 left-0 right-0 h-[1.5px] opacity-40 group-hover:opacity-100 transition-all duration-300 scale-x-[0.8] group-hover:scale-x-100" 
            style={{ backgroundColor: shimmerColor }}
          />
        </span>
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
