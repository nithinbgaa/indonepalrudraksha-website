// Malas and bracelets. No prices are shown: each has an "Ask for price" WhatsApp button.
// A `null` detail hides that row on the page. Fill them in as the business confirms them.
import { asset } from "@/lib/asset";

export interface MalaItem {
  slug: string;
  form: "mala" | "bracelet";
  material: "rudraksha" | "karungali";
  pendant: boolean; // drawing shows a round bead below the guru bead
  title: string;
  sub: string | null; // Hindi / Tamil name
  line: string; // one line for the card
  about: string;
  madeOf: string | null;
  beads: string | null;
  strungOn: string | null;
  purpose: string | null;
  origin: string | null;
  sizes: string[]; // bead size choices, e.g. ["6 mm", "7 mm", "8 mm"]
  photos: string[];
  available: boolean;
}

const mala = (m: Partial<MalaItem> & Pick<MalaItem, "slug" | "title" | "line">): MalaItem => ({
  form: "mala",
  material: "rudraksha",
  pendant: false,
  sub: null,
  about: `${m.title} from IndoNepal Rudraksha. ${m.line}.`,
  madeOf: null,
  beads: null,
  strungOn: null,
  purpose: null,
  origin: m.material === "karungali" ? null : "Nepal",
  sizes: [],
  photos: [],
  available: true,
  ...m,
});

export const malas: MalaItem[] = [
  mala({
    slug: "siddha-mala-1-mukhi-round",
    title: "Siddha Mala with 1 Mukhi (Round)",
    sub: "सिद्ध माला · गोल एक मुखी",
    pendant: true,
    line: "Crowned with a round 1 Mukhi",
    about:
      "A Siddha Mala crowned with a round 1 Mukhi bead, capped and strung by hand. Ask us on WhatsApp for the composition and the current price.",
    madeOf: "Siddha Mala with a round 1 Mukhi bead",
    photos: [asset("/images/malas/siddha-mala-1-mukhi-round.webp")],
  }),
  mala({
    slug: "maha-mrityunjaya-mala",
    title: "Maha Mrityunjaya Mala",
    sub: "महामृत्युंजय माला",
    pendant: true,
    line: "Strung for the Maha Mrityunjaya mantra",
    about:
      "A Rudraksha mala with a sacred pendant, strung for chanting the Maha Mrityunjaya mantra. Ask us on WhatsApp for the composition and the current price.",
    photos: [asset("/images/malas/maha-mrityunjaya-mala.webp")],
  }),
  mala({
    slug: "srikanta-mala",
    title: "Srikanta Mala",
    sub: "श्रीकण्ठ माला",
    pendant: true,
    line: "Rudraksha with a sacred pendant",
    about:
      "A Rudraksha mala finished with a sacred pendant. Ask us on WhatsApp for the composition and the current price.",
    photos: [asset("/images/malas/srikanta-mala.webp")],
  }),
  mala({
    slug: "ugra-narayana-mala",
    title: "Ugra Narayana Mala",
    sub: "उग्र नारायण माला",
    pendant: true,
    line: "A mala with a sacred pendant",
    about: "A mala finished with a sacred pendant. Ask us on WhatsApp for the composition and the current price.",
    photos: [asset("/images/malas/ugra-narayana-mala.webp")],
  }),
  mala({
    slug: "patri-mala",
    title: "Patri Mala",
    line: "Hand-strung for japa and daily wear",
    about: "A hand-strung mala for japa and daily wear. Ask us on WhatsApp for the composition and the current price.",
    photos: [asset("/images/malas/patri-mala.webp")],
  }),
  mala({
    slug: "japa-mala-6mm",
    title: "Japa Mala (6 mm)",
    sub: "जप माला",
    line: "Small 6 mm beads for daily japa",
    about:
      "A Rudraksha japa mala of small 6 mm beads, light enough to carry for daily chanting. Ask us on WhatsApp for the current price.",
    madeOf: "Rudraksha, 6 mm beads",
    purpose: "Daily japa and meditation",
    photos: [asset("/images/malas/japa-mala-6mm.webp")],
  }),
  mala({
    slug: "karungali-mala",
    material: "karungali",
    title: "Karungali Mala",
    sub: "கருங்காலி மாலை · Black ebony",
    line: "Polished black ebony",
    about:
      "A mala of polished Karungali, the black ebony wood traditionally worn in South India. Choose a bead size and ask us on WhatsApp for the current price.",
    madeOf: "Karungali (black ebony)",
    sizes: ["6 mm", "7 mm", "8 mm"],
    photos: [asset("/images/malas/karungali-mala.webp")],
  }),
];

export const bracelets: MalaItem[] = [
  mala({
    slug: "rudraksha-bracelet",
    form: "bracelet",
    title: "Rudraksha Bracelet",
    sub: "रुद्राक्ष कंगन",
    line: "Rudraksha to wear every day",
    about:
      "Rudraksha beads strung as a bracelet for everyday wear. Ask us on WhatsApp for sizes and the current price.",
    madeOf: "Rudraksha beads",
  }),
  mala({
    slug: "karungali-bracelet",
    form: "bracelet",
    material: "karungali",
    title: "Karungali Bracelet",
    sub: "கருங்காலி காப்பு · Black ebony",
    line: "Black ebony to wear every day",
    about:
      "Polished Karungali beads strung as a bracelet for everyday wear. Ask us on WhatsApp for sizes and the current price.",
    madeOf: "Karungali (black ebony)",
  }),
];

export function getMala(slug: string) {
  return malas.find((m) => m.slug === slug);
}
export function getBracelet(slug: string) {
  return bracelets.find((m) => m.slug === slug);
}
export function itemHref(m: MalaItem) {
  return `/${m.form === "mala" ? "malas" : "bracelets"}/${m.slug}/`;
}
