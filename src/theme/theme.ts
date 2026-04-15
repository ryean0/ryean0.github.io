// Filename: src/theme/theme.ts

"use client";

import { createTheme, alpha } from "@mui/material/styles";

// ─── Design Tokens ─────────────────────────────────────
const tokens = {
  surface: {
    base: "#030712",
    raised: "#0f172a",
    overlay: "#1e293b",
  },
  accent: {
    primary: "#38bdf8",    // sky-400
    secondary: "#818cf8",  // indigo-400
    tertiary: "#34d399",   // emerald-400
  },
  text: {
    primary: "#f1f5f9",    // slate-100
    secondary: "#94a3b8",  // slate-400
    disabled: "#64748b",   // slate-500
  },
  border: {
    subtle: "rgba(148, 163, 184, 0.08)",
    default: "rgba(148, 163, 184, 0.12)",
    hover: "rgba(56, 189, 248, 0.25)",
  },
};

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: tokens.accent.primary,
      light: "#7dd3fc",
      dark: "#0284c7",
    },
    secondary: {
      main: tokens.accent.secondary,
    },
    success: {
      main: tokens.accent.tertiary,
    },
    background: {
      default: tokens.surface.base,
      paper: tokens.surface.raised,
    },
    text: {
      primary: tokens.text.primary,
      secondary: tokens.text.secondary,
      disabled: tokens.text.disabled,
    },
    divider: tokens.border.default,
  },

  typography: {
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
    h1: {
      fontWeight: 800,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontWeight: 700,
      fontSize: "2.25rem",
      "@media (min-width:768px)": {
        fontSize: "3rem",
      },
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
    body1: {
      lineHeight: 1.7,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.6,
    },
    caption: {
      fontSize: "0.75rem",
      color: tokens.text.disabled,
    },
    overline: {
      fontSize: "0.6875rem",
      fontWeight: 600,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: tokens.text.secondary,
    },
  },

  shape: {
    borderRadius: 12,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          textRendering: "optimizeLegibility",
        },
        "::selection": {
          backgroundColor: alpha(tokens.accent.primary, 0.25),
          color: "#f8fafc",
        },
        "::-webkit-scrollbar": {
          width: 8,
        },
        "::-webkit-scrollbar-track": {
          background: tokens.surface.base,
        },
        "::-webkit-scrollbar-thumb": {
          background: "rgba(148, 163, 184, 0.15)",
          borderRadius: 4,
        },
        "::-webkit-scrollbar-thumb:hover": {
          background: "rgba(148, 163, 184, 0.25)",
        },
        "*": {
          scrollbarWidth: "thin",
          scrollbarColor: `rgba(148, 163, 184, 0.15) ${tokens.surface.base}`,
        },
        "*:focus-visible": {
          outline: `2px solid ${tokens.accent.primary}`,
          outlineOffset: 3,
          borderRadius: 4,
        },
        "*:focus:not(:focus-visible)": {
          outline: "none",
        },
        "@media (prefers-reduced-motion: reduce)": {
          "*, *::before, *::after": {
            animationDuration: "0.01ms !important",
            animationIterationCount: "1 !important",
            transitionDuration: "0.01ms !important",
            scrollBehavior: "auto !important",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "rgba(15, 23, 42, 0.6)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: `1px solid ${tokens.border.default}`,
          transition: "border-color 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          "&:hover": {
            borderColor: tokens.border.hover,
            boxShadow: `0 4px 24px -4px ${alpha(tokens.accent.primary, 0.08)}, 0 0 0 1px ${alpha(tokens.accent.primary, 0.05)}`,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 500,
          fontSize: "0.75rem",
        },
        outlined: {
          borderColor: tokens.border.default,
          backgroundColor: "rgba(255, 255, 255, 0.02)",
          "&:hover": {
            borderColor: tokens.border.hover,
            backgroundColor: "rgba(255, 255, 255, 0.04)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 12,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: `1px solid ${tokens.border.default}`,
          backgroundColor: "rgba(255, 255, 255, 0.03)",
          transition: "all 0.3s ease",
          "&:hover": {
            borderColor: alpha(tokens.accent.primary, 0.2),
            backgroundColor: "rgba(255, 255, 255, 0.06)",
            color: tokens.accent.primary,
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 3,
          borderRadius: 999,
          backgroundColor: "rgba(255, 255, 255, 0.04)",
        },
        bar: {
          borderRadius: 999,
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        backdrop: {
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(4px)",
        },
      },
    },
  },
});

export default theme;
export { tokens };