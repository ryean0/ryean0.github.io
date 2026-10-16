import { ENTRIES, SAMPLE_LABEL, modalView } from "./content.js";
import { highlight } from "./highlight.js";

const SVG_NS = "http://www.w3.org/2000/svg";

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function entryById(id) {
  return ENTRIES.find((entry) => entry.id === id) || null;
}

function findTrigger(id) {
  return document.querySelector(`.exp-trigger[data-exp="${id}"]`);
}

function svgEl(name, attrs, text) {
  const node = document.createElementNS(SVG_NS, name);
  for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, String(value));
  if (text != null) node.textContent = text;
  return node;
}

function clear(node) {
  while (node.firstChild) node.removeChild(node.firstChild);
}

function h(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

function formatCount(value, decimals, commas) {
  if (decimals) return value.toFixed(Number(decimals));
  const rounded = Math.round(value);
  return commas ? rounded.toLocaleString("en-US") : String(rounded);
}

function paintMetric(node, metric, t) {
  if (t >= 1 || metric.count == null && metric.countFrom == null) {
    node.textContent = metric.final;
    return;
  }
  const ease = 1 - (1 - t) ** 3;
  if (metric.countFrom != null && metric.countTo != null) {
    const left = Number(metric.countFrom) * ease;
    const right = Number(metric.countTo) * ease;
    const decimals = metric.decimals;
    const decimalsTo = metric.decimalsTo ?? metric.decimals;
    node.textContent = `${metric.prefixFrom || ""}${formatCount(left, decimals, false)}${metric.suffixFrom || ""} → ${metric.prefixTo || ""}${formatCount(right, decimalsTo, false)}${metric.suffixTo || ""}`;
    return;
  }
  const value = Number(metric.count) * ease;
  node.textContent = `${metric.prefix || ""}${formatCount(value, metric.decimals, metric.commas)}${metric.suffix || ""}`;
}

function animateMetrics(root) {
  const nodes = [...root.querySelectorAll("[data-metric]")];
  const metrics = nodes.map((node) => JSON.parse(node.dataset.metric));
  if (reducedMotion()) {
    nodes.forEach((node, index) => {
      node.textContent = metrics[index].final;
    });
    animateBars(root, true);
    return;
  }
  nodes.forEach((node, index) => paintMetric(node, metrics[index], 0));
  const start = performance.now();
  const duration = 900;
  const step = (now) => {
    const t = Math.min(1, (now - start) / duration);
    nodes.forEach((node, index) => paintMetric(node, metrics[index], t));
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
  animateBars(root, false);
}

function animateBars(root, instant) {
  const bars = [...root.querySelectorAll("[data-bar]")];
  for (const [index, bar] of bars.entries()) {
    const width = bar.dataset.bar;
    if (instant) {
      bar.setAttribute("width", width);
      continue;
    }
    bar.setAttribute("width", "0");
    bar.animate(
      [{ width: "0" }, { width }],
      { duration: 700, delay: 80 + index * 70, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)", fill: "forwards" },
    );
  }
}

function linkChip(link) {
  const anchor = document.createElement("a");
  anchor.className = "ext-chip";
  anchor.href = link.href;
  anchor.target = "_blank";
  anchor.rel = "noopener noreferrer";
  anchor.append(h("span", "", link.label));
  const icon = svgEl("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", class: "ext-chip-icon" });
  icon.append(svgEl("path", {
    d: "M14 5h5v5M19 5l-9 9M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "1.7",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
  }));
  anchor.append(icon);
  anchor.addEventListener("click", (event) => event.stopPropagation());
  return anchor;
}

function stackRow(stack) {
  const row = h("div", "exp-stack");
  const label = h("h3", "exp-block-title", "Tech stack");
  const list = h("ul", "chips");
  list.setAttribute("aria-label", "Tech stack");
  for (const item of stack) list.append(h("li", "", item));
  row.append(label, list);
  return row;
}

function compareChart(chart) {
  const figure = h("figure", "exp-chart");
  figure.append(h("figcaption", "", `${chart.title}. ${chart.caption}`));
  const width = 440;
  const rowH = 34;
  const height = 16 + chart.bars.length * rowH;
  const max = Math.max(...chart.bars.map((bar) => bar.value));
  const labelW = 64;
  const valueW = 92;
  const barMax = width - labelW - valueW - 8;
  const svg = svgEl("svg", { viewBox: `0 0 ${width} ${height}`, role: "img", "aria-label": chart.caption });
  chart.bars.forEach((bar, index) => {
    const y = 8 + index * rowH;
    const barW = Math.max(4, (bar.value / max) * barMax);
    svg.append(svgEl("text", { x: 0, y: y + 16, fill: "#b4b4be", "font-size": "12" }, bar.label));
    const rect = svgEl("rect", {
      x: labelW,
      y: y + 4,
      height: 14,
      rx: 4,
      fill: index === chart.bars.length - 1 ? "#ff7a1a" : "#3a3a40",
      width: barW,
    });
    rect.dataset.bar = String(barW);
    svg.append(rect);
    svg.append(svgEl("text", {
      x: labelW + barMax + 8,
      y: y + 16,
      fill: "#f4f4f5",
      "font-size": "12",
    }, bar.display));
  });
  figure.append(svg);
  return figure;
}

function shareChart(chart) {
  const figure = h("figure", "exp-chart");
  figure.append(h("figcaption", "", `${chart.title}. ${chart.caption}`));
  const width = 440;
  const height = 36;
  const svg = svgEl("svg", { viewBox: `0 0 ${width} ${height}`, role: "img", "aria-label": chart.caption });
  svg.append(svgEl("rect", { x: 0, y: 10, width, height: 14, rx: 4, fill: "#2a2a2e" }));
  const barW = Math.max(4, (chart.percent / 100) * (width - 72));
  const rect = svgEl("rect", { x: 0, y: 10, height: 14, rx: 4, fill: "#ff7a1a", width: barW });
  rect.dataset.bar = String(barW);
  svg.append(rect);
  svg.append(svgEl("text", { x: width - 4, y: 22, "text-anchor": "end", fill: "#f4f4f5", "font-size": "12" }, chart.display));
  figure.append(svg);
  return figure;
}

function rangeChart(chart) {
  const figure = h("figure", "exp-chart");
  figure.append(h("figcaption", "", `${chart.title}. ${chart.caption}`));
  const width = 440;
  const height = 48;
  const svg = svgEl("svg", { viewBox: `0 0 ${width} ${height}`, role: "img", "aria-label": chart.caption });
  svg.append(svgEl("rect", { x: 0, y: 16, width, height: 14, rx: 4, fill: "#2a2a2e" }));
  const x1 = (chart.low / 100) * width;
  const x2 = (chart.high / 100) * width;
  const rect = svgEl("rect", { x: x1, y: 16, height: 14, rx: 4, fill: "#ff7a1a", width: Math.max(4, x2 - x1) });
  rect.dataset.bar = String(Math.max(4, x2 - x1));
  svg.append(rect);
  svg.append(svgEl("text", { x: x1, y: 12, fill: "#f4f4f5", "font-size": "11" }, `${chart.low}%`));
  svg.append(svgEl("text", { x: x2, y: 44, "text-anchor": "end", fill: "#f4f4f5", "font-size": "11" }, `${chart.high}%`));
  figure.append(svg);
  return figure;
}

function flowChart(chart) {
  const figure = h("figure", "exp-chart");
  figure.append(h("figcaption", "", `${chart.title}. ${chart.caption}`));
  const width = 440;
  const height = 78;
  const svg = svgEl("svg", { viewBox: `0 0 ${width} ${height}`, role: "img", "aria-label": chart.caption });
  const count = Math.min(chart.from, 12);
  const box = 18;
  const gap = 6;
  for (let i = 0; i < count; i += 1) {
    const col = i % 6;
    const row = Math.floor(i / 6);
    svg.append(svgEl("rect", {
      x: 8 + col * (box + gap),
      y: 8 + row * (box + gap),
      width: box,
      height: box,
      rx: 3,
      fill: "rgba(255,122,26,0.2)",
      stroke: "#ff7a1a",
    }));
  }
  svg.append(svgEl("text", { x: 8, y: 72, fill: "#b4b4be", "font-size": "12" }, chart.fromLabel));
  svg.append(svgEl("path", {
    d: "M168 28h36M196 22l8 6-8 6",
    fill: "none",
    stroke: "#ff7a1a",
    "stroke-width": "1.6",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
  }));
  svg.append(svgEl("rect", { x: 220, y: 12, width: 150, height: 36, rx: 8, fill: "#ff7a1a" }));
  svg.append(svgEl("text", {
    x: 295,
    y: 35,
    "text-anchor": "middle",
    fill: "#140800",
    "font-size": "13",
    "font-weight": "600",
  }, chart.toLabel));
  figure.append(svg);
  return figure;
}

function renderChart(chart) {
  if (chart.kind === "compare") return compareChart(chart);
  if (chart.kind === "share") return shareChart(chart);
  if (chart.kind === "range") return rangeChart(chart);
  if (chart.kind === "flow") return flowChart(chart);
  return h("p", "", "");
}

function wrapLabel(label, max) {
  const words = label.split(" ");
  const lines = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > max && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function renderDiagram(diagram) {
  const figure = h("figure", "exp-diagram");
  figure.append(h("p", "exp-kicker", "Illustrative"));
  if (diagram.caption) figure.append(h("figcaption", "", diagram.caption));
  const nodes = diagram.nodes;
  const gap = 36;
  const boxW = 148;
  const boxH = 72;
  const width = nodes.length * boxW + (nodes.length - 1) * gap + 8;
  const height = 92;
  const svg = svgEl("svg", {
    viewBox: `0 0 ${width} ${height}`,
    role: "img",
    "aria-label": `Illustrative: ${nodes.join(" to ")}`,
  });
  nodes.forEach((label, index) => {
    const x = index * (boxW + gap);
    svg.append(svgEl("rect", {
      x,
      y: 10,
      width: boxW,
      height: boxH,
      rx: 10,
      fill: "rgba(255,122,26,0.08)",
      stroke: "#ff7a1a",
    }));
    const lines = wrapLabel(label, 16);
    const text = svgEl("text", {
      x: x + boxW / 2,
      y: 10 + boxH / 2 - (lines.length - 1) * 8,
      "text-anchor": "middle",
      fill: "#f4f4f5",
      "font-size": "13",
    });
    lines.forEach((line, lineIndex) => {
      const span = svgEl("tspan", { x: x + boxW / 2, dy: lineIndex === 0 ? 0 : 16 }, line);
      text.append(span);
    });
    svg.append(text);
    if (index < nodes.length - 1) {
      const x1 = x + boxW + 6;
      const x2 = x + boxW + gap - 10;
      svg.append(svgEl("path", {
        d: `M${x1} 46 H${x2} M${x2 - 6} 40 l8 6 -8 6`,
        fill: "none",
        stroke: "#ff7a1a",
        "stroke-width": "1.6",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
      }));
    }
  });
  figure.append(svg);
  return figure;
}

function renderSample(item) {
  const figure = h("figure", "code-sample");
  const caption = h("figcaption", "code-caption");
  const titles = h("div", "code-titles");
  titles.append(h("p", "code-title", item.title));
  const badge = h("p", "code-label", SAMPLE_LABEL);
  titles.append(badge);
  const button = h("button", "copy-btn", "Copy");
  button.type = "button";
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(item.code);
    } catch {
      const area = document.createElement("textarea");
      area.value = item.code;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.left = "-9999px";
      document.body.append(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    button.textContent = "Copied";
    window.setTimeout(() => {
      button.textContent = "Copy";
    }, 1400);
  });
  caption.append(titles, button);
  const pre = document.createElement("pre");
  const code = document.createElement("code");
  code.className = `lang-${item.lang}`;
  code.innerHTML = highlight(item.code, item.lang);
  pre.append(code);
  figure.append(caption, pre);
  return figure;
}

function metricNode(metric) {
  const card = h("article", "exp-metric");
  const value = h("p", "stat-value");
  value.dataset.metric = JSON.stringify(metric);
  value.textContent = metric.final;
  value.setAttribute("aria-label", metric.final);
  card.append(value, h("p", "stat-label", metric.label));
  if (metric.note) card.append(h("p", "stat-note", metric.note));
  card.setAttribute("aria-label", `${metric.final} ${metric.label}`);
  return card;
}

function selectTab(mount, name) {
  const tabs = [...mount.querySelectorAll("[role='tab']")];
  const panels = [...mount.querySelectorAll("[role='tabpanel']")];
  for (const tab of tabs) {
    const on = tab.dataset.tab === name;
    tab.setAttribute("aria-selected", on ? "true" : "false");
    tab.tabIndex = on ? 0 : -1;
  }
  for (const panel of panels) {
    panel.hidden = panel.dataset.panel !== name;
  }
  if (name === "impact" && !mount.dataset.animated) {
    mount.dataset.animated = "1";
    animateMetrics(mount);
  }
}

function render(entry, mount, background) {
  const view = modalView(entry);
  clear(mount);
  clear(background);
  mount.dataset.animated = "";
  const image = document.createElement("img");
  image.src = entry.image;
  image.alt = "";
  background.append(image);
  background.hidden = false;

  const sheet = h("div", "exp-sheet exp-stagger");
  const header = h("header", "exp-header");
  const top = h("div", "exp-header-top");
  top.append(h("p", "kicker", entry.kind === "project" ? "Project" : "Experience"));
  const close = h("button", "exp-close");
  close.type = "button";
  close.setAttribute("data-exp-close", "");
  close.setAttribute("aria-label", "Close");
  close.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>';
  top.append(close);
  header.append(top);
  header.append(h("h2", "exp-dialog-title", entry.org));
  header.querySelector("h2").id = "exp-dialog-title";
  header.append(h("p", "exp-role", entry.role));
  header.append(h("p", "exp-meta", `${entry.dates} · ${entry.location}`));
  if (entry.links.length) {
    const links = h("div", "exp-links");
    for (const link of entry.links) links.append(linkChip(link));
    header.append(links);
  }
  sheet.append(header);
  sheet.append(stackRow(entry.stack));

  const tabs = h("div", "exp-tabs");
  tabs.setAttribute("role", "tablist");
  tabs.setAttribute("aria-label", "Experience details");
  const panels = h("div", "exp-panels");

  const tabNames = [{ id: "overview", label: "Overview" }];
  if (view.showImpact) tabNames.push({ id: "impact", label: "Impact" });
  tabNames.push({ id: "samples", label: "Samples" });

  for (const tab of tabNames) {
    const button = h("button", "exp-tab", tab.label);
    button.type = "button";
    button.id = `exp-tab-${tab.id}`;
    button.setAttribute("role", "tab");
    button.setAttribute("aria-controls", `exp-panel-${tab.id}`);
    button.dataset.tab = tab.id;
    tabs.append(button);
    const panel = h("div", "exp-panel-block");
    panel.id = `exp-panel-${tab.id}`;
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", button.id);
    panel.dataset.panel = tab.id;
    panel.tabIndex = 0;
    panels.append(panel);
  }

  const overview = panels.querySelector('[data-panel="overview"]');
  overview.append(h("p", "exp-summary", entry.summary));
  overview.append(h("h3", "exp-block-title", "Details"));
  const list = h("ul", "exp-details");
  for (const bullet of view.bullets) list.append(h("li", "", bullet));
  overview.append(list);

  if (view.diagram) overview.append(renderDiagram(view.diagram));
  else if (view.limitedNote) {
    const note = h("p", "exp-limited");
    note.append(h("strong", "", view.limitedNote || "Details limited for confidentiality"));
    note.append(document.createTextNode(" The architecture diagram for this role is withheld."));
    overview.append(note);
  }

  if (Object.hasOwn(entry, "publications")) {
    const block = h("section", "exp-slot");
    block.dataset.slot = "publications";
    block.append(h("h3", "exp-block-title", "Publications"));
    if (entry.publications.length === 0) block.append(h("p", "exp-soon", "Publications coming soon"));
    else {
      const pubs = h("ul", "exp-details");
      for (const item of entry.publications) pubs.append(h("li", "", item));
      block.append(pubs);
    }
    overview.append(block);
  }

  if (Object.hasOwn(entry, "screenshot")) {
    const block = h("section", "exp-slot");
    block.dataset.slot = "screenshot";
    block.append(h("h3", "exp-block-title", "Screenshot"));
    if (!entry.screenshot) block.append(h("p", "exp-soon", "Screenshot coming soon"));
    else {
      const shot = document.createElement("img");
      shot.src = entry.screenshot;
      shot.alt = `${entry.org} screenshot`;
      block.append(shot);
    }
    overview.append(block);
  }

  if (view.showImpact) {
    const impact = panels.querySelector('[data-panel="impact"]');
    const metrics = h("div", "exp-metrics");
    for (const metric of view.metrics) metrics.append(metricNode(metric));
    impact.append(metrics);
    const charts = h("div", "exp-charts");
    for (const chart of view.charts) charts.append(renderChart(chart));
    impact.append(charts);
  }

  const samples = panels.querySelector('[data-panel="samples"]');
  samples.append(h("h3", "exp-block-title", "Work samples"));
  if (!view.samples.length) samples.append(h("p", "exp-soon", "Samples coming soon"));
  else for (const item of view.samples) samples.append(renderSample(item));

  sheet.append(tabs, panels);
  mount.append(sheet);
  selectTab(mount, "overview");

  tabs.addEventListener("keydown", (event) => {
    const order = [...tabs.querySelectorAll("[role='tab']")];
    const index = order.indexOf(document.activeElement);
    if (index < 0) return;
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % order.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + order.length) % order.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = order.length - 1;
    else return;
    event.preventDefault();
    order[next].focus();
    selectTab(mount, order[next].dataset.tab);
  });
  tabs.addEventListener("click", (event) => {
    const tab = event.target.closest("[role='tab']");
    if (!tab) return;
    selectTab(mount, tab.dataset.tab);
  });
}

