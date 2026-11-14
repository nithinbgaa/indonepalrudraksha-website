"use client";

import Link from "next/link";

// Items without a published price: optional bead-size choice, then "Ask for price" on WhatsApp.

import { useState } from "react";
import { askPriceMessage, whatsappLink } from "@/lib/format";
import { WhatsAppIcon } from "@/components/ui/icons";

export function AskPrice({ name, sizes = [], consultText }: { name: string; sizes?: string[]; consultText: string }) {
  const [size, setSize] = useState<string | null>(sizes[1] ?? sizes[0] ?? null);
  return (
    <>
      {sizes.length > 0 && (
        <div className="flex flex-col gap-2.5">
          <span id="size-label" className="text-[13px] tracking-[0.2em] text-line uppercase">
            Bead size
          </span>
          <div role="radiogroup" aria-labelledby="size-label" className="flex flex-wrap gap-2.5">
            {sizes.map((z) => {
              const on = z === size;
              return (
                <button
                  key={z}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => setSize(z)}
                  className={`min-h-12 min-w-[84px] rounded-full border px-[18px] text-base font-medium ${
                    on
                      ? "border-chalk bg-[rgba(95,168,218,0.32)] text-white shadow-[0_0_14px_rgba(140,200,240,0.35)]"
                      : "border-edge bg-[rgba(5,12,20,0.5)] text-body hover:border-chalk"
                  }`}
                >
                  {z}
                </button>
              );
            })}
          </div>
        </div>
      )}
      <div className="flex flex-col gap-3 border-t border-hairline pt-[22px]">
        <a
          href={whatsappLink(askPriceMessage(name, size))}
          target="_blank"
          rel="noopener"
          className="flex min-h-14 items-center justify-center gap-2.5 rounded-full bg-saffron text-lg font-semibold text-on-saffron no-underline shadow-[0_0_24px_rgba(120,190,235,0.25)] hover:bg-[#EBAA63] hover:text-on-saffron"
        >
          <WhatsAppIcon size={20} />
          Ask for price on WhatsApp
        </a>
        <span className="text-sm text-muted">
          We reply with today&apos;s price and availability, then send a secure Razorpay link to pay by UPI, card or
          EMI.
        </span>
        <Link
          href="/consultation/"
          className="self-start border-b border-edge py-1.5 text-[15px] text-chalk no-underline"
        >
          {consultText}
        </Link>
      </div>
    </>
  );
}
