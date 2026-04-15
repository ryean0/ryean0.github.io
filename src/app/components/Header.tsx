/* Filename: src/app/components/Header.tsx */

"use client";

import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import { useScrollspy } from "@/hooks/useScrollspy";
import { Terminal } from "lucide-react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const navItems = ["about", "education", "skills", "experience", "projects"];
  const activeId = useScrollspy(navItems);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: scrolled ? alpha("#030712", 0.8) : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.04)" : "none",
        boxShadow: scrolled
          ? "0 10px 15px -3px rgba(0,0,0,0.1)"
          : "none",
        transition: "all 0.5s ease",
      }}
      role="banner"
    >
      <Toolbar
        sx={{
          maxWidth: "64rem",
          width: "100%",
          mx: "auto",
          px: 3,
          minHeight: 64,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* Brand mark */}
        <Button
          onClick={() => scrollTo("about")}
          startIcon={<Terminal size={20} />}
          sx={{
            color: "text.secondary",
            textTransform: "none",
            "&:hover": { color: "primary.main", bgcolor: "transparent" },
          }}
          aria-label="Scroll to top"
        >
          <Typography
            variant="body2"
            sx={{ fontFamily: "var(--font-geist-mono)", fontWeight: 600, letterSpacing: "-0.02em" }}
          >
            ryan<Box component="span" sx={{ color: "primary.main" }}>phua</Box>
          </Typography>
        </Button>

        {/* Navigation pill */}
        <Box
          component="nav"
          role="navigation"
          aria-label="Main navigation"
          sx={{
            bgcolor: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 999,
            px: 0.5,
            py: 0.5,
            backdropFilter: "blur(12px)",
          }}
        >
          <Stack component="ul" direction="row" spacing={0.25} sx={{ listStyle: "none", m: 0, p: 0 }}>
            {navItems.map((item) => (
              <li key={item}>
                <Button
                  onClick={() => scrollTo(item)}
                  size="small"
                  sx={{
                    textTransform: "capitalize",
                    fontWeight: 500,
                    fontSize: "0.875rem",
                    px: 2,
                    py: 0.75,
                    borderRadius: 999,
                    minWidth: "auto",
                    position: "relative",
                    color: activeId === item ? "primary.light" : "text.secondary",
                    bgcolor: activeId === item ? alpha("#38bdf8", 0.08) : "transparent",
                    "&:hover": {
                      color: activeId === item ? "primary.light" : "text.primary",
                      bgcolor: activeId === item ? alpha("#38bdf8", 0.08) : "rgba(255,255,255,0.04)",
                    },
                  }}
                  aria-label={`Navigate to ${item} section`}
                  aria-current={activeId === item ? "page" : undefined}
                >
                  {item}
                  {/* Active bottom indicator */}
                  {activeId === item && (
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 16,
                        height: 2,
                        bgcolor: "primary.main",
                        borderRadius: 999,
                      }}
                    />
                  )}
                </Button>
              </li>
            ))}
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;