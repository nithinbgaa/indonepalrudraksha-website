"use client";

import Link from "next/link";

// Cart side panel (design: Cart.dc.html). "Place order" builds the order message, opens WhatsApp
// with it, and empties the cart. The assistant replies with a Razorpay Payment Link whose
// Reference ID is the order number.

import { useMemo, useState } from "react";
import { useCart } from "@/lib/cart";
import { mukhi, sizeLabel, type BeadSize } from "@/data/beads";
import { site } from "@/data/site";
import { inr, newOrderNumber, plural, whatsappLink } from "@/lib/format";
import { trackConversion } from "@/lib/ads";
import { Modal } from "@/components/ui/drawer";
import { Check, Close, Minus, Plus, Trash, WhatsAppIcon } from "@/components/ui/icons";

export function CartPanel() {
  const cart = useCart();
  const [placed, setPlaced] = useState<{ order: string; link: string; count: number } | null>(null);
  const [picked, setPicked] = useState("");
  const [gst, setGst] = useState(false);
  const MAX = site.maxQtyPerItem;

  const available = useMemo(() => {
    const inCart = new Set(cart.lines.map((l) => `${l.slug}:${l.size}`));
    const out: { value: string; label: string }[] = [];
    for (const b of mukhi) {
      if (!b.available || !b.prices) continue;
      for (const size of ["normal", "collector"] as BeadSize[]) {
        const k = `${b.slug}:${size}`;
        if (!inCart.has(k)) out.push({ value: k, label: `${b.short} · ${sizeLabel[size]} · ${inr(b.prices[size])}` });
      }
    }
    return out;
  }, [cart.lines]);
  const pickedVal = available.some((a) => a.value === picked) ? picked : (available[0]?.value ?? "");

  const close = () => {
    cart.close();
    setPlaced(null);
  };

  const placeOrder = () => {
    if (!cart.lines.length) return;
    const order = newOrderNumber();
    const lines = cart.lines.map(
      (l, i) => `${i + 1}. ${l.bead.title} (${sizeLabel[l.size]}) × ${l.qty} = ${inr(l.price * l.qty)}`,
    );
    const msg = [
      "Namaste! I'd like to place an order.",
      `Order no: ${order}`,
      "",
      ...lines,
      "",
      `Subtotal: ${inr(cart.total)}`,
      gst ? "GST invoice: Yes, I'll share my GSTIN." : "",
      "",
      "Please confirm availability and send me the payment details.",
      "My name and delivery address (with PIN code):",
    ]
      .filter((x, i, a) => !(x === "" && a[i - 1] === ""))
      .join("\n");
    const link = whatsappLink(msg);
    setPlaced({ order, link, count: cart.count });
    cart.clear();
    setGst(false);
    trackConversion("order", { transaction_id: order, value: cart.total, currency: "INR" });
    window.open(link, "_blank", "noopener");
  };

  return (
    <Modal open={cart.isOpen} onClose={close} label="Your cart" className="ml-auto h-dvh w-full max-w-[460px]">
      <div
        className="flex h-full flex-col border-l border-[rgba(142,195,224,0.3)] text-left shadow-[-20px_0_60px_rgba(0,0,0,0.5)]"
        style={{ background: "radial-gradient(ellipse 90% 40% at 50% 0%, #173E5E 0%, #0B1A29 70%)" }}
      >
        <div className="flex items-center justify-between gap-3 border-b border-hairline px-6 py-[22px]">
          <div className="flex flex-col">
            <span className="font-display text-[26px] text-heading">Your cart</span>
            <span className="text-sm text-muted">{placed ? "Order ready" : plural(cart.count, "item")}</span>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close cart"
            className="flex size-11 items-center justify-center rounded-full border border-edge bg-transparent text-heading"
          >
            <Close size={18} />
          </button>
        </div>

        {!placed ? (
          <>
            <div className="flex flex-1 flex-col overflow-y-auto px-6 pt-2 pb-5">
              {cart.lines.length === 0 && (
                <div className="flex flex-col items-center gap-3 px-2 pt-12 pb-6 text-center">
                  <span lang="sa" aria-hidden="true" className="font-deva text-[44px] leading-none text-line">
                    ॐ
                  </span>
                  <span className="font-display text-xl text-heading">Your cart is empty</span>
                  <span className="text-[15px] text-muted">Add a bead below, or browse the full collection.</span>
                </div>
              )}

              {cart.lines.map((l) => {
                const name = `${l.bead.title} · ${sizeLabel[l.size]}`;
                return (
                  <div
                    key={`${l.slug}:${l.size}`}
                    className="flex items-center gap-3.5 border-b border-[rgba(142,195,224,0.18)] py-4"
                  >
                    <span
                      aria-hidden="true"
                      className="flex size-14 flex-none items-center justify-center rounded-full border border-[rgba(142,195,224,0.5)] font-deva text-2xl leading-none text-chalk"
                      style={{ background: "radial-gradient(circle at 50% 42%, #1B3F60 0%, #07111B 100%)" }}
                    >
                      {l.bead.numeral}
                    </span>
                    <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                      <div className="flex flex-col">
                        <Link
                          href={`/rudraksha/${l.slug}/`}
                          onClick={close}
                          className="font-display text-lg text-heading no-underline"
                        >
                          {l.bead.title}
                        </Link>
                        <span className="text-[13px] text-muted">
                          {sizeLabel[l.size]} size · {l.bead.deity} · {inr(l.price)} each
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div
                          role="group"
                          aria-label={`Quantity of ${name}: ${l.qty}`}
                          className="flex items-center rounded-full border border-edge"
                        >
                          <button
                            type="button"
                            onClick={() => cart.setQty(l.slug, l.size, l.qty - 1)}
                            disabled={l.qty <= 1}
                            aria-label={`One fewer ${name}`}
                            className="flex h-10 w-11 items-center justify-center bg-transparent text-heading disabled:opacity-35"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="min-w-6 text-center font-display text-lg text-heading">{l.qty}</span>
                          <button
                            type="button"
                            onClick={() => cart.setQty(l.slug, l.size, l.qty + 1)}
                            disabled={l.qty >= MAX}
                            aria-label={`One more ${name}`}
                            className="flex h-10 w-11 items-center justify-center bg-transparent text-heading disabled:opacity-35"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <span className="text-[15px] text-body">{inr(l.price * l.qty)}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => cart.remove(l.slug, l.size)}
                      aria-label={`Remove ${name} from cart`}
                      className="flex size-11 flex-none items-center justify-center rounded-full border border-[rgba(142,195,224,0.3)] bg-transparent text-delete"
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                );
              })}

              {available.length > 0 && (
                <div className="flex flex-col gap-2.5 pt-5">
                  <label htmlFor="cart-add" className="text-[13px] tracking-[0.2em] text-line uppercase">
                    Add another bead
                  </label>
                  <div className="flex gap-2.5">
                    <select
                      id="cart-add"
                      value={pickedVal}
                      onChange={(e) => setPicked(e.target.value)}
                      className="min-h-[46px] min-w-0 flex-1 rounded-xl border border-[rgba(142,195,224,0.35)] bg-ground px-3 text-base text-heading"
                    >
                      {available.map((a) => (
                        <option key={a.value} value={a.value}>
                          {a.label}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => {
                        const [slug, size] = pickedVal.split(":");
                        if (slug) cart.add(slug, size as BeadSize, 1);
                        setPicked("");
                      }}
                      className="flex min-h-[46px] flex-none items-center gap-1.5 rounded-xl border border-line bg-[rgba(95,168,218,0.2)] px-[18px] text-base text-heading"
                    >
                      <Plus size={16} />
                      Add
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3.5 border-t border-hairline bg-[rgba(5,12,20,0.5)] px-6 pt-[18px] pb-6">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-muted">Subtotal · {plural(cart.count, "item")}</span>
                <span className="font-display text-2xl text-heading">{inr(cart.total)}</span>
              </div>
              <span className="text-[13px] text-muted">
                We confirm your order and the delivery charge on WhatsApp, then share our payment details to pay by UPI
                or bank transfer.
              </span>
              {cart.lines.length > 0 && (
                <label className="flex min-h-11 cursor-pointer items-center gap-3 text-[15px] text-body">
                  <input
                    type="checkbox"
                    checked={gst}
                    onChange={(e) => setGst(e.target.checked)}
                    className="size-5 flex-none accent-saffron"
                  />
                  I need a GST invoice
                </label>
              )}
              <button
                type="button"
                onClick={placeOrder}
                disabled={!cart.lines.length}
                className="flex min-h-[54px] items-center justify-center gap-2.5 rounded-full border-0 bg-saffron text-lg font-semibold text-on-saffron disabled:opacity-45"
              >
                <WhatsAppIcon size={20} />
                Place order on WhatsApp
              </button>
            </div>
          </>
        ) : (
          <div role="status" className="flex flex-1 flex-col items-center justify-center gap-3.5 px-7 py-8 text-center">
            <span
              aria-hidden="true"
              className="flex size-[68px] items-center justify-center rounded-full border border-line text-heading shadow-[0_0_24px_rgba(140,200,240,0.45)]"
            >
              <Check size={30} />
            </span>
            <span className="font-display text-[26px] text-heading">Your order is ready to send</span>
            <span className="text-sm tracking-[0.12em] text-chalk">Order no. {placed.order}</span>
            <span className="max-w-[340px] text-body">
              Send the message that opened in WhatsApp. We&apos;ll confirm your {plural(placed.count, "bead")}, delivery
              details and how to pay (UPI or bank transfer) there.
            </span>
            <a
              href={placed.link}
              data-conversion="none"
              target="_blank"
              rel="noopener"
              className="flex min-h-12 items-center gap-2 rounded-full bg-saffron px-6 font-semibold text-on-saffron no-underline hover:text-on-saffron"
            >
              <WhatsAppIcon size={18} />
              Open WhatsApp again
            </a>
            <span lang="sa" className="font-deva text-xl text-line">
              ॐ नमः शिवाय
            </span>
            <button
              type="button"
              onClick={close}
              className="min-h-12 rounded-full border border-edge bg-transparent px-6 text-base text-heading"
            >
              Continue browsing
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}
