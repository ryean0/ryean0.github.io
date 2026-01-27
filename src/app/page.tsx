/* Filename: src/app/page.tsx */

/**
 * Main Portfolio Page Component
 * 
 * This is a Server Component that orchestrates the entire portfolio page.
 * It fetches data at build time and passes it to client components as needed.
 * 
 * Structure (UPDATED):
 * 1. Hero/About Section - Introduction with profile photo
 * 2. Education Section - Academic credentials (NEW - CRITICAL for new grads)
 * 3. Skills Section - Technical skills organized by category
 * 4. Experience Section - Work experience with detailed modals
 * 5. Projects Section - Featured projects with live demos
 * 6. Footer - Credits and back-to-top link
 * 
 * CRITICAL CHANGE: Added Education section between About and Skills
 * This is essential for new grad applications as recruiters need to see:
 * - Graduation date (when you're available)
 * - Degree and school (academic credentials)
 * - GPA (if 3.5+, screening criterion)
 * - Relevant coursework (technical foundation)
 */

import Image from "next/image";
import { Mail, Linkedin, Github, FileText, MapPin, GraduationCap } from "lucide-react";

import Header from "@/app/components/Header";
import FadeIn from "@/app/components/FadeIn";
import Education from "@/app/components/Education"; // NEW COMPONENT
import SkillsEnhanced from "@/app/components/SkillsEnhanced";
// Import the Client boundary components
import ProjectSectionClient from "@/app/components/ProjectSectionClient";
import ExperienceSectionClient from "./components/ExperienceSectionClient";
// Import the data loaders and static config
import { getExperiences, getProjects } from "@/lib/dataLoader";
import { siteConfig } from "@/data/siteConfig";

export default function PortfolioPage() {
  // Fetch data at build time using Server Components
  const experienceData = getExperiences();
  const projectsData = getProjects();

  return (
    <>
      <Header />
      <main className="container mx-auto max-w-4xl px-6">
        
        {/* ========================================
            HERO / ABOUT SECTION
            ======================================== */}
        <section id="about" className="min-h-screen flex items-center py-20">
          <FadeIn duration={1} delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
              
              {/* Left column - Text content */}
              <div className="md:col-span-2">
                {/* Greeting */}
                <p className="text-lg text-gray-400 mb-2">Hi, I'm</p>
                
                {/* Name with animated gradient */}
                <h1 className="text-5xl md:text-7xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 animate-gradient pb-2">
                  {siteConfig.name}
                </h1>
                
                {/* Title - UPDATED to Software Engineer */}
                <p className="text-2xl md:text-3xl font-semibold text-gray-100 mb-2">
                  {siteConfig.title}
                </p>
                
                {/* Subtitle */}
                {siteConfig.subtitle && (
                  <p className="text-lg text-gray-400 mb-6">
                    {siteConfig.subtitle}
                  </p>
                )}
                
                {/* About description - REWRITTEN for SWE positioning */}
                <div className="mt-6">
                  <p className="text-base md:text-lg text-gray-300 max-w-xl leading-relaxed">
                    {siteConfig.about}
                  </p>
                </div>
                
                {/* Location and Education badges - PROMINENT DISPLAY */}
                <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-400">
                  {/* Location badge */}
                  <span className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 border border-slate-700 rounded-full hover:border-slate-600 transition-colors duration-300">
                    <MapPin className="h-4 w-4 text-blue-400" />
                    <span className="font-medium">{siteConfig.location}</span>
                  </span>
                  
                  {/* Education badge - Quick reference */}
                  <span className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 border border-slate-700 rounded-full hover:border-slate-600 transition-colors duration-300">
                    <GraduationCap className="h-4 w-4 text-blue-400" />
                    <span className="font-medium">
                      UCLA CS '{siteConfig.education.graduationDate.split(' ')[1].slice(-2)}
                    </span>
                  </span>
                  
                  {/* Availability badge - if applicable */}
                  {siteConfig.availableForWork && (
                    <span className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      <span className="font-medium text-green-400">Open to Opportunities</span>
                    </span>
                  )}
                </div>
                
                {/* CTA buttons and social links */}
                <div className="mt-8 flex flex-wrap items-center gap-6">
                  {/* Primary CTA - Resume */}
                  {siteConfig.resumeUrl && (
                    <a
                      href={siteConfig.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5"
                      aria-label="Download Resume"
                    >
                      <FileText className="h-5 w-5" />
                      View Resume
                    </a>
                  )}
                  
                  {/* Social links */}
                  <div className="flex items-center gap-4">
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="p-3 text-gray-400 hover:text-blue-400 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 hover:border-blue-500/50 rounded-xl transition-all duration-300"
                      aria-label="Email"
                      title={siteConfig.contact.email}
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                    <a
                      href={siteConfig.contact.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 text-gray-400 hover:text-blue-400 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 hover:border-blue-500/50 rounded-xl transition-all duration-300"
                      aria-label="LinkedIn"
                      title="LinkedIn Profile"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a
                      href={siteConfig.contact.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 text-gray-400 hover:text-blue-400 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 hover:border-blue-500/50 rounded-xl transition-all duration-300"
                      aria-label="GitHub"
                      title="GitHub Profile"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Right column - Profile photo */}
              <div className="flex justify-center md:justify-end">
                <div className="relative w-48 h-48 md:w-64 md:h-64">
                  {/* Glow effect behind photo */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-2xl opacity-20 animate-pulse" />
                  
                  {/* Profile image */}
                  <Image
                    src="/profile.jpg"
                    alt="Ryan Phua - Software Engineer"
                    fill
                    className="rounded-full object-cover relative z-10 border-4 border-slate-800"
                    priority
                  />
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* ========================================
            EDUCATION SECTION - NEW & CRITICAL
            
            This section is ESSENTIAL for new grad applications.
            Recruiters need to see:
            1. Graduation date (when you're available)
            2. Degree and school (academic credentials)
            3. GPA (if 3.5+, common screening criterion)
            4. Relevant coursework (technical foundation)
            
            Positioned prominently between About and Skills
            to ensure recruiters see it early in their review.
            ======================================== */}
        <section id="education" className="py-20">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-100">
              Education
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Education />
          </FadeIn>
        </section>

        {/* ========================================
            SKILLS SECTION - ENHANCED
            Now with categories and proficiency levels
            ======================================== */}
        <section id="skills" className="py-20">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-100">
              Technical Skills
            </h2>
          </FadeIn>
          <SkillsEnhanced />
        </section>

        {/* ========================================
            EXPERIENCE SECTION
            Work experience with detailed modals
            ======================================== */}
        <ExperienceSectionClient experiences={experienceData} />

        {/* ========================================
            PROJECTS SECTION
            Featured projects with live demos
            ======================================== */}
        <ProjectSectionClient projects={projectsData} />

        {/* ========================================
            FOOTER
            ======================================== */}
        <footer className="text-center mt-20 py-8 border-t border-slate-800">
          <p className="text-gray-500 text-sm mb-4">
            Built with Next.js & Tailwind CSS. Deployed on GitHub Pages.
          </p>
          <p className="text-gray-600 text-xs">
            © 2025 {siteConfig.name}. All rights reserved.
          </p>
          
          {/* Back to top button */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="mt-4 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-300"
            aria-label="Back to top"
          >
            Back to Top ↑
          </button>
        </footer>
      </main>
    </>
  );
}