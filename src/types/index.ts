/* Filename: src/types/index.ts */
export type KeyMetricPart = {
  text: string;
  type: 'quantifier' | 'filler' | 'metric';
};

// Interfaces defining the structure of the JSON files
export interface ExperienceData {
  id: string; // Auto-added by loader
  title: string;
  company: string;
  startDate: string; // Used for sorting (ISO Date: "2024-06-01")
  displayDate: string; // Used for display (e.g., "Jun '24 - Sep '24")
  achievements: string[];
  tech: string[];
  gridSpan?: { col?: number; row?: number };
  keyMetric?: KeyMetricPart[];
  keyTech?: string;
  cardImage?: string; // e.g., "/logos/solarbrio.png"
  cardImageLink?: string; // e.g., "https://www.solarbrio.com"
  image?: string; // --- NEW: Path to detail image e.g., "/images/experience/dsta.png"
}

export interface ProjectData {
  id: string; // Auto-added by loader
  title: string;
  startDate: string; // Used for sorting (ISO Date)
  displayDate: string; // e.g., "~312 hrs"
  achievements: string[];
  tech: string[];
  details?: ProjectDetails;
  gridSpan?: { col?: number; row?: number };
  keyMetric?: KeyMetricPart[];
  keyTech?: string;
  cardImage?: string; // e.g., "/logos/ucla.png"
  cardImageLink?: string; // e.g., "https://www.ucla.edu"
  image?: string; // --- NEW: Path to detail image e.g., "/images/projects/paxos.png"
}

// ProjectDetails interface remains the same
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
  links: { label: string; url: string; icon: 'ExternalLink' | 'GitBranch' | 'Globe' }[];
}