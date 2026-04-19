/* Filename: src/app/components/ExperiencePage/ExperienceSectionClient.tsx */

"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FadeIn from "../FadeIn";
import ExperienceTimeline from "./ExperienceTimeline";
import type { Experience } from "@/data/siteConfig";

interface ExperienceSectionProps {
  experiences: Experience[];
}

const ExperienceSectionClient = ({ experiences }: ExperienceSectionProps) => {
  return (
    <Box component="section" id="experience" sx={{ py: 12 }}>
      <FadeIn>
        <Typography
          variant="h2"
          sx={{ textAlign: "center", mb: 2, color: "text.primary" }}
        >
          Work Experience
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
          Professional roles spanning cloud infrastructure, backend systems, and
          full-stack development. Select a milestone to explore.
        </Typography>
      </FadeIn>

      <FadeIn delay={0.15}>
        <ExperienceTimeline experiences={experiences} />
      </FadeIn>
    </Box>
  );
};

export default ExperienceSectionClient;
