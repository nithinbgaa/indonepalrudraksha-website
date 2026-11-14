"use client";

import Link from "next/link";

import { useMemo, useState } from "react";
import { beads } from "@/data/beads";
import { bracelets, itemHref, malas } from "@/data/malas";
import { Modal } from "@/components/ui/drawer";
import { ArrowRight, Close, Search } from "@/components/ui/icons";

const INDEX = [
  ...beads.map((b) => ({
    href: `/rudraksha/${b.slug}/`,
    title: b.title,
    sub: `${b.deity} · ${b.purpose}`,
    extra: `${b.hi} ${b.planet ?? ""}`,
  })),
  ...[...malas, ...bracelets].map((m) => ({
    href: itemHref(m),
    title: m.title,
    sub: m.line,
    extra: `${m.sub ?? ""} ${m.material} ${m.form}`,
  })),
  {
    href: "/consultation/",
    title: "Horoscope consultation",
    sub: "Book a 30-minute call",
    extra: "astrology chart booking",
  },
  { href: "/how-to-wear/", title: "How to wear Rudraksha", sub: "Cleansing, mantra and wearing", extra: "guide" },
  { href: "/shipping-and-returns/", title: "Shipping and returns", sub: "Delivery across India", extra: "delivery" },
  { href: "/contact/", title: "Contact us", sub: "WhatsApp, email and address", extra: "phone" },
];

export function SearchButton() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.length) return INDEX.slice(0, 8);
    return INDEX.filter((r) => {
      const hay = `${r.title} ${r.sub} ${r.extra}`.toLowerCase();
      return words.every((w) => hay.includes(w));
    }).slice(0, 12);
  }, [q]);

  return (
    <>
      <button
        type="button"
        aria-label="Search"
        onClick={() => setOpen(true)}
        className="flex size-11 items-center justify-center rounded-full border border-[rgba(142,195,224,0.35)] bg-transparent text-chalk hover:border-chalk"
      >
        <Search size={20} />
      </button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        label="Search"
        className="mx-auto mt-[8vh] w-[min(640px,calc(100%-32px))]"
      >
        <div className="flex max-h-[80vh] flex-col overflow-hidden rounded-[22px] border border-[rgba(142,195,224,0.3)] bg-ground shadow-[0_0_60px_rgba(95,168,218,0.15)]">
          <div className="flex items-center gap-3 border-b border-hairline px-5 py-3">
            <Search size={20} className="flex-none text-line" />
            <input
              autoFocus
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search beads, malas, deities…"
              aria-label="Search the shop"
              className="min-h-11 min-w-0 flex-1 bg-transparent text-lg text-heading outline-none placeholder:text-dim"
            />
            <button
              type="button"
              aria-label="Close search"
              onClick={() => setOpen(false)}
              className="flex size-11 flex-none items-center justify-center rounded-full border border-edge bg-transparent text-heading"
            >
              <Close size={18} />
            </button>
          </div>
          <ul className="m-0 list-none overflow-y-auto p-2">
            {results.map((r) => (
              <li key={r.href}>
                <Link
                  href={r.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-14 items-center justify-between gap-3 rounded-xl px-3 py-2 no-underline hover:bg-[rgba(95,168,218,0.14)]"
                >
                  <span className="flex flex-col">
                    <span className="font-display text-lg text-heading">{r.title}</span>
                    <span className="text-sm text-muted">{r.sub}</span>
                  </span>
                  <ArrowRight size={16} className="flex-none text-line" />
                </Link>
              </li>
            ))}
            {results.length === 0 && (
              <li className="px-3 py-6 text-center text-muted">Nothing found. Try “5 mukhi” or “Shiva”.</li>
            )}
          </ul>
        </div>
      </Modal>
    </>
  );
}
