"use client";

import React from "react";
import { CERTIFICATIONS } from "@/lib/data";

export const Certifications: React.FC = () => {
  return (
    <section
      id="certifications"
      className="w-full bg-white border-y border-[rgba(13,13,13,0.1)] py-20 sm:py-28"
    >
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 lg:gap-16 items-start">
          {/* Left: Sticky Heading & Count */}
          <div className="lg:sticky lg:top-28">
            <div className="flex items-center gap-3 font-mono text-xs text-[#77756f] mb-3">
              <span>04 — Certifications</span>
              <span>·</span>
              <span>Credentials & Honors</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0d0d0d] leading-none mb-4">
              Always <span className="font-serif-accent font-normal italic text-[#77756f]">learning.</span>
            </h2>

            <p className="font-mono text-xs text-[#77756f] leading-relaxed">
              {String(CERTIFICATIONS.length).padStart(2, "0")} verified credentials & academic awards · 2024–2025
            </p>
          </div>

          {/* Right: Numbered List with Ink-Flood Hover Effect */}
          <div className="divide-y divide-[rgba(13,13,13,0.08)] border-y border-[rgba(13,13,13,0.08)]">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.id}
                tabIndex={0}
                role="article"
                aria-label={`${cert.number}: ${cert.title} by ${cert.issuer}`}
                className="group relative overflow-hidden py-8 px-6 sm:px-8 cursor-pointer transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0d0d0d]"
              >
                {/* Ink Flood Background Layer: scales 0 -> 1 on hover */}
                <span
                  className="absolute inset-0 bg-[#0d0d0d] origin-left scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 transition-transform duration-500 ease-[var(--ease)] pointer-events-none"
                  aria-hidden="true"
                />

                {/* Content Layer: turns white on hover */}
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-4 transition-colors duration-300 group-hover:text-white group-focus-visible:text-white">
                  <div className="flex items-start gap-5">
                    {/* Number */}
                    <span className="font-mono text-sm sm:text-base font-semibold text-[#77756f] group-hover:text-white/70 transition-colors">
                      {cert.number}
                    </span>

                    {/* Title + Details */}
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0d0d0d] group-hover:text-white transition-colors mb-2">
                        {cert.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#77756f] group-hover:text-white/80 transition-colors leading-relaxed mb-3">
                        {cert.details}
                      </p>
                      <div className="flex items-center gap-2 font-mono text-xs text-[#a9a6a0] group-hover:text-white/60 transition-colors">
                        <span>{cert.issuer}</span>
                      </div>
                    </div>
                  </div>

                  {/* Sliding Arrow Icon */}
                  <div className="self-end sm:self-center flex items-center gap-1 font-mono text-sm text-[#0d0d0d] group-hover:text-white opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0 transition-all duration-300 shrink-0">
                    <span>Verified</span>
                    <span className="text-lg">↗</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
