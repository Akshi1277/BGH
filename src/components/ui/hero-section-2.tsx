"use client";

import React from 'react';
import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';

// Icon component for contact details
const InfoIcon = ({ type }: { type: 'website' | 'phone' | 'address' }) => {
    const icons = {
        website: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-[#38BDF8]">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" x2="22" y1="12" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
        ),
        phone: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-[#38BDF8]">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
        ),
        address: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-[#38BDF8]">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                <circle cx="12" cy="10" r="3"></circle>
            </svg>
        ),
    };
    return <div className="mr-2 flex-shrink-0">{icons[type]}</div>;
};

// Prop types for the HeroSection component
export interface HeroSectionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  logo?: {
    url: string;
    alt: string;
    text?: string;
  };
  slogan?: string;
  title: React.ReactNode;
  subtitle: string;
  callToAction: {
    text: string;
    href: string;
  };
  backgroundImage?: string;
  videoUrl?: string;
  contactInfo: {
    website: string;
    phone: string;
    address: string;
  };
}

const HeroSection = React.forwardRef<HTMLElement, HeroSectionProps>(
  ({ className, logo, slogan, title, subtitle, callToAction, backgroundImage, videoUrl, contactInfo, style }, ref) => {
    
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.15,
          delayChildren: 0.2,
        },
      },
    };

    const itemVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
          ease: "easeOut" as const,
        },
      },
    };
    
    return (
      <motion.section
        ref={ref}
        className={cn(
          "relative flex w-full flex-col overflow-hidden bg-[#04070D] text-[#F8FAFC] md:flex-row border-y border-[#38BDF8]/20 rounded-3xl",
          className
        )}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={containerVariants}
        style={style}
      >
        {/* Left Side: Content */}
        <div className="flex w-full flex-col justify-between p-8 md:w-1/2 md:p-12 lg:w-3/5 lg:p-16 z-10">
            {/* Top Section: Logo & Main Content */}
            <div>
                <motion.header className="mb-10" variants={itemVariants}>
                    {logo && (
                        <div className="flex items-center">
                            <img src={logo.url} alt={logo.alt} className="mr-3 h-8" />
                            <div>
                                {logo.text && <p className="text-lg font-bold text-white">{logo.text}</p>}
                                {slogan && <p className="text-xs tracking-wider text-[#38BDF8] font-mono-ui uppercase">{slogan}</p>}
                            </div>
                        </div>
                    )}
                </motion.header>

                <motion.main variants={containerVariants}>
                    <motion.h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl font-display" variants={itemVariants}>
                        {title}
                    </motion.h1>
                    <motion.div className="my-6 h-1 w-20 bg-[#38BDF8]" variants={itemVariants}></motion.div>
                    <motion.p className="mb-8 max-w-md text-sm md:text-base text-[#94A3B8] font-light leading-relaxed" variants={itemVariants}>
                        {subtitle}
                    </motion.p>
                    <motion.a href={callToAction.href} className="inline-flex items-center gap-2 text-base md:text-lg font-bold tracking-widest text-[#38BDF8] transition-colors hover:text-white group" variants={itemVariants}>
                        <span>{callToAction.text}</span>
                        <span className="group-hover:translate-x-1 transition-transform">➔</span>
                    </motion.a>
                </motion.main>
            </div>

            {/* Bottom Section: Footer Info */}
            <motion.footer className="mt-12 w-full border-t border-white/10 pt-6" variants={itemVariants}>
                <div className="grid grid-cols-1 gap-4 text-xs text-[#94A3B8] sm:grid-cols-3">
                    <div className="flex items-center">
                        <InfoIcon type="website" />
                        <span>{contactInfo.website}</span>
                    </div>
                    <div className="flex items-center">
                        <InfoIcon type="phone" />
                        <span>{contactInfo.phone}</span>
                    </div>
                    <div className="flex items-center">
                        <InfoIcon type="address" />
                        <span>{contactInfo.address}</span>
                    </div>
                </div>
            </motion.footer>
        </div>

        {/* Right Side: Video / Image with Slanted Clip Path Reveal Animation */}
        <motion.div 
          className="w-full min-h-[340px] md:w-1/2 md:min-h-full lg:w-2/5 relative overflow-hidden bg-black/80"
          initial={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }}
          whileInView={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "circOut" }}
        >
          {videoUrl ? (
            <video
              src={videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover min-h-[340px] md:min-h-full"
            />
          ) : (
            <div
              className="w-full h-full bg-cover bg-center min-h-[340px]"
              style={{ backgroundImage: `url(${backgroundImage})` }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </motion.div>
      </motion.section>
    );
  }
);

HeroSection.displayName = "HeroSection";

export { HeroSection };
