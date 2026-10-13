"use client";

import React, { useState, useEffect, useRef } from "react";
import { NAV, PROFILE } from "@/lib/data";
import { useSmoothScroll } from "@/lib/scroll";

export const Navigation: React.FC = () => {
  const { scrollTo } = useSmoothScroll();
  const [activeSection, setActiveSection] = useState<string>("about");
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });

  // Track scroll progress and scroll threshold (40px)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 40);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress(Math.min(Math.max(scrollY / docHeight, 0), 1));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section with IntersectionObserver rootMargin: -45% 0px -50% 0px
  useEffect(() => {
    const sections = NAV.map((item) => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-45% 0px -50% 0px",
        threshold: 0,
      }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  // Update sliding indicator pill position
  useEffect(() => {
    if (!navContainerRef.current) return;
    const activeBtn = navContainerRef.current.querySelector<HTMLButtonElement>(
      `[data-nav-id="${activeSection}"]`
    );

    if (activeBtn) {
      const containerRect = navContainerRef.current.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      setIndicatorStyle({
        left: btnRect.left - containerRect.left,
        width: btnRect.width,
      });
    }
  }, [activeSection]);

  // Lock body scroll and listen for Escape key on mobile menu
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMobileMenuOpen(false);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    scrollTo(`#${id}`);
  };

  return (
    <>
      {/* 2px ink scroll-progress bar along the very top */}
      <div
        className="fixed top-0 left-0 right-0 h-[2px] z-50 pointer-events-none transition-transform duration-75 ease-out"
        style={{
          backgroundColor: "var(--ink)",
          transformOrigin: "left",
          transform: `scaleX(${scrollProgress})`,
        }}
        aria-hidden="true"
      />

      {/* Main Navigation Header */}
      <header
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
        style={{
          paddingTop: scrolled ? "12px" : "20px",
          paddingBottom: scrolled ? "12px" : "20px",
        }}
      >
        <div className="site-container flex items-center justify-between">
          {/* Left: Initials mark + Name */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo("body")}
              className={`group flex items-center justify-center w-10 h-10 rounded-full text-xs font-mono font-medium transition-all duration-500 ${
                scrolled
                  ? "bg-[#0d0d0d] text-[#f4f2ee] shadow-sm"
                  : "bg-transparent text-[#0d0d0d] border border-[rgba(13,13,13,0.2)]"
              }`}
              aria-label="Back to top"
            >
              <span className="inline-block transition-transform duration-700 ease-[var(--ease)] group-hover:rotate-[360deg]">
                RP
              </span>
            </button>

            <span
              className={`font-semibold tracking-tight text-sm text-[#0d0d0d] transition-opacity duration-300 hidden sm:inline-block ${
                scrolled ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              {PROFILE.name}
            </span>
          </div>

          {/* Desktop Center: Frosted Glass Pill with Sliding Indicator */}
          <nav
            ref={navContainerRef}
            className={`hidden md:flex items-center relative p-1 rounded-full transition-all duration-300 ${
              scrolled
                ? "bg-white/80 backdrop-blur-md border border-[rgba(13,13,13,0.08)] shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
                : "bg-white/40 backdrop-blur-sm border border-[rgba(13,13,13,0.04)]"
            }`}
            aria-label="Primary Navigation"
          >
            {/* Sliding Solid Ink Indicator */}
            {indicatorStyle.width > 0 && (
              <div
                className="absolute top-1 bottom-1 bg-[#0d0d0d] rounded-full transition-all duration-300 ease-[var(--ease)] pointer-events-none"
                style={{
                  left: `${indicatorStyle.left}px`,
                  width: `${indicatorStyle.width}px`,
                }}
              />
            )}

            {NAV.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  data-nav-id={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative z-10 px-4 py-1.5 text-xs font-medium rounded-full transition-colors duration-200 select-none ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-[#77756f] hover:text-[#0d0d0d]"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="px-4 py-2 rounded-full text-xs font-mono font-medium border border-[rgba(13,13,13,0.15)] bg-white/90 backdrop-blur-md shadow-sm text-[#0d0d0d]"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? "Close [esc]" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Paper Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#f4f2ee] md:hidden flex flex-col justify-between p-8 transition-all duration-500 ease-[var(--ease)] ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto [clip-path:circle(150%_at_top_right)]"
            : "opacity-0 pointer-events-none [clip-path:circle(0%_at_top_right)]"
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="flex justify-between items-center pt-2">
          <span className="font-mono text-xs text-[#77756f]">00 — Index</span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="w-10 h-10 rounded-full border border-[rgba(13,13,13,0.15)] flex items-center justify-center text-sm"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col gap-4 my-auto">
          {NAV.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="text-left py-2 group flex items-baseline gap-4 transition-transform duration-300"
              style={{
                transitionDelay: `${mobileMenuOpen ? idx * 50 : 0}ms`,
                transform: mobileMenuOpen ? "translateY(0)" : "translateY(20px)",
                opacity: mobileMenuOpen ? 1 : 0,
              }}
            >
              <span className="font-mono text-xs text-[#a9a6a0] group-hover:text-[#0d0d0d]">
                {item.number}
              </span>
              <span className="text-3xl font-bold tracking-tight text-[#0d0d0d] group-hover:translate-x-2 transition-transform">
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        <div className="pt-4 border-t border-[rgba(13,13,13,0.1)] flex justify-between items-center text-xs text-[#77756f] font-mono">
          <span>{PROFILE.name}</span>
          <span>{PROFILE.subRole}</span>
        </div>
      </div>
    </>
  );
};
