// Filename: src/data/portfolioData.ts
import { Briefcase, Code, Server, Cloud, BrainCircuit, ShieldCheck } from 'lucide-react';
import { JSX } from 'react';

// --- TYPE DEFINITIONS ---
export interface Skill {
  name: string;
  icon: JSX.Element;
}

export interface Experience {
  title: string;
  company: string;
  date: string;
  achievements: string[];
  tech: string[];
}

// Add a new 'details' property to the Project type
export interface Project {
  title: string;
  date: string;
  achievements: string[];
  tech: string[];
  details?: ProjectDetails; // Optional details property
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
  links: {
    migratedRepo: string;
    originalRepo: string;
  };
}


// --- PORTFOLIO DATA ---
export const portfolioData = {
  name: "Ryan Phua",
  title: "Cloud & DevOps Engineer",
  location: "Los Angeles / Orange County, CA",
  contact: {
    email: "ryanphua@g.ucla.edu",
    linkedin: "https://www.linkedin.com/in/ryanphua/",
    github: "https://github.com/ryean0",
  },
  about: "A results-driven Cloud & DevOps Engineer with a passion for building scalable, cost-efficient cloud infrastructure and automating complex workflows. Proficient in AWS, containerization with Docker and Kubernetes, and CI/CD automation. Eager to leverage my skills in a challenging role to drive innovation and operational excellence.",
  skills: [
    { name: "AWS", icon: <Cloud className="h-8 w-8" /> },
    { name: "Docker", icon: <Briefcase className="h-8 w-8" /> },
    { name: "Kubernetes", icon: <Server className="h-8 w-8" /> },
    { name: "CI/CD", icon: <ShieldCheck className="h-8 w-8" /> },
    { name: "Python", icon: <Code className="h-8 w-8" /> },
    { name: "TypeScript", icon: <Code className="h-8 w-8" /> },
    { name: "Terraform", icon: <Cloud className="h-8 w-8" /> },
    { name: "Machine Learning", icon: <BrainCircuit className="h-8 w-8" /> },
  ] as Skill[],
  experience: [
    {
      title: "Software Engineering Intern",
      company: "Solarbrio Inc.",
      date: "Jun '24 - Sep '24",
      achievements: [
        "Led system migration from AWS Amplify V1 to V2, resolving critical versioning issues with custom GraphQL endpoints.",
        "Designed scalable GraphQL APIs in TypeScript using AWS AppSync and DynamoDB.",
        "Achieved 20% faster deployments and a 45% reduction in AWS resource costs.",
      ],
      tech: ["AWS Amplify", "GraphQL", "AppSync", "DynamoDB", "TypeScript", "IaC"]
    },
    {
      title: "Machine Learning Intern (Data Pipeline)",
      company: "DSTA",
      date: "Nov '21 - Jul '22",
      achievements: [
        "Cut data pre-processing time of ML pipeline by 20% by automating parallel processing of geospatial imagery.",
        "Deployed a self-sustaining Kubernetes instance in an air-gapped environment, cutting manual overhead by 30%.",
        "Automated monitoring and debugging with Grafana and Prometheus.",
      ],
      tech: ["Python", "Apache Spark", "Kubernetes", "Grafana", "Prometheus", "ML"]
    }
  ] as Experience[],
  projects: [
    {
      title: "Backend Developer @ UCLA Campus Events Commission",
      date: "~312 hrs",
      achievements: [
        "Reduced new developer onboarding overhead by ~75% (4 weeks to 1 week) by orchestrating development environment with Docker & Kubernetes.",
        "Cut query load on the main database by 30% and boosted API response latency by 20% by integrating Redis caching.",
        "Fast-tracked deliverable timeline by 3 weeks as Backend Lead by facilitating Scrum sprints on Jira.",
      ],
      tech: ["Docker", "Kubernetes", "Redis", "Jira", "Scrum", "Backend"],
      details: {
        headline: "From Fragile Monolith to Modern Microservices",
        problem: "The developer onboarding process was crippled by a fragile legacy architecture. The tangled monolith, built on an outdated Keystone.js version, was incompatible with modern Node.js, bringing local development to a halt and taking up to four weeks to onboard a single developer.",
        solution: "I architected and led a complete overhaul by decoupling the monolith into a Keystone 6 Headless CMS and a modern Next.js frontend. I then containerized the entire stack using Docker and Docker Compose, creating a fully isolated, reproducible environment condensed into a single `docker-compose up` command.",
        impact: [
          { value: "75%", text: "Reduction in new developer onboarding time (4 weeks to 1)" },
          { value: "30%", text: "Reduction in database query load via Redis caching" },
          { value: "27%", text: "Improvement in API response latency" },
        ],
        techHighlight: {
          title: "Code Spotlight: docker-compose.yml",
          language: 'yaml',
          code: `version: '3'
services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - NEXT_PUBLIC_API_URL=http://backend:3000/api/graphql
    volumes:
      - ./backend:/app
      - backend_node_modules:/app/node_modules
      - backend_data:/app/data
    command: yarn dev

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.dev
    ports:
      - "3001:3001"
    environment:
      - NEXT_PUBLIC_API_URL=http://backend:3000/api/graphql
    depends_on:
      - backend
    volumes:
      - ./frontend:/app
      - frontend_node_modules:/app/node_modules
    command: yarn dev

volumes:
  backend_node_modules:
  frontend_node_modules:
  backend_data:`,
          points: [
            { title: "depends_on", description: "Ensures the backend is healthy before the frontend starts, preventing race conditions." },
            { title: "Named Volumes", description: "Persists critical data (SQLite DB) and cached dependencies, separating the container's lifecycle from its data." },
            { title: "Docker Networking", description: "Services communicate using service names (e.g., 'backend') as hostnames, demonstrating an understanding of Docker's internal DNS." },
            { title: "Environment Variables", description: "Decouples configuration from code, following the 12-Factor App methodology for portability and security." }
          ]
        },
        links: {
          migratedRepo: "https://github.com/uclacec/gallery-frontend/tree/monorepo",
          originalRepo: "https://github.com/uclacec/website"
        }
      }
    },
    {
      title: "DevOps Developer @ The Daily Bruin UCLA",
      date: "~250 hrs",
      achievements: [
        "Migrated backend from legacy DigitalOcean droplets to Firebase and dockerized multiple microservices.",
        "Upgraded CI/CD pipeline from Docker-Compose to GitHub Actions, reducing build times by ~50% and cutting deployment failures by 25%.",
      ],
      tech: ["DevOps", "Firebase", "Docker", "CI/CD", "GitHub Actions", "Testing"]
    },
     {
      title: "Social Media Music App @ UCLA",
      date: "~168 hrs",
      achievements: [
        "Led a team of 7 as backend lead, integrating Spotify API & AWS Personalize Engine.",
        "Improved query execution time by 60% through MongoDB schema optimization.",
        "Achieved a 3x decrease in API query latency, verified with AWS CloudWatch metrics.",
      ],
      tech: ["MongoDB", "Spotify API", "AWS Personalize", "AWS CloudWatch", "Backend Lead"]
    }
  ] as Project[]
};
