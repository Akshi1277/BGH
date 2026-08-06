'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface LoaderContextType {
  loadedPercent: number;
  setLoadedPercent: (val: number) => void;
  loadedCount: number;
  setLoadedCount: (val: number) => void;
  totalFrames: number;
}

export const LoaderContext = createContext<LoaderContextType | null>(null);

export function useLoader() {
  return useContext(LoaderContext);
}

export default function PageLoaderProvider({ children }: { children: React.ReactNode }) {
  const [loadedPercent, setLoadedPercent] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isUnmounted, setIsUnmounted] = useState(false);
  
  const totalFrames = 192; 

  // Handle cinematic hold and fade out when 100% is reached
  useEffect(() => {
    if (loadedPercent === 100) {
      // Hold the 100% screen for 600ms for a premium feel
      const holdTimer = setTimeout(() => {
        setIsFadingOut(true);
        
        // After 1000ms fade transition, unmount the loader from DOM
        const unmountTimer = setTimeout(() => {
          setIsUnmounted(true);
        }, 1000);
        
      }, 600);
      
      return () => clearTimeout(holdTimer);
    }
  }, [loadedPercent]);

  // Prevent scrolling on body while loading
  useEffect(() => {
    if (!isFadingOut) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isFadingOut]);

  return (
    <LoaderContext.Provider value={{ loadedPercent, setLoadedPercent, loadedCount, setLoadedCount, totalFrames }}>
      
      {!isUnmounted && (
        <div className={`fixed inset-0 bg-[#000000] flex flex-col items-center justify-center z-[99999] transition-opacity duration-1000 ${isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          
          <div className="flex flex-col items-center justify-center">
            
            {/* Massive Typographic Percentage */}
            <div className="relative flex items-end overflow-hidden mb-6">
              <span className="font-serif text-[8rem] md:text-[12rem] lg:text-[15rem] leading-[0.8] text-[#FAF7F5] tracking-tighter tabular-nums">
                {String(loadedPercent).padStart(2, '0')}
              </span>
              <span className="font-serif text-3xl md:text-5xl text-[#C8374F] mb-4 md:mb-8 ml-2">
                %
              </span>
            </div>

            {/* Subtle Minimalist Branding */}
            <div className="flex items-center gap-6 opacity-60">
              <span className="h-px w-12 md:w-24 bg-[#9B1C2E]" />
              <span className="text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.4em] text-[#FAF7F5]">
                7AURIGA
              </span>
              <span className="h-px w-12 md:w-24 bg-[#9B1C2E]" />
            </div>

          </div>
        </div>
      )}

      {/* Main Page Content */}
      <div className={`w-full min-h-screen transition-opacity duration-1000 ${isFadingOut ? 'opacity-100' : 'opacity-0 h-screen overflow-hidden'}`}>
        {children}
      </div>

    </LoaderContext.Provider>
  );
}
