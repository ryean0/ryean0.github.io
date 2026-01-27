/* Filename: src/app/components/Education.tsx */

/**
 * Education Component
 * 
 * Displays educational background including degree, school, graduation date,
 * GPA, and relevant coursework. This is a CRITICAL section for new grad
 * applications as it immediately signals your academic credentials to recruiters.
 * 
 * Features:
 * - Clean card layout with glassmorphism effect
 * - Organized coursework display with pill badges
 * - Optional honors/awards section
 * - Optional activities section
 * - Responsive design for mobile and desktop
 * - Hover effects for interactivity
 * - Accessible with proper ARIA labels
 * 
 * Why This Component is Critical:
 * - Recruiters need to verify graduation date for new grad roles
 * - GPA is a common screening criterion (if 3.5+)
 * - Relevant coursework shows technical foundation
 * - Proper formatting helps with ATS (Applicant Tracking Systems)
 */

import { GraduationCap, MapPin, Calendar, Award, Users } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

const Education = () => {
  const { education } = siteConfig;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Main education card with glassmorphism effect */}
      <div className="education-card bg-slate-800/50 backdrop-blur-sm border border-slate-700/80 rounded-2xl p-8 md:p-10 transition-all duration-300 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10">
        
        {/* Header section with icon and degree info */}
        <div className="flex items-start gap-6 mb-6">
          {/* UCLA icon - gradient background for visual appeal */}
          <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <GraduationCap className="w-8 h-8 md:w-10 md:h-10 text-white" />
          </div>
          
          <div className="flex-1">
            {/* Degree title - most important information */}
            <h3 className="text-2xl md:text-3xl font-bold text-gray-100 mb-2 leading-tight">
              {education.degree}
            </h3>
            
            {/* School name with accent color */}
            <p className="text-xl md:text-2xl text-blue-400 font-semibold mb-3">
              {education.school}
            </p>
            
            {/* Location */}
            <div className="flex items-center gap-2 text-gray-400 mb-3">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{education.location}</span>
            </div>
            
            {/* Graduation date and GPA in a flex row */}
            <div className="flex flex-wrap items-center gap-4 text-gray-300">
              {/* Graduation Date - CRITICAL for new grad roles */}
              <span className="flex items-center gap-2 px-3 py-1.5 bg-slate-700/50 border border-slate-600/50 rounded-lg">
                <Calendar className="h-4 w-4 text-blue-400" />
                <span className="text-sm">
                  <span className="font-medium text-gray-400">Expected:</span>{' '}
                  <span className="font-semibold">{education.graduationDate}</span>
                </span>
              </span>
              
              {/* GPA - Only show if provided (should be 3.5+) */}
              {education.gpa && (
                <>
                  <span className="text-gray-600">•</span>
                  <span className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <Award className="h-4 w-4 text-green-400" />
                    <span className="text-sm">
                      <span className="font-medium text-gray-400">GPA:</span>{' '}
                      <span className="font-semibold text-green-400">{education.gpa}</span>
                    </span>
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Divider line */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-6" />
        
        {/* Relevant coursework section - Shows technical foundation */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <span className="w-1 h-4 bg-blue-500 rounded-full" />
            Relevant Coursework
          </h4>
          
          {/* Course badges in a responsive grid */}
          <div className="flex flex-wrap gap-2">
            {education.relevantCourses.map((course) => (
              <span
                key={course}
                className="course-badge px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-full text-sm text-gray-300 font-medium transition-all duration-200 hover:bg-slate-600/50 hover:border-blue-500/50 hover:text-gray-100 hover:scale-105 cursor-default"
              >
                {course}
              </span>
            ))}
          </div>
        </div>
        
        {/* Optional: Honors & Awards section */}
        {education.honors && education.honors.length > 0 && (
          <>
            <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-6" />
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Award className="h-4 w-4 text-amber-400" />
                Honors & Awards
              </h4>
              <ul className="space-y-2">
                {education.honors.map((honor) => (
                  <li
                    key={honor}
                    className="flex items-start gap-2 text-sm text-gray-300"
                  >
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0" />
                    <span>{honor}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
        
        {/* Optional: Activities section */}
        {education.activities && education.activities.length > 0 && (
          <>
            <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-6" />
            <div>
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-400" />
                Activities & Leadership
              </h4>
              <ul className="space-y-2">
                {education.activities.map((activity) => (
                  <li
                    key={activity}
                    className="flex items-start gap-2 text-sm text-gray-300"
                  >
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                    <span>{activity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
      
      {/* Optional: Add a note about availability */}
      {siteConfig.availableForWork && (
        <div className="mt-4 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-sm text-green-400 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Available for Full-Time Opportunities Starting {education.graduationDate}
          </span>
        </div>
      )}
    </div>
  );
};

export default Education;