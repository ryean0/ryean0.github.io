// Filename: src/data/siteConfig.tsx

/**
 * Site Configuration — Refined
 *
 * Changes:
 * 1. Tightened bio copy for SWE positioning with stronger action verbs
 * 2. Subtitle formatted as pipe-separated specialisations
 * 3. Skill categories unchanged (already well-structured)
 * 4. Added explicit type exports for downstream consumers
 */

import { Code, Server, Cloud, BrainCircuit, ShieldCheck, Database, Layers } from 'lucide-react';
import { JSX } from 'react';

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

export interface Education {
  degree: string;
  school: string;
  location: string;
  graduationDate: string;
  gpa?: string;
  relevantCourses: string[];
  honors?: string[];
  activities?: string[];
}

export const siteConfig = {
  name: "Ryan Phua",
  title: "Software Engineer",
  subtitle: "Full-Stack · Cloud Infrastructure · DevOps",
  location: "Los Angeles / Orange County, CA",
  availableForWork: true,

  education: {
    degree: "Bachelor of Science in Computer Science",
    school: "University of California, Los Angeles",
    location: "Los Angeles, CA",
    graduationDate: "June 2025",
    gpa: "3.8/4.0",

    relevantCourses: [
      "Distributed Systems",
      "Algorithms & Data Structures",
      "Database Systems",
      "Software Engineering",
      "Operating Systems",
      "Computer Networks",
      "Web Development",
      "Machine Learning"
    ],

    honors: [
      // "Dean's List (Fall 2023, Spring 2024)",
    ],

    activities: [
      // "ACM at UCLA — Member",
    ]
  } as Education,

  resumeUrl: "/RyanPhuaResume.pdf",

  contact: {
    email: "ryanphua@g.ucla.edu",
    linkedin: "https://www.linkedin.com/in/ryanphua/",
    github: "https://github.com/ryean0",
  },

  about: "Software Engineer with a track record of building and shipping scalable full-stack applications backed by robust cloud infrastructure. Proficient in React, Next.js, and Node.js on the frontend and backend, with deep hands-on experience in AWS, Docker, Kubernetes, and CI/CD automation. Passionate about designing clean architectures, optimising system performance, and collaborating on high-impact engineering teams.",

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

  // Legacy skills array — retained for backward compatibility
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