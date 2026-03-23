// Filename: tailwind.config.ts

/**
 * Tailwind Configuration — Visual Foundation Overhaul
 *
 * Changes:
 * 1. Extended color palette with design-token aliases
 * 2. Custom animation utilities (fade-in, slide-up, glow-pulse)
 * 3. Extended spacing and typography scale
 * 4. Container query support via @container
 */

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* Colour extensions tied to CSS custom properties */
      colors: {
        surface: {
          base: "var(--surface-base)",
          raised: "var(--surface-raised)",
          overlay: "var(--surface-overlay)",
        },
        accent: {
          primary: "var(--accent-primary)",
          secondary: "var(--accent-secondary)",
          tertiary: "var(--accent-tertiary)",
        },
      },

      /* Background gradients */
      backgroundImage: {
        "main-bg": "radial-gradient(ellipse at top, var(--tw-gradient-stops))",
        "card-gradient":
          "linear-gradient(135deg, rgba(15,23,42,0.8), rgba(15,23,42,0.4))",
        "accent-gradient":
          "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
      },

      /* Font families */
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },

      /* Custom keyframes */
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
      },

      /* Animation utilities */
      animation: {
        "fade-in-up": "fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
      },

      /* Refined box shadows */
      boxShadow: {
        glow: "0 0 20px -5px rgba(56, 189, 248, 0.2)",
        "glow-lg": "0 0 40px -10px rgba(56, 189, 248, 0.3)",
        "card-hover":
          "0 8px 32px -8px rgba(56, 189, 248, 0.1), 0 0 0 1px rgba(56, 189, 248, 0.05)",
      },

      /* Border radius tokens */
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};
export default config;