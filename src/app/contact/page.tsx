import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";
import { visit, visitPath } from "@/data/visit";
import { whatsappLink } from "@/lib/format";
import { TextPage } from "@/components/layout/text-page";
import { PhoneIcon, WhatsAppIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Contact us",
  description: `Call or WhatsApp ${site.phoneDisplay}, email ${site.email}. ${site.address.join(", ")}.`,
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return (
    <TextPage
      eyebrow="Contact"
      title="Speak with us"
      intro="For orders, mala prices, consultations or help choosing a bead, call us or message us on WhatsApp."
    >
      <div className="not-prose flex flex-wrap gap-3">
        <a
          href={`tel:${site.phone}`}
          className="flex min-h-[52px] w-fit items-center gap-2.5 rounded-full border border-chalk px-7 text-[17px] font-semibold text-heading no-underline! hover:text-heading"
        >
          <PhoneIcon size={20} />
          Call {site.phoneDisplay}
        </a>
        <a
          href={whatsappLink("Namaste! I have a question.")}
          target="_blank"
          rel="noopener"
          className="flex min-h-[52px] w-fit items-center gap-2.5 rounded-full bg-saffron px-7 text-[17px] font-semibold text-on-saffron no-underline! hover:text-on-saffron"
        >
          <WhatsAppIcon size={20} />
          WhatsApp {site.whatsappDisplay}
        </a>
      </div>
      <h2>Email</h2>
      <p>
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>
      <h2>Address</h2>
      <address className="not-italic">
        <strong>{site.name}</strong>
        {site.address.map((l) => (
          <span key={l} className="block">
            {l}
          </span>
        ))}
      </address>
      <h2>Hours</h2>
      <p>Calls and WhatsApp: {site.hours}. Messages sent outside these hours are answered the next working day.</p>
      <h2>{visit.city} appointments</h2>
      <p>
        In-person consultations with {visit.consultant} in {visit.location}. Call or WhatsApp{" "}
        <a href={`tel:${visit.phone}`}>{visit.phoneDisplay}</a> to book. {visit.directionsNote} See{" "}
        <Link href={visitPath}>the {visit.city} visit page</Link> for the next date.
      </p>
      <h2>Grievance officer</h2>
      <p>
        Under the Consumer Protection (E-Commerce) Rules, 2020: {site.grievanceOfficer.name},{" "}
        {site.grievanceOfficer.designation}, {site.email}, {site.legal.registeredOffice.join(", ")}. We acknowledge
        complaints within 48 hours and resolve them within one month.
      </p>
    </TextPage>
  );
}
