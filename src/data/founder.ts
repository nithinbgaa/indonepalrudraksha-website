// "Founder's Word" section: the founder's bio and his photo carousel.
// All 17 photos are shown (Rado, 2026-11-14). `review` records the lawyer review group from the
// Project's CONTENT-NOTES.md (A: PM/President/VP/Governor, B: politicians, C: film celebrities,
// D: lowest risk). To hide a photo, set `published: false`; to add one, put the image in
// photos/founder/, run `npm run images -- <content folder>` and add an entry here.

export interface FounderSlide {
  id: string; // file name in public/images/founder/<id>.webp
  caption: string;
  review: "A" | "B" | "C" | "D";
  published: boolean;
}

export const founderBio = [
  "Dr. Panduranga Rao Garu brings together science, spirituality, mathematics and astrology to guide people towards a better path. Popularly known as “Rudraksha Panduranga Rao”, he has inspired millions through his discourses on television channels for over three decades.",
  "He has represented India’s spiritual and scientific traditions on international platforms, and has been honoured with national and international awards, including a special honour from the Government of Malaysia. At an award ceremony hosted by the Government of Nepal, he read the horoscope of the Prime Minister of Nepal in just eight seconds, live on television.",
  "For decades he has earned the trust and devotion of people for his wisdom, his spirituality and his selfless service, and he personally guides every horoscope consultation booked here.",
];

export const founderSlides: FounderSlide[] = [
  { id: "01", caption: "With Narendra Modi, Prime Minister of India", review: "A", published: true },
  { id: "02", caption: "With N. Chandrababu Naidu, Chief Minister of Andhra Pradesh", review: "B", published: true },
  { id: "03", caption: "With Dr. Manmohan Singh, former Prime Minister of India", review: "A", published: true },
  {
    id: "04",
    caption: "With Dr. Y.S. Rajasekhara Reddy, former Chief Minister of Andhra Pradesh",
    review: "B",
    published: true,
  },
  { id: "05", caption: "With K.T. Rama Rao, former IT Minister of Telangana", review: "B", published: true },
  { id: "06", caption: "With Pratibha Patil, former President of India", review: "A", published: true },
  { id: "07", caption: "At the Best Rudraksha Organisation award ceremony", review: "D", published: true },
  { id: "08", caption: "With actress Tamannaah", review: "C", published: true },
  { id: "09", caption: "With B.S. Yediyurappa, former Chief Minister of Karnataka", review: "B", published: true },
  { id: "10", caption: "With actress Kajal", review: "C", published: true },
  { id: "11", caption: "With Dr. Venkaiah Naidu, former Vice President of India", review: "A", published: true },
  { id: "12", caption: "With actor Abhay Deol", review: "C", published: true },
  { id: "13", caption: "At an award ceremony with delegates in Dubai", review: "D", published: true },
  { id: "14", caption: "With actress Priyanka Chopra", review: "C", published: true },
  {
    id: "15",
    caption: "With K. Rosaiah, former Chief Minister of Andhra Pradesh and former Governor of Tamil Nadu",
    review: "A",
    published: true,
  },
  { id: "16", caption: "With G. Kishan Reddy, Union Minister of Mines", review: "B", published: true },
  { id: "17", caption: "With Chinna Jeeyar Swami", review: "D", published: true },
];

export const publishedFounderSlides = founderSlides.filter((s) => s.published);
