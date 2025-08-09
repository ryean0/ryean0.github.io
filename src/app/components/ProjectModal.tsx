/* Filename: src/app/components/ProjectModal.tsx */
'use client';

import { ProjectData } from '@/types';
import { X, ExternalLink, GitBranch, Globe, LucideIcon } from 'lucide-react';
import Image from 'next/image';
import { useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ProjectModalProps {
  details: ProjectData['details'] & { image?: string; title?: string };
  onClose: () => void;
  layoutId: string;
}

const IconMap: Record<string, LucideIcon> = {
    ExternalLink: ExternalLink,
    GitBranch: GitBranch,
    Globe: Globe,
};

const ProjectModal = ({ details, onClose, layoutId }: ProjectModalProps) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
        window.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [onClose]);

  if (!details) return null;

  return (
    // --- MODIFIED: The outer div now handles the backdrop fade animation ---
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* --- MODIFIED: This div now correctly shares the layoutId from the card --- */}
      <motion.div
        layoutId={layoutId}
        className="bg-slate-800 border border-cyan-400/30 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* The content inside the modal */}
        <div className="overflow-y-auto h-full p-6 md:p-8">
            <motion.div
                // --- MODIFIED: Animate content in after the card expands ---
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.15, ease: "easeOut" }}
            >
                {/* Headline */}
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300 mb-6">
                    {details.headline}
                </h2>

                {/* Image */}
                {details.image && (
                  <div className="relative w-full h-48 md:h-64 mb-6 rounded-lg overflow-hidden border border-slate-700">
                      <Image src={details.image} alt={`${details.title || 'Project'} image`} fill className="object-cover" />
                  </div>
                )}
                
                {/* Rest of your modal content... (Problem, Solution, TechHighlight, etc.) */}
                {/* This content will now fade in smoothly */}

            </motion.div>
        </div>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10">
            <X size={24} />
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;