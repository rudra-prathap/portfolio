"use client";

import React, { useState } from "react";
import { PROFILE } from "@/lib/data";
import { useSmoothScroll } from "@/lib/scroll";

export const Contact: React.FC = () => {
  const { scrollTo } = useSmoothScroll();
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    });
  };

  const headingLine1 = "Let's build";
  const headingLine2 = "something together.";

  return (
    <footer
      id="contact"
      className="section-pad w-full bg-[#f4f2ee] border-t border-[rgba(13,13,13,0.1)] relative overflow-hidden"
    >
      <div className="site-container">
        {/* Section Header */}
        <div className="flex items-center gap-3 font-mono text-xs text-[#77756f] mb-8">
          <span>07 — Contact</span>
          <span>·</span>
          <span>Initiate Communication</span>
        </div>

        {/* Huge Interactive Heading with Bouncing Letters */}
        <div className="mb-14">
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#0d0d0d] leading-[1.05] select-none">
            <span className="block">
              {headingLine1.split("").map((char, i) => (
                <span
                  key={i}
                  className="inline-block transition-transform duration-200 ease-out hover:-translate-y-3 cursor-default"
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
            <span className="block text-[#3a3a3a]">
              {headingLine2.split("").map((char, i) => (
                <span
                  key={i}
                  className="inline-block transition-transform duration-200 ease-out hover:-translate-y-3 cursor-default"
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
          </h2>
        </div>

        {/* Email & Copy Chip */}
        <div className="mb-16">
          <span className="block font-mono text-xs text-[#77756f] uppercase tracking-wider mb-3">
            Direct Electronic Mail
          </span>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${PROFILE.email}`}
              className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0d0d0d] underline underline-offset-8 decoration-1 hover:decoration-2 transition-all hover:text-[#3a3a3a]"
            >
              {PROFILE.email}
            </a>

            {/* Copy Chip with aria-live */}
            <div aria-live="polite" className="inline-block">
              <button
                onClick={handleCopyEmail}
                className="px-4 py-2 rounded-full font-mono text-xs border border-[rgba(13,13,13,0.2)] bg-white text-[#0d0d0d] shadow-sm hover:bg-[#0d0d0d] hover:text-white transition-all duration-200"
                aria-label={copied ? "Email address copied to clipboard" : "Copy email address to clipboard"}
              >
                {copied ? "Copied ✓" : "Copy"}
              </button>
            </div>
          </div>
        </div>

        {/* Grid: Details & Circular Spinning Badge */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 items-center pb-20 border-b border-[rgba(13,13,13,0.1)]">
          {/* Contact Details Rows */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 font-mono text-xs">
            {/* Phone */}
            <div>
              <span className="text-[#77756f] block mb-2 uppercase tracking-wider">
                Telephone
              </span>
              <a
                href={PROFILE.phoneHref}
                className="text-base font-semibold text-[#0d0d0d] hover:underline"
              >
                {PROFILE.phone}
              </a>
            </div>

            {/* LinkedIn */}
            {PROFILE.linkedin && (
              <div>
                <span className="text-[#77756f] block mb-2 uppercase tracking-wider">
                  Professional Network
                </span>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-semibold text-[#0d0d0d] hover:underline flex items-center gap-1.5"
                >
                  <span>{PROFILE.linkedinDisplay}</span>
                  <span className="text-sm">↗</span>
                </a>
              </div>
            )}

            {/* Location */}
            <div>
              <span className="text-[#77756f] block mb-2 uppercase tracking-wider">
                Base Location
              </span>
              <span className="text-base font-semibold text-[#0d0d0d]">
                {PROFILE.location}
              </span>
            </div>

            {/* Résumé PDF Download */}
            <div>
              <span className="text-[#77756f] block mb-2 uppercase tracking-wider">
                Curriculum Vitae
              </span>
              <a
                href={PROFILE.resumePath}
                download="Panjam_Rudra_Prathap_Resume.pdf"
                className="text-base font-semibold text-[#0d0d0d] hover:underline flex items-center gap-1.5"
              >
                <span>Download Résumé</span>
                <span className="text-sm">↓</span>
              </a>
            </div>
          </div>

          {/* Circular Spinning "Say Hello" Badge */}
          <div className="relative flex items-center justify-center mx-auto md:mx-0">
            <div
              className="w-36 h-36 relative flex items-center justify-center animate-[spin_20s_linear_infinite]"
              aria-hidden="true"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                <path
                  id="circlePath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  fill="none"
                />
                <text className="font-mono text-[9px] fill-[#0d0d0d] tracking-[0.2em] uppercase font-semibold">
                  <textPath xlinkHref="#circlePath" startOffset="0%">
                    · SAY HELLO · PANJAM RUDRA PRATHAP ·
                  </textPath>
                </text>
              </svg>
            </div>
            {/* Center Arrow */}
            <div className="absolute w-10 h-10 rounded-full bg-[#0d0d0d] text-white flex items-center justify-center font-mono text-sm shadow-md pointer-events-none">
              ↗
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#77756f]">
          <div>
            © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => scrollTo("body")}
              className="hover:text-[#0d0d0d] transition-colors"
            >
              Back to top ↑
            </button>
            <span>·</span>
            <span>Built with Next.js 15 & Lenis</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
