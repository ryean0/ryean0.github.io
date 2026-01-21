// Filename: tailwind.config.ts
// Enhanced Tailwind Configuration with Design System Integration

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ============================================
      // COLOR SYSTEM
      // ============================================
      colors: {
        // Deep Space Theme
        'deep-space': '#0a0f1e',
        'surface': {
          DEFAULT: '#151b2e',
          elevated: '#1e2740',
          hover: '#2a3551',
        },
        
        // Accent Colors
        'accent': {
          cyan: '#22d3ee',
          purple: '#a78bfa',
          pink: '#f472b6',
          green: '#34d399',
          amber: '#fbbf24',
        },
        
        // Text Colors (extending slate)
        'text': {
          primary: '#f1f5f9',
          secondary: '#94a3b8',
          tertiary: '#64748b',
          muted: '#475569',
        },
      },
      
      // ============================================
      // TYPOGRAPHY
      // ============================================
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      
      fontSize: {
        'display': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h1': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'h2': ['2.25rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'h3': ['1.5rem', { lineHeight: '1.4' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'small': ['0.875rem', { lineHeight: '1.5' }],
        'tiny': ['0.75rem', { lineHeight: '1.4' }],
      },
      
      // ============================================
      // SPACING SYSTEM
      // ============================================
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      // ============================================
      // BORDER RADIUS
      // ============================================
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      
      // ============================================
      // BOX SHADOWS
      // ============================================
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(34, 211, 238, 0.4)',
        'glow-purple': '0 0 20px rgba(167, 139, 250, 0.4)',
        'glow-pink': '0 0 20px rgba(244, 114, 182, 0.4)',
        'glow-cyan-lg': '0 0 40px rgba(34, 211, 238, 0.5)',
        'glow-purple-lg': '0 0 40px rgba(167, 139, 250, 0.5)',
        'card': '0 10px 40px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 30px rgba(34, 211, 238, 0.2)',
      },
      
      // ============================================
      // BACKGROUND IMAGES & GRADIENTS
      // ============================================
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-hero': 'linear-gradient(135deg, #22d3ee 0%, #a78bfa 50%, #f472b6 100%)',
        'gradient-card': 'linear-gradient(135deg, #151b2e 0%, #1e2740 100%)',
        'gradient-accent': 'linear-gradient(135deg, #22d3ee 0%, #a78bfa 100%)',
        'gradient-mesh': `
          radial-gradient(at 0% 0%, rgba(34, 211, 238, 0.2) 0px, transparent 50%),
          radial-gradient(at 100% 0%, rgba(167, 139, 250, 0.15) 0px, transparent 50%),
          radial-gradient(at 100% 100%, rgba(244, 114, 182, 0.1) 0px, transparent 50%),
          radial-gradient(at 0% 100%, rgba(52, 211, 153, 0.1) 0px, transparent 50%)
        `,
      },
      
      // ============================================
      // ANIMATIONS
      // ============================================
      animation: {
        'gradient-flow': 'gradient-flow 8s ease infinite',
        'gradient-shift': 'gradient-shift 20s ease-in-out infinite',
        'stars-move': 'stars-move 120s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'shimmer': 'shimmer 2s infinite',
        'skeleton': 'skeleton-loading 1.5s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      
      keyframes: {
        'gradient-flow': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'gradient-shift': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'stars-move': {
          'from': { transform: 'translate(0, 0)' },
          'to': { transform: 'translate(-50px, -50px)' },
        },
        'fadeIn': {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        'slideUp': {
          'from': { opacity: '0', transform: 'translateY(30px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'scaleIn': {
          'from': { opacity: '0', transform: 'scale(0.9)' },
          'to': { opacity: '1', transform: 'scale(1)' },
        },
        'shimmer': {
          '0%': { left: '-100%' },
          '100%': { left: '100%' },
        },
        'skeleton-loading': {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(34, 211, 238, 0.4)',
            opacity: '1',
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(34, 211, 238, 0.6)',
            opacity: '0.8',
          },
        },
      },
      
      // ============================================
      // TRANSITIONS
      // ============================================
      transitionTimingFunction: {
        'ease-out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'ease-spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1200': '1200ms',
      },
      
      // ============================================
      // BACKDROP BLUR
      // ============================================
      backdropBlur: {
        xs: '2px',
      },
      
      // ============================================
      // Z-INDEX SCALE
      // ============================================
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      
      // ============================================
      // CONTAINER
      // ============================================
      container: {
        center: true,
        padding: {
          DEFAULT: '1.5rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
      
      // ============================================
      // ASPECT RATIO
      // ============================================
      aspectRatio: {
        '4/3': '4 / 3',
        '21/9': '21 / 9',
      },
      
      // ============================================
      // GRID
      // ============================================
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, minmax(300px, 1fr))',
        'auto-fill': 'repeat(auto-fill, minmax(250px, 1fr))',
      },
    },
  },
  plugins: [
    // Custom plugin for glass morphism utilities
    function({ addUtilities }: any) {
      const newUtilities = {
        '.glass': {
          background: 'rgba(21, 27, 46, 0.6)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(148, 163, 184, 0.1)',
        },
        '.glass-strong': {
          background: 'rgba(21, 27, 46, 0.8)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(148, 163, 184, 0.2)',
        },
        '.text-gradient': {
          background: 'linear-gradient(135deg, #22d3ee 0%, #a78bfa 50%, #f472b6 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        },
        '.text-gradient-animated': {
          background: 'linear-gradient(135deg, #22d3ee 0%, #a78bfa 50%, #f472b6 100%)',
          backgroundSize: '200% 200%',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'gradient-flow 8s ease infinite',
        },
      };
      
      addUtilities(newUtilities);
    },
  ],
};

export default config;