/* Filename: src/app/layout.tsx */
/* Enhanced Layout with Improved Background System */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

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

export const metadata: Metadata = {
  title: "Ryan Phua | Software Engineer",
  description: "UCLA Computer Science graduate specializing in full-stack development, distributed systems, and cloud technologies. Explore my projects and experience.",
  keywords: ["Software Engineer", "Full Stack Developer", "UCLA", "Computer Science", "React", "Node.js", "TypeScript"],
  authors: [{ name: "Ryan Phua" }],
  openGraph: {
    title: "Ryan Phua | Software Engineer",
    description: "UCLA Computer Science graduate specializing in full-stack development and distributed systems",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ryan Phua | Software Engineer",
    description: "UCLA Computer Science graduate specializing in full-stack development",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#0a0f1e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth" suppressHydrationWarning>
      <body 
        className={cn(
          "bg-deep-space text-text-primary font-sans antialiased",
          GeistSans.variable, 
          GeistMono.variable
        )}
      >
        {/* Enhanced Animated Background System */}
        <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden">
          {/* Base gradient background */}
          <div className="animated-background" />
          
          {/* Animated starfield */}
          <div className="animated-stars" />
          
          {/* Gradient mesh overlay for depth */}
          <div 
            className="absolute inset-0 bg-gradient-mesh opacity-40"
            style={{ mixBlendMode: 'screen' }}
          />
          
          {/* Vignette effect for focus */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at center, transparent 0%, rgba(10, 15, 30, 0.4) 100%)'
            }}
          />
        </div>
        
        {/* Main content */}
        <div className="relative z-0">
          {children}
        </div>
        
        {/* Accessibility: Skip to main content link */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent-cyan focus:text-deep-space focus:rounded-lg"
        >
          Skip to main content
        </a>
      </body>
    </html>
  );
}