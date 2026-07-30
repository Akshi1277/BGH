'use client'

import { Suspense, lazy, useEffect, useRef, useState } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

const Loader = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="flex gap-1">
      <span className="w-2 h-2 rounded-full bg-[#38BDF8]/60 animate-bounce [animation-delay:0ms]" />
      <span className="w-2 h-2 rounded-full bg-[#38BDF8]/60 animate-bounce [animation-delay:150ms]" />
      <span className="w-2 h-2 rounded-full bg-[#38BDF8]/60 animate-bounce [animation-delay:300ms]" />
    </div>
  </div>
)

export function SplineScene({ scene, className }: SplineSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  // Only mount the heavy Spline bundle once the container enters the viewport
  const [shouldMount, setShouldMount] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldMount(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' } // start loading 200px before it's visible
    )
    observer.observe(el)

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className={className} style={{ contain: 'strict' }}>
      {shouldMount ? (
        <Suspense fallback={<Loader />}>
          <Spline scene={scene} className="w-full h-full" />
        </Suspense>
      ) : (
        <Loader />
      )}
    </div>
  )
}
