import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /**
   * Enable static exports for the App Router.
   * This is the crucial setting for GitHub Pages.
   */
  output: 'export',

  // Optional: Add a trailing slash to all paths `/about` -> `/about/`
  // trailingSlash: true,

  // Optional: Change the output directory `out` -> `dist`
  // distDir: 'dist',
  images: { unoptimized: true },

  /**
   * Exclude react-icons from Next.js barrel file optimization.
   * The default optimizePackageImports includes react-icons, but
   * certain Si* icons (SiAmazon, SiAmazons3, etc.) fail under
   * the barrel optimizer. Setting an explicit list WITHOUT
   * react-icons fixes the issue.
   */
  experimental: {
    optimizePackageImports: [
      // Keep MUI optimized
      '@mui/material',
      '@mui/icons-material',
      '@emotion/react',
      '@emotion/styled',
      'lucide-react',
      'framer-motion',
      // react-icons is intentionally EXCLUDED
    ],
  },
};

export default nextConfig;