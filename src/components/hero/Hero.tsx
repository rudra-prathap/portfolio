"use client";

import React, { useRef, useState, useEffect } from "react";
import { PROFILE } from "@/lib/data";
import { useSmoothScroll } from "@/lib/scroll";

export const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollTo } = useSmoothScroll();

  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isAudioUnlocked, setIsAudioUnlocked] = useState<boolean>(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // 1. Initial play attempt with audio
    video.muted = false;
    video
      .play()
      .then(() => {
        setIsPlaying(true);
        setIsMuted(false);
        setIsAudioUnlocked(true);
      })
      .catch(() => {
        // Autoplay with sound blocked: play muted as fallback
        video.muted = true;
        setIsMuted(true);
        video.play().then(() => setIsPlaying(true)).catch(() => {});
      });

    // 2. Unlock audio on first user interaction
    const unlockAudio = () => {
      if (video && video.muted) {
        video.muted = false;
        setIsMuted(false);
        setIsAudioUnlocked(true);
      }
      cleanupListeners();
    };

    const cleanupListeners = () => {
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
      window.removeEventListener("touchend", unlockAudio);
    };

    window.addEventListener("pointerdown", unlockAudio, { passive: true });
    window.addEventListener("keydown", unlockAudio, { passive: true });
    window.addEventListener("touchend", unlockAudio, { passive: true });

    return () => {
      cleanupListeners();
    };
  }, []);

  // 3. Pause video when less than 35% visible, resume when back
  useEffect(() => {
    const heroEl = heroRef.current;
    const video = videoRef.current;
    if (!heroEl || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio < 0.35) {
          if (!video.paused) {
            video.pause();
            setIsPlaying(false);
          }
        } else {
          if (video.paused) {
            video.play().then(() => setIsPlaying(true)).catch(() => {});
          }
        }
      },
      {
        threshold: [0, 0.35, 0.5, 1.0],
      }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.muted = false;
      setIsMuted(false);
      setIsAudioUnlocked(true);
      if (video.paused) {
        video.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[100svh] w-full flex flex-col justify-between items-center overflow-hidden pt-28 pb-12 select-none"
      style={{ backgroundColor: "var(--paper)" }}
    >
      {/* Ghost Background Name */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-black uppercase tracking-tighter opacity-70 select-none whitespace-nowrap text-center"
          style={{
            fontSize: "clamp(90px, 22vw, 320px)",
            WebkitTextStroke: "1.5px rgba(13, 13, 13, 0.15)",
            color: "transparent",
            lineHeight: 0.85,
            letterSpacing: "-0.04em",
          }}
        >
          {PROFILE.firstName}
        </span>
      </div>

      {/* Top Tagline */}
      <div className="relative z-10 w-full site-container flex justify-between items-center text-xs font-mono text-[#77756f]">
        <span>00 — Introduction</span>
        <span className="hidden sm:inline-block">Location · {PROFILE.location}</span>
      </div>

      {/* Center Video Frame */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto w-full">
        <div
          className="relative max-w-full overflow-hidden"
          style={{
            height: "min(62svh, 600px)",
            aspectRatio: "768 / 960",
          }}
        >
          <video
            ref={videoRef}
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-contain pointer-events-none"
            style={{
              mixBlendMode: "multiply",
            }}
          >
            <source src="/hero/hero.webm" type="video/webm" />
            <source src="/hero/hero.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Floating Sound Control Button */}
      <div className="absolute right-6 sm:right-12 bottom-36 sm:bottom-40 z-20">
        <div className="relative flex items-center justify-center">
          {/* Soft ping ring when audio is muted / blocked */}
          {isMuted && (
            <span
              className="absolute inset-0 rounded-full animate-ping opacity-35 bg-[#0d0d0d] pointer-events-none"
              style={{ animationDuration: "2s" }}
              aria-hidden="true"
            />
          )}
          <button
            onClick={toggleSound}
            className="relative w-[46px] h-[46px] rounded-full bg-[#0d0d0d] text-white flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-105 active:scale-95"
            aria-label={isMuted ? "Unmute introduction video voice" : "Mute introduction video voice"}
          >
            {isMuted ? (
              // Triangle Play icon
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="ml-0.5"
                aria-hidden="true"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            ) : (
              // Two Bars Pause icon
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Bottom Content: Role Heading & CTAs */}
      <div className="relative z-10 w-full site-container flex flex-col md:flex-row items-center justify-between gap-6 pt-4">
        {/* Main Role Heading */}
        <div className="text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0d0d0d] leading-none">
            Full Stack <span className="font-serif-accent font-normal italic text-[#77756f]">Developer.</span>
          </h1>
          <p className="mt-2 text-xs font-mono text-[#77756f]">
            {PROFILE.subRole} · Network Engineering & Web Systems
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => scrollTo("#work")}
            className="btn-pill-primary"
          >
            Explore work
          </button>

          <button
            onClick={() => scrollTo("#contact")}
            className="btn-pill-secondary"
          >
            Let&apos;s talk
          </button>

          <a
            href={PROFILE.resumePath}
            download="Panjam_Rudra_Prathap_Resume.pdf"
            className="btn-pill-secondary"
            aria-label="Download Panjam Rudra Prathap's Résumé as PDF"
          >
            <span>Résumé</span>
            <span className="font-mono text-xs">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
};
