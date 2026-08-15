import React from 'react';

// Common SVG props to ensure consistent stroke width and rendering
const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "w-5 h-5 text-accent transition-transform duration-500 ease-out group-hover:scale-105",
};

export function LondonHeadquartersIcon() {
  return (
    <svg {...iconProps}>
      {/* Ground line */}
      <path d="M4 21h16" />
      {/* Tower shaft */}
      <path d="M7 21V6h10v15" />
      {/* Stone cornice dividing the clock stage from the base */}
      <path d="M7 13h10" />
      {/* Large clock face dominating the upper stage */}
      <circle cx="12" cy="9.5" r="2.6" />
      <path d="M12 9.5V7.4" />
      <path d="M12 9.5l1.6 0.9" />
      {/* Flared corner pinnacles */}
      <path d="M7 6l-1.6-1.6" />
      <path d="M17 6l1.6-1.6" />
      {/* Tapered spire */}
      <path d="M12 6V2" />
      <path d="M10.8 2.6h2.4" className="transition-all duration-500 group-hover:-translate-y-0.5" />
    </svg>
  );
}

export function GlobalOperationsIcon() {
  return (
    <svg {...iconProps}>
      {/* Main Globe border */}
      <circle cx="12" cy="12" r="8.5" />
      {/* Clean elegant latitude/longitude indication */}
      <path d="M3.5 12h17" className="transition-all duration-700 ease-in-out group-hover:scale-x-105 origin-center" />
      <ellipse cx="12" cy="12" rx="3.5" ry="8.5" />
      {/* Connected nodes/routes representing global operations */}
      <circle cx="8" cy="8" r="1.5" className="fill-surface stroke-current" />
      <circle cx="16" cy="16" r="1.5" className="fill-surface stroke-current" />
      {/* Orbital connection line */}
      <path d="M8 8c2.5-1.5 5.5-1.5 8 0" strokeDasharray="2 2" className="transition-all duration-700 group-hover:stroke-dashoffset-4" />
    </svg>
  );
}

export function EngineeringExcellenceIcon() {
  return (
    <svg {...iconProps}>
      {/* Drafting compass — precision, engineering design */}
      <circle cx="12" cy="4.5" r="1.2" />
      <path d="M11 5.6L8 20" />
      <path d="M13 5.6L16 20" />
      {/* Width adjuster crossbar */}
      <path d="M9.6 12h4.8" />
      {/* Arc traced by the compass */}
      <path d="M8 20a4 4 0 0 0 8 0" />
    </svg>
  );
}

export function LongTermOwnershipIcon() {
  return (
    <svg {...iconProps}>
      {/* Outer Hexagonal Casing (Represents impenetrable structure, permanent equity, and stability) */}
      <polygon 
        points="12,2 20.65,7 20.65,17 12,22 3.35,17 3.35,7" 
        className="transition-transform duration-1000 ease-out origin-center group-hover:scale-105"
      />
      
      {/* Inner Protected Core (The deeply held corporate asset) */}
      <circle 
        cx="12" cy="12" r="4" 
        className="transition-transform duration-1000 ease-out origin-center group-hover:scale-105"
      />
      
      {/* Precision Locking Pins (Active holding, securing the asset from all sides) */}
      <path 
        d="M 12 2 V 8 M 12 22 V 16 M 20.65 7 L 15.5 10 M 20.65 17 L 15.5 14 M 3.35 17 L 8.5 14 M 3.35 7 L 8.5 10" 
        className="transition-transform duration-1000 ease-out origin-center group-hover:scale-105"
      />
      
      {/* Central Mechanical Hub (Absolute control and precision) */}
      <circle 
        cx="12" cy="12" r="1" 
        className="transition-transform duration-1000 ease-out origin-center group-hover:scale-105"
      />
    </svg>
  );
}
