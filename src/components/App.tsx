"use client";

import React, { useEffect } from "react";
import { SmoothScrollProvider } from "@/lib/scroll";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Work } from "@/components/sections/Work";
import { Certifications } from "@/components/sections/Certifications";
import { Experience } from "@/components/sections/Experience";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";

export const App: React.FC = () => {
  // Global RevealObserver: adds .is-in to .rv and .rv-mask, once only
  useEffect(() => {
    const elements = document.querySelectorAll(".rv, .rv-mask");
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <SmoothScrollProvider>
      <div className="relative min-h-screen bg-[#f4f2ee] text-[#0d0d0d] flex flex-col selection:bg-[#0d0d0d] selection:text-[#f4f2ee]">
        {/* Navigation Bar */}
        <Navigation />

        {/* Continuous Flow of Sections (Exact Order) */}
        <main className="flex-1 w-full flex flex-col">
          <Hero />
          <About />
          <Skills />
          <Work />
          <Certifications />
          <Experience />
          <Achievements />
        </main>

        {/* Contact and Footer */}
        <Contact />
      </div>
    </SmoothScrollProvider>
  );
};
