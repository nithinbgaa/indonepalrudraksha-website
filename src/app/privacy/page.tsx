import type { Metadata } from "next";
import { ads, site } from "@/data/site";
import { TextPage } from "@/components/layout/text-page";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `How ${site.name} collects, uses and protects your personal data, our use of Google Ads cookies, and your rights.`,
  alternates: { canonical: "/privacy/" },
};

const ext = { target: "_blank", rel: "noopener" } as const;
const adsOn = ads.googleAdsId !== "";

export default function Privacy() {
  const { legal, grievanceOfficer: go } = site;
  return (
    <TextPage eyebrow="Legal" title="Privacy policy" updated="24 November 2026">
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
          send these to us on WhatsApp.
        </li>
        <li>
          <strong>Payments:</strong> you pay by UPI or bank transfer to our business account. We see your name, UPI ID
          or account name, the amount and the transaction reference, as your bank shows them. We never ask for your card
          number, PIN or OTP.
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
      {adsOn ? (
        <>
          <p>
            We advertise on Google. When you first visit, a banner asks whether you accept advertising cookies. Nothing
            from Google is loaded until you press <strong>Accept</strong>; if you press <strong>Decline</strong>, no
            advertising cookies are set.
          </p>
          <p>If you accept:</p>
          <ul>
            <li>
              Where permitted, we use the Google Ads tag only to measure whether a visit from one of our ads led to a
              call, a WhatsApp order, a price enquiry or a consultation booking (&ldquo;conversion measurement&rdquo;).
            </li>
            <li>
              We have turned off ad personalisation in the tag. We do not build lists of visitors and do not use your
              visit to this website to personalise the ads you see.
            </li>
            <li>
              Google receives information such as your IP address, browser and device details, the page you arrived on
              and a cookie identifier. Google&apos;s use of this data is governed by the{" "}
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
            <strong>How to change your choice:</strong> use <strong>Cookie settings</strong> at the bottom of any page
            (declining removes our Google Ads cookies from this site). You can also manage ads in{" "}
            <a href="https://adssettings.google.com/" {...ext}>
              Google&apos;s Ads Settings
            </a>{" "}
            or block cookies in your browser settings.
          </p>
        </>
      ) : (
        <p>
          This website currently sets no advertising or analytics cookies and loads no Google or Meta tracking tags.
          Your cart and preferred consultation slot are kept only in your own browser. If we start measuring our ads, a
          banner will ask for your consent first, nothing will load before you accept, and this section will be updated.
          The <strong>Cookie settings</strong> link at the bottom of every page brings you here.
        </p>
      )}

      <h2>Why we use your data</h2>
      <p>
        To answer your questions, confirm and deliver your order, issue invoices, arrange and hold your consultation,
        process refunds, meet legal and tax duties, and (only with your consent) measure how well our advertising works.
        Birth details are used only to prepare your reading. We process your data on the basis of your consent, which
        you give by contacting us, placing an order, booking or accepting cookies, and for legitimate uses the law
        allows, such as tax records.
      </p>

      <h2>Who we share it with</h2>
      <p>
        Our bank (payments), our courier partners (name, address and phone, for delivery), Meta&apos;s WhatsApp
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
        The website is served only over an encrypted connection (HTTPS). Payments go directly to our business bank
        account. Only the people who handle your order or consultation can see your details.
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
