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
 * 6. profile/projectData    — Project showcase entries (UI-ready shape)
 *
 * This file aggregates all data modules into a single config object
 * and re-exports shared types for downstream consumers.
 */

import { JSX } from "react";

import { profileData } from "./profile/userData";
import { educationData, educationMilestones } from "./profile/educationData";
import { contactData } from "./profile/contactData";
import { skillsData, legacySkillsData } from "./profile/skillsData";
import { experienceData } from "./profile/experienceData";
import { projectData } from "./profile/projectData";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  SECTION A — Shared Icon / UI Literal Types
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export type SpotlightIconName =
  | "Zap"
  | "Cpu"
  | "Wrench"
  | "DollarSign"
  | "Code"
  | "ShieldCheck";

export type LinkIconName =
  | "FileText"
  | "Presentation"
  | "ExternalLink"
  | "GitBranch"
  | "Globe";

export interface SpotlightItem {
  value: string;
  label: string;
  icon: SpotlightIconName;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  SECTION B — Project Types (consumed by ProjectSectionClient / ProjectModal)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

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
  links: {
    label: string;
    url: string;
    icon: Extract<LinkIconName, "ExternalLink" | "GitBranch" | "Globe">;
  }[];
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

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  SECTION C — Skill Types
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

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

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  SECTION D — Education Types
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

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

export interface EducationMilestone {
  id: string;
  period: string;
  yearStart: number;
  yearEnd: number;
  type:
    | "high-school"
    | "military"
    | "university"
    | "study-abroad"
    | "graduation";
  typeLabel: string;
  institution: string;
  location: string;
  description: string;
  degree?: string;
  gpa?: string;
  honors?: string[];
  courses?: string[];
  achievements?: string[];
  backgroundImage?: string;
  icon: string;
  activities?: CampusActivity[];
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  SECTION E — Experience Types (Rich Model)
//  Used by experienceData.tsx + ExperienceTimeline + ExperienceTimelineModal
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface WorkSample {
  label: string;
  url: string;
  type: "document" | "repository" | "demo" | "live";
  description: string;
}

export interface MediaItem {
  src: string;
  alt: string;
  caption?: string;
}

export interface ImpactMetric {
  value: string;
  text: string;
}

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
  category:
    | "fullstack"
    | "backend"
    | "frontend"
    | "ml-infrastructure"
    | "devops";
  isCurrent: boolean;
  achievements: string[];
  tech: string[];
  impact: ImpactMetric[];
  workSamples?: WorkSample[];
  media?: MediaItem[];
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  Aggregated Site Config
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const siteConfig = {
  // Profile info
  name: profileData.name,
  title: profileData.title,
  company: profileData.company,
  subtitle: profileData.subtitle,
  locations: profileData.locations,
  availableForWork: profileData.availableForWork,

  // Education
  education: educationData,
  educationMilestones: educationMilestones,

  // Contact info
  contact: contactData,
  resumeUrl: profileData.resumeUrl,

  // About bio
  aboutTop: profileData.aboutTop,
  aboutBottom: profileData.aboutBottom,

  // Skills
  skillCategories: skillsData,
  skills: legacySkillsData,

  // Professional experience (rich model — powers ExperienceTimeline)
  experiences: experienceData,

  // Projects (UI-ready shape — powers ProjectSectionClient)
  projects: projectData,
};
