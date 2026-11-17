/**
 * Site configuration that JavaScript needs at runtime.
 * Page copy lives in the HTML so the portfolio is readable without JavaScript.
 * No email address and no phone number are stored here.
 *
 * Experience modal copy follows the public resume PDF.
 * Charts use only figures written on that resume.
 * DSO copy stays inside that wording, with no architecture diagram.
 */

export const RESUME_URL = "assets/Ryan_Phua_Resume.pdf";

export const LINKEDIN_URL = "https://www.linkedin.com/in/rphua-dev";

export const GITHUB_URL = "https://github.com/ryean0";

export const SITE_URL = "https://ryean0.github.io/";

export const SAMPLE_LABEL = "Illustrative example, not production code";

export const IMAGE_CREDITS = [
  {
    src: "assets/ucla-royce-hall.webp",
    title: "Royce Hall, UCLA",
    author: "Beyond My Ken",
    license: "CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:2019_UCLA_Royce_Hall_2.jpg",
  },
  {
    src: "assets/san-francisco-skyline.webp",
    title: "San Francisco skyline from Coit Tower",
    author: "Keh52",
    license: "CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:San_Francisco_Skyline_9.jpg",
  },
  {
    src: "assets/nasa-blue-marble.webp",
    title: "Blue Marble, Western Hemisphere",
    author: "NASA/Goddard Space Flight Center/Reto Stöckli",
    license: "Public domain",
    href: "https://commons.wikimedia.org/wiki/File:Blue_Marble_Western_Hemisphere.jpg",
  },
  {
    src: "assets/server-room.webp",
    title: "Wikimedia Foundation servers",
    author: "Victor Grigas",
    license: "CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Wikimedia_Foundation_Servers-8055_14.jpg",
  },
];

const rSdt = [
  "# Illustrative example, not production code",
  "library(dplyr)",
  "",
  "sdt_scores <- trials %>%",
  "  group_by(participant) %>%",
  "  summarise(",
  "    hits  = sum(signal & response),  n_sig   = sum(signal),",
  "    fas   = sum(!signal & response), n_noise = sum(!signal)",
  "  ) %>%",
  "  mutate(",
  "    # log-linear correction keeps rates away from 0 and 1",
  "    hit_rate = (hits + 0.5) / (n_sig + 1),",
  "    fa_rate  = (fas + 0.5) / (n_noise + 1),",
  "    d_prime  = qnorm(hit_rate) - qnorm(fa_rate),",
  "    criterion = -0.5 * (qnorm(hit_rate) + qnorm(fa_rate))",
  "  )",
].join("\n");

const rMixed = [
  "# Illustrative example, not production code",
  "library(lme4)",
  "",
  "fit <- glmer(",
  "  correct ~ condition * block + (1 + condition | participant) + (1 | item),",
  "  data = trials, family = binomial,",
  '  control = glmerControl(optimizer = "bobyqa")',
  ")",
  "summary(fit)",
].join("\n");

const tsResolver = [
  "// Illustrative example, not production code",
  'import { AppSyncResolverHandler } from "aws-lambda";',
  'import { createClient } from "redis";',
  "",
  "const redis = createClient({ url: process.env.REDIS_URL });",
  "const ready = redis.connect();",
  "const TTL_SECONDS = 300;",
  "",
  "type Args = { siteId: string };",
  "",
  "export const handler: AppSyncResolverHandler<Args, SiteSummary> = async (event) => {",
  "  await ready;",
  "  const key = `site-summary:${event.arguments.siteId}`;",
  "",
  "  const cached = await redis.get(key);",
  "  if (cached) return JSON.parse(cached);",
  "",
  "  const summary = await loadSummaryFromDb(event.arguments.siteId);",
  "  await redis.set(key, JSON.stringify(summary), { EX: TTL_SECONDS });",
  "  return summary;",
  "};",
].join("\n");

const pyPreprocess = [
  "# Illustrative example, not production code",
  "from concurrent.futures import ProcessPoolExecutor, as_completed",
  "from pathlib import Path",
  "import json",
  "",
  "def preprocess(path: Path) -> dict:",
  "    records = [json.loads(line) for line in path.open()]",
  '    cleaned = [r for r in records if r.get("value") is not None]',
  '    return {"file": path.name, "kept": len(cleaned), "dropped": len(records) - len(cleaned)}',
  "",
  "def run(input_dir: str, workers: int = 8) -> list[dict]:",
  '    files = sorted(Path(input_dir).glob("*.jsonl"))',
  "    results = []",
  "    with ProcessPoolExecutor(max_workers=workers) as pool:",
  "        futures = {pool.submit(preprocess, f): f for f in files}",
  "        for fut in as_completed(futures):",
  "            results.append(fut.result())",
  "    return results",
  "",
  'if __name__ == "__main__":',
  '    print(run("data/raw"))',
].join("\n");

