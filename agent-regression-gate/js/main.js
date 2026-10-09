import { CANDIDATES, SCENARIO_SETS, buildRun } from "./demo-data.js";
import { parseResults } from "./results.js";
import { METHOD_NOTES, formatPercent, formatPoints, formatSignedNumber, interpretSlot, scoreRun } from "./verdict.js";

const EMAIL = "ryanphua.dev@outlook.com";
const SLOT_LABEL = {
  pass: "Pass",
  fail: "Fail",
  agent_timeout: "Agent timeout, counted as a fail",
  infra_timeout: "Infrastructure timeout, excluded",
  missing: "Missing result, excluded",
};

function asset(path) {
  const base = document.documentElement.dataset.base || "./";
  return new URL(path, new URL(base, window.location.href)).href;
}

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (key === "class") node.className = value;
    else if (key.startsWith("on") && typeof value === "function") node.addEventListener(key.slice(2).toLowerCase(), value);
    else if (value === true) node.setAttribute(key, "");
    else if (value !== false && value != null) node.setAttribute(key, String(value));
  }
  for (const child of [].concat(children)) {
    if (child == null || child === false) continue;
    node.append(child instanceof Node ? child : document.createTextNode(String(child)));
  }
  return node;
}

function initChrome() {
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-menu");
  const progress = document.getElementById("progress");
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    nav.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "Close" : "Menu";
    if (open) menu.querySelector("a")?.focus();
  });
  menu.addEventListener("click", (event) => {
    if (event.target.closest("a, button")) {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "Menu";
    }
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.classList.contains("is-open")) {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "Menu";
      toggle.focus();
    }
  });

  const sections = [...document.querySelectorAll("main section[id]")];
  const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    for (const link of menu.querySelectorAll("a[href^='#']")) {
      link.toggleAttribute("aria-current", link.getAttribute("href") === `#${visible.target.id}`);
      if (link.getAttribute("href") === `#${visible.target.id}`) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    }
  }, { rootMargin: "-45% 0px -45% 0px", threshold: [0.2, 0.5] });
  sections.forEach((section) => observer.observe(section));

  for (const button of document.querySelectorAll(".term button")) {
    button.addEventListener("click", () => {
      const open = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!open));
      button.parentElement.classList.toggle("is-open", !open);
    });
  }

  const dialog = document.getElementById("pilot");
  for (const button of document.querySelectorAll("[data-pilot]")) {
    button.addEventListener("click", () => dialog.showModal());
  }
  document.getElementById("pilot-cancel").addEventListener("click", () => dialog.close());
  document.getElementById("pilot-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = [
      `Name: ${String(data.get("name") || "").trim()}`,
      `Work email: ${String(data.get("email") || "").trim()}`,
      `Company: ${String(data.get("company") || "").trim()}`,
      "",
      String(data.get("note") || "").trim() || "We would like to pilot the CI Agent Regression Harness.",
    ].join("\n");
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Pilot: CI Agent Regression Harness")}&body=${encodeURIComponent(body)}`;
    document.getElementById("pilot-note").textContent = `If your email app did not open, write to ${EMAIL}.`;
  });
}

function renderBanner(banner) {
  const host = document.getElementById("status-banner");
  host.replaceChildren(el("div", { class: "banner", "data-tone": banner.tone, role: "status" }, [
    el("div", { class: "wrap banner-inner" }, [
      el("strong", {}, banner.title),
      el("span", {}, banner.body),
    ]),
  ]));
}

function missLine(counts) {
  return Object.entries(counts).map(([key, value]) => `${key} ${value}`).join(", ");
}

