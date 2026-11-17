import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const pages = ["index.html", "projects/anubys/index.html", "anubys/index.html"];

function refsIn(rel) {
  const html = fs.readFileSync(path.join(root, rel), "utf8");
  return [...html.matchAll(/\b(?:href|src)="([^"]+)"/g)].map((match) => match[1]);
}

function localPath(page, ref) {
  const base = new URL(page, "https://ryean0.github.io/");
  const url = new URL(ref, base);
  if (url.origin !== "https://ryean0.github.io") return null;
  let pathname = decodeURIComponent(url.pathname);
  if (pathname.endsWith("/")) pathname += "index.html";
  return pathname.replace(/^\//, "");
}

test("local links and assets resolve, and no verification token is published", () => {
  const names = fs.readdirSync(root);
  for (const name of names) {
    assert.equal(/verification/i.test(name), false, name);
    assert.equal(name.endsWith(".txt") && name !== "robots.txt", false, name);
  }
  const home = fs.readFileSync(path.join(root, "index.html"), "utf8");
  assert.equal(home.includes("google-site-verification"), false);
  assert.match(home, /name="robots" content="index, follow"/);
  assert.equal(fs.existsSync(path.join(root, "apple-touch-icon.png")), true);
  assert.equal(fs.existsSync(path.join(root, "og.png")), true);

  for (const page of pages) {
    for (const ref of refsIn(page)) {
      if (ref.startsWith("#") || ref.startsWith(["mail", "to:"].join("")) || ref.startsWith("data:")) continue;
      const local = localPath(page, ref);
      if (!local) continue;
      const file = path.join(root, local);
      assert.equal(fs.existsSync(file), true, `${page} -> ${ref}`);
    }
  }
});

test("external links answer", async () => {
  const seen = new Set();
  for (const page of pages) {
    for (const ref of refsIn(page)) {
      if (!/^https?:\/\//.test(ref)) continue;
      if (new URL(ref).origin === "https://ryean0.github.io") continue;
      seen.add(ref);
    }
  }
  assert.ok(seen.size > 0);
  const broken = [];
  for (const ref of seen) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch(ref, {
        redirect: "follow",
        signal: controller.signal,
        headers: { "user-agent": "ryan-phua-portfolio-link-check" },
      });
      const ok = response.status < 400 || [401, 403, 405, 429, 999].includes(response.status);
      if (!ok) broken.push(`${response.status} ${ref}`);
    } catch (error) {
      broken.push(`${error.name} ${ref}`);
    } finally {
      clearTimeout(timer);
    }
  }
  assert.deepEqual(broken, []);
});
