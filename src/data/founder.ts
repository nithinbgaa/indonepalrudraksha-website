// Founder carousel. All 17 photos are listed; only `published: true` ones appear on the site.
// Before publishing another photo:
//   1. the lawyer clears it (review groups A–D in the Project's CONTENT-NOTES.md),
//   2. add its number to FOUNDER_PUBLISHED in scripts/prepare-images.mjs and re-run the script,
//   3. give it a `text` and set `published: true` here.
// Never copy an unpublished photo into public/ — everything there can be downloaded.

export interface FounderSlide {
  id: string;
  caption: string;
  review: "A" | "B" | "C" | "D";
  published: boolean;
  text?: string;
}

export const founderSlides: FounderSlide[] = [
  { id: "01", caption: "With Narendra Modi, Prime Minister of India", review: "A", published: false },
  { id: "02", caption: "With N. Chandrababu Naidu, Chief Minister of Andhra Pradesh", review: "B", published: false },
  { id: "03", caption: "With Dr. Manmohan Singh, former Prime Minister of India", review: "A", published: false },
  {
    id: "04",
    caption: "With Dr. Y.S. Rajasekhara Reddy, former Chief Minister of Andhra Pradesh",
    review: "B",
    published: false,
  },
  { id: "05", caption: "With K.T. Rama Rao, former IT Minister of Telangana", review: "B", published: false },
  { id: "06", caption: "With Pratibha Patil, former President of India", review: "A", published: false },
  {
    id: "07",
    caption: "At the Best Rudraksha Organisation award ceremony",
    review: "D",
    published: true,
    text: "Popularly known as “Rudraksha Panduranga Rao”, he has guided people through discourses on television for over three decades, bringing together science, spirituality, mathematics and astrology.",
  },
  { id: "08", caption: "With actress Tamannaah", review: "C", published: false },
  { id: "09", caption: "With B.S. Yediyurappa, former Chief Minister of Karnataka", review: "B", published: false },
  { id: "10", caption: "With actress Kajal", review: "C", published: false },
  { id: "11", caption: "With M. Venkaiah Naidu, former Vice President of India", review: "A", published: false },
  { id: "12", caption: "With actor Abhay Deol", review: "C", published: false },
  {
    id: "13",
    caption: "At an award ceremony with delegates in Dubai",
    review: "D",
    published: true,
    text: "He has represented India’s spiritual and scientific traditions on international platforms, and has been honoured with national and international awards, including a special honour from the Government of Malaysia.",
  },
  { id: "14", caption: "With actress Priyanka Chopra", review: "C", published: false },
  {
    id: "15",
    caption: "With K. Rosaiah, former Chief Minister of Andhra Pradesh and former Governor of Tamil Nadu",
    review: "A",
    published: false,
  },
  { id: "16", caption: "With G. Kishan Reddy, Union Minister of Mines", review: "B", published: false },
  {
    id: "17",
    caption: "With Chinna Jeeyar Swami",
    review: "D",
    published: true,
    text: "For decades he has earned the trust of devotees for his wisdom, his spirituality and his selfless service, and he personally guides every horoscope consultation booked here.",
  },
];

export const publishedFounderSlides = founderSlides.filter((s) => s.published && s.text);
