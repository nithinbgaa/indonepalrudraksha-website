// Rudraksha beads. Prices in rupees, from products.xlsx.
// Traditional associations (deity, planet, mantra) follow the design; Dr. Panduranga Rao Garu
// checks them before launch. A `null` planet or mantra hides that row on the bead page.

export type BeadSize = "normal" | "collector";
export type BeadShape = "single" | "gs" | "ggs" | "ganesh";

export interface Bead {
  slug: string;
  kind: "mukhi" | "rare";
  title: string; // "5 Mukhi Rudraksha"
  short: string; // "5 Mukhi"
  numeral: string; // Devanagari numeral, or a short word for rare beads
  hi: string; // "पाँच मुखी"
  hiFull: string; // "पाँच मुखी रुद्राक्ष"
  deity: string;
  planet: string | null;
  mantra: string | null;
  purpose: string; // one line, sentence case
  about: string;
  caption: string; // under the bead drawing
  lines: number; // mukhi lines drawn on the bead
  shape: BeadShape;
  prices: Record<BeadSize, number> | null; // null = "Ask for price"
  photos: string[]; // under /public
  available: boolean; // false shows "Currently unavailable"
}

const MUKHI: [number, string, string, string, string | null, string | null, string, [number, number]][] = [
  [1, "१", "एक मुखी", "Lord Shiva", "Sun", "ॐ ह्रीं नमः", "Higher awareness and focus", [4900, 8750]],
  [2, "२", "दो मुखी", "Ardhanarishvara", "Moon", "ॐ नमः", "Harmony in relationships", [3800, 7187]],
  [3, "३", "तीन मुखी", "Agni Dev", "Mars", "ॐ क्लीं नमः", "Confidence and fresh beginnings", [1500, 3562]],
  [4, "४", "चार मुखी", "Lord Brahma", "Mercury", "ॐ ह्रीं नमः", "Knowledge and clear speech", [500, 1125]],
  [5, "५", "पाँच मुखी", "Kalagni Rudra", "Jupiter", "ॐ ह्रीं नमः", "Calm and daily meditation", [200, 500]],
  [6, "६", "छह मुखी", "Lord Kartikeya", "Venus", "ॐ ह्रीं हुं नमः", "Willpower and steadiness", [500, 1125]],
  [7, "७", "सात मुखी", "Goddess Mahalakshmi", "Saturn", "ॐ हुं नमः", "Prosperity and abundance", [1200, 2750]],
  [8, "८", "आठ मुखी", "Lord Ganesha", "Rahu", "ॐ हुं नमः", "Removing obstacles", [6800, 11875]],
  [9, "९", "नौ मुखी", "Goddess Durga", "Ketu", "ॐ ह्रीं हुं नमः", "Courage and inner strength", [7800, 13125]],
  [10, "१०", "दस मुखी", "Lord Vishnu", "All nine planets", "ॐ ह्रीं नमः", "Protection and peace", [6800, 11875]],
  [11, "११", "ग्यारह मुखी", "Lord Hanuman", null, "ॐ ह्रीं हुं नमः", "Fearlessness and wisdom", [8400, 14375]],
  [12, "१२", "बारह मुखी", "Surya Dev", "Sun", "ॐ क्रौं स्रौं रौं नमः", "Radiance and leadership", [14000, 22500]],
  [13, "१३", "तेरह मुखी", "Kamadeva", "Venus", "ॐ ह्रीं नमः", "Charm and fulfilled wishes", [23000, 40000]],
  [14, "१४", "चौदह मुखी", "Lord Shiva · Deva Mani", "Saturn", "ॐ नमः", "Intuition and foresight", [95000, 150000]],
  [15, "१५", "पंद्रह मुखी", "Pashupatinath", null, null, "Compassion and spiritual growth", [125000, 156250]],
  [
    16,
    "१६",
    "सोलह मुखी",
    "Mahamrityunjaya · Lord Shiva",
    null,
    null,
    "Protection and freedom from fear",
    [280000, 350000],
  ],
];

