/**
 * Skills & Proficiency Data
 *
 * Skill categories with individual proficiency levels and certifications.
 * Consumed by: siteConfig.tsx → SkillsEnhanced.tsx (category grid),
 *              siteConfig.tsx → SkillCard.tsx (legacy flip cards)
 * Proficiency scale:
 *   3 = Expert   (full bar)
 *   2 = Proficient (two-thirds bar)
 *   1 = Familiar   (one-third bar)
 */

import {
    Code,
    Server,
    Cloud,
    BrainCircuit,
    ShieldCheck,
    Database,
    Layers,
} from "lucide-react";

import type { SkillCategory, Skill } from "../siteConfig";

/* ──────────────────────────────────────────────
   Categorised Skills (used by SkillsEnhanced)
   ────────────────────────────────────────────── */

export const skillsData: SkillCategory[] = [
    {
        category: "Programming Languages",
        skills: [
            { name: "Python", icon: <Code className="h-6 w-6" />, proficiency: 3 },
            { name: "JavaScript/TypeScript", icon: <Code className="h-6 w-6" />, proficiency: 3 },
            { name: "Java", icon: <Code className="h-6 w-6" />, proficiency: 2 },
            { name: "Go", icon: <Code className="h-6 w-6" />, proficiency: 3 },
            { name: "C/C++", icon: <Code className="h-6 w-6" />, proficiency: 3 },
        ],
    },
    {
        category: "Frontend Frameworks",
        skills: [
            { name: "React [front/js]", icon: <Layers className="h-6 w-6" />, proficiency: 3 },
            { name: "Next [front/js]", icon: <Layers className="h-6 w-6" />, proficiency: 3 },
            { name: "Redux [front/state-manager]", icon: <Layers className="h-6 w-6" />, proficiency: 2 },
            { name: "Tailwind [front/css-library]", icon: <Layers className="h-6 w-6" />, proficiency: 3 },
            { name: "Angular [front/js]",  icon: <Layers className="h-6 w-6" />, proficiency: 2 },
        ],
    },
    {
        category: "Backend Frameworks",
        skills: [
            { name: "Node/Express [back/js]", icon: <Server className="h-6 w-6" />, proficiency: 3 },
            { name: "Django/Flask [back/python]", icon: <Server className="h-6 w-6" />, proficiency: 2 },
            { name: "Spring Boot [back/java]", icon: <Server className="h-6 w-6" />, proficiency: 2 },
            { name: "GraphQL/REST [back/API]", icon: <Server className="h-6 w-6" />, proficiency: 3 },
            { name: "gRPC [back/API]", icon: <Server className="h-6 w-6" />, proficiency: 2 },
            { name: "(AWS) EC2|Lambda [cloud]", icon: <Server className="h-6 w-6" />, proficiency: 2 },
        ],
    },
    {
        category: "Data Flow & Retrieval",
        skills: [
            { name: "PostgreSQL | (AWS) RDS", icon: <Database className="h-6 w-6" />, proficiency: 2 },
            { name: "MongoDB | (AWS) DocumentDB", icon: <Database className="h-6 w-6" />, proficiency: 3 },
            { name: "Redis | (AWS) ElastiCache", icon: <Database className="h-6 w-6" />, proficiency: 2 },
            { name: "ElasticSearch | (AWS) OpenSearch", icon: <Database className="h-6 w-6" />, proficiency: 2 },
            { name: "(AWS) DynamoDB", icon: <Database className="h-6 w-6" />, proficiency: 2 },
        ],
    },
    {
        category: "Internal DevTools & Cloud Services",
        skills: [
            {
                name: "AWS",
                icon: <Cloud className="h-6 w-6" />,
                proficiency: 3,
                certifications: ["AWS Certified Solutions Architect Associate [2025]", "AWS Certified Cloud Practitioner [2024]"]
            },
            { name: "Docker • (Containers)", icon: <Server className="h-6 w-6" />, proficiency: 3 },
            { name: "Kubernetes • (Microservices)", icon: <Server className="h-6 w-6" />, proficiency: 2 },
            { name: "Terraform • (IaC)", icon: <Cloud className="h-6 w-6" />, proficiency: 2 },
            { name: "GitHub Actions • (CI/CD)", icon: <ShieldCheck className="h-6 w-6" />, proficiency: 3 },
            { name: "Google Cloud Build • (CI/CD)", icon: <ShieldCheck className="h-6 w-6" />, proficiency: 2 },
        ],
    },
    {
        category: "Version Control & Tools",
        skills: [
            { name: "Git (Version Ctrl)", icon: <Code className="h-6 w-6" />, proficiency: 3 },
            { name: "Agile Scrum (Project Mgmt)", icon: <Layers className="h-6 w-6" />, proficiency: 2 },
            { name: "System Design (Architecture)", icon: <BrainCircuit className="h-6 w-6" />, proficiency: 2 },
        ],
    },
];

/* ──────────────────────────────────────────────
   Legacy Skills Array (used by SkillCard)
   Retained for backward compatibility with the
   flip-card component.
   ────────────────────────────────────────────── */

export const legacySkillsData: Skill[] = [
    {
        name: "AWS",
        icon: <Cloud className="h-8 w-8" />,
        certifications: ["AWS Certified Solutions Architect – Associate"],
    },
    { name: "Docker", icon: <Server className="h-8 w-8" /> },
    { name: "Kubernetes", icon: <Server className="h-8 w-8" /> },
    { name: "CI/CD", icon: <ShieldCheck className="h-8 w-8" /> },
    { name: "Python", icon: <Code className="h-8 w-8" /> },
    { name: "TypeScript", icon: <Code className="h-8 w-8" /> },
    { name: "Terraform", icon: <Cloud className="h-8 w-8" /> },
    { name: "ReactJS", icon: <Layers className="h-8 w-8" /> },
];