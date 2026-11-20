import type { Metadata } from "next";
import { site } from "@/data/site";
import { TextPage } from "@/components/layout/text-page";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `How ${site.name} collects, uses and protects your personal data, our use of Google Ads cookies, and your rights.`,
  alternates: { canonical: "/privacy/" },
};

const ext = { target: "_blank", rel: "noopener" } as const;

export default function Privacy() {
  const { legal, grievanceOfficer: go } = site;
  return (
    <TextPage eyebrow="Legal" title="Privacy policy" updated="20 November 2026">
      <p>
        This policy explains what personal data {site.name} collects through {site.url.replace("https://", "")}, on
        WhatsApp and by email, why we collect it, who we share it with, and your rights under India&apos;s Digital
        Personal Data Protection Act, 2023.
      </p>

      <h2>Who we are</h2>
      <p>
        {site.name} ({legal.tradeName}) is a {legal.type} of {legal.name}, GSTIN {legal.gstin}, registered at{" "}
        {legal.registeredOffice.join(", ")}, with a place of business at {site.address.join(", ")}. We decide how your
        personal data is used (we are the &ldquo;data fiduciary&rdquo;). Contact: {site.email} · WhatsApp{" "}
        {site.whatsappDisplay}.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Orders and price enquiries:</strong> your name, phone number, delivery address and, if you ask for a
          GST invoice, your GSTIN. You share these with us on WhatsApp.
        </li>
        <li>
          <strong>Consultations:</strong> your name, phone number, email, and your date, time and place of birth. You
          enter these in the Razorpay payment form or send them to us on WhatsApp.
        </li>
        <li>
          <strong>Payments:</strong> handled by Razorpay. We receive the payment status, amount and payment ID, never
          your full card or bank details.
        </li>
        <li>
          <strong>This website:</strong> your cart and your cookie choice are kept only in your own browser (local
          storage); they are not sent to us. Our hosting provider, Cloudflare, processes technical data such as your IP
          address to deliver the site and protect it from attacks.
        </li>
        <li>
          <strong>Advertising cookies, only if you accept:</strong> see the next section.
        </li>
      </ul>

      <h2 id="cookies" className="scroll-mt-24">
        Cookies and Google Ads
      </h2>
      <p>
        We advertise on Google. When you first visit, a banner asks whether you accept advertising cookies. Nothing from
        Google is loaded until you press <strong>Accept</strong>; if you press <strong>Decline</strong>, no advertising
        cookies are set.
      </p>
      <p>If you accept:</p>
      <ul>
        <li>
          We use the Google Ads tag to measure whether a visit from one of our ads led to a WhatsApp order, a price
          enquiry or a consultation booking (&ldquo;conversion tracking&rdquo;), and to build lists of past visitors so
          we can show them our ads again (&ldquo;remarketing&rdquo;).
        </li>
        <li>Third-party vendors, including Google, show our ads on sites across the internet.</li>
        <li>
          Third-party vendors, including Google, use cookies and similar identifiers to show ads based on your past
          visits to this website.
        </li>
        <li>
          Google receives information such as your IP address, browser and device details, the pages you visit here and
          cookie identifiers. Google&apos;s use of this data is governed by the{" "}
          <a href="https://policies.google.com/privacy" {...ext}>
            Google Privacy Policy
          </a>
          ; see also{" "}
          <a href="https://policies.google.com/technologies/partner-sites" {...ext}>
            how Google uses information from sites that use its services
          </a>
          .
        </li>
      </ul>
      <p>
        <strong>How to opt out:</strong> use <strong>Cookie settings</strong> at the bottom of any page to change your
        choice at any time (declining removes our Google Ads cookies from this site). You can also turn off personalised
        ads in{" "}
        <a href="https://adssettings.google.com/" {...ext}>
          Google&apos;s Ads Settings
        </a>
        , opt out of other vendors&apos; cookies at the{" "}
        <a href="https://optout.networkadvertising.org/" {...ext}>
          Network Advertising Initiative opt-out page
        </a>
        , or block cookies in your browser settings.
      </p>

      <h2>Why we use your data</h2>
      <p>
        To answer your questions, confirm and deliver your order, issue invoices, arrange and hold your consultation,
        process refunds, meet legal and tax duties, and (only with your consent) measure and improve our advertising.
        Birth details are used only to prepare your reading. We process your data on the basis of your consent, which
        you give by contacting us, placing an order, booking or accepting cookies, and for legitimate uses the law
        allows, such as tax records.
      </p>

      <h2>Who we share it with</h2>
      <p>
        Razorpay (payments), our courier partners (name, address and phone, for delivery), Meta&apos;s WhatsApp
        (messaging), Google Workspace (email), Google Ads (only if you accept cookies), Cloudflare (website hosting),
        and authorities where the law requires. Some of these companies may process data outside India. We do not sell
        your data.
      </p>

      <h2>How long we keep it</h2>
      <ul>
        <li>Order and invoice records: as long as tax and accounting law requires (currently up to 8 years).</li>
        <li>
          Consultation details, including birth details: 12 months after your call, unless you ask us to delete them
          sooner.
        </li>
        <li>WhatsApp chats that are not linked to an order or booking: deleted when no longer needed.</li>
        <li>
          Your cookie choice stays in your browser until you change it or clear your browser data. Google&apos;s cookies
          expire on the schedule Google sets.
        </li>
      </ul>

      <h2>Your rights</h2>
      <p>Under the Digital Personal Data Protection Act, 2023, you can:</p>
      <ul>
        <li>ask for a summary of the personal data we hold about you and who we have shared it with;</li>
        <li>ask us to correct, complete, update or delete your data;</li>
        <li>withdraw your consent at any time (this does not affect what we did before you withdrew it);</li>
        <li>nominate someone to exercise these rights if you die or become unable to;</li>
        <li>
          have your complaint heard by our grievance officer, and then, if unresolved, by the Data Protection Board of
          India.
        </li>
      </ul>
      <p>
        To use any of these rights, write to {site.email} or WhatsApp {site.whatsappDisplay}. We may ask you to confirm
        your identity first.
      </p>

      <h2>Children</h2>
      <p>
        Our shop and consultations are meant for adults. If a consultation is for someone under 18, a parent or guardian
        should book it and share the details. We do not knowingly target advertising at children.
      </p>

      <h2>Keeping your data safe</h2>
      <p>
        The website is served only over an encrypted connection (HTTPS). Payments go through Razorpay&apos;s secure
        checkout. Only the people who handle your order or consultation can see your details.
      </p>

      <h2>Grievance officer</h2>
      <p>
        {go.name}, {go.designation}, {site.name}. Email: <a href={`mailto:${site.email}`}>{site.email}</a>. Address:{" "}
        {legal.registeredOffice.join(", ")}. We acknowledge complaints within 48 hours and resolve them within one
        month.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If we change how we use your data, we will update this page and the date at the top. If you accepted cookies and
        the change matters, we will ask again.
      </p>
    </TextPage>
  );
}
