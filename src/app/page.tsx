// Filename: src/app/page.tsx
// This is the main component for your portfolio homepage.

import { Mail, Linkedin, Github, Briefcase, Code, Server, Cloud, BrainCircuit, ShieldCheck, Star } from 'lucide-react';

// --- Reusable Card Component ---
// A flexible card component for displaying experience and projects.
const Card = ({ title, subtitle, date, description, achievements, tech }: {
  title: string;
  subtitle: string;
  date: string;
  description?: string;
  achievements: string[];
  tech?: string[];
}) => (
  <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 shadow-lg mb-8 transition-all duration-300 hover:border-blue-400 hover:bg-gray-800/80">
    <div className="flex justify-between items-start mb-2">
      <div>
        <h3 className="text-xl font-bold text-blue-300">{title}</h3>
        <p className="text-md font-semibold text-gray-300">{subtitle}</p>
      </div>
      <span className="text-sm text-gray-400 flex-shrink-0 ml-4">{date}</span>
    </div>
    {description && <p className="text-gray-400 mb-4">{description}</p>}
    <ul className="list-none space-y-2 mb-4">
      {achievements.map((item, index) => (
        <li key={index} className="flex items-start">
          <Star className="h-4 w-4 text-blue-400 mr-3 mt-1 flex-shrink-0" />
          <span className="text-gray-300">{item}</span>
        </li>
      ))}
    </ul>
    {tech && tech.length > 0 && (
      <div className="flex flex-wrap gap-2 mt-4">
        {tech.map((t) => (
          <span key={t} className="bg-gray-700 text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full">
            {t}
          </span>
        ))}
      </div>
    )}
  </div>
);


// --- Data extracted from your resume ---
const portfolioData = {
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
  ],
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
  ],
  projects: [
    {
      title: "Backend Developer @ UCLA Campus Events Commission",
      date: "~312 hrs",
      achievements: [
        "Reduced new developer onboarding overhead by ~75% (4 weeks to 1 week) by orchestrating development environment with Docker & Kubernetes.",
        "Cut query load on the main database by 30% and boosted API response latency by 20% by integrating Redis caching.",
        "Fast-tracked deliverable timeline by 3 weeks as Backend Lead by facilitating Scrum sprints on Jira.",
      ],
      tech: ["Docker", "Kubernetes", "Redis", "Jira", "Scrum", "Backend"]
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
  ]
};

// --- Main Page Component ---
export default function PortfolioPage() {
  return (
    <main className="container mx-auto max-w-4xl px-6 py-12 md:py-20">

      {/* Hero Section */}
      <section id="hero" className="text-center mb-20 md:mb-28">
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300 pb-2">
          {portfolioData.name}
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-gray-300">
          {portfolioData.title}
        </p>
        <p className="mt-2 text-md text-gray-400">
          {portfolioData.location}
        </p>
        <div className="mt-8 flex justify-center gap-6">
          <a href={`mailto:${portfolioData.contact.email}`} className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
            <Mail className="h-7 w-7" />
          </a>
          <a href={portfolioData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
            <Linkedin className="h-7 w-7" />
          </a>
          <a href={portfolioData.contact.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
            <Github className="h-7 w-7" />
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="mb-20 md:mb-28">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-100">About Me</h2>
        <div className="bg-gray-800/50 rounded-lg p-6 md:p-8 border border-gray-700 shadow-lg">
          <p className="text-lg leading-relaxed text-gray-300">
            {portfolioData.about}
          </p>
        </div>
      </section>
      
      {/* Experience Section */}
      <section id="experience" className="mb-20 md:mb-28">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-100">Work Experience</h2>
        <div>
          {portfolioData.experience.map((job, index) => (
            <Card 
              key={index}
              title={job.title}
              subtitle={job.company}
              date={job.date}
              achievements={job.achievements}
              tech={job.tech}
            />
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="mb-20 md:mb-28">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-100">Projects</h2>
        <div>
          {portfolioData.projects.map((project, index) => (
            <Card 
              key={index}
              title={project.title}
              subtitle="" // No subtitle for projects in this design
              date={project.date}
              achievements={project.achievements}
              tech={project.tech}
            />
          ))}
        </div>
      </section>


      {/* Skills Section */}
      <section id="skills">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-100">Technical Skills</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {portfolioData.skills.map((skill) => (
            <div key={skill.name} className="flex flex-col items-center justify-center bg-gray-800/50 p-6 rounded-lg border border-gray-700 transition-all duration-300 hover:border-blue-400 hover:bg-gray-800/80 hover:-translate-y-1">
              <div className="text-blue-400 mb-3">{skill.icon}</div>
              <p className="font-semibold text-gray-200">{skill.name}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center mt-20 md:mt-28 py-6 border-t border-gray-800">
          <p className="text-gray-500">
              Built with Next.js & Tailwind CSS. Deployed on GitHub Pages.
          </p>
      </footer>

    </main>
  );
}