const ymlCi = [
  "# Illustrative example, not production code",
  "name: ci",
  "on: [push, pull_request]",
  "",
  "jobs:",
  "  test:",
  "    runs-on: ubuntu-latest",
  "    steps:",
  "      - uses: actions/checkout@v4",
  "      - name: Build and test with Compose",
  "        run: |",
  "          docker compose -f docker-compose.yml up -d --build",
  "          docker compose exec -T web npm test",
  "      - name: Tear down",
  "        if: always()",
  "        run: docker compose down -v",
].join("\n");

const ymlCompose = [
  "# Illustrative example, not production code",
  "services:",
  "  web:",
  "    build: .",
  '    ports: ["3000:3000"]',
  "    environment:",
  "      DATABASE_URL: postgres://app:app@db:5432/app",
  "    depends_on:",
  "      db:",
  "        condition: service_healthy",
  "  db:",
  "    image: postgres:16",
  "    environment:",
  "      POSTGRES_USER: app",
  "      POSTGRES_PASSWORD: app",
  "      POSTGRES_DB: app",
  "    healthcheck:",
  '      test: ["CMD-SHELL", "pg_isready -U app"]',
  "      interval: 5s",
  "      retries: 5",
].join("\n");

const ymlAnubys = [
  "# Illustrative example, not production code",
  "name: anubys",
  "on: pull_request",
  "",
  "jobs:",
  "  check:",
  "    runs-on: ubuntu-latest",
  "    steps:",
  "      - uses: actions/checkout@v4",
  "      - name: Run the offline pytest suite",
  "        run: pytest",
].join("\n");

function sample(title, lang, code, filename) {
  return { title, lang, code, filename: filename || "", label: SAMPLE_LABEL };
}

