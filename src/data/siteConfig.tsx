// Filename: src/data/siteConfig.tsx

/**
 * Site Configuration — Modular Architecture
 *
 * Imports:
 * 1. profile/userData       — Personal info, title, location, bio
 * 2. profile/educationData  — Degree, school, courses, honors, activities
 * 3. profile/contactData    — Email, social links
 * 4. profile/skillsData     — Skill categories, proficiency levels
 * 5. profile/experienceData — Professional experience entries (rich model)
 * 6. profile/experienceCardData — Experience card data (UI-ready shape)
 * 7. profile/projectData    — Project showcase entries (UI-ready shape)
 *
 * This file aggregates all data modules into a single config object
 * and re-exports shared types for downstream consumers.
 */

import { JSX } from 'react';

import { profileData } from './profile/userData';
import { educationData } from './profile/educationData';
import { contactData } from './profile/contactData';
import { skillsData, legacySkillsData } from './profile/skillsData';
import { experienceData } from './profile/experienceData';
import { experienceCardData } from './profile/experienceCardData';
import { projectData } from './profile/projectData';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  SECTION A — Shared Icon String-Literal Types
//  (Migrated from src/types/index.ts)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export type SpotlightIconName = 'Zap' | 'Cpu' | 'Wrench' | 'DollarSign' | 'Code' | 'ShieldCheck';
export type LinkIconName = 'FileText' | 'Presentation' | 'ExternalLink' | 'GitBranch' | 'Globe';

export interface SpotlightItem {
  value: string;
  label: string;
  icon: SpotlightIconName;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  SECTION B — ExperienceData (Card / UI Shape)
//  (Migrated from src/types/index.ts — consumed by
//   ExperienceSectionClient, ExperienceModal, InfoCard)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface ExperienceData {
  id: string;
  title: string;
  company: string;
  startDate: string;
  displayDate: string;
  achievements: string[];
  tech: string[];
  category: string;
  details?: {
    problem: string;
    solution: string;
    impact: {
      value: string;
      text: string;
    }[];
    links?: {
      label: string;
      url: string;
      icon: LinkIconName;
    }[];
    techHighlight?: ProjectDetails['techHighlight'];
  };
  gridSpan?: { col?: number; row?: number };
  cardSpotlight: SpotlightItem[];
  keyTech?: string;
  cardImage?: string;
  cardImageLink?: string;
  image?: string;
  icon?: 'Code' | 'BrainCircuit' | 'MonitorSmartphone' | 'Server';
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  SECTION C — ProjectData & ProjectDetails (Card / UI Shape)
//  (Migrated from src/types/index.ts — consumed by
//   ProjectSectionClient, ProjectModal, InfoCard)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface ProjectDetails {
  headline: string;
  problem: string;
  solution: string;
  impact: { text: string; value: string }[];
  techHighlight: {
    title: string;
    code: string;
    language: string;
    points: { title: string; description: string }[];
  };
  links: { label: string; url: string; icon: Extract<LinkIconName, 'ExternalLink' | 'GitBranch' | 'Globe'> }[];
}

export interface ProjectData {
  id: string;
  title: string;
  startDate: string;
  displayDate: string;
  tech: string[];
  category: string;
  cardSpotlight: SpotlightItem[];
  details?: ProjectDetails;
  gridSpan?: { col?: number; row?: number };
  keyTech?: string;
  image?: string;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  SECTION D — Skill Types
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface Skill {
  name: string;
  icon: JSX.Element;
  proficiency?: number;
  certifications?: string[];
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  SECTION E — Education Types
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface CampusActivity {
  name: string;
  orgDesc: string;
  roleDesc: string;
  timeCommit: number;
  dateStart: string;
  dateEnd: string;
}

export interface Education {
  degree: string;
  school: string;
  schoolSub?: string;
  location: string;
  graduationDate: string;
  gpa?: string;
  relevantCourses: string[];
  honors?: string[];
  activities?: CampusActivity[];
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  SECTION F — Experience Types (Rich Model)
//  (Used by experienceData.tsx — future-proofed for
//   dedicated /experience route with full detail views)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * A single work sample or artifact linked from an experience entry.
 * Rendered as clickable items in the ExperienceModal detail view.
 *
 * `type` controls the icon treatment in the modal:
 *   - "document"   → FileText icon
 *   - "repository" → GitBranch icon
 *   - "demo"       → Presentation icon
 *   - "live"       → Globe icon
 */
export interface WorkSample {
  label: string;
  url: string;
  type: "document" | "repository" | "demo" | "live";
  description: string;
}

/**
 * A media item (image, screenshot, diagram) associated with an
 * experience entry. Rendered in a scrollable gallery within the
 * ExperienceModal pop-up.
 */
export interface MediaItem {
  src: string;
  alt: string;
  caption?: string;
}

/**
 * A quantified impact metric displayed as a stat card in the
 * ExperienceModal. Each entry has a bold headline value and
 * supporting explanatory text.
 */
export interface ImpactMetric {
  value: string;
  text: string;
}

/**
 * A single professional experience entry.
 *
 * Modelled on `CampusActivity` with increased specificity for
 * professional roles:
 *   - Structured achievements (resume bullets)
 *   - Quantified impact metrics
 *   - Technology stack
 *   - Work samples (modal-ready linked artifacts)
 *   - Media gallery (images for modal browsing)
 *   - Location + work arrangement type
 *   - Team/department context
 *
 * `category` classifies the role type for icon rendering:
 *   - "fullstack"          → Briefcase icon
 *   - "backend"            → Server icon
 *   - "frontend"           → MonitorSmartphone icon
 *   - "ml-infrastructure"  → BrainCircuit icon
 *   - "devops"             → ShieldCheck icon
 */
export interface Experience {
  id: string;
  company: string;
  companyDesc: string;
  role: string;
  team?: string;
  summary: string;
  location: string;
  locationType: "remote" | "hybrid" | "onsite";
  dateStart: string;
  dateEnd: string;
  category: "fullstack" | "backend" | "frontend" | "ml-infrastructure" | "devops";
  isCurrent: boolean;

  /** Resume-grade bullet points (3–5 per entry recommended) */
  achievements: string[];

  /** Technology stack used in the role */
  tech: string[];

  /** Quantified impact metrics for the modal stat cards */
  impact: ImpactMetric[];

  /** Linked artifacts: docs, repos, demos, live sites */
  workSamples?: WorkSample[];

  /** Image gallery items for modal browsing */
  media?: MediaItem[];
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  Aggregated Site Config
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const siteConfig = {
  // Profile info
  name: profileData.name,
  title: profileData.title,
  company: profileData.company,
  subtitle: profileData.subtitle,
  location: profileData.location,
  availableForWork: profileData.availableForWork,

  // Education
  education: educationData,

  // Contact info
  contact: contactData,
  resumeUrl: profileData.resumeUrl,

  // About bio
  aboutTop: profileData.aboutTop,
  aboutBottom: profileData.aboutBottom,

  // Skills
  skillCategories: skillsData,
  skills: legacySkillsData,

  // Professional experience (rich model — future /experience route)
  experiences: experienceData,

  // Experience cards (UI-ready shape — current ExperienceSectionClient)
  experienceCards: experienceCardData,

  // Projects (UI-ready shape — current ProjectSectionClient)
  projects: projectData,
};