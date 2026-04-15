/* Filename: src/app/components/SkillCard.tsx */

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { alpha } from "@mui/material/styles";
import { Skill } from "@/data/siteConfig";
import { Award, RotateCw } from "lucide-react";

interface SkillCardProps {
  skill: Skill;
}

const SkillCard = ({ skill }: SkillCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const hasCerts = skill.certifications && skill.certifications.length > 0;

  const Container = hasCerts ? "button" : "div";

  return (
    <Container
      type={hasCerts ? "button" : undefined}
      aria-label={hasCerts ? `View certifications for ${skill.name}` : skill.name}
      aria-pressed={hasCerts ? isFlipped : undefined}
      onClick={() => hasCerts && setIsFlipped(!isFlipped)}
      style={{
        width: "100%",
        height: 144,
        perspective: 1000,
        display: "block",
        textAlign: "left",
        cursor: hasCerts ? "pointer" : "default",
        background: "transparent",
        border: "none",
        padding: 0,
        margin: 0,
        color: "inherit",
        fontFamily: "inherit",
      }}
    >
      <motion.div
        style={{
          position: "relative", width: "100%", height: "100%",
          transformStyle: "preserve-3d",
        }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Card Front */}
        <Box
          sx={{
            position: "absolute", width: "100%", height: "100%",
            backfaceVisibility: "hidden", borderRadius: 2,
            border: "1px solid", borderColor: "divider",
            background: `linear-gradient(135deg, ${alpha("#1e293b", 0.8)}, ${alpha("#0f172a", 0.8)})`,
            p: 3, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            transition: "all 0.3s ease",
            "&:hover": hasCerts ? { borderColor: alpha("#60a5fa", 0.8) } : {},
          }}
        >
          {hasCerts && (
            <Box sx={{ position: "absolute", top: 8, right: 8, color: "text.disabled", opacity: 0, transition: "opacity 0.3s", "button:hover &": { opacity: 1 } }}>
              <RotateCw size={14} />
            </Box>
          )}
          <Box sx={{ color: "primary.main", mb: 1.5 }}>{skill.icon}</Box>
          <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary" }}>
            {skill.name}
          </Typography>
        </Box>

        {/* Card Back */}
        {hasCerts && (
          <Box
            sx={{
              position: "absolute", width: "100%", height: "100%",
              backfaceVisibility: "hidden", transform: "rotateY(180deg)",
              borderRadius: 2, border: "1px solid",
              borderColor: "primary.main",
              background: `linear-gradient(135deg, ${alpha("#1e293b", 1)}, ${alpha("#1e3a5f", 0.5)})`,
              p: 2, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 700, color: "primary.light", mb: 1 }}>
              Certifications
            </Typography>
            <Stack spacing={0.5} sx={{ textAlign: "center" }}>
              {skill.certifications?.map((cert) => (
                <Stack key={cert} direction="row" spacing={1} sx={{ alignItems: "center" }}>
                  <Award size={14} style={{ color: "#60a5fa", flexShrink: 0 }} />
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    {cert}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Box>
        )}
      </motion.div>
    </Container>
  );
};

export default SkillCard;