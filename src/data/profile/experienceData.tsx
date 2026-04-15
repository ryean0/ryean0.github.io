// Filename: src/data/profile/experienceData.tsx

/**
 * Professional Experience Data
 *
 * Structured experience entries for the e-portfolio, each modelled as
 * an `Experience` object with resume-grade detail. Designed to power:
 *   - The dedicated /experience page (card grid)
 *   - The ExperienceModal pop-up (full detail view with work samples,
 *     impact metrics, and media gallery)
 *   - The About page (condensed experience timeline)
 *
 * Consumed by: siteConfig.tsx → ExperienceSectionClient / page.tsx
 *
 * Note: The `Experience` and related interfaces are defined in
 * siteConfig.tsx and re-exported for downstream consumers. This file
 * provides the populated data only.
 */

import type { Experience } from "../siteConfig";

export const experienceData: Experience[] = [
  /* ────────────────────────────────────────────
     Experience 1 — Cognizant Technology Solutions
     ──────────────────────────────────────────── */
  {
    id: "cognizant-swe1",
    company: "Cognizant Technology Solutions",
    companyDesc:
      "Fortune 200 global IT services and consulting company, delivering digital engineering, cloud, and AI solutions to enterprise clients across banking, healthcare, and technology verticals.",
    role: "Software Engineer I",
    team: "Internal Developer Platforms — Code Delivery",
    summary:
      "Building and maintaining scalable internal developer platforms for code delivery at scale. Owning end-to-end feature delivery across a React/Angular frontend and Node.js microservices backend, deployed on AWS with Kubernetes orchestration and GitHub Actions CI/CD.",
    location: "Teaneck, New Jersey (NJ)",
    locationType: "hybrid",
    dateStart: "Jul 2025",
    dateEnd: "Present",
    category: "fullstack",
    isCurrent: true,

    achievements: [
      "Architected and shipped a self-service CI/CD pipeline builder used by 200+ internal engineering teams, reducing average pipeline setup time from 3 days to under 15 minutes",
      "Designed and implemented a real-time deployment dashboard (React, WebSocket, Grafana) providing cross-team visibility into 1,500+ daily deployments across 40 microservices",
      "Led migration of legacy Jenkins pipelines to GitHub Actions, standardising workflow templates and reducing CI build times by 38% while improving reliability from 91% to 99.2% pass rate",
      "Developed a Kubernetes-native canary deployment controller in Go, enabling automated progressive rollouts with configurable traffic shifting and automatic rollback on error-rate thresholds",
      "Optimised MongoDB aggregation pipelines powering the deployment analytics API, reducing p95 query latency from 1.2s to 180ms through compound indexing and $facet stage restructuring",
    ],

    tech: [
      "React",
      "Angular",
      "TypeScript",
      "Node.js",
      "Express.js",
      "Go",
      "MongoDB",
      "Redis",
      "AWS (ECS, Lambda, S3)",
      "Kubernetes",
      "Docker",
      "GitHub Actions",
      "Terraform",
      "Grafana",
    ],

    impact: [
      { value: "200+", text: "Internal engineering teams onboarded to the self-service pipeline builder within the first quarter of launch" },
      { value: "38%", text: "Reduction in average CI build time after migrating from Jenkins to GitHub Actions with optimised caching and parallelism" },
      { value: "99.2%", text: "CI pipeline pass rate achieved post-migration, up from 91% on the legacy Jenkins infrastructure" },
      { value: "~85%", text: "Reduction in p95 deployment analytics query latency (1.2s → 180ms) via MongoDB optimisation" },
    ],

    workSamples: [
      {
        label: "Pipeline Builder Architecture Doc",
        url: "#",
        type: "document",
        description: "Technical design document outlining the self-service pipeline builder's architecture, API contracts, and integration points.",
      },
      {
        label: "Canary Controller — GitHub Repo",
        url: "#",
        type: "repository",
        description: "Open-source Kubernetes canary deployment controller written in Go with configurable traffic shifting and automatic rollback.",
      },
      {
        label: "Deployment Dashboard Demo",
        url: "#",
        type: "demo",
        description: "Live walkthrough of the real-time deployment dashboard showing cross-service visibility and alerting configuration.",
      },
    ],

    media: [
      {
        src: "/images/experiences/cognizant-dashboard.png",
        alt: "Real-time deployment dashboard showing cross-team deployment status and health metrics",
        caption: "Deployment Dashboard — Live view of 1,500+ daily deployments across 40 microservices",
      },
      {
        src: "/images/experiences/cognizant-pipeline.png",
        alt: "Self-service pipeline builder UI with drag-and-drop stage configuration",
        caption: "Pipeline Builder — Self-service CI/CD configuration interface used by 200+ teams",
      },
    ],
  },

  /* ────────────────────────────────────────────
     Experience 2 — Solarbrio Inc (Internship)
     ──────────────────────────────────────────── */
  {
    id: "solarbrio-intern",
    company: "Solarbrio Inc",
    companyDesc:
      "Los Angeles-based clean energy startup building IoT-driven solar panel monitoring and optimisation platforms for commercial and residential installations.",
    role: "Software Engineering Intern",
    team: "Platform Engineering",
    summary:
      "Led a critical backend migration from AWS Amplify V1 to V2, redesigning the GraphQL API layer and DynamoDB data model to resolve versioning conflicts, reduce operational costs, and modernise the deployment pipeline.",
    location: "Los Angeles, CA",
    locationType: "hybrid",
    dateStart: "Jun 2024",
    dateEnd: "Aug 2024",
    category: "backend",
    isCurrent: false,

    achievements: [
      "Led system migration from AWS Amplify V1 to V2, resolving 8 critical dependency conflicts and eliminating all version-locking issues that had blocked feature development for 3 months",
      "Designed and implemented a new suite of scalable GraphQL APIs (TypeScript, AppSync) backed by optimised DynamoDB single-table design, reducing read/write costs by 45%",
      "Refactored the CI/CD pipeline to leverage Amplify V2's sandbox environments, cutting deployment cycle time from 15 minutes to under 8 minutes per push",
      "Authored comprehensive migration runbook and onboarding documentation, enabling the 4-person team to self-serve future Amplify upgrades without external consultation",
    ],

    tech: [
      "AWS Amplify V2",
      "GraphQL (AppSync)",
      "TypeScript",
      "DynamoDB",
      "Angular",
      "AWS Lambda",
      "AWS CloudFormation",
      "Node.js",
    ],

    impact: [
      { value: "45%", text: "Reduction in AWS resource costs (from $800/mo to $440/mo through optimised Lambda and DynamoDB single-table design)" },
      { value: "47%", text: "Faster deployment cycles (reduced from 15 min to 8 min per deployment via Amplify V2 sandbox environments)" },
      { value: "100%", text: "Resolution of critical versioning issues (eliminated all 8 blocking dependency conflicts)" },
    ],

    workSamples: [
      {
        label: "API Design Document",
        url: "#",
        type: "document",
        description: "GraphQL schema design and DynamoDB single-table access pattern documentation for the Amplify V2 migration.",
      },
      {
        label: "Migration Runbook",
        url: "#",
        type: "document",
        description: "Step-by-step migration guide authored for the engineering team covering Amplify V1→V2 upgrade path.",
      },
    ],

    media: [
      {
        src: "/images/experiences/solarbrio.png",
        alt: "Solarbrio platform dashboard showing solar panel monitoring data",
        caption: "Solarbrio Platform — IoT-driven solar monitoring dashboard powered by the migrated GraphQL backend",
      },
    ],
  },

  /* ────────────────────────────────────────────
     Experience 3 — DSTA Singapore (Internship)
     ──────────────────────────────────────────── */
  {
    id: "dsta-ml-intern",
    company: "Defence Science & Technology Agency (DSTA)",
    companyDesc:
      "Singapore's national defence technology agency under the Ministry of Defence, responsible for R&D, systems engineering, and IT infrastructure for the Singapore Armed Forces.",
    role: "Machine Learning Engineering Intern",
    team: "Geospatial Intelligence — Computer Vision Division",
    summary:
      "Developed high-accuracy deep learning models for geospatial image segmentation and automated the end-to-end MLOps pipeline. Led the infrastructure migration from Docker Swarm to Kubernetes (Amazon EKS) in a secure, air-gapped environment.",
    location: "Singapore",
    locationType: "onsite",
    dateStart: "Jun 2022",
    dateEnd: "Aug 2022",
    category: "ml-infrastructure",
    isCurrent: false,

    achievements: [
      "Developed a U-Net-based deep learning model for satellite image segmentation achieving 95% validation accuracy, an 8-percentage-point improvement over the 87% baseline",
      "Automated the data ingestion and model training pipeline using Python and Apache Spark, reducing per-epoch training time from 8 hours to 4.8 hours (40% improvement)",
      "Led infrastructure migration from Docker Swarm to a self-sustaining Kubernetes cluster on Amazon EKS, deployed and managed via Helm charts and declarative YAML configurations",
      "Eliminated 12 hours/week of manual deployment tasks by implementing automated rollout and health-check workflows within the Kubernetes orchestration layer",
    ],

    tech: [
      "Python",
      "PyTorch",
      "Apache Spark",
      "Docker",
      "Kubernetes (EKS)",
      "Helm",
      "AWS (S3, ECR, EKS)",
      "PostgreSQL",
    ],

    impact: [
      { value: "95%", text: "Validation accuracy achieved on satellite image segmentation (up from 87% baseline)" },
      { value: "40%", text: "Improvement in model training efficiency (reduced training time from 8h to 4.8h per epoch)" },
      { value: "12 hrs/wk", text: "Manual operational overhead eliminated through automated Kubernetes deployment workflows" },
    ],

    workSamples: [
      {
        label: "Model Performance Report",
        url: "#",
        type: "document",
        description: "Classification report and confusion matrix analysis for the U-Net segmentation model across 6 terrain categories.",
      },
    ],

    media: [
      {
        src: "/images/experiences/dsta.png",
        alt: "DSTA geospatial intelligence platform showing satellite imagery analysis",
        caption: "DSTA — Geospatial image segmentation pipeline processing satellite imagery for terrain classification",
      },
    ],
  },

  /* ────────────────────────────────────────────
     Experience 4 — The Daily Bruin (UCLA)
     ──────────────────────────────────────────── */
  {
    id: "daily-bruin-dev",
    company: "The Daily Bruin",
    companyDesc:
      "UCLA's official independent student newspaper, serving 45,000+ students. The engineering team maintains the publication's web platform, CMS, and digital infrastructure.",
    role: "Full-Stack Web Developer",
    team: "Online Engineering Team",
    summary:
      "Modernised the campus newspaper's web platform by refactoring legacy React class components to Hooks, migrating the backend to Firebase, and overhauling the CI/CD pipeline from Docker-Compose to GitHub Actions for faster, more reliable deployments.",
    location: "Los Angeles, CA",
    locationType: "onsite",
    dateStart: "Sep 2023",
    dateEnd: "May 2024",
    category: "fullstack",
    isCurrent: false,

    achievements: [
      "Refactored 15+ legacy React class components to functional components with Hooks, improving code readability and reducing bundle size by 12%",
      "Translated 20+ Figma design mockups into pixel-perfect, responsive React components with Tailwind CSS, maintaining design system consistency across breakpoints",
      "Migrated backend services from DigitalOcean to Firebase (Firestore, Cloud Functions, Auth), reducing hosting costs by 60% and simplifying the deployment model",
      "Overhauled the CI/CD pipeline from Docker-Compose to GitHub Actions, cutting average build/deploy time from 8 minutes to 4 minutes and reducing deployment failure rate from 12% to 3%",
    ],

    tech: [
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "Firebase (Firestore, Functions)",
      "GitHub Actions",
      "Docker",
      "Figma",
      "Node.js",
    ],

    impact: [
      { value: "50%", text: "Reduction in build and deployment times (8 min → 4 min) after CI/CD pipeline overhaul" },
      { value: "75%", text: "Reduction in deployment failure rate (12% → 3%) through GitHub Actions workflow improvements" },
      { value: "60%", text: "Reduction in hosting costs after migrating from DigitalOcean to Firebase" },
    ],

    workSamples: [
      {
        label: "Daily Bruin Website",
        url: "https://dailybruin.com",
        type: "live",
        description: "Live production website serving UCLA's 45,000+ student readership.",
      },
    ],

    media: [
      {
        src: "/images/experiences/daily-bruin.png",
        alt: "The Daily Bruin website homepage showing modern responsive layout",
        caption: "The Daily Bruin — Modernised web platform serving UCLA's student community",
      },
    ],
  },

  /* ────────────────────────────────────────────
     Experience 5 — UCLA Campus Events Commission
     ──────────────────────────────────────────── */
  {
    id: "ucla-cec-dev",
    company: "Campus Events Commission (CEC)",
    companyDesc:
      "Official organising committee and external liaison for UCLA campus events, funded by the UC Undergraduate Student Affairs Commission (USAC). Manages the event discovery platform for 45,000+ students.",
    role: "Lead Backend Developer",
    team: "Web Development Team",
    summary:
      "Orchestrated a full backend overhaul—decomposing a fragile monolith into a modern Keystone 6 + Next.js architecture, containerising the entire stack with Docker, and integrating Redis caching to achieve a 75% reduction in developer onboarding time.",
    location: "Los Angeles, CA",
    locationType: "onsite",
    dateStart: "May 2024",
    dateEnd: "May 2025",
    category: "backend",
    isCurrent: false,

    achievements: [
      "Architected and led the decomposition of a legacy monolith into a Keystone 6 Headless CMS + Next.js frontend, resolving critical Node.js version incompatibilities that had blocked local development",
      "Containerised the entire development stack with Docker and Docker Compose, condensing new developer setup from a 4-week manual process into a single `docker-compose up` command",
      "Integrated a Redis caching layer for high-throughput API endpoints, reducing MongoDB query volume by 30% (1,000/min → 700/min) and average API response latency by 20%",
      "Optimised MongoDB connection pooling configuration, resolving intermittent timeout errors that had caused 5+ production incidents per month",
      "Mentored 3 junior developers on containerisation best practices, pair-programming Docker workflows, and reviewing infrastructure PRs",
    ],

    tech: [
      "Docker",
      "Docker Compose",
      "Kubernetes",
      "Redis",
      "MongoDB",
      "Next.js",
      "TypeScript",
      "Keystone 6 (Headless CMS)",
      "Node.js",
    ],

    impact: [
      { value: "75%", text: "Reduction in developer onboarding time (4 weeks → 1 week via Docker containerisation)" },
      { value: "30%", text: "Reduction in MongoDB query load via Redis caching (1,000/min → 700/min)" },
      { value: "20%", text: "Improvement in average API response latency (250ms → 200ms)" },
      { value: "0", text: "Production timeout incidents per month after MongoDB connection pool optimisation (down from 5+)" },
    ],

    workSamples: [
      {
        label: "Migrated Monorepo",
        url: "https://github.com/uclacec/gallery-frontend/tree/monorepo",
        type: "repository",
        description: "Restructured monorepo containing the Keystone 6 CMS backend and Next.js frontend with Docker orchestration.",
      },
      {
        label: "Original Legacy Repo",
        url: "https://github.com/uclacec/website",
        type: "repository",
        description: "The original monolithic codebase that was decomposed during the migration.",
      },
    ],

    media: [
      {
        src: "/images/experiences/uclacec.png",
        alt: "UCLA CEC event discovery platform showing campus events grid",
        caption: "UCLA CEC — Modernised event platform with containerised microservices architecture",
      },
    ],
  },
];