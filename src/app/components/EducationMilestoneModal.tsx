// FILE: src/app/components/EducationMilestoneModal.tsx  — NEW FILE
// (Renamed from EducationModal to avoid confusion with MUI Modal semantics —
//  this is an inline reveal panel, not a dialog overlay)
"use client";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import { alpha } from "@mui/material/styles";
import { Calendar, MapPin, Award, BookOpen, Users, X } from "lucide-react";
import { motion } from "framer-motion";
import type { EducationMilestone, CampusActivity } from "@/data/siteConfig";

// ─── Props ────────────────────────────────────────────────────────────────────
interface EducationMilestoneModalProps {
  milestone: EducationMilestone;
  accentColor: string;
  onClose: () => void;
}

// ─── Sub-component: Activity Card ────────────────────────────────────────────
function ActivityCard({
  activity,
  accentColor,
}: {
  activity: CampusActivity;
  accentColor: string;
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 1.5,
        borderRadius: 2,
        bgcolor: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.05)",
        transition: "border-color 0.2s ease",
        "&:hover": { borderColor: alpha(accentColor, 0.2) },
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        mb={0.5}
      >
        <Typography variant="body2" fontWeight={600} color="text.primary">
          {activity.name}
        </Typography>
        <Typography
          variant="caption"
          sx={{ fontFamily: "monospace", color: "text.secondary", whiteSpace: "nowrap", ml: 1 }}
        >
          {activity.dateStart} – {activity.dateEnd}
        </Typography>
      </Stack>
      <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
        {activity.orgDesc}
      </Typography>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="caption" sx={{ color: accentColor, fontWeight: 500 }}>
          {activity.roleDesc}
        </Typography>
        {activity.timeCommit > 0 && (
          <>
            <Typography variant="caption" color="text.disabled">·</Typography>
            <Typography variant="caption" color="text.disabled">
              {activity.timeCommit} hrs
            </Typography>
          </>
        )}
      </Stack>
    </Paper>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function EducationMilestoneModal({
  milestone,
  accentColor,
  onClose,
}: EducationMilestoneModalProps) {
  const {
    type,
    typeLabel,
    institution,
    location,
    period,
    description,
    degree,
    gpa,
    honors,
    courses,
    achievements,
    activities,
    backgroundImage,
  } = milestone;

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
        {/* Background image (absolute, low opacity) */}
        {backgroundImage && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.07,
              filter: "blur(2px)",
              zIndex: 0,
              borderRadius: "inherit",
            }}
          />
        )}

        {/* Content layer */}
        <Box sx={{ position: "relative", zIndex: 1, p: { xs: 2.5, md: 3 } }}>
          {/* Header row: type badge + close button */}
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
            <Chip
              label={typeLabel}
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
            <IconButton
              onClick={onClose}
              size="small"
              sx={{
                color: "text.disabled",
                width: 28,
                height: 28,
                "&:hover": { color: "text.primary", bgcolor: "rgba(255,255,255,0.06)" },
              }}
            >
              <X size={14} />
            </IconButton>
          </Stack>

          {/* Institution */}
          <Typography
            variant="h6"
            color="text.primary"
            fontWeight={700}
            lineHeight={1.3}
            mb={0.5}
            sx={{ fontSize: { xs: "1rem", md: "1.1rem" } }}
          >
            {institution}
          </Typography>

          {/* Degree (conditional) */}
          {degree && (
            <Typography
              variant="subtitle2"
              sx={{ color: accentColor, fontWeight: 500, mb: 1, fontSize: "0.88rem" }}
            >
              {degree}
            </Typography>
          )}

          {/* Meta chips: period, location, GPA */}
          <Stack direction="row" spacing={1} flexWrap="wrap" mb={2} useFlexGap>
            <Chip
              icon={<Calendar size={12} />}
              label={period}
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
              label={location}
              size="small"
              sx={{
                bgcolor: "rgba(255,255,255,0.04)",
                color: "text.secondary",
                border: "1px solid rgba(255,255,255,0.08)",
                fontSize: "0.75rem",
                height: 24,
              }}
            />
            {gpa && (
              <Chip
                icon={<Award size={12} />}
                label={`GPA: ${gpa}`}
                size="small"
                sx={{
                  bgcolor: alpha("#34d399", 0.08),
                  color: "#34d399",
                  border: `1px solid ${alpha("#34d399", 0.2)}`,
                  fontSize: "0.75rem",
                  height: 24,
                }}
              />
            )}
          </Stack>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.05)", mb: 2 }} />

          {/* Description */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.72, fontSize: "0.875rem", mb: 2 }}
          >
            {description}
          </Typography>

          {/* Achievements (bullet list) */}
          {achievements && achievements.length > 0 && (
            <Box mb={2}>
              <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                <Award size={14} color={accentColor} />
                <Typography
                  variant="overline"
                  sx={{ fontSize: "0.68rem", color: "text.secondary", letterSpacing: "0.1em" }}
                >
                  Highlights
                </Typography>
              </Stack>
              <Stack spacing={0.75}>
                {achievements.map((a, i) => (
                  <Stack key={i} direction="row" spacing={1.5} alignItems="flex-start">
                    <Box
                      sx={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        bgcolor: accentColor,
                        mt: "0.45em",
                        flexShrink: 0,
                      }}
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.85rem", lineHeight: 1.6 }}>
                      {a}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>
          )}

          {/* Honors */}
          {honors && honors.length > 0 && (
            <Box mb={2}>
              <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                <Award size={14} color="#fbbf24" />
                <Typography
                  variant="overline"
                  sx={{ fontSize: "0.68rem", color: "text.secondary", letterSpacing: "0.1em" }}
                >
                  Honors & Awards
                </Typography>
              </Stack>
              <Stack spacing={0.5}>
                {honors.map((h, i) => (
                  <Stack key={i} direction="row" spacing={1.5} alignItems="flex-start">
                    <Box
                      sx={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        bgcolor: "#fbbf24",
                        mt: "0.45em",
                        flexShrink: 0,
                      }}
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.85rem", lineHeight: 1.6 }}>
                      {h}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>
          )}

          {/* Relevant Courses (university / graduation milestones) */}
          {courses && courses.length > 0 && (
            <Box mb={2}>
              <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                <BookOpen size={14} color={accentColor} />
                <Typography
                  variant="overline"
                  sx={{ fontSize: "0.68rem", color: "text.secondary", letterSpacing: "0.1em" }}
                >
                  Relevant Coursework
                </Typography>
              </Stack>
              <Stack direction="row" flexWrap="wrap" spacing={0.75} useFlexGap>
                {courses.map((c) => (
                  <Chip
                    key={c}
                    label={c}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderColor: "rgba(255,255,255,0.1)",
                      color: "text.secondary",
                      fontSize: "0.72rem",
                      height: 22,
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

          {/* Campus Activities (university milestone only) */}
          {activities && activities.length > 0 && (
            <Box>
              <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                <Users size={14} color="#818cf8" />
                <Typography
                  variant="overline"
                  sx={{ fontSize: "0.68rem", color: "text.secondary", letterSpacing: "0.1em" }}
                >
                  Campus Activities
                </Typography>
              </Stack>
              <Stack spacing={1}>
                {activities.map((act) => (
                  <ActivityCard
                    key={act.name}
                    activity={act}
                    accentColor={accentColor}
                  />
                ))}
              </Stack>
            </Box>
          )}
        </Box>
      </Paper>
    </motion.div>
  );
}