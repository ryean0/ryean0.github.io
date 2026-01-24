// Filename: src/data/siteConfig.tsx
import { Code, Server, Cloud, BrainCircuit, ShieldCheck, Database, Layers } from 'lucide-react';
import { JSX } from 'react';

// Skill type is specific to this config file as it includes JSX
export interface Skill {
  name: string;
  icon: JSX.Element;
  proficiency?: number; // 1-3: 1=Familiar, 2=Proficient, 3=Expert
  certifications?: string[]; // Optional array of certification names
}

// Skill category interface for organized display
export interface SkillCategory {
  category: string;
  skills: Skill[];
}

// --- SITE CONFIGURATION (Static Data) ---
export const siteConfig = {
  name: "Ryan Phua",
  // CRITICAL FIX: Changed from "Cloud & DevOps Engineer" to "Software Engineer"
  // This aligns with new grad SWE role targeting
  title: "Software Engineer",
  subtitle: "Full Stack Development • Cloud Infrastructure",
  location: "Los Angeles / Orange County, CA",
  
  // Education information - critical for new grad applications
  education: {
    degree: "Bachelor of Science in Computer Science",
    school: "University of California, Los Angeles (UCLA)",
    graduationDate: "June 2025",
    gpa: "3.8/4.0", // Update with your actual GPA if 3.5+
    relevantCourses: [
      "Distributed Systems",
      "Algorithms & Data Structures",
      "Database Systems",
      "Software Engineering",
      "Operating Systems",
      "Computer Networks"
    ]
  },
  
  resumeUrl: "/RyanPhuaResume.pdf",
  contact: {
    email: "ryanphua@g.ucla.edu",
    linkedin: "https://www.linkedin.com/in/ryanphua/",
    github: "https://github.com/ryean0",
  },
  
  // REWRITTEN: Repositioned for Software Engineer role
  // Emphasizes full-stack development while maintaining cloud/infrastructure strengths
  about: "Software Engineer with expertise in full-stack development and cloud infrastructure. Experienced in building scalable web applications using React, Next.js, and Django, with a strong foundation in containerization, CI/CD, and distributed systems. Passionate about writing clean, efficient code and solving complex technical challenges. Seeking to leverage my technical skills and collaborative mindset in a challenging SWE role at a forward-thinking tech company.",
  
  // EXPANDED: Categorized skills with proficiency levels
  // This provides much better signal to recruiters about your capabilities
  skillCategories: [
    {
      category: "Languages",
      skills: [
        { name: "Python", icon: <Code className="h-6 w-6" />, proficiency: 3 },
        { name: "JavaScript", icon: <Code className="h-6 w-6" />, proficiency: 3 },
        { name: "TypeScript", icon: <Code className="h-6 w-6" />, proficiency: 3 },
        { name: "Java", icon: <Code className="h-6 w-6" />, proficiency: 2 },
        { name: "SQL", icon: <Database className="h-6 w-6" />, proficiency: 2 },
        { name: "HTML/CSS", icon: <Code className="h-6 w-6" />, proficiency: 3 },
      ]
    },
    {
      category: "Frontend",
      skills: [
        { name: "React.js", icon: <Layers className="h-6 w-6" />, proficiency: 3 },
        { name: "Next.js", icon: <Layers className="h-6 w-6" />, proficiency: 3 },
        { name: "Redux", icon: <Layers className="h-6 w-6" />, proficiency: 2 },
        { name: "Tailwind CSS", icon: <Layers className="h-6 w-6" />, proficiency: 3 },
        { name: "Angular", icon: <Layers className="h-6 w-6" />, proficiency: 2 },
      ]
    },
    {
      category: "Backend",
      skills: [
        { name: "Node.js", icon: <Server className="h-6 w-6" />, proficiency: 3 },
        { name: "Django", icon: <Server className="h-6 w-6" />, proficiency: 2 },
        { name: "Spring Boot", icon: <Server className="h-6 w-6" />, proficiency: 2 },
        { name: "Express.js", icon: <Server className="h-6 w-6" />, proficiency: 3 },
        { name: "GraphQL", icon: <Server className="h-6 w-6" />, proficiency: 2 },
        { name: "REST APIs", icon: <Server className="h-6 w-6" />, proficiency: 3 },
      ]
    },
    {
      category: "Databases",
      skills: [
        { name: "PostgreSQL", icon: <Database className="h-6 w-6" />, proficiency: 2 },
        { name: "MongoDB", icon: <Database className="h-6 w-6" />, proficiency: 3 },
        { name: "Redis", icon: <Database className="h-6 w-6" />, proficiency: 2 },
        { name: "Elasticsearch", icon: <Database className="h-6 w-6" />, proficiency: 2 },
        { name: "DynamoDB", icon: <Database className="h-6 w-6" />, proficiency: 2 },
      ]
    },
    {
      category: "Cloud & DevOps",
      skills: [
        { 
          name: "AWS", 
          icon: <Cloud className="h-6 w-6" />, 
          proficiency: 3,
          certifications: ["AWS Certified Solutions Architect – Associate"]
        },
        { name: "Docker", icon: <Server className="h-6 w-6" />, proficiency: 3 },
        { name: "Kubernetes", icon: <Server className="h-6 w-6" />, proficiency: 2 },
        { name: "Terraform", icon: <Cloud className="h-6 w-6" />, proficiency: 2 },
        { name: "GitHub Actions", icon: <ShieldCheck className="h-6 w-6" />, proficiency: 3 },
        { name: "CI/CD", icon: <ShieldCheck className="h-6 w-6" />, proficiency: 3 },
      ]
    },
    {
      category: "Tools & Practices",
      skills: [
        { name: "Git", icon: <Code className="h-6 w-6" />, proficiency: 3 },
        { name: "Agile/Scrum", icon: <Layers className="h-6 w-6" />, proficiency: 2 },
        { name: "TDD", icon: <ShieldCheck className="h-6 w-6" />, proficiency: 2 },
        { name: "System Design", icon: <BrainCircuit className="h-6 w-6" />, proficiency: 2 },
      ]
    }
  ] as SkillCategory[],
  
  // Legacy skills array for backward compatibility
  // Can be removed once all components use skillCategories
  skills: [
    { 
      name: "AWS", 
      icon: <Cloud className="h-8 w-8" />,
      certifications: ["AWS Certified Solutions Architect – Associate"]
    },
    { name: "Docker", icon: <Server className="h-8 w-8" /> },
    { name: "Kubernetes", icon: <Server className="h-8 w-8" /> },
    { name: "CI/CD", icon: <ShieldCheck className="h-8 w-8" /> },
    { name: "Python", icon: <Code className="h-8 w-8" /> },
    { name: "TypeScript", icon: <Code className="h-8 w-8" /> },
    { name: "Terraform", icon: <Cloud className="h-8 w-8" /> },
    { name: "React", icon: <Layers className="h-8 w-8" /> },
  ] as Skill[],
};