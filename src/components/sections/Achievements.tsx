"use client";

import React, { useRef, useState, useEffect } from "react";
import { ACHIEVEMENTS, Achievement } from "@/lib/data";

function easeOutQuart(x: number): number {
  return 1 - Math.pow(1 - x, 4);
}

export const Achievements: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [countedNumbers, setCountedNumbers] = useState<number[]>(
    ACHIEVEMENTS.map(() => 0)
  );
  const hasAnimatedRef = useRef<boolean[]>(ACHIEVEMENTS.map(() => false));

  // Pinned scroll calculation
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track) return;

      const rect = container.getBoundingClientRect();
      const totalScrollDistance = container.offsetHeight - window.innerHeight;

      if (totalScrollDistance <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.min(Math.max(currentScroll / totalScrollDistance, 0), 1);
      setScrollProgress(progress);

      // Determine active card nearest viewport center
      const maxTranslate = track.scrollWidth - window.innerWidth + 120;
      const currentTranslate = progress * Math.max(maxTranslate, 0);
      const viewportCenter = window.innerWidth / 2;

      let nearestIndex = 0;
      let minDistance = Infinity;

      const cardElements = track.querySelectorAll<HTMLElement>("[data-achievement-card]");
      cardElements.forEach((el, index) => {
        const cardRect = el.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const dist = Math.abs(cardCenter - viewportCenter);
        if (dist < minDistance) {
          minDistance = dist;
          nearestIndex = index;
        }

        // Trigger count-up animation if card entered view
        if (cardRect.right > 0 && cardRect.left < window.innerWidth && !hasAnimatedRef.current[index]) {
          hasAnimatedRef.current[index] = true;
          animateNumber(index, ACHIEVEMENTS[index].targetNumber);
        }
      });

      setActiveCardIndex(nearestIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const animateNumber = (index: number, target: number) => {
    const duration = 1400; // 1.4s
    const startTime = performance.now();

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(t);
      const currentVal = eased * target;

      setCountedNumbers((prev) => {
        const next = [...prev];
        next[index] = currentVal;
        return next;
      });

      if (t < 1) {
        requestAnimationFrame(frame);
      } else {
        setCountedNumbers((prev) => {
          const next = [...prev];
          next[index] = target;
          return next;
        });
      }
    };

    requestAnimationFrame(frame);
  };

  return (
    <section
      ref={containerRef}
      id="achievements"
      className="relative w-full border-t border-[rgba(13,13,13,0.06)]"
      style={{ height: "calc(100svh + 1400px)" }}
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col justify-between py-10 sm:py-14">
        {/* Header with Title and Scroll Progress Bar */}
        <div className="site-container w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-20">
          <div>
            <div className="flex items-center gap-3 font-mono text-xs text-[#77756f] mb-2">
              <span>06 — Achievements</span>
              <span>·</span>
              <span>Verified Academic & Project Benchmarks</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0d0d0d] leading-none">
              Honors & <span className="font-serif-accent font-normal italic text-[#77756f]">metrics.</span>
            </h2>
          </div>

          {/* Thin Progress Indicator */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#77756f]">
              {String(activeCardIndex + 1).padStart(2, "0")} / {String(ACHIEVEMENTS.length).padStart(2, "0")}
            </span>
            <div className="w-32 h-[2px] bg-[rgba(13,13,13,0.1)] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#0d0d0d] origin-left transition-transform duration-100 ease-out"
                style={{ transform: `scaleX(${scrollProgress})` }}
              />
            </div>
          </div>
        </div>

        {/* Pinned Horizontal Gallery Track */}
        <div className="relative w-full my-auto overflow-hidden pl-[clamp(18px,4vw,64px)]">
          <div
            ref={trackRef}
            className="flex items-center gap-6 sm:gap-8 will-change-transform transition-transform duration-75 ease-out pr-[clamp(18px,4vw,64px)]"
            style={{
              transform: `translateX(-${scrollProgress * 1100}px)`,
            }}
          >
            {ACHIEVEMENTS.map((card, idx) => {
              const isCenter = activeCardIndex === idx;
              const formattedNumber =
                card.decimals === 0
                  ? Math.round(countedNumbers[idx])
                  : countedNumbers[idx].toFixed(card.decimals);

              return (
                <div
                  key={card.id}
                  data-achievement-card
                  className={`shrink-0 w-[clamp(340px,40vw,540px)] h-[clamp(260px,36vh,320px)] bg-white rounded-[28px] p-7 sm:p-8 flex flex-col justify-between transition-all duration-500 ease-[var(--ease)] ${
                    isCenter
                      ? "-translate-y-3 shadow-[0_30px_65px_rgba(13,13,13,0.12)] ring-1 ring-[rgba(13,13,13,0.06)]"
                      : "shadow-[0_10px_30px_rgba(13,13,13,0.04)] ring-1 ring-[rgba(13,13,13,0.04)]"
                  }`}
                >
                  {/* Card Top: 72px Logo Tile with Glow + Index */}
                  <div className="flex items-center justify-between">
                    <div className="relative flex items-center justify-center">
                      {/* Brand-tint glow */}
                      <div
                        className={`absolute inset-0 rounded-2xl blur-lg transition-opacity duration-500 ${
                          isCenter ? "opacity-35" : "opacity-15"
                        }`}
                        style={{ backgroundColor: card.brandColor }}
                      />
                      {/* 72px Logo Tile */}
                      <div className="relative w-[72px] h-[72px] rounded-2xl bg-[#f4f2ee] border border-[rgba(13,13,13,0.06)] flex items-center justify-center font-mono font-bold text-sm text-[#0d0d0d] shadow-sm">
                        {card.id === "ach-1" && "SSC"}
                        {card.id === "ach-2" && "DIPL"}
                        {card.id === "ach-3" && "CGPA"}
                        {card.id === "ach-4" && "AWARD"}
                        {card.id === "ach-5" && "NET"}
                      </div>
                    </div>

                    <span className="font-mono text-xs font-semibold text-[#77756f]">
                      {card.index}
                    </span>
                  </div>

                  {/* Card Bottom: Metadata (left) + Huge Number (right) */}
                  <div className="flex items-end justify-between gap-4 pt-4 border-t border-[rgba(13,13,13,0.06)]">
                    <div className="max-w-[60%]">
                      <h3 className="font-bold text-lg sm:text-xl text-[#0d0d0d] tracking-tight leading-snug mb-1">
                        {card.label}
                      </h3>
                      <p className="font-mono text-[11px] text-[#77756f] mb-1">
                        {card.caption}
                      </p>
                      <p className="text-[11px] text-[#a9a6a0] leading-tight line-clamp-2">
                        {card.detail}
                      </p>
                    </div>

                    {/* Huge Number */}
                    <div className="text-right">
                      <span className="font-black text-4xl sm:text-5xl md:text-6xl tracking-tighter text-[#0d0d0d] leading-none inline-block">
                        {formattedNumber}
                        <span className="text-2xl sm:text-3xl font-bold text-[#77756f]">
                          {card.suffix}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* End Card: and counting → */}
            <div className="shrink-0 w-[240px] h-[clamp(260px,36vh,320px)] rounded-[28px] border-2 border-dashed border-[rgba(13,13,13,0.2)] bg-transparent flex flex-col items-center justify-center p-6 text-center select-none">
              <span className="font-serif-accent italic text-2xl text-[#3a3a3a] mb-2">
                and counting
              </span>
              <span className="font-mono text-sm text-[#77756f]">→</span>
            </div>
          </div>
        </div>

        {/* Footer Hint */}
        <div className="site-container w-full flex justify-between items-center font-mono text-[11px] text-[#77756f]">
          <span>Horizontal travel mapped to scroll velocity</span>
          <span>Only verified metrics from résumé</span>
        </div>
      </div>
    </section>
  );
};
