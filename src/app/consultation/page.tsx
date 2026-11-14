import type { Metadata } from "next";
import { consultation, site } from "@/data/site";
import { SiteHeader } from "@/components/layout/header";
import { SiteFooter } from "@/components/layout/footer";
import { ConsultSection } from "@/components/home/consult-section";

export const metadata: Metadata = {
  title: "Horoscope consultation",
  description: `Book a 30-minute horoscope consultation with ${site.founder.name}, ₹${consultation.fee}. He reads your chart and recommends the Rudraksha best matched to it.`,
  alternates: { canonical: "/consultation/" },
};

export default function ConsultationPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <ConsultSection headingLevel="h1" />
      </main>
      <SiteFooter />
    </>
  );
}
