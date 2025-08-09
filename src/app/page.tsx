/* Filename: src/app/page.tsx */

// This is now a Server Component
import Image from "next/image";
import { Mail, Linkedin, Github, FileText } from "lucide-react";

import Header from "@/app/components/Header";
import FadeIn from "@/app/components/FadeIn";
// Import the Client boundary components
import ProjectSectionClient from "@/app/components/ProjectSectionClient";
import ExperienceSectionClient from "./components/ExperienceSectionClient"; // This component will now be correctly used
// Import the data loaders and static config
import { getExperiences, getProjects } from "@/lib/dataLoader";
import { siteConfig } from "@/data/siteConfig";
import SkillCard from "./components/SkillCard";

export default function PortfolioPage() {
// Fetch data at build time using Server Components capabilities
  const experienceData = getExperiences();
  const projectsData = getProjects();

  return (
    <>
      <Header />
      <main className="container mx-auto max-w-4xl px-6">
        {/* --- Hero & About Section (Server Rendered) --- */}
        <section id="about" className="min-h-screen flex items-center">
          <FadeIn duration={1} delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
              <div className="md:col-span-2">
                <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300 pb-2">
                  {siteConfig.name}
                </h1>
                <p className="mt-4 text-2xl md:text-3xl font-semibold text-gray-300">
                  {siteConfig.title}
                </p>
                <div className="mt-6">
                  <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
                    {siteConfig.about}
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap items-center gap-6">
                  {siteConfig.resumeUrl && (
                    <a
                      href={siteConfig.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-colors duration-300 shadow-md hover:shadow-xl"
                    >
                      <FileText className="h-5 w-5" />
                      View Resume
                    </a>
                  )}
                  <div className="flex items-center gap-6">
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                      aria-label="Email"
                    >
                      <Mail className="h-7 w-7" />
                    </a>
                    <a
                      href={siteConfig.contact.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-7 w-7" />
                    </a>
                    <a
                      href={siteConfig.contact.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                      aria-label="GitHub"
                    >
                      <Github className="h-7 w-7" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex justify-center md:justify-end">
                <div className="relative w-48 h-48 md:w-64 md:h-64">
                  <Image
                    src="/profile.jpg"
                    alt="Profile Photo"
                    fill
                    className="rounded-full object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* --- MODIFIED: Experience Section now uses the client component --- */}
        <ExperienceSectionClient experiences={experienceData} />

        {/* --- Projects Section (Client Component Boundary) --- */}
        <ProjectSectionClient projects={projectsData} />

        {/* --- Skills Section (Server Rendered) --- */}
        <section id="skills" className="py-28">
          <FadeIn>
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-100">
              Technical Skills
            </h2>
          </FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {siteConfig.skills.map((skill, index) => (
              <FadeIn key={skill.name} delay={index * 0.1}>
                <SkillCard skill={skill} />
              </FadeIn>
            ))}
          </div>
        </section>

        <footer className="text-center mt-20 py-6 border-t border-gray-800">
          <p className="text-gray-500 text-sm">
            Built with Next.js & Tailwind CSS.
            Deployed on GitHub Pages.
          </p>
        </footer>
      </main>
    </>
  );
}