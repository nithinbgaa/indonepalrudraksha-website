import type { Metadata } from "next";
import { site } from "@/data/site";
import { TextPage } from "@/components/layout/text-page";

export const metadata: Metadata = {
  title: "Privacy policy",
  alternates: { canonical: "/privacy/" },
};

export default function Privacy() {
  return (
    <TextPage eyebrow="Legal" title="Privacy policy" updated="[date]">
      <p>
        This policy explains what personal data {site.name} ([legal name]) collects, why, and your rights under the
        Digital Personal Data Protection Act, 2023.
      </p>
      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Orders:</strong> your name, phone number, delivery address and, if you ask for a GST invoice, your
          GSTIN — shared with us on WhatsApp.
        </li>
        <li>
          <strong>Consultations:</strong> your name, phone number, email, and your date, time and place of birth. These
          are entered in the Razorpay payment form or sent to us on WhatsApp, and are stored by Razorpay and in our
          WhatsApp account.
        </li>
        <li>
          <strong>Payments:</strong> handled by Razorpay. We receive the payment status and ID, not your card or bank
          details.
        </li>
        <li>
          <strong>This website:</strong> your cart is kept only in your own browser. The site sets no tracking or
          advertising cookies. [Update this if analytics are added.]
        </li>
      </ul>
      <h2>Why we use it</h2>
      <p>
        To confirm and deliver your order, issue invoices, arrange and hold your consultation, process refunds, and meet
        legal and tax duties. Birth details are used only to prepare your reading.
      </p>
      <h2>Who we share it with</h2>
      <p>
        Razorpay (payments), our courier partners (name, address and phone, for delivery), Meta’s WhatsApp (messaging),
        Google Workspace (email), and authorities where the law requires. We do not sell your data.
      </p>
      <h2>How long we keep it</h2>
      <p>
        Order and invoice records for as long as tax law requires [8 years]. Consultation details for [X months] after
        your call, unless you ask us to delete them sooner.
      </p>
      <h2>Your rights</h2>
      <p>
        You can ask to see, correct or delete your data, or withdraw consent, by writing to {site.email}. Our grievance
        officer is [name], reachable at the same address.
      </p>
    </TextPage>
  );
}
