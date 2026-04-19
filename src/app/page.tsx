/* Filename: src/app/page.tsx */

import Image from "next/image";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { alpha } from "@mui/material/styles";
import {
  Mail, Linkedin, Github, FileText, MapPin,
  GraduationCap, ChevronDown,
} from "lucide-react";

import Header from "@/app/components/Header";
import FadeIn from "@/app/components/FadeIn";
import Education from "@/app/components/EducationPage/Education";
import SkillsEnhanced from "@/app/components/SkillsPage/SkillsEnhanced";
import ProjectSectionClient from "@/app/components/ProjectsPage/ProjectSectionClient";
import ExperienceSectionClient from "@/app/components/ExperiencePage/ExperienceSectionClient";
import { siteConfig } from "@/data/siteConfig";

export default function PortfolioPage() {
  const experienceData = siteConfig.experiences;
  const projectsData = siteConfig.projects;

  return (
    <>
      <Header />
      <Container component="main" maxWidth="lg" sx={{ px: 3 }}>

        {/* ═══════════ HERO / ABOUT ═══════════ */}
        <Box
          component="section"
          id="about"
          sx={{ minHeight: "100vh", display: "flex", alignItems: "center", py: 12 }}
        >
          <FadeIn duration={1} delay={0.1}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "3fr 2fr" },
                gap: 6,
                alignItems: "center",
              }}
            >
              {/* Left column — Text */}
              <Box>
                {/* Terminal greeting */}
                <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 3 }}>
                  <Box
                    sx={{
                      width: 8, height: 8, borderRadius: "50%",
                      bgcolor: "primary.main",
                      animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite",
                      "@keyframes pulse": { "0%, 100%": { opacity: 1 }, "50%": { opacity: 0.5 } },
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ fontFamily: "var(--font-geist-mono)", color: "text.secondary", letterSpacing: "0.05em" }}
                  >
                    Intro
                  </Typography>
                </Stack>

                {/* Name — animated gradient */}
                <Typography
                  variant="h1"
                  className="animate-gradient"
                  sx={{
                    fontSize: { xs: "3rem", md: "4.5rem" },
                    mb: 1.5,
                    backgroundImage: "linear-gradient(90deg, #38bdf8, #60a5fa, #818cf8)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    lineHeight: 1.1,
                    pb: 0.5,
                  }}
                >
                  {siteConfig.name}
                </Typography>

                <Typography variant="h4" sx={{ color: "text.primary", fontWeight: 600, mb: 0.5, fontSize: { xs: "1.5rem", md: "1.875rem" } }}>
                  {siteConfig.title}
                </Typography>

                {siteConfig.subtitle && (
                  <Typography
                    variant="body2"
                    sx={{ fontFamily: "var(--font-geist-mono)", color: "text.secondary", letterSpacing: "0.05em", mb: 3 }}
                  >
                    {siteConfig.subtitle}
                  </Typography>
                )}

                <Typography variant="body1" sx={{ color: alpha("#cbd5e1", 0.9), maxWidth: "36rem", lineHeight: 1.7, mb: 4 }}>
                  {siteConfig.aboutTop}
                </Typography>

                {/* Status badges */}
                <Stack direction="row" spacing={1.5} useFlexGap sx={{ flexWrap: "wrap", mb: 4 }}>
                  {siteConfig.locations.map((loc, idx) => (
                    <Chip
                      key={idx}
                      icon={<MapPin size={14} />}
                      label={loc}
                      variant="outlined"
                      size="small"
                      sx={{ color: "text.secondary" }}
                    />
                  ))}
                  <Chip
                    icon={<GraduationCap size={14} />}
                    label={`UCLA CS '${siteConfig.education.graduationDate.split(" ")[1].slice(-2)}`}
                    variant="outlined"
                    size="small"
                    sx={{ color: "text.secondary" }}
                  />
                  {siteConfig.availableForWork && (
                    <Chip
                      icon={
                        <Box component="span" sx={{ position: "relative", display: "flex", width: 8, height: 8 }}>
                          <Box
                            component="span"
                            sx={{
                              "@keyframes ping": { "75%, 100%": { transform: "scale(2)", opacity: 0 } },
                              animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite",
                              position: "absolute", inset: 0, borderRadius: "50%",
                              bgcolor: "#34d399", opacity: 0.75,
                            }}
                          />
                          <Box component="span" sx={{ position: "relative", width: 8, height: 8, borderRadius: "50%", bgcolor: "#10b981" }} />
                        </Box>
                      }
                      label="Open to Professional Connections"
                      variant="outlined"
                      size="small"
                      sx={{
                        color: "#34d399",
                        borderColor: alpha("#10b981", 0.12),
                        bgcolor: alpha("#10b981", 0.06),
                      }}
                    />
                  )}
                </Stack>

                {/* CTA + social */}
                <Stack direction="row" spacing={2} useFlexGap sx={{ flexWrap: "wrap", alignItems: "center" }}>
                  {siteConfig.resumeUrl && (
                    <Button
                      component="a"
                      href={siteConfig.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="contained"
                      startIcon={<FileText size={16} />}
                      download="Ryan_Phua_Resume.pdf"
                      sx={{
                        bgcolor: "primary.main",
                        color: "#fff",
                        fontWeight: 600,
                        px: 2.5,
                        py: 1.25,
                        borderRadius: 3,
                        boxShadow: `0 8px 24px -4px ${alpha("#38bdf8", 0.2)}`,
                        "&:hover": {
                          bgcolor: "#7dd3fc",
                          boxShadow: `0 12px 32px -4px ${alpha("#38bdf8", 0.3)}`,
                          transform: "translateY(-2px)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      View Resume
                    </Button>
                  )}
                  <Stack direction="row" spacing={1}>
                    {[
                      { href: `mailto:${siteConfig.contact.email}`, icon: Mail, label: "Email" },
                      { href: siteConfig.contact.linkedin, icon: Linkedin, label: "LinkedIn" },
                      { href: siteConfig.contact.github, icon: Github, label: "GitHub" },
                    ].map(({ href, icon: Icon, label }) => (
                      <IconButton
                        key={label}
                        component="a"
                        href={href}
                        target={label === "Email" ? undefined : "_blank"}
                        rel={label === "Email" ? undefined : "noopener noreferrer"}
                        aria-label={label}
                        title={label}
                        size="small"
                        sx={{ color: "text.secondary" }}
                      >
                        <Icon size={16} />
                      </IconButton>
                    ))}
                  </Stack>
                </Stack>
              </Box>

              {/* Right column — Profile photo */}
              <Box sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-end" } }}>
                <Box sx={{ position: "relative", width: { xs: 224, md: 288 }, height: { xs: 224, md: 288 } }}>
                  {/* Border ring */}
                  <Box
                    sx={{
                      position: "absolute", inset: 0, borderRadius: "50%",
                      background: `linear-gradient(135deg, ${alpha("#38bdf8", 0.2)}, transparent, ${alpha("#818cf8", 0.2)})`,
                      p: "2px",
                    }}
                  >
                    <Box sx={{ width: "100%", height: "100%", borderRadius: "50%", bgcolor: "#030712" }} />
                  </Box>
                  {/* Profile image — absolute path from /public root */}
                  <Image
                    src="/assets/media/profile/dark-blue-bg.png"
                    alt="Ryan Phua — hero portrait"
                    fill
                    style={{
                      borderRadius: "50%",
                      objectFit: "contain",
                      zIndex: 10,
                      border: "2px solid rgba(255,255,255,0.06)",
                    }}
                    priority
                  />
                </Box>
              </Box>
            </Box>

            {/* Scroll hint */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: { xs: 8, md: 10 } }}>
              <ChevronDown size={20} style={{ color: "#475569", animation: "bounce 1s infinite" }} />
              <style>{`@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-25%); } }`}</style>
            </Box>
          </FadeIn>
        </Box>

        <div className="section-divider" />

        {/* ═══════════ EDUCATION ═══════════ */}
        <Box component="section" id="education" sx={{ py: 12 }}>
          <FadeIn>
            <Typography variant="h2" sx={{ textAlign: "center", mb: 2, color: "text.primary" }}>
              Education
            </Typography>
            <Typography variant="body1" sx={{ textAlign: "center", color: "text.secondary", mb: 6, maxWidth: "32rem", mx: "auto" }}>
              Academic foundation in computer science with hands-on engineering focus.
            </Typography>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Education />
          </FadeIn>
        </Box>

        <div className="section-divider" />

        {/* ═══════════ EXPERIENCE ═══════════ */}
        <ExperienceSectionClient experiences={experienceData} />

        <div className="section-divider" />

        {/* ═══════════ PROJECTS ═══════════ */}
        <ProjectSectionClient projects={projectsData} />

        <div className="section-divider" />

        {/* ═══════════ TECHNICAL SKILLS (moved to LAST) ═══════════ */}
        <Box component="section" id="skills" sx={{ py: 12 }}>
          <FadeIn>
            <Typography variant="h2" sx={{ textAlign: "center", mb: 2, color: "text.primary" }}>
              Technical Skills
            </Typography>
            <Typography variant="body1" sx={{ textAlign: "center", color: "text.secondary", mb: 6, maxWidth: "32rem", mx: "auto" }}>
              Core competencies across the full stack, from frontend to cloud infrastructure.
            </Typography>
          </FadeIn>
          <SkillsEnhanced />
        </Box>
      </Container>
    </>
  );
}
