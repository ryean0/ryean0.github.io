/* Filename: src/app/components/SkillsEnhanced.tsx */

"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import { alpha } from "@mui/material/styles";
import { siteConfig } from "@/data/siteConfig";
import FadeIn from "../FadeIn";

const proficiencyValue: Record<number, number> = { 1: 33, 2: 66, 3: 100 };
const proficiencyColor: Record<number, string> = {
  1: alpha("#38bdf8", 0.3),
  2: alpha("#38bdf8", 0.6),
  3: "#38bdf8",
};

const SkillsEnhanced = () => {
  const { skillCategories } = siteConfig;

  return (
    <Stack spacing={7}>
      {skillCategories.map((category, categoryIndex) => (
        <FadeIn key={category.category} delay={categoryIndex * 0.1}>
          <Box>
            {/* Category header */}
            <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 3 }}>
              <Box
                sx={{
                  width: 3, height: 24,
                  background: "linear-gradient(180deg, #38bdf8, #6366f1)",
                  borderRadius: 999,
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: 700, color: "text.primary" }}>
                {category.category}
              </Typography>
            </Stack>

            {/* Skills grid */}
            <Grid container spacing={1.5}>
              {category.skills.map((skill, skillIndex) => (
                <Grid key={skill.name} size={{ xs: 6, sm: 4, md: 3, lg: 2.4 }}>
                  <FadeIn delay={categoryIndex * 0.1 + skillIndex * 0.04}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        bgcolor: "rgba(255,255,255,0.02)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          borderColor: alpha("#38bdf8", 0.2),
                          bgcolor: "rgba(255,255,255,0.04)",
                          transform: "translateY(-4px)",
                        },
                      }}
                    >
                      {/* Icon */}
                      <Box
                        sx={{
                          display: "flex", alignItems: "center", justifyContent: "center",
                          width: 40, height: 40, mb: 1.5, borderRadius: 2,
                          bgcolor: alpha("#38bdf8", 0.06),
                          color: alpha("#38bdf8", 0.7),
                          transition: "all 0.3s ease",
                          "& svg": { width: 20, height: 20 },
                        }}
                      >
                        {skill.icon}
                      </Box>

                      {/* Skill name */}
                      <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary" }}>
                        {skill.name}
                      </Typography>

                      {/* Proficiency bar */}
                      <LinearProgress
                        variant="determinate"
                        value={proficiencyValue[skill.proficiency || 2]}
                        sx={{
                          mt: 1.5,
                          "& .MuiLinearProgress-bar": {
                            bgcolor: proficiencyColor[skill.proficiency || 2],
                          },
                        }}
                      />

                      {/* Certification badge */}
                      {skill.certifications && skill.certifications.length > 0 && (
                        <Box sx={{ mt: 1.5, pt: 1.5, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                          <Chip
                            icon={<Box sx={{ width: 6, height: 6, bgcolor: "#34d399", borderRadius: "50%" }} />}
                            label="Certified"
                            size="small"
                            variant="outlined"
                            sx={{
                              fontSize: "0.625rem",
                              fontWeight: 600,
                              textTransform: "uppercase",
                              letterSpacing: "0.08em",
                              color: "#34d399",
                              borderColor: alpha("#34d399", 0.12),
                              bgcolor: alpha("#34d399", 0.06),
                            }}
                          />
                        </Box>
                      )}
                    </Paper>
                  </FadeIn>
                </Grid>
              ))}
            </Grid>
          </Box>
        </FadeIn>
      ))}

      {/* Proficiency legend */}
      <FadeIn delay={0.5}>
        <Stack
          direction="row"
          spacing={4}
          sx={{ justifyContent: "center", alignItems: "center", pt: 4, borderTop: "1px solid rgba(255,255,255,0.04)" }}
        >
          {[
            { label: "Expert", level: 3 },
            { label: "Proficient", level: 2 },
            { label: "Familiar", level: 1 },
          ].map(({ label, level }) => (
            <Stack key={label} direction="row" spacing={1.25} sx={{ alignItems: "center" }}>
              <Box sx={{ width: 32, height: 3, bgcolor: "rgba(255,255,255,0.04)", borderRadius: 999, overflow: "hidden" }}>
                <Box
                  sx={{
                    height: "100%",
                    width: `${proficiencyValue[level]}%`,
                    bgcolor: proficiencyColor[level],
                    borderRadius: 999,
                  }}
                />
              </Box>
              <Typography variant="caption" sx={{ color: "text.disabled" }}>
                {label}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </FadeIn>
    </Stack>
  );
};

export default SkillsEnhanced;