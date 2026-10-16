/**
 * Site configuration that JavaScript needs at runtime.
 * Page copy lives in the HTML so the portfolio is readable without JavaScript.
 * The email address is not stored here. js/mail.js assembles it from parts.
 *
 * Experience modal copy is the resume, rewritten for the dialog.
 * Where resume variants disagree, the majority wording and figures are used.
 * DSO figures are withheld pending clearance.
 */

/** TODO: set RESUME_URL to a public resume PDF. Until then the control asks by email. */
export const RESUME_URL = null;

export const LINKEDIN_URL = "https://www.linkedin.com/in/rphua-dev";

export const GITHUB_URL = "https://github.com/ryean0";

export const SITE_URL = "https://ryean0.github.io/";

export const SAMPLE_LABEL = "Illustrative example, not production code";

/**
 * Impact and About Me copy. Edit these strings to swap the page text.
 * index.html mirrors them so the page is readable without JavaScript.
 */
export const IMPACT = {
  kicker: "Results",
  title: "Impact",
  intro: "A few outcomes from my work on cloud infrastructure and developer tooling.",
  items: [
    "Cut monthly AWS costs by 30–45% while moving Solarbrio's delivery stack to AWS Amplify V2.",
    "Shortened Solarbrio's CodeBuild pipeline from about 13 minutes to about 9.",
    "Added Redis caching for the Campus Events Commission, making its busiest endpoints about 3x faster at p95 and reducing database load at peak by 30–50%.",
    "Containerized the Campus Events Commission's dev setup, which cut new-developer onboarding from about 4 weeks to under 1.",
  ],
};

export const ABOUT = {
  bio: "I studied Computer Science at UCLA (B.S., December 2025), focusing on distributed systems, operating systems, networking and machine learning. During my studies, I spent a year at DSO National Laboratories in Singapore working on ML infrastructure. I speak English and intermediate Mandarin.",
};

export const CERTIFICATIONS = [
  { name: "AWS Solutions Architect Associate (SAA-C03)", when: "Dec 2025" },
  { name: "AWS Certified Cloud Practitioner", when: "2024" },
  { name: "Certified AI Security Professional (CAISP)", when: "May 2026" },
  { name: "HarvardX Professional Certificate in Data Science", when: "2021" },
];

/** Outside-work notes. Leave empty until Ryan supplies them. */
export const FUN_FACTS = [];

export const CONTACT_CAPTION = "Based in Los Angeles, CA. Open to Relocation. Feel free to reach out at the following:";

