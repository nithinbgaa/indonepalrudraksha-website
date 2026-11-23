// The in-person visit (src/data/visit.ts): homepage banner and the card on /vijayawada/.
// Everything is in the static HTML. `.visit-upcoming` hides and `.visit-past` shows once the visit date has
// passed in IST (see visitDateScript and globals.css).

import Link from "next/link";
import { site } from "@/data/site";
import { mapsLink, visit, visitBookingMessage, visitNextDateMessage, visitPath, visitWhatsApp } from "@/data/visit";
import { PhoneIcon, WhatsAppIcon } from "@/components/ui/icons";

const solid =
  "flex min-h-12 items-center justify-center gap-2 rounded-full bg-saffron px-6 text-base font-semibold text-on-saffron no-underline! hover:text-on-saffron";
const outline =
  "flex min-h-12 items-center justify-center gap-2 rounded-full border border-chalk px-6 text-base font-semibold text-heading no-underline! hover:text-heading";

function Buttons({ message }: { message: string }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <a href={`tel:${visit.phone}`} className={outline}>
        <PhoneIcon size={18} />
        Call {visit.phoneDisplay}
      </a>
      <a href={visitWhatsApp(message)} target="_blank" rel="noopener" className={solid}>
        <WhatsAppIcon size={18} />
        WhatsApp for an appointment
      </a>
    </div>
  );
}

/** Compact card on the homepage, above the hero. Gone (no empty space) after the visit date. */
export function VisitBanner() {
  return (
    <div data-visit-date={visit.date} className="visit-upcoming border-b border-hairline bg-deep">
      <section
        aria-label={`${visit.city} in-person consultation`}
        className="mx-auto flex max-w-[1200px] flex-col gap-4 px-6 py-5 lg:flex-row lg:items-center lg:justify-between"
      >
        <div className="flex flex-col gap-1">
          <span className="text-[12px] tracking-[0.28em] text-saffron uppercase">In-person consultation</span>
          <span className="font-display text-[22px] leading-tight text-heading sm:text-[24px]">
            {visit.city} · {visit.dateLabel} · {visit.consultant}
          </span>
          <span className="text-[15px] text-muted">
            {visit.time} ·{" "}
            <Link href={visitPath} className="text-chalk underline underline-offset-2">
              Address and details
            </Link>
          </span>
        </div>
        <Buttons message={visitBookingMessage()} />
      </section>
    </div>
  );
}

/** The visit card on /vijayawada/, with the evergreen message that replaces it after the date. */
export function VisitCard() {
  const row = "grid gap-1 sm:grid-cols-[150px_1fr] sm:gap-4";
  const label = "text-[13px] tracking-[0.14em] text-muted uppercase";
  return (
    <div className="not-prose flex flex-col gap-6">
      <div
        data-visit-date={visit.date}
        className="visit-upcoming flex flex-col gap-6 rounded-[22px] border border-[rgba(142,195,224,0.3)] bg-card p-5 shadow-[0_0_60px_rgba(95,168,218,0.12)] sm:p-7"
      >
        <h2 className="m-0 font-display text-[26px] leading-tight font-normal text-heading sm:text-[30px]">
          {visit.city} In-Person Rudraksha Consultation — {visit.dateLabel}
        </h2>
        <dl className="m-0 flex flex-col gap-4 text-body">
          <div className={row}>
            <dt className={label}>Consultant</dt>
            <dd className="m-0 text-heading">
              {visit.consultant} ({visit.role}, {site.legal.tradeName})
            </dd>
          </div>
          <div className={row}>
            <dt className={label}>Date &amp; time</dt>
            <dd className="m-0 text-heading">
              {visit.dateLabel} · {visit.time}
            </dd>
          </div>
          <div className={row}>
            <dt className={label}>Address</dt>
            <dd className="m-0">
              <address className="text-heading not-italic">
                {visit.address.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </address>
              <a
                href={mapsLink()}
                target="_blank"
                rel="noopener"
                className="mt-1 inline-flex min-h-11 items-center text-chalk underline underline-offset-2"
              >
                Open in Google Maps
              </a>
            </dd>
          </div>
          <div className={row}>
            <dt className={label}>Phone / WhatsApp</dt>
            <dd className="m-0 text-heading">{visit.phoneDisplay}</dd>
          </div>
        </dl>
        <Buttons message={visitBookingMessage()} />
        <p className="m-0 text-[15px] text-muted">
          Visit dates and timings are subject to change; please confirm your appointment on WhatsApp before visiting.
        </p>
      </div>

      <div
        data-visit-date={visit.date}
        className="visit-past flex flex-col gap-5 rounded-[22px] border border-[rgba(142,195,224,0.3)] bg-card p-5 sm:p-7"
      >
        <h2 className="m-0 font-display text-[26px] leading-tight font-normal text-heading">
          The next {visit.city} consultation
        </h2>
        <p className="m-0 text-body">
          {visit.consultant} visits {visit.city} for in-person consultations from time to time. Call or WhatsApp{" "}
          {visit.phoneDisplay} and we will tell you the next date and book your appointment.
        </p>
        <Buttons message={visitNextDateMessage()} />
      </div>
    </div>
  );
}
