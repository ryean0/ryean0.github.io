/* Filename: src/app/components/InfoCard.tsx */
"use client";

import { motion } from "framer-motion";
import { Briefcase, Code, Star, Eye, BrainCircuit, Server, MonitorSmartphone } from "lucide-react";
import { cn } from "@/lib/utils";
import TechIcon from "./TechIcon";
import { ExperienceData, ProjectData } from "@/types";
import CardSpotlight from "./CardSpotlight"; 
import { JSX } from "react";

type InfoCardProps = {
  type: "experience" | "project";
  category: string;
  title: string;
  tech: string[];
  keyTech?: string;
  gridSpan?: { col?: number; row?: number };
  cardSpotlight?: JSX.Element; // unknown structure
  displayDate?: string;
  company?: string;
  onViewDetails?: () => void;
};

const CardFront = (props: InfoCardProps) => {
  const colSpan = props.gridSpan?.col || 3;
  let tagsToShow;
  if (colSpan <= 2) { tagsToShow = 3; } 
  else if (colSpan === 3) { tagsToShow = 4; } 
  else { tagsToShow = 6; }

  const renderIcon = () => {
    if (props.type === "experience") {
      switch (props.category) {
        case "frontend": return <MonitorSmartphone size={28} />;
        case "backend": return <Server size={28} />;
        case "ai": return <BrainCircuit size={28} />;
        case "general": return <Briefcase size={28} />;
        default: return <Briefcase size={28} />;
      }
    } else if (props.type === "project") {
      switch (props.category) {
        case "code": return <Code size={28} />;
        case "star": return <Star size={28} />;
        // Added default case to ensure a valid return type 
        default: return <Code size={28} />;
      }
    }
    return null;
  };

  return (
    <div className="h-full p-6 flex flex-col justify-between">
      {/* --- Top Section --- */}
      <div>
        <div className="flex items-start gap-4">
          <div className="text-cyan-400/80 flex-shrink-0 mt-1">
            {renderIcon()}
          </div>
          <div>
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
      </div>
      
      {props.cardSpotlight && <CardSpotlight items={props.cardSpotlight} />}

      {/* --- Bottom Section --- */}
      <div>
        <div className="flex flex-wrap gap-2">
          {props.tech.slice(0, tagsToShow).map((t) => (
            <div
              key={t}
              className={cn(
                "flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full",
                t === props.keyTech
                  ? "bg-slate-600 text-slate-100"
                  : "bg-slate-700/80 text-slate-300"
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