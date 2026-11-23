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
    <TextPage eyebrow="Help" title="Shipping and returns" updated="23 November 2026">
      <h2>How ordering works</h2>
      <p>
        When you place an order, your cart is sent to us on WhatsApp with an order number. We confirm availability and
        the delivery charge, then share our payment details so you can pay by UPI or bank transfer. Your order is
        dispatched once payment is received. We do not offer cash on delivery.
      </p>
      <h2>Shipping within India</h2>
      <ul>
        <li>Dispatch: within 2 working days of payment.</li>
        <li>Delivery: usually 3–7 working days after dispatch, depending on your PIN code.</li>
        <li>
          Charges: calculated for your order and PIN code. We tell you the exact amount on WhatsApp before you pay.
        </li>
        <li>We share the courier name and tracking number on WhatsApp.</li>
      </ul>
      <h2>Shipping outside India</h2>
      <p>
        We ship abroad on request. Charges, delivery times and any customs duties depend on the country; we confirm them
        on WhatsApp before you pay. Customs duties and taxes in your country are paid by you.
      </p>
      <h2>Every bead is packed by hand</h2>
      <p>Each Rudraksha is examined, its mukhi counted, and packed carefully so it reaches you safely.</p>
      <h2>Returns</h2>
      <ul>
        <li>
          If your order arrives damaged or is not what you ordered, message us on WhatsApp within 48 hours of delivery
          with photos (or an unboxing video) of the item and the packaging. We will replace it or refund you in full.
        </li>
        <li>
          Because Rudraksha and malas are natural, sacred items, we do not accept returns for a change of mind. Please
          ask us any questions before you order.
        </li>
        <li>Approved refunds are paid to the UPI ID or bank account you paid from within 5–7 working days.</li>
      </ul>
      <p>
        Questions? Call or WhatsApp {site.phoneDisplay} or email <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </TextPage>
  );
}
