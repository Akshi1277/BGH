"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Icon from "./Icon";

const CLIENTS = [
  {
    name: "Printfix",
    url: "https://printfix.co.in",
    logo: "/printfixlogo.png"
  },
];

export default function Clients() {
  return (
    <section
      id="clients"
      className="section-y bg-surface text-ink overflow-hidden border-y border-surface-line"
    >
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="mb-12 text-center flex flex-col items-center"
        >
          <span className="text-eyebrow font-mono-ui text-accent block mb-4 uppercase tracking-[0.2em]">
            Brands We Work With
          </span>
          <h2 className="font-display text-3xl md:text-5xl text-ink leading-tight mb-4">
            Trusted by Ambitious <span className="italic font-normal text-accent">Brands.</span>
          </h2>
          <p className="text-base md:text-lg text-ink-muted font-light leading-relaxed max-w-2xl">
            We partner with visionary companies to build enduring value and operational excellence.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
          className="flex flex-wrap justify-center gap-6 md:gap-10"
        >
          {CLIENTS.map((client, index) => (
            <Link
              key={index}
              href={client.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-8 py-6 rounded-2xl border border-surface-line bg-paper hover:border-accent/40 hover:shadow-sm transition-all duration-300"
            >
              {client.logo ? (
                <div className="relative h-10 w-32 md:h-12 md:w-40 transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src={client.logo}
                    alt={`${client.name} logo`}
                    fill
                    className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ) : (
                <span className="font-display text-2xl md:text-3xl text-ink group-hover:text-accent transition-colors font-medium">
                  {client.name}
                </span>
              )}
              <Icon 
                name="arrow-up-right" 
                size={20} 
                className="text-ink-muted group-hover:text-accent transition-colors opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:-translate-y-0"
              />
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
