/* Filename: src/app/components/SkillCard.tsx */
/* Enhanced Skill Card with Improved Design System */

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { Skill } from "@/data/siteConfig";

interface SkillCardProps {
  skill: Skill;
}

const SkillCard = ({ skill }: SkillCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const hasCertifications = skill.certifications && skill.certifications.length > 0;

  return (
    <motion.div
      className="relative group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Card Container */}
      <div
        className={`
          relative h-32 rounded-2xl p-6
          glass border transition-all duration-300
          ${hasCertifications 
            ? 'border-accent-cyan/20 hover:border-accent-cyan/40 cursor-pointer' 
            : 'border-surface-elevated hover:border-accent-cyan/20'
          }
          ${isHovered && hasCertifications ? 'shadow-glow-cyan' : ''}
        `}
      >
        {/* Glow effect on hover */}
        <div 
          className={`
            absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300
            ${isHovered ? 'opacity-100' : ''}
          `}
          style={{
            background: 'radial-gradient(circle at center, rgba(34, 211, 238, 0.1), transparent 70%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-3">
          {/* Icon */}
          <div className={`
            text-text-secondary transition-colors duration-300
            ${isHovered ? 'text-accent-cyan' : ''}
          `}>
            {skill.icon}
          </div>

          {/* Skill Name */}
          <h3 className={`
            text-sm font-semibold text-center transition-colors duration-300
            ${isHovered ? 'text-accent-cyan' : 'text-text-primary'}
          `}>
            {skill.name}
          </h3>

          {/* Certification Badge */}
          {hasCertifications && (
            <div className="absolute top-2 right-2">
              <div className={`
                p-1.5 rounded-full transition-all duration-300
                ${isHovered 
                  ? 'bg-accent-cyan/20 text-accent-cyan' 
                  : 'bg-surface-elevated text-text-tertiary'
                }
              `}>
                <Award className="h-3 w-3" />
              </div>
            </div>
          )}
        </div>

        {/* Hover Overlay for Certifications */}
        <AnimatePresence>
          {isHovered && hasCertifications && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center rounded-2xl bg-deep-space/95 backdrop-blur-sm p-4"
            >
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2 text-accent-cyan">
                  <Award className="h-4 w-4" />
                  <span className="text-xs font-semibold">Certified</span>
                </div>
                <p className="text-xs text-text-secondary line-clamp-2">
                  {skill.certifications![0]}
                </p>
                {skill.certifications!.length > 1 && (
                  <p className="text-xs text-text-tertiary">
                    +{skill.certifications!.length - 1} more
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Certification Modal Trigger Hint */}
      {hasCertifications && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap"
        >
          <div className="flex items-center gap-1 text-xs text-accent-cyan">
            <span>View certification</span>
            <ExternalLink className="h-3 w-3" />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SkillCard;