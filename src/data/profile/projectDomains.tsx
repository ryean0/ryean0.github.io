// Filename: src/data/profile/projectDomains.tsx

/**
 * Project Knowledge Graph — Domain Taxonomy
 *
 * Defines the Level-1 sub-domain nodes and their inter-connections
 * (undirected edges between related domains).
 *
 * Level-2 project-to-domain edges are derived automatically at
 * render time from each ProjectData entry's `domains: string[]`.
 *
 * Consumed by: ProjectKnowledgeGraph.tsx
 */

export interface ProjectDomain {
  /** Stable ID — referenced by ProjectData.domains[] */
  id: string;
  /** Display label shown inside / beside the node */
  label: string;
  /** Hex accent colour for the node ring + edges */
  color: string;
  /** Short description shown in the legend */
  description: string;
}

/**
 * Canonical Level-1 domain taxonomy. A project must reference
 * these exact IDs in its `domains: string[]` field.
 */
export const projectDomains: ProjectDomain[] = [
  {
    id: "devops",
    label: "DevOps",
    color: "#fbbf24",
    description: "CI/CD pipelines, deployment automation, release engineering",
  },
  {
    id: "containers",
    label: "Containers",
    color: "#38bdf8",
    description: "Docker, Kubernetes, container orchestration",
  },
  {
    id: "cloud",
    label: "Cloud Platforms",
    color: "#34d399",
    description: "AWS, GCP, IaC, managed services",
  },
  {
    id: "distributed",
    label: "Distributed Systems",
    color: "#f87171",
    description: "Consensus, replication, fault tolerance",
  },
  {
    id: "fullstack",
    label: "Full-Stack Web",
    color: "#818cf8",
    description: "React/Next.js frontends, REST/GraphQL APIs",
  },
  {
    id: "datastores",
    label: "Data Stores",
    color: "#c084fc",
    description: "MongoDB, Elasticsearch, Redis, schema design",
  },
  {
    id: "ml",
    label: "ML / Data",
    color: "#f472b6",
    description: "Recommendation engines, model serving",
  },
];

/**
 * Undirected inter-domain edges. Each tuple [a, b] creates a single
 * link between domains `a` and `b`. IDs must match `projectDomains[].id`.
 *
 * These edges encode the conceptual relationships between sub-domains
 * (e.g. Containers are tightly coupled to DevOps and Cloud Platforms).
 */
export const domainEdges: Array<[string, string]> = [
  ["devops", "containers"],
  ["devops", "cloud"],
  ["containers", "cloud"],
  ["containers", "distributed"],
  ["cloud", "distributed"],
  ["fullstack", "datastores"],
  ["distributed", "datastores"],
  ["datastores", "ml"],
  ["fullstack", "cloud"],
];
