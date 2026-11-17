import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { inflateSync } from "node:zlib";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pdfPath = path.join(root, "assets/Ryan_Phua_Resume.pdf");

const banned = [
  "310",
  ["g", "ucla", "edu"].join("."),
  "gmail",
  "outlook",
  "@",
];

function pdftotext(file) {
  const probe = spawnSync("pdftotext", ["-v"], { encoding: "utf8" });
  if (probe.error) return null;
  return execFileSync("pdftotext", ["-layout", file, "-"], { encoding: "utf8" });
}

function latin1(buf) {
  return buf.toString("latin1");
}

function inflateObject(body) {
  const bytes = Buffer.from(body, "latin1");
  const marker = bytes.indexOf("stream");
  if (marker < 0) return body;
  let start = marker + "stream".length;
  if (bytes[start] === 0x0d && bytes[start + 1] === 0x0a) start += 2;
  else if (bytes[start] === 0x0a) start += 1;
  let end = bytes.indexOf("endstream", start);
  if (end < 0) return body;
  if (bytes[end - 1] === 0x0a) end -= 1;
  if (bytes[end - 1] === 0x0d) end -= 1;
  try {
    return latin1(inflateSync(bytes.subarray(start, end)));
  } catch {
    return body;
  }
}

function parseCmap(source) {
  const map = new Map();
  const chars = source.matchAll(/beginbfchar([\s\S]*?)endbfchar/g);
  for (const block of chars) {
    for (const pair of block[1].matchAll(/<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>/g)) {
      const codes = pair[2];
      let value = "";
      for (let i = 0; i + 4 <= codes.length; i += 4) value += String.fromCharCode(Number.parseInt(codes.slice(i, i + 4), 16));
      map.set(pair[1].toLowerCase().padStart(4, "0"), value);
    }
  }
  const ranges = source.matchAll(/beginbfrange([\s\S]*?)endbfrange/g);
  for (const block of ranges) {
    for (const range of block[1].matchAll(/<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>/g)) {
      const from = Number.parseInt(range[1], 16);
      const to = Number.parseInt(range[2], 16);
      const dest = Number.parseInt(range[3], 16);
      if (to - from > 4000) continue;
      for (let code = from; code <= to; code += 1) {
        map.set(code.toString(16).padStart(4, "0"), String.fromCharCode(dest + (code - from)));
      }
    }
  }
  return map;
}

function decodeHex(blob, map) {
  let out = "";
  for (const hex of blob.matchAll(/<([0-9A-Fa-f]+)>/g)) {
    const token = hex[1];
    if (token.length % 4) continue;
    for (let i = 0; i < token.length; i += 4) {
      out += map.get(token.slice(i, i + 4).toLowerCase()) || "";
    }
  }
  return out;
}

/** Text from decompressed content streams, using each font's ToUnicode map. */
export function extractPdfText(file) {
  const source = fs.readFileSync(file).toString("latin1");
  const objects = new Map();
  for (const match of source.matchAll(/(\d+)\s+0\s+obj([\s\S]*?)endobj/g)) {
    objects.set(Number(match[1]), match[2]);
  }
  const fontToUnicode = new Map();
  for (const [id, body] of objects) {
    if (!body.includes("/Type/Font")) continue;
    const ref = body.match(/\/ToUnicode\s+(\d+)\s+0\s+R/);
    if (ref) fontToUnicode.set(id, Number(ref[1]));
  }
  const resource = source.match(/\/Font<<(.+?)>>>>/);
  assert.ok(resource, "resume PDF has a font resource");
  const names = new Map();
  for (const pair of `/${resource[1]}`.matchAll(/\/([A-Za-z0-9]+)\s+(\d+)\s+0\s+R/g)) {
    names.set(pair[1], Number(pair[2]));
  }
  const cmaps = new Map();
  for (const [name, fontId] of names) {
    const unicodeId = fontToUnicode.get(fontId);
    assert.ok(unicodeId, name);
    cmaps.set(name, parseCmap(inflateObject(objects.get(unicodeId))));
  }
  const parts = [];
  for (const body of objects.values()) {
    const data = inflateObject(body);
    if (data.includes("beginbfchar") || data.includes("begincmap") || !data.includes("BT")) continue;
    const tokens = data.split(/(\/[A-Za-z0-9]+\s+[0-9.]+\s+Tf)/);
    let map = null;
    let pending = [];
    const flush = () => {
      if (map && pending.length) parts.push(decodeHex(pending.join(""), map));
      pending = [];
    };
    for (const token of tokens) {
      const font = token.match(/^\/([A-Za-z0-9]+)\s+[0-9.]+\s+Tf$/);
      if (font) {
        flush();
        map = cmaps.get(font[1]) || null;
        continue;
      }
      pending.push(token);
    }
    flush();
  }
  return parts.join("\n");
}

function assertClean(label, text) {
  assert.match(text, /Ryan Phua/, `${label} extracted resume text`);
  for (const needle of banned) {
    assert.equal(text.includes(needle), false, `${label} contains ${needle}`);
  }
}

test("resume PDF text has no phone, email, or at-sign", () => {
  const decoded = extractPdfText(pdfPath);
  assertClean("decoded streams", decoded);
  const laidOut = pdftotext(pdfPath);
  if (laidOut != null) assertClean("pdftotext", laidOut);
});
