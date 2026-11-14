// Turns the original photos in the content folder into web-sized WebP files in public/images.
//
//   node scripts/prepare-images.mjs ~/Desktop/IndoNepal-Website
//
// Re-run it whenever a photo changes. Output files are committed to the repo.
// Founder photos: only the numbers listed in FOUNDER_PUBLISHED are processed, so photos that
// are not cleared for publishing never reach public/ (anything in public/ is downloadable).
// PowerPoint and PDF founder files must first be exported as a JPG with the same number (e.g. 07.jpg).
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const FOUNDER_PUBLISHED = ["07", "13", "17"]; // keep in step with src/data/founder.ts

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

for (const [folder, slug] of Object.entries(BEADS)) {
  const f = firstImage(path.join(src, "photos", "beads", folder));
  if (f) await write(f, path.join(out, "beads", `${slug}.webp`), 1000);
}
for (const [folder, slug] of Object.entries(MALAS)) {
  const f = firstImage(path.join(src, "photos", "malas", folder));
  if (f) await write(f, path.join(out, "malas", `${slug}.webp`), 1400);
}
for (const id of FOUNDER_PUBLISHED) {
  const dir = path.join(src, "photos", "founder");
  const f = fs.existsSync(dir) && fs.readdirSync(dir).find((n) => n.startsWith(id + ".") && IMG.test(n));
  if (f) await write(path.join(dir, f), path.join(out, "founder", `${id}.webp`), 1400);
  else console.warn(`founder ${id}: no JPG/PNG found (export it from the PowerPoint/PDF first)`);
}
const painting = path.join(src, "design", "assets", "shiva-painting-lit.jpg");
if (fs.existsSync(painting)) await write(painting, path.join(out, "shiva-painting.webp"), 1480);
