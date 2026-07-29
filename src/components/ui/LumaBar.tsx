"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { StarButton } from "./StarButton";
import GooeyNav from "../reactbits/GooeyNav";

const navItems = [
  { label: "Capabilities", href: "#capabilities" },
  { label: "Why ENIF", href: "#why-enif" },
  { label: "Method", href: "#method" },
];

export const LumaBar = ({ className }: { className?: string }) => {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50",
        "w-[95%] max-w-7xl rounded-full",
        "border border-white/10 bg-[#04070D]/60 backdrop-blur-lg shadow-2xl shadow-black/50",
        "flex items-center justify-between px-4 md:px-6 py-2.5",
        className
      )}
    >
      <Link href="/enif" className="flex items-center gap-3 group">
        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#38BDF8]/30 group-hover:border-[#38BDF8]/60 transition-colors">
          <Image src="/eniflogo.png" alt="ENIF" fill sizes="32px" className="object-cover" />
        </div>
        <span className="text-[#F4F4F0] font-medium tracking-wide text-sm group-hover:text-[#38BDF8] transition-colors">
          ENIF
        </span>
      </Link>
      
      <div className="hidden md:block">
        <GooeyNav
          items={navItems}
          particleCount={12}
          particleDistances={[70, 10]}
          particleR={80}
          initialActiveIndex={0}
          animationTime={500}
          timeVariance={200}
        />
      </div>

      <StarButton href="#contact" className="py-2 px-5 text-xs">
        Start a Conversation
      </StarButton>
    </motion.header>
  );
};
