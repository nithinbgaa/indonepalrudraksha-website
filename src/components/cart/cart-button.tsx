"use client";

import { useCart } from "@/lib/cart";
import { Bag } from "@/components/ui/icons";
import { plural } from "@/lib/format";

export function CartButton() {
  const { count, open, ready } = useCart();
  return (
    <button
      type="button"
      onClick={open}
      aria-label={ready && count > 0 ? `Open cart, ${plural(count, "item")}` : "Open cart, empty"}
      className="relative flex size-11 items-center justify-center rounded-full border border-[rgba(142,195,224,0.35)] bg-transparent text-chalk hover:border-chalk"
    >
      <Bag size={20} strokeWidth={1.6} />
      {ready && count > 0 && (
        <span
          aria-hidden="true"
          className="absolute -top-[5px] -right-[5px] flex h-[21px] min-w-[21px] items-center justify-center rounded-[11px] bg-saffron px-[5px] text-xs font-semibold text-on-saffron shadow-[0_0_10px_rgba(227,154,76,0.6)]"
        >
          {count}
        </span>
      )}
    </button>
  );
}
