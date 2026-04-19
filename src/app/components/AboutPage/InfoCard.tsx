/* Filename: src/app/components/InfoCard.tsx */

"use client";

import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { alpha } from "@mui/material/styles";
import {
  Briefcase, Code, Star, Eye, BrainCircuit, Server, MonitorSmartphone,
} from "lucide-react";
import TechIcon from "./TechIcon";
import { SpotlightItem } from "@/data/siteConfig";
import CardSpotlight from "../CardSpotlight";

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

const renderIcon = (type: string, category: string) => {
  if (type === "experience") {
    switch (category) {
      case "frontend": return <MonitorSmartphone size={24} />;
      case "backend": return <Server size={24} />;
      case "ai": return <BrainCircuit size={24} />;
      default: return <Briefcase size={24} />;
    }
  }
  if (type === "project") {
    switch (category) {
      case "star": return <Star size={24} />;
      default: return <Code size={24} />;
    }
  }
  return null;
};

const InfoCard = (props: InfoCardProps) => {
  const colSpan = props.gridSpan?.col || 3;
  const tagsToShow = colSpan <= 2 ? 3 : colSpan === 3 ? 4 : 6;

  return (
    <motion.button
      onClick={props.onViewDetails}
      style={{
        width: "100%",
        height: "100%",
        minHeight: 288,
        textAlign: "left",
        position: "relative",
        overflow: "hidden",
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 12,
        cursor: "pointer",
        padding: 0,
        color: "inherit",
        fontFamily: "inherit",
      }}
      whileHover={{ scale: 1.015, y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      aria-label={`View details for ${props.type}: ${props.title}${props.company ? ` at ${props.company}` : ""}`}
    >
      {/* Top accent gradient line */}
      <Box
        sx={{
          position: "absolute", top: 0, left: 0, right: 0, height: 1,
          background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.3), transparent)",
          opacity: 0,
          transition: "opacity 0.5s ease",
          "button:hover &": { opacity: 1 },
        }}
      />

      {/* Card content */}
      <Box sx={{ height: "100%", position: "relative" }}>
        <Box sx={{ height: "100%", p: 2.5, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          {/* Top Section */}
          <Box>
            <Stack direction="row" spacing={1.5} sx={{ alignItems: "flex-start" }}>
              <Box sx={{ color: alpha("#38bdf8", 0.7), flexShrink: 0, mt: 0.25 }}>
                {renderIcon(props.type, props.category)}
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="body1" sx={{ fontWeight: 700, color: "primary.light", lineHeight: 1.2, fontSize: { xs: "1rem", sm: "1.125rem" } }}>
                  {props.title}
                </Typography>
                {props.company && (
                  <Typography variant="body2" sx={{ color: alpha("#94a3b8", 0.8), fontWeight: 500, mt: 0.25 }}>
                    {props.company}
                  </Typography>
                )}
              </Box>
            </Stack>
          </Box>

          {/* Spotlight metrics */}
          {props.cardSpotlight && <CardSpotlight items={props.cardSpotlight} />}

          {/* Bottom Section */}
          <Box>
            <Stack direction="row" sx={{ flexWrap: "wrap" }} spacing={0.75} useFlexGap>
              {props.tech.slice(0, tagsToShow).map((t) => (
                <Chip
                  key={t}
                  icon={<TechIcon tech={t} />}
                  label={t}
                  size="small"
                  variant="outlined"
                  sx={{
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    ...(t === props.keyTech
                      ? {
                          bgcolor: alpha("#38bdf8", 0.1),
                          color: "primary.light",
                          borderColor: alpha("#38bdf8", 0.2),
                        }
                      : {
                          bgcolor: "rgba(255,255,255,0.04)",
                          color: "text.secondary",
                          borderColor: "rgba(255,255,255,0.06)",
                        }),
                  }}
                />
              ))}
            </Stack>
            {props.displayDate && (
              <Typography
                variant="caption"
                sx={{ display: "block", textAlign: "right", mt: 1.5, fontFamily: "monospace", color: "text.disabled" }}
              >
                {props.displayDate}
              </Typography>
            )}
          </Box>
        </Box>

        {/* Hover overlay */}
        <Box
          sx={{
            position: "absolute", inset: 0, display: "flex",
            alignItems: "center", justifyContent: "center",
            borderRadius: 3,
            bgcolor: alpha("#030712", 0.6),
            backdropFilter: "blur(3px)",
            opacity: 0,
            transition: "opacity 0.3s ease-out",
            "button:hover &": { opacity: 1 },
          }}
        >
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <Eye size={18} />
            <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary" }}>
              Click for details
            </Typography>
          </Stack>
        </Box>
      </Box>
    </motion.button>
  );
};

export default InfoCard;