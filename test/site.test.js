import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

import { GITHUB_URL, LINKEDIN_URL, RESUME_URL, SITE_URL } from "../js/content.js";
import { emailHref } from "../js/mail.js";

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
const phone = ["310", "869", "9907"].join("");

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
  for (const id of ["hero", "impact", "work", "experience", "skills", "certifications", "education", "contact", "footer"]) {
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
  assert.equal(content.includes("TODO"), true);
  assert.equal(content.includes("LINKEDIN_URL = null"), false);
  const hero = home.slice(home.indexOf('id="hero"'), home.indexOf('id="impact"'));
  const contact = home.slice(home.indexOf('id="contact"'), home.indexOf("<footer"));
  const footer = home.slice(home.indexOf('id="footer"'));
  for (const part of [hero, contact, footer]) {
    assert.ok(part.includes(LINKEDIN_URL), "missing linkedin");
    assert.ok(part.includes(GITHUB_URL), "missing github");
  }
});

test("email target is assembled from parts", () => {
  assert.equal(emailHref(), `mailto:${["ryanphua.dev", "outlook.com"].join("@")}`);
});

test("resume stays a request until RESUME_URL is set", () => {
  assert.equal(RESUME_URL, null);
  assert.match(content, /TODO: set RESUME_URL/);
  assert.match(home, /Resume available on request/);
  assert.equal(home.includes('href="/assets/resumes/'), false);
});

test("literal addresses and the phone number stay out of the repo", () => {
  for (const file of files) {
    if (!/\.(html|css|js|svg|txt|xml|yml|md|json)$/.test(file)) continue;
    const text = fs.readFileSync(file, "utf8");
    assert.equal(text.includes(outlook), false, path.relative(root, file));
    assert.equal(text.includes(uclaMail), false, path.relative(root, file));
    assert.equal(text.toLowerCase().includes(["g", "ucla", "edu"].join(".")), false, path.relative(root, file));
    assert.equal(text.includes(phone), false, path.relative(root, file));
  }
  assert.equal(files.some((file) => file.toLowerCase().endsWith(".pdf")), false);
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
  assert.match(home, /Distributed Systems/);
  assert.match(home, /Cloud Security &amp; Networking/);
  assert.equal(home.includes("GPA"), false);
  assert.equal(home.includes("3.43"), false);
  assert.match(home, /Oct 2025 – Aug 2026/);
  assert.match(home, /Jun 2024 – Sep 2024/);
  assert.match(home, /Jun 2022 – Jul 2023/);
  assert.match(home, /12 heterogeneous CSV data sources/);
  assert.equal(home.includes("heterogenous"), false);
  assert.match(home, /12,000 row x 20 col/);
  assert.match(home, /226 study participants/);
  assert.match(home, /~30%/);
  assert.match(home, /~20 to ~9 minutes/);
  assert.match(home, /5 custom GraphQL resolvers/);
  assert.match(home, /3 \(dev\/stage\/prod\)/);
  assert.match(home, /~20%/);
  assert.match(home, /&gt;47000 student users/);
  assert.match(home, /30-50%/);
  assert.match(home, /top 5 hottest API endpoints/);
  assert.match(home, /~3x/);
  assert.match(home, /pre Elasticache baseline/);
  assert.match(home, /&gt;3\.5 weeks to ~1 week/);
  assert.match(home, /www\.uclacec\.com/);
  assert.match(home, /Certified AI Security Professional \(CAISP\)/);
  assert.equal(home.includes("Certfied"), false);
  assert.match(home, /SAA-C03/);
  assert.match(home, /BlockChain Council/);
  assert.match(home, /Pytorch &amp; Tensorflow/);
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

test("pages workflow tests the site and deploys the static root", () => {
  assert.match(workflow, /pull_request:/);
  assert.match(workflow, /node-version:\s*22/);
  assert.match(workflow, /npm test/);
  assert.match(workflow, /needs:\s*test/);
  assert.match(workflow, /path:\s*_site/);
  assert.match(workflow, /include-hidden-files:\s*true/);
  assert.equal(fs.existsSync(path.join(root, ".github/workflows/deploy.yml")), false);
});
