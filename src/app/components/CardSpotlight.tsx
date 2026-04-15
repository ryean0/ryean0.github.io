/* Filename: src/app/components/CardSpotlight.tsx */

"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {
  Zap, Cpu, Wrench, DollarSign, Code, ShieldCheck, LucideIcon,
} from "lucide-react";
import TechIcon from "./TechIcon";
import { SpotlightItem } from "@/data/siteConfig";

const iconMap: Record<string, LucideIcon> = {
  Zap, Cpu, Wrench, DollarSign, Code, ShieldCheck,
};

interface CardSpotlightProps {
  items: SpotlightItem[];
}

const CardSpotlight = ({ items }: CardSpotlightProps) => {
  if (!items || items.length === 0) return null;

  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" flexItem sx={{ borderColor: "rgba(255,255,255,0.06)" }} />}
      spacing={0}
      sx={{
        my: 2,
        py: 1.5,
        borderTop: "1px solid rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      {items.map((item) => {
        const Icon = iconMap[item.icon];
        // Check if the value looks like a tech name (no digits/symbols)
        const isTechValue = !/[%+\-\d]/.test(item.value);
        return (
          <Box key={item.label} sx={{ flex: 1, textAlign: "center", px: 1 }}>
            <Stack direction="row" spacing={0.5} sx={{ alignItems: "center", justifyContent: "center", mb: 0.5 }}>
              {Icon && <Icon size={13} style={{ color: "#94a3b8" }} />}
              {isTechValue ? (
                <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
                  <TechIcon tech={item.value} className="h-3.5 w-3.5" />
                  <Typography variant="body2" sx={{ fontWeight: 700, color: "text.primary", fontSize: "0.8rem" }}>
                    {item.value}
                  </Typography>
                </Stack>
              ) : (
                <Typography variant="body2" sx={{ fontWeight: 700, color: "primary.main", fontSize: "0.95rem" }}>
                  {item.value}
                </Typography>
              )}
            </Stack>
            <Typography variant="caption" sx={{ color: "text.disabled", fontSize: "0.65rem" }}>
              {item.label}
            </Typography>
          </Box>
        );
      })}
    </Stack>
  );
};

export default CardSpotlight;