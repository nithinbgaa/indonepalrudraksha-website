// Turns the original photos in the content folder into web-sized WebP files in public/images.
//
//   node scripts/prepare-images.mjs ~/Desktop/IndoNepal-Website
//
// Re-run it whenever a photo changes. Output files are committed to the repo.
// Founder photos are only processed with --founder, so the current ones are never overwritten by
// accident. The images in public/images/founder were taken straight out of the PowerPoint/PDF files
// (full original size). Slide exports from PowerPoint include the white slide around the photo, so
// white margins are trimmed, but the photo is still smaller than the original: prefer the original.
//   node scripts/prepare-images.mjs ~/Desktop/IndoNepal-Website --founder
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const FOUNDER_PUBLISHED = Array.from({ length: 17 }, (_, i) => String(i + 1).padStart(2, "0")); // keep in step with src/data/founder.ts

const src = process.argv[2];
if (!src || !fs.existsSync(src)) {
  console.error("Usage: node scripts/prepare-images.mjs <content folder>");
  process.exit(1);
}
const out = path.resolve(import.meta.dirname, "..", "public", "images");
const IMG = /\.(jpe?g|png|webp|tiff?)$/i;

const BEADS = {
  ...Object.fromEntries(Array.from({ length: 16 }, (_, i) => [`${i + 1}-mukhi`, `${i + 1}-mukhi`])),
  GauriShankar: "gauri-shankar",
  "Garbha-GauriShankar": "garbha-gauri-shankar",
  "Ganesh-mukhi": "ganesh",
};
const MALAS = {
  "6mm Japa Mala": "japa-mala-6mm",
  "Karungali Mala": "karungali-mala",
  MahaMruthjayaMala: "maha-mrityunjaya-mala",
  "Patri Mala": "patri-mala",
  "Siddha Mala SPL": "siddha-mala-1-mukhi-round",
  SriKantaMala: "srikanta-mala",
  UgraNarayanaMala: "ugra-narayana-mala",
};

function firstImage(dir) {
  if (!fs.existsSync(dir)) return null;
  const f = fs
    .readdirSync(dir)
    .filter((n) => IMG.test(n))
    .sort()[0];
  return f ? path.join(dir, f) : null;
}

async function write(input, file, max) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  // .rotate() applies EXIF orientation; toColourspace fixes CMYK files (founder 04 and 15).
  await sharp(input)
    .rotate()
    .toColourspace("srgb")
    .resize({ width: max, height: max, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(file);
  const m = await sharp(file).metadata();
  console.log(`${path.relative(out, file)}  ${m.width}×${m.height}`);
}

// Bead photos: trim a thin border, fade the light studio background to white, and pad to a white
// square, so the bead sits centred in the round frame on its page without a visible photo edge.
async function writeBead(input, file) {
  const base = sharp(input).rotate().toColourspace("srgb").removeAlpha();
  const meta = await base.metadata();
  const cut = 4;
  const { data, info } = await base
    .extract({ left: cut, top: cut, width: meta.width - 2 * cut, height: meta.height - 2 * cut })
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 3) {
    const lo = Math.min(data[i], data[i + 1], data[i + 2]);
    const hi = Math.max(data[i], data[i + 1], data[i + 2]);
    if (hi - lo > 45) continue; // coloured pixel: part of the bead
    const t = Math.max(0, Math.min(1, (lo - 200) / 30)); // near-white grey or beige → white
    for (let k = 0; k < 3; k++) data[i + k] = Math.round(data[i + k] + (255 - data[i + k]) * t);
  }
  const { width: w, height: h } = info;
  const side = Math.round(Math.max(w, h) * 1.22);
  const padded = await sharp(data, { raw: info })
    .extend({
      top: Math.floor((side - h) / 2),
      bottom: Math.ceil((side - h) / 2),
      left: Math.floor((side - w) / 2),
      right: Math.ceil((side - w) / 2),
      background: { r: 255, g: 255, b: 255 },
    })
    .png()
    .toBuffer();
  await write(padded, file, 1000);
}

for (const [folder, slug] of Object.entries(BEADS)) {
  const f = firstImage(path.join(src, "photos", "beads", folder));
  if (f) await writeBead(f, path.join(out, "beads", `${slug}.webp`));
}
for (const [folder, slug] of Object.entries(MALAS)) {
  const f = firstImage(path.join(src, "photos", "malas", folder));
  if (f) await write(f, path.join(out, "malas", `${slug}.webp`), 1400);
}
for (const id of process.argv.includes("--founder") ? FOUNDER_PUBLISHED : []) {
  const dir = path.join(src, "photos", "founder");
  const f = fs.existsSync(dir) && fs.readdirSync(dir).find((n) => n.startsWith(id + ".") && IMG.test(n));
  if (f) {
    const trimmed = await sharp(path.join(dir, f))
      .rotate()
      .toColourspace("srgb")
      .trim({ background: "#ffffff", threshold: 12 })
      .png()
      .toBuffer();
    await write(trimmed, path.join(out, "founder", `${id}.webp`), 1400);
  }
  else console.warn(`founder ${id}: no JPG/PNG found (export it from the PowerPoint/PDF first)`);
}
const painting = path.join(src, "design", "assets", "shiva-painting-lit.jpg");
if (fs.existsSync(painting)) await write(painting, path.join(out, "shiva-painting.webp"), 1480);
