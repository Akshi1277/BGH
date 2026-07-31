"use client"

import * as React from "react"
import { HTMLMotionProps, motion } from "framer-motion"

import { cn } from "@/lib/utils"

interface CardStickyProps extends HTMLMotionProps<"div"> {
  index: number
  incrementY?: number
  incrementZ?: number
}

const ContainerScroll = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(({ children, className, style, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("relative w-full", className)}
      style={style}
      {...props}
    >
      {children}
    </div>
  )
})
ContainerScroll.displayName = "ContainerScroll"

const CardSticky = React.forwardRef<HTMLDivElement, CardStickyProps>(
  (
    {
      index,
      incrementY = 28,
      incrementZ = 10,
      children,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const topMobile = 64 + index * 18;
    const topDesktop = 88 + index * incrementY;

    return (
      <motion.div
        ref={ref}
        style={
          {
            "--top-mobile": `${topMobile}px`,
            "--top-desktop": `${topDesktop}px`,
            zIndex: 10 + index,
            ...style,
          } as React.CSSProperties
        }
        className={cn(
          "sticky top-[var(--top-mobile)] md:top-[var(--top-desktop)] antialiased subpixel-antialiased",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

CardSticky.displayName = "CardSticky"

export { ContainerScroll, CardSticky }