function renderResults(view) {
  renderBanner(view.banner);
  const root = document.getElementById("results-root");
  const armRows = [
    ["Scheduled rollouts", view.arms.baseline.scheduled, view.arms.candidate.scheduled],
    ["Environment misses", view.arms.baseline.environmentMisses, view.arms.candidate.environmentMisses],
    ["Miss counts", missLine(view.arms.baseline.missCounts), missLine(view.arms.candidate.missCounts)],
    ["Pass rate", view.arms.baseline.passRateText, view.arms.candidate.passRateText],
    ["Over the 5% miss line", view.arms.baseline.overMissLimit ? "Yes" : "No", view.arms.candidate.overMissLimit ? "Yes" : "No"],
  ];

  root.replaceChildren(el("div", { class: "panel" }, [
    el("p", { class: "kicker" }, "Suite verdict"),
    el("article", { class: "verdict", "data-verdict": view.verdict }, [
      el("p", { class: "kicker" }, view.status === "preliminary" ? "Preliminary file" : "Final file"),
      el("h3", {}, view.headline),
      el("p", { class: "why" }, view.why),
    ]),
    el("div", { class: "sheet sheet-head" }, [el("span", {}, "Recorded"), el("strong", {}, "Baseline"), el("strong", {}, "Candidate")]),
    ...armRows.map(([label, base, cand]) => el("div", { class: "sheet" }, [
      el("span", {}, label), el("strong", {}, String(base)), el("strong", {}, String(cand)),
    ])),
    el("p", { class: "fine" }, "Exactly 5% of scheduled rollouts may be environment misses. More than that, on either arm, is over the line. The suite verdict above is the file’s likely_regression field, not a second score computed in the browser."),
    el("h3", { style: "margin-top:1.4rem;font-size:1.25rem" }, "Scenario diagnostics"),
    el("table", { class: "diag" }, [
      el("caption", {}, "Diagnostics only. These rates do not pass or block a scenario."),
      el("thead", {}, el("tr", {}, [el("th", { scope: "col" }, "Scenario"), el("th", { scope: "col" }, "Baseline rate"), el("th", { scope: "col" }, "Candidate rate")])),
      el("tbody", {}, view.scenarios.map((row) => el("tr", {}, [
        el("th", { scope: "row" }, row.name),
        el("td", {}, row.baselineText),
        el("td", {}, row.candidateText),
      ]))),
    ]),
    el("div", { class: "charts" }, [renderChart(view.charts.mde), renderChart(view.charts.aa)]),
    view.summaryNote ? el("p", { class: "file-note" }, view.summaryNote) : null,
    el("p", { class: "file-note" }, [
      "Loaded from ",
      el("a", { href: asset("data/results.preliminary.json") }, "data/results.preliminary.json"),
      ". level 0.9.",
    ]),
  ]));
}

function renderChart(chart) {
  const body = chart.status === "coming_soon"
    ? el("div", { class: "chart-frame" }, "Coming soon. No series is drawn for this check.")
    : chart.points.length
      ? mdeSvg(chart)
      : el("div", { class: "chart-frame" }, [
          el("p", {}, `${chart.yLabel || chart.title} against ${chart.xLabel || "rollout budget"}.`),
          el("p", {}, "Preliminary. This file does not include a series yet."),
        ]);
  return el("figure", { class: "chart" }, [
    el("header", {}, [
      el("h3", {}, chart.title),
      el("span", { class: "pill", "data-status": chart.status }, chart.status === "coming_soon" ? "Coming soon" : chart.status),
    ]),
    body,
    el("figcaption", {}, chart.caption || "No caption in this results file."),
  ]);
}

function mdeSvg(chart) {
  const width = 520;
  const height = 220;
  const pad = 36;
  const budgets = chart.points.map((point) => point.budget);
  const maxBudget = Math.max(...budgets, 1);
  const coords = chart.points.map((point, index) => {
    const x = pad + (point.budget / maxBudget) * (width - pad * 2);
    const y = pad + index * 8;
    return `${x},${height - y}`;
  });
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", `${chart.title}. ${chart.points.map((point) => `${point.budget} rollouts, drop ${point.dropText}`).join(". ")}`);
  svg.innerHTML = `<line x1="${pad}" y1="${height - pad}" x2="${width - 16}" y2="${height - pad}" stroke="#1c1915"/><line x1="${pad}" y1="16" x2="${pad}" y2="${height - pad}" stroke="#1c1915"/><polyline fill="none" stroke="#0e5c45" stroke-width="2" points="${coords.join(" ")}"/>`;
  return el("div", { class: "chart-frame", style: "background:#fff" }, svg);
}

