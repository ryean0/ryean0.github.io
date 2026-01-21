/* Filename: src/app/page.tsx */
/* Enhanced Landing Page with Improved Design System */

import Image from "next/image";
import { Mail, Linkedin, Github, FileText, Sparkles, ArrowRight } from "lucide-react";

import Header from "@/app/components/Header";
import FadeIn from "@/app/components/FadeIn";
import ProjectSectionClient from "@/app/components/ProjectSectionClient";
import ExperienceSectionClient from "./components/ExperienceSectionClient";
import { getExperiences, getProjects } from "@/lib/dataLoader";
import { siteConfig } from "@/data/siteConfig";
import SkillCard from "./components/SkillCard";

export default function PortfolioPage() {
  const experienceData = getExperiences();
  const projectsData = getProjects();

  return (
    <>
      <Header />
      <main id="main-content" className="container mx-auto max-w-6xl px-6">
        {/* ============================================
            HERO / ABOUT SECTION - Enhanced Design
            ============================================ */}
        <section id="about" className="min-h-screen flex items-center py-20">
          <FadeIn duration={1} delay={0.1}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
              {/* Left Column - Text Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Greeting Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-accent-cyan/20 text-sm font-medium text-accent-cyan">
                  <Sparkles className="h-4 w-4" />
                  <span>Available for Full-Time Opportunities</span>
                </div>

                {/* Name with Gradient Animation */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold">
                  <span className="text-gradient-animated">
                    {siteConfig.name}
                  </span>
                </h1>

                {/* Title */}
                <div className="space-y-2">
                  <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-text-primary">
                    {siteConfig.title}
                  </p>
                  <p className="text-lg text-text-secondary flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                    {siteConfig.location}
                  </p>
                </div>

                {/* About Description */}
                <div className="max-w-2xl">
                  <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
                    {siteConfig.about}
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap items-center gap-4">
                  {siteConfig.resumeUrl && (
                    <a
                      href={siteConfig.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-accent text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-glow-cyan-lg hover:scale-105"
                    >
                      <FileText className="h-5 w-5" />
                      <span>View Resume</span>
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </a>
                  )}
                  
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-8 py-4 border-2 border-accent-cyan/30 text-accent-cyan font-semibold rounded-xl transition-all duration-300 hover:bg-accent-cyan/10 hover:border-accent-cyan hover:scale-105"
                  >
                    <span>Let's Connect</span>
                  </a>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-6 pt-4">
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="group relative p-3 rounded-xl glass border border-transparent transition-all duration-300 hover:border-accent-cyan/30 hover:shadow-glow-cyan"
                    aria-label="Email"
                  >
                    <Mail className="h-6 w-6 text-text-secondary transition-colors group-hover:text-accent-cyan" />
                  </a>
                  <a
                    href={siteConfig.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-3 rounded-xl glass border border-transparent transition-all duration-300 hover:border-accent-cyan/30 hover:shadow-glow-cyan"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-6 w-6 text-text-secondary transition-colors group-hover:text-accent-cyan" />
                  </a>
                  <a
                    href={siteConfig.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-3 rounded-xl glass border border-transparent transition-all duration-300 hover:border-accent-cyan/30 hover:shadow-glow-cyan"
                    aria-label="GitHub"
                  >
                    <Github className="h-6 w-6 text-text-secondary transition-colors group-hover:text-accent-cyan" />
                  </a>
                </div>
              </div>

              {/* Right Column - Profile Image */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative group">
                  {/* Glow effect behind image */}
                  <div className="absolute -inset-4 bg-gradient-accent opacity-20 blur-2xl rounded-full transition-opacity duration-500 group-hover:opacity-40" />
                  
                  {/* Image container */}
                  <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                    <div className="absolute inset-0 rounded-full border-4 border-accent-cyan/20 transition-all duration-500 group-hover:border-accent-cyan/40 group-hover:scale-105" />
                    <Image
                      src="/profile.jpg"
                      alt="Profile Photo"
                      fill
                      className="rounded-full object-cover transition-transform duration-500 group-hover:scale-105"
                      priority
                      sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* ============================================
            EXPERIENCE SECTION
            ============================================ */}
        <ExperienceSectionClient experiences={experienceData} />

        {/* ============================================
            PROJECTS SECTION
            ============================================ */}
        <ProjectSectionClient projects={projectsData} />

        {/* ============================================
            SKILLS SECTION - Enhanced Layout
            ============================================ */}
        <section id="skills" className="py-28">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-gradient">Technical Skills</span>
              </h2>
              <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                Technologies and tools I use to bring ideas to life
              </p>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {siteConfig.skills.map((skill, index) => (
              <FadeIn key={skill.name} delay={index * 0.05}>
                <SkillCard skill={skill} />
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ============================================
            CONTACT / CTA SECTION - New Addition
            ============================================ */}
        <section id="contact" className="py-28">
          <FadeIn>
            <div className="relative overflow-hidden rounded-3xl glass border border-accent-cyan/20 p-12 md:p-16">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent-cyan/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-purple/10 rounded-full blur-3xl" />
              
              {/* Content */}
              <div className="relative z-10 text-center space-y-8">
                <h2 className="text-4xl md:text-5xl font-bold">
                  <span className="text-gradient">Let's Build Something Together</span>
                </h2>
                
                <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                  I'm actively seeking software engineering opportunities where I can 
                  contribute to meaningful projects and grow as an engineer. 
                  Let's connect and explore how we can work together!
                </p>
                
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-accent text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-glow-cyan-lg hover:scale-105"
                  >
                    <Mail className="h-5 w-5" />
                    <span>Email Me</span>
                  </a>
                  
                  <a
                    href={siteConfig.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 border-2 border-accent-cyan/30 text-accent-cyan font-semibold rounded-xl transition-all duration-300 hover:bg-accent-cyan/10 hover:border-accent-cyan hover:scale-105"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span>Connect on LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* ============================================
            FOOTER - Enhanced Design
            ============================================ */}
        <footer className="py-12 mt-20 border-t border-surface-elevated">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-text-secondary text-sm">
                Built with <span className="text-accent-pink">♥</span> using Next.js & Tailwind CSS
              </p>
              <p className="text-text-tertiary text-xs mt-1">
                Deployed on GitHub Pages • © 2024 Ryan Phua
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <a
                href={siteConfig.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-tertiary hover:text-accent-cyan transition-colors text-sm"
              >
                View Source
              </a>
              <span className="text-text-tertiary">•</span>
              <a
                href="#about"
                className="text-text-tertiary hover:text-accent-cyan transition-colors text-sm"
              >
                Back to Top
              </a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}