"use client";

// Phones and tablets: the ☰ button in the header opens a panel with every page link, search,
// and the two main actions. Hidden from 1280px up, where the links sit in the header itself.

import Link from "next/link";
import { useState } from "react";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/format";
import { Modal } from "@/components/ui/drawer";
import { ChevronRight, Close, PhoneIcon, WhatsAppIcon } from "@/components/ui/icons";
import { SearchButton } from "./search";

export interface NavItem {
  href: string;
  label: string;
}

export function MenuButton({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="flex size-11 flex-none items-center justify-center rounded-full border border-[rgba(142,195,224,0.35)] bg-transparent text-chalk hover:border-chalk xl:hidden"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
        >
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>

      <Modal open={open} onClose={close} label="Menu" className="ml-auto h-dvh w-full max-w-[420px]">
        <div
          className="flex h-full flex-col overflow-y-auto border-l border-[rgba(142,195,224,0.3)] shadow-[-20px_0_60px_rgba(0,0,0,0.5)]"
          style={{ background: "radial-gradient(ellipse 90% 40% at 50% 0%, #173E5E 0%, #0B1A29 70%)" }}
        >
          <div className="flex items-center justify-between gap-3 border-b border-hairline px-5 py-4">
            <span className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex size-10 items-center justify-center rounded-full border border-edge font-deva text-xl leading-none text-chalk"
              >
                ॐ
              </span>
              <span className="font-display text-xl text-heading">Menu</span>
            </span>
            <button
              type="button"
              onClick={close}
              aria-label="Close menu"
              className="flex size-11 items-center justify-center rounded-full border border-edge bg-transparent text-heading"
            >
              <Close size={18} />
            </button>
          </div>

          <div className="px-5 pt-5">
            <SearchButton variant="row" onNavigate={close} />
          </div>

          <nav aria-label="Menu" className="flex flex-col px-5 pt-3">
            <Link
              href="/"
              onClick={close}
              className="flex min-h-14 items-center justify-between border-b border-[rgba(142,195,224,0.16)] font-display text-[22px] text-heading no-underline hover:text-white"
            >
              Home
              <ChevronRight size={18} className="text-line" />
            </Link>
            {items.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={close}
                className="flex min-h-14 items-center justify-between border-b border-[rgba(142,195,224,0.16)] font-display text-[22px] text-heading no-underline hover:text-white"
              >
                {n.label}
                <ChevronRight size={18} className="text-line" />
              </Link>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-3 px-5 pt-8 pb-[max(24px,env(safe-area-inset-bottom))]">
            <Link
              href="/consultation/"
              onClick={close}
              className="flex min-h-[52px] items-center justify-center rounded-full bg-saffron text-[17px] font-semibold text-on-saffron no-underline hover:text-on-saffron"
            >
              Book a horoscope consultation
            </Link>
            <a
              href={whatsappLink("Namaste! I have a question.")}
              target="_blank"
              rel="noopener"
              className="flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-edge text-[17px] text-heading no-underline hover:border-chalk"
            >
              <WhatsAppIcon size={18} />
              WhatsApp {site.whatsappDisplay}
            </a>
            <a
              href={`tel:${site.phone}`}
              className="flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-edge text-[17px] text-heading no-underline hover:border-chalk"
            >
              <PhoneIcon size={18} />
              Call {site.phoneDisplay}
            </a>
            <span lang="sa" className="pt-2 text-center font-deva text-lg text-line">
              ॐ नमः शिवाय
            </span>
          </div>
        </div>
      </Modal>
    </>
  );
}