export const PROFILE_SRC = "assets/profile.webp";

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
    src: "assets/daily-bruin-newsroom.webp",
    title: "The New York Times newsroom, 1942",
    author: "Marjory Collins",
    license: "Public domain",
    href: "https://commons.wikimedia.org/wiki/File:The_New_York_Times_newsroom_1942.jpg",
  },
  {
    src: "assets/server-room.webp",
    title: "Wikimedia Foundation servers",
    author: "Victor Grigas",
    license: "CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Wikimedia_Foundation_Servers-8055_14.jpg",
  },
  {
    src: "assets/art-gallery.webp",
    title: "Entrance of the Yale University Art Gallery",
    author: "Astarikov",
    license: "Public domain",
    href: "https://commons.wikimedia.org/wiki/File:Entrance_of_Yale_University_Art_Gallery.jpg",
  },
  {
    src: "assets/phonograph.webp",
    title: "Phonograph",
    author: "Harry Walker",
    license: "CC0",
    href: "https://commons.wikimedia.org/wiki/File:Phonograph.jpg",
  },
  {
    src: "assets/ethernet-cables.webp",
    title: "Ethernet cables",
    author: "Deavmi",
    license: "CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Ethernet_cables.jpg",
  },
  {
    src: "assets/typewriter.webp",
    title: "Underwood typewriter",
    author: "Maksym Kozlenko",
    license: "CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Underwood_typewriter.jpg",
  },
  {
    src: "assets/circuit-board.webp",
    title: "Printed circuit board",
    author: "Cjp24",
    license: "CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Printed_circuit_board.jpg",
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

const tsPact = [
  "// Illustrative example, not production code",
  'import { PactV3, MatchersV3 } from "@pact-foundation/pact";',
  'import { fetchArticle } from "../src/api";',
  "",
  "const { like, string } = MatchersV3;",
  'const provider = new PactV3({ consumer: "web-frontend", provider: "articles-api" });',
  "",
  'test("gets an article by slug", () => {',
  "  provider",
  '    .given("an article with slug \'hello-world\' exists")',
  '    .uponReceiving("a request for that article")',
  '    .withRequest({ method: "GET", path: "/articles/hello-world" })',
  "    .willRespondWith({",
  "      status: 200,",
  '      body: like({ slug: string("hello-world"), title: string("Hello"), body: string("...") }),',
  "    });",
  "",
  "  return provider.executeTest(async (mock) => {",
  '    const article = await fetchArticle(mock.url, "hello-world");',
  '    expect(article.slug).toBe("hello-world");',
  "  });",
  "});",
].join("\n");

const ymlBruin = [
  "# Illustrative example, not production code",
  "name: ci",
  "on:",
  "  push: { branches: [main] }",
  "  pull_request:",
  "",
  "jobs:",
  "  test:",
  "    runs-on: ubuntu-latest",
  "    steps:",
  "      - uses: actions/checkout@v4",
  "      - uses: actions/setup-node@v4",
  "        with: { node-version: 20, cache: npm }",
  "      - run: npm ci",
  "      - run: npm test -- --ci            # Jest unit and integration tests",
  "      - run: npm run test:pact           # consumer contracts",
  "",
  "  deploy:",
  "    needs: test",
  "    if: github.ref == 'refs/heads/main'",
  "    runs-on: ubuntu-latest",
  "    steps:",
  "      - uses: actions/checkout@v4",
  "      - run: npm ci && npm run build",
  '      - run: npx firebase-tools deploy --only hosting,functions --token "${{ secrets.FIREBASE_TOKEN }}"',
].join("\n");

const pyGuard = [
  "# Illustrative example, not production code",
  "from typing import Literal",
  "from pydantic import BaseModel, Field, ValidationError",
  "",
  'READ_ONLY_TOOLS = {"get_run", "list_failed_runs", "get_logs", "get_metrics"}',
  "",
  "class ToolCall(BaseModel):",
  "    tool: str",
  "    args: dict = Field(default_factory=dict)",
  "",
  "class TriageAnswer(BaseModel):",
  "    summary: str = Field(max_length=800)",
  '    suspected_cause: Literal["code_change", "infra", "flaky_test", "dependency", "unknown"]',
  "    evidence: list[str] = Field(max_length=10)",
  "    next_tool: ToolCall | None = None",
  "",
  "def parse_model_reply(raw_json: str) -> TriageAnswer:",
  "    try:",
  "        answer = TriageAnswer.model_validate_json(raw_json)",
  "    except ValidationError as err:",
  '        raise ValueError(f"model output failed schema check: {err}") from err',
  "",
  "    if answer.next_tool and answer.next_tool.tool not in READ_ONLY_TOOLS:",
  '        raise PermissionError(f"blocked non-read-only tool: {answer.next_tool.tool}")',
  "    return answer",
].join("\n");

const pyProm = [
  "# Illustrative example, not production code",
  "from prometheus_client import Counter, Gauge, Histogram, start_http_server",
  "",
  'RUN_SECONDS = Histogram("run_duration_seconds", "Run duration", ["pipeline"],',
  "                        buckets=(1, 5, 15, 30, 60, 120, 300, 600))",
  'RUN_ERRORS = Counter("run_errors_total", "Failed runs", ["pipeline"])',
  'QUEUE_DEPTH = Gauge("run_queue_depth", "Runs waiting to start")',
  "",
  "def record_run(pipeline: str, seconds: float, ok: bool) -> None:",
  "    RUN_SECONDS.labels(pipeline).observe(seconds)",
  "    if not ok:",
  "        RUN_ERRORS.labels(pipeline).inc()",
  "",
  "start_http_server(9100)",
  "# Grafana p95: histogram_quantile(0.95, sum by (le) (rate(run_duration_seconds_bucket[5m])))",
].join("\n");

const javaSearch = [
  "// Illustrative example, not production code",
  "@RestController",
  '@RequestMapping("/api/listings")',
  "public class ListingSearchController {",
  "",
  "    private final ElasticsearchOperations es;",
  "",
  "    public ListingSearchController(ElasticsearchOperations es) {",
  "        this.es = es;",
  "    }",
  "",
  "    @GetMapping(\"/search\")",
  "    public List<Listing> search(@RequestParam String q,",
  "                                @RequestParam(required = false) String medium,",
  '                                @RequestParam(defaultValue = "0") int page) {',
  '        Criteria criteria = new Criteria("title").matches(q)',
  '                .or(new Criteria("artist").matches(q));',
  "        if (medium != null) {",
  '            criteria = criteria.and(new Criteria("medium").is(medium));',
  "        }",
  "        Query query = new CriteriaQuery(criteria).setPageable(PageRequest.of(page, 20));",
  "",
  "        return es.search(query, Listing.class).stream()",
  "                 .map(SearchHit::getContent)",
  "                 .toList();",
  "    }",
  "}",
].join("\n");

const javaDoc = [
  "// Illustrative example, not production code",
  '@Document(indexName = "listings")',
  "public record Listing(",
  "        @Id String id,",
  '        @Field(type = FieldType.Text, analyzer = "english") String title,',
  "        @Field(type = FieldType.Text) String artist,",
  "        @Field(type = FieldType.Keyword) String medium,",
  "        @Field(type = FieldType.Double) double price) {}",
].join("\n");

const tsMusic = [
  "// Illustrative example, not production code",
  "export async function tracksFor(userId: string) {",
  '  const rows = await db.collection("tracks").find({ ownerId: userId }).toArray();',
  "  return rows.map((row) => ({ id: String(row._id), title: row.title }));",
  "}",
].join("\n");

const goPaxos = [
  "// Illustrative example, not production code",
  "package paxos",
  "",
  "func (n *Node) prepare(round int) bool {",
  "    if round <= n.promised {",
  "        return false",
  "    }",
  "    n.promised = round",
  "    return true",
  "}",
].join("\n");

const pyNlp = [
  "# Illustrative example, not production code",
  "def stylometry(text: str) -> dict:",
  "    sentences = [part.strip() for part in text.split('.') if part.strip()]",
  "    words = text.split()",
  "    lengths = [len(sentence.split()) for sentence in sentences] or [0]",
  '    return {',
  '        "sentences": len(sentences),',
  '        "vocab": len(set(word.lower() for word in words)),',
  '        "mean_sentence_len": sum(lengths) / len(lengths),',
  "    }",
].join("\n");

const vlogSnake = [
  "// Illustrative example, not production code",
  "module clock_div (",
  "  input wire clk_100,",
  "  output reg clk_25",
  ");",
  "  reg [1:0] count = 0;",
  "  always @(posedge clk_100) begin",
  "    count <= count + 1;",
  "    clk_25 <= count[1];",
  "  end",
  "endmodule",
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
  "      - name: Compare candidate with baseline",
  "        run: anubys check",
].join("\n");

function sample(title, lang, code, filename) {
  return { title, lang, code, filename: filename || "", label: SAMPLE_LABEL };
}

const ROLES = [
  {
    id: "exp-mlc",
    org: "Memory and Lifespan Cognition Lab",
    role: "Technical Research Assistant, Statistics & Software",
    dates: "Oct 2025 – Aug 2026",
    location: "UCLA Dept. of Psychology",
    summary: "The Memory and Lifespan Cognition Lab studies how people of different ages spot phishing emails and the biases behind their decisions. Ryan built the lab's data and statistics pipeline, from raw CSVs through model selection.",
    bullets: [
      "Merged and cleaned 12 separate CSV sources into one dataset of 12,000 rows by 20 columns covering 226 study participants, with schema checks on every entry so the data loaded cleanly.",
      "Turned the lab's signal detection theory (SDT) framework into a fully parameterized, end-to-end pipeline in R, with ggplot2 charts built in.",
      "The pipeline helped reveal a shift in response bias that raw accuracy numbers had hidden.",
      "Built mixed-effects model simulations in R (lme4, binomial logit) and tuned the BOBYQA optimizer.",
      "Automated likelihood-ratio tests and AIC comparisons so the team could compare competing models and pick one.",
    ],
    stack: ["R", "RStudio", "ggplot2", "lme4"],
    links: [{ href: "https://www.psych.ucla.edu/faculty-page/castel/", label: "Castel faculty page" }],
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
    id: "exp-usac",
    org: "Campus Events Commission (USAC)",
    role: "Backend and DevOps Developer, then Backend Lead",
    dates: "Sep 2023 – Jul 2025",
    location: "Los Angeles, CA",
    summary: "Backend for UCLA's Campus Events Commission. Ryan joined as a backend and DevOps developer and later became Backend Lead. About 200 to 312 hours.",
    bullets: [
      "Containerized dev and production with Docker Compose so either environment starts in one step, cutting new-developer onboarding from ~4 weeks to under 1 week.",
      "Added Redis caching on AWS ElastiCache. Direct database query load fell 30-50% at peak traffic.",
      "Made the 5 busiest API endpoints about 3x faster at p95 than before ElastiCache was added.",
      "Started PR-gated CI on GitHub Actions, which surfaced 8+ regressions that had been shipping without a blocking check.",
      "Consolidated 3+ repositories into a monorepo with shared CodeGen schemas, and added CloudWatch dashboards that caught 4 pre-deploy issues across 6 services.",
      "Moved ad-hoc builds to GitHub Actions on AWS CodeBuild, cutting build time from ~13 minutes to ~7.5 minutes and the deployment failure rate by ~25%.",
      "As Backend Lead, ran sprint facilitation on Jira and pulled the team's deliverable timeline forward by 3 weeks.",
    ],
    stack: ["AWS ElastiCache", "GitHub Actions", "Docker", "Docker Compose", "AWS CloudWatch", "AWS CodeBuild"],
    links: [{ href: "https://www.uclacec.com/", label: "www.uclacec.com" }],
    metricsCleared: true,
    metrics: [
      { final: "30–50%", label: "fewer database queries", note: "At peak traffic" },
      { final: "~3x", label: "p95 on the top 5 endpoints", note: "Faster than the pre-ElastiCache baseline", count: 3, prefix: "~", suffix: "x" },
      { final: "~4 → <1 wk", label: "onboarding", note: "About 4 weeks to under 1 week", countFrom: 4, countTo: 1, prefixFrom: "~", prefixTo: "<", suffixFrom: " wk", suffixTo: " wk" },
      { final: "8+", label: "regressions caught", note: "PR-gated GitHub Actions", count: 8, suffix: "+" },
      { final: "~13 → ~7.5 min", label: "build time", note: "GitHub Actions on CodeBuild", countFrom: 13, countTo: 7.5, decimalsTo: 1, prefixFrom: "~", prefixTo: "~", suffixTo: " min" },
      { final: "3 wk", label: "timeline pulled forward", note: "Jira sprint facilitation as Backend Lead", count: 3, suffix: " wk" },
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
        caption: "About 4 weeks to under 1 week",
        bars: [
          { label: "Before", value: 4, display: "~4 wk" },
          { label: "After", value: 1, display: "<1 wk" },
        ],
      },
      {
        kind: "range",
        title: "Database queries at peak",
        caption: "30 to 50% fewer direct queries",
        low: 30,
        high: 50,
      },
      {
        kind: "compare",
        title: "Build time",
        caption: "About 13 min to about 7.5 min on CodeBuild",
        bars: [
          { label: "Before", value: 13, display: "~13 min" },
          { label: "After", value: 7.5, display: "~7.5 min" },
        ],
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
  {
    id: "exp-solarbrio",
    org: "Ectios",
    role: "Software Engineering Intern (Cloud & DevOps)",
    dates: "Jun 2024 – Sep 2024",
    location: "Solarbrio Geospatial Platform · California",
    summary: "Geospatial resource analysis platform. Ryan worked on the Amplify delivery migration, AppSync resolvers, and a cross-cloud port of the same pipeline pattern.",
    bullets: [
      "Led the delivery-stack migration from AWS Amplify V1 to V2, restoring stable CI/CD across 3 teams. Reduced monthly AWS costs by 30-45% and compressed the end-to-end CodeBuild pipeline from ~13 to ~9 minutes.",
      "Built and tested 5 custom GraphQL resolvers on AWS AppSync in TypeScript to replace deprecated dependencies.",
      "Automated Amplify CodeGen across dev, stage, and prod.",
      "Added ElastiCache (Redis) caching at the resolver level on high-traffic queries, reducing DynamoDB read amplification and improving tail latency at peak usage.",
      "Ported the pipeline pattern to GCP with Apollo GraphQL on Cloud Run, and recreated Lambda handlers as Cloud Functions.",
      "Shipped an initial private Angular and Tailwind CSS component library so frontend teams shared one UI style.",
      "Worked with frontend, backend, and product on IAM and auth standards, reducing deployment drift across dev, stage, and prod.",
    ],
    stack: ["AWS Amplify", "AWS AppSync", "GraphQL", "TypeScript", "AWS CodeBuild", "ElastiCache (Redis)", "DynamoDB", "Apollo GraphQL", "GCP Cloud Run"],
    links: [{ href: "https://solarbrio.com/", label: "solarbrio.com" }],
    metricsCleared: true,
    metrics: [
      { final: "30–45%", label: "monthly AWS cost cut", note: "After the Amplify V2 migration" },
      { final: "~13 → ~9 min", label: "CodeBuild", note: "End-to-end pipeline", countFrom: 13, countTo: 9, prefixFrom: "~", prefixTo: "~", suffixTo: " min" },
      { final: "3", label: "teams", note: "Front and backend teams on the migration", count: 3 },
      { final: "5", label: "resolvers", note: "Custom AppSync GraphQL resolvers", count: 5 },
    ],
    charts: [
      {
        kind: "compare",
        title: "CodeBuild",
        caption: "End-to-end pipeline, about 13 min to about 9 min",
        bars: [
          { label: "Before", value: 13, display: "~13 min" },
          { label: "After", value: 9, display: "~9 min" },
        ],
      },
      {
        kind: "range",
        title: "Monthly AWS resource cost",
        caption: "30 to 45% lower monthly AWS costs",
        low: 30,
        high: 45,
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
    id: "exp-daily-bruin",
    org: "The Daily Bruin",
    role: "DevOps and Backend Lead, DBOnline Media Team",
    dates: "Jan 2022 – Apr 2024",
    location: "Los Angeles, CA",
    summary: "DBOnline is the Daily Bruin media team. Ryan led the backend move off legacy hosting and put automated tests in front of deploys. About 250 hours.",
    bullets: [
      "Led the backend migration from legacy DigitalOcean and Apache hosting to Firebase on GCP, consolidating 5 services into one Dockerized monorepo with under 1% integration errors.",
      "Kept 100% feature parity after the migration, with Jest unit and integration tests on the moved features.",
      "Replaced ad-hoc local pushes with GitHub Actions deploys to AWS EC2, cutting build times by ~50% and the deployment failure rate by ~25%.",
      "Added Pact contract tests in CI so schema breaks between services and the frontend were caught before production, including 4+ failures.",
    ],
    stack: ["Firebase", "Google Cloud", "Docker", "GitHub Actions", "Jest", "Pact", "AWS EC2"],
    links: [{ href: "https://www.dailybruin.com/", label: "dailybruin.com" }],
    metricsCleared: true,
    metrics: [
      { final: "~50%", label: "shorter builds", note: "GitHub Actions replacing ad-hoc pushes", count: 50, prefix: "~", suffix: "%" },
      { final: "~25%", label: "fewer deploy failures", note: "After the CI upgrade", count: 25, prefix: "~", suffix: "%" },
      { final: "5 → 1", label: "services to monorepo", note: "Under 1% integration errors", countFrom: 5, countTo: 1 },
      { final: "100%", label: "feature parity", note: "Jest unit and integration coverage of the move", count: 100, suffix: "%" },
      { final: "4+", label: "schema breaks caught", note: "Pact contract tests before production", count: 4, suffix: "+" },
    ],
    charts: [
      {
        kind: "share",
        title: "Build time",
        caption: "About 50% shorter builds",
        percent: 50,
        display: "~50%",
      },
      {
        kind: "share",
        title: "Deployment failures",
        caption: "About 25% fewer deployment failures",
        percent: 25,
        display: "~25%",
      },
      {
        kind: "flow",
        title: "Services into one monorepo",
        caption: "5 services consolidated into 1 Dockerized monorepo",
        from: 5,
        to: 1,
        fromLabel: "5 services",
        toLabel: "1 monorepo",
      },
    ],
    diagram: {
      caption: "DBOnline delivery path",
      nodes: ["Firebase on GCP", "Docker monorepo", "GitHub Actions", "Pact"],
    },
    samples: [
      sample("Pact consumer contract test", "ts", tsPact, "article.pact.ts"),
      sample("CI gating Firebase deploys", "yaml", ymlBruin, ".github/workflows/ci.yml"),
    ],
    image: "assets/daily-bruin-newsroom.webp",
  },
  {
    id: "exp-dso",
    org: "DSO National Laboratories",
    role: "Machine-Learning Infrastructure Research Intern",
    dates: "Jun 2022 – Jul 2023",
    location: "Singapore",
    summary: "At DSO National Laboratories, Ryan built infrastructure for a geospatial image segmentation pipeline.",
    bullets: [
      "Deployed an offline, air-gapped Kubernetes cluster that simulated running on a satellite.",
      "Built a custom Docker registry mirroring OS repositories so the cluster could start fully offline and run satellite-grade workloads.",
      "Cleared a preprocessing bottleneck by replacing single-threaded OpenCV code with vectorized operations using Python multiprocessing and TensorFlow.",
      "Built Prometheus and Grafana dashboards to monitor GPU (NVIDIA CUDA) and memory use at each pipeline stage.",
      "Benchmarked resource use to inform the lab's capacity planning.",
    ],
    stack: ["Kubernetes", "Docker", "Python", "OpenCV", "TensorFlow", "Prometheus", "Grafana", "NVIDIA CUDA"],
    links: [],
    // DSO figures are withheld pending clearance.
    metricsCleared: false,
    metrics: [],
    charts: [],
    diagram: null,
    limitedNote: "Details limited for confidentiality",
    samples: [
      sample("Python multiprocessing preprocessing", "python", pyPreprocess, "preprocess.py"),
    ],
    image: "assets/nasa-blue-marble.webp",
  },
];

export const PROJECTS = [
  {
    id: "exp-anubys",
    kind: "project",
    org: "Anubys",
    role: "CI-native agent regression harness",
    dates: "Public beta",
    location: "anubys.dev",
    summary: "Anubys compares a candidate LLM agent to a baseline on paired scenarios in CI and returns one stats-backed merge check: Pass, Block, or Insufficient evidence. The check adds 0 ms in production and stops at a $38 spend cap.",
    bullets: [
      "Runs when a pull request opens. Production traffic does not pass through it.",
      "The verdict is Pass, Block, or Insufficient evidence.",
      "Keyless CI uses OIDC IAM roles. Results can land in S3. The site is static on GitHub Pages.",
      "Status: public beta. The harness repository is not public yet.",
    ],
    stack: ["Python", "GitHub Actions", "AWS S3", "OIDC IAM roles", "Terraform", "Gemini API", "GitHub Pages"],
    links: [
      { href: "https://anubys.dev/", label: "anubys.dev" },
      { href: "projects/anubys/", label: "Project details" },
    ],
    metricsCleared: true,
    metrics: [
      { final: "0 ms", label: "added in production", note: "The check stays in CI" },
      { final: "$38", label: "spend stop", note: "Public beta cap" },
    ],
    charts: [],
    diagram: {
      caption: "Where the check runs",
      nodes: ["Pull request", "Paired scenarios", "Merge verdict"],
    },
    samples: [
      sample("CI step", "yaml", ymlAnubys, ".github/workflows/anubys.yml"),
    ],
    image: "assets/server-room.webp",
  },
  {
    id: "exp-runops",
    kind: "project",
    org: "RunOpsAI",
    role: "AI-native DevOps web console",
    dates: "Oct 2025 – Present",
    location: "Personal project, ~240 hours",
    summary: "A web console for CI runs that pairs Prometheus and Grafana views with a guardrailed assistant. The assistant can read runtime metadata. It cannot change it.",
    bullets: [
      "Built a run-tracking service and dashboard for p50 and p95 latency, error rate, and queue depth, backed by Prometheus and Grafana.",
      "Added CI gates for tests, lint, and deploy checks before a change can proceed.",
      "Built a guardrailed LLM assistant whose outputs must match a schema, with read-only tools for incident triage.",
    ],
    stack: ["Prometheus", "Grafana", "Python", "CI"],
    links: [],
    metricsCleared: true,
    metrics: [
      { final: "~240", label: "hours", note: "Personal project, in progress", count: 240, prefix: "~" },
    ],
    charts: [],
    diagram: {
      caption: "Read-only triage path",
      nodes: ["CI runs", "Prometheus", "Schema-checked assistant"],
    },
    samples: [
      sample("Schema-checked assistant, read-only tools", "python", pyGuard, "triage.py"),
      sample("Run metrics for Prometheus", "python", pyProm, "metrics.py"),
    ],
    image: "assets/server-room.webp",
  },
  {
    id: "exp-bruincreates",
    kind: "project",
    org: "BruinCreates",
    role: "Frontend lead, artwork exchange and marketplace",
    dates: "Feb 2023 – Jan 2024",
    location: "UCLA, ~110 hours",
    summary: "A UCLA marketplace for listing, finding, and exchanging artwork. Ryan led the frontend and the search and Instagram seller features.",
    bullets: [
      "Led the frontend in React and Redux, and integrated Java Spring Boot REST APIs for listings, search, and seller workflows.",
      "Connected Instagram Basic Display and Graph APIs so sellers could show an art feed on their marketplace profile.",
      "Built search on Java Spring and Elasticsearch. Indexing changes cut search latency by 50%, checked with ES Rally.",
    ],
    stack: ["React", "Redux", "Java", "Spring Boot", "Elasticsearch", "Instagram API"],
    links: [],
    metricsCleared: true,
    metrics: [
      { final: "50%", label: "lower search latency", note: "Checked with ES Rally", count: 50, suffix: "%" },
      { final: "~110", label: "hours", note: "UCLA collaborative project", count: 110, prefix: "~" },
    ],
    charts: [
      {
        kind: "share",
        title: "Search latency",
        caption: "50% lower search latency, checked with ES Rally",
        percent: 50,
        display: "50%",
      },
    ],
    diagram: {
      caption: "Marketplace path",
      nodes: ["React and Redux", "Spring Boot", "Elasticsearch"],
    },
    samples: [
      sample("Search endpoint", "java", javaSearch, "ListingSearchController.java"),
      sample("Listing document", "java", javaDoc, "Listing.java"),
    ],
    image: "assets/art-gallery.webp",
  },
  {
    id: "exp-music",
    kind: "project",
    org: "Social music app",
    role: "Full-stack TypeScript, live chat and Spotify",
    dates: "~168 hours",
    location: "UCLA project",
    summary: "A social music app with live chat. Ryan turned Figma wireframes into the MVP and reworked the MongoDB access path that was slowing queries.",
    bullets: [
      "Worked with product leads to turn Figma wireframes into an MVP, with music discovery on the Spotify API and recommendations from AWS AI Personalize.",
      "Simplified the MongoDB schema and the TypeScript queries. Query execution time improved by 60% with steady throughput at peak load.",
      "API query latency fell by 3x after the database refactor, checked on AWS CloudWatch.",
    ],
    stack: ["TypeScript", "MongoDB", "Spotify API", "AWS AI Personalize", "AWS CloudWatch", "Figma"],
    links: [],
    metricsCleared: true,
    metrics: [
      { final: "60%", label: "faster query execution", note: "After the MongoDB schema change", count: 60, suffix: "%" },
      { final: "3x", label: "lower API latency", note: "Checked on CloudWatch", count: 3, suffix: "x" },
      { final: "~168", label: "hours", note: "UCLA project", count: 168, prefix: "~" },
    ],
    charts: [
      {
        kind: "share",
        title: "Query execution time",
        caption: "60% faster query execution after the schema change",
        percent: 60,
        display: "60%",
      },
      {
        kind: "compare",
        title: "API query latency",
        caption: "3x lower after the database refactor, checked on CloudWatch",
        bars: [
          { label: "Before", value: 3, display: "baseline" },
          { label: "After", value: 1, display: "3x lower" },
        ],
      },
    ],
    diagram: {
      caption: "App path",
      nodes: ["Figma MVP", "TypeScript API", "MongoDB"],
    },
    samples: [
      sample("Playlist query after the schema change", "ts", tsMusic, "tracks.ts"),
    ],
    image: "assets/phonograph.webp",
  },
  {
    id: "exp-paxos",
    kind: "project",
    org: "Paxos on GKE",
    role: "Distributed consensus course project",
    dates: "~108 hours",
    location: "UCLA, distributed systems",
    summary: "A fault-tolerant key-value store deployed on Google Kubernetes Engine. Ryan implemented Paxos-style election, sharding, and membership, and automated the deploy with Terraform and CloudFormation.",
    bullets: [
      "Deployed the store on GKE with election rules, sharding, and group membership as separate Docker services on Kubernetes StatefulSets.",
      "Built an infrastructure-as-code pipeline with Terraform and AWS CloudFormation for repeatable deploys.",
      "Failover recovery on the Kubernetes deploy was 40% faster than the locally hosted Paxos version.",
    ],
    stack: ["GKE", "Kubernetes", "Docker", "Terraform", "AWS CloudFormation", "Paxos"],
    links: [],
    metricsCleared: true,
    metrics: [
      { final: "40%", label: "faster failover", note: "Kubernetes deploy versus the local version", count: 40, suffix: "%" },
      { final: "~108", label: "hours", note: "UCLA course project", count: 108, prefix: "~" },
    ],
    charts: [
      {
        kind: "share",
        title: "Failover recovery",
        caption: "40% faster failover than the locally hosted version",
        percent: 40,
        display: "40%",
      },
    ],
    diagram: {
      caption: "Consensus deploy",
      nodes: ["Clients", "Paxos replicas", "GKE StatefulSets"],
    },
    samples: [
      sample("Prepare step", "go", goPaxos, "prepare.go"),
    ],
    image: "assets/ethernet-cables.webp",
  },
  {
    id: "exp-nlp",
    kind: "project",
    org: "AI-generated text detection",
    role: "NLP course project",
    dates: "~168 hours",
    location: "UCLA, machine learning",
    summary: "An end-to-end PyTorch detector for AI-written text, trained in Colab. The model looks at meaning and at writing style.",
    bullets: [
      "Built the pipeline in Google Colab: custom dataloaders, the model, and the training and evaluation loop.",
      "Assembled about 200,000 text samples from 4 sources, including AI-written text for adversarial training.",
      "Added stylometric features for sentence structure and word choice, alongside the semantic signal.",
      "Raised development-set accuracy from 75% to 89% by balancing the data, adjusting features, and tuning hyperparameters.",
    ],
    stack: ["PyTorch", "Python", "Google Colab"],
    links: [],
    metricsCleared: true,
    metrics: [
      { final: "75% → 89%", label: "development accuracy", note: "After balancing, features, and tuning", countFrom: 75, countTo: 89, suffixFrom: "%", suffixTo: "%" },
      { final: "~200,000", label: "text samples", note: "4 sources, including AI-written text", count: 200000, prefix: "~", commas: true },
      { final: "4", label: "sources", note: "Corpus sources", count: 4 },
      { final: "~168", label: "hours", note: "UCLA course project", count: 168, prefix: "~" },
    ],
    charts: [
      {
        kind: "compare",
        title: "Development-set accuracy",
        caption: "75% to 89% after balancing, features, and tuning",
        bars: [
          { label: "Before", value: 75, display: "75%" },
          { label: "After", value: 89, display: "89%" },
        ],
      },
    ],
    diagram: {
      caption: "Detection pipeline",
      nodes: ["Text corpus", "Stylometric features", "PyTorch model"],
    },
    samples: [
      sample("Stylometric features", "python", pyNlp, "stylometry.py"),
    ],
    image: "assets/typewriter.webp",
  },
  {
    id: "exp-snake",
    kind: "project",
    org: "Snake on a Basys-3 FPGA",
    role: "Verilog course project",
    dates: "~108 hours",
    location: "UCLA, embedded systems",
    summary: "A Snake game written in Verilog and run on a Basys-3 board, with VGA graphics and a 7-segment score.",
    bullets: [
      "Built Snake in Verilog with boundary and collision handling, and ran it on a Basys-3 FPGA with a VGA display.",
      "Divided the 100 MHz board clock down to a 25 MHz pixel clock so the VGA image stayed stable.",
      "Spawned food with a linear-feedback shift register, only in empty cells.",
      "Tied the modules together, including a 7-segment display for the live score.",
    ],
    stack: ["Verilog", "Basys-3 FPGA", "VGA"],
    links: [],
    metricsCleared: true,
    metrics: [
      { final: "100 → 25 MHz", label: "pixel clock", note: "Clock divider for VGA", countFrom: 100, countTo: 25, suffixTo: " MHz" },
      { final: "~108", label: "hours", note: "UCLA course project", count: 108, prefix: "~" },
    ],
    charts: [
      {
        kind: "compare",
        title: "Clock divider",
        caption: "100 MHz board clock to a 25 MHz VGA pixel clock",
        bars: [
          { label: "Board", value: 100, display: "100 MHz" },
          { label: "Pixel", value: 25, display: "25 MHz" },
        ],
      },
    ],
    diagram: {
      caption: "Board path",
      nodes: ["Buttons", "Verilog game logic", "VGA output"],
    },
    samples: [
      sample("Clock divider", "verilog", vlogSnake, "clock_div.v"),
    ],
    image: "assets/circuit-board.webp",
  },
];

export const EXPERIENCES = ["exp-mlc", "exp-solarbrio", "exp-dso"].map((id) => ROLES.find((role) => role.id === id));

export const CAMPUS_WORK = ["exp-usac", "exp-daily-bruin"].map((id) => ROLES.find((role) => role.id === id));

export const ENTRIES = [...EXPERIENCES, ...CAMPUS_WORK, ...PROJECTS];

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
