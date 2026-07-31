"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"

interface RotatingEarthProps {
  width?: number
  height?: number
  className?: string
  /** Wheel-to-zoom calls preventDefault() on scroll — disable when embedding
   * inside a scroll-driven layout so hovering the globe doesn't hijack page scroll. */
  enableZoom?: boolean
}

export default function RotatingEarth({ width = 800, height = 600, className = "", enableZoom = true }: RotatingEarthProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    if (!context) return

    // Set up responsive dimensions
    const parent = canvas.parentElement
    const parentW = parent ? parent.clientWidth : width
    const parentH = parent ? parent.clientHeight : height
    const containerWidth = Math.min(width, parentW || window.innerWidth - 40)
    const containerHeight = Math.min(height, parentH || window.innerHeight - 100)
    const radius = Math.min(containerWidth, containerHeight) / 2.3

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = containerWidth * dpr
    canvas.height = containerHeight * dpr
    canvas.style.width = `${containerWidth}px`
    canvas.style.height = `${containerHeight}px`
    context.scale(dpr, dpr)

    // Create projection and path generator for Canvas
    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([containerWidth / 2, containerHeight / 2])
      .clipAngle(90)

    const path = d3.geoPath().projection(projection).context(context)

    const pointInPolygon = (point: [number, number], polygon: number[][]): boolean => {
      const [x, y] = point
      let inside = false

      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i]
        const [xj, yj] = polygon[j]

        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          inside = !inside
        }
      }

      return inside
    }

    const pointInFeature = (point: [number, number], feature: any): boolean => {
      const geometry = feature.geometry

      if (geometry.type === "Polygon") {
        const coordinates = geometry.coordinates
        if (!pointInPolygon(point, coordinates[0])) {
          return false
        }
        for (let i = 1; i < coordinates.length; i++) {
          if (pointInPolygon(point, coordinates[i])) {
            return false
          }
        }
        return true
      } else if (geometry.type === "MultiPolygon") {
        for (const polygon of geometry.coordinates) {
          if (pointInPolygon(point, polygon[0])) {
            let inHole = false
            for (let i = 1; i < polygon.length; i++) {
              if (pointInPolygon(point, polygon[i])) {
                inHole = true
                break
              }
            }
            if (!inHole) {
              return true
            }
          }
        }
        return false
      }

      return false
    }

    // Increased spacing from 16 → 24 — ~55% fewer dots, imperceptible quality loss
    const generateDotsInPolygon = (feature: any, dotSpacing = 24) => {
      const dots: [number, number][] = []
      const bounds = d3.geoBounds(feature)
      const [[minLng, minLat], [maxLng, maxLat]] = bounds

      const stepSize = dotSpacing * 0.08

      for (let lng = minLng; lng <= maxLng; lng += stepSize) {
        for (let lat = minLat; lat <= maxLat; lat += stepSize) {
          const point: [number, number] = [lng, lat]
          if (pointInFeature(point, feature)) {
            dots.push(point)
          }
        }
      }

      return dots
    }

    interface DotData {
      lng: number
      lat: number
      visible: boolean
    }

    const allDots: DotData[] = []
    let landFeatures: any

    const render = () => {
      context.clearRect(0, 0, containerWidth, containerHeight)

      const currentScale = projection.scale()
      const scaleFactor = currentScale / radius

      // Draw ocean (globe background)
      context.beginPath()
      context.arc(containerWidth / 2, containerHeight / 2, currentScale, 0, 2 * Math.PI)
      context.fillStyle = "#04070D"
      context.fill()
      context.strokeStyle = "rgba(56, 189, 248, 0.4)"
      context.lineWidth = 1.5 * scaleFactor
      context.stroke()

      if (landFeatures) {
        // Draw graticule
        const graticule = d3.geoGraticule()
        context.beginPath()
        path(graticule())
        context.strokeStyle = "rgba(56, 189, 248, 0.2)"
        context.lineWidth = 1 * scaleFactor
        context.globalAlpha = 0.25
        context.stroke()
        context.globalAlpha = 1

        // Draw land outlines
        context.beginPath()
        landFeatures.features.forEach((feature: any) => {
          path(feature)
        })
        context.strokeStyle = "rgba(56, 189, 248, 0.6)"
        context.lineWidth = 1 * scaleFactor
        context.stroke()

        // Draw halftone dots
        allDots.forEach((dot) => {
          const projected = projection([dot.lng, dot.lat])
          if (
            projected &&
            projected[0] >= 0 &&
            projected[0] <= containerWidth &&
            projected[1] >= 0 &&
            projected[1] <= containerHeight
          ) {
            context.beginPath()
            context.arc(projected[0], projected[1], 1.2 * scaleFactor, 0, 2 * Math.PI)
            context.fillStyle = "#38BDF8"
            context.fill()
          }
        })
      }
    }

    // Set up rotation and interaction
    const rotation = [0, 0]
    let autoRotate = true
    const rotationSpeed = 0.5

    // Visibility-gated timer: pause when off-screen to save GPU
    let rotationTimer: d3.Timer | null = null
    let isVisible = false

    const startTimer = () => {
      if (rotationTimer) return
      rotationTimer = d3.timer(() => {
        if (autoRotate && isVisible) {
          rotation[0] += rotationSpeed
          projection.rotate(rotation as [number, number])
          render()
        }
      // Throttle to ~30fps — smooth enough for a spinning globe
      }, 33)
    }

    const stopTimer = () => {
      if (rotationTimer) {
        rotationTimer.stop()
        rotationTimer = null
      }
    }

    // IntersectionObserver to gate the animation loop
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
        if (isVisible) {
          startTimer()
        } else {
          stopTimer()
        }
      },
      { rootMargin: "100px" }
    )
    if (containerRef.current) observer.observe(containerRef.current)

    const loadWorldData = async () => {
      try {
        setIsLoading(true)

        const response = await fetch(
          "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json",
        )
        if (!response.ok) throw new Error("Failed to load land data")

        landFeatures = await response.json()

        landFeatures.features.forEach((feature: any) => {
          const dots = generateDotsInPolygon(feature, 24)
          dots.forEach(([lng, lat]) => {
            allDots.push({ lng, lat, visible: true })
          })
        })

        render()
        setIsLoading(false)
        // Start timer now that data is ready (if visible)
        if (isVisible) startTimer()
      } catch (err) {
        setError("Failed to load land map data")
        setIsLoading(false)
      }
    }

    const handleMouseDown = (event: MouseEvent) => {
      autoRotate = false
      const startX = event.clientX
      const startY = event.clientY
      const startRotation = [...rotation]

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const sensitivity = 0.5
        const dx = moveEvent.clientX - startX
        const dy = moveEvent.clientY - startY

        rotation[0] = startRotation[0] + dx * sensitivity
        rotation[1] = startRotation[1] - dy * sensitivity
        rotation[1] = Math.max(-90, Math.min(90, rotation[1]))

        projection.rotate(rotation as [number, number])
        render()
      }

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)

        setTimeout(() => {
          autoRotate = true
        }, 10)
      }

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault()
      const scaleFactor = event.deltaY > 0 ? 0.9 : 1.1
      const newRadius = Math.max(radius * 0.5, Math.min(radius * 3, projection.scale() * scaleFactor))
      projection.scale(newRadius)
      render()
    }

    canvas.addEventListener("mousedown", handleMouseDown)
    if (enableZoom) canvas.addEventListener("wheel", handleWheel)

    loadWorldData()

    return () => {
      stopTimer()
      observer.disconnect()
      canvas.removeEventListener("mousedown", handleMouseDown)
      if (enableZoom) canvas.removeEventListener("wheel", handleWheel)
    }
  }, [width, height, enableZoom])

  if (error) {
    return (
      <div className={`flex items-center justify-center rounded-2xl p-4 ${className}`}>
        <p className="text-red-400 text-xs">{error}</p>
      </div>
    )
  }

  return (
    <div ref={containerRef} className={`relative flex items-center justify-center ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-auto cursor-grab active:cursor-grabbing"
        style={{ willChange: 'transform' }}
      />
    </div>
  )
}
