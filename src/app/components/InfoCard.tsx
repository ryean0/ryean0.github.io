/* Filename: src/app/components/InfoCard.tsx */
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Briefcase, Code, Star, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import TechIcon from "./TechIcon";
import { ExperienceData, ProjectData } from "@/types";
import KeyMetricDisplay from "./KeyMetricDisplay";

type InfoCardProps = (ExperienceData | ProjectData) & {
  type: "experience" | "project";
  onViewDetails?: () => void;
};

// CardFront component with updated title color
const CardFront = (props: InfoCardProps) => {
  const colSpan = props.gridSpan?.col || 3;
  let tagsToShow;
  if (colSpan <= 2) { tagsToShow = 3; } 
  else if (colSpan === 3) { tagsToShow = 4; } 
  else { tagsToShow = 6; }

  return (
    <div className="h-full p-6">
      <div className="pb-20">
        <div className="flex items-start gap-4">
          <div className="text-cyan-400/80 flex-shrink-0 mt-1">
            {props.type === "experience" ? (
              <Briefcase className="h-8 w-8" />
            ) : (
              <Code className="h-8 w-8" />
            )}
          </div>
          <div>
            {/* --- MODIFIED: Title color unified with the new accent color --- */}
            <h3 className="font-bold text-cyan-400 leading-tight text-base @[20rem]:text-lg @[28rem]:text-xl">
              {props.title}
            </h3>
            {"company" in props && (
              <p className="font-semibold text-gray-400/80 text-sm @[28rem]:text-base">
                {props.company}
              </p>
            )}
          </div>
        </div>
        {props.keyMetric && <KeyMetricDisplay metric={props.keyMetric} />}
      </div>
      
      <div className="absolute bottom-6 left-6 right-6">
        <div className="flex flex-wrap gap-2">
          {props.tech.slice(0, tagsToShow).map((t) => (
            <div
              key={t}
              className={cn(
                "flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full",
                "transition-colors duration-300",
                t === props.keyTech
                  ? "bg-slate-600 text-slate-100"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              )}
            >
              <TechIcon tech={t} />
              <span>{t}</span>
            </div>
          ))}
        </div>
        {props.displayDate && (
          <p className="text-right text-xs text-gray-500 mt-3">
            {props.displayDate}
          </p>
        )}
      </div>
    </div>
  );
};


// --- MODIFIED: Main InfoCard component with a polished hover animation ---
const InfoCard = (props: InfoCardProps) => {
    const commonClasses = "w-full h-full min-h-72 @container text-left relative rounded-lg border border-gray-700/80 shadow-lg bg-gradient-to-br from-slate-800 to-slate-900";
    const hoverClasses = "transition-all duration-300 group-hover:border-cyan-400/40 group-hover:shadow-xl group-hover:shadow-cyan-500/10";

    return (
        <motion.button
            onClick={props.onViewDetails}
            className={cn(commonClasses, "group")} 
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            <div className={cn("absolute inset-0 rounded-lg", hoverClasses)} />
            <div className="relative h-full">
                <CardFront {...props} />
                
                {/* --- NEW: Hover Overlay --- */}
                <div className={cn(
                    "absolute inset-0 flex items-center justify-center rounded-lg",
                    "bg-slate-900/60 backdrop-blur-[2px]",
                    "opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                )}>
                    <p className="flex items-center gap-2 text-lg font-semibold text-slate-100">
                        <Eye size={20} />
                        Click for details
                    </p>
                </div>
            </div>
        </motion.button>
    );
};

export default InfoCard;