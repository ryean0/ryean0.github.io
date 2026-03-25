/* Filename: src/app/components/InfoCard.tsx */

/**
 * InfoCard — Redesigned
 *
 * Changes:
 * 1. Switched to glass-card aesthetic with refined border/shadow system
 * 2. Cleaner top-aligned layout with icon + title block
 * 3. Subtle top-edge gradient accent line per card
 * 4. Improved hover state: border glow + softer scale
 * 5. Better responsive tag handling
 * 6. Cleaner "Click for details" overlay with frosted glass
 */

"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  Code,
  Star,
  Eye,
  BrainCircuit,
  Server,
  MonitorSmartphone,
} from "lucide-react";
import { cn } from "@/lib/utils";
import TechIcon from "./TechIcon";
import { SpotlightItem } from "@/types";
import CardSpotlight from "./CardSpotlight";

type InfoCardProps = {
  type: "experience" | "project";
  category: string;
  title: string;
  tech: string[];
  keyTech?: string;
  gridSpan?: { col?: number; row?: number };
  cardSpotlight?: SpotlightItem[];
  displayDate?: string;
  company?: string;
  onViewDetails?: () => void;
};

const CardFront = (props: InfoCardProps) => {
  const colSpan = props.gridSpan?.col || 3;
  let tagsToShow: number;
  if (colSpan <= 2) {
    tagsToShow = 3;
  } else if (colSpan === 3) {
    tagsToShow = 4;
  } else {
    tagsToShow = 6;
  }

  const renderIcon = () => {
    if (props.type === "experience") {
      switch (props.category) {
        case "frontend":
          return <MonitorSmartphone size={24} />;
        case "backend":
          return <Server size={24} />;
        case "ai":
          return <BrainCircuit size={24} />;
        case "general":
          return <Briefcase size={24} />;
        default:
          return <Briefcase size={24} />;
      }
    } else if (props.type === "project") {
      switch (props.category) {
        case "code":
          return <Code size={24} />;
        case "star":
          return <Star size={24} />;
        default:
          return <Code size={24} />;
      }
    }
    return null;
  };

  return (
    <div className="h-full p-5 flex flex-col justify-between">
      {/* Top Section */}
      <div>
        <div className="flex items-start gap-3.5">
          <div className="text-sky-400/70 flex-shrink-0 mt-0.5">
            {renderIcon()}
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-sky-300 leading-tight text-base @[20rem]:text-lg @[28rem]:text-xl">
              {props.title}
            </h3>
            {"company" in props && props.company && (
              <p className="font-medium text-slate-400/80 text-sm mt-0.5">
                {props.company}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Spotlight metrics */}
      {props.cardSpotlight && <CardSpotlight items={props.cardSpotlight} />}

      {/* Bottom Section */}
      <div>
        <div className="flex flex-wrap gap-1.5">
          {props.tech.slice(0, tagsToShow).map((t) => (
            <div
              key={t}
              className={cn(
                "flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full",
                t === props.keyTech
                  ? "bg-sky-400/10 text-sky-300 border border-sky-400/20"
                  : "bg-white/[0.04] text-slate-300 border border-white/[0.06]"
              )}
            >
              <TechIcon tech={t} />
              <span>{t}</span>
            </div>
          ))}
        </div>
        {props.displayDate && (
          <p className="text-right text-xs text-slate-500 mt-3 font-mono">
            {props.displayDate}
          </p>
        )}
      </div>
    </div>
  );
};

const InfoCard = (props: InfoCardProps) => {
  const ariaLabel = `View details for ${props.type}: ${props.title}${
    props.company ? ` at ${props.company}` : ""
  }`;

  return (
    <motion.button
      onClick={props.onViewDetails}
      className={cn(
        "w-full h-full min-h-72 @container text-left relative rounded-xl overflow-hidden group",
        "bg-white/[0.02] border border-white/[0.06]",
        "transition-all duration-300"
      )}
      whileHover={{ scale: 1.015, y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      aria-label={ariaLabel}
    >
      {/* Top accent gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Hover border glow */}
      <div className="absolute inset-0 rounded-xl border border-sky-400/0 group-hover:border-sky-400/15 transition-all duration-500 pointer-events-none" />

      {/* Card content */}
      <div className="relative h-full">
        <CardFront {...props} />

        {/* Hover overlay */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center rounded-xl",
            "bg-[#030712]/60 backdrop-blur-[3px]",
            "opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"
          )}
        >
          <p className="flex items-center gap-2 text-base font-semibold text-slate-100">
            <Eye size={18} />
            Click for details
          </p>
        </div>
      </div>
    </motion.button>
  );
};

export default InfoCard;