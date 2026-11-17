import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

import { createHash } from "node:crypto";

import { GITHUB_URL, LINKEDIN_URL, RESUME_URL, SITE_URL } from "../js/content.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel) => fs.readFileSync(path.join(root, rel), "utf8");

const home = read("index.html");
const detail = read("projects/anubys/index.html");
const redirect = read("anubys/index.html");
const content = read("js/content.js");
const css = read("css/site.css");
const workflow = read(".github/workflows/pages.yml");

const outlook = ["ryanphua.dev", "outlook.com"].join("@");
const uclaMail = ["rphua", ["g", "ucla", "edu"].join(".")].join("@");
const gmail = ["ryanphua2", "gmail.com"].join("@");
const phone = ["310", "869", "9907"].join("");
const resumeSha = "35b64cbb2046785274958ae6e09962c56c39af70c062e53a1d6f4bb1996715c9";

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "node_modules" || entry.name === "_site") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

const files = walk(root);

test("required sections are on the home page", () => {
  for (const id of ["hero", "impact", "work", "experience", "projects", "skills", "certifications", "education", "contact", "footer"]) {
    assert.match(home, new RegExp(`id="${id}"`));
  }
  assert.match(home, /<h1[^>]*>Ryan Phua<\/h1>/);
  assert.match(home, /DevOps Software Engineer/);
  assert.match(home, /Los Angeles, open to relocation/);
});

test("footer credit is exact and last", () => {
  const credit = "<p class=\"credit\">Developed with Grok Bot 2026</p>";
  assert.match(home, new RegExp(`${credit}\\s*</div>\\s*</footer>`));
  assert.match(detail, new RegExp(`${credit}\\s*</div>\\s*</footer>`));
  assert.match(home, /© 2026 Ryan Phua/);
  assert.match(home, /GitHub<\/a> · <a href="https:\/\/www\.linkedin\.com\/in\/rphua-dev"/);
});

test("linkedin is configured and shown beside github", () => {
  assert.equal(LINKEDIN_URL, "https://www.linkedin.com/in/rphua-dev");
  assert.equal(content.includes("TODO"), false);
  assert.equal(content.includes("LINKEDIN_URL = null"), false);
  const hero = home.slice(home.indexOf('id="hero"'), home.indexOf('id="impact"'));
  const contact = home.slice(home.indexOf('id="contact"'), home.indexOf("<footer"));
  const footer = home.slice(home.indexOf('id="footer"'));
  for (const part of [hero, contact, footer]) {
    assert.ok(part.includes(LINKEDIN_URL), "missing linkedin");
    assert.ok(part.includes(GITHUB_URL), "missing github");
  }
});

test("contact offers the resume PDF beside LinkedIn and GitHub", () => {
  assert.equal(RESUME_URL, "assets/Ryan_Phua_Resume.pdf");
  const pdfPath = path.join(root, RESUME_URL);
  const pdf = fs.readFileSync(pdfPath);
  assert.equal(createHash("sha256").update(pdf).digest("hex"), resumeSha);
  assert.equal(pdf.subarray(0, 5).toString("latin1"), "%PDF-");
  const contact = home.slice(home.indexOf('id="contact"'), home.indexOf("<footer"));
  assert.match(contact, /<h2[^>]*>Contact me<\/h2>/);
  assert.match(contact, /class="btn btn-primary resume-download" href="assets\/Ryan_Phua_Resume\.pdf" download="Ryan_Phua_Resume\.pdf"/);
  assert.match(contact, /Download resume/);
  assert.match(contact, /class="chip-link" href="https:\/\/www\.linkedin\.com\/in\/rphua-dev"/);
  assert.match(contact, /class="chip-link" href="https:\/\/github\.com\/ryean0"/);
  assert.equal(contact.toLowerCase().includes("mailto"), false);
  assert.equal(home.includes("Resume available on request"), false);
  assert.equal(home.includes("data-email"), false);
  assert.equal(fs.existsSync(path.join(root, "js/mail.js")), false);
});

