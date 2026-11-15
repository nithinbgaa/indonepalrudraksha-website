"use client";

import Link from "next/link";
import { useLocal } from "@/lib/client-store";
import { consultation, site } from "@/data/site";
import { whatsappLink } from "@/lib/format";
import { CONSULT_KEY, type ChosenSlot } from "@/lib/slots";
import { bookingMessage } from "@/components/home/booking";
import { Check, WhatsAppIcon } from "@/components/ui/icons";

export function ThankYou() {
  const raw = useLocal(CONSULT_KEY);
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
        Thank you — payment received
      </h1>
      {chosen && <span className="text-lg text-chalk">Preferred slot: {chosen.label}</span>}
      <p className="m-0 text-body">
        We will confirm your slot with {site.founder.name} on WhatsApp within {consultation.confirmWithinHours} hours.
        If that time has just been taken, we will offer you another time or a full refund. Keep your birth details handy
        for the call.
      </p>
      <a
        href={whatsappLink(bookingMessage(chosen, true))}
        target="_blank"
        rel="noopener"
        className="mt-2 flex min-h-[52px] items-center gap-2.5 rounded-full bg-saffron px-7 text-[17px] font-semibold text-on-saffron no-underline hover:text-on-saffron"
      >
        <WhatsAppIcon size={20} />
        Send booking on WhatsApp
      </a>
      <span className="text-sm text-muted">
        Sending it helps us confirm faster. Include the payment ID from your receipt.
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
