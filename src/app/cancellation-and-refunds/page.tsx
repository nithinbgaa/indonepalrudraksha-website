import Link from "next/link";
import type { Metadata } from "next";
import { consultation, site } from "@/data/site";
import { inr } from "@/lib/format";
import { TextPage } from "@/components/layout/text-page";

export const metadata: Metadata = {
  title: "Cancellation and refunds",
  description: "Cancelling an order or a horoscope consultation, and how refunds are made.",
  alternates: { canonical: "/cancellation-and-refunds/" },
};

export default function Refunds() {
  return (
    <TextPage eyebrow="Help" title="Cancellation and refunds" updated="23 November 2026">
      <h2>Orders</h2>
      <ul>
        <li>
          You can cancel an order any time before it is dispatched by messaging us on WhatsApp. We refund you in full.
        </li>
        <li>
          After dispatch, see our <Link href="/shipping-and-returns/">shipping and returns policy</Link>.
        </li>
        <li>If an item you paid for turns out to be unavailable, we offer an alternative or refund you in full.</li>
      </ul>
      <h2>Horoscope consultations ({inr(consultation.fee)})</h2>
      <ul>
        <li>
          Your chosen time is a preference. We confirm it on WhatsApp within {consultation.confirmWithinHours} hours. If
          it is no longer free, we offer another time; if none suits you, we refund the full {inr(consultation.fee)}.
        </li>
        <li>To reschedule, message us on WhatsApp at least {consultation.rescheduleHours} hours before your slot.</li>
        <li>
          If you cancel at least {consultation.cancelHours} hours before your slot, we refund you in full. Later
          cancellations and missed calls are not refunded.
        </li>
        <li>If we need to cancel, you can choose a new time or a full refund.</li>
      </ul>
      <h2>How refunds are paid</h2>
      <p>Approved refunds are paid to the UPI ID or bank account you paid from, within 5–7 working days of approval.</p>
      <p>
        To ask for a cancellation or refund: call or WhatsApp {site.phoneDisplay} or email{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a> with your order number or payment reference.
      </p>
    </TextPage>
  );
}
