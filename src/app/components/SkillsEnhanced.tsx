/* Filename: src/app/components/SkillsEnhanced.tsx */

/**
 * SkillsEnhanced — Redesigned
 *
 * Changes:
 * 1. Translucent glass-card treatment on individual skill tiles
 * 2. Category headers with left accent bar (consistent with design system)
 * 3. Proficiency rendered as a thin bar instead of stars for cleaner aesthetics
 * 4. Certification badge with refined green accent
 * 5. Proficiency legend with bar indicators
 * 6. Tighter grid with responsive columns
 */

'use client';

import { siteConfig } from '@/data/siteConfig';
import FadeIn from './FadeIn';

const SkillsEnhanced = () => {
  const { skillCategories } = siteConfig;

  /**
   * Renders proficiency as a horizontal bar
   * 3 = full, 2 = two-thirds, 1 = one-third
   */
  const renderProficiency = (level: number = 2) => {
    const widthMap: Record<number, string> = {
      1: 'w-1/3',
      2: 'w-2/3',
      3: 'w-full',
    };
    return (
      <div className="mt-3 w-full">
        <div className="h-[3px] w-full bg-white/[0.04] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${widthMap[level] || 'w-2/3'} ${
              level === 3
                ? 'bg-sky-400'
                : level === 2
                  ? 'bg-sky-400/60'
                  : 'bg-sky-400/30'
            }`}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-14">
      {skillCategories.map((category, categoryIndex) => (
        <FadeIn key={category.category} delay={categoryIndex * 0.1}>
          <div>
            {/* Category header */}
            <h3 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-3">
              <span className="w-1 h-6 bg-gradient-to-b from-sky-400 to-indigo-400 rounded-full" />
              {category.category}
            </h3>

            {/* Skills grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {category.skills.map((skill, skillIndex) => (
                <FadeIn
                  key={skill.name}
                  delay={categoryIndex * 0.1 + skillIndex * 0.04}
                >
                  {/* Individual skill card */}
                  <div className="group bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 transition-all duration-300 hover:border-sky-400/20 hover:bg-white/[0.04] hover:-translate-y-1">

                    {/* Icon */}
                    <div className="flex items-center justify-center w-10 h-10 mb-3 bg-sky-400/[0.06] rounded-lg group-hover:bg-sky-400/[0.10] transition-all duration-300">
                      <div className="text-sky-400/70 group-hover:text-sky-300 transition-colors duration-300">
                        {skill.icon}
                      </div>
                    </div>

                    {/* Skill name */}
                    <h4 className="text-sm font-semibold text-slate-200 group-hover:text-slate-100 transition-colors duration-300">
                      {skill.name}
                    </h4>

                    {/* Proficiency bar */}
                    {renderProficiency(skill.proficiency)}

                    {/* Certification badge */}
                    {skill.certifications && skill.certifications.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-white/[0.04]">
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-emerald-500/[0.06] border border-emerald-500/[0.12] rounded-full text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
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
        <div className="flex items-center justify-center gap-8 pt-8 border-t border-white/[0.04]">
          {[
            { label: 'Expert', level: 3 },
            { label: 'Proficient', level: 2 },
            { label: 'Familiar', level: 1 },
          ].map(({ label, level }) => (
            <div key={label} className="flex items-center gap-2.5 text-sm text-slate-500">
              <div className="w-8 h-[3px] bg-white/[0.04] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    level === 3
                      ? 'w-full bg-sky-400'
                      : level === 2
                        ? 'w-2/3 bg-sky-400/60'
                        : 'w-1/3 bg-sky-400/30'
                  }`}
                />
              </div>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  );
};

export default SkillsEnhanced;