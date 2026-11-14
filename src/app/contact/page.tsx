import type { Metadata } from "next";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/format";
import { TextPage } from "@/components/layout/text-page";
import { WhatsAppIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Contact us",
  description: `WhatsApp ${site.whatsappDisplay}, email ${site.email}. ${site.address.join(", ")}.`,
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return (
    <TextPage
      eyebrow="Contact"
      title="Speak with us"
      intro="For orders, mala prices, consultations or help choosing a bead, WhatsApp is the quickest way to reach us."
    >
      <div className="not-prose flex flex-col gap-4">
        <a
          href={whatsappLink("Namaste! I have a question.")}
          target="_blank"
          rel="noopener"
          className="flex min-h-[52px] w-fit items-center gap-2.5 rounded-full bg-saffron px-7 text-[17px] font-semibold text-on-saffron no-underline hover:text-on-saffron"
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
      <p>[Days and hours when the team replies on WhatsApp, e.g. Monday to Saturday, 10 AM – 7 PM IST.]</p>
      <h2>Grievance officer</h2>
      <p>
        Under the Consumer Protection (E-Commerce) Rules, 2020: [Name], [designation], {site.email}. We acknowledge
        complaints within 48 hours and resolve them within one month.
      </p>
    </TextPage>
  );
}
