import type { Metadata } from "next";
import { consultation, site } from "@/data/site";
import { inr } from "@/lib/format";
import { TextPage } from "@/components/layout/text-page";

export const metadata: Metadata = {
  title: "Terms of use",
  alternates: { canonical: "/terms/" },
};

export default function Terms() {
  return (
    <TextPage eyebrow="Legal" title="Terms of use" updated="20 November 2026">
      <p>
        This website is run by {site.legal.name}, a {site.legal.type} trading as {site.legal.tradeName} ({site.name}),
        GSTIN {site.legal.gstin}, registered at {site.legal.registeredOffice.join(", ")}, with a place of business at{" "}
        {site.address.join(", ")} (“we”, “us”). By using it or ordering from us you agree to these terms.
      </p>
      <h2>Products</h2>
      <ul>
        <li>
          Rudraksha are natural; each bead differs slightly in size, shape and colour from the drawings and photos.
        </li>
        <li>Prices are in Indian rupees and [include / exclude] GST. Delivery charges are confirmed before payment.</li>
        <li>Prices of malas, bracelets and rare beads are given on request and confirmed on WhatsApp.</li>
        <li>An order is accepted only when we confirm it on WhatsApp and you complete payment.</li>
      </ul>
      <h2>Payments</h2>
      <p>
        Payments are processed by Razorpay. We do not see or store your card or bank details. We do not offer cash on
        delivery.
      </p>
      <h2>Consultations</h2>
      <p>
        A horoscope consultation is a {consultation.durationMinutes}-minute call with {site.founder.name} for{" "}
        {inr(consultation.fee)}. The guidance given is traditional and spiritual in nature. It is not medical, legal,
        financial or psychological advice, and is not a substitute for professional advice.
      </p>
      <h2>Traditional beliefs</h2>
      <p>
        Descriptions of deities, planets, mantras and benefits reflect traditional belief. We do not promise any
        particular result from wearing a Rudraksha.
      </p>
      <h2>Content</h2>
      <p>
        Text, drawings and photos on this site belong to us or are used with permission. Please do not reuse them
        without asking.
      </p>
      <h2>Law and disputes</h2>
      <p>These terms are governed by the laws of India. Courts in Hyderabad, Telangana have jurisdiction.</p>
      <h2>Contact</h2>
      <p>
        {site.email} · WhatsApp {site.whatsappDisplay}
      </p>
    </TextPage>
  );
}
