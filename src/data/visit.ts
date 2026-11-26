// In-person consultation visits. Each one gets its own page (/<slug>/), a row in the homepage banner and a line
// on the contact page. To add or change a visit, edit this list and deploy. Everything is static HTML; after a
// visit's date has passed (midnight IST) a tiny script in the root layout hides that visit's dated content and its
// page switches to an evergreen "call us for the next date" message, so the URL never expires.

export type Visit = {
  city: string;
  slug: string; // the page lives at /<slug>/
  date: string; // YYYY-MM-DD in IST
  dateLabel: string;
  time: string;
  consultant: string; // as shown on the page, e.g. "Sri Panduranga Rao Garu" or "Our Bangalore consultant"
  founder: boolean; // true when the founder himself consults (changes the wording)
  phone: string; // tel: links
  phoneDisplay: string;
  whatsapp: string; // wa.me links, digits only
  location: string; // only the city is published
  directionsNote: string;
};

const founderVisit = {
  consultant: "Sri Panduranga Rao Garu",
  founder: true,
  directionsNote: "Exact office directions shared when your appointment is confirmed on WhatsApp.",
};

// In the order they happen.
export const visits: Visit[] = [
  {
    ...founderVisit,
    city: "Guntur",
    slug: "guntur",
    date: "2026-11-26",
    dateLabel: "Thursday, Nov 26",
    time: "Morning to Afternoon (By Appointment)",
    phone: "+917799799317",
    phoneDisplay: "+91 77997 99317",
    whatsapp: "917799799317",
    location: "Guntur, Andhra Pradesh",
  },
  {
    ...founderVisit,
    city: "Vijayawada",
    slug: "vijayawada",
    date: "2026-11-26",
    dateLabel: "Thursday, Nov 26",
    time: "Afternoon to Evening (By Appointment)",
    phone: "+918186899997",
    phoneDisplay: "+91 81868 99997",
    whatsapp: "918186899997",
    location: "Vijayawada, Andhra Pradesh",
  },
  {
    ...founderVisit,
    city: "Kakinada",
    slug: "kakinada",
    date: "2026-11-29",
    dateLabel: "Sunday, Nov 29",
    time: "Morning to Afternoon (By Appointment)",
    phone: "+917799799311",
    phoneDisplay: "+91 77997 99311",
    whatsapp: "917799799311",
    location: "Kakinada, Andhra Pradesh",
  },
  {
    ...founderVisit,
    city: "Rajahmundry",
    slug: "rajahmundry",
    date: "2026-11-29",
    dateLabel: "Sunday, Nov 29",
    time: "Afternoon to Evening (By Appointment)",
    phone: "+917997993233",
    phoneDisplay: "+91 79979 93233",
    whatsapp: "917997993233",
    location: "Rajahmundry, Andhra Pradesh",
  },
  {
    // Another consultant from the team (the founder is in Kakinada and Rajahmundry that day).
    consultant: "Our Bangalore consultant",
    founder: false,
    directionsNote: founderVisit.directionsNote,
    city: "Bangalore",
    slug: "bangalore",
    date: "2026-11-29",
    dateLabel: "Sunday, Nov 29",
    time: "By Appointment",
    phone: "+919177778855",
    phoneDisplay: "+91 91777 78855",
    whatsapp: "919177778855",
    location: "Bengaluru, Karnataka",
  },
];

export const visitBySlug = (slug: string) => {
  const v = visits.find((x) => x.slug === slug);
  if (!v) throw new Error(`No visit with slug "${slug}" in src/data/visit.ts`);
  return v;
};

export const visitPath = (v: Visit) => `/${v.slug}/`;

export const visitWhatsApp = (v: Visit, message: string) =>
  `https://wa.me/${v.whatsapp}?text=${encodeURIComponent(message)}`;

const withWhom = (v: Visit) => (v.founder ? ` with ${v.consultant}` : "");

export const visitBookingMessage = (v: Visit) =>
  [
    `Namaste! I would like an appointment for the in-person consultation${withWhom(v)} in ${v.city} on ${v.dateLabel}.`,
    "Name: ",
    "Preferred time: ",
  ].join("\n");

export const visitNextDateMessage = (v: Visit) =>
  `Namaste! When is the next in-person consultation${withWhom(v)} in ${v.city}? I would like an appointment.`;

/** Inline script for the root layout: before anything is painted, marks <html> with data-past-<slug> for every
 *  visit whose date has passed in IST, and data-past-all when all of them have, so dated content never flashes. */
export const visitDateScript = `(function(){try{var t=new Date().toLocaleDateString("en-CA",{timeZone:"Asia/Kolkata"}),v=${JSON.stringify(
  visits.map((v) => [v.slug, v.date]),
)},n=0,h=document.documentElement;v.forEach(function(x){if(t>x[1]){h.setAttribute("data-past-"+x[0],"");n++}});if(n===v.length)h.setAttribute("data-past-all","")}catch(e){}})();`;

/** CSS that goes with the script: `.visit-upcoming` / `.visit-past` elements carry data-visit="<slug>" or "all". */
export const visitCss = [...visits.map((v) => v.slug), "all"]
  .map(
    (s) =>
      `html[data-past-${s}] .visit-upcoming[data-visit="${s}"]{display:none!important}` +
      `html:not([data-past-${s}]) .visit-past[data-visit="${s}"]{display:none!important}`,
  )
  .join("");
