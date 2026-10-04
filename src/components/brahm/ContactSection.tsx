"use client";

import { motion } from "framer-motion";
import Icon from "../Icon";
import MagneticButton from "../MagneticButton";
import { EMAIL, contact } from "./content";
import { EASE } from "./motion";
import MeshFlow from "./MeshFlow";

/*
 * LET'S BUILD: the page's closing call, on the deep ink used for The BRAHM Way. The invitation
 * as a large headline ending on "Building." in light pine, the email set large with an underline
 * that draws on hover, and the three ways in as rows that answer the pointer quietly: the title
 * steps in and turns light pine, a pine rule draws along the row's foot, the arrow moves on.
 * All over a dot grid that bends toward the pointer. Same words and email links as before.
 */
const rise = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

export default function ContactSection() {
  const words = contact.title.split(" ");
  const lastWord = words.pop();
  return (
    <section id="contact" aria-labelledby="bx-contact-title" className="section-y relative overflow-hidden bg-[#101412] text-surface">
      {/* a dot grid that bends toward the pointer, kept quiet so the type stays first */}
      <MeshFlow className="opacity-40" />
      <div className="relative mx-auto max-w-[var(--spacing-container-max)] px-margin-mobile md:px-margin-desktop">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-16">
          <motion.div {...rise} transition={{ duration: 0.7, ease: EASE }} className="lg:col-span-7">
            <span className="text-eyebrow mb-5 block font-mono-ui uppercase tracking-[0.2em] text-[#7FB79B]">{contact.eyebrow}</span>
            <h2 id="bx-contact-title" className="font-display text-[clamp(44px,6vw,100px)] font-normal leading-[0.98] tracking-[-0.02em] text-surface">
              {words.join(" ")} <span className="italic text-[#7FB79B]">{lastWord}</span>
            </h2>
            <a href={`mailto:${EMAIL}`} className="group relative mt-10 inline-block max-w-full break-all pb-2 font-display text-[clamp(22px,2.6vw,40px)] text-surface/85 transition-colors hover:text-surface sm:break-normal">
              {EMAIL}
              <span aria-hidden="true" className="absolute bottom-0 left-0 h-px w-full bg-surface/20" />
              <span aria-hidden="true" className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[#7FB79B] transition-transform duration-500 ease-out group-hover:scale-x-100" />
            </a>
          </motion.div>
          <motion.div {...rise} transition={{ duration: 0.7, ease: EASE, delay: 0.1 }} className="lg:col-span-5">
            <p className="text-[17px] font-light leading-relaxed text-surface/65">{contact.body}</p>
            <p className="mt-4 text-[17px] italic leading-relaxed text-surface">{contact.coda}</p>
            <div className="mt-9">
              <MagneticButton
                href={`mailto:${EMAIL}`}
                className="group inline-flex items-center gap-3 rounded-full bg-surface px-10 py-5 font-mono-ui text-label uppercase tracking-[0.1em] text-ink transition-colors duration-300 hover:bg-[#7FB79B]"
              >
                {contact.cta}
              </MagneticButton>
            </div>
          </motion.div>
        </div>

        <ul className="mt-20 border-t border-surface/15 md:mt-28">
          {contact.pathways.map((p, i) => (
            <motion.li key={p.title} {...rise} transition={{ duration: 0.6, ease: EASE, delay: 0.08 * i }} className="border-b border-surface/15">
              <a
                href={p.href}
                className="group relative grid items-baseline gap-x-10 gap-y-3 py-8 outline-none md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)_auto] md:py-10"
              >
                {/* a pine rule draws along the row's foot when pointed at or focused */}
                <span aria-hidden="true" className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-[#7FB79B] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100" />
                <span className="relative font-display text-[clamp(28px,2.8vw,44px)] font-normal leading-tight text-surface transition-[color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2 group-hover:text-[#7FB79B] group-focus-visible:text-[#7FB79B]">
                  {p.title}
                </span>
                <span className="relative max-w-[56ch] text-[15px] font-light leading-relaxed text-surface/60 transition-colors duration-500 group-hover:text-surface/90">{p.description}</span>
                <span aria-hidden="true" className="relative hidden text-surface/40 transition-all duration-500 group-hover:translate-x-2 group-hover:text-[#7FB79B] md:block">
                  <Icon name="arrow-right" size={22} />
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
