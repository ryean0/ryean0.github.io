// Filename: src/data/profile/experienceCardData.tsx

import type { ExperienceData } from "../siteConfig";

export const experienceCardData: ExperienceData[] = [
  {
    id: "01_solarbrio",
    title: "Software Engineering Intern",
    company: "Solarbrio Inc | Los Angeles (Hybrid)",
    startDate: "2024-06-01",
    image: "/images/experiences/solarbrio.png",
    displayDate: "Jun 2024 - Aug 2024",
    category: "Distributed Systems",
    tech: ["AWS Amplify", "GraphQL", "Typescript", "Angular"],
    gridSpan: { col: 3 },
    keyTech: "AWS Amplify",
    icon: "Code",
    cardSpotlight: [
      { value: "-45%", label: "Cost Reduction", icon: "DollarSign" },
      { value: "GraphQL", label: "Core Tech", icon: "Code" },
      { value: "API Design", label: "Key Skill", icon: "Wrench" },
    ],
    achievements: [],
    details: {
      problem:
        "The existing backend on AWS Amplify V1 was hindered by versioning conflicts and inefficient resource usage, leading to high operational costs and limitations in functionality.",
      solution:
        "I led a critical system migration to AWS Amplify V2, where I designed and implemented a new set of scalable GraphQL APIs using TypeScript and DynamoDB. This resolved the versioning issues and modernized the backend architecture for better cost-efficiency and performance. The migration involved careful planning to ensure zero downtime and seamless data transfer.",
      impact: [
        {
          value: "45%",
          text: "Reduction in AWS resource costs (from $800/month to $440/month through optimized Lambda and DynamoDB usage)",
        },
        {
          value: "20%",
          text: "Faster deployment cycles (reduced from 15 minutes to 12 minutes per deployment)",
        },
        {
          value: "100%",
          text: "Resolution of critical versioning issues (eliminated all 8 blocking dependency conflicts)",
        },
      ],
      links: [
        { label: "API Design Document", url: "#", icon: "FileText" },
        { label: "Migration Report", url: "#", icon: "Presentation" },
      ],
    },
  },

  {
    id: "04_uclacec",
    title: "Backend Web Developer",
    company: "Campus Events Commission | UCLA",
    startDate: "2022-04-01",
    image: "/images/experiences/uclacec.png",
    displayDate: "Apr 2022 - Present",
    category: "CI/CD & Containerisation",
    tech: ["Docker", "Kubernetes", "Redis", "Next.js", "MongoDB", "Typescript"],
    gridSpan: { col: 3 },
    keyTech: "Docker",
    icon: "Server",
    cardSpotlight: [
      { value: "-75%", label: "Onboarding Time Cut", icon: "Zap" },
      { value: "Docker", label: "Core Tech", icon: "Code" },
      { value: "Automation", label: "Key Skill", icon: "Wrench" },
    ],
    achievements: [],
    details: {
      problem:
        "The developer onboarding process was crippled by a fragile legacy architecture and manual environment setup, taking up to four weeks for a single new developer to become productive.",
      solution:
        "I orchestrated the entire development environment using Docker and Docker Compose, creating a fully isolated, one-command setup. I also integrated a Redis caching layer for high-throughput API endpoints and optimized MongoDB connection pooling to resolve critical timeouts.",
      impact: [
        {
          value: "75%",
          text: "Reduction in new developer onboarding time (from 4 weeks to 1 week through Docker containerization)",
        },
        {
          value: "30%",
          text: "Reduction in database query load via Redis caching (decreased MongoDB queries from 1000/min to 700/min)",
        },
        {
          value: "20%",
          text: "Improvement in API response latency (reduced average response time from 250ms to 200ms)",
        },
      ],
    },
  },

  {
    id: "03_dailybruin",
    title: "Frontend Developer",
    company: "The Daily Bruin | UCLA",
    startDate: "2021-09-01",
    image: "/images/experiences/daily-bruin.png",
    displayDate: "Sep 2021 - Jun 2022",
    category: "Full Stack Web Development",
    tech: ["React.js", "Firebase", "Docker", "GitLab"],
    gridSpan: { col: 3 },
    keyTech: "React.js | Docker | GitHub Actions",
    icon: "MonitorSmartphone",
    cardSpotlight: [
      { value: "25%", label: "Deployment Failure Reduction", icon: "Zap" },
      { value: "Typescript", label: "Core Skill", icon: "ShieldCheck" },
      { value: "GitHub Actions", label: "Core Tech", icon: "Code" },
    ],
    achievements: [],
    details: {
      problem:
        "The website's legacy infrastructure on DigitalOcean was slow, difficult to maintain, and suffered from an inefficient CI/CD pipeline, resulting in poor site performance and slow development cycles.",
      solution:
        "I modernized the frontend by refactoring class components to use React Hooks and translated Figma designs into performant components. I also migrated the backend to Firebase and completely overhauled the CI/CD pipeline, replacing Docker-Compose with a more efficient GitHub Actions workflow.",
      impact: [
        {
          value: "50%",
          text: "Reduction in build and deployment times (from 8 minutes to 4 minutes average)",
        },
        {
          value: "15%",
          text: "Improvement in site rendering speed (reduced First Contentful Paint from 2.1s to 1.8s)",
        },
        {
          value: "25%",
          text: "Reduction in deployment failures (from 12% failure rate to 9% through improved CI/CD pipeline)",
        },
      ],
    },
  },

  {
    id: "02_dsta",
    title: "Machine Learning Intern",
    company: "Defence Science & Technology Agency | Singapore",
    startDate: "2020-11-01",
    image: "/images/experiences/dsta.png",
    displayDate: "Jun 2022 - Aug 2022",
    category: "Distributed Systems",
    tech: ["Python", "Apache Spark", "Docker"],
    gridSpan: { col: 3 },
    keyTech: "Apache Spark | Docker | Kubernetes",
    icon: "BrainCircuit",
    cardSpotlight: [
      { value: "+40%", label: "Data Pipeline Efficiency", icon: "Zap" },
      { value: "Kubernetes", label: "Core Tech", icon: "Cpu" },
      { value: "MLOps", label: "Key Skill", icon: "Wrench" },
    ],
    achievements: [],
    details: {
      problem:
        "The existing machine learning workflow for analyzing geospatial imagery was slow and manually intensive. The deployment platform, Docker Swarm, also lacked the automation and resilience needed for a secure, air-gapped environment.",
      solution:
        "I developed a high-accuracy deep learning model for image segmentation and automated the entire data pipeline using Python and Apache Spark. I then led the infrastructure migration from Docker Swarm to a self-sustaining Kubernetes cluster on Amazon EKS, which I deployed and managed using Helm charts and YAML configurations.",
      impact: [
        {
          value: "40%",
          text: "Improvement in model training efficiency (reduced training time from 8 hours to 4.8 hours per epoch)",
        },
        {
          value: "30%",
          text: "Reduction in manual operational overhead (automated 12 hours/week of manual deployment tasks)",
        },
        {
          value: "95%",
          text: "Test accuracy achieved on segmentation models (improved from baseline 87% to 95% on validation set)",
        },
      ],
    },
  },
];