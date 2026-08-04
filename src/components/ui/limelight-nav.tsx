"use client";

import React, { useState, useRef, useLayoutEffect, cloneElement } from 'react';

// --- Internal Types and Defaults ---

const DefaultHomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </svg>
);

const DefaultCompassIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" />
  </svg>
);

const DefaultBellIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

export type NavItem = {
  id: string | number;
  icon: React.ReactElement<{ className?: string }>;
  label?: string;
  onClick?: () => void;
};

const defaultNavItems: NavItem[] = [
  { id: 'default-home', icon: <DefaultHomeIcon />, label: 'Home' },
  { id: 'default-explore', icon: <DefaultCompassIcon />, label: 'Explore' },
  { id: 'default-notifications', icon: <DefaultBellIcon />, label: 'Notifications' },
];

export type LimelightNavProps = {
  items?: NavItem[];
  defaultActiveIndex?: number;
  activeIndex?: number;
  onTabChange?: (index: number) => void;
  className?: string;
  limelightClassName?: string;
  iconContainerClassName?: string;
  iconClassName?: string;
  showLabels?: boolean;
};

/**
 * An adaptive-width navigation bar with a "limelight" spotlight effect that highlights the active item.
 */
export const LimelightNav = ({
  items = defaultNavItems,
  defaultActiveIndex = 0,
  activeIndex: controlledActiveIndex,
  onTabChange,
  className,
  limelightClassName,
  iconContainerClassName,
  iconClassName,
  showLabels = true,
}: LimelightNavProps) => {
  const [internalActiveIndex, setInternalActiveIndex] = useState(defaultActiveIndex);
  const activeIndex = controlledActiveIndex !== undefined ? controlledActiveIndex : internalActiveIndex;

  const [isReady, setIsReady] = useState(false);
  const navItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const limelightRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (items.length === 0) return;

    const limelight = limelightRef.current;
    const activeItem = activeIndex >= 0 ? navItemRefs.current[activeIndex] : null;
    
    if (limelight && activeItem) {
      const itemWidth = activeItem.offsetWidth;
      const limelightWidth = Math.max(itemWidth * 0.75, 40);
      limelight.style.width = `${limelightWidth}px`;
      
      const newLeft = activeItem.offsetLeft + itemWidth / 2 - limelightWidth / 2;
      limelight.style.left = `${newLeft}px`;
      limelight.style.opacity = '1';

      if (!isReady) {
        setTimeout(() => setIsReady(true), 50);
      }
    } else if (limelight) {
      limelight.style.opacity = '0';
    }
  }, [activeIndex, isReady, items]);

  if (items.length === 0) {
    return null; 
  }

  const handleItemClick = (index: number, itemOnClick?: () => void) => {
    if (controlledActiveIndex === undefined) {
      setInternalActiveIndex(index);
    }
    onTabChange?.(index);
    itemOnClick?.();
  };

  return (
    <nav className={`relative inline-flex items-center h-16 rounded-2xl bg-zinc-950/90 text-white border border-white/10 px-3 overflow-hidden ${className || ''}`}>
      {items.map(({ id, icon, label, onClick }, index) => (
        <a
          key={id}
          ref={el => { navItemRefs.current[index] = el; }}
          className={`relative z-20 flex h-full cursor-pointer items-center justify-center px-4 py-2 gap-2 text-xs font-medium tracking-wide transition-colors ${
            activeIndex === index ? 'text-white font-semibold' : 'text-zinc-400 hover:text-zinc-200'
          } ${iconContainerClassName || ''}`}
          onClick={() => handleItemClick(index, onClick)}
          aria-label={label}
          title={label}
        >
          {cloneElement(icon as React.ReactElement<{ className?: string }>, {
            className: `w-5 h-5 transition-all duration-200 ease-in-out ${
              activeIndex === index ? 'opacity-100 scale-105 text-white' : 'opacity-45 text-zinc-400 hover:opacity-70'
            } ${icon.props.className || ''} ${iconClassName || ''}`,
          })}
          {showLabels && label && (
            <span className="hidden sm:inline-block select-none whitespace-nowrap font-mono text-[11px] uppercase tracking-wider">
              {label}
            </span>
          )}
        </a>
      ))}

      {/* Spotlight / Limelight Bar & Cone */}
      <div 
        ref={limelightRef}
        className={`absolute top-0 z-10 h-[3.5px] rounded-full bg-white text-white shadow-[0_0_15px_#ffffff,0_0_30px_#ffffff] transition-opacity duration-300 ${
          isReady ? 'transition-[left,width,opacity] duration-300 ease-out' : ''
        } ${limelightClassName || ''}`}
        style={{ left: '-999px', width: '40px', opacity: activeIndex >= 0 ? 1 : 0 }}
      >
        {/* Trapezoid Spotlight Beam */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 top-0 w-[150%] h-16 pointer-events-none bg-gradient-to-b from-current via-current/25 to-transparent opacity-50"
          style={{
            clipPath: 'polygon(15% 0%, 85% 0%, 96% 100%, 4% 100%)',
          }}
        />
      </div>
    </nav>
  );
};
