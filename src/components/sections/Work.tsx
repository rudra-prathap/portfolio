"use client";

import React, { useState } from "react";
import { PROJECTS, Project } from "@/lib/data";
import { TechLogo } from "@/components/ui/TechLogo";

export const Work: React.FC = () => {
  const [activeProjectId, setActiveProjectId] = useState<string>(PROJECTS[0].id);

  const getLogoKey = (tech: string) => {
    const t = tech.toLowerCase();
    if (t.includes("html")) return "html5";
    if (t.includes("css")) return "css3";
    if (t.includes("javascript")) return "javascript";
    if (t.includes("sql")) return "mysql";
    if (t.includes("cisco") || t.includes("packet")) return "cisco";
    if (t.includes("wireshark")) return "wireshark";
    if (t.includes("tcp") || t.includes("network")) return "network";
    if (t.includes("routing")) return "routing";
    return "webdev";
  };

  return (
    <section id="work" className="section-pad w-full border-t border-[rgba(13,13,13,0.06)]">
      <div className="site-container">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 font-mono text-xs text-[#77756f] mb-3">
            <span>03 — Selected work</span>
            <span>·</span>
            <span>Systems & Applications</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0d0d0d] leading-none">
            Things I&apos;ve <span className="font-serif-accent font-normal italic text-[#77756f]">built.</span>
          </h2>
        </div>

        {/* Desktop Expanding Accordion Gallery */}
        <div
          className="hidden md:flex gap-4 w-full"
          style={{ height: "min(78svh, 640px)" }}
        >
          {PROJECTS.map((project) => {
            const isOpen = activeProjectId === project.id;

            return (
              <div
                key={project.id}
                tabIndex={0}
                role="button"
                aria-expanded={isOpen}
                aria-label={`Project: ${project.title}`}
                onClick={() => setActiveProjectId(project.id)}
                onMouseEnter={() => setActiveProjectId(project.id)}
                onFocus={() => setActiveProjectId(project.id)}
                className={`relative rounded-3xl overflow-hidden border border-[rgba(13,13,13,0.1)] bg-white transition-all duration-700 ease-[var(--ease)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0d0d0d] cursor-pointer ${
                  isOpen
                    ? "flex-[8] shadow-[0_24px_60px_rgba(13,13,13,0.08)]"
                    : "flex-[1] hover:flex-[1.4] bg-[#faf8f5] hover:bg-white"
                }`}
              >
                {/* Slim Folded Spine View */}
                {!isOpen && (
                  <div className="absolute inset-0 p-6 flex flex-col justify-between items-center select-none">
                    <span className="font-mono text-xs font-semibold text-[#77756f]">
                      {project.index}
                    </span>

                    {/* Vertical Title */}
                    <div
                      className="[writing-mode:vertical-rl] rotate-180 font-bold text-lg tracking-tight text-[#0d0d0d] my-auto whitespace-nowrap"
                    >
                      {project.title}
                    </div>

                    {/* Rotating Plus Button */}
                    <div className="w-9 h-9 rounded-full border border-[rgba(13,13,13,0.15)] flex items-center justify-center text-sm text-[#0d0d0d] group-hover:rotate-90 transition-transform duration-300">
                      +
                    </div>
                  </div>
                )}

                {/* Expanded Open Panel View */}
                {isOpen && (
                  <div className="w-full h-full p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 items-stretch overflow-hidden animate-[fadeIn_0.5s_ease-out]">
                    {/* Left: Project Details */}
                    <div className="flex flex-col justify-between overflow-y-auto pr-2">
                      <div>
                        {/* Kicker + Index */}
                        <div className="flex items-center gap-3 font-mono text-xs text-[#77756f] mb-3">
                          <span className="px-2 py-0.5 rounded bg-[#f4f2ee] text-[#0d0d0d] font-semibold">
                            {project.index}
                          </span>
                          <span>{project.kicker}</span>
                          <span>·</span>
                          <span>{project.period}</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0d0d0d] mb-4">
                          {project.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-[#3a3a3a] leading-relaxed mb-6">
                          {project.description}
                        </p>

                        {/* 2-Column Feature List */}
                        <div className="mb-6">
                          <span className="font-mono text-[11px] uppercase tracking-wider text-[#77756f] block mb-3">
                            Key Technical Capabilities
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#3a3a3a]">
                            {project.features.map((feat, idx) => (
                              <div
                                key={idx}
                                className="flex items-start gap-2 bg-[#f4f2ee]/50 p-2.5 rounded-xl border border-[rgba(13,13,13,0.04)]"
                              >
                                <span className="text-[#0d0d0d] font-bold mt-0.5">•</span>
                                <span className="leading-snug">{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Bottom: Tech Chips & GitHub / Award */}
                      <div className="pt-6 border-t border-[rgba(13,13,13,0.06)] mt-auto">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          {/* Tech Chips */}
                          <div className="flex flex-wrap gap-2">
                            {project.tech.map((t, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f4f2ee] border border-[rgba(13,13,13,0.06)] text-xs font-mono text-[#0d0d0d]"
                              >
                                <TechLogo
                                  logoKey={getLogoKey(t)}
                                  size={14}
                                />
                                <span>{t}</span>
                              </div>
                            ))}
                          </div>

                          {/* GitHub button (only if link exists) or Award chip */}
                          {project.github ? (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-pill-primary text-xs"
                            >
                              <span>View on GitHub</span>
                              <span className="font-mono">↗</span>
                            </a>
                          ) : project.award ? (
                            <span className="font-mono text-[11px] text-[#77756f] bg-[#f4f2ee] px-3 py-1 rounded-full border border-[rgba(13,13,13,0.06)]">
                              ★ {project.award}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    {/* Right: Illustrative Mini-UI in pure CSS/JSX (grayscale) */}
                    <div className="relative rounded-2xl bg-[#f4f2ee] border border-[rgba(13,13,13,0.08)] p-5 flex flex-col justify-between overflow-hidden shadow-inner [clip-path:inset(0_0_0_0_round_16px)]">
                      {/* Top Label */}
                      <div className="flex items-center justify-between pb-3 border-b border-[rgba(13,13,13,0.08)]">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#a9a6a0]" />
                          <div className="w-2.5 h-2.5 rounded-full bg-[#ccc]" />
                          <div className="w-2.5 h-2.5 rounded-full bg-[#e5e5e5]" />
                          <span className="ml-2 font-mono text-[10px] text-[#77756f]">
                            {project.id === "inventory-management-system"
                              ? "asset-registry-v1.local"
                              : "packet-tracer-v8.sim"}
                          </span>
                        </div>
                        <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-white border border-[rgba(13,13,13,0.1)] text-[#77756f]">
                          Illustrative UI
                        </span>
                      </div>

                      {/* Render Mock App based on project */}
                      {project.id === "inventory-management-system" ? (
                        <div className="my-auto space-y-4 py-3">
                          {/* KPI stats */}
                          <div className="grid grid-cols-3 gap-2">
                            <div className="bg-white p-3 rounded-xl border border-[rgba(13,13,13,0.06)]">
                              <span className="block font-mono text-[9px] text-[#77756f]">TOTAL ASSETS</span>
                              <span className="font-bold text-base text-[#0d0d0d]">1,420</span>
                            </div>
                            <div className="bg-white p-3 rounded-xl border border-[rgba(13,13,13,0.06)]">
                              <span className="block font-mono text-[9px] text-[#77756f]">CATEGORIES</span>
                              <span className="font-bold text-base text-[#0d0d0d]">18 Depts</span>
                            </div>
                            <div className="bg-white p-3 rounded-xl border border-[rgba(13,13,13,0.06)]">
                              <span className="block font-mono text-[9px] text-[#77756f]">ALERTS</span>
                              <span className="font-bold text-base text-[#0d0d0d]">03 Low</span>
                            </div>
                          </div>

                          {/* Data Table */}
                          <div className="bg-white rounded-xl border border-[rgba(13,13,13,0.06)] overflow-hidden text-[10px] font-mono">
                            <div className="grid grid-cols-4 bg-[#f9f9f8] p-2 font-semibold text-[#77756f] border-b border-[rgba(13,13,13,0.06)]">
                              <span>SKU</span>
                              <span>ITEM</span>
                              <span>QTY</span>
                              <span className="text-right">STATUS</span>
                            </div>
                            <div className="divide-y divide-[rgba(13,13,13,0.04)] text-[#3a3a3a]">
                              <div className="grid grid-cols-4 p-2 items-center">
                                <span>#SW-08</span>
                                <span>Cisco 2960 Switch</span>
                                <span>12</span>
                                <span className="text-right font-semibold text-[#0d0d0d]">Normal</span>
                              </div>
                              <div className="grid grid-cols-4 p-2 items-center bg-[#fafafa]">
                                <span>#CB-10</span>
                                <span>CAT6 Reel 100m</span>
                                <span>02</span>
                                <span className="text-right font-semibold text-[#77756f]">Re-order</span>
                              </div>
                              <div className="grid grid-cols-4 p-2 items-center">
                                <span>#RAM-16</span>
                                <span>DDR4 16GB Module</span>
                                <span>24</span>
                                <span className="text-right font-semibold text-[#0d0d0d]">Normal</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="my-auto space-y-4 py-3">
                          {/* Network Topology Nodes */}
                          <div className="bg-white p-4 rounded-xl border border-[rgba(13,13,13,0.06)]">
                            <div className="flex items-center justify-between mb-3 text-[10px] font-mono text-[#77756f]">
                              <span>CORE TOPOLOGY</span>
                              <span className="text-emerald-700 font-semibold">● RIPv2 Active</span>
                            </div>
                            <div className="flex items-center justify-around py-2">
                              <div className="text-center">
                                <div className="w-10 h-10 mx-auto rounded-lg bg-[#0d0d0d] text-white flex items-center justify-center font-mono text-xs">
                                  R1
                                </div>
                                <span className="font-mono text-[9px] text-[#77756f] mt-1 block">192.168.1.1</span>
                              </div>
                              <div className="h-[2px] flex-1 bg-[#ccc] relative mx-2">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8px] font-mono bg-white px-1 text-[#77756f]">
                                  Trunk
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="w-10 h-10 mx-auto rounded-lg bg-[#3a3a3a] text-white flex items-center justify-center font-mono text-xs">
                                  SW1
                                </div>
                                <span className="font-mono text-[9px] text-[#77756f] mt-1 block">VLAN 10/20</span>
                              </div>
                            </div>
                          </div>

                          {/* Packet Stream Log */}
                          <div className="bg-[#111] text-[#eee] p-3 rounded-xl font-mono text-[9px] space-y-1">
                            <div className="text-[#888] pb-1 border-b border-[#333]">WIRESHARK LIVE FLOW</div>
                            <div className="flex justify-between">
                              <span className="text-emerald-400">0.002s</span>
                              <span>TCP 192.168.1.15 -&gt; .1</span>
                              <span className="text-[#aaa]">[SYN, ACK]</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-emerald-400">0.005s</span>
                              <span>ICMP 192.168.1.20 -&gt; .1</span>
                              <span className="text-[#aaa]">[Echo Reply]</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Bottom Footer Note */}
                      <div className="pt-2 border-t border-[rgba(13,13,13,0.06)] flex justify-between items-center font-mono text-[9px] text-[#77756f]">
                        <span>System Architecture Preview</span>
                        <span>Responsive Grayscale Mock</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Vertical Accordion */}
        <div className="flex md:hidden flex-col gap-4">
          {PROJECTS.map((project) => {
            const isOpen = activeProjectId === project.id;

            return (
              <div
                key={project.id}
                className="bg-white rounded-3xl border border-[rgba(13,13,13,0.1)] p-6 transition-all duration-300"
              >
                <button
                  onClick={() => setActiveProjectId(isOpen ? "" : project.id)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[#77756f] bg-[#f4f2ee] px-2 py-0.5 rounded">
                      {project.index}
                    </span>
                    <h3 className="font-bold text-lg text-[#0d0d0d]">{project.title}</h3>
                  </div>
                  <span className="font-mono text-sm text-[#0d0d0d]">{isOpen ? "−" : "+"}</span>
                </button>

                {isOpen && (
                  <div className="mt-4 pt-4 border-t border-[rgba(13,13,13,0.06)] space-y-4">
                    <p className="text-xs text-[#3a3a3a] leading-relaxed">
                      {project.description}
                    </p>

                    <div className="space-y-1.5">
                      {project.features.map((feat, idx) => (
                        <div key={idx} className="text-xs text-[#555] flex items-start gap-2">
                          <span className="text-[#0d0d0d]">•</span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.tech.map((t, idx) => (
                        <span
                          key={idx}
                          className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#f4f2ee] text-[#0d0d0d]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {project.award && (
                      <div className="pt-2 font-mono text-[10px] text-[#77756f]">
                        ★ {project.award}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
