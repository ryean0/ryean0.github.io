// Filename: src/data/siteConfig.tsx
import { Briefcase, Code, Server, Cloud, BrainCircuit, ShieldCheck } from 'lucide-react';
import { JSX } from 'react';

// Skill type is specific to this config file as it includes JSX
export interface Skill {
  name: string;
  icon: JSX.Element;
  certifications?: string[]; // Optional array of certification names
}

// --- SITE CONFIGURATION (Static Data) ---
export const siteConfig = {
  name: "Ryan Phua",
  title: "Cloud & DevOps Engineer",
  location: "Los Angeles / Orange County, CA",
  resumeUrl: "/RyanPhuaResume.pdf",
  contact: {
    email: "ryanphua@g.ucla.edu",
    linkedin: "https://www.linkedin.com/in/ryanphua/",
    github: "https://github.com/ryean0",
  },
  about: "A results-driven Cloud & DevOps Engineer with a passion for building scalable, cost-efficient cloud infrastructure and automating complex workflows. Proficient in AWS, containerization with Docker and Kubernetes, and CI/CD automation. Eager to leverage my skills in a challenging role to drive innovation and operational excellence.",
  
  skills: [
    { 
      name: "AWS", 
      icon: <Cloud className="h-8 w-8" />,
      // --- EXAMPLE CERTIFICATION ---
      certifications: ["AWS Certified Solutions Architect – Associate"]
    },
    { name: "Docker", icon: <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8"><title>Docker</title><path d="M22.99 6.31s-3.46-.8-6.75-.8-6.75.8-6.75.8v11.88s3.46.81 6.75.81 6.75-.8 6.75-.8V6.31zm-1.89 1.86v3.42h-3.41v-3.42h3.41zM1.01 6.31v10.1h4.24V6.31H1.01zM11.25 1.25H6.38v3.96h4.87V1.25zm0 5.06H6.38v3.96h4.87V6.31zm0 5.06H6.38v3.96h4.87v-3.96zM5.25 1.25H.38v15.19h4.87V1.25zM11.25.25H.38C.17.25 0 .42 0 .63v16.94c0 .21.17.38.38.38h10.87c.21 0 .38-.17.38-.38V.63c0-.21-.17-.38-.38-.38zm11.25 4.69c-2.43 0-4.88-.38-4.88-.38V.63c0-.21-.17-.38-.37-.38H12c-.21 0-.38.17-.38.38v16.94c0 .21.17.38.38.38h.37c.21 0 .38-.17.38-.38v-4.25s2.44.38 4.88.38 4.88-.38 4.88-.38v4.25c0 .21.17.38.37.38h.38c.21 0 .38-.17.38-.38V6.31s-2.45-1.37-4.88-1.37z" fill="currentColor"/></svg> },
    { name: "Kubernetes", icon: <Server className="h-8 w-8" /> },
    { name: "CI/CD", icon: <ShieldCheck className="h-8 w-8" /> },
    { name: "Python", icon: <Code className="h-8 w-8" /> },
    { name: "TypeScript", icon: <Code className="h-8 w-8" /> },
    { name: "Terraform", icon: <Cloud className="h-8 w-8" /> },
    { name: "Machine Learning", icon: <BrainCircuit className="h-8 w-8" /> },
  ] as Skill[],
};