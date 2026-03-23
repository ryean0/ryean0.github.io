/* Filename: src/app/components/Education.tsx */

/**
 * Education Component — Redesigned
 *
 * Changes:
 * 1. Glass-card surface (translucent white) instead of opaque slate
 * 2. Refined icon badge with subtle glow shadow
 * 3. Cleaner divider treatment with gradient lines
 * 4. Course badges with translucent white pill style
 * 5. Tighter typography and improved spacing
 * 6. Consistent accent system (sky-400 / emerald-400)
 */

import { GraduationCap, MapPin, Calendar, Award, Users } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

const Education = () => {
  const { education } = siteConfig;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Main education card */}
      <div className="education-card bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 md:p-10 transition-all duration-300 hover:border-sky-400/15 hover:shadow-lg hover:shadow-sky-500/[0.04]">

        {/* Header — icon + degree info */}
        <div className="flex items-start gap-6 mb-6">
          {/* Graduation icon */}
          <div className="flex-shrink-0 w-16 h-16 md:w-18 md:h-18 bg-gradient-to-br from-sky-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-sky-500/15">
            <GraduationCap className="w-8 h-8 md:w-9 md:h-9 text-white" />
          </div>

          <div className="flex-1">
            {/* Degree */}
            <h3 className="text-2xl md:text-3xl font-bold text-slate-100 mb-1.5 leading-tight">
              {education.degree}
            </h3>

            {/* School */}
            <p className="text-xl md:text-2xl text-sky-400 font-semibold mb-3">
              {education.school}
            </p>

            {/* Location */}
            <div className="flex items-center gap-2 text-slate-400 mb-3">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{education.location}</span>
            </div>

            {/* Graduation date + GPA row */}
            <div className="flex flex-wrap items-center gap-3 text-slate-300">
              {/* Graduation Date */}
              <span className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.03] border border-white/[0.06] rounded-lg">
                <Calendar className="h-3.5 w-3.5 text-sky-400" />
                <span className="text-sm">
                  <span className="text-slate-400">Expected:</span>{' '}
                  <span className="font-semibold">{education.graduationDate}</span>
                </span>
              </span>

              {/* GPA */}
              {education.gpa && (
                <>
                  <span className="text-slate-600">·</span>
                  <span className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/[0.06] border border-emerald-500/[0.12] rounded-lg">
                    <Award className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-sm">
                      <span className="text-slate-400">GPA:</span>{' '}
                      <span className="font-semibold text-emerald-400">{education.gpa}</span>
                    </span>
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-6" />

        {/* Relevant coursework */}
        <div className="mb-6">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-1 h-3.5 bg-sky-400 rounded-full" />
            Relevant Coursework
          </h4>

          <div className="flex flex-wrap gap-2">
            {education.relevantCourses.map((course) => (
              <span
                key={course}
                className="course-badge px-3.5 py-1.5 bg-white/[0.03] border border-white/[0.06] rounded-full text-sm text-slate-300 font-medium transition-all duration-200 hover:bg-white/[0.06] hover:border-sky-400/15 hover:text-slate-100 cursor-default"
              >
                {course}
              </span>
            ))}
          </div>
        </div>

        {/* Optional: Honors & Awards */}
        {education.honors && education.honors.length > 0 && (
          <>
            <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-6" />
            <div className="mb-6">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Award className="h-3.5 w-3.5 text-amber-400" />
                Honors & Awards
              </h4>
              <ul className="space-y-2">
                {education.honors.map((honor) => (
                  <li
                    key={honor}
                    className="flex items-start gap-2 text-sm text-slate-300"
                  >
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0" />
                    <span>{honor}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {/* Optional: Activities */}
        {education.activities && education.activities.length > 0 && (
          <>
            <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-6" />
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Users className="h-3.5 w-3.5 text-indigo-400" />
                Activities & Leadership
              </h4>
              <ul className="space-y-2">
                {education.activities.map((activity) => (
                  <li
                    key={activity}
                    className="flex items-start gap-2 text-sm text-slate-300"
                  >
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2 flex-shrink-0" />
                    <span>{activity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>

      {/* Availability note */}
      {siteConfig.availableForWork && (
        <div className="mt-4 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/[0.06] border border-emerald-500/[0.12] rounded-full text-sm text-emerald-400 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Available for Full-Time Opportunities Starting {education.graduationDate}
          </span>
        </div>
      )}
    </div>
  );
};

export default Education;