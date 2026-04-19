// FILE: src/app/components/ExperiencePage/ExperienceTimeline.tsx — NEW FILE
"use client";

import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { alpha } from "@mui/material/styles";
import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  Server,
  MonitorSmartphone,
  BrainCircuit,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import type { Experience } from "@/data/siteConfig";
import ExperienceTimelineModal from "./ExperienceTimelineModal";

// ─── Props ──────────────────────────────────────────────────────────
interface ExperienceTimelineProps {
  experiences: Experience[];
}

// ─── Category → accent colour + icon + label ─────────────────────────
const CATEGORY_COLOR: Record<Experience["category"], string> = {
  fullstack: "#38bdf8",           // cyan
  backend: "#34d399",             // emerald
  frontend: "#818cf8",            // indigo
  "ml-infrastructure": "#f87171", // red
  devops: "#fbbf24",              // amber
};

const CATEGORY_ICON: Record<Experience["category"], LucideIcon> = {
  fullstack: Briefcase,
  backend: Server,
  frontend: MonitorSmartphone,
  "ml-infrastructure": BrainCircuit,
  devops: ShieldCheck,
};

const CATEGORY_LABEL: Record<Experience["category"], string> = {
  fullstack: "Full-Stack",
  backend: "Backend",
  frontend: "Frontend",
  "ml-infrastructure": "ML Infra",
  devops: "DevOps",
};

// ─── Date parsing helpers ────────────────────────────────────────────
const MONTHS: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};

/** Convert "Jun 2024" | "Present" → fractional year (e.g. 2024.417). */
const toFracYear = (label: string, fallback: number): number => {
  if (/present/i.test(label)) return fallback;
  const match = label.trim().match(/^([A-Za-z]{3})\s+(\d{4})$/);
  if (!match) return fallback;
  const m = MONTHS[match[1].toLowerCase()] ?? 0;
  const y = parseInt(match[2], 10);
  return y + m / 12;
};

