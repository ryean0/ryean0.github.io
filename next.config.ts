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
};

export default nextConfig;