function flipKeyframes(panel, origin, opening) {
  const last = panel.getBoundingClientRect();
  const first = origin.getBoundingClientRect();
  const sx = Math.max(0.08, first.width / last.width);
  const sy = Math.max(0.08, first.height / last.height);
  const dx = first.left - last.left;
  const dy = first.top - last.top;
  const compact = { transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`, borderRadius: "12px" };
  const full = { transform: "translate(0px, 0px) scale(1, 1)", borderRadius: getComputedStyle(panel).borderRadius || "18px" };
  return opening ? [compact, full] : [full, compact];
}

export function initModals() {
  const dialog = document.getElementById("experience-dialog");
  const mount = document.querySelector("[data-exp-mount]");
  const panel = document.querySelector("[data-exp-panel]");
  const background = document.querySelector("[data-exp-bg]");
  if (!dialog || !mount || !panel || !background) return;

  let currentId = null;
  let opener = null;
  let closing = false;

  const finishClose = () => {
    panel.getAnimations().forEach((animation) => animation.cancel());
    dialog.classList.remove("is-closing");
    dialog.close();
    document.documentElement.classList.remove("exp-lock");
    closing = false;
    currentId = null;
    if (opener && typeof opener.focus === "function") opener.focus();
  };

  const play = (opening) => {
    panel.getAnimations().forEach((animation) => animation.cancel());
    const origin = opener && opener.isConnected ? opener : null;
    if (reducedMotion() || !origin) {
      const frames = opening
        ? [{ opacity: 0 }, { opacity: 1 }]
        : [{ opacity: 1 }, { opacity: 0 }];
      return panel.animate(frames, { duration: 180, easing: "ease", fill: "both" }).finished.catch(() => {});
    }
    dialog.classList.toggle("is-closing", !opening);
    const frames = flipKeyframes(panel, origin, opening);
    return panel.animate(frames, {
      duration: opening ? 480 : 420,
      easing: opening ? "cubic-bezier(0.16, 0.84, 0.24, 1)" : "cubic-bezier(0.4, 0, 0.2, 1)",
      fill: "both",
    }).finished.catch(() => {});
  };

  const openModal = (id, source) => {
    const entry = entryById(id);
    if (!entry || closing) return;
    if (dialog.open && currentId === id) return;
    opener = source || findTrigger(id) || opener;
    currentId = id;
    for (const trigger of document.querySelectorAll(".exp-trigger")) {
      trigger.setAttribute("aria-expanded", trigger.dataset.exp === id ? "true" : "false");
    }
    render(entry, mount, background);
    document.documentElement.classList.add("exp-lock");
    dialog.classList.toggle("is-reduced", reducedMotion());
    if (!dialog.open) dialog.showModal();
    play(true);
    dialog.focus();
  };

  const closeModal = () => {
    if (!dialog.open || closing) return;
    closing = true;
    for (const trigger of document.querySelectorAll(".exp-trigger")) {
      trigger.setAttribute("aria-expanded", "false");
    }
    play(false).then(finishClose);
  };

  const hashId = () => {
    const id = location.hash.replace(/^#/, "");
    return entryById(id) ? id : null;
  };

  const sync = () => {
    const id = hashId();
    if (id) openModal(id, findTrigger(id));
    else closeModal();
  };

  document.querySelectorAll(".exp-trigger").forEach((trigger) => {
    const go = () => {
      const id = trigger.dataset.exp;
      if (!entryById(id)) return;
      if (location.hash !== `#${id}`) history.pushState({ exp: id }, "", `#${id}`);
      openModal(id, trigger);
    };
    trigger.addEventListener("click", go);
    trigger.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      go();
    });
  });

  document.querySelectorAll("[data-exp-card]").forEach((card) => {
    card.addEventListener("click", (event) => {
      if (event.target.closest("a, button")) return;
      const trigger = card.querySelector(".exp-trigger");
      if (!trigger || event.target.closest(".exp-trigger")) return;
      trigger.click();
    });
  });

  document.querySelectorAll(".ext-chip").forEach((chip) => {
    chip.addEventListener("click", (event) => event.stopPropagation());
  });

  const dismiss = () => {
    if (history.state && history.state.exp) {
      history.back();
      return;
    }
    closeModal();
    if (hashId()) history.replaceState({ exp: null }, "", `${location.pathname}${location.search}`);
  };

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog || event.target.closest("[data-exp-close]")) dismiss();
  });

  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    dismiss();
  });

  window.addEventListener("popstate", sync);
  window.addEventListener("hashchange", sync);
  if (hashId()) sync();
}
