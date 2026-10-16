/**
 * Site configuration that JavaScript needs at runtime.
 * Page copy lives in the HTML so the portfolio is readable without JavaScript.
 * The email address is not stored here. js/mail.js assembles it from parts.
 *
 * Experience modal copy is the resume, rewritten for the dialog.
 * DSO keeps metricsCleared false: the ~20% figure and its chart stay hidden.
 * The DSO samples tab is cleared. The DSO diagram stays out.
 */

/** TODO: set RESUME_URL to a public resume PDF. Until then the control asks by email. */
export const RESUME_URL = null;

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

function sample(title, lang, code, filename) {
  return { title, lang, code, filename: filename || "", label: SAMPLE_LABEL };
}

export const EXPERIENCES = [
  {
    id: "exp-mlc",
    org: "Memory & Lifespan Cognition (MLC) Lab",
    role: "Technical Research Assistant, Statistics & Software",
    dates: "Oct 2025 – Aug 2026",
    location: "UCLA Dept. of Psychology",
    summary: "A social psychology lab studying how people of different ages spot phishing emails and the biases behind their decisions. Ryan built the lab's data and statistics pipeline, from raw CSVs through model selection.",
    bullets: [
      "Merged and cleaned 12 separate CSV sources into one dataset of 12,000 rows by 20 columns covering 226 study participants, with schema checks on every entry so the data loaded cleanly.",
      "Turned the lab's signal detection theory (SDT) framework into a fully parameterized, end-to-end pipeline in R, with ggplot2 charts built in.",
      "The pipeline helped reveal a shift in response bias that raw accuracy numbers had hidden.",
      "Built mixed-effects model simulations in R (lme4, binomial logit) and tuned the BOBYQA optimizer.",
      "Automated likelihood-ratio tests and AIC comparisons so the team could compare competing models and pick one.",
    ],
    stack: ["R", "RStudio", "ggplot2", "lme4"],
    links: [],
    metricsCleared: true,
    metrics: [
      { final: "12 → 1", label: "dataset", note: "CSV sources merged", countFrom: 12, countTo: 1 },
      { final: "12,000 x 20", label: "rows by columns", note: "One validated dataset", count: 12000, commas: true, suffix: " x 20" },
      { final: "226", label: "participants", note: "Schema checks on every entry", count: 226 },
    ],
    charts: [
      {
        kind: "flow",
        title: "Sources into one dataset",
        caption: "12 CSV sources merged into 1 dataset",
        from: 12,
        to: 1,
        fromLabel: "12 CSV sources",
        toLabel: "1 dataset",
      },
    ],
    diagram: {
      caption: "R pipeline",
      nodes: ["CSV sources", "Validated dataset", "Signal detection theory (SDT)", "lme4"],
    },
    samples: [
      sample("Signal detection (d′ and criterion) per participant", "r", rSdt, "sdt-scores.R"),
      sample("Mixed-effects model", "r", rMixed, "mixed-effects.R"),
    ],
    // TODO: add citations when the lab publishes them.
    publications: [],
    image: "assets/ucla-royce-hall.webp",
  },
  {
    id: "exp-solarbrio",
    org: "Solarbrio (Ectios)",
    role: "Full-Stack Software Engineering (UI & Pipeline)",
    dates: "Jun 2024 – Sep 2024",
    location: "San Francisco (Hybrid)",
    summary: "A Series A startup building a geospatial resource analysis platform. Ryan worked on the delivery pipeline and the GraphQL data layer during the AWS Amplify V1 to V2 migration.",
    bullets: [
      "Supported and documented the migration of the delivery stack from AWS Amplify V1 to V2, cutting AWS resource costs over 6 months by about 30%.",
      "Cut the end-to-end CodeBuild pipeline from about 20 minutes to about 9.",
      "Built and tested 5 custom GraphQL resolvers on AWS AppSync in TypeScript to replace deprecated dependencies.",
      "Automated Amplify CodeGen across 3 runtime environments (dev, stage, prod).",
      "Added ElastiCache (Redis) caching at the resolver level on high-traffic queries, reducing DynamoDB read amplification and improving tail latency at peak usage.",
    ],
    stack: ["AWS Amplify", "AWS AppSync", "GraphQL", "TypeScript", "AWS CodeBuild", "ElastiCache (Redis)", "DynamoDB"],
    links: [{ href: "https://solarbrio.com/", label: "solarbrio.com" }],
    metricsCleared: true,
    metrics: [
      { final: "~30%", label: "AWS cost cut", note: "Resource costs over 6 months", count: 30, prefix: "~", suffix: "%" },
      { final: "~20 → ~9 min", label: "CodeBuild", note: "End-to-end pipeline", countFrom: 20, countTo: 9, prefixFrom: "~", prefixTo: "~", suffixTo: " min" },
      { final: "5", label: "resolvers", note: "Custom AppSync GraphQL resolvers", count: 5 },
      { final: "3", label: "environments", note: "dev, stage, prod", count: 3 },
    ],
    charts: [
      {
        kind: "compare",
        title: "CodeBuild",
        caption: "End-to-end pipeline, about 20 min to about 9 min",
        bars: [
          { label: "Before", value: 20, display: "~20 min" },
          { label: "After", value: 9, display: "~9 min" },
        ],
      },
      {
        kind: "share",
        title: "AWS resource cost",
        caption: "About 30% lower over 6 months",
        percent: 30,
        display: "~30%",
      },
    ],
    diagram: {
      caption: "Delivery path",
      nodes: ["Amplify V2", "AppSync resolvers", "Redis", "DynamoDB"],
    },
    samples: [
      sample("AppSync resolver with Redis caching", "ts", tsResolver, "resolver.ts"),
    ],
    image: "assets/san-francisco-skyline.webp",
  },
  {
    id: "exp-dso",
    org: "DSO National Laboratories",
    role: "Machine-Learning Infrastructure (SWE) Research",
    dates: "Jun 2022 – Jul 2023",
    location: "Singapore",
    summary: "In DSO's Satellite Sensors Lab, Ryan built infrastructure for a geospatial image segmentation pipeline based on convolutional neural networks.",
    bullets: [
      "Deployed an offline, air-gapped Kubernetes cluster that simulated running on a satellite.",
      "Built a custom Docker registry mirroring OS repositories so the cluster could start fully offline and run satellite-grade workloads.",
      {
        text: "Cleared a preprocessing bottleneck by replacing single-threaded OpenCV code with vectorized operations using Python multiprocessing and TensorFlow",
        figure: ", cutting preprocessing time by about 20%",
      },
      "Built Prometheus and Grafana dashboards to monitor GPU (NVIDIA CUDA) and memory use at each pipeline stage.",
      "Benchmarked resource use to inform the lab's capacity planning.",
    ],
    stack: ["Kubernetes", "Docker", "Python", "OpenCV", "TensorFlow", "Prometheus", "Grafana", "NVIDIA CUDA"],
    links: [],
    // Figures and charts stay hidden until this is true. Samples still render.
    metricsCleared: false,
    metrics: [
      { final: "~20%", label: "faster preprocessing", note: "Parallelized image preprocessing", count: 20, prefix: "~", suffix: "%" },
    ],
    charts: [
      {
        kind: "share",
        title: "Preprocessing time",
        caption: "About 20% faster",
        percent: 20,
        display: "~20%",
      },
    ],
    diagram: null,
    limitedNote: "Details limited for confidentiality",
    samples: [
      sample("Python multiprocessing preprocessing", "python", pyPreprocess, "preprocess.py"),
    ],
    image: "assets/nasa-blue-marble.webp",
  },
  {
    id: "exp-usac",
    org: "USAC Campus Events Commission",
    role: "Undergraduate Student Activities Council project",
    dates: "Oct 2023 – Jul 2025",
    location: "Los Angeles (UCLA)",
    summary: "The website for UCLA's Campus Events Commission, which posts daily event updates to more than 47,000 students. Ryan maintained and upgraded key backend features.",
    bullets: [
      "Maintained and upgraded key backend features for the campus events site, which serves daily event updates to more than 47,000 student users.",
      "Improved p95 latency by aggressively preloading and caching data with AWS ElastiCache.",
      "Cut direct database query load by 30 to 50% at peak traffic.",
      "Made the 5 busiest API endpoints about 3x faster at p95 than before ElastiCache was added.",
      "Cut new developer onboarding from more than 3.5 weeks to about 1 week by streamlining CI/CD with GitHub Actions and containerizing the dev and production environments with Docker Compose, so either can be started with one click.",
    ],
    stack: ["AWS ElastiCache", "GitHub Actions", "Docker", "Docker Compose"],
    links: [{ href: "https://www.uclacec.com/", label: "www.uclacec.com" }],
    metricsCleared: true,
    metrics: [
      { final: ">47,000", label: "student users", note: "Daily event updates", count: 47000, prefix: ">", commas: true },
      { final: "30–50%", label: "fewer database queries", note: "At peak traffic" },
      { final: "~3x", label: "p95 on the top 5 endpoints", note: "Faster than the pre-ElastiCache baseline", count: 3, prefix: "~", suffix: "x" },
      { final: ">3.5 → ~1 wk", label: "onboarding", note: "More than 3.5 weeks to about 1 week", countFrom: 3.5, countTo: 1, decimals: 1, decimalsTo: 0, prefixFrom: ">", prefixTo: "~", suffixFrom: " wk", suffixTo: " wk" },
    ],
    charts: [
      {
        kind: "compare",
        title: "p95 on the top 5 endpoints",
        caption: "About 3x faster after ElastiCache",
        bars: [
          { label: "Before", value: 3, display: "baseline" },
          { label: "After", value: 1, display: "~3x faster" },
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
      {
        kind: "range",
        title: "Database queries at peak",
        caption: "30 to 50% fewer direct queries",
        low: 30,
        high: 50,
      },
    ],
    diagram: {
      caption: "Campus events backend",
      nodes: ["GitHub Actions", "Docker Compose", "ElastiCache"],
    },
    samples: [
      sample(".github/workflows/ci.yml", "yaml", ymlCi, ".github/workflows/ci.yml"),
      sample("docker-compose.yml", "yaml", ymlCompose, "docker-compose.yml"),
    ],
    // TODO: add a screenshot of the public campus events site.
    screenshot: null,
    image: "assets/ucla-royce-hall.webp",
  },
];

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
