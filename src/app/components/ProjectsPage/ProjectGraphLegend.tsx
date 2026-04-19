// FILE: src/app/components/ProjectsPage/ProjectGraphLegend.tsx — NEW FILE
"use client";

import { Box, Stack, Typography, Tooltip } from "@mui/material";
import { alpha } from "@mui/material/styles";
import type { ProjectDomain } from "@/data/profile/projectDomains";

interface ProjectGraphLegendProps {
  domains: ProjectDomain[];
}

/**
 * Compact legend mapping domain colours → labels + descriptions.
 * Sits beneath the graph canvas.
 */
export default function ProjectGraphLegend({ domains }: ProjectGraphLegendProps) {
  return (
    <Stack
      direction="row"
      spacing={0.75}
      useFlexGap
      sx={{
        flexWrap: "wrap",
        justifyContent: "center",
        mt: 2,
        px: 2,
      }}
    >
      {domains.map((d) => (
        <Tooltip key={d.id} title={d.description} arrow placement="top">
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.75,
              py: 0.5,
              px: 1.25,
              borderRadius: 4,
              bgcolor: alpha(d.color, 0.08),
              border: `1px solid ${alpha(d.color, 0.25)}`,
              transition: "all 0.2s ease",
              cursor: "help",
              "&:hover": {
                bgcolor: alpha(d.color, 0.16),
                borderColor: alpha(d.color, 0.5),
              },
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: d.color,
                boxShadow: `0 0 6px ${alpha(d.color, 0.6)}`,
              }}
            />
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                fontSize: "0.72rem",
                fontWeight: 500,
              }}
            >
              {d.label}
            </Typography>
          </Box>
        </Tooltip>
      ))}
    </Stack>
  );
}
