// Filename: src/components/ProjectModal.tsx
'use client';

import { ProjectDetails } from '@/app/data/portfolioData';
import { X, ExternalLink, GitBranch } from 'lucide-react';
import { useEffect } from 'react';

interface ProjectModalProps {
  details: ProjectDetails | undefined;
  onClose: () => void;
}

const ProjectModal = ({ details, onClose }: ProjectModalProps) => {
  // --- LINTING FIX ---
  // The useEffect hook is now moved to the top level of the component,
  // before any conditional returns, to satisfy the Rules of Hooks.
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    // Cleanup function to remove the event listener when the component unmounts
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // The guard clause now comes AFTER all hooks have been called.
  if (!details) {
    return null;
  }

  // The rest of the component remains the same.
  return (
    <div 
      className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gray-900 border border-blue-500/30 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X size={24} />
        </button>

        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300 mb-6">
          {details.headline}
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-gray-100 mb-2 border-b-2 border-red-500/50 pb-1">The Problem</h3>
            <p className="text-gray-400 leading-relaxed">{details.problem}</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-100 mb-2 border-b-2 border-green-500/50 pb-1">My Solution</h3>
            <p className="text-gray-400 leading-relaxed">{details.solution}</p>
          </div>
        </div>
        
        <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-100 mb-4 text-center">Quantifiable Impact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                {details.impact.map(item => (
                    <div key={item.text} className="bg-gray-800/50 p-4 rounded-lg">
                        <p className="text-4xl font-bold text-blue-400">{item.value}</p>
                        <p className="text-sm text-gray-400 mt-1">{item.text}</p>
                    </div>
                ))}
            </div>
        </div>

        <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-100 mb-4">{details.techHighlight.title}</h3>
            <div className="grid md:grid-cols-2 gap-8">
                <pre className="bg-gray-950 p-4 rounded-lg text-xs text-left overflow-x-auto">
                    <code className={`language-${details.techHighlight.language}`}>{details.techHighlight.code}</code>
                </pre>
                <div>
                    <ul className="space-y-4">
                        {details.techHighlight.points.map(point => (
                            <li key={point.title}>
                                <p className="font-bold text-gray-200">{point.title}</p>
                                <p className="text-sm text-gray-400">{point.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
        
        <div className="flex justify-center gap-4 mt-8 border-t border-gray-800 pt-6">
            <a href={details.links.migratedRepo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                <GitBranch size={18} /> Migrated Repo
            </a>
            <a href={details.links.originalRepo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                <ExternalLink size={18} /> Original Repo
            </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;

