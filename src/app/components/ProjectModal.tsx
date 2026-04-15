/* Filename: src/app/components/ProjectModal.tsx */

"use client";

import { ProjectData } from "@/data/siteConfig";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import { alpha } from "@mui/material/styles";
import {
  X, ExternalLink, GitBranch, Globe, LucideIcon,
  Zap, Lightbulb, Target, Wrench, CheckCircle2,
} from "lucide-react";
import { useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { motion } from "framer-motion";
import TechIcon from "./TechIcon";
import { Section, ImpactCard } from "./ExperienceModal";

interface ProjectModalProps {
  details: ProjectData["details"] & {
    image?: string;
    title?: string;
    tech?: string[];
  };
  onClose: () => void;
  layoutId: string;
}

const IconMap: Record<string, LucideIcon> = { ExternalLink, GitBranch, Globe };

const ProjectModal = ({ details, onClose, layoutId }: ProjectModalProps) => {
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
          width: "100%", maxWidth: 1024,
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
              {/* Header with project links */}
              <Stack direction="row" spacing={3} sx={{ justifyContent: "space-between", alignItems: "flex-start" }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: "1.5rem", md: "1.875rem" },
                    backgroundImage: "linear-gradient(90deg, #38bdf8, #a5b4fc)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {details.headline}
                </Typography>
                {details.links && details.links.length > 0 && (
                  <Stack direction="row" spacing={1.5} sx={{ pt: 0.5, flexShrink: 0 }}>
                    {details.links.map((link) => {
                      const Icon = IconMap[link.icon];
                      return (
                        <IconButton
                          key={link.label}
                          component="a"
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={link.label}
                          title={link.label}
                          size="small"
                          sx={{ color: "text.disabled", "&:hover": { color: "primary.light" } }}
                        >
                          {Icon && <Icon size={20} />}
                        </IconButton>
                      );
                    })}
                  </Stack>
                )}
              </Stack>

              {/* Impact metrics */}
              {details.impact && details.impact.length > 0 && (
                <Grid container spacing={1.5}>
                  {details.impact.map((item) => (
                    <Grid key={item.text} size={{ xs: 12, md: 4 }}>
                      <ImpactCard value={item.value} text={item.text} />
                    </Grid>
                  ))}
                </Grid>
              )}

              {/* Problem / Solution */}
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, lg: 6 }}>
                  <Section icon={<Target size={20} />} title="The Problem">
                    <Typography variant="body2">{details.problem}</Typography>
                  </Section>
                </Grid>
                <Grid size={{ xs: 12, lg: 6 }}>
                  <Section icon={<Wrench size={20} />} title="The Solution">
                    <Typography variant="body2">{details.solution}</Typography>
                  </Section>
                </Grid>
              </Grid>

              {/* Code Spotlight */}
              {details.techHighlight && (
                <Section
                  icon={<Lightbulb size={20} />}
                  title={details.techHighlight.title || "Technical Highlight"}
                >
                  <Grid container spacing={2.5} sx={{ mt: 2 }}>
                    <Grid size={{ xs: 12, lg: 7 }}>
                      <Box sx={{ borderRadius: 3, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <SyntaxHighlighter
                          language={details.techHighlight.language}
                          style={vscDarkPlus}
                          customStyle={{
                            margin: 0, padding: "1.25rem", fontSize: "0.8rem",
                            lineHeight: "1.6", backgroundColor: "#080d1a",
                          }}
                          wrapLines showLineNumbers
                        >
                          {details.techHighlight.code}
                        </SyntaxHighlighter>
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 12, lg: 5 }}>
                      <Stack spacing={2}>
                        {details.techHighlight.points.map((point, i) => (
                          <Stack key={i} direction="row" spacing={1.5} sx={{ alignItems: "flex-start" }}>
                            <CheckCircle2 size={16} style={{ color: alpha("#38bdf8", 0.7), marginTop: 2, flexShrink: 0 }} />
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary" }}>
                                {point.title}
                              </Typography>
                              <Typography variant="caption" sx={{ color: "text.secondary", mt: 0.25, lineHeight: 1.5 }}>
                                {point.description}
                              </Typography>
                            </Box>
                          </Stack>
                        ))}
                      </Stack>
                    </Grid>
                  </Grid>
                </Section>
              )}

              {/* Core Technologies */}
              {details.tech && details.tech.length > 0 && (
                <Section icon={<Zap size={20} />} title="Core Technologies">
                  <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap", mt: 0.5 }}>
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

export default ProjectModal;