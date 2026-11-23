"use client";

// Cookie banner for Google Ads (only when `ads.googleAdsId` is set in src/data/site.ts).
// Accept loads the Google tag; Decline loads nothing. Both buttons are the same size and equally
// easy to press. "Cookie settings" in the footer brings the banner back so a visitor can change
// their mind. WhatsApp link clicks are counted as conversions once the visitor has accepted.

import { useEffect } from "react";
import Link from "next/link";
import { ads } from "@/data/site";
import { CONSENT_KEY, adsEnabled, setConsent, startGoogleTag, trackConversion, type ConversionKind } from "@/lib/ads";
import { useHydrated, useLocal } from "@/lib/client-store";

const isKind = (k: string | undefined): k is ConversionKind => !!k && k in ads.conversions;

export function ConsentManager() {
  const consent = useLocal(CONSENT_KEY);
  const hydrated = useHydrated();

  useEffect(() => {
    if (consent === "granted") startGoogleTag();
  }, [consent]);

  // Count WhatsApp chats started from the site. Links can say which action they are with
  // data-conversion="askPrice" (or "none" to skip); anything else counts as "whatsapp".
  useEffect(() => {
    if (!adsEnabled) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.<HTMLAnchorElement>('a[href^="https://wa.me/"]');
      if (!a || a.dataset.conversion === "none") return;
      trackConversion(isKind(a.dataset.conversion) ? a.dataset.conversion : "whatsapp");
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  if (!adsEnabled || !hydrated || consent !== "") return null;

  const btn = "flex min-h-12 flex-1 items-center justify-center rounded-full px-5 text-base font-semibold sm:flex-none";
  return (
    <section
      aria-label="Cookie choice"
      className="fixed inset-x-3 bottom-[max(12px,env(safe-area-inset-bottom))] z-50 mx-auto max-w-[760px] rounded-[22px] border border-edge bg-[rgba(8,19,32,0.97)] p-5 shadow-[0_12px_40px_rgba(0,0,0,0.6)] backdrop-blur-md sm:flex sm:items-center sm:gap-6"
    >
      <p className="m-0 text-[15px] leading-normal text-body">
        We use a Google Ads cookie to measure which of our ads bring you here. It is only set if you accept, and we
        never use it to personalise ads.{" "}
        <Link href="/privacy/#cookies" className="text-chalk underline underline-offset-2">
          Privacy policy
        </Link>
      </p>
      <div className="mt-4 flex flex-none gap-3 sm:mt-0">
        <button
          type="button"
          onClick={() => setConsent("denied")}
          className={`${btn} border border-chalk bg-transparent text-heading`}
        >
          Decline
        </button>
        <button
          type="button"
          onClick={() => setConsent("granted")}
          className={`${btn} border border-saffron bg-saffron text-on-saffron`}
        >
          Accept
        </button>
      </div>
    </section>
  );
}

/** Footer "Cookie settings": reopens the cookie banner, or (while no Google tag is set up, so there are no
 *  cookies to choose) links to the privacy policy's cookie section. */
export function CookieSettingsButton({ className }: { className?: string }) {
  const hydrated = useHydrated();
  if (!adsEnabled || !hydrated) {
    return (
      <Link href="/privacy/#cookies" className={className}>
        Cookie settings
      </Link>
    );
  }
  return (
    <button type="button" onClick={() => setConsent("")} className={className}>
      Cookie settings
    </button>
  );
}
