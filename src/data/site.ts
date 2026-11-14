// Business details shown across the site. Edit here, then deploy.
// Anything in [square brackets] is still waiting for the business to confirm.
// `npm run check:placeholders` lists every bracket left in the built site.

export const site = {
  name: "IndoNepal Rudraksha",
  url: "https://indonepalrudrakshaorganisation.in",
  description:
    "Genuine Nepali Rudraksha, 1 to 16 Mukhi, rare beads, malas and bracelets, each with a certificate of authenticity. Horoscope consultations with Dr. Panduranga Rao Garu.",

  // WhatsApp Business number for orders, mala prices and consultations.
  whatsapp: "919177778852", // country code + number, digits only (used in wa.me links)
  whatsappDisplay: "+91 91777 78852",
  email: "info@indonepalrudrakshaorganisation.in",
  address: [
    "C/O Gullipalli Appalanaidu, Plot No. 1057/A, Bilwa-45",
    "Road No. 45, Starting Point Cable Bridge, Jubilee Hills",
    "Hyderabad, Telangana 500033",
  ],

  founder: {
    name: "Dr. Panduranga Rao Garu",
    shortName: "Panduranga Rao Garu",
    title: "Rudraksha Philosopher · Vedic Mathematics Scholar",
  },

  // Second half of the top announcement bar. Leave empty to show only "Genuine Rudraksha from Nepal".
  announcement: "Certificate of authenticity with every bead",

  // Trust strip under the hero.
  assurances: {
    origin: "every bead sourced from Nepal",
    certified: "certificate of authenticity with every bead",
    delivery: "shipped across India, and abroad on request",
  },

  maxQtyPerItem: 10,
} as const;

export const consultation = {
  fee: 500,
  durationMinutes: 30,
  // 10 slots a day, IST, as minutes from midnight. 11:00 AM – 6:00 PM with a break 1:30–3:30 PM.
  // [Confirm the exact times with the business.]
  slots: [660, 690, 720, 750, 780, 930, 960, 990, 1020, 1050],
  hoursLabel: "11:00 AM – 6:00 PM IST",
  // Days with no consultations, 0 = Sunday … 6 = Saturday.
  closedWeekdays: [] as number[],
  // A slot must start at least this many minutes from now to be chosen.
  minLeadMinutes: 120,
  // How many weeks ahead customers can pick.
  weeksAhead: 5,
  // Razorpay Payment Button id (starts with pl_). Empty = show "Book on WhatsApp" instead.
  razorpayButtonId: "",
  // Shown after payment: "We'll confirm your slot on WhatsApp within … hours".
  confirmWithinHours: "[X]",
};
