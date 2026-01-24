/* Filename: src/app/components/Education.tsx */

/**
 * Education Component
 * 
 * Displays educational background including degree, school, graduation date,
 * GPA, and relevant coursework. This is a critical section for new grad
 * applications as it immediately signals your academic credentials.
 * 
 * Features:
 * - Clean card layout with glassmorphism effect
 * - Organized coursework display with pill badges
 * - Responsive design for mobile and desktop
 * - Hover effects for interactivity
 */

import { GraduationCap } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

const Education = () => {
  const { education } = siteConfig;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Main education card with glassmorphism effect */}
      <div className="education-card bg-slate-800/50 backdrop-blur-sm border border-slate-700/80 rounded-2xl p-8 md:p-10 transition-all duration-300 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10">
        
        {/* Header section with icon and degree info */}
        <div className="flex items-start gap-6 mb-6">
          {/* UCLA icon placeholder - can be replaced with actual logo */}
          <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          
          <div className="flex-1">
            {/* Degree title */}
            <h3 className="text-2xl md:text-3xl font-bold text-gray-100 mb-2">
              {education.degree}
            </h3>
            
            {/* School name with accent color */}
            <p className="text-xl text-blue-400 font-semibold mb-3">
              {education.school}
            </p>
            
            {/* Graduation date and GPA in a flex row */}
            <div className="flex flex-wrap items-center gap-4 text-gray-300">
              <span className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-400">Expected Graduation:</span>
                <span className="font-semibold">{education.graduationDate}</span>
              </span>
              
              <span className="text-gray-600">•</span>
              
              <span className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-400">GPA:</span>
                <span className="font-semibold text-green-400">{education.gpa}</span>
              </span>
            </div>
          </div>
        </div>
        
        {/* Divider line */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-6" />
        
        {/* Relevant coursework section */}
        <div>
          <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Relevant Coursework
          </h4>
          
          {/* Course badges in a responsive grid */}
          <div className="flex flex-wrap gap-2">
            {education.relevantCourses.map((course) => (
              <span
                key={course}
                className="course-badge px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-full text-sm text-gray-300 font-medium transition-all duration-200 hover:bg-slate-600/50 hover:border-blue-500/50 hover:text-gray-100 hover:scale-105"
              >
                {course}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;