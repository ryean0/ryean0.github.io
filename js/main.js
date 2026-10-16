import { RESUME_URL } from "./content.js";
import { bindEmails } from "./mail.js";
import { initModals } from "./modal.js";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function initNav() {
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-menu");
  const progress = document.getElementById("progress");
  if (!nav || !toggle || !menu) return;

  const close = () => {
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.textContent = "Menu";
  };

  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.textContent = open ? "Close" : "Menu";
  });

  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) close();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close();
  });

  const onScroll = () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 8);
    if (!progress) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    progress.style.transform = `scaleX(${ratio})`;
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const links = [...menu.querySelectorAll('a[href^="#"]')];
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
  if (!reduceMotion && sections.length && typeof IntersectionObserver === "function") {
    const active = new Map();
    const spy = new IntersectionObserver((entries) => {
      for (const entry of entries) active.set(entry.target, entry.isIntersecting);
      const current = sections.find((section) => active.get(section));
      for (const link of links) {
        const on = current && link.getAttribute("href") === `#${current.id}`;
        if (on) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      }
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    for (const section of sections) spy.observe(section);
  }
}

function initResume() {
  for (const node of document.querySelectorAll("[data-resume]")) {
    if (RESUME_URL) {
      const link = document.createElement("a");
      link.href = RESUME_URL;
      link.className = node.className;
      link.textContent = "Resume";
      node.replaceWith(link);
      continue;
    }
    node.textContent = "Resume available on request";
    node.setAttribute("data-email", "");
  }
}

function initReveal() {
  const nodes = [...document.querySelectorAll(".reveal")];
  if (!nodes.length) return;
  if (reduceMotion || typeof IntersectionObserver !== "function") {
    for (const node of nodes) node.classList.add("is-in");
    return;
  }
  document.documentElement.classList.add("motion");
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add("is-in");
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.12, rootMargin: "0px 0px -4% 0px" });
  for (const node of nodes) observer.observe(node);
}

function formatCount(value, decimals, commas) {
  if (decimals) return value.toFixed(Number(decimals));
  const rounded = Math.round(value);
  return commas ? rounded.toLocaleString("en-US") : String(rounded);
}

function paintStat(node, t) {
  const finalText = node.dataset.final;
  if (t >= 1) {
    node.textContent = finalText;
    return;
  }
  const ease = 1 - (1 - t) ** 3;
  if (node.dataset.countFrom != null && node.dataset.countTo != null) {
    const left = Number(node.dataset.countFrom) * ease;
    const right = Number(node.dataset.countTo) * ease;
    node.textContent = `${node.dataset.prefixFrom || ""}${formatCount(left, node.dataset.decimals, false)}${node.dataset.suffixFrom || ""} → ${node.dataset.prefixTo || ""}${formatCount(right, node.dataset.decimalsTo || node.dataset.decimals, false)}${node.dataset.suffixTo || ""}`;
    return;
  }
  const target = Number(node.dataset.count);
  const value = target * ease;
  node.textContent = `${node.dataset.prefix || ""}${formatCount(value, node.dataset.decimals, node.dataset.commas === "1")}${node.dataset.suffix || ""}`;
}

function initStats() {
  const nodes = [...document.querySelectorAll(".stat-value[data-final]")];
  if (!nodes.length || reduceMotion || typeof IntersectionObserver !== "function") return;
  const run = (node) => {
    const start = performance.now();
    const duration = 1100;
    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      paintStat(node, t);
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      observer.unobserve(entry.target);
      run(entry.target);
    }
  }, { threshold: 0.5 });
  for (const node of nodes) observer.observe(node);
}

function initConsole() {
  const list = document.getElementById("term-lines");
  if (!list) return;
  const lines = [...list.querySelectorAll(".term-line")];
  const typed = lines.map((line) => line.querySelector(".typed"));
  if (reduceMotion) {
    list.classList.add("is-done");
    return;
  }
  const originals = typed.map((node) => node.textContent);
  const caret = document.createElement("span");
  caret.className = "caret";
  caret.setAttribute("aria-hidden", "true");

  const play = () => {
    for (const node of typed) node.textContent = "";
    list.classList.remove("is-done");
    list.classList.add("is-typing");
    let index = 0;
    const typeLine = () => {
      if (index >= typed.length) {
        list.classList.add("is-done");
        caret.remove();
        window.setTimeout(play, 2800);
        return;
      }
      const node = typed[index];
      const full = originals[index];
      let count = 0;
      const step = () => {
        count += 1;
        node.textContent = full.slice(0, count);
        node.appendChild(caret);
        if (count < full.length) {
          window.setTimeout(step, 14);
          return;
        }
        index += 1;
        window.setTimeout(typeLine, 180);
      };
      step();
    };
    typeLine();
  };
  play();
}

initNav();
initResume();
bindEmails(document);
initReveal();
initStats();
initConsole();
initModals();
