import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

import {
  EXPERIENCES,
  IMAGE_CREDITS,
  SAMPLE_LABEL,
  modalView,
} from "../js/content.js";
import { highlight } from "../js/highlight.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel) => fs.readFileSync(path.join(root, rel), "utf8");
const home = read("index.html");
const modalJs = read("js/modal.js");
const css = read("css/site.css");

const ids = ["exp-mlc", "exp-solarbrio", "exp-dso", "exp-usac"];

function sliceBetween(html, start, end) {
  const from = html.indexOf(start);
  assert.ok(from >= 0, start);
  const to = end ? html.indexOf(end, from + start.length) : html.length;
  assert.ok(to > from, end);
  return html.slice(from, to);
}

test("each experience opens a dialog", () => {
  assert.equal(EXPERIENCES.map((entry) => entry.id).join(","), ids.join(","));
  for (const id of ids) {
    assert.match(home, new RegExp(`data-exp="${id}"`));
    assert.match(home, new RegExp(`data-exp-card="${id}"`));
    assert.match(home, new RegExp(`aria-labelledby="${id}-title"`));
  }
  assert.match(home, /id="experience-dialog"/);
  assert.match(home, /aria-labelledby="exp-dialog-title"/);
  assert.match(home, /aria-modal="true"/);
  assert.match(home, /aria-haspopup="dialog"/);
  assert.match(home, /aria-controls="experience-dialog"/);
  assert.match(home, /role="button"/);
  assert.match(home, /tabindex="0"/);
  assert.match(modalJs, /showModal\(/);
  assert.match(modalJs, /stopPropagation/);
  assert.match(modalJs, /prefers-reduced-motion/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
});

test("external links are chips outside the title", () => {
  const solarbrio = sliceBetween(home, 'data-exp="exp-solarbrio"', '<a class="ext-chip"');
  const usac = sliceBetween(home, 'data-exp="exp-usac"', '<a class="ext-chip"');
  assert.equal(solarbrio.includes("<a"), false);
  assert.equal(usac.includes("<a"), false);
  assert.match(home, /class="ext-chip" href="https:\/\/solarbrio\.com\/" target="_blank" rel="noopener noreferrer"/);
  assert.match(home, /class="ext-chip" href="https:\/\/www\.uclacec\.com\/" target="_blank" rel="noopener noreferrer"/);
  const mlc = sliceBetween(home, 'data-exp="exp-mlc"', 'data-exp="exp-solarbrio"');
  const dso = sliceBetween(home, 'data-exp="exp-dso"', "</ol>");
  assert.equal(mlc.includes("ext-chip"), false);
  assert.equal(dso.includes("ext-chip"), false);
  assert.equal(home.includes("(SDR)"), false);
  assert.match(home, /signal detection theory \(SDT\)/);
});

test("footer credit stays exact and every image is credited", () => {
  const credit = "<p class=\"credit\">Developed with Grok Bot 2026</p>";
  assert.match(home, new RegExp(`${credit}\\s*</div>\\s*</footer>`));
  const credits = sliceBetween(home, 'id="image-credits"', 'class="wrap footer-bottom"');
  assert.match(credits, /Image credits/);
  for (const image of IMAGE_CREDITS) {
    assert.ok(credits.includes(image.title), image.title);
    assert.ok(credits.includes(image.author), image.author);
    assert.ok(credits.includes(image.license), image.license);
    assert.ok(credits.includes(image.href), image.href);
    const file = path.join(root, image.src);
    const bytes = fs.readFileSync(file);
    assert.ok(bytes.length > 0 && bytes.length < 200 * 1024, image.src);
    assert.equal(bytes.subarray(0, 4).toString("ascii"), "RIFF");
    assert.equal(bytes.subarray(8, 12).toString("ascii"), "WEBP");
  }
  const used = new Set(EXPERIENCES.map((entry) => entry.image));
  for (const src of used) assert.ok(IMAGE_CREDITS.some((credit) => credit.src === src), src);
  const files = fs.readdirSync(path.join(root, "assets")).filter((name) => name.endsWith(".webp"));
  assert.equal(files.length, IMAGE_CREDITS.length);
  for (const name of files) assert.ok(IMAGE_CREDITS.some((credit) => credit.src.endsWith(name)));
});

test("modal copy follows the clearance flags", () => {
  const byId = Object.fromEntries(EXPERIENCES.map((entry) => [entry.id, entry]));
  assert.equal(byId["exp-dso"].metricsCleared, false);
  assert.equal(byId["exp-dso"].diagram, null);
  assert.equal(byId["exp-mlc"].metricsCleared, true);
  assert.equal(byId["exp-solarbrio"].metricsCleared, true);
  assert.equal(byId["exp-usac"].metricsCleared, true);
  assert.deepEqual(byId["exp-mlc"].publications, []);
  assert.equal(byId["exp-usac"].screenshot, null);

  const dso = modalView(byId["exp-dso"]);
  const hidden = [byId["exp-dso"].summary, ...dso.bullets].join(" ");
  assert.equal(dso.showImpact, false);
  assert.equal(dso.metrics.length, 0);
  assert.equal(dso.charts.length, 0);
  assert.equal(dso.diagram, null);
  assert.equal(dso.samples.length, 1);
  assert.match(dso.samples[0].code, /ProcessPoolExecutor/);
  assert.equal(dso.limitedNote, "Details limited for confidentiality");
  assert.equal(hidden.includes("20%"), false);
  assert.equal(hidden.includes("~20"), false);

  const cleared = modalView({ ...byId["exp-dso"], metricsCleared: true });
  assert.match(cleared.bullets.join(" "), /about 20%/);
  assert.equal(cleared.metrics[0].final, "~20%");
  assert.equal(cleared.charts[0].percent, 20);
  assert.equal(cleared.diagram, null);

  for (const id of ["exp-mlc", "exp-solarbrio", "exp-usac"]) {
    const view = modalView(byId[id]);
    assert.ok(view.diagram.nodes.length >= 3, id);
    assert.equal(view.diagram.nodes.includes("SDR"), false);
    assert.ok(view.charts.length > 0, id);
    assert.ok(view.metrics.length > 0, id);
    assert.ok(view.samples.length > 0, id);
    for (const item of view.samples) {
      assert.equal(item.label, SAMPLE_LABEL);
      assert.match(item.code, /Illustrative example, not production code/);
    }
  }

  assert.deepEqual(byId["exp-solarbrio"].diagram.nodes, ["Amplify V2", "AppSync resolvers", "Redis", "DynamoDB"]);
  assert.deepEqual(byId["exp-mlc"].diagram.nodes, ["CSV sources", "Validated dataset", "Signal detection theory (SDT)", "lme4"]);
  assert.deepEqual(byId["exp-usac"].diagram.nodes, ["GitHub Actions", "Docker Compose", "ElastiCache"]);
  assert.match(byId["exp-mlc"].summary + byId["exp-mlc"].bullets.join(" "), /signal detection theory \(SDT\)/);
  assert.match(modalJs, /Illustrative/);
  assert.match(modalJs, /Details limited for confidentiality/);
  assert.match(modalJs, /Publications coming soon/);
  assert.match(modalJs, /Screenshot coming soon/);
  assert.match(modalJs, /Samples coming soon/);
  assert.match(read(".github/workflows/pages.yml"), /\bassets\b/);
});

test("charts use resume figures only", () => {
  const byId = Object.fromEntries(EXPERIENCES.map((entry) => [entry.id, entry]));
  const solar = byId["exp-solarbrio"].charts;
  assert.deepEqual(solar[0].bars.map((bar) => bar.value), [20, 9]);
  assert.equal(solar[1].percent, 30);
  const usac = byId["exp-usac"].charts;
  assert.deepEqual(usac[0].bars.map((bar) => bar.display), ["baseline", "~3x faster"]);
  assert.deepEqual(usac[1].bars.map((bar) => bar.display), [">3.5 wk", "~1 wk"]);
  assert.equal(usac[2].low, 30);
  assert.equal(usac[2].high, 50);
  assert.equal(byId["exp-mlc"].charts[0].from, 12);
  assert.equal(byId["exp-mlc"].charts[0].to, 1);
  const content = read("js/content.js");
  assert.equal(content.includes("(SDR)"), false);
  assert.equal(content.includes("$800"), false);
  assert.equal(content.includes("$440"), false);
});

test("sample highlighter marks comments and keywords", () => {
  const html = highlight("# Illustrative example, not production code\nlibrary(dplyr)", "r");
  assert.match(html, /class="tok-c"/);
  assert.match(html, /class="tok-k"/);
  assert.equal(html.includes("<script"), false);
  const ts = highlight('const key = `site-summary:${event.arguments.siteId}`;', "ts");
  assert.match(ts, /class="tok-s"/);
});
