/* Filename: src/app/layout.tsx */

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
/**
 * Metadata Configuration
 * 
 * SEO-optimized metadata for better discoverability and social sharing.
 * UPDATED: Changed title from "Cloud & DevOps Engineer" to "Software Engineer"
 * to align with new grad SWE role targeting.
 */
export const metadata: Metadata = {
  // Basic metadata - CRITICAL FIX: Updated title
  title: "Ryan Phua | Software Engineer",
  description: "Software Engineer with expertise in full-stack development and cloud infrastructure. Experienced in React, Next.js, Django, AWS, Docker, and Kubernetes. UCLA Computer Science graduate seeking new grad SWE opportunities.",
  
  // Keywords for SEO
  keywords: [
    "Ryan Phua",
    "Software Engineer",
    "Full Stack Developer",
    "UCLA Computer Science",
    "React Developer",
    "Next.js Developer",
    "Cloud Engineer",
    "AWS",
    "Docker",
    "Kubernetes",
    "New Grad SWE",
    "Los Angeles",
  ],
  
  // Author information
  authors: [{ name: "Ryan Phua" }],
  
  // Open Graph metadata for social sharing (LinkedIn, Facebook, etc.)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ryean0.github.io",
    title: "Ryan Phua | Software Engineer",
    description: "Software Engineer specializing in full-stack development and cloud infrastructure. Building scalable web applications with React, Next.js, and AWS.",
    siteName: "Ryan Phua Portfolio",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Ryan Phua - Software Engineer",
      },
    ],
  },
  
  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "Ryan Phua | Software Engineer",
    description: "Software Engineer specializing in full-stack development and cloud infrastructure.",
    images: ["/profile.jpg"],
  },
  
  // Robots meta tag for search engine crawling
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
        {/* Additional meta tags for better browser support */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0a0e1a" />
      </head>
      <body 
        className={cn(
          "bg-slate-950 text-gray-100 font-sans antialiased", // Changed background to a darker slate
          GeistSans.variable, 
          GeistMono.variable
        )}
      >
        {/* Skip to main content link for keyboard navigation accessibility */}
        <a
          href="#about"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Skip to main content
        </a>
        
        {/* Animated background */}
        <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden">
            <div className="animated-background"></div>
            <div className="animated-stars"></div>
        </div>
        
        {children}
      </body>
    </html>
  );
}