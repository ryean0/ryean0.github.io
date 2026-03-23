/* Filename: src/app/layout.tsx */

/**
 * Root Layout — Visual Foundation Overhaul
 *
 * Changes:
 * 1. Refined metadata with comprehensive Open Graph + Twitter Cards
 * 2. Deeper background base (gray-950 → #030712) for richer contrast
 * 3. Layered animated background with mesh gradient + starfield
 * 4. Improved accessibility: skip-to-content, viewport, theme-color
 * 5. Structured JSON-LD for Google rich results
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const GeistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const GeistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ryan Phua | Software Engineer",
  description:
    "Software Engineer with expertise in full-stack development and cloud infrastructure. Experienced in React, Next.js, Django, AWS, Docker, and Kubernetes. UCLA Computer Science graduate seeking new grad SWE opportunities.",

  keywords: [
    "Ryan Phua",
    "Software Engineer",
    "Full Stack Developer",
    "Cloud Engineer",
    "DevOps Engineer",
    "UCLA Computer Science",
    "React Developer",
    "Next.js Developer",
    "AWS",
    "Docker",
    "Kubernetes",
    "New Grad SWE",
    "Los Angeles",
  ],

  authors: [{ name: "Ryan Phua" }],

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ryean0.github.io",
    title: "Ryan Phua | Software Engineer",
    description:
      "Software Engineer specializing in full-stack development and cloud infrastructure. Building scalable web applications with React, Next.js, and AWS.",
    siteName: "Ryan Phua Portfolio",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Ryan Phua — Software Engineer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Ryan Phua | Software Engineer",
    description:
      "Software Engineer specializing in full-stack development and cloud infrastructure.",
    images: ["/profile.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#030712" />
        {/* Structured data for Google rich results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Ryan Phua",
              url: "https://ryean0.github.io",
              jobTitle: "Software Engineer",
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "University of California, Los Angeles",
              },
              knowsAbout: [
                "Full-Stack Development",
                "Cloud Infrastructure",
                "DevOps",
                "AWS",
                "Docker",
                "Kubernetes",
              ],
            }),
          }}
        />
      </head>
      <body
        className={cn(
          "bg-[#030712] text-slate-100 font-sans antialiased",
          GeistSans.variable,
          GeistMono.variable
        )}
      >
        {/* Skip to main content — a11y */}
        <a
          href="#about"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-sky-600 focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
        >
          Skip to main content
        </a>

        {/* Layered animated background */}
        <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden">
          <div className="animated-background" />
          <div className="animated-stars" />
        </div>

        {children}
      </body>
    </html>
  );
}