/* Filename: src/app/components/ProjectSectionClient.tsx */

/**
 * ProjectSectionClient — Refined
 *
 * Changes:
 * 1. Added section subtitle for context
 * 2. Consistent py-24 padding with other sections
 * 3. Cleaner grid gap and sizing
 */

'use client';

import { useState } from 'react';
import { ProjectData } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import FadeIn from './FadeIn';
import InfoCard from './InfoCard';
import ProjectModal from './ProjectModal';

interface ProjectSectionProps {
    projects: ProjectData[];
}

const ProjectSectionClient = ({ projects }: ProjectSectionProps) => {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  return (
    <>
      <section id="projects" className="py-24">
        <FadeIn>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-slate-100">
            Projects
          </h2>
          <p className="text-center text-slate-400 mb-12 max-w-lg mx-auto">
            Selected engineering projects showcasing distributed systems, containerisation, and full-stack development.
          </p>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-stretch">
          {projects.map((project, index) => {
            const colSpan = project.gridSpan?.col || 3;
            const rowSpan = project.gridSpan?.row || 1;
            const colSpanClass = { 1: 'md:col-span-1', 2: 'md:col-span-2', 3: 'md:col-span-3', 4: 'md:col-span-4', 5: 'md:col-span-5', 6: 'md:col-span-6' }[colSpan] || 'md:col-span-3';
            const rowSpanClass = { 1: 'md:row-span-1', 2: 'md:row-span-2' }[rowSpan] || 'md:row-span-1';

            return (
              <FadeIn
                key={project.id}
                delay={index * 0.1}
                className={cn("h-full", colSpanClass, rowSpanClass)}
              >
                <motion.div layoutId={`card-container-${project.id}`} className="h-full">
                  <InfoCard
                    type="project"
                    {...project}
                    onViewDetails={() => setSelectedProject(project)}
                  />
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && selectedProject.details && (
          <ProjectModal
            key="modal"
            details={{
              ...selectedProject.details,
              image: selectedProject.image,
              title: selectedProject.title,
              tech: selectedProject.tech,
            }}
            layoutId={`card-container-${selectedProject.id}`}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectSectionClient;