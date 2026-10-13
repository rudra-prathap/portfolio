"use client";

import React, { useState } from "react";
import { SKILLS, SKILL_FAMILIES, Skill } from "@/lib/data";
import { TechLogo, isBrand } from "@/components/ui/TechLogo";

export const Skills: React.FC = () => {
  const [selectedFamily, setSelectedFamily] = useState<string>("All");
  const [activeSkill, setActiveSkill] = useState<Skill>(SKILLS[0]);

  return (
    <section id="skills" className="section-pad w-full border-t border-[rgba(13,13,13,0.06)]">
      <div className="site-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 font-mono text-xs text-[#77756f] mb-3">
              <span>02 — Skills</span>
              <span>·</span>
              <span>Periodic table of my stack</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0d0d0d] leading-none">
              Technical <span className="font-serif-accent font-normal italic text-[#77756f]">Stack.</span>
            </h2>
          </div>

          {/* Family Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {SKILL_FAMILIES.map((family) => {
              const isSelected = selectedFamily === family;
              return (
                <button
                  key={family}
                  onClick={() => setSelectedFamily(family)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
                    isSelected
                      ? "bg-[#0d0d0d] text-white shadow-sm"
                      : "bg-white text-[#77756f] border border-[rgba(13,13,13,0.1)] hover:border-[#0d0d0d] hover:text-[#0d0d0d]"
                  }`}
                >
                  {family}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Layout: Periodic Grid (left) + Sticky Inspector Panel (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
          {/* Periodic Elements Grid (8 cols desktop, 4 cols mobile) */}
          <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-3">
            {SKILLS.map((skill, index) => {
              const isMatch = selectedFamily === "All" || skill.family === selectedFamily;
              const isActive = activeSkill.id === skill.id;

              // Row and col for diagonal wave animation
              const col = index % 8;
              const row = Math.floor(index / 8);
              const waveDelay = (row + col) * 40;

              return (
                <button
                  key={skill.id}
                  onClick={() => setActiveSkill(skill)}
                  onMouseEnter={() => setActiveSkill(skill)}
                  onFocus={() => setActiveSkill(skill)}
                  style={{
                    animationDelay: `${waveDelay}ms`,
                  }}
                  className={`group relative aspect-square p-2.5 rounded-2xl flex flex-col justify-between text-left transition-all duration-300 ${
                    isActive
                      ? "bg-white border-2 border-[#0d0d0d] shadow-lg scale-[1.03] z-20"
                      : "bg-white/80 border border-[rgba(13,13,13,0.08)] hover:border-[rgba(13,13,13,0.3)] hover:shadow-md"
                  } ${
                    isMatch
                      ? "opacity-100 filter-none"
                      : "opacity-25 grayscale hover:opacity-75"
                  }`}
                  aria-label={`${skill.name} (${skill.symbol}) - ${skill.family}`}
                >
                  {/* Top: Atomic Number & Brand indicator */}
                  <div className="flex items-center justify-between w-full">
                    <span className="font-mono text-[10px] text-[#77756f]">
                      {String(skill.atomicNumber).padStart(2, "0")}
                    </span>
                    {skill.isBrand && (
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: skill.brandColor || "#0d0d0d" }}
                      />
                    )}
                  </div>

                  {/* Center: 2-Letter Symbol */}
                  <div className="my-auto text-center">
                    <span className="font-bold text-xl sm:text-2xl tracking-tighter text-[#0d0d0d] group-hover:scale-110 inline-block transition-transform duration-200">
                      {skill.symbol}
                    </span>
                  </div>

                  {/* Bottom: Name */}
                  <div className="truncate">
                    <span className="block font-mono text-[9px] text-[#3a3a3a] truncate">
                      {skill.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Sticky Inspector Panel (320px wide) */}
          <aside
            className="lg:sticky lg:top-24 w-full bg-white rounded-3xl p-6 border border-[rgba(13,13,13,0.08)] shadow-[0_12px_36px_rgba(13,13,13,0.04)] transition-all duration-300"
            aria-live="polite"
          >
            <div className="flex items-center justify-between border-b border-[rgba(13,13,13,0.06)] pb-4 mb-6">
              <span className="font-mono text-[11px] text-[#77756f] uppercase tracking-wider">
                ELEMENT INSPECTOR
              </span>
              <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-md bg-[#f4f2ee] text-[#0d0d0d]">
                #{String(activeSkill.atomicNumber).padStart(2, "0")} {activeSkill.symbol}
              </span>
            </div>

            {/* 150px Logo Preview with Pop Animation */}
            <div className="relative flex items-center justify-center h-44 bg-[#f4f2ee]/60 rounded-2xl mb-6 overflow-hidden border border-[rgba(13,13,13,0.04)]">
              <div
                key={activeSkill.id}
                className="animate-[logoPop_0.4s_var(--ease)_both]"
              >
                <TechLogo
                  logoKey={activeSkill.logoKey}
                  size={120}
                  glow={true}
                />
              </div>
            </div>

            {/* Name & Family */}
            <div className="mb-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-xl font-bold text-[#0d0d0d] tracking-tight">
                  {activeSkill.name}
                </h3>
                <span className="font-mono text-[10px] text-[#77756f] uppercase bg-[#f4f2ee] px-2 py-0.5 rounded">
                  {isBrand(activeSkill.logoKey) ? "Official Logo" : "Core Skill"}
                </span>
              </div>
              <p className="font-mono text-xs text-[#77756f] mt-1">
                Family: {activeSkill.family}
              </p>
            </div>

            {/* Description */}
            <p className="text-xs text-[#3a3a3a] leading-relaxed mb-5">
              {activeSkill.description}
            </p>

            {/* Projects Using Skill */}
            <div className="pt-4 border-t border-[rgba(13,13,13,0.06)]">
              <span className="font-mono text-[10px] text-[#77756f] uppercase tracking-wider block mb-2">
                Applied in Projects
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeSkill.projects.map((proj, idx) => (
                  <span
                    key={idx}
                    className="inline-block text-[11px] font-mono px-2 py-1 rounded-md bg-[#f4f2ee] text-[#0d0d0d] border border-[rgba(13,13,13,0.06)]"
                  >
                    {proj}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
