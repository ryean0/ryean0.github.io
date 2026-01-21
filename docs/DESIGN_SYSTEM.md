# Portfolio Design System Documentation

## Overview
This design system creates a unique, modern aesthetic that balances professionalism with creativity. The theme is "Cosmic Developer" - combining deep space aesthetics with vibrant accent colors and smooth animations.

## Color Palette

### Primary Colors
- **Deep Space Background**: `#0a0f1e` - Rich, dark navy that's easier on eyes than pure black
- **Surface**: `#151b2e` - Slightly lighter for cards and elevated surfaces
- **Surface Elevated**: `#1e2740` - For hover states and interactive elements

### Accent Colors
- **Primary Accent (Cyan)**: `#22d3ee` - Bright, energetic cyan for CTAs and highlights
- **Secondary Accent (Purple)**: `#a78bfa` - Sophisticated purple for secondary elements
- **Tertiary Accent (Pink)**: `#f472b6` - Warm pink for special highlights
- **Success Green**: `#34d399` - For positive metrics and success states
- **Warning Amber**: `#fbbf24` - For important callouts

### Text Colors
- **Primary Text**: `#f1f5f9` - Soft white for main content
- **Secondary Text**: `#94a3b8` - Muted slate for secondary content
- **Tertiary Text**: `#64748b` - Even more muted for labels and metadata

### Gradients
- **Hero Gradient**: Cyan → Purple → Pink (multi-stop)
- **Card Gradient**: Deep Space → Surface (subtle depth)
- **Accent Gradient**: Cyan → Purple (for buttons and highlights)
- **Glow Effect**: Radial gradient with accent colors

## Typography

### Font Families
- **Sans Serif**: Geist Sans (primary) - Modern, clean, highly readable
- **Monospace**: Geist Mono - For code snippets and technical content

### Type Scale
- **Display**: 4rem (64px) - Hero headings
- **H1**: 3rem (48px) - Section headings
- **H2**: 2.25rem (36px) - Subsection headings
- **H3**: 1.5rem (24px) - Card titles
- **Body Large**: 1.125rem (18px) - Intro paragraphs
- **Body**: 1rem (16px) - Standard text
- **Small**: 0.875rem (14px) - Metadata, labels
- **Tiny**: 0.75rem (12px) - Captions

### Font Weights
- **Light**: 300 - Rarely used
- **Regular**: 400 - Body text
- **Medium**: 500 - Emphasis
- **Semibold**: 600 - Headings
- **Bold**: 700 - Strong emphasis

## Spacing System

Based on 4px base unit:
- **xs**: 0.25rem (4px)
- **sm**: 0.5rem (8px)
- **md**: 1rem (16px)
- **lg**: 1.5rem (24px)
- **xl**: 2rem (32px)
- **2xl**: 3rem (48px)
- **3xl**: 4rem (64px)
- **4xl**: 6rem (96px)

## Animation Principles

### Timing Functions
- **Ease Out**: For entrances (cubic-bezier(0.16, 1, 0.3, 1))
- **Ease In Out**: For state changes (cubic-bezier(0.4, 0, 0.2, 1))
- **Spring**: For interactive elements (type: "spring", stiffness: 300, damping: 20)

### Durations
- **Fast**: 150ms - Micro-interactions
- **Normal**: 300ms - Standard transitions
- **Slow**: 500ms - Page transitions
- **Very Slow**: 1000ms - Entrance animations

### Animation Types
1. **Fade In**: Opacity 0 → 1
2. **Slide Up**: Transform translateY(20px) → 0
3. **Scale**: Transform scale(0.95) → 1
4. **Glow**: Box-shadow expansion on hover
5. **Shimmer**: Background position animation for loading states

## Component Patterns

### Cards
- **Border**: 1px solid with low opacity accent color
- **Border Radius**: 12px (rounded-xl)
- **Padding**: 24px (p-6)
- **Shadow**: Subtle with accent color glow on hover
- **Background**: Gradient from deep space to surface

### Buttons
- **Primary**: Gradient background, white text, glow on hover
- **Secondary**: Transparent with border, accent text, fill on hover
- **Ghost**: No background, accent text, subtle background on hover

### Inputs
- **Background**: Surface color
- **Border**: 1px solid muted
- **Focus**: Accent color border with glow
- **Padding**: 12px vertical, 16px horizontal

## Layout Grid

### Breakpoints
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

### Container
- **Max Width**: 1280px (max-w-6xl)
- **Padding**: 24px (px-6) on mobile, 32px (px-8) on desktop

### Grid System
- **Experience/Projects**: CSS Grid with auto-fit
- **Skills**: 2 cols mobile, 4 cols desktop
- **Responsive**: Mobile-first approach

## Accessibility

### Contrast Ratios
- **Text on Background**: Minimum 7:1 (AAA)
- **Interactive Elements**: Minimum 4.5:1 (AA)
- **Focus Indicators**: 3px solid accent color

### Interactive States
- **Hover**: Scale + glow effect
- **Focus**: Visible outline with accent color
- **Active**: Slight scale down
- **Disabled**: 50% opacity, no pointer events

## Special Effects

### Particle Background
- Animated stars with varying sizes
- Slow movement creating depth
- Subtle glow effect

### Gradient Mesh
- Multi-color gradient overlays
- Animated position for dynamic feel
- Low opacity for subtlety

### Glass Morphism
- Backdrop blur on elevated surfaces
- Semi-transparent backgrounds
- Border with gradient

### Glow Effects
- Radial gradient shadows
- Accent color with low opacity
- Expand on hover

## Implementation Notes

### CSS Custom Properties
All colors, spacing, and timing values are defined as CSS custom properties for easy theming and maintenance.

### Tailwind Integration
Design system values are extended in tailwind.config.ts for seamless integration with utility classes.

### Component Library
Reusable components follow this design system strictly, with variants for different use cases.

### Performance
- Animations use transform and opacity (GPU-accelerated)
- Gradients are pre-defined to avoid runtime calculations
- Images are optimized and lazy-loaded