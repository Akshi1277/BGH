import React from "react";

export type IconName =
  | "arrow-right"
  | "arrow-down"
  | "menu"
  | "close"
  | "cube"
  | "cloud"
  | "cpu"
  | "globe"
  | "shield"
  | "compass"
  | "link"
  | "arrow-up-right"
  | "cup"
  | "droplet"
  | "layers"
  | "trending-up"
  | "users"
  | "graduation-cap"
  | "trophy"
  | "utensils"
  | "diamond"
  | "brain"
  | "shopping-bag"
  | "rocket"
  | "play";

const paths: Record<IconName, React.ReactNode> = {
  play: <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />,
  "arrow-right": <path d="M4 12h16M13 5l7 7-7 7" />,
  "arrow-down": <path d="M12 5v14M19 12l-7 7-7-7" />,
  "arrow-up-right": <path d="M7 17 17 7M8 7h9v9" />,
  menu: <path d="M3 6h18M3 12h18M3 18h18" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  cube: (
    <>
      <path d="M12 2l9 5v10l-9 5-9-5V7l9-5z" />
      <path d="M3 7l9 5 9-5M12 12v9" />
    </>
  ),
  cloud: (
    <path d="M7 18a4.5 4.5 0 1 1 1.06-8.87A5.5 5.5 0 0 1 18.5 12a3.5 3.5 0 0 1 0 7H7z" />
  ),
  cpu: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.8 2.6 4.2 5.7 4.2 9s-1.4 6.4-4.2 9c-2.8-2.6-4.2-5.7-4.2-9S9.2 5.6 12 3z" />
    </>
  ),
  shield: <path d="M12 3l8 3.5v5.2c0 4.7-3.2 8.7-8 9.8-4.8-1.1-8-5.1-8-9.8V6.5L12 3z" />,
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15 9l-2 6-6 2 2-6 6-2z" />
    </>
  ),
  link: (
    <path d="M9.5 14.5l5-5M8 16.5 5.6 18.9a3 3 0 1 1-4.2-4.2L4 12.3M16 7.5l2.4-2.4a3 3 0 1 1 4.2 4.2L20 11.7" />
  ),
  cup: (
    <>
      <path d="M5 8h11v6a5 5 0 0 1-5 5H9a4 4 0 0 1-4-4V8z" />
      <path d="M16 9h1.5a2.5 2.5 0 0 1 0 5H16M8 3.5c-.6.6-.6 1.4 0 2M11.5 3.5c-.6.6-.6 1.4 0 2" />
    </>
  ),
  droplet: (
    <path d="M12 3s6 6.8 6 11.2A6 6 0 0 1 6 14.2C6 9.8 12 3 12 3z" />
  ),
  layers: (
    <>
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </>
  ),
  "trending-up": <path d="M3 17l6-6 4 4 8-8M14 7h6v6" />,
  users: (
    <>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  "graduation-cap": (
    <>
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12.5v5c0 2 3 3.5 6 3.5s6-1.5 6-3.5v-5" />
    </>
  ),
  trophy: (
    <>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17M14 14.66V17M18 4H6v7a6 6 0 0 0 12 0V4z" />
    </>
  ),
  utensils: (
    <>
      <path d="M18 2v20M21 15V2a5 5 0 0 0-5 5v8h5zM3 2v7c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2V2M6 2v20" />
    </>
  ),
  diamond: (
    <>
      <path d="M6 3h12l4 6-10 12L2 9z" />
      <path d="M12 3v18M2 9h20M7.5 3l4.5 6 4.5-6" />
    </>
  ),
  brain: (
    <>
      <path d="M12 3c.6 3.8 2.6 5.8 6.4 6.4-3.8.6-5.8 2.6-6.4 6.4-.6-3.8-2.6-5.8-6.4-6.4 3.8-.6 5.8-2.6 6.4-6.4z" />
      <path d="M4.5 2.5c.3 1.8 1.4 2.9 3.2 3.2-1.8.3-2.9 1.4-3.2 3.2-.3-1.8-1.4-2.9-3.2-3.2 1.8-.3 2.9-1.4 3.2-3.2z" />
      <path d="M19.5 15.5c.3 1.8 1.4 2.9 3.2 3.2-1.8.3-2.9 1.4-3.2 3.2-.3-1.8-1.4-2.9-3.2-3.2 1.8-.3 2.9-1.4 3.2-3.2z" />
    </>
  ),
  "shopping-bag": (
    <>
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </>
  ),
  rocket: (
    <>
      <path d="M12 2c4.5 2 6.5 6.5 6.5 11l-3.5 3.5h-6L5.5 13C5.5 8.5 7.5 4 12 2z" />
      <circle cx="12" cy="8.5" r="2" />
      <path d="M5.5 13l-3.5 3.5V20h3.5l3.5-3.5M18.5 13l3.5 3.5V20h-3.5l-3.5-3.5" />
    </>
  ),
};

interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  name: IconName;
  size?: number;
}

export default function Icon({ name, size = 20, className, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