export const EXPERIENCES = [
  {
    id: "exp-mlc",
    org: "Memory and Lifespan Cognition Lab",
    role: "Technical Research Assistant, Statistics Software",
    dates: "Oct 2025 – Aug 2026",
    location: "UCLA (Dept of Psychology)",
    summary: "Social psychology lab investigating phishing email detection and decision biases among age groups.",
    bullets: [
      "Streamlined 12 heterogeneous CSV sources into a validated 12,000-row dataset covering 226 participants, then built an end-to-end signal detection theory (SDT) pipeline in R and RStudio.",
      "ggplot2 visualizations revealed a response-bias shift that raw accuracy metrics had obscured.",
      "Automated mixed-effects model selection in R (lme4, binomial logit, BOBYQA optimizer) using likelihood-ratio tests and AIC comparisons, so competing models and environments could be switched without manual reconfiguration.",
    ],
    stack: ["R", "RStudio", "ggplot2", "lme4"],
    links: [],
    metricsCleared: true,
    metrics: [
      { final: "12", label: "CSV sources", note: "Heterogeneous files, validated on the way in", count: 12 },
      { final: "12,000", label: "rows", note: "One validated dataset", count: 12000, commas: true },
      { final: "226", label: "participants", note: "Covered by the dataset", count: 226 },
    ],
    charts: [
      {
        kind: "flow",
        title: "Sources into one dataset",
        caption: "12 CSV sources validated into a 12,000-row dataset covering 226 participants",
        from: 12,
        to: 12000,
        fromLabel: "12 CSV sources",
        toLabel: "12,000 rows",
      },
    ],
    diagram: {
      caption: "Technologies named on the resume",
      nodes: ["CSV sources", "Validated dataset", "Signal detection theory (SDT)", "lme4"],
    },
    samples: [
      sample("Signal detection scores", "r", rSdt, "sdt-scores.R"),
      sample("Mixed-effects model selection", "r", rMixed, "mixed-effects.R"),
    ],
    image: "assets/ucla-royce-hall.webp",
    imageCredit: "Royce Hall, UCLA",
  },
  {
    id: "exp-solarbrio",
    org: "Solarbrio (Ectios)",
    role: "Full-Stack Software Engineering, UI and Pipeline",
    dates: "Jun 2024 – Sep 2024",
    location: "San Francisco",
    summary: "A series A geospatial resource analytics platform.",
    bullets: [
      "Supported and documented the end-to-end migration of the delivery stack from AWS Amplify V1 to V2, cutting 6-month AWS resource costs by about 30% and reducing end-to-end CodeBuild pipeline runtime from about 20 minutes to about 9 minutes.",
      "Developed and tested 5 custom GraphQL resolvers on AWS AppSync using TypeScript to replace deprecated dependencies, and automated Amplify CodeGen across 3 runtime environments (dev, stage, and prod).",
      "Integrated ElastiCache (Redis) caching at the resolver level on high-traffic query paths, reducing DynamoDB read amplification and improving tail latency under peak usage.",
    ],
    stack: ["AWS Amplify", "AWS CodeBuild", "AWS AppSync", "GraphQL", "TypeScript", "ElastiCache (Redis)", "DynamoDB"],
    links: [{ href: "https://solarbrio.com/", label: "solarbrio.com" }],
    metricsCleared: true,
    metrics: [
      { final: "~30%", label: "AWS resource cost", note: "6-month resource costs after the Amplify V2 migration", count: 30, prefix: "~", suffix: "%" },
      { final: "~20 → ~9 min", label: "CodeBuild", note: "End-to-end pipeline runtime", countFrom: 20, countTo: 9, prefixFrom: "~", prefixTo: "~", suffixTo: " min" },
      { final: "5", label: "GraphQL resolvers", note: "Custom AppSync resolvers in TypeScript", count: 5 },
    ],
    charts: [
      {
        kind: "compare",
        title: "CodeBuild runtime",
        caption: "End-to-end pipeline, about 20 minutes to about 9 minutes",
        bars: [
          { label: "Before", value: 20, display: "~20 min" },
          { label: "After", value: 9, display: "~9 min" },
        ],
      },
      {
        kind: "share",
        title: "AWS resource cost",
        caption: "6-month AWS resource costs cut by about 30%",
        percent: 30,
        display: "~30%",
      },
    ],
    diagram: {
      caption: "Technologies named on the resume",
      nodes: ["Amplify V2", "AppSync resolvers", "Redis", "DynamoDB"],
    },
    samples: [
      sample("AppSync resolver with a cache read", "ts", tsResolver, "resolver.ts"),
    ],
    image: "assets/san-francisco-skyline.webp",
    imageCredit: "San Francisco skyline from Coit Tower",
  },
  {
    id: "exp-dso",
    org: "DSO National Laboratories",
    role: "Machine-Learning Infrastructure Software Engineer",
    dates: "Jun 2022 – Jul 2023",
    location: "Singapore",
    summary: "Sensors Lab. A CNN machine learning pipeline for satellite image segmentation.",
    bullets: [
      "Deployed an offline, air-gapped Kubernetes cluster simulating on-satellite deployment and built a custom Docker registry mirroring OS repositories, so the cluster could initialize fully offline and launch satellite-grade workloads.",
      "Unblocked a preprocessing bottleneck in the ML/CV pipeline by parallelizing single-threaded OpenCV into vector operations with Python multiprocessing and TensorFlow. Preprocessing time fell by about 20%.",
      "Developed custom Prometheus and Grafana dashboards for GPU (Nvidia CUDA) and memory monitoring across pipeline stages, and benchmarked resource use for the lab's capacity planning.",
    ],
    stack: ["Kubernetes", "Docker", "Python", "OpenCV", "TensorFlow", "Prometheus", "Grafana", "Nvidia CUDA"],
    links: [],
    metricsCleared: true,
    metrics: [
      { final: "~20%", label: "preprocessing time", note: "After parallelizing the single-threaded OpenCV step", count: 20, prefix: "~", suffix: "%" },
    ],
    charts: [
      {
        kind: "share",
        title: "Preprocessing time",
        caption: "Preprocessing time cut by about 20%",
        percent: 20,
        display: "~20%",
      },
    ],
    diagram: null,
    samples: [],
    image: "assets/nasa-blue-marble.webp",
    imageCredit: "Blue Marble, Western Hemisphere",
  },
];

