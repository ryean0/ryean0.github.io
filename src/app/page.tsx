/* Filename: src/app/page.tsx */

/**
 * Main Portfolio Page — Redesigned
 *
 * Changes:
 * 1. Hero section with terminal-inspired greeting + refined typography hierarchy
 * 2. Status badges (location, education, availability) as a cohesive badge row
 * 3. Social links with consistent icon button treatment
 * 4. Section dividers between major sections for visual rhythm
 * 5. Wider max-width container (max-w-5xl) for better use of screen real estate
 * 6. Refined footer with subtle branding
 */

import Image from "next/image";
import { Mail, Linkedin, Github, FileText, MapPin, GraduationCap, ChevronDown } from "lucide-react";

import Header from "@/app/components/Header";
import FadeIn from "@/app/components/FadeIn";
import Education from "@/app/components/Education";
import SkillsEnhanced from "@/app/components/SkillsEnhanced";
import ProjectSectionClient from "@/app/components/ProjectSectionClient";
import ExperienceSectionClient from "./components/ExperienceSectionClient";
import { getExperiences, getProjects } from "@/lib/dataLoader";
import { siteConfig } from "@/data/siteConfig";

export default function PortfolioPage() {
  const experienceData = getExperiences();
  const projectsData = getProjects();

  return (
    <>
      <Header />
      <main className="container mx-auto max-w-5xl px-6">

        {/* ========================================
            HERO / ABOUT SECTION
            ======================================== */}
        <section id="about" className="min-h-screen flex items-center py-24">
          <FadeIn duration={1} delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">

              {/* Left column — Text content (3/5 width) */}
              <div className="md:col-span-3">
                {/* Terminal-style greeting */}
                <div className="flex items-center gap-2 mb-6">
                  <span className="inline-block w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                  <span className="font-mono text-sm text-slate-400 tracking-wide">
                    Hi, I'm
                  </span>
                </div>

                {/* Name — animated gradient */}
                <h1 className="text-5xl md:text-7xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 animate-gradient pb-1 leading-tight">
                  {siteConfig.name}
                </h1>

                {/* Title */}
                <p className="text-2xl md:text-3xl font-semibold text-slate-100 mb-1">
                  {siteConfig.title}
                </p>

                {/* Subtitle */}
                {siteConfig.subtitle && (
                  <p className="text-base text-slate-400 font-mono tracking-wide mb-6">
                    {siteConfig.subtitle}
                  </p>
                )}

                {/* Bio */}
                <p className="text-base md:text-lg text-slate-300/90 max-w-xl leading-relaxed mb-8">
                  {siteConfig.about}
                </p>

                {/* Status badges row */}
                <div className="flex flex-wrap items-center gap-3 mb-8">
                  {/* Location */}
                  <span className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.03] border border-white/[0.06] rounded-full text-sm text-slate-400 hover:border-white/[0.12] transition-colors duration-300">
                    <MapPin className="h-3.5 w-3.5 text-sky-400" />
                    <span>{siteConfig.location}</span>
                  </span>

                  {/* Education quick ref */}
                  <span className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.03] border border-white/[0.06] rounded-full text-sm text-slate-400 hover:border-white/[0.12] transition-colors duration-300">
                    <GraduationCap className="h-3.5 w-3.5 text-sky-400" />
                    <span>
                      UCLA CS '{siteConfig.education.graduationDate.split(' ')[1].slice(-2)}
                    </span>
                  </span>

                  {/* Availability */}
                  {siteConfig.availableForWork && (
                    <span className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/[0.06] border border-emerald-500/[0.12] rounded-full text-sm">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                      <span className="text-emerald-400">Open to Opportunities</span>
                    </span>
                  )}
                </div>

                {/* CTA + social row */}
                <div className="flex flex-wrap items-center gap-4">
                  {/* Resume button */}
                  {siteConfig.resumeUrl && (
                    <a
                      href={siteConfig.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 bg-sky-500 hover:bg-sky-400 text-white font-semibold py-2.5 px-5 rounded-xl transition-all duration-300 shadow-lg shadow-sky-500/20 hover:shadow-xl hover:shadow-sky-500/30 hover:-translate-y-0.5 active:translate-y-0"
                      aria-label="Download Resume"
                    >
                      <FileText className="h-4 w-4" />
                      View Resume
                    </a>
                  )}

                  {/* Social icons */}
                  <div className="flex items-center gap-2">
                    {[
                      { href: `mailto:${siteConfig.contact.email}`, icon: Mail, label: "Email" },
                      { href: siteConfig.contact.linkedin, icon: Linkedin, label: "LinkedIn" },
                      { href: siteConfig.contact.github, icon: Github, label: "GitHub" },
                    ].map(({ href, icon: Icon, label }) => (
                      <a
                        key={label}
                        href={href}
                        target={label === "Email" ? undefined : "_blank"}
                        rel={label === "Email" ? undefined : "noopener noreferrer"}
                        className="p-2.5 text-slate-400 hover:text-sky-400 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-sky-400/20 rounded-xl transition-all duration-300"
                        aria-label={label}
                        title={label}
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right column — Profile photo (2/5 width) */}
              <div className="md:col-span-2 flex justify-center md:justify-end">
                <div className="relative w-56 h-56 md:w-72 md:h-72">
                  {/* Outer glow ring */}
                  <div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-indigo-500/20 rounded-full blur-3xl scale-110" />

                  {/* Border ring */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-400/20 via-transparent to-indigo-400/20 p-[2px]">
                    <div className="w-full h-full rounded-full bg-[#030712]" />
                  </div>

                  {/* Profile image */}
                  <Image
                    src="/profile.jpg"
                    alt="Ryan Phua — Software Engineer"
                    fill
                    className="rounded-full object-cover relative z-10 border-2 border-white/[0.06]"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Scroll hint */}
            <div className="flex justify-center mt-16 md:mt-20">
              <ChevronDown className="h-5 w-5 text-slate-600 animate-bounce" />
            </div>
          </FadeIn>
        </section>

        {/* ── Section Divider ── */}
        <div className="section-divider" />

        {/* ========================================
            EDUCATION SECTION
            ======================================== */}
        <section id="education" className="py-24">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-slate-100">
              Education
            </h2>
            <p className="text-center text-slate-400 mb-12 max-w-lg mx-auto">
              Academic foundation in computer science with hands-on engineering focus.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Education />
          </FadeIn>
        </section>

        {/* ── Section Divider ── */}
        <div className="section-divider" />

        {/* ========================================
            SKILLS SECTION
            ======================================== */}
        <section id="skills" className="py-24">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-slate-100">
              Technical Skills
            </h2>
            <p className="text-center text-slate-400 mb-12 max-w-lg mx-auto">
              Core competencies across the full stack, from frontend to cloud infrastructure.
            </p>
          </FadeIn>
          <SkillsEnhanced />
        </section>

        {/* ── Section Divider ── */}
        <div className="section-divider" />

        {/* ========================================
            EXPERIENCE SECTION
            ======================================== */}
        <ExperienceSectionClient experiences={experienceData} />

        {/* ── Section Divider ── */}
        <div className="section-divider" />

        {/* ========================================
            PROJECTS SECTION
            ======================================== */}
        <ProjectSectionClient projects={projectsData} />

        {/* ========================================
            FOOTER
            ======================================== */}
        <footer className="mt-24 py-10 border-t border-white/[0.04]">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-slate-500">
              <span className="font-mono">
                &copy; {new Date().getFullYear()} {siteConfig.name}
              </span>
            </div>
            <p className="text-sm text-slate-600">
              Built with Next.js & Tailwind CSS. Deployed on GitHub Pages.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}