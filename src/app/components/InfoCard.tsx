/* Filename: src/app/components/InfoCard.tsx */
/* Enhanced Info Card with Improved Design System */

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
  ArrowUpRight,
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
  let tagsToShow;
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
          return <MonitorSmartphone size={28} className="text-accent-cyan" />;
        case "backend":
          return <Server size={28} className="text-accent-purple" />;
        case "ai":
          return <BrainCircuit size={28} className="text-accent-pink" />;
        case "general":
          return <Briefcase size={28} className="text-accent-cyan" />;
        default:
          return <Briefcase size={28} className="text-accent-cyan" />;
      }
    } else if (props.type === "project") {
      switch (props.category) {
        case "code":
          return <Code size={28} className="text-accent-cyan" />;
        case "star":
          return <Star size={28} className="text-accent-amber" />;
        default:
          return <Code size={28} className="text-accent-cyan" />;
      }
    }
    return null;
  };

  return (
    <div className="h-full p-6 flex flex-col justify-between">
      {/* Top Section */}
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1 p-2 rounded-lg bg-surface-elevated/50">
            {renderIcon()}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-text-primary leading-tight text-base @[20rem]:text-lg @[28rem]:text-xl mb-1 line-clamp-2">
              {props.title}
            </h3>
            {"company" in props && (
              <p className="font-medium text-text-secondary text-sm @[28rem]:text-base line-clamp-1">
                {props.company}
              </p>
            )}
          </div>
        </div>

        {props.cardSpotlight && <CardSpotlight items={props.cardSpotlight} />}
      </div>

      {/* Bottom Section */}
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {props.tech.slice(0, tagsToShow).map((t) => (
            <div
              key={t}
              className={cn(
                "flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg transition-colors duration-200",
                t === props.keyTech
                  ? "bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/30"
                  : "bg-surface-elevated text-text-secondary hover:bg-surface-hover"
              )}
            >
              <TechIcon tech={t} className="h-3.5 w-3.5" />
              <span>{t}</span>
            </div>
          ))}
        </div>
        {props.displayDate && (
          <div className="flex items-center justify-between pt-2 border-t border-surface-elevated">
            <p className="text-xs text-text-tertiary">
              {props.displayDate}
            </p>
            <ArrowUpRight className="h-4 w-4 text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
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
      className="w-full h-full min-h-72 @container text-left relative rounded-2xl glass border border-surface-elevated group overflow-hidden"
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      aria-label={ariaLabel}
    >
      {/* Gradient glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 via-transparent to-accent-purple/5" />
      </div>

      {/* Border glow on hover */}
      <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-accent-cyan/30 transition-colors duration-300" />

      {/* Card content */}
      <div className="relative h-full">
        <CardFront {...props} />

        {/* Hover overlay */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center rounded-2xl",
            "bg-deep-space/90 backdrop-blur-sm",
            "opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
          )}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="p-3 rounded-full bg-accent-cyan/10 border border-accent-cyan/30">
              <Eye size={24} className="text-accent-cyan" />
            </div>
            <p className="text-lg font-semibold text-text-primary">
              View Details
            </p>
          </div>
        </div>
      </div>

      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="shimmer" />
      </div>
    </motion.button>
  );
};

export default InfoCard;