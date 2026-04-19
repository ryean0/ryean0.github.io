// FILE: src/app/components/ExperiencePage/ExperienceTimelineModal.tsx — NEW FILE
// Inline reveal panel (not a MUI Dialog). Mirrors EducationMilestoneModal.
"use client";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { alpha } from "@mui/material/styles";
import {
  Calendar,
  MapPin,
  Award,
  Zap,
  Users,
  X,
  FileText,
  GitBranch,
  Globe,
  Presentation,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import type { Experience, WorkSample } from "@/data/siteConfig";
import TechIcon from "@/app/components/AboutPage/TechIcon";

// ─── Props ──────────────────────────────────────────────────────────
interface ExperienceTimelineModalProps {
  experience: Experience;
  accentColor: string;
  categoryLabel: string;
  onClose: () => void;
}

// ─── WorkSample type → icon map ──────────────────────────────────────
const SAMPLE_ICON: Record<WorkSample["type"], LucideIcon> = {
  document: FileText,
  repository: GitBranch,
  demo: Presentation,
  live: Globe,
};

// ─── Impact stat sub-component ───────────────────────────────────────
function ImpactStat({
  value,
  text,
  accentColor,
}: {
  value: string;
  text: string;
  accentColor: string;
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 1.75,
        borderRadius: 2,
        textAlign: "center",
        height: "100%",
        bgcolor: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.05)",
        transition: "border-color 0.2s ease",
        "&:hover": { borderColor: alpha(accentColor, 0.25) },
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          color: accentColor,
          fontSize: "1.35rem",
          lineHeight: 1.2,
        }}
      >
        {value}
      </Typography>
      <Typography
        variant="caption"
        sx={{
          color: "text.secondary",
          display: "block",
          mt: 0.5,
          fontSize: "0.7rem",
          lineHeight: 1.45,
        }}
      >
        {text}
      </Typography>
    </Paper>
  );
}

