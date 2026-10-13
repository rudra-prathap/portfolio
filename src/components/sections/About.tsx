"use client";

import React, { useState, useRef, useEffect } from "react";
import { PROFILE } from "@/lib/data";

export const About: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [swingAngle, setSwingAngle] = useState<number>(0);
  const swingRef = useRef<{ angle: number; velocity: number; target: number }>({
    angle: 0,
    velocity: 0,
    target: 0,
  });

  // Pendulum swing simulation with spring damping + idle sway
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      const idle = Math.sin(currentTime * 0.0018) * 1.5;
      const target = swingRef.current.target + idle;

      // Spring physics: force = -k * (x - target) - d * velocity
      const k = 28;
      const d = 5;
      const force = -k * (swingRef.current.angle - target) - d * swingRef.current.velocity;

      swingRef.current.velocity += force * dt;
      swingRef.current.angle += swingRef.current.velocity * dt;

      setSwingAngle(swingRef.current.angle);

      // Damp down pointer deflection gradually
      swingRef.current.target *= 0.94;

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handlePointerMove = (e: React.PointerEvent) => {
    // Deflect pendulum based on pointer movement velocity
    const deltaX = e.movementX;
    if (Math.abs(deltaX) > 0.5) {
      swingRef.current.target = Math.max(Math.min(deltaX * 0.45, 12), -12);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsFlipped((prev) => !prev);
    }
  };

  return (
    <section id="about" className="section-pad w-full border-t border-[rgba(13,13,13,0.06)]">
      <div className="site-container">
        {/* Section Index & Kicker */}
        <div className="flex items-center gap-3 font-mono text-xs text-[#77756f] mb-8">
          <span>01 — About</span>
          <span>·</span>
          <span>Profile & Background</span>
        </div>

        {/* Three Column Grid: minmax(0,1fr) 320px minmax(0,1fr) */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px_minmax(0,1fr)] gap-8 items-stretch">
          {/* Left Column: Bio & Verbatim Summary */}
          <div className="flex flex-col justify-between bg-white rounded-3xl p-8 sm:p-10 border border-[rgba(13,13,13,0.08)] shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),0_4px_24px_rgba(13,13,13,0.03)]">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0d0d0d] leading-none mb-6">
                Hi, I&apos;m{" "}
                <span className="font-serif-accent font-normal italic text-[#77756f]">
                  {PROFILE.firstName}.
                </span>
              </h2>

              <p className="text-base text-[#3a3a3a] leading-relaxed mb-4">
                {PROFILE.resumeSummary}
              </p>

              <p className="text-sm text-[#77756f] leading-relaxed font-mono">
                {PROFILE.shortLine}
              </p>
            </div>

            {/* Action Buttons: Only links present in resume */}
            <div className="flex flex-wrap items-center gap-3 pt-8 border-t border-[rgba(13,13,13,0.06)] mt-8">
              <a
                href={PROFILE.resumePath}
                download="Panjam_Rudra_Prathap_Resume.pdf"
                className="btn-pill-primary text-xs"
              >
                <span>Résumé</span>
                <span className="font-mono">↓</span>
              </a>

              {PROFILE.linkedin && (
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill-secondary text-xs"
                >
                  <span>LinkedIn</span>
                  <span className="font-mono">↗</span>
                </a>
              )}
            </div>
          </div>

          {/* Centre Column: Hanging Lanyard ID Card */}
          <div
            className="flex flex-col items-center justify-start min-h-[480px] select-none"
            onPointerMove={handlePointerMove}
          >
            {/* Lanyard Top Attachment & Strap */}
            <div className="flex flex-col items-center z-10">
              {/* Ceiling Anchor Point */}
              <div className="w-12 h-3 bg-[#0d0d0d] rounded-t-sm shadow-sm" />

              {/* Strap: 30x56 px with scrolling text */}
              <div className="w-[30px] h-[56px] bg-[#1a1a1a] relative overflow-hidden border-x border-[#333] shadow-inner flex justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:4px_4px] opacity-40 pointer-events-none" />
                <div
                  className="font-mono text-[8px] text-[#a9a6a0] tracking-widest uppercase rotate-90 whitespace-nowrap self-center animate-[strapScroll_8s_linear_infinite]"
                  style={{ transformOrigin: "center" }}
                >
                  PANJAM RUDRA PRATHAP · DEV ID ·
                </div>
              </div>

              {/* Metallic Lobster Clip */}
              <div className="flex flex-col items-center -mt-1 z-20">
                <div className="w-3.5 h-3.5 rounded-full border-2 border-[#888] bg-[#ccc] shadow-sm" />
                <div className="w-2.5 h-5 bg-gradient-to-b from-[#bbb] via-[#eee] to-[#888] rounded-sm -mt-1 shadow-sm" />
                <div className="w-6 h-1.5 bg-[#444] rounded-full -mt-0.5" />
              </div>
            </div>

            {/* Pendulum Swing Wrapper */}
            <div
              className="relative w-[300px] h-[404px] -mt-2 transition-transform duration-75 ease-out"
              style={{
                transformOrigin: "top center",
                transform: `rotate(${swingAngle}deg)`,
              }}
            >
              {/* Card Container with 3D Flip */}
              <div
                tabIndex={0}
                role="button"
                aria-label="Developer ID Card. Press Enter to flip."
                onMouseEnter={() => setIsFlipped(true)}
                onMouseLeave={() => setIsFlipped(false)}
                onClick={() => setIsFlipped((prev) => !prev)}
                onKeyDown={handleKeyDown}
                className="w-full h-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0d0d0d] rounded-[24px]"
                style={{
                  perspective: "1200px",
                }}
              >
                <div
                  className="relative w-full h-full rounded-[24px] shadow-[0_20px_45px_rgba(13,13,13,0.14)] transition-transform duration-700 ease-[var(--ease)]"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  {/* FRONT FACE */}
                  <div
                    className="absolute inset-0 w-full h-full bg-white rounded-[24px] overflow-hidden border border-[rgba(13,13,13,0.12)] p-5 flex flex-col justify-between"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    {/* Top Band */}
                    <div className="w-full bg-[#0d0d0d] text-white py-1.5 px-3 rounded-xl flex items-center justify-between text-[10px] font-mono tracking-widest uppercase">
                      <span>DEVELOPER ID</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    </div>

                    {/* Portrait in 128x156 Frame with gray gradient ring */}
                    <div className="flex flex-col items-center my-auto">
                      <div className="relative group w-[128px] h-[156px] rounded-2xl p-[3px] bg-gradient-to-b from-[#888] via-[#e5e5e5] to-[#bbb] shadow-md">
                        <div className="w-full h-full rounded-[13px] overflow-hidden bg-white relative">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src="/portrait-bust.webp"
                            alt="Panjam Rudra Prathap"
                            className="w-full h-full object-cover transition-transform duration-500 ease-[var(--ease)] group-hover:scale-105"
                          />
                        </div>
                      </div>

                      <h3 className="font-bold text-base text-[#0d0d0d] mt-3 tracking-tight text-center">
                        {PROFILE.name}
                      </h3>
                      <p className="text-xs font-mono text-[#77756f] text-center">
                        {PROFILE.subRole}
                      </p>
                    </div>

                    {/* Metadata Rows */}
                    <div className="space-y-1 py-2 border-y border-[rgba(13,13,13,0.06)] font-mono text-[10px]">
                      <div className="flex justify-between text-[#77756f]">
                        <span>ID No.</span>
                        <span className="text-[#0d0d0d] font-semibold">{PROFILE.idNumber}</span>
                      </div>
                      <div className="flex justify-between text-[#77756f]">
                        <span>Dept.</span>
                        <span className="text-[#0d0d0d]">CSE</span>
                      </div>
                      <div className="flex justify-between text-[#77756f]">
                        <span>Valid till</span>
                        <span className="text-[#0d0d0d] font-semibold">{PROFILE.validTill}</span>
                      </div>
                    </div>

                    {/* Bottom: Barcode & Holo Sticker */}
                    <div className="flex items-center justify-between pt-1">
                      {/* Barcode in grays */}
                      <div className="flex items-center gap-[2px] h-6" aria-hidden="true">
                        {[3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7].map((w, i) => (
                          <div
                            key={i}
                            className="h-full bg-[#3a3a3a]"
                            style={{ width: `${w % 3 + 1}px` }}
                          />
                        ))}
                      </div>

                      {/* Holographic sticker in grays */}
                      <div
                        className="w-8 h-8 rounded-full border border-[rgba(255,255,255,0.8)] shadow-inner flex items-center justify-center font-mono text-[8px] font-bold text-[#555] bg-gradient-to-tr from-[#ddd] via-[#fff] to-[#bbb]"
                        aria-hidden="true"
                      >
                        PRP
                      </div>
                    </div>
                  </div>

                  {/* BACK FACE */}
                  <div
                    className="absolute inset-0 w-full h-full bg-[#111] text-white rounded-[24px] overflow-hidden border border-[#222] p-6 flex flex-col justify-between"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <div>
                      <div className="flex items-center justify-between border-b border-[#333] pb-3 mb-4">
                        <span className="font-mono text-[10px] tracking-wider text-[#a9a6a0] uppercase">
                          WHAT I AM
                        </span>
                        <span className="font-mono text-[9px] text-[#777]">OFFICIAL RECORD</span>
                      </div>

                      <ul className="space-y-3 text-xs leading-snug text-[#ddd]">
                        <li className="flex items-start gap-2">
                          <span className="text-[#777] font-mono">01</span>
                          <span>Full Stack Developer & Computer Science Engineer</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#777] font-mono">02</span>
                          <span>B.Tech CSE (Current CGPA: 8.24 / 10)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#777] font-mono">03</span>
                          <span>Diploma in Computer Engineering (86.06%)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#777] font-mono">04</span>
                          <span>Network Engineer Intern (Cisco Packet Tracer)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#777] font-mono">05</span>
                          <span>Best Final Year Project Award (Inventory System)</span>
                        </li>
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-[#262626]">
                      <div className="font-serif-accent italic text-base text-[#ccc] mb-2">
                        Panjam Rudra Prathap
                      </div>
                      <p className="font-mono text-[9px] text-[#888]">
                        If found, say hello · {PROFILE.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Facts & Quote */}
          <div className="flex flex-col justify-between bg-white rounded-3xl p-8 sm:p-10 border border-[rgba(13,13,13,0.08)] shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),0_4px_24px_rgba(13,13,13,0.03)]">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-[#77756f] mb-6">
                Quick facts
              </h3>

              <div className="space-y-4 font-mono text-xs divide-y divide-[rgba(13,13,13,0.06)]">
                <div className="pt-2">
                  <span className="text-[#77756f] block mb-1">Location</span>
                  <span className="text-[#0d0d0d] font-semibold">{PROFILE.location}</span>
                </div>

                <div className="pt-3">
                  <span className="text-[#77756f] block mb-1">Education</span>
                  <span className="text-[#0d0d0d] font-medium leading-relaxed">
                    Madanapalle Institute of Technology & Science
                  </span>
                </div>

                <div className="pt-3">
                  <span className="text-[#77756f] block mb-1">Degree & Batch</span>
                  <span className="text-[#0d0d0d] font-medium">B.Tech CSE · 2025–2028 (Expected)</span>
                </div>

                <div className="pt-3">
                  <span className="text-[#77756f] block mb-1">Direct Contact</span>
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="text-[#0d0d0d] font-medium underline underline-offset-2 hover:text-[#3a3a3a]"
                  >
                    {PROFILE.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[rgba(13,13,13,0.06)]">
              <blockquote className="font-serif-accent italic text-base text-[#3a3a3a] leading-relaxed">
                &ldquo;{PROFILE.quote}&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
