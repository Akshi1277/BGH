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
      incrementY = 24,
      incrementZ = 10,
      children,
      className,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        style={
          {
            "--top-offset-mobile": `${76 + index * 20}px`,
            "--top-offset-desktop": `${88 + index * incrementY}px`,
            top: `calc(var(--top-offset, 80px) + env(safe-area-inset-top, 0px))`,
            zIndex: 10 + index,
            ...style,
          } as React.CSSProperties
        }
        className={cn(
          "sticky antialiased subpixel-antialiased [--top-offset:var(--top-offset-mobile)] md:[--top-offset:var(--top-offset-desktop)]",
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
