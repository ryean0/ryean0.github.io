
/**
 * User Profile Data
 *
 * Define personal data fields as individual variables consolidated into a single export object `profileData`, intended to be consumed by: siteConfig.tsx → page.tsx (render content in hero section & footer)
 */


const NAME = "Ryan Phua"
const JOB_TITLE = "Software Engineer I"
const COMPANY = "Cognizant Technology Solutions, Teaneck, New Jersey (NJ)" // Company name, City, State/Province, Country (if outside US)
const JOB_SUBTITLE = "Full-Stack Applications· Cloud Platforms & Services • CI/CD & DevOps"
const BASED_IN = "San Francisco Bay Area & San Jose, California (CA)" // City, State/Province, Country (if outside US)
const AVAILABLE = true
const RESUME_URL = "/assets/resumes/SWE_2026.pdf"
const ABOUT_TOP = "Early-career software engineer with a proven track record of shipping & maintaining complex internal developer platforms for code delivery at scale. Passionate about leveraging modern cloud infrastructures alongside AI-native devops tools to build efficient, scalable, and secure software solutions."
const ABOUT_BOTTOM = "Proficient in React & Angular (Typescript) on the frontend, well-versed with common backend stacks (Node/ExpressJS) & database management tooling (MongoDB, PostgreSQL & Redis/AWS Elasticache). Skilled at breaking down high-level feature requirements & efficiently serving clean API (REST/GraphQL) endpoints & queries. Deep practical experience building multi-stage pipelines on AWS & GCP, securely isolating independent microservices via Docker & leveraging Kubernetes for service management + container orchestration, focusing on CI/CD best practices for rapid, reliable deployments."

export const profileData = {
  name: NAME,
  title: JOB_TITLE,
  company: COMPANY,
  subtitle: JOB_SUBTITLE,
  location: BASED_IN,
  availableForWork: AVAILABLE,
  resumeUrl: RESUME_URL,
  aboutTop: ABOUT_TOP,
  aboutBottom: ABOUT_BOTTOM,
};