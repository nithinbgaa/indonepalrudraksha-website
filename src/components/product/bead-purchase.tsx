"use client";

import Link from "next/link";

// Size, quantity and "Add to cart" for a priced bead. A link with ?size=collector preselects Collector.

import { useRef, useState } from "react";
import { MobileBar, useBelowFold } from "./mobile-bar";
import { ProductNote } from "./parts";
import { useSearch } from "@/lib/client-store";
import { getBead, sizeLabel, sizeNote, type BeadSize } from "@/data/beads";
import { site } from "@/data/site";
import { useCart } from "@/lib/cart";
import { inr, plural } from "@/lib/format";
import { Bag, Check, Minus, Plus } from "@/components/ui/icons";

export function BeadPurchase({ slug, children }: { slug: string; children?: React.ReactNode }) {
  const bead = getBead(slug)!;
  const prices = bead.prices!;
  const cart = useCart();
  const search = useSearch();
  const [chosen, setSize] = useState<BeadSize | null>(null);
  const size: BeadSize = chosen ?? (new URLSearchParams(search).get("size") === "collector" ? "collector" : "normal");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState<{ qty: number; size: BeadSize } | null>(null);
  const MAX = site.maxQtyPerItem;

  const price = prices[size];
  const mainButton = useRef<HTMLButtonElement>(null);
  const barVisible = useBelowFold(mainButton);
  const addToCart = () => {
    cart.add(bead.slug, size, qty);
    setAdded({ qty, size });
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="font-display text-[30px] text-heading">{inr(price)}</span>
          <span className="text-sm text-muted">
            per bead · {sizeLabel[size].toLowerCase()} size{bead.certificate ? " · certificate included" : ""}
          </span>
        </div>
        <ProductNote />
      </div>

      <p className="m-0 text-pretty text-body">{bead.about}</p>

      <div className="flex flex-col gap-2.5">
        <span id="size-label" className="text-[13px] tracking-[0.2em] text-line uppercase">
          Bead size
        </span>
        <div role="radiogroup" aria-labelledby="size-label" className="grid grid-cols-2 gap-2.5 sm:max-w-[440px]">
          {(["normal", "collector"] as BeadSize[]).map((z) => {
            const on = z === size;
            return (
              <button
                key={z}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => {
                  setSize(z);
                  setAdded(null);
                }}
                className={`flex min-h-[60px] flex-col items-start justify-center rounded-2xl border px-4 py-2 text-left ${
                  on
                    ? "border-chalk bg-[rgba(95,168,218,0.32)] text-white shadow-[0_0_14px_rgba(140,200,240,0.35)]"
                    : "border-edge bg-[rgba(5,12,20,0.5)] text-body hover:border-chalk"
                }`}
              >
                <span className="flex w-full flex-wrap items-baseline justify-between gap-x-2">
                  <span className="text-base font-medium">{sizeLabel[z]}</span>
                  <span className="font-display text-[17px]">{inr(prices[z])}</span>
                </span>
                <span className={`text-[13px] ${on ? "text-chalk" : "text-muted"}`}>{sizeNote[z]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {children}

      {/* quantity */}
      <div className="flex flex-col gap-3 border-t border-hairline pt-[22px]">
        <span id="qty-label" className="text-[13px] tracking-[0.2em] text-line uppercase">
          Number of beads
        </span>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
          <div
            role="group"
            aria-labelledby="qty-label"
            className="flex items-center rounded-full border border-edge bg-[rgba(5,12,20,0.55)] p-1"
          >
            <button
              type="button"
              aria-label="One fewer bead"
              disabled={qty <= 1}
              onClick={() => {
                setQty(qty - 1);
                setAdded(null);
              }}
              className="flex size-12 items-center justify-center rounded-full border-0 bg-transparent text-heading disabled:opacity-35"
            >
              <Minus size={18} />
            </button>
            <output aria-live="polite" className="min-w-12 text-center font-display text-2xl text-heading">
              {qty}
            </output>
            <button
              type="button"
              aria-label="One more bead"
              disabled={qty >= MAX}
              onClick={() => {
                setQty(qty + 1);
                setAdded(null);
              }}
              className="flex size-12 items-center justify-center rounded-full border-0 bg-transparent text-heading disabled:opacity-35"
            >
              <Plus size={18} />
            </button>
          </div>
          <span className="text-[15px] text-muted">
            {plural(qty, "bead")} · {inr(price)} each · up to {MAX} per order
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button
          ref={mainButton}
          type="button"
          onClick={addToCart}
          className="flex min-h-14 items-center justify-center gap-2.5 rounded-full border-0 bg-saffron text-lg font-semibold text-on-saffron shadow-[0_0_24px_rgba(120,190,235,0.25)] hover:bg-[#EBAA63]"
        >
          <Bag size={20} />
          Add {qty} to cart · {inr(price * qty)}
        </button>
        {added && (
          <div
            role="status"
            className="flex flex-wrap items-center gap-2.5 rounded-[14px] border border-[rgba(142,195,224,0.35)] bg-[rgba(95,168,218,0.15)] px-4 py-3 text-[15px] text-heading"
          >
            <Check size={18} className="flex-none text-chalk" />
            <span className="flex-1">
              Added {added.qty} × {bead.title} ({sizeLabel[added.size]}) to your cart.
            </span>
            <button
              type="button"
              onClick={cart.open}
              className="min-h-11 rounded-full border border-edge bg-transparent px-4 text-[15px] text-chalk"
            >
              View cart
            </button>
          </div>
        )}
        <Link
          href="/consultation/"
          className="inline-flex min-h-11 items-center self-start border-b border-edge text-[15px] text-chalk no-underline"
        >
          Not sure this is your bead? Book a horoscope consultation
        </Link>
      </div>
      <MobileBar show={barVisible}>
        <span className="flex min-w-0 flex-col leading-tight">
          <span className="font-display text-xl text-heading">{inr(price * qty)}</span>
          <span className="truncate text-[13px] text-muted">
            {qty} × {bead.short} · {sizeLabel[size]}
          </span>
        </span>
        <button
          type="button"
          onClick={addToCart}
          className="flex min-h-12 flex-none items-center gap-2 rounded-full border-0 bg-saffron px-5 text-base font-semibold text-on-saffron"
        >
          {added ? <Check size={18} /> : <Bag size={18} />}
          {added ? "Added" : "Add to cart"}
        </button>
      </MobileBar>
    </>
  );
}
