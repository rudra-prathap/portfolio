import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const interTight = localFont({
  src: "../fonts/InterTight-VariableFont_wght.woff2",
  variable: "--font-inter-tight",
  display: "swap",
});

const instrumentSerif = localFont({
  src: [
    {
      path: "../fonts/InstrumentSerif-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/InstrumentSerif-Italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-instrument-serif",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: "../fonts/JetBrainsMono-VariableFont_wght.woff2",
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rudraprathap.dev"),
  title: "Rudra | Portfolio",
  description:
    "Personal portfolio of Panjam Rudra Prathap — Computer Science Engineer, Full Stack Developer, and Network Engineer.",
  keywords: [
    "Panjam Rudra Prathap",
    "Full Stack Developer",
    "Computer Science Engineer",
    "Network Engineer",
    "Portfolio",
    "Madanapalle",
  ],
  authors: [{ name: "Panjam Rudra Prathap" }],
  openGraph: {
    title: "Rudra | Portfolio",
    description:
      "Computer Science Engineering student with hands-on experience in network engineering, web development, and database management.",
    url: "https://rudraprathap.dev",
    siteName: "Rudra Prathap Portfolio",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Rudra | Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: " ",
  },
};

export const viewport: Viewport = {
  themeColor: "#f4f2ee",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased selection:bg-[#0d0d0d] selection:text-[#f4f2ee]">
        {children}
      </body>
    </html>
  );
}
