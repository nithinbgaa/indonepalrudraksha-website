// Google Ads tag with consent. Nothing from Google loads until the visitor presses Accept in the
// cookie banner (src/components/layout/consent.tsx). Declining, or withdrawing later through
// "Cookie settings" in the footer, stops the tag and removes Google's first-party ad cookies.

import { ads } from "@/data/site";
import { readLocal, writeLocal } from "@/lib/client-store";

export const CONSENT_KEY = "inr-consent-v1"; // "granted" | "denied" | "" (not asked yet)
export const adsEnabled = ads.googleAdsId !== "";

export type ConversionKind = keyof typeof ads.conversions;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let started = false;

/** Load the Google tag if Ads is configured and the visitor has accepted. Safe to call repeatedly. */
export function startGoogleTag() {
  if (started || !adsEnabled || readLocal(CONSENT_KEY) !== "granted") return started;
  started = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js expects the `arguments` object itself, not an array
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  // Conversion measurement only: Google doesn't allow remarketing for religious and spiritual sites, so ad
  // personalisation stays off even after the visitor accepts.
  window.gtag("consent", "default", {
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "denied",
    analytics_storage: "denied",
  });
  window.gtag("js", new Date());
  window.gtag("config", ads.googleAdsId, { allow_ad_personalization_signals: false });
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ads.googleAdsId)}`;
  document.head.appendChild(s);
  return true;
}

/** Remove Google Ads' first-party cookies (_gcl_au, _gcl_aw …) from this site. */
function clearAdCookies() {
  const host = location.hostname;
  const domains = ["", host, `.${host}`, `.${host.replace(/^www\./, "")}`];
  for (const part of document.cookie.split(";")) {
    const name = part.split("=")[0].trim();
    if (!name.startsWith("_gcl")) continue;
    for (const d of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ""}`;
    }
  }
}

export function setConsent(value: "granted" | "denied" | "") {
  writeLocal(CONSENT_KEY, value);
  if (value === "granted") {
    startGoogleTag();
  } else if (value === "denied") {
    if (started && window.gtag) {
      window.gtag("consent", "update", {
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
    }
    clearAdCookies();
  }
}

/** Count a Google Ads conversion, only if the visitor accepted and the action has a label. */
export function trackConversion(kind: ConversionKind, extra?: Record<string, unknown>) {
  const label = ads.conversions[kind];
  if (!label || readLocal(CONSENT_KEY) !== "granted" || !startGoogleTag() || !window.gtag) return;
  window.gtag("event", "conversion", { send_to: `${ads.googleAdsId}/${label}`, ...extra });
}
