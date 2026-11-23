"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useLocal } from "@/lib/client-store";
import { CONSENT_KEY, trackConversion } from "@/lib/ads";
import { consultation, site } from "@/data/site";
import { whatsappLink } from "@/lib/format";
import { CONSULT_KEY, type ChosenSlot } from "@/lib/slots";
import { bookingMessage } from "@/components/home/booking";
import { Check, WhatsAppIcon } from "@/components/ui/icons";

export function ThankYou() {
  const raw = useLocal(CONSULT_KEY);
  const consent = useLocal(CONSENT_KEY);

  // Count the paid consultation for Google Ads once per payment (only if the visitor accepted cookies).
  const paidOnline = consultation.razorpayButtonId !== "";
  useEffect(() => {
    if (!paidOnline || consent !== "granted") return;
    const id = new URLSearchParams(window.location.search).get("razorpay_payment_id") ?? "";
    const key = `inr-consult-paid:${id}`;
    try {
      if (window.sessionStorage.getItem(key)) return;
      window.sessionStorage.setItem(key, "1");
    } catch {}
    trackConversion("consultPaid", { value: consultation.fee, currency: "INR", ...(id ? { transaction_id: id } : {}) });
  }, [consent, paidOnline]);
  let chosen: ChosenSlot | null = null;
  try {
    const v = JSON.parse(raw || "null");
    if (v && v.label) chosen = v;
  } catch {}

  return (
    <div role="status" className="mx-auto flex max-w-[620px] flex-col items-center gap-4 px-6 py-24 text-center">
      <span
        aria-hidden="true"
        className="flex size-16 items-center justify-center rounded-full border border-line text-heading shadow-[0_0_24px_rgba(140,200,240,0.45)]"
      >
        <Check size={28} />
      </span>
      <h1 className="glow-heading m-0 font-display text-[clamp(30px,4vw,44px)] leading-[1.15] font-normal text-heading">
        {paidOnline ? "Thank you — payment received" : "Thank you"}
      </h1>
      {chosen && <span className="text-lg text-chalk">Preferred slot: {chosen.label}</span>}
      <p className="m-0 text-body">
        We will confirm your slot with {site.founder.name} on WhatsApp within {consultation.confirmWithinHours} hours
        {paidOnline
          ? ". If that time has just been taken, we will offer you another time or a full refund."
          : " and share our payment details to pay by UPI or bank transfer."}{" "}
        Keep your birth details handy for the call.
      </p>
      <a
        href={whatsappLink(bookingMessage(chosen, true))}
        data-conversion="none"
        target="_blank"
        rel="noopener"
        className="mt-2 flex min-h-[52px] items-center gap-2.5 rounded-full bg-saffron px-7 text-[17px] font-semibold text-on-saffron no-underline hover:text-on-saffron"
      >
        <WhatsAppIcon size={20} />
        Send booking on WhatsApp
      </a>
      <span className="text-sm text-muted">
        {paidOnline
          ? "Sending it helps us confirm faster. Include the payment ID from your receipt."
          : "Sending it helps us confirm faster."}
      </span>
      <span lang="sa" className="font-deva text-xl text-line">
        ॐ नमः शिवाय
      </span>
      <Link href="/" className="inline-flex min-h-11 items-center text-line">
        Back to the shop
      </Link>
    </div>
  );
}
