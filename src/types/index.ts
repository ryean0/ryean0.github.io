
/* Filename: src/types/index.ts */

// NEW: Define the specific string literals expected in the data
export type SpotlightIconName = 'Zap' | 'Cpu' | 'Wrench' | 'DollarSign' | 'Code' | 'ShieldCheck';
export type LinkIconName = 'FileText' | 'Presentation' | 'ExternalLink' | 'GitBranch' | 'Globe';

// NEW: Define SpotlightItem interface
export interface SpotlightItem {
  value: string;
  label: string;
  icon: SpotlightIconName;
}

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
      // MODIFIED: Use the centralized type
      icon: LinkIconName;
    }[];
    techHighlight?: ProjectDetails['techHighlight'];
  };
  gridSpan?: { col?: number; row?: number };
  // MODIFIED: Use the structured type
  cardSpotlight: SpotlightItem[];
  keyTech?: string;
  cardImage?: string;
  cardImageLink?: string;
  image?: string;
  icon?: 'Code' | 'BrainCircuit' | 'MonitorSmartphone' | 'Server';
}


export interface ProjectData {
  id: string;
  title: string;
  startDate: string;
  displayDate: string;
  tech: string[];
  category: string;
  // MODIFIED: Use the structured type
  cardSpotlight: SpotlightItem[];
  details?: ProjectDetails;
  gridSpan?: { col?: number; row?: number };
  keyTech?: string;
  image?: string;
}

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
  // MODIFIED: Use the centralized type (ensuring it only includes project-relevant icons)
  links: { label: string; url: string; icon: Extract<LinkIconName, 'ExternalLink' | 'GitBranch' | 'Globe'> }[];
}