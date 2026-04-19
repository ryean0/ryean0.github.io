/* Filename: src/app/components/ProjectSectionClient.tsx */

"use client";

import { useState } from "react";
import { ProjectData } from "@/data/siteConfig";
import { AnimatePresence, motion } from "framer-motion";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FadeIn from "../FadeIn";
import InfoCard from "../AboutPage/InfoCard";
import ProjectModal from "./ProjectModal";

interface ProjectSectionProps {
  projects: ProjectData[];
}

const colSpanMap: Record<number, number> = { 1: 2, 2: 4, 3: 6, 4: 8, 5: 10, 6: 12 };

const ProjectSectionClient = ({ projects }: ProjectSectionProps) => {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  return (
    <>
      <Box component="section" id="projects" sx={{ py: 12 }}>
        <FadeIn>
          <Typography variant="h2" sx={{ textAlign: "center", mb: 2, color: "text.primary" }}>
            Projects
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "center", color: "text.secondary", mb: 6, maxWidth: "32rem", mx: "auto" }}>
            Selected engineering projects showcasing distributed systems, containerisation, and full-stack development.
          </Typography>
        </FadeIn>
        <Grid container spacing={2}>
          {projects.map((project, index) => {
            const colSpan = project.gridSpan?.col || 3;
            const mdSize = colSpanMap[colSpan] || 6;
            return (
              <Grid key={project.id} size={{ xs: 12, md: mdSize }}>
                <FadeIn delay={index * 0.1} className="h-full">
                  <motion.div layoutId={`card-container-${project.id}`} style={{ height: "100%" }}>
                    <InfoCard
                      type="project"
                      {...project}
                      onViewDetails={() => setSelectedProject(project)}
                    />
                  </motion.div>
                </FadeIn>
              </Grid>
            );
          })}
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