export const PROJECTS = [
  {
    id: "exp-usac",
    kind: "project",
    org: "USAC Campus Events Commission",
    role: "Campus events website",
    dates: "Oct 2023 – Jul 2025",
    location: "Los Angeles (UCLA)",
    summary: "Undergraduate Student Activities Council. A campus events site with daily event updates.",
    bullets: [
      "Maintained and upgraded backend features for a campus events website serving daily event updates to more than 47,000 UCLA student users. UI performance and p95 latency improved through data preloading and caching with AWS ElastiCache.",
      "Reduced direct database query load by 30-50% during peak web traffic, and improved p95 latency across the five busiest API endpoints by about 3x versus the pre-ElastiCache baseline.",
      "Reduced new developer onboarding from more than 3.5 weeks to about 1 week by streamlining CI/CD with GitHub Actions and containerizing development and production with Docker Compose for one-step environment setup.",
    ],
    stack: ["AWS ElastiCache", "GitHub Actions", "Docker Compose"],
    links: [{ href: "https://www.uclacec.com/", label: "uclacec.com" }],
    metricsCleared: true,
    metrics: [
      { final: "30-50%", label: "database query load", note: "Fewer direct queries at peak traffic" },
      { final: "~3x", label: "p95 latency", note: "Five busiest API endpoints versus the pre-ElastiCache baseline", count: 3, prefix: "~", suffix: "x" },
      { final: ">3.5 → ~1 wk", label: "onboarding", note: "More than 3.5 weeks to about 1 week", countFrom: 3.5, countTo: 1, decimals: 1, prefixFrom: ">", prefixTo: "~", suffixFrom: " wk", suffixTo: " wk" },
      { final: ">47,000", label: "student users", note: "Daily event updates on the campus site" },
    ],
    charts: [
      {
        kind: "range",
        title: "Database query load",
        caption: "Direct database query load reduced 30-50% at peak traffic",
        low: 30,
        high: 50,
      },
      {
        kind: "compare",
        title: "p95 on the five busiest endpoints",
        caption: "About 3x versus the pre-ElastiCache baseline",
        bars: [
          { label: "Before", value: 3, display: "baseline" },
          { label: "After", value: 1, display: "~3x" },
        ],
      },
      {
        kind: "compare",
        title: "Onboarding",
        caption: "More than 3.5 weeks to about 1 week",
        bars: [
          { label: "Before", value: 3.5, display: ">3.5 wk" },
          { label: "After", value: 1, display: "~1 wk" },
        ],
      },
    ],
    diagram: {
      caption: "Technologies named on the resume",
      nodes: ["GitHub Actions", "Docker Compose", "ElastiCache"],
    },
    samples: [
      sample("Pull request checks", "yaml", ymlCi, ".github/workflows/ci.yml"),
      sample("One-step environments", "yaml", ymlCompose, "docker-compose.yml"),
    ],
    image: "assets/ucla-royce-hall.webp",
    imageCredit: "Royce Hall, UCLA",
  },
  {
    id: "exp-anubys",
    kind: "project",
    org: "Anubys",
    role: "CI-native regression harness for LLM agentic workflows",
    dates: "Portfolio project",
    location: "anubys.dev",
    summary: "A pip-installable Python framework for LLM evaluation and regression testing of AI agents.",
    bullets: [
      "Runs baseline and candidate models in simulated enterprise CI/CD pipelines to benchmark performance and detect regressions before production.",
      "Uses non-inferiority hypothesis testing with paired, scenario-level comparisons, similar to A/B testing for a new model release.",
      "A GitHub Actions pipeline runs 400+ pytest tests on every pull request without exposing secrets or incurring model costs. Paid LLM runs stay in a separate workflow.",
    ],
    stack: ["Python", "pytest", "GitHub Actions"],
    links: [
      { href: "https://anubys.dev/", label: "anubys.dev" },
      { href: "projects/anubys/", label: "Project details" },
    ],
    metricsCleared: true,
    metrics: [
      { final: "400+", label: "pytest tests", note: "Run on every pull request, without model cost", count: 400, suffix: "+" },
    ],
    charts: [],
    diagram: {
      caption: "Technologies named on the resume",
      nodes: ["Baseline and candidate", "Paired scenarios", "GitHub Actions"],
    },
    samples: [
      sample("Pull request test job", "yaml", ymlAnubys, ".github/workflows/anubys.yml"),
    ],
    image: "assets/server-room.webp",
    imageCredit: "Wikimedia Foundation servers",
  },
];

export const ENTRIES = [...EXPERIENCES, ...PROJECTS];

function bulletText(bullet, metricsOn) {
  if (typeof bullet === "string") return bullet;
  if (metricsOn && bullet.figure) return `${bullet.text}${bullet.figure}`;
  return bullet.text;
}

/** What the dialog is allowed to show for one experience. */
export function modalView(entry) {
  const metricsOn = entry.metricsCleared !== false;
  return {
    id: entry.id,
    bullets: entry.bullets.map((bullet) => bulletText(bullet, metricsOn)),
    metrics: metricsOn ? entry.metrics : [],
    charts: metricsOn ? entry.charts : [],
    diagram: entry.diagram || null,
    samples: entry.samples || [],
    showImpact: metricsOn && ((entry.metrics && entry.metrics.length > 0) || (entry.charts && entry.charts.length > 0)),
    limitedNote: entry.diagram ? null : (entry.limitedNote || null),
  };
}
