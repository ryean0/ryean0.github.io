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
    <html lang="en" className="!scroll-smooth" suppressHydrationWarning>
      <body 
        className={cn(
          "bg-slate-950 text-gray-100 font-sans antialiased", // Changed background to a darker slate
          GeistSans.variable, 
          GeistMono.variable
        )}
      >
        {/* --- MODIFIED: Applying the new animated background --- */}
        <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden">
            <div className="animated-background"></div>
            <div className="animated-stars"></div>
        </div>
        
        {children}
      </body>
    </html>
  );
}