// ─── Main Component ──────────────────────────────────────────────────
export default function ExperienceTimelineModal({
  experience,
  accentColor,
  categoryLabel,
  onClose,
}: ExperienceTimelineModalProps) {
  const {
    company,
    companyDesc,
    role,
    team,
    summary,
    location,
    locationType,
    dateStart,
    dateEnd,
    isCurrent,
    achievements,
    tech,
    impact,
    workSamples,
  } = experience;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
    >
      <Paper
        elevation={0}
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 3,
          border: `1px solid ${alpha(accentColor, 0.2)}`,
          bgcolor: "rgba(15,23,42,0.85)",
          backdropFilter: "blur(12px)",
          p: 0,
        }}
      >
        <Box sx={{ position: "relative", zIndex: 1, p: { xs: 2.5, md: 3 } }}>
          {/* Header row: category badge + close */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            mb={2}
          >
            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
              <Chip
                label={categoryLabel}
                size="small"
                sx={{
                  bgcolor: alpha(accentColor, 0.15),
                  color: accentColor,
                  border: `1px solid ${alpha(accentColor, 0.3)}`,
                  fontWeight: 700,
                  fontSize: "0.7rem",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  height: 24,
                }}
              />
              {isCurrent && (
                <Chip
                  label="Current"
                  size="small"
                  sx={{
                    bgcolor: alpha("#34d399", 0.12),
                    color: "#34d399",
                    border: `1px solid ${alpha("#34d399", 0.3)}`,
                    fontWeight: 700,
                    fontSize: "0.68rem",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    height: 24,
                  }}
                />
              )}
            </Stack>
            <IconButton
              onClick={onClose}
              size="small"
              aria-label="Close experience details"
              sx={{
                color: "text.disabled",
                width: 28,
                height: 28,
                "&:hover": {
                  color: "text.primary",
                  bgcolor: "rgba(255,255,255,0.06)",
                },
              }}
            >
              <X size={14} />
            </IconButton>
          </Stack>

          {/* Role */}
          <Typography
            variant="h6"
            color="text.primary"
            fontWeight={700}
            lineHeight={1.3}
            mb={0.5}
            sx={{ fontSize: { xs: "1rem", md: "1.15rem" } }}
          >
            {role}
          </Typography>

          {/* Company + team */}
          <Typography
            variant="subtitle2"
            sx={{
              color: accentColor,
              fontWeight: 500,
              mb: 1,
              fontSize: "0.88rem",
            }}
          >
            {company}
            {team && (
              <Box component="span" sx={{ color: "text.disabled", fontWeight: 400 }}>
                {" · "}
                {team}
              </Box>
            )}
          </Typography>

          {/* Meta chips */}
          <Stack direction="row" spacing={1} flexWrap="wrap" mb={2} useFlexGap>
            <Chip
              icon={<Calendar size={12} />}
              label={`${dateStart} – ${dateEnd}`}
              size="small"
              sx={{
                bgcolor: "rgba(255,255,255,0.04)",
                color: "text.secondary",
                border: "1px solid rgba(255,255,255,0.08)",
                fontSize: "0.75rem",
                height: 24,
              }}
            />
            <Chip
              icon={<MapPin size={12} />}
              label={`${location} · ${locationType}`}
              size="small"
              sx={{
                bgcolor: "rgba(255,255,255,0.04)",
                color: "text.secondary",
                border: "1px solid rgba(255,255,255,0.08)",
                fontSize: "0.75rem",
                height: 24,
                textTransform: "capitalize",
              }}
            />
          </Stack>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.05)", mb: 2 }} />

          {/* Summary */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.72, fontSize: "0.875rem", mb: 2 }}
          >
            {summary}
          </Typography>

          {/* Company blurb */}
          {companyDesc && (
            <Typography
              variant="caption"
              color="text.disabled"
              sx={{
                display: "block",
                fontStyle: "italic",
                lineHeight: 1.6,
                fontSize: "0.75rem",
                mb: 2.5,
              }}
            >
              {companyDesc}
            </Typography>
          )}

          {/* Impact metrics */}
          {impact && impact.length > 0 && (
            <Box mb={2.5}>
              <Stack direction="row" spacing={1} alignItems="center" mb={1.25}>
                <Award size={14} color={accentColor} />
                <Typography
                  variant="overline"
                  sx={{
                    fontSize: "0.68rem",
                    color: "text.secondary",
                    letterSpacing: "0.1em",
                  }}
                >
                  Quantified Impact
                </Typography>
              </Stack>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "repeat(2, 1fr)",
                    md: `repeat(${Math.min(impact.length, 4)}, 1fr)`,
                  },
                  gap: 1.25,
                }}
              >
                {impact.map((m, i) => (
                  <ImpactStat
                    key={i}
                    value={m.value}
                    text={m.text}
                    accentColor={accentColor}
                  />
                ))}
              </Box>
            </Box>
          )}

          {/* Achievements */}
          {achievements && achievements.length > 0 && (
            <Box mb={2.5}>
              <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                <Users size={14} color={accentColor} />
                <Typography
                  variant="overline"
                  sx={{
                    fontSize: "0.68rem",
                    color: "text.secondary",
                    letterSpacing: "0.1em",
                  }}
                >
                  Key Achievements
                </Typography>
              </Stack>
              <Stack spacing={0.75}>
                {achievements.map((a, i) => (
                  <Stack
                    key={i}
                    direction="row"
                    spacing={1.5}
                    alignItems="flex-start"
                  >
                    <Box
                      sx={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        bgcolor: accentColor,
                        mt: "0.5em",
                        flexShrink: 0,
                      }}
                    />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: "0.85rem", lineHeight: 1.6 }}
                    >
                      {a}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>
          )}

          {/* Tech */}
          {tech && tech.length > 0 && (
            <Box mb={workSamples && workSamples.length > 0 ? 2.5 : 0}>
              <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                <Zap size={14} color={accentColor} />
                <Typography
                  variant="overline"
                  sx={{
                    fontSize: "0.68rem",
                    color: "text.secondary",
                    letterSpacing: "0.1em",
                  }}
                >
                  Core Technologies
                </Typography>
              </Stack>
              <Stack direction="row" flexWrap="wrap" spacing={0.75} useFlexGap>
                {tech.map((t) => (
                  <Chip
                    key={t}
                    icon={<TechIcon tech={t} className="h-3.5 w-3.5" />}
                    label={t}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderColor: "rgba(255,255,255,0.1)",
                      color: "text.secondary",
                      fontSize: "0.72rem",
                      height: 24,
                      transition: "all 0.2s ease",
                      "&:hover": {
                        borderColor: alpha(accentColor, 0.4),
                        color: "text.primary",
                        bgcolor: alpha(accentColor, 0.06),
                      },
                    }}
                  />
                ))}
              </Stack>
            </Box>
          )}

          {/* Work samples */}
          {workSamples && workSamples.length > 0 && (
            <Box>
              <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                <FileText size={14} color={accentColor} />
                <Typography
                  variant="overline"
                  sx={{
                    fontSize: "0.68rem",
                    color: "text.secondary",
                    letterSpacing: "0.1em",
                  }}
                >
                  Work Samples
                </Typography>
              </Stack>
              <Stack direction="row" flexWrap="wrap" spacing={1} useFlexGap>
                {workSamples.map((s) => {
                  const Icon = SAMPLE_ICON[s.type];
                  const isLinkable = s.url && s.url !== "#";
                  return (
                    <Button
                      key={s.label}
                      component={isLinkable ? "a" : "button"}
                      href={isLinkable ? s.url : undefined}
                      target={isLinkable ? "_blank" : undefined}
                      rel={isLinkable ? "noopener noreferrer" : undefined}
                      disabled={!isLinkable}
                      size="small"
                      variant="outlined"
                      startIcon={<Icon size={13} />}
                      sx={{
                        py: 0.5,
                        px: 1.25,
                        borderRadius: 2,
                        borderColor: "rgba(255,255,255,0.1)",
                        bgcolor: "rgba(255,255,255,0.03)",
                        color: "text.secondary",
                        fontSize: "0.72rem",
                        fontWeight: 500,
                        textTransform: "none",
                        "&:hover": {
                          borderColor: alpha(accentColor, 0.5),
                          bgcolor: alpha(accentColor, 0.08),
                          color: accentColor,
                        },
                        "&.Mui-disabled": {
                          color: "text.disabled",
                          borderColor: "rgba(255,255,255,0.05)",
                        },
                      }}
                    >
                      {s.label}
                    </Button>
                  );
                })}
              </Stack>
            </Box>
          )}
        </Box>
      </Paper>
    </motion.div>
  );
}
