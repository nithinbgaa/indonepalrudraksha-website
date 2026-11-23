// "Founder's Word" section: the founder's bio and his photo carousel.
// All 17 photos are shown (Rado, 2026-11-14). `review` records the lawyer review group from the
// Project's CONTENT-NOTES.md (A: PM/President/VP/Governor, B: politicians, C: film celebrities,
// D: lowest risk). To hide a photo, set `published: false`; to add one, put the image in
// photos/founder/, run `npm run images -- <content folder>` and add an entry here.

export interface FounderSlide {
  id: string; // file name in public/images/founder/<id>.webp
  caption: string; // shown under the photo and as its alt text
  // Who is in the photo. Not shown on the site: captions naming politicians and celebrities were removed
  // on 2026-11-23 so ad reviewers (Google, Meta) don't read the page as a celebrity endorsement.
  person?: string;
  review: "A" | "B" | "C" | "D";
  published: boolean;
}

export const founderBio = [
  "Dr. Panduranga Rao Garu brings together science, spirituality, mathematics and astrology to guide people towards a better path. Popularly known as “Rudraksha Panduranga Rao”, he has shared his discourses on television channels for over three decades.",
  "He has represented India’s spiritual and scientific traditions on international platforms, and has been honoured with national and international awards, including a special honour from the Government of Malaysia.",
  "For decades he has earned the trust and devotion of people for his wisdom, his spirituality and his selfless service, and he personally guides every horoscope consultation booked here.",
];

export const founderSlides: FounderSlide[] = [
  // The two award photos open the slideshow (2026-11-23), before the photos with public figures.
  { id: "07", caption: "At the Best Rudraksha Organisation award ceremony", review: "D", published: true },
  { id: "13", caption: "At an award ceremony with delegates in Dubai", review: "D", published: true },
  {
    id: "01",
    caption: "At a public event",
    person: "Narendra Modi, Prime Minister of India",
    review: "A",
    published: true,
  },
  {
    id: "02",
    caption: "At a public event",
    person: "N. Chandrababu Naidu, Chief Minister of Andhra Pradesh",
    review: "B",
    published: true,
  },
  {
    id: "03",
    caption: "At a public event",
    person: "Dr. Manmohan Singh, former Prime Minister of India",
    review: "A",
    published: true,
  },
  {
    id: "04",
    caption: "At a public event",
    person: "Dr. Y.S. Rajasekhara Reddy, former Chief Minister of Andhra Pradesh",
    review: "B",
    published: true,
  },
  {
    id: "05",
    caption: "At a public event",
    person: "K.T. Rama Rao, former IT Minister of Telangana",
    review: "B",
    published: true,
  },
  {
    id: "06",
    caption: "At a public event",
    person: "Pratibha Patil, former President of India",
    review: "A",
    published: true,
  },
  { id: "08", caption: "At a public event", person: "actress Tamannaah", review: "C", published: true },
  {
    id: "09",
    caption: "At a public event",
    person: "B.S. Yediyurappa, former Chief Minister of Karnataka",
    review: "B",
    published: true,
  },
  { id: "10", caption: "At a public event", person: "actress Kajal", review: "C", published: true },
  {
    id: "11",
    caption: "At a public event",
    person: "Dr. Venkaiah Naidu, former Vice President of India",
    review: "A",
    published: true,
  },
  { id: "12", caption: "At a public event", person: "actor Abhay Deol", review: "C", published: true },
  { id: "14", caption: "At a public event", person: "actress Priyanka Chopra", review: "C", published: true },
  {
    id: "15",
    caption: "At a public event",
    person: "K. Rosaiah, former Chief Minister of Andhra Pradesh and former Governor of Tamil Nadu",
    review: "A",
    published: true,
  },
  {
    id: "16",
    caption: "At a public event",
    person: "G. Kishan Reddy, Union Minister of Mines",
    review: "B",
    published: true,
  },
  { id: "17", caption: "At a public event", person: "Chinna Jeeyar Swami", review: "D", published: true },
];

export const publishedFounderSlides = founderSlides.filter((s) => s.published);
