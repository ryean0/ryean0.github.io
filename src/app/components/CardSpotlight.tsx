/* Filename: src/app/components/CardSpotlight.tsx */

/**
 * CardSpotlight — Refined
 *
 * Changes:
 * 1. Tighter spacing and cleaner typography
 * 2. Subtle divider between metric columns
 * 3. Core Tech icon rendering preserved
 */

"use client";

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
  items: SpotlightItem[];
}

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
    <div className="mt-4 mb-4 flex flex-row items-start w-full">
      {items.map((item, index) => {
        const Icon = IconMap[item.icon];
        return (
          <div
            key={item.label}
            className={`text-center flex-1 min-w-0 ${
              index !== items.length - 1
                ? "border-r border-white/[0.04]"
                : ""
            }`}
          >
            <div className="flex justify-center items-center gap-1.5">
              {Icon && <Icon className="h-3.5 w-3.5 text-sky-400/60" />}
              <p className="font-semibold text-slate-400 text-[10px] uppercase tracking-widest">
                {item.label}
              </p>
            </div>
            <div
              className="text-lg @[24rem]:text-xl font-bold text-slate-100 mt-1 truncate flex items-center justify-center gap-1.5"
              title={item.value}
            >
              {item.label === "Core Tech" && (
                <TechIcon tech={item.value} className="h-4 w-4" />
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