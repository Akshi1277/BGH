'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useScroll, useSpring, useTransform, motion, MotionValue } from 'framer-motion';

import { useLoader } from './PageLoaderProvider';

const TOTAL_FRAMES = 192;
const KEY_STEP = 6; // every 6th frame (~32 frames, ~2.5MB) must load before the page is revealed
const CONCURRENCY = 6;
// Served as static files from public/camera-frames (1600px WebP)
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
  
  const loader = useLoader();
  const currentFrameRef = useRef(1);

  // Load and decode images off main thread
  useEffect(() => {
    let isCancelled = false;
    loadedCountRef.current = 0;

    // Key frames (every KEY_STEP-th + the last) gate the loader; the remaining
    // frames stream in afterwards while the user is already on the page.
    const keyIndices: number[] = [];
    for (let i = 1; i <= TOTAL_FRAMES; i += KEY_STEP) keyIndices.push(i);
    if (keyIndices[keyIndices.length - 1] !== TOTAL_FRAMES) keyIndices.push(TOTAL_FRAMES);
    const keySet = new Set(keyIndices);
    const queue = [
      ...keyIndices,
      ...Array.from({ length: TOTAL_FRAMES }, (_, i) => i + 1).filter((i) => !keySet.has(i)),
    ];
    let keysDone = 0;

    const reportKeyProgress = () => {
      keysDone += 1;
      const pct = Math.round((keysDone / keyIndices.length) * 100);
      if (onLoadProgress) onLoadProgress(pct);
      if (loader) {
        loader.setLoadedCount(keysDone);
        loader.setLoadedPercent(pct);
      }
    };

    const loadFrame = (index: number) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.decoding = 'async';

        const finish = (result: HTMLImageElement | ImageBitmap | null) => {
          if (isCancelled) return resolve();
          if (result) imagesRef.current[index] = result;
          loadedCountRef.current += 1;
          if (keySet.has(index)) reportKeyProgress();
          // Redraw so the nearest-frame fallback upgrades to the exact frame
          if (result) drawFrame(currentFrameRef.current);
          resolve();
        };

        img.onload = () => {
          if (isCancelled) return resolve();
          if (typeof window.createImageBitmap === 'function') {
            window.createImageBitmap(img).then(finish).catch(() => finish(img));
          } else {
            finish(img);
          }
        };
        img.onerror = () => finish(null);
        img.src = getFramePath(index);
      });

    // Bounded concurrency keeps key frames at the front of the network queue
    const worker = async () => {
      while (!isCancelled && queue.length) {
        await loadFrame(queue.shift()!);
      }
    };
    for (let i = 0; i < CONCURRENCY; i++) worker();

    return () => {
      isCancelled = true;
    };
  }, []);

  // Closest already-loaded frame, so scrubbing works before every frame arrives
  const findNearestLoaded = (frameIndex: number) => {
    const images = imagesRef.current;
    if (images[frameIndex]) return images[frameIndex];
    for (let d = 1; d < TOTAL_FRAMES; d++) {
      if (frameIndex - d >= 1 && images[frameIndex - d]) return images[frameIndex - d];
      if (frameIndex + d <= TOTAL_FRAMES && images[frameIndex + d]) return images[frameIndex + d];
    }
    return null;
  };

  // Draw frame on canvas with high DPI & contain fit
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const img = findNearestLoaded(frameIndex);
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

  const loadedPercent = loader?.loadedPercent || 0;

  return (
    <div className="relative w-full h-full bg-[#000000] flex items-center justify-center overflow-hidden">
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className={`w-full h-full object-contain pointer-events-none block transition-opacity duration-1000 ${
          loadedPercent === 100 ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
