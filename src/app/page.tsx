// Filename: src/app/page.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Mail, Linkedin, Github, Star } from 'lucide-react';

import Header from '@/app/components/Header';
import Card from '@/app/components/Card';
import ProjectModal from '@/app/components/ProjectModal'; // Import the new modal
import { portfolioData, Project } from '@/app/data/portfolioData'; // Import data and Project type

export default function PortfolioPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <Header />
      <main className="container mx-auto max-w-4xl px-6">
        
        {/* --- Hero & About Section --- */}
        <section id="about" className="min-h-screen flex items-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
            <div className="md:col-span-2">
              <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300 pb-2">
                {portfolioData.name}
              </h1>
              <p className="mt-4 text-2xl md:text-3xl font-semibold text-gray-300">
                {portfolioData.title}
              </p>
              <div className="mt-6">
                <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
                  {portfolioData.about}
                </p>
              </div>
              <div className="mt-8 flex items-center gap-6">
                <a href={`mailto:${portfolioData.contact.email}`} className="text-gray-400 hover:text-blue-400 transition-colors duration-300" aria-label="Email">
                  <Mail className="h-7 w-7" />
                </a>
                <a href={portfolioData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors duration-300" aria-label="LinkedIn">
                  <Linkedin className="h-7 w-7" />
                </a>
                <a href={portfolioData.contact.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors duration-300" aria-label="GitHub">
                  <Github className="h-7 w-7" />
                </a>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
                <div className="relative w-48 h-48 md:w-64 md:h-64">
                    <Image
                        src="/profile.jpg"
                        alt="Ryan Phua Profile Photo"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                    />
                </div>
            </div>
          </div>
        </section>

        {/* --- Experience Section --- */}
        <section id="experience" className="py-20">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-100">Work Experience</h2>
          {/* This section can be refactored similarly if needed, but for now it's fine */}
          <div>
            {portfolioData.experience.map((job, index) => (
              <div key={index} className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 shadow-lg mb-8">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-blue-300">{job.title}</h3>
                      <p className="text-md font-semibold text-gray-300">{job.company}</p>
                    </div>
                    <span className="text-sm text-gray-400 flex-shrink-0 ml-4">{job.date}</span>
                  </div>
                  <ul className="list-none space-y-2 mb-4">
                    {job.achievements.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <Star className="h-4 w-4 text-blue-400 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-gray-300 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {job.tech.map((t) => (
                      <span key={t} className="bg-gray-700 text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full">{t}</span>
                    ))}
                  </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- Projects Section --- */}
        <section id="projects" className="py-20">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-100">Projects</h2>
          <div>
            {portfolioData.projects.map((project, index) => (
              <Card 
                key={index}
                project={project}
                onViewDetails={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </section>

        {/* --- Skills Section --- */}
        <section id="skills" className="py-20">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-100">Technical Skills</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {portfolioData.skills.map((skill) => (
              <div key={skill.name} className="flex flex-col items-center justify-center bg-gray-800/50 p-6 rounded-lg border border-gray-700 transition-all duration-300 hover:border-blue-400 hover:bg-gray-800/80 hover:-translate-y-1">
                <div className="text-blue-400 mb-3">{skill.icon}</div>
                <p className="font-semibold text-gray-200">{skill.name}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="text-center mt-20 py-6 border-t border-gray-800">
            <p className="text-gray-500 text-sm">
                Built with Next.js & Tailwind CSS. Deployed on GitHub Pages.
            </p>
        </footer>
      </main>

      {/* --- The Modal --- */}
      {/* It will only appear when a project is selected */}
      {selectedProject && selectedProject.details && (
        <ProjectModal 
          details={selectedProject.details}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}





