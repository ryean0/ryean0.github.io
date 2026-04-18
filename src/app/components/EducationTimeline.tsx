// FILE: src/app/components/EducationTimeline.tsx  — NEW FILE
"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { alpha } from "@mui/material/styles";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";
import EducationMilestoneModal from "./EducationMilestoneModal";

// ─── Timeline geometry ────────────────────────────────────────────────────────
const YEAR_START = 2014;
const YEAR_END = 2026;
const TICK_YEARS = [2014, 2016, 2018, 2020, 2022, 2024, 2026];

/** Map a calendar year to a % position along the rail (0–100) */
const getPos = (year: number): number =>
  ((year - YEAR_START) / (YEAR_END - YEAR_START)) * 100;

// ─── Type → accent colour map ─────────────────────────────────────────────────
const TYPE_COLOR: Record<string, string> = {
  "high-school":   "#818cf8", // indigo
  military:        "#f87171", // red
  university:      "#38bdf8", // cyan
  "study-abroad":  "#34d399", // emerald
  graduation:      "#fbbf24", // amber
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function EducationTimeline() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const milestones = siteConfig.educationMilestones;
  const active = milestones.find((m) => m.id === selectedId) ?? null;

  const handleNodeClick = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* ── TIMELINE TRACK ───────────────────────────────────────────────── */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          // enough height for: year labels (20px) + gap (8px) + rail (4px) + gap (10px) + nodes (52px) + type labels (24px)
          height: 120,
          mb: 2,
        }}
      >
        {/* Year tick labels */}
        {TICK_YEARS.map((y) => (
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

        {/* Active segment highlight */}
        <AnimatePresence>
          {active && (
            <motion.div
              key={active.id + "-segment"}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              exit={{ opacity: 0, scaleX: 0 }}
              style={{
                transformOrigin: "left center",
                position: "absolute",
                top: 28,
                left: `${getPos(active.yearStart)}%`,
                width: `${Math.max(getPos(active.yearEnd) - getPos(active.yearStart), 1)}%`,
                height: 4,
                background: `linear-gradient(90deg, ${TYPE_COLOR[active.type]}, ${alpha(TYPE_COLOR[active.type], 0.4)})`,
                borderRadius: 2,
              }}
            />
          )}
        </AnimatePresence>

        {/* Milestone nodes */}
        {milestones.map((m) => {
          const isSelected = selectedId === m.id;
          const color = TYPE_COLOR[m.type] ?? "#94a3b8";

          return (
            <Box
              key={m.id}
              sx={{
                position: "absolute",
                left: `${getPos(m.yearStart)}%`,
                top: 14, // vertically centres node on the rail (rail top=28, node height=52 → offset = 28 - 52/2 + 4/2 = 4; but we want node centre ON rail)
                transform: "translateX(-50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <Tooltip
                title={`${m.typeLabel}: ${m.institution}`}
                arrow
                placement="top"
              >
                <IconButton
                  onClick={() => handleNodeClick(m.id)}
                  size="small"
                  sx={{
                    width: 44,
                    height: 44,
                    fontSize: "1.3rem",
                    bgcolor: isSelected
                      ? alpha(color, 0.18)
                      : "rgba(255,255,255,0.04)",
                    border: isSelected
                      ? `2px solid ${color}`
                      : "1px solid rgba(255,255,255,0.1)",
                    boxShadow: isSelected
                      ? `0 0 12px 2px ${alpha(color, 0.35)}`
                      : "none",
                    transition: "all 0.25s ease",
                    "&:hover": {
                      bgcolor: alpha(color, 0.12),
                      border: `1.5px solid ${alpha(color, 0.7)}`,
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  {m.icon}
                </IconButton>
              </Tooltip>

              {/* Type label below node */}
              <Typography
                variant="caption"
                sx={{
                  fontSize: "0.62rem",
                  color: isSelected ? color : "text.disabled",
                  fontWeight: isSelected ? 700 : 400,
                  whiteSpace: "nowrap",
                  transition: "color 0.2s ease",
                  mt: 0.25,
                }}
              >
                {m.typeLabel}
              </Typography>
            </Box>
          );
        })}
      </Box>

      {/* ── DETAIL PANEL ─────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {active ? (
          <EducationMilestoneModal
            key={active.id}
            milestone={active}
            accentColor={TYPE_COLOR[active.type] ?? "#38bdf8"}
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
                Select a milestone to explore
              </Typography>
              <Typography variant="caption" sx={{ fontSize: "0.72rem", color: "text.disabled" }}>
                {milestones.length} milestones · 2014 – 2026
              </Typography>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}