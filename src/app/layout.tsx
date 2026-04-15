/* Filename: src/app/layout.tsx */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Box from "@mui/material/Box";
import ThemeRegistry from "@/theme/ThemeRegistry";
import "./globals.css";

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
    "Ryan Phua", "Software Engineer", "Full Stack Developer",
    "Cloud Engineer", "DevOps Engineer", "UCLA Computer Science",
    "React Developer", "Next.js Developer", "AWS", "Docker",
    "Kubernetes", "New Grad SWE", "Los Angeles",
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
    images: [{ url: "/profile.jpg", width: 1200, height: 630, alt: "Ryan Phua — Software Engineer" }],
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
      index: true, follow: true,
      "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      style={{ scrollBehavior: "smooth" }}
      suppressHydrationWarning
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#030712" />
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
                "Full-Stack Development", "Cloud Infrastructure",
                "DevOps", "AWS", "Docker", "Kubernetes",
              ],
            }),
          }}
        />
      </head>
      <body>
        <ThemeRegistry>
          {/* Skip to main content — a11y */}
          <a href="#about" className="sr-only">
            Skip to main content
          </a>

          {/* Layered animated background */}
          <Box
            sx={{
              position: "fixed",
              inset: 0,
              zIndex: -1,
              height: "100%",
              width: "100%",
              overflow: "hidden",
            }}
          >
            <div className="animated-background" />
            <div className="animated-stars" />
          </Box>

          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}