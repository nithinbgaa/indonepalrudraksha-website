// Lists every [bracketed placeholder] still visible in the built site (run after `npm run build`).
import fs from "node:fs";
import path from "node:path";

const out = path.resolve(import.meta.dirname, "..", "out");
if (!fs.existsSync(out)) {
  console.error("Run `npm run build` first.");
  process.exit(1);
}
const found = new Map();
function walk(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) walk(p);
    else if (f.name.endsWith(".html")) {
      const text = fs
        .readFileSync(p, "utf8")
        .replace(/<script[\s\S]*?<\/script>/g, " ")
        .replace(/<style[\s\S]*?<\/style>/g, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/&#x27;|&#39;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, "&");
      for (const m of text.matchAll(/\[[^\]\n]{1,160}\]/g)) {
        const page = "/" + path.relative(out, p).replace(/index\.html$/, "");
        if (!found.has(m[0])) found.set(m[0], new Set());
        found.get(m[0]).add(page);
      }
    }
  }
}
walk(out);
if (!found.size) console.log("No placeholders left.");
for (const [ph, pages] of found) console.log(`${ph}\n    ${[...pages].join(", ")}`);
