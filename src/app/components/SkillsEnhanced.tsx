/* Filename: src/app/components/SkillsEnhanced.tsx */

/**
 * Enhanced Skills Component
 * 
 * Displays technical skills organized by category with proficiency indicators.
 * This provides much better signal to recruiters about your capabilities
 * compared to a flat list of skills.
 * 
 * Features:
 * - Categorized skills (Languages, Frontend, Backend, etc.)
 * - Visual proficiency indicators (1-3 stars)
 * - Hover effects and animations
 * - Responsive grid layout
 * - Certification badges for relevant skills
 */

'use client';

import { siteConfig } from '@/data/siteConfig';
import { Star } from 'lucide-react';
import FadeIn from './FadeIn';

const SkillsEnhanced = () => {
  const { skillCategories } = siteConfig;

  /**
   * Renders proficiency stars based on skill level
   * 3 stars = Expert, 2 stars = Proficient, 1 star = Familiar
   */
  const renderProficiency = (level: number = 2) => {
    return (
      <div className="flex gap-1 mt-2">
        {[1, 2, 3].map((star) => (
          <Star
            key={star}
            className={`w-3 h-3 ${
              star <= level
                ? 'fill-amber-400 text-amber-400'
                : 'fill-slate-700 text-slate-700'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-12">
      {skillCategories.map((category, categoryIndex) => (
        <FadeIn key={category.category} delay={categoryIndex * 0.1}>
          {/* Category section */}
          <div className="skill-category">
            {/* Category header */}
            <h3 className="text-2xl font-bold text-gray-100 mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full" />
              {category.category}
            </h3>

            {/* Skills grid - responsive columns */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {category.skills.map((skill, skillIndex) => (
                <FadeIn
                  key={skill.name}
                  delay={categoryIndex * 0.1 + skillIndex * 0.05}
                >
                  {/* Individual skill card */}
                  <div className="skill-card group bg-slate-800/50 backdrop-blur-sm border border-slate-700/80 rounded-xl p-4 transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1">
                    
                    {/* Icon container with gradient background */}
                    <div className="flex items-center justify-center w-12 h-12 mb-3 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg group-hover:from-blue-500/20 group-hover:to-cyan-500/20 transition-all duration-300">
                      <div className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                        {skill.icon}
                      </div>
                    </div>

                    {/* Skill name */}
                    <h4 className="text-sm font-semibold text-gray-200 mb-1 group-hover:text-gray-100 transition-colors duration-300">
                      {skill.name}
                    </h4>

                    {/* Proficiency stars */}
                    {renderProficiency(skill.proficiency)}

                    {/* Certification badge (if applicable) */}
                    {skill.certifications && skill.certifications.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-slate-700/50">
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-xs text-green-400 font-medium">
                          <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                          Certified
                        </span>
                      </div>
                    )}
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeIn>
      ))}

      {/* Proficiency legend */}
      <FadeIn delay={0.5}>
        <div className="flex items-center justify-center gap-8 pt-8 border-t border-slate-800">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <div className="flex gap-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            </div>
            <span>Expert</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <div className="flex gap-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <Star className="w-3 h-3 fill-slate-700 text-slate-700" />
            </div>
            <span>Proficient</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <div className="flex gap-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <Star className="w-3 h-3 fill-slate-700 text-slate-700" />
              <Star className="w-3 h-3 fill-slate-700 text-slate-700" />
            </div>
            <span>Familiar</span>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};

export default SkillsEnhanced;