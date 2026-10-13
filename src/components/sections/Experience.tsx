"use client";

import React, { useRef, useState, useEffect } from "react";
import { TIMELINE } from "@/lib/data";

export const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [spineProgress, setSpineProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start when top enters middle of viewport, end when bottom leaves middle
      const totalDist = rect.height;
      const currentScroll = windowHeight * 0.6 - rect.top;

      const progress = Math.min(Math.max(currentScroll / totalDist, 0), 1);
      setSpineProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="section-pad w-full border-t border-[rgba(13,13,13,0.06)]"
    >
      <div className="site-container">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 font-mono text-xs text-[#77756f] mb-3">
            <span>05 — Experience & Education</span>
            <span>·</span>
            <span>Unified Career Path</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0d0d0d] leading-none">
            Learning & <span className="font-serif-accent font-normal italic text-[#77756f]">journey.</span>
          </h2>
        </div>

        {/* Timeline Path Container */}
        <div className="relative max-w-4xl mx-auto pl-6 sm:pl-10">
          {/* Background Spine Line */}
          <div
            className="absolute left-[11px] sm:left-[19px] top-4 bottom-24 w-[2px] bg-[rgba(13,13,13,0.1)] rounded-full"
            aria-hidden="true"
          />

          {/* Active Spine Line (Draws as you scroll) */}
          <div
            className="absolute left-[11px] sm:left-[19px] top-4 w-[2px] bg-[#0d0d0d] rounded-full origin-top transition-all duration-150 ease-out"
            style={{
              height: "calc(100% - 96px)",
              transform: `scaleY(${spineProgress})`,
            }}
            aria-hidden="true"
          />

          {/* Timeline Nodes */}
          <div className="space-y-12">
            {TIMELINE.map((item, idx) => {
              const nodeThreshold = (idx + 0.5) / (TIMELINE.length + 1);
              const isLit = spineProgress >= nodeThreshold;

              return (
                <div key={item.id} className="relative flex items-start gap-6 group">
                  {/* Spine Marker Dot */}
                  <div
                    className={`absolute -left-[24px] sm:-left-[32px] top-2.5 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-500 ${
                      isLit
                        ? "bg-white shadow-[0_0_0_4px_#0d0d0d]"
                        : "bg-[#f4f2ee] shadow-[0_0_0_2px_rgba(13,13,13,0.2)]"
                    }`}
                    aria-hidden="true"
                  >
                    <div
                      className={`w-2.5 h-2.5 rounded-full transition-colors duration-500 ${
                        isLit ? "bg-[#0d0d0d]" : "bg-[#a9a6a0]"
                      }`}
                    />
                  </div>

                  {/* Card Body */}
                  <div
                    className={`w-full rounded-3xl p-6 sm:p-8 border transition-all duration-500 ${
                      isLit
                        ? "bg-white border-[rgba(13,13,13,0.12)] shadow-[0_12px_32px_rgba(13,13,13,0.05)] translate-x-1"
                        : "bg-white/60 border-[rgba(13,13,13,0.06)] opacity-75"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-full bg-[#f4f2ee] text-[#0d0d0d] w-fit">
                        {item.year}
                      </span>
                      <span className="font-mono text-[11px] text-[#77756f] uppercase">
                        {item.type}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0d0d0d] mb-1">
                      {item.title}
                    </h3>

                    <p className="font-mono text-xs text-[#77756f] mb-4">
                      {item.place}
                    </p>

                    <p className="text-sm text-[#3a3a3a] leading-relaxed mb-4">
                      {item.detail}
                    </p>

                    {item.bullets && item.bullets.length > 0 && (
                      <ul className="space-y-2 mb-4 pt-2 border-t border-[rgba(13,13,13,0.06)] text-xs text-[#555]">
                        {item.bullets.map((b, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2">
                            <span className="text-[#0d0d0d] font-bold mt-0.5">•</span>
                            <span className="leading-snug">{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {item.score && (
                      <div className="pt-2 border-t border-[rgba(13,13,13,0.06)] flex items-center justify-between text-xs font-mono">
                        <span className="text-[#77756f]">Academic Standing:</span>
                        <span className="text-[#0d0d0d] font-bold">{item.score}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Final Dashed Card: Next — Your team? */}
            <div className="relative flex items-start gap-6">
              {/* Spine Final Marker Dot */}
              <div
                className={`absolute -left-[24px] sm:-left-[32px] top-2.5 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-500 ${
                  spineProgress > 0.85
                    ? "bg-white shadow-[0_0_0_4px_#0d0d0d]"
                    : "bg-[#f4f2ee] shadow-[0_0_0_2px_rgba(13,13,13,0.2)]"
                }`}
                aria-hidden="true"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>

              {/* Dashed Card */}
              <div className="w-full rounded-3xl p-8 border-2 border-dashed border-[rgba(13,13,13,0.2)] bg-transparent hover:bg-white/50 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="font-mono text-xs font-semibold text-[#77756f] uppercase block mb-1">
                      Upcoming Chapter
                    </span>
                    <h3 className="text-2xl font-bold tracking-tight text-[#0d0d0d]">
                      Next — Your team?
                    </h3>
                    <p className="text-xs font-mono text-[#77756f] mt-2 max-w-lg leading-relaxed">
                      Available for full-stack engineering, web application development, and network architecture opportunities.
                    </p>
                  </div>

                  <a
                    href="#contact"
                    className="btn-pill-primary text-xs shrink-0 self-start sm:self-center"
                  >
                    <span>Get in touch</span>
                    <span className="font-mono">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
