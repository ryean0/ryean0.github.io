// Filename: src/app/layout.tsx
// This version correctly uses the Geist font variables with the gradient background.

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ryan Phua | Cloud & DevOps Engineer",
  description: "Personal portfolio of Ryan Phua, showcasing projects and experience in cloud computing, DevOps, and software engineering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body 
        className={`${geistSans.variable} ${geistMono.variable} bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 to-gray-900 text-gray-100 font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
