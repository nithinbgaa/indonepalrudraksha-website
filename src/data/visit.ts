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
  consultant: string;
  role: string;
  phone: string; // tel: links
  phoneDisplay: string;
  whatsapp: string; // wa.me links, digits only
  location: string; // only the city is published
  directionsNote: string;
};

const common = {
  consultant: "Sri Panduranga Rao Garu",
  role: "Founder",
  directionsNote: "Exact office directions shared when your appointment is confirmed on WhatsApp.",
};

// In the order they happen.
export const visits: Visit[] = [
  {
    ...common,
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
    ...common,
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
];

export const visitBySlug = (slug: string) => {
  const v = visits.find((x) => x.slug === slug);
  if (!v) throw new Error(`No visit with slug "${slug}" in src/data/visit.ts`);
  return v;
};

export const visitPath = (v: Visit) => `/${v.slug}/`;

export const visitWhatsApp = (v: Visit, message: string) =>
  `https://wa.me/${v.whatsapp}?text=${encodeURIComponent(message)}`;

export const visitBookingMessage = (v: Visit) =>
  [
    `Namaste! I would like an appointment for the in-person consultation with ${v.consultant} in ${v.city} on ${v.dateLabel}.`,
    "Name: ",
    "Preferred time: ",
  ].join("\n");

export const visitNextDateMessage = (v: Visit) =>
  `Namaste! When is the next in-person consultation with ${v.consultant} in ${v.city}? I would like an appointment.`;

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
