/* Filename: src/app/components/ProjectModal.tsx */

/**
 * ProjectModal — Redesigned
 *
 * Changes:
 * 1. Consistent modal chrome with ExperienceModal (same bg, border, shadow)
 * 2. Gradient headline text for stronger visual identity
 * 3. Code Spotlight with refined dark bg and cleaner annotation points
 * 4. Reuses Section and ImpactCard from ExperienceModal
 * 5. Unified tech tag styling
 */

"use client";

import { ProjectData } from "@/types";
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
import TechIcon from "./TechIcon";
import { Section, ImpactCard } from "./ExperienceModal";

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
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        layoutId={layoutId}
        className="bg-[#0c1222] border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/40 w-full max-w-5xl max-h-[90vh] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-y-auto h-full p-6 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25, delay: 0.12, ease: "easeOut" }}
            className="space-y-7"
          >
            {/* Header with project links */}
            <header className="flex justify-between items-start gap-6">
              <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-300">
                {details.headline}
              </h2>

              {details.links && details.links.length > 0 && (
                <div className="flex items-center gap-3 pt-1 flex-shrink-0">
                  {details.links.map((link) => {
                    const Icon = IconMap[link.icon];
                    return (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-500 hover:text-sky-300 transition-colors duration-300"
                        aria-label={link.label}
                        title={link.label}
                      >
                        {Icon && <Icon className="h-5 w-5" />}
                      </a>
                    );
                  })}
                </div>
              )}
            </header>

            {/* Impact metrics */}
            {details.impact && details.impact.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch">
                {details.impact.map((item) => (
                  <ImpactCard
                    key={item.text}
                    value={item.value}
                    text={item.text}
                  />
                ))}
              </div>
            )}

            {/* Problem / Solution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Section icon={<Target size={20} />} title="The Problem">
                <p>{details.problem}</p>
              </Section>

              <Section icon={<Wrench size={20} />} title="The Solution">
                <p>{details.solution}</p>
              </Section>
            </div>

            {/* Code Spotlight */}
            {details.techHighlight && (
              <Section
                icon={<Lightbulb size={20} />}
                title={details.techHighlight.title || "Technical Highlight"}
                className="pt-2"
              >
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 mt-4">
                  {/* Code block */}
                  <div className="lg:col-span-3">
                    <div className="rounded-xl overflow-hidden border border-white/[0.06]">
                      <SyntaxHighlighter
                        language={details.techHighlight.language}
                        style={vscDarkPlus}
                        customStyle={{
                          margin: 0,
                          padding: "1.25rem",
                          fontSize: "0.8rem",
                          lineHeight: "1.6",
                          backgroundColor: "#080d1a",
                        }}
                        wrapLines={true}
                        showLineNumbers={true}
                      >
                        {details.techHighlight.code}
                      </SyntaxHighlighter>
                    </div>
                  </div>

                  {/* Annotation points */}
                  <div className="lg:col-span-2 space-y-4">
                    {details.techHighlight.points.map((point, index) => (
                      <div key={index} className="flex gap-3 items-start">
                        <CheckCircle2
                          className="text-sky-400/70 mt-0.5 flex-shrink-0"
                          size={16}
                        />
                        <div>
                          <h4 className="font-semibold text-sm text-slate-100">
                            {point.title}
                          </h4>
                          <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                            {point.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Section>
            )}

            {/* Core Technologies */}
            {details.tech && details.tech.length > 0 && (
              <Section icon={<Zap size={20} />} title="Core Technologies">
                <div className="flex flex-wrap gap-2 mt-1">
                  {details.tech.map((t) => (
                    <div
                      key={t}
                      className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-slate-200"
                    >
                      <TechIcon tech={t} className="h-3.5 w-3.5" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </Section>
            )}
          </motion.div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-500 hover:text-slate-200 bg-white/[0.04] hover:bg-white/[0.08] rounded-lg transition-all duration-200 z-10"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;