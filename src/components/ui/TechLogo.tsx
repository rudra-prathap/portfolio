import React from "react";

export const BRAND_MAP: Record<string, { name: string; src: string; color: string }> = {
  java: { name: "Java", src: "/logos/java.svg", color: "#ED8B00" },
  javascript: { name: "JavaScript", src: "/logos/javascript.svg", color: "#F7DF1E" },
  html5: { name: "HTML5", src: "/logos/html5.svg", color: "#E34F26" },
  css3: { name: "CSS3", src: "/logos/css3.svg", color: "#1572B6" },
  mysql: { name: "SQL / MySQL", src: "/logos/mysql.svg", color: "#00618A" },
  cisco: { name: "Cisco Packet Tracer", src: "/logos/cisco.svg", color: "#1BA0D7" },
  wireshark: { name: "Wireshark", src: "/logos/wireshark.svg", color: "#1679A7" },
  linkedin: { name: "LinkedIn", src: "/logos/linkedin.svg", color: "#0A66C2" },
  nextjs: { name: "Next.js", src: "/logos/nextjs.svg", color: "#000000" },
  react: { name: "React", src: "/logos/react.svg", color: "#61DAFB" },
};

export const CONCEPT_MAP: Record<string, { name: string; renderIcon: () => React.ReactNode }> = {
  responsive: {
    name: "Responsive Web Design",
    renderIcon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  webdev: {
    name: "Website Development",
    renderIcon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <circle cx="6" cy="6.5" r="1" fill="currentColor" />
        <circle cx="9" cy="6.5" r="1" fill="currentColor" />
        <polyline points="9 13 7 15 9 17" />
        <polyline points="15 13 17 15 15 17" />
        <line x1="13" y1="13" x2="11" y2="17" />
      </svg>
    ),
  },
  network: {
    name: "TCP/IP Protocol Stack",
    renderIcon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <rect x="4" y="3" width="16" height="4" rx="1" />
        <rect x="4" y="9" width="16" height="4" rx="1" />
        <rect x="4" y="15" width="16" height="4" rx="1" />
        <line x1="12" y1="7" x2="12" y2="9" />
        <line x1="12" y1="13" x2="12" y2="15" />
        <circle cx="12" cy="21" r="1" fill="currentColor" />
      </svg>
    ),
  },
  subnetting: {
    name: "Subnetting & Addressing",
    renderIcon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <rect x="3" y="3" width="8" height="8" rx="1" />
        <rect x="13" y="3" width="8" height="8" rx="1" />
        <rect x="3" y="13" width="8" height="8" rx="1" />
        <rect x="13" y="13" width="8" height="8" rx="1" />
        <path d="M7 11v2m10-2v2M11 7h2m-2 10h2" strokeDasharray="1 1" />
      </svg>
    ),
  },
  routing: {
    name: "Routing & Switching",
    renderIcon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <circle cx="12" cy="12" r="9" />
        <path d="M8 12h8m-4-4l4 4-4 4" />
        <path d="M12 4v4m0 8v4" />
      </svg>
    ),
  },
  lanwan: {
    name: "LAN/WAN Architecture",
    renderIcon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        <circle cx="7" cy="16" r="1" fill="currentColor" />
        <circle cx="12" cy="16" r="1" fill="currentColor" />
        <circle cx="17" cy="16" r="1" fill="currentColor" />
      </svg>
    ),
  },
  troubleshoot: {
    name: "Network Diagnostics",
    renderIcon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  dbms: {
    name: "Database Management Systems",
    renderIcon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  security: {
    name: "Network Security & ACLs",
    renderIcon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <circle cx="12" cy="10" r="1.5" />
        <line x1="12" y1="11.5" x2="12" y2="15" />
      </svg>
    ),
  },
};

export function isBrand(key: string): boolean {
  return key in BRAND_MAP;
}

interface TechLogoProps {
  logoKey: string;
  size?: number;
  className?: string;
  glow?: boolean;
}

export const TechLogo: React.FC<TechLogoProps> = ({
  logoKey,
  size = 48,
  className = "",
  glow = false,
}) => {
  const brand = BRAND_MAP[logoKey];

  if (brand) {
    return (
      <div
        className={`relative flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
      >
        {glow && (
          <div
            className="absolute inset-0 rounded-full blur-xl opacity-20 pointer-events-none transition-opacity duration-300"
            style={{ backgroundColor: brand.color }}
          />
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={brand.src}
          alt={brand.name}
          width={size}
          height={size}
          className="object-contain max-w-full max-h-full drop-shadow-sm select-none"
          loading="lazy"
        />
      </div>
    );
  }

  const concept = CONCEPT_MAP[logoKey];
  if (concept) {
    return (
      <div
        className={`flex items-center justify-center text-[#0d0d0d] ${className}`}
        style={{ width: size, height: size }}
        aria-label={concept.name}
      >
        {concept.renderIcon()}
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center font-mono text-xs border border-[rgba(13,13,13,0.15)] rounded bg-white text-[#77756f] ${className}`}
      style={{ width: size, height: size }}
    >
      {logoKey.slice(0, 2).toUpperCase()}
    </div>
  );
};
