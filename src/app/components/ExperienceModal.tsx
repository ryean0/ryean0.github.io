/* Filename: src/app/components/ExperienceModal.tsx */
'use client';

import { ExperienceData } from '@/types';
import { X, Star, Briefcase } from 'lucide-react';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ExperienceModalProps {
  details: ExperienceData | undefined;
  onClose: () => void;
}

const ExperienceModal = ({ details, onClose }: ExperienceModalProps) => {
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="bg-slate-800 border border-blue-500/30 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] relative p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-4 mb-6">
            <Briefcase className="h-10 w-10 text-gray-400 flex-shrink-0" />
            <div>
                <h2 className="text-2xl font-bold text-blue-300">{details.title}</h2>
                <p className="text-lg font-semibold text-gray-300">{details.company}</p>
            </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
                <h3 className="font-bold text-lg text-blue-300 mb-3">Key Achievements</h3>
                <ul className="space-y-3 text-slate-300 overflow-y-auto pr-2">
                    {details.achievements.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                        <Star size={16} className="text-blue-400 flex-shrink-0 mt-1" />
                        <span>{item}</span>
                    </li>
                    ))}
                </ul>
            </div>
            {details.image && (
                <div className="w-full md:w-2/5 flex-shrink-0 relative h-48 md:h-auto">
                    <Image src={details.image} alt={`${details.title} detail image`} fill className="rounded-md object-cover" />
                </div>
            )}
        </div>
        
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
            <X size={24} />
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ExperienceModal;