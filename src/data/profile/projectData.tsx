// Filename: src/data/profile/projectData.tsx

/**
 * Project Showcase Data
 *
 * Personal/academic project entries for the e-portfolio.
 * Non-intersection contract: NO entry here may duplicate an
 * engagement already present in experienceData.tsx. The former
 * `cec-docker` entry has been removed — UCLA CEC lives in
 * experienceData.tsx as `ucla-cec-dev`.
 *
 * Consumed by: siteConfig.tsx → ProjectSectionClient → ProjectModal
 */

import type { ProjectData } from "../siteConfig";

export const projectData: ProjectData[] = [
  /* ─── Project 1 — BruinCreates | Online Art Marketplace ─── */
  {
    id: "bruin-creates",
    title: "BruinCreates | Online Art Marketplace",
    startDate: "2021-09-01",
    displayDate: "Sep 2021 - Oct 2022",
    category: "Distributed Systems",
    image: "/images/projects/bruin-creates.png",
    tech: ["React.js", "Redux", "Java Spring", "Elasticsearch", "Instagram API"],
    gridSpan: { col: 3 },
    keyTech: "Java Spring | Elasticsearch",
    cardSpotlight: [
      { value: "50%", label: "Latency Reduced", icon: "Zap" },
      { value: "Elasticsearch", label: "Core Tech", icon: "Cpu" },
      { value: "Search Ops", label: "Key Skill", icon: "Wrench" },
    ],
    details: {
      headline: "Building a Scalable Marketplace with Optimized Search",
      problem:
        "Local student artists lacked a dedicated platform to sell their work, and potential buyers couldn't easily search for local art. The technical challenge was building a scalable platform with fast, relevant search.",
      solution:
        "As Frontend Lead, I directed the UI development using React.js and Redux for robust state management. For the backend, I architected the search functionality using Java Spring integrated with Elasticsearch, focusing on optimizing indexing strategies, custom analyzers, and mappings.",
      impact: [
        { value: "50%", text: "Reduction in search latency (from 800ms to 400ms using Elasticsearch custom analyzers and field boosting)" },
        { value: "30%", text: "Improvement in frontend render time via Redux optimization (reduced initial load from 3.2s to 2.2s)" },
        { value: "MVP", text: "Successful launch of the Minimum Viable Product with 200+ active users in first month" },
      ],
      techHighlight: {
        title: "Code Spotlight: Elasticsearch Optimized Query DSL",
        language: "json",
        code: `{
  "query": {
    "bool": {
      "must": [
        {
          "multi_match": {
            "query": "searchTerm",
            "fields": ["title^3", "description", "tags"],
            "fuzziness": "AUTO"
          }
        }
      ],
      "filter": [
        { "term": { "status": "active" } }
      ]
    }
  },
  "aggs": {
    "categories": {
      "terms": { "field": "category.keyword" }
    }
  }
}`,
        points: [
          { title: "Bool Query (must/filter)", description: "Combines scoring queries ('must') with non-scoring queries ('filter'). Filters are faster and cacheable, improving overall performance." },
          { title: "Multi-match & Field Boosting (^3)", description: "Searches across multiple fields while giving higher relevance scores (boosted by 3x) to matches in the 'title' field." },
          { title: "Fuzziness: AUTO", description: "Improves user experience by allowing minor typos in the search term without sacrificing performance." },
          { title: "Aggregations (aggs)", description: "Efficiently calculates summary data (like category counts for faceted search) alongside the main query results." },
        ],
      },
      links: [
        { label: "Frontend Repo", url: "https://github.com/Bruin-Sell/bruin-creates-frontend", icon: "GitBranch" },
        { label: "Backend Repo", url: "https://github.com/Bruin-Sell/bruin-creates-backend", icon: "GitBranch" },
      ],
    },
  },

  /* ─── Project 2 — Cloud-Based Paxos System ─── */
  {
    id: "cloud-paxos",
    title: "Cloud Based Distributed Consensus (Paxos) System",
    startDate: "2024-03-01",
    displayDate: "2024 | Fall",
    category: "Distributed Systems",
    image: "/images/projects/cloud-paxos.png",
    tech: ["Paxos", "Distributed Systems", "Kubernetes", "Terraform", "IaC"],
    gridSpan: { col: 3 },
    keyTech: "Paxos Consensus Algorithm | Go | MiniKube",
    cardSpotlight: [
      { value: "40%", label: "Faster Failover", icon: "Zap" },
      { value: "Paxos", label: "Core Algorithm", icon: "Cpu" },
      { value: "Terraform", label: "Core Tech", icon: "Code" },
    ],
    details: {
      headline: "Implementing Paxos for Fault-Tolerant Distributed Systems",
      problem:
        "Distributed systems risk data inconsistency and downtime during node failures. The challenge was to build a key-value store that could automatically maintain consensus and recover from failures without data loss.",
      solution:
        "I implemented the Paxos consensus algorithm to manage a replicated state machine across the cluster. To manage the nodes, I leveraged Kubernetes StatefulSets to provide stable network identities and persistent storage, which is crucial for Paxos participants. The entire infrastructure was automated as code using Terraform.",
      impact: [
        { value: "40%", text: "Faster failover recovery rate vs. baseline (reduced from 10 seconds to 6 seconds using Paxos consensus)" },
        { value: "100%", text: "Data consistency maintained under simulated network partitions (tested with 50+ partition scenarios)" },
        { value: "75%", text: "Reduction in manual deployment time via IaC (from 40 minutes to 10 minutes using Terraform automation)" },
      ],
      techHighlight: {
        title: "Code Spotlight: Kubernetes StatefulSet Configuration",
        language: "yaml",
        code: `apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: paxos-acceptor
spec:
  serviceName: "paxos-acceptor-svc"
  replicas: 3
  selector:
    matchLabels:
      app: paxos-acceptor
  template:
    # ... (Pod specifications)
  volumeClaimTemplates:
  - metadata:
      name: paxos-storage
    spec:
      accessModes: [ "ReadWriteOnce" ]
      storageClassName: "aws-ebs-gp3"
      resources:
        requests:
          storage: 10Gi`,
        points: [
          { title: "StatefulSet Kind", description: "Guarantees the ordering and uniqueness of Pods, essential for maintaining stable identities in consensus protocols." },
          { title: "serviceName", description: "Links the StatefulSet to a Headless Service, providing direct DNS resolution for peer-to-peer communication between nodes." },
          { title: "replicas: 3", description: "Configured to tolerate F=1 failure (Byzantine Fault Tolerance requires 2F+1 nodes), ensuring a quorum can always be reached." },
          { title: "volumeClaimTemplates", description: "Automatically provisions persistent storage (AWS EBS) for each replica, ensuring state survives pod restarts." },
        ],
      },
      links: [],
    },
  },

  /* ─── Project 3 — Pied Piper | Social Media Music App ─── */
  {
    id: "pied-piper",
    title: "Pied Piper | Social Media Music App",
    startDate: "2022-11-01",
    displayDate: "Nov 2022 (~168 hrs)",
    category: "Full Stack Web Development",
    image: "/images/projects/pied-piper.png",
    tech: ["Next.js", "Spotify API", "AWS Personalize", "MongoDB Atlas", "NextAuth"],
    gridSpan: { col: 3 },
    keyTech: "Spotify API",
    cardSpotlight: [
      { value: "3x", label: "Faster Queries", icon: "Zap" },
      { value: "MongoDB", label: "Core Tech", icon: "Code" },
      { value: "Schema Design", label: "Key Skill", icon: "Wrench" },
    ],
    details: {
      headline: "Optimizing MongoDB for Real-Time Recommendations",
      problem:
        "The initial architecture for the music recommendation feed suffered from severe latency issues. Inefficient database schema design and a lack of indexing caused slow queries, resulting in a poor user experience and excessive load on the AWS infrastructure.",
      solution:
        "As Backend Lead, I redesigned the MongoDB schema to optimize for read-heavy operations, utilizing denormalization and implementing strategic indexing on key fields. I also integrated AWS Personalize for ML-driven recommendations and used AWS CloudWatch to monitor and validate performance improvements.",
      impact: [
        { value: "3x", text: "Decrease in overall API query latency (reduced from 450ms to 150ms through MongoDB indexing and aggregation optimization)" },
        { value: "60%", text: "Increase in maximum system throughput (from 500 req/sec to 800 req/sec with optimized schema design)" },
        { value: "99.9%", text: "API availability maintained during peak loads (sustained 1000+ concurrent users with <1% error rate)" },
      ],
      techHighlight: {
        title: "Code Spotlight: Optimized MongoDB Aggregation Pipeline",
        language: "javascript",
        code: `const getRecommendations = async (userId) => {
  return User.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(userId) } },
    {
      $lookup: {
        from: "songs",
        localField: "recommendedTracks",
        foreignField: "_id",
        as: "trackDetails"
      }
    },
    { $unwind: "$trackDetails" },
    {
      $project: {
        _id: 0,
        trackId: "$trackDetails._id",
        title: "$trackDetails.title"
      }
    }
  ]);
};`,
        points: [
          { title: "$lookup", description: "Efficiently joins user data with song details in a single database operation, avoiding multiple application-level queries." },
          { title: "$project", description: "Reduces network overhead by shaping the output documents to return only the necessary fields to the client." },
          { title: "Indexing (Implied)", description: "The efficiency of $match and $lookup relies heavily on indexes created on the '_id' and 'recommendedTracks' fields." },
          { title: "Aggregation Pipeline", description: "Allows for complex data processing to occur efficiently on the database server itself, minimizing data transfer." },
        ],
      },
      links: [
        { label: "Project Repo", url: "https://github.com/ryean0/CS35L-Spring23-Project", icon: "GitBranch" },
      ],
    },
  },
];
