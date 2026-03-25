/* Filename: src/app/components/ExperienceSectionClient.tsx */

/**
 * ExperienceSectionClient — Refined
 *
 * Changes:
 * 1. Added section subtitle for context
 * 2. Consistent py-24 padding with other sections
 * 3. Cleaner grid gap and sizing
 */

'use client';
import { useState } from 'react';
import { ExperienceData } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import FadeIn from './FadeIn';
import InfoCard from './InfoCard';
import ExperienceModal from './ExperienceModal';

interface ExperienceSectionProps {
    experiences: ExperienceData[];
}

const ExperienceSectionClient = ({ experiences }: ExperienceSectionProps) => {
  const [selectedExperience, setSelectedExperience] = useState<ExperienceData | null>(null);

  return (
    <>
      <section id="experience" className="py-24">
        <FadeIn>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-slate-100">
            Work Experience
          </h2>
          <p className="text-center text-slate-400 mb-12 max-w-lg mx-auto">
            Professional roles spanning cloud infrastructure, backend systems, and frontend development.
          </p>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-stretch">
          {experiences.map((job, index) => {
            const colSpan = job.gridSpan?.col || 3;
            const rowSpan = job.gridSpan?.row || 1;
            const colSpanClass = { 1: 'md:col-span-1', 2: 'md:col-span-2', 3: 'md:col-span-3', 4: 'md:col-span-4', 5: 'md:col-span-5', 6: 'md:col-span-6' }[colSpan] || 'md:col-span-3';
            const rowSpanClass = { 1: 'md:row-span-1', 2: 'md:row-span-2' }[rowSpan] || 'md:row-span-1';

            return (
              <FadeIn
                key={job.id}
                delay={index * 0.1}
                className={cn("h-full", colSpanClass, rowSpanClass)}
              >
                <motion.div layoutId={`experience-card-${job.id}`} className="h-full">
                  <InfoCard
                    type="experience"
                    {...job}
                    onViewDetails={() => setSelectedExperience(job)}
                  />
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      <AnimatePresence>
        {selectedExperience && (
          <ExperienceModal
            key="experience-modal"
            details={selectedExperience}
            layoutId={`experience-card-${selectedExperience.id}`}
            onClose={() => setSelectedExperience(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ExperienceSectionClient;