test("literal addresses and the phone number stay out of the repo", () => {
  const banned = [outlook, uclaMail, gmail, phone];
  for (const file of files) {
    if (file.endsWith(".pdf")) {
      const bytes = fs.readFileSync(file);
      const rel = path.relative(root, file);
      for (const needle of banned) {
        assert.equal(bytes.includes(Buffer.from(needle)), false, rel);
      }
      continue;
    }
    if (!/\.(html|css|js|svg|txt|xml|yml|md|json)$/.test(file)) continue;
    const text = fs.readFileSync(file, "utf8");
    const rel = path.relative(root, file);
    for (const needle of banned) assert.equal(text.includes(needle), false, rel);
    assert.equal(text.toLowerCase().includes(["g", "ucla", "edu"].join(".")), false, rel);
    assert.equal(text.toLowerCase().includes(["mail", "to:"].join("")), false, rel);
  }
  const pdfs = files.filter((file) => file.toLowerCase().endsWith(".pdf")).map((file) => path.relative(root, file));
  assert.deepEqual(pdfs, ["assets/Ryan_Phua_Resume.pdf"]);
});

test("anubys redirect still points at the product site", () => {
  assert.match(redirect, /https:\/\/anubys\.dev\//);
  assert.match(redirect, /http-equiv="refresh"/);
  assert.match(redirect, /rel="canonical" href="https:\/\/anubys\.dev\/"/);
  const gate = path.join(root, "agent-regression-gate", "index.html");
  if (fs.existsSync(gate)) {
    const page = fs.readFileSync(gate, "utf8");
    assert.match(page, /https:\/\/anubys\.dev\//);
  }
});

test("merge check never uses a Fail verdict", () => {
  for (const text of [home, detail, read("js/main.js"), read("css/site.css")]) {
    assert.equal(/\bFail\b/.test(text), false);
  }
  assert.match(home, />Pass</);
  assert.match(home, />Block</);
  assert.match(home, /Insufficient evidence/);
  assert.match(detail, />Pass</);
  assert.match(detail, />Block</);
  assert.match(detail, /Insufficient evidence/);
  assert.equal(detail.includes("ci-agent-regression-harness"), false);
});

test("resume facts are present and typos are fixed", () => {
  assert.match(home, /Sep 2021 – Dec 2025/);
  assert.match(home, /B\.S\. Computer Science/);
  assert.match(home, /Los Angeles, CA/);
  assert.equal(home.includes("Distributed Systems"), false);
  assert.equal(home.includes("GPA"), false);
  assert.equal(home.includes("3.43"), false);
  assert.match(home, /Oct 2025 – Aug 2026/);
  assert.match(home, /Jun 2024 – Sep 2024/);
  assert.match(home, /Jun 2022 – Jul 2023/);
  assert.match(home, /Oct 2023 – Jul 2025/);
  assert.match(home, /12 heterogeneous CSV sources/);
  assert.equal(home.includes("heterogenous"), false);
  assert.match(home, /12,000-row dataset covering 226 participants/);
  assert.equal(home.includes("x 20"), false);
  assert.match(home, /~30%/);
  assert.match(home, /~20 to ~9 minutes/);
  assert.equal(home.includes("30-45%"), false);
  assert.equal(home.includes("~13 to ~9"), false);
  assert.match(home, /5 custom GraphQL resolvers on AWS AppSync using TypeScript/);
  assert.match(home, /dev, stage, and prod/);
  assert.match(home, /47,000/);
  assert.match(home, /30-50%/);
  assert.match(home, /five busiest API endpoints/);
  assert.match(home, /~3x/);
  assert.match(home, /pre-ElastiCache baseline/);
  assert.match(home, /&gt;3\.5 weeks to ~1 week/);
  assert.match(home, /www\.uclacec\.com/);
  assert.match(home, /~20%/);
  assert.equal(home.includes("The Daily Bruin"), false);
  assert.equal(home.includes("RunOpsAI"), false);
  assert.equal(home.includes("BruinCreates"), false);
  assert.equal(home.includes("Paxos"), false);
  assert.equal(home.includes("Basys-3"), false);
  assert.match(home, /Certified AI Security Professional/);
  assert.equal(home.includes("Certfied"), false);
  assert.match(home, /SAA-C03/);
  assert.match(home, /Blockchain Council/);
  assert.match(home, /datetime="2025-12"/);
  assert.match(home, /datetime="2026-05"/);
  assert.equal(home.includes("Cloud Practitioner"), false);
  assert.equal(home.includes("HarvardX"), false);
  assert.match(home, /\$38/);
  assert.match(home, /0 ms/);
});

test("share metadata, favicon, and stylesheet", () => {
  assert.equal(SITE_URL, "https://ryean0.github.io/");
  assert.match(home, /rel="canonical" href="https:\/\/ryean0\.github\.io\/"/);
  assert.match(home, /property="og:image" content="https:\/\/ryean0\.github\.io\/og\.png"/);
  assert.match(css, /#ff7a1a/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(read("favicon.svg"), /#ff7a1a/);
  const png = fs.readFileSync(path.join(root, "og.png"));
  assert.equal(png.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
  assert.equal(png.readUInt32BE(16), 1200);
  assert.equal(png.readUInt32BE(20), 630);
  assert.equal(fs.existsSync(path.join(root, ".nojekyll")), true);
});

test("staged site has no email, phone, or GPA", () => {
  const site = path.join(root, "_site");
  fs.rmSync(site, { recursive: true, force: true });
  fs.mkdirSync(site);
  for (const name of ["index.html", "favicon.svg", "og.png", "robots.txt", "sitemap.xml", ".nojekyll"]) {
    fs.copyFileSync(path.join(root, name), path.join(site, name));
  }
  for (const dir of ["css", "js", "assets", "anubys", "projects"]) {
    fs.cpSync(path.join(root, dir), path.join(site, dir), { recursive: true });
  }
  const email = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;
  const staged = walk(site);
  for (const file of staged) {
    if (!/\.(html|css|js|svg|txt|xml|yml|md|json)$/.test(file)) continue;
    const text = fs.readFileSync(file, "utf8");
    const rel = path.relative(root, file);
    assert.equal(text.includes(outlook), false, rel);
    assert.equal(text.includes(uclaMail), false, rel);
    assert.equal(text.includes(phone), false, rel);
    assert.equal(text.includes("GPA"), false, rel);
    assert.equal(text.toLowerCase().includes("gpa"), false, rel);
    assert.equal(text.includes("3.43"), false, rel);
    assert.equal(email.test(text), false, rel);
  }
});

test("staged site contains no withheld DSO figures", () => {
  const site = path.join(root, "_site");
  fs.rmSync(site, { recursive: true, force: true });
  fs.mkdirSync(site);
  for (const name of ["index.html", "favicon.svg", "og.png", "robots.txt", "sitemap.xml", ".nojekyll"]) {
    fs.copyFileSync(path.join(root, name), path.join(site, name));
  }
  for (const dir of ["css", "js", "assets", "anubys", "projects"]) {
    fs.cpSync(path.join(root, dir), path.join(site, dir), { recursive: true });
  }
  const banned = [
    "Horovod",
    "4-GPU",
    "2.5-hour",
    "2.5 hr",
    "2.5-hr",
    "0 crashes",
    "dropped frames",
    "throughput variance",
  ];
  for (const file of walk(site)) {
    if (file.toLowerCase().endsWith(".pdf")) continue;
    const text = fs.readFileSync(file);
    const rel = path.relative(root, file);
    for (const needle of banned) {
      assert.equal(text.includes(Buffer.from(needle)), false, `${rel} contains ${needle}`);
    }
  }
});

test("pages workflow tests the site and deploys the static root", () => {
  assert.match(workflow, /pull_request:/);
  assert.match(workflow, /node-version:\s*22/);
  assert.match(workflow, /npm test/);
  assert.match(workflow, /needs:\s*test/);
  assert.match(workflow, /path:\s*_site/);
  assert.match(workflow, /include-hidden-files:\s*true/);
  assert.equal(fs.existsSync(path.join(root, ".github/workflows/deploy.yml")), false);
});
