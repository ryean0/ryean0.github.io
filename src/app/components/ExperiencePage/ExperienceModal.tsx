/* Filename: src/app/components/ExperienceModal.tsx */

"use client";

import { ExperienceData } from "@/data/siteConfig";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import { alpha } from "@mui/material/styles";
import {
  X, Lightbulb, Target, Wrench, Zap,
  FileText, Presentation, ExternalLink, GitBranch, Globe,
  LucideIcon,
} from "lucide-react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import TechIcon from "@/app/components/AboutPage/TechIcon";

/* ── Reusable Section heading ── */
export const Section = ({
  icon, title, children, className,
}: {
  icon: React.ReactNode; title: string; children: React.ReactNode; className?: string;
}) => (
  <Box className={className}>
    <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 1.5 }}>
      {icon}
      <Typography variant="body1" sx={{ fontWeight: 700, color: "primary.light" }}>
        {title}
      </Typography>
    </Stack>
    <Box sx={{ color: "text.secondary", lineHeight: 1.6, fontSize: "0.875rem" }}>
      {children}
    </Box>
  </Box>
);

/* ── Reusable Impact metric card ── */
export const ImpactCard = ({ value, text }: { value: string; text: string }) => (
  <Paper
    elevation={0}
    sx={{
      position: "relative", p: 2.5, borderRadius: 3, textAlign: "center", height: "100%",
      bgcolor: "rgba(255,255,255,0.03)", overflow: "hidden",
    }}
  >
    <Box
      sx={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(90deg, transparent, ${alpha("#38bdf8", 0.4)}, transparent)`,
      }}
    />
    <Typography variant="h4" sx={{ fontWeight: 700, color: "primary.main", fontSize: "1.875rem" }}>
      {value}
    </Typography>
    <Typography variant="caption" sx={{ color: "text.secondary", mt: 0.75, lineHeight: 1.5 }}>
      {text}
    </Typography>
  </Paper>
);

const IconMap: Record<string, LucideIcon> = {
  FileText, Presentation, ExternalLink, GitBranch, Globe,
};

interface ExperienceModalProps {
  details: ExperienceData | undefined;
  onClose: () => void;
  layoutId: string;
}

const ExperienceModal = ({ details, onClose, layoutId }: ExperienceModalProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  if (!details) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      style={{
        position: "fixed", inset: 0,
        backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
        zIndex: 1300, display: "flex", alignItems: "center", justifyContent: "center",
        padding: 16,
      }}
      onClick={onClose}
    >
      <motion.div
        layoutId={layoutId}
        style={{
          background: "#0c1222",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 16,
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.4)",
          width: "100%", maxWidth: 896,
          maxHeight: "90vh", position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Box sx={{ overflowY: "auto", height: "100%", p: { xs: 3, md: 4 } }}>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.25, delay: 0.12, ease: "easeOut" }}
          >
            <Stack spacing={3.5}>
              {/* Header */}
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, color: "primary.light", fontSize: { xs: "1.5rem", md: "1.875rem" } }}>
                  {details.title}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: "text.secondary", mt: 0.5 }}>
                  {details.company}
                </Typography>
              </Box>

              {/* Impact metrics */}
              <Grid container spacing={1.5}>
                {details.details?.impact.map((item) => (
                  <Grid key={item.text} size={{ xs: 12, md: 4 }}>
                    <ImpactCard value={item.value} text={item.text} />
                  </Grid>
                ))}
              </Grid>

              {/* Problem / Solution */}
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, lg: 6 }}>
                  <Section icon={<Target size={20} />} title="The Problem">
                    <Typography variant="body2">{details.details?.problem}</Typography>
                  </Section>
                </Grid>
                <Grid size={{ xs: 12, lg: 6 }}>
                  <Section icon={<Wrench size={20} />} title="The Solution">
                    <Typography variant="body2">{details.details?.solution}</Typography>
                  </Section>
                </Grid>
              </Grid>

              {/* Work Samples */}
              {details.details?.links && details.details.links.length > 0 && (
                <Section icon={<Lightbulb size={20} />} title="Work Samples">
                  <Grid container spacing={1.5} sx={{ mt: 1 }}>
                    {details.details.links.slice(0, 2).map((link) => {
                      const Icon = IconMap[link.icon];
                      return (
                        <Grid key={link.label} size={{ xs: 12, sm: 6 }}>
                          <Button
                            component="a"
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            fullWidth
                            variant="outlined"
                            startIcon={Icon ? <Icon size={16} /> : undefined}
                            sx={{
                              justifyContent: "center",
                              py: 1.5,
                              borderRadius: 3,
                              borderColor: "rgba(255,255,255,0.06)",
                              bgcolor: "rgba(255,255,255,0.03)",
                              color: "text.primary",
                              fontWeight: 600,
                              fontSize: "0.875rem",
                              textTransform: "none",
                              "&:hover": {
                                bgcolor: "rgba(255,255,255,0.06)",
                                borderColor: alpha("#38bdf8", 0.2),
                                color: "primary.light",
                              },
                            }}
                          >
                            {link.label}
                          </Button>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Section>
              )}

              {/* Core Technologies */}
              {details.tech && (
                <Section icon={<Zap size={20} />} title="Core Technologies">
                  <Stack direction="row" sx={{ flexWrap: "wrap" }} spacing={1} useFlexGap>
                    {details.tech.map((t) => (
                      <Chip
                        key={t}
                        icon={<TechIcon tech={t} className="h-3.5 w-3.5" />}
                        label={t}
                        variant="outlined"
                        size="small"
                        sx={{ fontWeight: 500, fontSize: "0.875rem" }}
                      />
                    ))}
                  </Stack>
                </Section>
              )}
            </Stack>
          </motion.div>
        </Box>

        {/* Close button */}
        <IconButton
          onClick={onClose}
          aria-label="Close modal"
          sx={{
            position: "absolute", top: 16, right: 16, zIndex: 10,
            color: "text.disabled",
            bgcolor: "rgba(255,255,255,0.04)",
            "&:hover": { color: "text.primary", bgcolor: "rgba(255,255,255,0.08)" },
          }}
          size="small"
        >
          <X size={20} />
        </IconButton>
      </motion.div>
    </motion.div>
  );
};

export default ExperienceModal;