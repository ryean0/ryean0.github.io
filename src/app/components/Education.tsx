/* Filename: src/app/components/Education.tsx */

import { Box, Paper, Typography, Stack, Chip } from "@mui/material";
import { alpha } from "@mui/material/styles";
import {
  GraduationCap, MapPin, Calendar, Award, Users,
} from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

const Education = () => {
  const { education } = siteConfig;

  return (
    <Box sx={{ maxWidth: "48rem", mx: "auto" }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 4, md: 5 },
          borderRadius: 4,
          transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
          "&:hover": {
            borderColor: alpha("#38bdf8", 0.15),
            boxShadow: `0 10px 40px -10px ${alpha("#38bdf8", 0.04)}`,
          },
        }}
      >
        {/* Header — icon + degree info */}
        <Stack direction="row" spacing={3} sx={{ alignItems: "flex-start", mb: 3 }}>
          <Box
            sx={{
              flexShrink: 0,
              width: { xs: 56, md: 64 },
              height: { xs: 56, md: 64 },
              background: "linear-gradient(135deg, #0ea5e9, #6366f1)",
              borderRadius: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 8px 24px -4px ${alpha("#0ea5e9", 0.15)}`,
            }}
          >
            <GraduationCap size={32} color="white" />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" sx={{ color: "text.primary", mb: 0.5, lineHeight: 1.2, fontSize: { xs: "1.5rem", md: "1.875rem" } }}>
              {education.degree}
            </Typography>
            <Typography variant="h5" sx={{ color: "primary.main", fontWeight: 600, mb: 1.5, fontSize: { xs: "1.25rem", md: "1.5rem" } }}>
              {education.school}
            </Typography>

            <Stack direction="row" spacing={1} sx={{ alignItems: "center", color: "text.secondary", mb: 1.5 }}>
              <MapPin size={16} />
              <Typography variant="body2">{education.location}</Typography>
            </Stack>

            {/* Graduation date + GPA */}
            <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", flexWrap: "wrap" }}>
              <Chip
                icon={<Calendar size={14} />}
                label={<><Box component="span" sx={{ color: "text.secondary" }}>Expected:</Box>{" "}<Box component="span" sx={{ fontWeight: 600 }}>{education.graduationDate}</Box></>}
                variant="outlined"
                size="small"
              />
              {education.gpa && (
                <>
                  <Typography variant="body2" sx={{ color: "text.disabled" }}>·</Typography>
                  <Chip
                    icon={<Award size={14} />}
                    label={<><Box component="span" sx={{ color: "text.secondary" }}>GPA:</Box>{" "}<Box component="span" sx={{ fontWeight: 600, color: "success.main" }}>{education.gpa}</Box></>}
                    variant="outlined"
                    size="small"
                    sx={{ borderColor: alpha("#34d399", 0.12), bgcolor: alpha("#34d399", 0.06) }}
                  />
                </>
              )}
            </Stack>
          </Box>
        </Stack>

        {/* Divider */}
        <Box sx={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)", mb: 3 }} />

        {/* Relevant coursework */}
        <Box sx={{ mb: 3 }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 2 }}>
            <Box sx={{ width: 3, height: 14, bgcolor: "primary.main", borderRadius: 999 }} />
            <Typography variant="overline">Relevant Coursework</Typography>
          </Stack>
          <Stack direction="row" sx={{ flexWrap: "wrap" }} spacing={1} useFlexGap>
            {education.relevantCourses.map((course) => (
              <Chip
                key={course}
                label={course}
                variant="outlined"
                size="small"
                sx={{
                  fontWeight: 500,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.06)",
                    borderColor: alpha("#38bdf8", 0.15),
                    color: "text.primary",
                    transform: "scale(1.05)",
                  },
                }}
              />
            ))}
          </Stack>
        </Box>

        {/* Honors & Awards */}
        {education.honors && education.honors.length > 0 && (
          <>
            <Box sx={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)", mb: 3 }} />
            <Box sx={{ mb: 3 }}>
              <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 2 }}>
                <Award size={14} color="#fbbf24" />
                <Typography variant="overline">Honors & Awards</Typography>
              </Stack>
              <Stack spacing={1}>
                {education.honors.map((honor) => (
                  <Stack key={honor} direction="row" spacing={1} sx={{ alignItems: "flex-start" }}>
                    <Box sx={{ width: 6, height: 6, bgcolor: "#fbbf24", borderRadius: "50%", mt: 1, flexShrink: 0 }} />
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>{honor}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>
          </>
        )}

        {/* Activities */}
        {education.activities && education.activities.length > 0 && (
          <>
            <Box sx={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)", mb: 3 }} />
            <Box>
              <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 2 }}>
                <Users size={14} color="#818cf8" />
                <Typography variant="overline">Activities & Leadership</Typography>
              </Stack>
              <Stack spacing={2}>
                {education.activities.map((activity) => {
                  if (typeof activity === "string") {
                    return (
                      <Stack key={activity} direction="row" spacing={1} sx={{ alignItems: "flex-start" }}>
                        <Box sx={{ width: 6, height: 6, bgcolor: "#818cf8", borderRadius: "50%", mt: 1, flexShrink: 0 }} />
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>{activity}</Typography>
                      </Stack>
                    );
                  }
                  return (
                    <Paper
                      key={activity.name}
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        bgcolor: "rgba(255,255,255,0.02)",
                        "&:hover": { borderColor: alpha("#818cf8", 0.15) },
                      }}
                    >
                      <Stack direction="row" spacing={1.5} sx={{ justifyContent: "space-between", alignItems: "flex-start", mb: 0.5 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary" }}>
                          {activity.name}
                        </Typography>
                        <Typography variant="caption" sx={{ fontFamily: "monospace", whiteSpace: "nowrap" }}>
                          {activity.dateStart} – {activity.dateEnd}
                        </Typography>
                      </Stack>
                      <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mb: 0.75 }}>
                        {activity.orgDesc}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                        <Typography variant="caption" sx={{ color: "#818cf8", fontWeight: 500 }}>
                          {activity.roleDesc}
                        </Typography>
                        {activity.timeCommit > 0 && (
                          <>
                            <Typography variant="caption" sx={{ color: "text.disabled" }}>·</Typography>
                            <Typography variant="caption" sx={{ color: "text.disabled" }}>
                              {activity.timeCommit} hrs
                            </Typography>
                          </>
                        )}
                      </Stack>
                    </Paper>
                  );
                })}
              </Stack>
            </Box>
          </>
        )}
      </Paper>

      {/* Availability note */}
      {siteConfig.availableForWork && (
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Chip
            icon={
              <Box sx={{ position: "relative", display: "flex", width: 8, height: 8 }}>
                <Box
                  sx={{
                    "@keyframes ping": { "75%, 100%": { transform: "scale(2)", opacity: 0 } },
                    animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite",
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    bgcolor: "#34d399",
                    opacity: 0.75,
                  }}
                />
                <Box sx={{ position: "relative", width: 8, height: 8, borderRadius: "50%", bgcolor: "#10b981" }} />
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