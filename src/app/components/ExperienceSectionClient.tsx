/* Filename: src/app/components/ExperienceSectionClient.tsx */

"use client";

import { useState } from "react";
import { ExperienceData } from "@/data/siteConfig";
import { AnimatePresence, motion } from "framer-motion";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FadeIn from "./FadeIn";
import InfoCard from "./InfoCard";
import ExperienceModal from "./ExperienceModal";

interface ExperienceSectionProps {
  experiences: ExperienceData[];
}

const colSpanMap: Record<number, number> = { 1: 2, 2: 4, 3: 6, 4: 8, 5: 10, 6: 12 };

const ExperienceSectionClient = ({ experiences }: ExperienceSectionProps) => {
  const [selectedExperience, setSelectedExperience] = useState<ExperienceData | null>(null);

  return (
    <>
      <Box component="section" id="experience" sx={{ py: 12 }}>
        <FadeIn>
          <Typography variant="h2" sx={{ textAlign: "center", mb: 2, color: "text.primary" }}>
            Work Experience
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "center", color: "text.secondary", mb: 6, maxWidth: "32rem", mx: "auto" }}>
            Professional roles spanning cloud infrastructure, backend systems, and frontend development.
          </Typography>
        </FadeIn>
        <Grid container spacing={2}>
          {experiences.map((job, index) => {
            const colSpan = job.gridSpan?.col || 3;
            const mdSize = colSpanMap[colSpan] || 6;
            return (
              <Grid key={job.id} size={{ xs: 12, md: mdSize }}>
                <FadeIn delay={index * 0.1} className="h-full">
                  <motion.div layoutId={`experience-card-${job.id}`} style={{ height: "100%" }}>
                    <InfoCard
                      type="experience"
                      {...job}
                      onViewDetails={() => setSelectedExperience(job)}
                    />
                  </motion.div>
                </FadeIn>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      <AnimatePresence>
        {selectedExperience && (
          <ExperienceModal
            key="experience-modal"
            details={selectedExperience}
            layoutId={`experience-card-${selectedExperience.id}`}
            onClose={() => setSelectedExperience(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ExperienceSectionClient;