/* Filename: src/app/components/ExperienceModal.tsx */
"use client";

import { ExperienceData } from "@/types";
// --- MODIFIED: Import new icons for the buttons ---
import {
  X,
  Lightbulb,
  Target,
  Wrench,
  Zap,
  FileText,
  Presentation,
  ExternalLink,
  GitBranch,
  Globe,
  LucideIcon,
} from "lucide-react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import TechIcon from "@/app/components/TechIcon";
import { cn } from "@/lib/utils";

// --- MODIFIED: Exporting Section for reuse in ProjectModal ---
export const Section = ({
  icon,
  title,
  children,
  className, // Added className for flexibility
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={className}>
    <h3 className="flex items-center gap-3 text-xl font-bold text-cyan-300 mb-3">
      {icon}
      {title}
    </h3>
    <div className="text-slate-300/90 leading-relaxed prose prose-invert prose-p:my-1 prose-p:text-slate-300/90 max-w-none">
      {children}
    </div>
  </div>
);

// --- MODIFIED: Exporting ImpactCard for reuse in ProjectModal ---
export const ImpactCard = ({ value, text }: { value: string; text: string }) => (
  // Added h-full to ensure consistent height in a grid layout
  <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/80 text-center h-full">
    <p className="text-3xl font-bold text-cyan-400">{value}</p>
    <p className="text-sm text-slate-400 mt-1">{text}</p>
  </div>
);

interface ExperienceModalProps {
  details: ExperienceData | undefined;
  onClose: () => void;
  layoutId: string;
}

// --- NEW: Icon map for the work sample buttons ---
const IconMap: Record<string, LucideIcon> = {
  FileText: FileText,
  Presentation: Presentation,
  ExternalLink: ExternalLink,
  GitBranch: GitBranch,
  Globe: Globe,
};

const ExperienceModal = ({
  details,
  onClose,
  layoutId,
}: ExperienceModalProps) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) =>
      event.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  if (!details) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        layoutId={layoutId}
        className="bg-slate-800 border border-cyan-400/30 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-y-auto h-full p-6 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.15, ease: "easeOut" }}
            className="space-y-8"
          >
            <header>
              <h2 className="text-3xl font-bold text-cyan-300">
                {details.title}
              </h2>
              <p className="text-lg font-semibold text-gray-300">
                {details.company}
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {details.details?.impact.map((item) => (
                <ImpactCard
                  key={item.text}
                  value={item.value}
                  text={item.text}
                />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Section icon={<Target size={22} />} title="The Problem">
                <p>{details.details?.problem}</p>
              </Section>

              <Section icon={<Wrench size={22} />} title="The Solution">
                <p>{details.details?.solution}</p>
              </Section>
            </div>

            {/* --- NEW: Work Samples Section --- */}
            {details.details?.links && details.details.links.length > 0 && (
              <Section icon={<Lightbulb size={22} />} title="Work Samples">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  {details.details.links.slice(0, 2).map((link) => {
                    const Icon = IconMap[link.icon];
                    return (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "group flex items-center justify-center gap-3 p-4 rounded-lg",
                          "bg-slate-700/50 border border-slate-600/80",
                          "hover:bg-slate-700 hover:border-cyan-400/60 transition-all duration-300"
                        )}
                      >
                        {Icon && (
                          <Icon className="h-5 w-5 text-slate-400 group-hover:text-cyan-300 transition-colors" />
                        )}
                        <span className="font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors">
                          {link.label}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </Section>
            )}
            
            {details.tech && (
              <Section icon={<Zap size={22} />} title="Core Technologies">
                <div className="flex flex-wrap gap-2">
                  {details.tech.map((t) => (
                    <div
                      key={t}
                      className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full bg-slate-700 text-slate-200"
                    >
                      <TechIcon tech={t} className="h-4 w-4" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </Section>
            )}
          </motion.div>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
        >
          <X size={24} />
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ExperienceModal;
