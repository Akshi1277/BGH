"use client";

import React, { useState } from "react";
import EnifLoader from "./EnifLoader";

export default function EnifPageWrapper({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <EnifLoader onComplete={() => setIsLoaded(true)} />
      {/* 
        We use an opacity fade here or just render children.
        Mounting children AFTER the loader completes ensures all Framer Motion
        'initial' animations in the hero section trigger exactly when the loader fades out.
      */}
      {isLoaded && (
        <div className="animate-in fade-in duration-700">
          {children}
        </div>
      )}
    </>
  );
}
