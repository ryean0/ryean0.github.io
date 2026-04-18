// FILE: src/app/components/Education.tsx  — FULL REPLACEMENT
//
// The Education section now renders ONLY the EducationTimeline.
// The UCLA card (and all milestone detail cards) are rendered exclusively
// inside EducationMilestoneModal when the user clicks a timeline node.
// No card is shown by default — only the timeline + empty placeholder.

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { alpha } from "@mui/material/styles";
import EducationTimeline from "./EducationTimeline";
import { siteConfig } from "@/data/siteConfig";

const Education = () => {
  const { education, availableForWork } = siteConfig;

  return (
    <Box sx={{ width: "100%" }}>
      {/* ── Horizontal Education Timeline (sole primary content) ─── */}
      <EducationTimeline />

      {/* ── Availability note (preserved from original) ─────────── */}
      {availableForWork && (
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Chip
            icon={
              <Box sx={{ position: "relative", display: "flex", width: 8, height: 8 }}>
                <Box
                  sx={{
                    "@keyframes ping": {
                      "75%, 100%": { transform: "scale(2)", opacity: 0 },
                    },
                    animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite",
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    bgcolor: "#34d399",
                    opacity: 0.75,
                  }}
                />
                <Box
                  sx={{
                    position: "relative",
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: "#10b981",
                  }}
                />
              </Box>
            }
            label={`Available for Full-Time Opportunities Starting ${education.graduationDate}`}
            variant="outlined"
            sx={{
              color: "#34d399",
              fontWeight: 500,
              fontSize: "0.875rem",
              borderColor: alpha("#34d399", 0.12),
              bgcolor: alpha("#34d399", 0.06),
              px: 1,
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default Education;