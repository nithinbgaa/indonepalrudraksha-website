// In-person visits (src/data/visit.ts): the combined homepage banner, and the card on each city page.
// Everything is in the static HTML. Elements with `.visit-upcoming` hide, and `.visit-past` show, once their
// visit's date has passed in IST (data-visit="<slug>", or "all" for the whole banner; see visitDateScript).

import Link from "next/link";
import { site } from "@/data/site";
import { type Visit, visitBookingMessage, visitNextDateMessage, visitPath, visitWhatsApp, visits } from "@/data/visit";
import { PhoneIcon, WhatsAppIcon } from "@/components/ui/icons";

const btn = "flex items-center justify-center gap-2 rounded-full font-semibold no-underline!";
const solid = `${btn} bg-saffron text-on-saffron hover:text-on-saffron`;
const outline = `${btn} border border-chalk text-heading hover:text-heading`;

function Buttons({ v, message }: { v: Visit; message: string }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <a href={`tel:${v.phone}`} className={`${outline} min-h-12 px-6 text-base`}>
        <PhoneIcon size={18} />
        Call {v.phoneDisplay}
      </a>
      <a href={visitWhatsApp(v, message)} target="_blank" rel="noopener" className={`${solid} min-h-12 px-6 text-base`}>
        <WhatsAppIcon size={18} />
        WhatsApp for an appointment
      </a>
    </div>
  );
}

/** One compact card on the homepage, above the hero, with a row per city. A city's row disappears after its
 *  date; the whole card disappears (no empty space) once every visit has passed. */
export function VisitBanner() {
  const consultant = visits[0].consultant;
  return (
    <div data-visit="all" className="visit-upcoming border-b border-hairline bg-deep">
      <section aria-label="In-person consultations" className="mx-auto flex max-w-[1200px] flex-col gap-4 px-6 py-5">
        <div className="flex flex-col gap-1">
          <span className="text-[12px] tracking-[0.28em] text-saffron uppercase">In-person consultations</span>
          <span className="font-display text-[22px] leading-tight text-heading sm:text-[24px]">
            Meet {consultant} in person
          </span>
        </div>
        <ul className="m-0 grid list-none gap-3 p-0 lg:grid-cols-2">
          {visits.map((v) => (
            <li
              key={v.slug}
              data-visit={v.slug}
              data-visit-date={v.date}
              className="visit-upcoming flex flex-col gap-2.5 rounded-[18px] border border-[rgba(142,195,224,0.26)] bg-card p-3.5 sm:flex-row sm:items-center sm:justify-between sm:p-4 lg:flex-col lg:items-start"
            >
              <div className="flex flex-col">
                <span className="font-display text-[21px] leading-tight text-heading">
                  {v.city} · {v.dateLabel}
                </span>
                <span className="text-[15px] text-muted">
                  {v.time} ·{" "}
                  <Link href={visitPath(v)} className="text-chalk underline underline-offset-2">
                    Details
                  </Link>
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <a href={`tel:${v.phone}`} className={`${outline} min-h-11 px-4 text-[15px]`}>
                  <PhoneIcon size={16} />
                  {v.phoneDisplay}
                </a>
                <a
                  href={visitWhatsApp(v, visitBookingMessage(v))}
                  target="_blank"
                  rel="noopener"
                  aria-label={`WhatsApp for a ${v.city} appointment`}
                  className={`${solid} min-h-11 px-4 text-[15px]`}
                >
                  <WhatsAppIcon size={16} />
                  WhatsApp
                </a>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

/** The visit card on a city page, with the evergreen message that replaces it after the date. */
export function VisitCard({ v }: { v: Visit }) {
  const row = "grid gap-1 sm:grid-cols-[150px_1fr] sm:gap-4";
  const label = "text-[13px] tracking-[0.14em] text-muted uppercase";
  const card = "flex flex-col rounded-[22px] border border-[rgba(142,195,224,0.3)] bg-card p-5 sm:p-7";
  return (
    <div className="flex flex-col gap-6">
      <div
        data-visit={v.slug}
        data-visit-date={v.date}
        className={`visit-upcoming ${card} gap-6 shadow-[0_0_60px_rgba(95,168,218,0.12)]`}
      >
        <h2 className="m-0 font-display text-[26px] leading-tight font-normal text-heading sm:text-[30px]">
          {v.city} In-Person Rudraksha Consultation — {v.dateLabel}
        </h2>
        <dl className="m-0 flex flex-col gap-4 text-body">
          <div className={row}>
            <dt className={label}>Consultant</dt>
            <dd className="m-0 text-heading">
              {v.consultant} ({v.role}, {site.legal.tradeName})
            </dd>
          </div>
          <div className={row}>
            <dt className={label}>Date &amp; time</dt>
            <dd className="m-0 text-heading">
              {v.dateLabel} · {v.time}
            </dd>
          </div>
          <div className={row}>
            <dt className={label}>Location</dt>
            <dd className="m-0">
              <span className="block text-heading">{v.location}</span>
              <span className="mt-1 block text-[15px] text-muted">{v.directionsNote}</span>
            </dd>
          </div>
          <div className={row}>
            <dt className={label}>Phone / WhatsApp</dt>
            <dd className="m-0 text-heading">{v.phoneDisplay}</dd>
          </div>
        </dl>
        <Buttons v={v} message={visitBookingMessage(v)} />
        <p className="m-0 text-[15px] text-muted">
          Visit dates and timings are subject to change; please confirm your appointment on WhatsApp before visiting.
        </p>
      </div>

      <div data-visit={v.slug} data-visit-date={v.date} className={`visit-past ${card} gap-5`}>
        <h2 className="m-0 font-display text-[26px] leading-tight font-normal text-heading">
          The next {v.city} consultation
        </h2>
        <p className="m-0 text-body">
          {v.consultant} visits {v.city} for in-person consultations from time to time. Call or WhatsApp{" "}
          {v.phoneDisplay} and we will tell you the next date and book your appointment.
        </p>
        <Buttons v={v} message={visitNextDateMessage(v)} />
      </div>
    </div>
  );
}
