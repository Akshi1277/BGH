'use client'

import { Suspense, lazy } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-[#38BDF8]/60 animate-bounce [animation-delay:0ms]" />
            <span className="w-2 h-2 rounded-full bg-[#38BDF8]/60 animate-bounce [animation-delay:150ms]" />
            <span className="w-2 h-2 rounded-full bg-[#38BDF8]/60 animate-bounce [animation-delay:300ms]" />
          </div>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
      />
    </Suspense>
  )
}
