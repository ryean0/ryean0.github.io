/* Filename: src/app/components/ProjectsPage/ProjectSectionClient.tsx */

"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import { alpha } from "@mui/material/styles";
import { ArrowUpRight, Code2 } from "lucide-react";
import type { ProjectData } from "@/data/siteConfig";
import FadeIn from "../FadeIn";
import TechIcon from "../AboutPage/TechIcon";
import ProjectModal from "./ProjectModal";

interface ProjectSectionProps {
  projects: ProjectData[];
}

const ProjectSectionClient = ({ projects }: ProjectSectionProps) => {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(
    null
  );

  return (
    <>
      <Box component="section" id="projects" sx={{ py: 12 }}>
        <FadeIn>
          <Typography
            variant="h2"
            sx={{ textAlign: "center", mb: 2, color: "text.primary" }}
          >
            Projects
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              color: "text.secondary",
              mb: 6,
              maxWidth: "32rem",
              mx: "auto",
            }}
          >
            Selected engineering projects showcasing distributed systems,
            containerisation, and full-stack development.
          </Typography>
        </FadeIn>

        <Grid container spacing={2.5}>
          {projects.map((project, index) => (
            <Grid key={project.id} size={{ xs: 12, md: 6 }}>
              <FadeIn delay={index * 0.1} className="h-full">
                <motion.div
                  layoutId={`card-container-${project.id}`}
                  style={{ height: "100%" }}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Paper
                    elevation={0}
                    onClick={() =>
                      project.details && setSelectedProject(project)
                    }
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (
                        (e.key === "Enter" || e.key === " ") &&
                        project.details
                      ) {
                        e.preventDefault();
                        setSelectedProject(project);
                      }
                    }}
                    aria-label={`View details for ${project.title}`}
                    sx={{
                      p: 3,
                      height: "100%",
                      minHeight: 280,
                      display: "flex",
                      flexDirection: "column",
                      cursor: project.details ? "pointer" : "default",
                      borderRadius: 3,
                      bgcolor: "rgba(15,23,42,0.5)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                      "&:hover": {
                        borderColor: alpha("#38bdf8", 0.3),
                        bgcolor: "rgba(15,23,42,0.7)",
                        boxShadow: `0 12px 32px -8px ${alpha("#38bdf8", 0.15)}`,
                      },
                      "&:focus-visible": {
                        outline: `2px solid ${alpha("#38bdf8", 0.6)}`,
                        outlineOffset: 2,
                      },
                    }}
                  >
                    {/* Header row */}
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-start"
                      mb={2}
                    >
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: alpha("#38bdf8", 0.1),
                          color: "primary.light",
                          border: `1px solid ${alpha("#38bdf8", 0.2)}`,
                        }}
                      >
                        <Code2 size={20} />
                      </Box>
                      <Chip
                        label={project.category}
                        size="small"
                        sx={{
                          bgcolor: "rgba(255,255,255,0.04)",
                          color: "text.secondary",
                          fontSize: "0.7rem",
                          border: "1px solid rgba(255,255,255,0.06)",
                        }}
                      />
                    </Stack>

                    {/* Title */}
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: "text.primary",
                        mb: 1,
                        fontSize: "1.1rem",
                        lineHeight: 1.3,
                      }}
                    >
                      {project.title}
                    </Typography>

                    {/* Date */}
                    <Typography
                      variant="caption"
                      sx={{
                        fontFamily: "var(--font-geist-mono), monospace",
                        color: "text.disabled",
                        fontSize: "0.72rem",
                        mb: 2,
                        display: "block",
                      }}
                    >
                      {project.displayDate}
                    </Typography>

                    {/* Headline (from details) */}
                    {project.details?.headline && (
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          lineHeight: 1.6,
                          fontSize: "0.85rem",
                          mb: "auto",
                        }}
                      >
                        {project.details.headline}
                      </Typography>
                    )}

                    {/* Tech chips */}
                    <Stack
                      direction="row"
                      spacing={0.75}
                      useFlexGap
                      flexWrap="wrap"
                      sx={{ mt: 2.5 }}
                    >
                      {project.tech.slice(0, 4).map((t) => (
                        <Chip
                          key={t}
                          icon={<TechIcon tech={t} className="h-3.5 w-3.5" />}
                          label={t}
                          size="small"
                          variant="outlined"
                          sx={{
                            fontSize: "0.7rem",
                            height: 22,
                            borderColor: "rgba(255,255,255,0.08)",
                            color: "text.secondary",
                          }}
                        />
                      ))}
                      {project.tech.length > 4 && (
                        <Chip
                          label={`+${project.tech.length - 4}`}
                          size="small"
                          sx={{
                            fontSize: "0.7rem",
                            height: 22,
                            bgcolor: "rgba(255,255,255,0.04)",
                            color: "text.disabled",
                          }}
                        />
                      )}
                    </Stack>

                    {/* View-details CTA */}
                    {project.details && (
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{
                          mt: 2,
                          pt: 2,
                          borderTop: "1px solid rgba(255,255,255,0.04)",
                        }}
                      >
                        <Button
                          size="small"
                          endIcon={<ArrowUpRight size={14} />}
                          sx={{
                            color: "primary.light",
                            textTransform: "none",
                            fontSize: "0.8rem",
                            p: 0,
                            minWidth: "auto",
                            "&:hover": { bgcolor: "transparent" },
                          }}
                          // Keep focus state independent of the card click handler
                          tabIndex={-1}
                        >
                          View case study
                        </Button>
                      </Stack>
                    )}
                  </Paper>
                </motion.div>
              </FadeIn>
            </Grid>
          ))}
        </Grid>
      </Box>

      <AnimatePresence>
        {selectedProject && selectedProject.details && (
          <ProjectModal
            key="modal"
            details={{
              ...selectedProject.details,
              image: selectedProject.image,
              title: selectedProject.title,
              tech: selectedProject.tech,
            }}
            layoutId={`card-container-${selectedProject.id}`}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectSectionClient;
