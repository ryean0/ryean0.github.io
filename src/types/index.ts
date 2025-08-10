/* Filename: src/types/index.ts */
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
      icon: 'FileText' | 'Presentation' | 'ExternalLink' | 'GitBranch' | 'Globe' 
    }[];
    techHighlight?: ProjectDetails['techHighlight'];
  };
  gridSpan?: { col?: number; row?: number };
  cardSpotlight: {
    value: string;
    label: string;
    icon: 'Zap' | 'Cpu' | 'Wrench' | 'DollarSign' | 'Code' | 'ShieldCheck';
  }[];
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
  cardSpotlight: {
    value: string;
    label: string;
    icon: 'Zap' | 'Cpu' | 'Wrench' | 'DollarSign' | 'Code' | 'ShieldCheck';
  }[];
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
  links: { label: string; url: string; icon: 'ExternalLink' | 'GitBranch' | 'Globe' }[];
}