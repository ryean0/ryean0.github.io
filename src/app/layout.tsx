/* Filename: src/app/layout.tsx */

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ThemeRegistry from "@/theme/ThemeRegistry";
import "./globals.css";

const GeistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});
const GeistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#030712",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ryean0.github.io"),
  title: "Ryan Phua | Software Engineer",
  description:
    "Software Engineer with expertise in full-stack development and cloud infrastructure. Experienced in React, Next.js, Django, AWS, Docker, and Kubernetes. UCLA Computer Science graduate seeking new-grad SWE opportunities.",
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
      "Software Engineer specializing in full-stack development and cloud infrastructure.",
    siteName: "Ryan Phua Portfolio",
    images: [
      {
        url: "/assets/media/profile/dark-blue-bg.png",
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
    images: ["/assets/media/profile/dark-blue-bg.png"],
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
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
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
      <body>
        <ThemeRegistry>
          {/* Skip-to-content link (visible only on keyboard focus) */}
          <a href="#about" className="sr-only sr-only-focusable">
            Skip to main content
          </a>

          {/* Layered animated background (fixed, behind all content) */}
          <div
            aria-hidden="true"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: -1,
              height: "100%",
              width: "100%",
              overflow: "hidden",
              pointerEvents: "none",
            }}
          >
            <div className="animated-background" />
            <div className="animated-stars" />
          </div>

          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
