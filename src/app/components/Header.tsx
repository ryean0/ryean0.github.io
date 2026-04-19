/* Filename: src/app/components/Header.tsx */

"use client";

import { useState, useEffect, useCallback } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme, alpha } from "@mui/material/styles";
import { useScrollspy } from "@/hooks/useScrollspy";
import { Terminal, Menu as MenuIcon, X } from "lucide-react";

// ─── Canonical nav order — MUST match section order in page.tsx ──────
const NAV_ITEMS = [
  "about",
  "education",
  "experience",
  "projects",
  "skills",
] as const;

// Fixed header offset in px — must match the actual header height
const HEADER_OFFSET = 72;

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const activeId = useScrollspy([...NAV_ITEMS]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll(); // ensure correct state on mount
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth-scroll with offset so the section title isn't hidden behind the fixed header
  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top: y, behavior: "smooth" });
    setDrawerOpen(false);
  }, []);

  // Close drawer on ESC
  useEffect(() => {
    if (!drawerOpen) return;
    const onEsc = (e: KeyboardEvent) =>
      e.key === "Escape" && setDrawerOpen(false);
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [drawerOpen]);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: scrolled ? alpha("#030712", 0.8) : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.04)"
            : "1px solid transparent",
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
            px: { xs: 2, md: 3 },
            minHeight: HEADER_OFFSET,
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          {/* Brand mark */}
          <Button
            onClick={() => scrollTo("about")}
            startIcon={<Terminal size={20} />}
            sx={{
              color: "text.secondary",
              textTransform: "none",
              minWidth: "auto",
              px: 1,
              "&:hover": { color: "primary.main", bgcolor: "transparent" },
            }}
            aria-label="Scroll to top of page"
          >
            <Typography
              variant="body2"
              sx={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontWeight: 600,
                letterSpacing: "-0.02em",
              }}
            >
              ryan
              <Box component="span" sx={{ color: "primary.main" }}>
                phua
              </Box>
            </Typography>
          </Button>

          {/* Desktop: Navigation pill */}
          {!isMobile && (
            <Box
              component="nav"
              role="navigation"
              aria-label="Primary navigation"
              sx={{
                bgcolor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 999,
                px: 0.5,
                py: 0.5,
                backdropFilter: "blur(12px)",
              }}
            >
              <Stack
                component="ul"
                direction="row"
                spacing={0.25}
                sx={{ listStyle: "none", m: 0, p: 0 }}
              >
                {NAV_ITEMS.map((item) => {
                  const isActive = activeId === item;
                  return (
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
                          color: isActive ? "primary.light" : "text.secondary",
                          bgcolor: isActive
                            ? alpha("#38bdf8", 0.08)
                            : "transparent",
                          "&:hover": {
                            color: isActive
                              ? "primary.light"
                              : "text.primary",
                            bgcolor: isActive
                              ? alpha("#38bdf8", 0.08)
                              : "rgba(255,255,255,0.04)",
                          },
                        }}
                        aria-label={`Navigate to ${item} section`}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {item}
                        {isActive && (
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
                  );
                })}
              </Stack>
            </Box>
          )}

          {/* Mobile: Hamburger button */}
          {isMobile && (
            <IconButton
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={drawerOpen}
              sx={{ color: "text.secondary" }}
            >
              <MenuIcon size={22} />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: alpha("#030712", 0.96),
            backdropFilter: "blur(16px)",
            borderLeft: "1px solid rgba(255,255,255,0.06)",
            width: 260,
          },
        }}
        ModalProps={{ keepMounted: true }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ px: 2, py: 1.5 }}
        >
          <Typography
            variant="overline"
            sx={{ color: "text.disabled", letterSpacing: "0.1em" }}
          >
            Navigate
          </Typography>
          <IconButton
            onClick={() => setDrawerOpen(false)}
            size="small"
            aria-label="Close navigation menu"
          >
            <X size={18} />
          </IconButton>
        </Stack>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.06)" }} />
        <List sx={{ py: 1 }}>
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item;
            return (
              <ListItem key={item} disablePadding>
                <ListItemButton
                  onClick={() => scrollTo(item)}
                  aria-label={`Navigate to ${item} section`}
                  aria-current={isActive ? "page" : undefined}
                  sx={{
                    py: 1.25,
                    px: 2,
                    borderLeft: isActive
                      ? `3px solid ${theme.palette.primary.main}`
                      : "3px solid transparent",
                    bgcolor: isActive
                      ? alpha("#38bdf8", 0.06)
                      : "transparent",
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.04)",
                    },
                  }}
                >
                  <ListItemText
                    primary={item}
                    primaryTypographyProps={{
                      sx: {
                        textTransform: "capitalize",
                        fontWeight: isActive ? 600 : 500,
                        fontSize: "0.95rem",
                        color: isActive
                          ? "primary.light"
                          : "text.secondary",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </>
  );
};

export default Header;
