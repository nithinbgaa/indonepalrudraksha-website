// A city visit page (/vijayawada/, /guntur/ …): the Final URL of that city's ad campaign. The dated card swaps to
// an evergreen "next date" message after the visit, so the URL never expires.

import type { Metadata } from "next";
import { site } from "@/data/site";
import { visitBySlug, visitPath } from "@/data/visit";
import { TextPage } from "@/components/layout/text-page";
import { VisitCard } from "./visit";

export function visitMetadata(slug: string): Metadata {
  const v = visitBySlug(slug);
  return {
    title: `${v.city} In-Person Rudraksha Consultation`,
    description: `Meet ${v.consultant} in person in ${v.city} on ${v.dateLabel}, ${v.time.toLowerCase()}. Call or WhatsApp ${v.phoneDisplay} for an appointment.`,
    alternates: { canonical: visitPath(v) },
  };
}

export function VisitPage({ slug }: { slug: string }) {
  const v = visitBySlug(slug);
  return (
    <TextPage
      eyebrow={`${v.city} visit`}
      title={`${v.city} In-Person Rudraksha Consultation`}
      intro={`Meet ${v.consultant}, founder of ${site.legal.tradeName}, in person for a traditional horoscope consultation and guidance on choosing a Rudraksha.`}
      plain
    >
      <VisitCard v={v} />
      <div className="flex flex-col gap-3 text-[15px] text-body">
        <h2 className="m-0 font-display text-[24px] font-normal text-heading">About the consultation</h2>
        <p className="m-0">
          {v.consultant} reads your horoscope in the Vedic astrological tradition and, if you wish, suggests the
          Rudraksha traditionally associated with your chart. Bring your date, time and place of birth. The consultation
          is traditional spiritual guidance; it is not medical, legal, financial or psychological advice, and no
          particular outcome is promised.
        </p>
      </div>
    </TextPage>
  );
}