function renderResultsError(error) {
  renderBanner({
    tone: "error",
    title: "Results file could not be read",
    body: error.message,
  });
  document.getElementById("results-root").replaceChildren(
    el("div", { class: "panel" }, [
      el("h3", {}, "The results file did not match version 1"),
      el("p", { class: "why" }, error.message),
    ]),
  );
}

function tally(slots, shown) {
  let passes = 0;
  let valid = 0;
  for (const slot of slots.slice(0, shown)) {
    const item = interpretSlot(slot);
    if (item.valid) {
      valid += 1;
      if (item.score === 1) passes += 1;
    }
  }
  return { passes, valid, rate: valid ? passes / valid : null };
}

function renderDemo() {
  const root = document.getElementById("demo-root");
  let setId = SCENARIO_SETS[0].id;
  let candidateId = "stable";
  let phase = "idle";
  let revealed = 0;
  let result = null;
  let input = null;
  let token = 0;
  const timers = [];

  const live = el("div", { "aria-live": "polite", "aria-atomic": "true" });
  const stage = el("div");
  const shell = el("div", { class: "sim-shell" }, [
    el("p", { class: "sim-banner" }, [
      el("strong", {}, "Simulated demo data"),
      el("span", {}, "Not the results file. Not a customer benchmark."),
    ]),
    el("div", { class: "pickers" }, [
      fieldset("Scenario set", "scenario-set", SCENARIO_SETS, setId, (id) => { setId = id; reset(); paint(); }),
      fieldset("Candidate", "candidate", CANDIDATES, candidateId, (id) => { candidateId = id; reset(); paint(); }),
    ]),
    el("div", { class: "runbar" }, [
      el("button", { type: "button", class: "btn btn-primary", id: "run-btn", onclick: run }, "Run comparison"),
      el("p", {}, "Twenty baseline runs and five candidate runs on every scenario."),
    ]),
    el("ul", { class: "legend" }, [
      legendItem("pass", "Pass"),
      legendItem("fail", "Fail"),
      legendItem("agent_timeout", "Agent timeout, counts as a fail"),
      legendItem("infra_timeout", "Infrastructure or missing, excluded"),
    ]),
    stage,
    live,
    mathNotes(),
  ]);
  root.replaceChildren(shell);

  function fieldset(legend, name, options, current, onChange) {
    return el("fieldset", {}, [
      el("legend", {}, legend),
      el("div", { class: "choices" }, options.map((option) => el("label", { class: "choice" }, [
        el("input", {
          type: "radio",
          name,
          value: option.id,
          checked: option.id === current,
          onchange: () => onChange(option.id),
        }),
        el("span", { class: "choice-name" }, option.name),
        el("span", { class: "choice-summary" }, option.summary),
      ]))),
    ]);
  }

  function legendItem(kind, label) {
    return el("li", {}, [el("i", { class: "dot", "data-kind": kind, "aria-hidden": "true" }), label]);
  }

  function mathNotes() {
    return el("details", { class: "math" }, [
      el("summary", {}, "How the simulator calculates a verdict"),
      ...Object.values(METHOD_NOTES).map((text) => el("p", {}, text)),
    ]);
  }

  function clearTimers() {
    while (timers.length) window.clearTimeout(timers.pop());
  }

  function reset() {
    token += 1;
    clearTimers();
    phase = "idle";
    revealed = 0;
    result = null;
    input = null;
  }

  function run() {
    const mine = ++token;
    clearTimers();
    input = buildRun(setId, candidateId);
    result = scoreRun(input);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      revealed = Number.POSITIVE_INFINITY;
      phase = "done";
      paint();
      return;
    }
    revealed = 0;
    phase = "running";
    paint();
    const maxSlots = Math.max(...input.flatMap((scenario) => [scenario.baseline.scheduled, scenario.candidate.scheduled]));
    let step = 0;
    const tick = () => {
      if (token !== mine) return;
      step += 1;
      revealed = step;
      if (step >= maxSlots) {
        timers.push(window.setTimeout(() => {
          if (token !== mine) return;
          phase = "done";
          paint();
          live.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }, 320));
        paint();
        return;
      }
      paint();
      timers.push(window.setTimeout(tick, 46));
    };
    timers.push(window.setTimeout(tick, 46));
  }

  function paint() {
    const button = document.getElementById("run-btn");
    if (button) {
      button.disabled = phase === "running";
      button.textContent = phase === "running" ? "Running…" : phase === "done" ? "Run again" : "Run comparison";
    }
    const set = SCENARIO_SETS.find((item) => item.id === setId);
    stage.replaceChildren(...set.scenarios.map((scenario) => {
      const raw = input?.find((row) => row.id === scenario.id);
      const scored = result?.scenarios.find((row) => row.id === scenario.id);
      return el("article", { class: "scenario" }, [
        el("h3", {}, scenario.name),
        el("p", { class: "prompt" }, scenario.prompt),
        el("p", { class: "hash" }, `Sealed ${scenario.expectedHash.slice(0, 8)}…${scenario.expectedHash.slice(-4)}`),
        phase !== "idle" && raw ? el("div", { class: "arms" }, [
          armView("Baseline", "baseline", raw.baseline.slots, raw.baseline.scheduled, phase === "done" ? scored?.baseline : null),
          armView("Candidate", "candidate", raw.candidate.slots, raw.candidate.scheduled, phase === "done" ? scored?.candidate : null),
        ]) : null,
      ]);
    }));
    live.replaceChildren(phase === "done" && result ? verdictCard(result) : el("p", { class: "fine" }, phase === "running" ? "Running simulated rollouts." : "Run the comparison to watch both arms fill in."));
  }

  function armView(name, which, slots, scheduled, official) {
    const liveCount = official
      ? { passes: official.passes, valid: official.valid, rate: official.passRate }
      : tally(slots, revealed);
    const width = liveCount.rate == null ? 0 : Math.round(liveCount.rate * 1000) / 10;
    const label = liveCount.valid === 0 ? "No usable runs yet" : `${liveCount.passes} of ${liveCount.valid} passed`;
    return el("div", { class: "arm", "data-arm": which }, [
      el("p", { class: "arm-label" }, [name, el("b", {}, label)]),
      el("div", { class: "dots", "aria-hidden": "true" }, slots.slice(0, scheduled).map((slot, index) => el("i", {
        class: "dot",
        "data-kind": index < revealed ? slot : "",
        title: index < revealed ? SLOT_LABEL[slot] : "Waiting",
      }))),
      el("div", { class: "track", "aria-hidden": "true" }, el("span", { style: `width:${width}%` })),
    ]);
  }

  function verdictCard(scored) {
    const rows = [];
    if (scored.meanDelta != null) {
      rows.push(["Average gap", formatPoints(scored.meanDelta)]);
      rows.push(["90% interval", `${formatSignedNumber(scored.lower)} to ${formatSignedNumber(scored.upper)} percentage points`]);
    }
    rows.push(["Baseline excluded", `${scored.baseline.excluded} of ${scored.baseline.scheduled} (${formatPercent(scored.baseline.excluded, scored.baseline.scheduled)})`]);
    rows.push(["Candidate excluded", `${scored.candidate.excluded} of ${scored.candidate.scheduled} (${formatPercent(scored.candidate.excluded, scored.candidate.scheduled)})`]);
    if (scored.candidate.agentTimeouts > 0) rows.push(["Agent timeouts", `${scored.candidate.agentTimeouts} counted as fails`]);
    return el("article", { class: "verdict", "data-verdict": scored.verdict }, [
      el("p", { class: "kicker" }, "Simulator verdict"),
      el("h3", {}, scored.headline),
      el("dl", { class: "statline" }, rows.map(([label, value]) => el("div", {}, [el("dt", {}, label), el("dd", {}, value)]))),
      el("p", { class: "why" }, scored.why),
    ]);
  }

  paint();
}

initChrome();
renderDemo();

fetch(asset("data/results.preliminary.json"))
  .then((response) => {
    if (!response.ok) throw new Error(`Could not load results file (${response.status}).`);
    return response.json();
  })
  .then((doc) => renderResults(parseResults(doc)))
  .catch((error) => renderResultsError(error instanceof Error ? error : new Error("Could not read results.json")));
