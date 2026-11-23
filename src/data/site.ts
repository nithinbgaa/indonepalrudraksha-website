// Business details shown across the site. Edit here, then deploy.
// Anything in [square brackets] is still waiting for the business to confirm.
// `npm run check:placeholders` lists every bracket left in the built site.

export const site = {
  name: "IndoNepal Rudraksha",
  url: "https://indonepalrudrakshaorganisation.in",
  description:
    "Genuine Nepali Rudraksha, 1 to 16 Mukhi, rare beads, malas and bracelets, checked bead by bead. Horoscope consultations with Dr. Panduranga Rao Garu.",

  // WhatsApp Business number for orders, mala prices and consultations.
  whatsapp: "919177778852", // country code + number, digits only (used in wa.me links)
  whatsappDisplay: "+91 91777 78852",
  // Phone for calls (same number). Must stay on the site: Google checks call-ad numbers against it.
  phone: "+919177778852",
  phoneDisplay: "+91 91777 78852",
  hours: "Monday to Saturday, 10 AM – 7 PM IST",
  email: "info@indonepalrudrakshaorganisation.in",
  address: [
    "Plot No. 1057/A, Bilwa-45",
    "Road No. 45, Starting Point Cable Bridge, Jubilee Hills",
    "Hyderabad, Telangana 500033",
  ],

  // The legal business behind the site, from the GST registration certificate (REG-06).
  legal: {
    name: "Gullipalli Panduranga Rao",
    type: "sole proprietorship",
    tradeName: "Indo Nepal Rudraksha Organisation",
    gstin: "36AGOPG1245R1ZW",
    // Principal place of business on the GST certificate.
    registeredOffice: [
      "Flat No. G10 B, 6-3-252, Dhruvatara Complex",
      "Medinova Compound, Somajiguda",
      "Hyderabad, Telangana 500082",
    ],
  },

  // Grievance officer (Consumer Protection (E-Commerce) Rules, 2020 and DPDP Act, 2023).
  grievanceOfficer: {
    name: "Gullipalli Panduranga Rao (Dr. Panduranga Rao Garu)",
    designation: "Proprietor",
  },

  founder: {
    name: "Dr. Panduranga Rao Garu",
    shortName: "Panduranga Rao Garu",
    title: "Rudraksha Philosopher · Vedic Mathematics Scholar",
  },

  // Second half of the top announcement bar (the phone number is added after it).
  announcement: "Call or WhatsApp",

  // Trust strip under the hero.
  assurances: {
    origin: "every bead sourced from Nepal",
    checked: "every bead checked by hand before it is sent",
    delivery: "shipped across India, and abroad on request",
  },

  maxQtyPerItem: 10,

  // Site ownership codes. Prefer the DNS (TXT record) method in Cloudflare; use these only if a tool insists
  // on a meta tag. google: the content="…" value from Search Console's "HTML tag" method; facebook: the code
  // from Meta Business Settings → Brand safety → Domains → "Meta-tag verification".
  verification: { google: "" as string, facebook: "" as string },
} as const;

export const consultation = {
  fee: 500,
  durationMinutes: 30,
  // 10 slots a day, IST, as minutes from midnight. 11:00 AM – 6:00 PM with a break 1:30–3:30 PM.
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
  confirmWithinHours: "12",
  rescheduleHours: 12, // reschedule at least this many hours before the slot
  cancelHours: 24, // full refund if cancelled at least this many hours before
};

// Google Ads. While `googleAdsId` is empty the site loads no Google tag and shows no cookie banner.
// With an id, visitors see an Accept / Decline banner and the tag loads only after Accept.
export const ads = {
  // Google Ads → the tools icon → Data manager → Google tag, e.g. "AW-123456789".
  googleAdsId: "",
  // Conversion labels (the part after the slash in "AW-123456789/AbCdEfGh"), from
  // Google Ads → Goals → Conversions → the action → Tag setup → Install the tag yourself.
  // Empty = that action is not counted.
  conversions: {
    order: "", // "Place order on WhatsApp" in the cart
    askPrice: "", // "Ask for price" on malas, bracelets and rare beads
    consultRequest: "", // "Book on WhatsApp" in the consultation card
    consultPaid: "", // the thank-you page after a Razorpay consultation payment
    whatsapp: "", // any other WhatsApp chat link
  },
};
