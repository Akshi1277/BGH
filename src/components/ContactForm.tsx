"use client";

import React, { useState } from "react";
import Icon from "./Icon";

const TOPICS = [
  "General Corporate Inquiry",
  "Strategic Partnerships & JVs",
  "Venture Incubation & Co-Building",
  "ENIF Technologies (Software & AI)",
  "7AURIGA (Brand Intelligence & Media)",
  "Media, Press & Investor Relations",
];

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState(TOPICS[0]);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate brief polished processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setMessage("");
    setTopic(TOPICS[0]);
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="bg-paper border border-surface-line rounded-2xl p-8 md:p-12 shadow-sm text-center flex flex-col items-center justify-center min-h-[440px]">
        <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-6">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-2xl md:text-3xl text-ink font-semibold mb-3">
          Message Received
        </h3>
        <p className="text-sm md:text-base text-ink-muted font-light leading-relaxed max-w-md mb-8">
          Thank you for reaching out, <span className="font-medium text-ink">{name}</span>. Your message regarding <span className="font-medium text-ink">{topic}</span> has been routed directly to our London executive team. We review and respond within one business day.
        </p>
        <button
          type="button"
          onClick={handleReset}
          className="text-xs font-mono-ui uppercase tracking-wider text-accent font-semibold hover:underline"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-paper border border-surface-line rounded-2xl p-8 md:p-10 shadow-sm flex flex-col justify-between"
    >
      <div className="space-y-6">
        <div>
          <h3 className="font-display text-2xl text-ink font-semibold mb-1">
            Send a Direct Message
          </h3>
          <p className="text-xs sm:text-sm text-ink-muted font-light">
            Fill out the form below and our partners will get in touch promptly.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label htmlFor="full-name" className="block font-mono-ui text-[11px] uppercase tracking-wider text-ink-muted font-semibold">
              Full Name *
            </label>
            <input
              id="full-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alexander Wright"
              className="w-full px-4 py-3 bg-surface/50 border border-surface-line rounded-xl text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-accent focus:bg-paper transition-all"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="work-email" className="block font-mono-ui text-[11px] uppercase tracking-wider text-ink-muted font-semibold">
              Corporate Email *
            </label>
            <input
              id="work-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alexander@company.com"
              className="w-full px-4 py-3 bg-surface/50 border border-surface-line rounded-xl text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-accent focus:bg-paper transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="topic-select" className="block font-mono-ui text-[11px] uppercase tracking-wider text-ink-muted font-semibold">
            Nature of Inquiry
          </label>
          <div className="relative">
            <select
              id="topic-select"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-4 py-3 bg-surface/50 border border-surface-line rounded-xl text-sm text-ink focus:outline-none focus:border-accent focus:bg-paper transition-all appearance-none cursor-pointer pr-10"
            >
              {TOPICS.map((t) => (
                <option key={t} value={t} className="bg-paper text-ink">
                  {t}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-ink-muted">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="message-text" className="block font-mono-ui text-[11px] uppercase tracking-wider text-ink-muted font-semibold">
            Message *
          </label>
          <textarea
            id="message-text"
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us about your venture, partnership thesis, or project requirements..."
            className="w-full px-4 py-3 bg-surface/50 border border-surface-line rounded-xl text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-accent focus:bg-paper transition-all resize-none"
          />
        </div>
      </div>

      <div className="pt-6 mt-6 border-t border-surface-line/70 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-[11px] font-mono-ui text-ink-muted font-light">
          Strictly confidential. No automated queues.
        </span>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-ink text-surface hover:bg-accent active:scale-[0.98] transition-all duration-200 font-mono-ui text-xs uppercase tracking-wider font-semibold disabled:opacity-50 cursor-pointer"
        >
          <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
          {!isSubmitting && <Icon name="arrow-right" size={12} />}
        </button>
      </div>
    </form>
  );
}
