"use client";

// Counts Call, WhatsApp and Book clicks for the private /stats/ page. One small anonymous record per click
// (time, button, page, city, came-from-a-Google-ad yes/no) goes to /api/click (worker/index.js). No cookies and
// nothing that identifies the visitor, so it runs without the cookie banner. See the privacy policy.

import { useEffect } from "react";
import { visits } from "@/data/visit";

const AD_KEY = "inr-from-ad"; // sessionStorage: this tab arrived from a Google ad

const digits = (s: string) => s.replace(/\D/g, "");
const cityFor = (number: string) => visits.find((v) => digits(v.phone) === number || v.whatsapp === number)?.slug;

function classify(a: HTMLAnchorElement): { button: string; kind: string; city: string } | null {
  const href = a.getAttribute("href") || "";
  const tagged = a.dataset.conversion;
  if (href.startsWith("tel:")) {
    const city = cityFor(digits(href)) ?? "";
    return { button: "call", kind: city ? "visit" : "main", city };
  }
  if (href.startsWith("https://wa.me/")) {
    const city = cityFor(digits(href.slice(14).split("?")[0])) ?? "";
    return { button: "whatsapp", kind: city ? "visit" : tagged && tagged !== "none" ? tagged : "chat", city };
  }
  if (/^\/consultation\/?(#.*)?$/.test(href) || /#consult$/.test(href)) {
    return { button: "book", kind: "consultation", city: "" };
  }
  return null;
}

export function ClickLog() {
  useEffect(() => {
    try {
      const q = new URLSearchParams(location.search);
      if (q.has("gclid") || q.has("gbraid") || q.has("wbraid")) sessionStorage.setItem(AD_KEY, "1");
    } catch {}

    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.<HTMLAnchorElement>("a[href]");
      if (!a) return;
      const hit = classify(a);
      if (!hit) return;
      let fromAd = false;
      try {
        fromAd = sessionStorage.getItem(AD_KEY) === "1";
      } catch {}
      const pageCity = visits.find((v) => location.pathname.startsWith(`/${v.slug}/`))?.slug ?? "";
      const body = JSON.stringify({ ...hit, city: hit.city || pageCity, page: location.pathname, fromAd });
      try {
        if (!navigator.sendBeacon?.("/api/click", body)) {
          void fetch("/api/click", { method: "POST", body, keepalive: true }).catch(() => {});
        }
      } catch {}
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}
