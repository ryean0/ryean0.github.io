/**
 * Tiny tokenizer for the portfolio code samples.
 * Comments, strings, numbers, and a short keyword list. No dependencies.
 */

const KEYWORDS = {
  r: ["library", "in", "if", "for", "while", "function", "return"],
  ts: ["import", "from", "const", "export", "async", "await", "return", "if", "type", "new"],
  python: ["from", "import", "def", "return", "with", "for", "in", "as", "if", "None", "True", "False"],
  yaml: ["true", "false", "null"],
};

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function commentIndex(line, lang) {
  let quote = "";
  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    if (quote) {
      if (ch === "\\") {
        i += 1;
        continue;
      }
      if (ch === quote) quote = "";
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      quote = ch;
      continue;
    }
    if (lang === "ts" && ch === "/" && line[i + 1] === "/") return i;
    if (lang !== "ts" && ch === "#") return i;
  }
  return -1;
}

function colorCode(text, lang, keys) {
  let out = "";
  let i = 0;
  while (i < text.length) {
    const ch = text[i];
    if (ch === '"' || ch === "'" || ch === "`") {
      let j = i + 1;
      while (j < text.length) {
        if (text[j] === "\\") {
          j += 2;
          continue;
        }
        if (text[j] === ch) {
          j += 1;
          break;
        }
        j += 1;
      }
      out += `<span class="tok-s">${escapeHtml(text.slice(i, j))}</span>`;
      i = j;
      continue;
    }
    if (/[0-9]/.test(ch) && (i === 0 || !/[A-Za-z_]/.test(text[i - 1]))) {
      let j = i + 1;
      while (j < text.length && /[0-9.]/.test(text[j])) j += 1;
      out += `<span class="tok-n">${escapeHtml(text.slice(i, j))}</span>`;
      i = j;
      continue;
    }
    if (/[A-Za-z_]/.test(ch)) {
      let j = i + 1;
      while (j < text.length && /[A-Za-z0-9_]/.test(text[j])) j += 1;
      const word = text.slice(i, j);
      const next = text[j];
      if (lang === "yaml" && /^\s*:/.test(text.slice(j))) {
        out += `<span class="tok-k">${escapeHtml(word)}</span>`;
      } else if (keys.has(word)) {
        out += `<span class="tok-k">${escapeHtml(word)}</span>`;
      } else if (next === "(") {
        out += `<span class="tok-fn">${escapeHtml(word)}</span>`;
      } else {
        out += escapeHtml(word);
      }
      i = j;
      continue;
    }
    out += escapeHtml(ch);
    i += 1;
  }
  return out;
}

export function highlight(code, lang) {
  const keys = new Set(KEYWORDS[lang] || []);
  return code.split("\n").map((line) => {
    const cut = commentIndex(line, lang);
    if (cut < 0) return colorCode(line, lang, keys);
    const comment = line.slice(cut);
    return `${colorCode(line.slice(0, cut), lang, keys)}<span class="tok-c">${escapeHtml(comment)}</span>`;
  }).join("\n");
}
