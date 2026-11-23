// One in-person consultation visit, shown on /vijayawada/, the homepage banner and the contact page.
// For a future visit, edit these values (same city or another) and deploy. All of it is static HTML;
// after `date` has passed (midnight IST) a tiny script in the root layout hides the dated banner and the
// /vijayawada/ page switches to an evergreen "call us for the next date" message.

export const visit = {
  city: "Vijayawada",
  slug: "vijayawada", // the page lives at /vijayawada/
  date: "2026-11-26", // YYYY-MM-DD in IST
  dateLabel: "Thursday, Nov 26",
  time: "Afternoon to Evening (By Appointment)",
  consultant: "Sri Panduranga Rao Garu",
  role: "Founder",
  phone: "+918186899997", // tel: links
  phoneDisplay: "+91 81868 99997",
  whatsapp: "918186899997", // wa.me links, digits only
  address: [
    "Door No. 1(A), Ground Floor, Plot No. 02",
    "Near Vinayaka Apartments, Opp. Auto Nagar Bus Stop",
    "JD Nagar Rd, JD Nagar, Patamata",
    "Vijayawada, Andhra Pradesh 520010",
  ],
};

export const visitPath = `/${visit.slug}/`;

export const visitWhatsApp = (message: string) => `https://wa.me/${visit.whatsapp}?text=${encodeURIComponent(message)}`;

export const visitBookingMessage = () =>
  [
    `Namaste! I would like an appointment for the in-person consultation with ${visit.consultant} in ${visit.city} on ${visit.dateLabel}.`,
    "Name: ",
    "Preferred time: ",
  ].join("\n");

export const visitNextDateMessage = () =>
  `Namaste! When is the next in-person consultation with ${visit.consultant} in ${visit.city}? I would like an appointment.`;

export const mapsLink = () =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(visit.address.join(", "))}`;

/** Inline script for the root layout: marks the page once the visit date has passed in IST, before anything
 *  is painted, so dated content never flashes. CSS in globals.css does the hiding. */
export const visitDateScript = `(function(){try{var t=new Date().toLocaleDateString("en-CA",{timeZone:"Asia/Kolkata"});if(t>"${visit.date}")document.documentElement.setAttribute("data-visit-past","")}catch(e){}})();`;
