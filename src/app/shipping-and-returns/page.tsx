import type { Metadata } from "next";
import { site } from "@/data/site";
import { TextPage } from "@/components/layout/text-page";

export const metadata: Metadata = {
  title: "Shipping and returns",
  description: "How we pack and ship Rudraksha across India and abroad, delivery times and returns.",
  alternates: { canonical: "/shipping-and-returns/" },
};

export default function Shipping() {
  return (
    <TextPage eyebrow="Help" title="Shipping and returns" updated="[date]">
      <h2>How ordering works</h2>
      <p>
        When you place an order, your cart is sent to us on WhatsApp with an order number. We confirm availability and
        the delivery charge, then send a secure Razorpay payment link. Your order is dispatched once payment is
        received.
      </p>
      <h2>Shipping within India</h2>
      <ul>
        <li>Dispatch: within [X] working days of payment.</li>
        <li>Delivery: usually [X–Y] working days after dispatch, depending on your PIN code.</li>
        <li>Charges: [free / ₹X / calculated per order]. We tell you the exact amount before you pay.</li>
        <li>We share the courier name and tracking number on WhatsApp.</li>
      </ul>
      <h2>Shipping outside India</h2>
      <p>
        We ship abroad on request. Charges, delivery times and any customs duties depend on the country; we confirm them
        on WhatsApp before you pay. Customs duties and taxes in your country are [paid by you / included].
      </p>
      <h2>Every bead is packed by hand</h2>
      <p>Each Rudraksha is packed with its certificate of authenticity.</p>
      <h2>Returns</h2>
      <ul>
        <li>
          If your order arrives damaged or is not what you ordered, message us on WhatsApp within [X] days of delivery
          with photos of the item and the packaging. We will replace it or refund you in full.
        </li>
        <li>[Returns for change of mind: accepted within X days if unworn and with the certificate / not accepted.]</li>
        <li>Refunds go back to the original payment method within [5–7] working days of approval.</li>
      </ul>
      <p>
        Questions? WhatsApp {site.whatsappDisplay} or email <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </TextPage>
  );
}
