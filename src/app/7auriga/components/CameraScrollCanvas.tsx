'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useScroll, useSpring, useTransform, motion, MotionValue } from 'framer-motion';

const TOTAL_FRAMES = 192;
const BASE_PATH = '/camera-frames/frame-';

function getFramePath(index: number): string {
  const frameNum = Math.min(Math.max(index, 1), TOTAL_FRAMES);
  return `${BASE_PATH}${String(frameNum).padStart(4, '0')}.webp`;
}

interface CameraScrollCanvasProps {
  onFrameUpdate?: (frame: number, progress: number) => void;
  onLoadProgress?: (progress: number) => void;
  scrollYProgress?: MotionValue<number>;
}

export default function CameraScrollCanvas({
  onFrameUpdate,
  onLoadProgress,
  scrollYProgress: externalScrollProgress,
}: CameraScrollCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | ImageBitmap | null)[]>(new Array(TOTAL_FRAMES + 1).fill(null));
  const loadedCountRef = useRef(0);
  
  const [loadedPercent, setLoadedPercent] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const currentFrameRef = useRef(1);

  // Load and decode images off main thread
  useEffect(() => {
    let isCancelled = false;
    loadedCountRef.current = 0;

    // Load key frames first (1, 20, 40, ...), then remaining frames for fast initial view
    const loadIndices: number[] = [];
    const step = 4;
    for (let i = 1; i <= TOTAL_FRAMES; i += step) {
      loadIndices.push(i);
    }
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      if (!loadIndices.includes(i)) {
        loadIndices.push(i);
      }
    }

    loadIndices.forEach((index) => {
      const img = new Image();
      img.src = getFramePath(index);

      const finishLoad = () => {
        if (isCancelled) return;
        loadedCountRef.current += 1;
        
        const pct = Math.round((loadedCountRef.current / TOTAL_FRAMES) * 100);
        setLoadedPercent(pct);
        if (onLoadProgress) onLoadProgress(pct);

        if (loadedCountRef.current >= 5) {
          setIsLoaded(true);
        }

        // Trigger draw if it's the current frame
        if (index === currentFrameRef.current) {
          drawFrame(index);
        }
      };

      const onImageReady = () => {
        if (isCancelled) return;
        
        if (typeof window.createImageBitmap === 'function') {
          window.createImageBitmap(img).then((bitmap) => {
            if (isCancelled) return;
            imagesRef.current[index] = bitmap;
            finishLoad();
          }).catch(() => {
            imagesRef.current[index] = img;
            finishLoad();
          });
        } else {
          imagesRef.current[index] = img;
          finishLoad();
        }
      };

      if (img.complete) {
        onImageReady();
      } else {
        img.onload = () => {
          if (img.decode) {
            img.decode().then(onImageReady).catch(onImageReady);
          } else {
            onImageReady();
          }
        };
        img.onerror = () => {
          loadedCountRef.current += 1;
        };
      }
    });

    return () => {
      isCancelled = true;
    };
  }, []);

  // Draw frame on canvas with high DPI & contain fit
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    const width = canvas.width;
    const height = canvas.height;

    // Clear with pure black background matching video frames
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);

    if (img) {
      // Support both HTMLImageElement and ImageBitmap
      // @ts-ignore - naturalWidth exists on HTMLImageElement, width exists on ImageBitmap
      const imgWidth = img.naturalWidth || img.width;
      // @ts-ignore
      const imgHeight = img.naturalHeight || img.height;

      if (imgWidth > 0) {
        // Calculate contain object-fit dimensions with scale factor so top is never cut off by header
        const maxScale = 0.65; // Comfortably fits camera below navbar with generous padding
        const containerW = width * maxScale;
        const containerH = height * maxScale;

        const imgAspect = imgWidth / imgHeight;
        const containerAspect = containerW / containerH;

        let drawWidth = containerW;
        let drawHeight = containerH;

        if (containerAspect > imgAspect) {
          drawWidth = containerH * imgAspect;
          drawHeight = containerH;
        } else {
          drawWidth = containerW;
          drawHeight = containerW / imgAspect;
        }

        const offsetX = (width - drawWidth) / 2;
        const offsetY = (height - drawHeight) / 2;

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
    }
  }, []);

  // Resize listener for resolution and DPI
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      drawFrame(currentFrameRef.current);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrame]);

  // Handle frame updates when scroll progress changes
  const renderFrameFromProgress = useCallback((rawProgress: number) => {
    const clamped = Math.min(Math.max(rawProgress, 0), 1);
    const targetFrame = Math.min(
      Math.max(Math.floor(clamped * (TOTAL_FRAMES - 1)) + 1, 1),
      TOTAL_FRAMES
    );

    if (targetFrame !== currentFrameRef.current) {
      currentFrameRef.current = targetFrame;
      requestAnimationFrame(() => {
        drawFrame(targetFrame);
      });
      if (onFrameUpdate) {
        onFrameUpdate(targetFrame, clamped);
      }
    }
  }, [drawFrame, onFrameUpdate]);

  // Listen to external scroll progress if supplied
  useEffect(() => {
    if (!externalScrollProgress) return;
    const unsubscribe = externalScrollProgress.on('change', (v) => {
      renderFrameFromProgress(v);
    });
    return () => unsubscribe();
  }, [externalScrollProgress, renderFrameFromProgress]);

  return (
    <div className="relative w-full h-full bg-[#0D0B0B] flex items-center justify-center overflow-hidden">
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain pointer-events-none block"
      />

      {/* Initial load indicator shimmer */}
      {!isLoaded && loadedPercent < 100 && (
        <div className="absolute inset-0 bg-[#0D0B0B]/80 backdrop-blur-sm flex flex-col items-center justify-center z-20 pointer-events-none transition-opacity duration-500">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#9B1C2E] animate-ping" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#FAF7F5]/70">
              Initializing Optical Engine
            </span>
          </div>
          <div className="w-48 h-1 bg-[#1A1818] rounded-full overflow-hidden border border-white/5">
            <div
              className="h-full bg-gradient-to-r from-[#9B1C2E] via-[#D4AF37] to-[#FAF7F5] transition-all duration-200"
              style={{ width: `${loadedPercent}%` }}
            />
          </div>
          <span className="text-[10px] font-mono text-[#FAF7F5]/40 mt-2">
            {loadedPercent}% ({loadedCountRef.current}/{TOTAL_FRAMES} FRAMES)
          </span>
        </div>
      )}
    </div>
  );
}
