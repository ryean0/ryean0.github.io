/* Filename: src/app/components/ProjectModal.tsx */
"use client";

import { ProjectData } from "@/types";
// --- MODIFIED: Import new icons ---
import {
  X,
  ExternalLink,
  GitBranch,
  Globe,
  LucideIcon,
  Zap,
  Lightbulb,
  Target,
  Wrench,
  CheckCircle2,
} from "lucide-react";
import { useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { motion } from "framer-motion";
import TechIcon from "./TechIcon"; // Import TechIcon
import { Section, ImpactCard } from "./ExperienceModal";

// --- MODIFIED: Update props to accept the 'tech' array ---
interface ProjectModalProps {
  details: ProjectData["details"] & {
    image?: string;
    title?: string;
    tech?: string[];
  };
  onClose: () => void;
  layoutId: string;
}

const IconMap: Record<string, LucideIcon> = {
  ExternalLink,
  GitBranch,
  Globe,
};

const ProjectModal = ({ details, onClose, layoutId }: ProjectModalProps) => {
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
      {/* MODIFIED: Increased max-w-5xl to accommodate code snippets comfortably */}
      <motion.div
        layoutId={layoutId}
        className="bg-slate-800 border border-cyan-400/30 rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-y-auto h-full p-6 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.15, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* MODIFIED: Header layout to include links */}
            <header className="flex justify-between items-start gap-8">
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300">
                {details.headline}
              </h2>

              {/* --- NEW: Project Links in Header --- */}
              {details.links && details.links.length > 0 && (
                <div className="flex items-center gap-4 pt-1 flex-shrink-0">
                  {details.links.map((link) => {
                    const Icon = IconMap[link.icon];
                    return (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-cyan-300 transition-colors duration-300"
                        aria-label={link.label}
                        title={link.label}
                      >
                        {Icon && <Icon className="h-6 w-6" />}
                      </a>
                    );
                  })}
                </div>
              )}
            </header>

            {/* --- NEW: Impact Metrics Section --- */}
            {details.impact && details.impact.length > 0 && (
              // Added items-stretch for ImpactCard height consistency
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
                {details.impact.map((item) => (
                  <ImpactCard
                    key={item.text}
                    value={item.value}
                    text={item.text}
                  />
                ))}
              </div>
            )}

            {/* MODIFIED: Grid layout for Problem/Solution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Section icon={<Target size={22} />} title="The Problem">
                <p>{details.problem}</p>
              </Section>

              <Section icon={<Wrench size={22} />} title="The Solution">
                <p>{details.solution}</p>
              </Section>
            </div>

            {/* --- NEW: Tech Highlight (Code Spotlight) Section --- */}
            {details.techHighlight && (
              <Section
                icon={<Lightbulb size={22} />}
                title={details.techHighlight.title || "Technical Highlight"}
                className="pt-4"
              >
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-4">
                  {/* Code Block */}
                  <div className="lg:col-span-3">
                    <div className="rounded-lg overflow-hidden border border-slate-700/80 shadow-lg">
                      <SyntaxHighlighter
                        language={details.techHighlight.language}
                        style={vscDarkPlus}
                        customStyle={{
                          margin: 0,
                          padding: "1rem",
                          fontSize: "0.875rem",
                          backgroundColor: "#0f172a", // Consistent dark background
                        }}
                        wrapLines={true}
                        showLineNumbers={true}
                      >
                        {details.techHighlight.code}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                  {/* Analysis Points */}
                  <div className="lg:col-span-2 space-y-4">
                    {details.techHighlight.points.map((point, index) => (
                      <div key={index} className="flex gap-3 items-start">
                        <CheckCircle2
                          className="text-cyan-400 mt-0.5 flex-shrink-0"
                          size={18}
                        />
                        <div>
                          <h4 className="font-semibold text-slate-100">
                            {point.title}
                          </h4>
                          <p className="text-sm text-slate-400 mt-1">
                            {point.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Section>
            )}

            {/* --- NEW: Core Technologies section --- */}
            {details.tech && details.tech.length > 0 && (
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

export default ProjectModal;
