// Filename: tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  // Ensure Tailwind processes all relevant files
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Define the background gradient used in layout.tsx
      backgroundImage: {
        "main-bg": "radial-gradient(ellipse at top, var(--tw-gradient-stops))",
      },
      // Ensure fonts defined in layout.tsx (via CSS variables) are accessible
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;