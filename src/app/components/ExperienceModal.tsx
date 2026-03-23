/* Filename: src/app/components/ExperienceModal.tsx */

/**
 * ExperienceModal — Redesigned
 *
 * Changes:
 * 1. Refined modal chrome: deeper bg, softer border, larger max-width
 * 2. Impact cards with top-edge accent gradient
 * 3. Section headings with consistent icon + text treatment
 * 4. Work Samples buttons with cleaner hover states
 * 5. Core Technologies tags with unified pill styling
 * 6. Exported Section and ImpactCard for reuse in ProjectModal
 */

"use client";

import { ExperienceData } from "@/types";
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
import TechIcon from "@/app/components/TechIcon";
import { cn } from "@/lib/utils";

/* ── Reusable Section heading ── */
export const Section = ({
  icon,
  title,
  children,
  className,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={className}>
    <h3 className="flex items-center gap-2.5 text-lg font-bold text-sky-300 mb-3">
      {icon}
      {title}
    </h3>
    <div className="text-slate-300/90 leading-relaxed text-sm">
      {children}
    </div>
  </div>
);

/* ── Reusable Impact metric card ── */
export const ImpactCard = ({ value, text }: { value: string; text: string }) => (
  <div className="relative bg-white/[0.03] border border-white/[0.06] p-5 rounded-xl text-center h-full overflow-hidden">
    {/* Top accent line */}
    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-400/40 to-transparent" />
    <p className="text-3xl font-bold text-sky-400">{value}</p>
    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{text}</p>
  </div>
);

interface ExperienceModalProps {
  details: ExperienceData | undefined;
  onClose: () => void;
  layoutId: string;
}

const IconMap: Record<string, LucideIcon> = {
  FileText,
  Presentation,
  ExternalLink,
  GitBranch,
  Globe,
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
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        layoutId={layoutId}
        className="bg-[#0c1222] border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/40 w-full max-w-4xl max-h-[90vh] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-y-auto h-full p-6 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25, delay: 0.12, ease: "easeOut" }}
            className="space-y-7"
          >
            {/* Header */}
            <header>
              <h2 className="text-2xl md:text-3xl font-bold text-sky-300">
                {details.title}
              </h2>
              <p className="text-base font-medium text-slate-400 mt-1">
                {details.company}
              </p>
            </header>

            {/* Impact metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {details.details?.impact.map((item) => (
                <ImpactCard
                  key={item.text}
                  value={item.value}
                  text={item.text}
                />
              ))}
            </div>

            {/* Problem / Solution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Section icon={<Target size={20} />} title="The Problem">
                <p>{details.details?.problem}</p>
              </Section>

              <Section icon={<Wrench size={20} />} title="The Solution">
                <p>{details.details?.solution}</p>
              </Section>
            </div>

            {/* Work Samples */}
            {details.details?.links && details.details.links.length > 0 && (
              <Section icon={<Lightbulb size={20} />} title="Work Samples">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                  {details.details.links.slice(0, 2).map((link) => {
                    const Icon = IconMap[link.icon];
                    return (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "group flex items-center justify-center gap-2.5 p-3.5 rounded-xl",
                          "bg-white/[0.03] border border-white/[0.06]",
                          "hover:bg-white/[0.06] hover:border-sky-400/20 transition-all duration-300"
                        )}
                      >
                        {Icon && (
                          <Icon className="h-4 w-4 text-slate-400 group-hover:text-sky-300 transition-colors" />
                        )}
                        <span className="font-semibold text-sm text-slate-200 group-hover:text-sky-300 transition-colors">
                          {link.label}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </Section>
            )}

            {/* Core Technologies */}
            {details.tech && (
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

export default ExperienceModal;