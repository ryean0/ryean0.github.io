/* Filename: src/app/components/SkillCard.tsx */
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Skill } from '@/data/siteConfig';
import { cn } from '@/lib/utils';
import { Award, RotateCw } from 'lucide-react';

// ... (interface remains the same)
interface SkillCardProps {
  skill: Skill;
}

const SkillCard = ({ skill }: SkillCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const hasCerts = skill.certifications && skill.certifications.length > 0;

  const handleCardClick = () => {
    if (hasCerts) {
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <div className="w-full h-36 [perspective:1000px]" onClick={handleCardClick}>
      <motion.div
        className="relative w-full h-full [transform-style:preserve-3d]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* --- Card Front --- */}
        <div className={cn(
          "absolute w-full h-full [backface-visibility:hidden] rounded-lg border border-gray-700 p-6 flex flex-col items-center justify-center transition-all duration-300 group",
          "bg-gradient-to-br from-slate-800/80 to-slate-900/80",
          hasCerts && "cursor-pointer hover:border-blue-400/80"
        )}>
          {/* NEW: Visual cue for flippable cards */}
          {hasCerts && (
            <div className="absolute top-2 right-2 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
              <RotateCw size={14} />
            </div>
          )}
          <div className="text-blue-400 mb-3">{skill.icon}</div>
          <p className="font-semibold text-gray-200">{skill.name}</p>
        </div>

        {/* --- Card Back --- */}
        <div className={cn(
          "absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-lg border border-blue-400 p-4 flex flex-col items-center justify-center",
           "bg-gradient-to-br from-slate-800 to-blue-900/50"
        )}>
          <h4 className="font-bold text-sm mb-2 text-blue-300">Certifications</h4>
          <ul className="text-center space-y-1">
            {skill.certifications?.map(cert => (
              <li key={cert} className="flex items-center gap-2 text-xs text-slate-300">
                <Award size={14} className="text-blue-400 flex-shrink-0" />
                <span>{cert}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default SkillCard;