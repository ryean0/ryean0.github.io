/* Filename: src/app/components/CardSpotlight.tsx */

"use client";

// Removed cn import as it's unused
import {
  Zap,
  Cpu,
  Wrench,
  DollarSign,
  Code,
  ShieldCheck,
  LucideIcon,
} from "lucide-react";
import TechIcon from "./TechIcon";
import { SpotlightItem } from "@/types/index";

interface CardSpotlightProps {
  // MODIFIED: Use the structured type
  items: SpotlightItem[];
}

// Centralized Icon Map (Local centralization as we cannot create src/lib/icons.ts)
const IconMap: Record<string, LucideIcon> = {
  Zap,
  Cpu,
  Wrench,
  DollarSign,
  Code,
  ShieldCheck,
};

const CardSpotlight = ({ items }: CardSpotlightProps) => {
  return (
    // Adjusted gap for better spacing, changeditems-center to items-start
    <div className="mt-4 flex flex-row justify-center items-start gap-8 w-full">
      {/* MODIFIED: Removed items.slice(0, 2) to display all provided items */}
      {items.map((item) => {
        const Icon = IconMap[item.icon];
        return (
          <div key={item.label} className="text-center flex-1 min-w-0">
            <div className="flex justify-center items-center gap-2">
              {Icon && <Icon className="h-4 w-4 text-cyan-400/80" />}
              <p className="font-semibold text-slate-300 text-xs uppercase tracking-wider">
                {item.label}
              </p>
            </div>
            {/* --- MODIFIED: This block now renders the icon next to the tech name --- */}
            <div
              // MODIFIED: Adjusted font size responsiveness slightly
              className="text-lg @[24rem]:text-2xl font-bold text-slate-100 mt-1 truncate flex items-center justify-center gap-2"
              title={item.value}
            >
              {item.label === "Core Tech" && (
                <TechIcon tech={item.value} className="h-5 w-5" />
              )}
              <span>{item.value}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardSpotlight;