const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

const mukhiBeads: Bead[] = MUKHI.map(([n, numeral, hi, deity, planet, mantra, purpose, [normal, collector]]) => ({
  slug: `${n}-mukhi`,
  kind: "mukhi",
  title: `${n} Mukhi Rudraksha`,
  short: `${n} Mukhi`,
  numeral,
  hi,
  hiFull: `${hi} रुद्राक्ष`,
  deity,
  planet,
  mantra,
  purpose,
  about: `A natural ${n} mukhi bead from Nepal, with ${n}${n === 1 ? " line" : " clear lines"} running from crown to base. Tradition holds it under the blessing of ${deity}, worn for ${lower(purpose)}.`,
  caption: `${n} natural mukhi ${n === 1 ? "line" : "lines"}`,
  lines: n,
  shape: "single",
  prices: { normal, collector },
  photos: [`/images/beads/${n}-mukhi.webp`],
  available: true,
}));

const rareBeads: Bead[] = [
  {
    slug: "gauri-shankar",
    kind: "rare",
    title: "Gauri Shankar Rudraksha",
    short: "Gauri Shankar",
    numeral: "गौरी",
    hi: "गौरी शंकर",
    hiFull: "गौरी शंकर रुद्राक्ष",
    deity: "Shiva and Parvati",
    planet: null,
    mantra: null,
    purpose: "Harmony in marriage and family",
    about:
      "Two Rudraksha beads that grew naturally joined on the tree, revered as Shiva and Parvati united. A rare bead from Nepal, traditionally kept for harmony in marriage and the family.",
    caption: "Two beads naturally joined as one",
    lines: 6,
    shape: "gs",
    prices: null,
    photos: ["/images/beads/gauri-shankar.webp"],
    available: true,
  },
  {
    slug: "garbha-gauri-shankar",
    kind: "rare",
    title: "Garbha Gauri Shankar Rudraksha",
    short: "Garbha Gauri Shankar",
    numeral: "गर्भ",
    hi: "गर्भ गौरी शंकर",
    hiFull: "गर्भ गौरी शंकर रुद्राक्ष",
    deity: "Parvati with infant Ganesha",
    planet: null,
    mantra: null,
    purpose: "Blessings for motherhood and children",
    about:
      "A rare Gauri Shankar that carries a third, smaller bead, seen as Parvati holding the infant Ganesha. A rare bead from Nepal, traditionally kept for the blessings of motherhood and children.",
    caption: "A Gauri Shankar carrying a smaller bead",
    lines: 6,
    shape: "ggs",
    prices: null,
    photos: [],
    available: true,
  },
  {
    slug: "ganesh",
    kind: "rare",
    title: "Ganesh Rudraksha",
    short: "Ganesh",
    numeral: "गणेश",
    hi: "गणेश रुद्राक्ष",
    hiFull: "गणेश रुद्राक्ष",
    deity: "Lord Ganesha",
    planet: null,
    mantra: "ॐ गं गणपतये नमः",
    purpose: "Removing obstacles and new beginnings",
    about:
      "A rare bead with a natural trunk-like rise on its surface, revered as a form of Lord Ganesha. A rare bead from Nepal, traditionally kept for clearing obstacles before new beginnings.",
    caption: "A natural trunk-like rise on the bead",
    lines: 5,
    shape: "ganesh",
    prices: null,
    photos: ["/images/beads/ganesh.webp"],
    available: true,
  },
];

export const beads: Bead[] = [...mukhiBeads, ...rareBeads];
export const mukhi = mukhiBeads;
export const rare = rareBeads;

export function getBead(slug: string) {
  return beads.find((b) => b.slug === slug);
}

export const sizeLabel: Record<BeadSize, string> = {
  normal: "Normal",
  collector: "Collector",
};

export const sizeNote: Record<BeadSize, string> = {
  normal: "Our standard size",
  collector: "A bigger bead of the same mukhi",
};