// ─── Component ───────────────────────────────────────────────────────
export default function ExperienceTimeline({
  experiences,
}: ExperienceTimelineProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Sort chronologically (earliest → latest)
  const sorted = useMemo(() => {
    const currentYearFrac =
      new Date().getFullYear() + new Date().getMonth() / 12;
    return [...experiences]
      .map((exp) => ({
        exp,
        startFrac: toFracYear(exp.dateStart, currentYearFrac),
        endFrac: toFracYear(exp.dateEnd, currentYearFrac),
      }))
      .sort((a, b) => a.startFrac - b.startFrac);
  }, [experiences]);

  // Compute rail domain (padded by ~0.3 yr each side)
  const { yearStart, yearEnd, tickYears } = useMemo(() => {
    if (sorted.length === 0) {
      const y = new Date().getFullYear();
      return { yearStart: y - 1, yearEnd: y + 1, tickYears: [y - 1, y, y + 1] };
    }
    const minYr = Math.floor(Math.min(...sorted.map((s) => s.startFrac)) - 0.3);
    const maxYr = Math.ceil(Math.max(...sorted.map((s) => s.endFrac)) + 0.3);
    const ticks: number[] = [];
    for (let y = minYr; y <= maxYr; y++) ticks.push(y);
    return { yearStart: minYr, yearEnd: maxYr, tickYears: ticks };
  }, [sorted]);

  const getPos = (frac: number): number =>
    ((frac - yearStart) / (yearEnd - yearStart)) * 100;

  const active = sorted.find((s) => s.exp.id === selectedId) ?? null;

  return (
    <Box sx={{ width: "100%" }}>
      {/* ── TIMELINE TRACK ─────────────────────────────────────── */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 130,
          mb: 2,
        }}
      >
        {/* Year tick labels */}
        {tickYears.map((y) => (
          <Typography
            key={y}
            variant="caption"
            sx={{
              position: "absolute",
              left: `${getPos(y)}%`,
              top: 0,
              transform: "translateX(-50%)",
              color: "text.disabled",
              fontFamily: "var(--font-geist-mono, monospace)",
              fontSize: "0.68rem",
              userSelect: "none",
            }}
          >
            {y}
          </Typography>
        ))}

        {/* Rail background */}
        <Box
          sx={{
            position: "absolute",
            top: 28,
            left: 0,
            right: 0,
            height: 4,
            bgcolor: "rgba(255,255,255,0.06)",
            borderRadius: 2,
          }}
        />

        {/* Active duration highlight */}
        <AnimatePresence>
          {active && (
            <motion.div
              key={active.exp.id + "-segment"}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              exit={{ opacity: 0, scaleX: 0 }}
              style={{
                transformOrigin: "left center",
                position: "absolute",
                top: 28,
                left: `${getPos(active.startFrac)}%`,
                width: `${Math.max(
                  getPos(active.endFrac) - getPos(active.startFrac),
                  1
                )}%`,
                height: 4,
                background: `linear-gradient(90deg, ${
                  CATEGORY_COLOR[active.exp.category]
                }, ${alpha(CATEGORY_COLOR[active.exp.category], 0.4)})`,
                borderRadius: 2,
              }}
            />
          )}
        </AnimatePresence>

        {/* Experience nodes */}
        {sorted.map(({ exp, startFrac }) => {
          const isSelected = selectedId === exp.id;
          const color = CATEGORY_COLOR[exp.category];
          const Icon = CATEGORY_ICON[exp.category];

          return (
            <Box
              key={exp.id}
              sx={{
                position: "absolute",
                left: `${getPos(startFrac)}%`,
                top: 14,
                transform: "translateX(-50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <Tooltip
                title={`${exp.role} · ${exp.company}`}
                arrow
                placement="top"
              >
                <IconButton
                  onClick={() =>
                    setSelectedId((prev) => (prev === exp.id ? null : exp.id))
                  }
                  size="small"
                  aria-label={`View ${exp.role} at ${exp.company}`}
                  sx={{
                    width: 44,
                    height: 44,
                    bgcolor: isSelected
                      ? alpha(color, 0.18)
                      : "rgba(255,255,255,0.04)",
                    border: isSelected
                      ? `2px solid ${color}`
                      : "1px solid rgba(255,255,255,0.1)",
                    color: isSelected ? color : "text.secondary",
                    boxShadow: isSelected
                      ? `0 0 12px 2px ${alpha(color, 0.35)}`
                      : "none",
                    transition: "all 0.25s ease",
                    "&:hover": {
                      bgcolor: alpha(color, 0.12),
                      border: `1.5px solid ${alpha(color, 0.7)}`,
                      color,
                      transform: "scale(1.1)",
                    },
                    // Pulsing ring for the current role
                    ...(exp.isCurrent && {
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        inset: -4,
                        borderRadius: "50%",
                        border: `1.5px solid ${alpha(color, 0.5)}`,
                        animation: "xp-pulse 2s ease-out infinite",
                      },
                      "@keyframes xp-pulse": {
                        "0%": { transform: "scale(0.95)", opacity: 0.8 },
                        "70%": { transform: "scale(1.15)", opacity: 0 },
                        "100%": { transform: "scale(1.15)", opacity: 0 },
                      },
                    }),
                  }}
                >
                  <Icon size={18} />
                </IconButton>
              </Tooltip>

              {/* Category label below node */}
              <Typography
                variant="caption"
                sx={{
                  fontSize: "0.62rem",
                  color: isSelected ? color : "text.disabled",
                  fontWeight: isSelected ? 700 : 400,
                  whiteSpace: "nowrap",
                  maxWidth: 110,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  textAlign: "center",
                  transition: "color 0.2s ease",
                  mt: 0.25,
                }}
              >
                {CATEGORY_LABEL[exp.category]}
              </Typography>
            </Box>
          );
        })}
      </Box>

      {/* ── DETAIL PANEL ───────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {active ? (
          <ExperienceTimelineModal
            key={active.exp.id}
            experience={active.exp}
            accentColor={CATEGORY_COLOR[active.exp.category]}
            categoryLabel={CATEGORY_LABEL[active.exp.category]}
            onClose={() => setSelectedId(null)}
          />
        ) : (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: 120,
                gap: 1,
                color: "text.disabled",
                borderRadius: 3,
                border: "1px dashed rgba(255,255,255,0.06)",
              }}
            >
              <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>
                Select a role to explore
              </Typography>
              <Typography
                variant="caption"
                sx={{ fontSize: "0.72rem", color: "text.disabled" }}
              >
                {sorted.length} roles · {yearStart} – {yearEnd}
              </Typography>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}
