"use client";

// The cart lives in the visitor's browser (localStorage) and is shared by every page and tab.
// Only priced beads go in the cart. Items are keyed "<bead slug>:<size>", e.g. "5-mukhi:collector".

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useHydrated, useLocal, writeLocal } from "@/lib/client-store";
import { getBead, type Bead, type BeadSize } from "@/data/beads";
import { site } from "@/data/site";

const KEY = "inr-cart-v2";

export interface CartLine {
  slug: string;
  size: BeadSize;
  qty: number;
}
export interface CartRow extends CartLine {
  bead: Bead;
  price: number;
}

interface CartCtx {
  lines: CartRow[];
  count: number;
  total: number;
  ready: boolean;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (slug: string, size: BeadSize, qty: number) => void;
  setQty: (slug: string, size: BeadSize, qty: number) => void;
  remove: (slug: string, size: BeadSize) => void;
  clear: () => void;
}

const Ctx = createContext<CartCtx | null>(null);

function parse(raw: string): CartLine[] {
  try {
    const v = JSON.parse(raw || "[]");
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

function clean(lines: CartLine[]): CartRow[] {
  const out: CartRow[] = [];
  for (const l of lines) {
    const bead = getBead(String(l.slug));
    if (!bead || !bead.prices || !bead.available) continue;
    const size: BeadSize = l.size === "collector" ? "collector" : "normal";
    const qty = Math.max(1, Math.min(site.maxQtyPerItem, Math.round(Number(l.qty)) || 1));
    out.push({ slug: bead.slug, size, qty, bead, price: bead.prices[size] });
  }
  return out;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const raw = useLocal(KEY);
  const ready = useHydrated();
  const [isOpen, setOpen] = useState(false);
  // if storage is blocked (private mode) the cart still works for this page view
  const [memory, setMemory] = useState<CartLine[] | null>(null);

  const save = useCallback((next: CartLine[]) => {
    setMemory(next);
    writeLocal(KEY, JSON.stringify(next));
  }, []);

  const rows = useMemo(() => clean(raw ? parse(raw) : (memory ?? [])), [raw, memory]);

  const value = useMemo<CartCtx>(() => {
    const plain = rows.map(({ slug, size, qty }) => ({ slug, size, qty }));
    const same = (a: CartLine, slug: string, size: BeadSize) => a.slug === slug && a.size === size;
    return {
      lines: rows,
      ready,
      count: rows.reduce((a, r) => a + r.qty, 0),
      total: rows.reduce((a, r) => a + r.qty * r.price, 0),
      isOpen,
      open: () => setOpen(true),
      close: () => setOpen(false),
      add: (slug, size, qty) => {
        const found = plain.find((x) => same(x, slug, size));
        save(
          found
            ? plain.map((x) => (same(x, slug, size) ? { ...x, qty: Math.min(site.maxQtyPerItem, x.qty + qty) } : x))
            : [...plain, { slug, size, qty }],
        );
      },
      setQty: (slug, size, qty) =>
        save(
          plain.map((x) => (same(x, slug, size) ? { ...x, qty: Math.max(1, Math.min(site.maxQtyPerItem, qty)) } : x)),
        ),
      remove: (slug, size) => save(plain.filter((x) => !same(x, slug, size))),
      clear: () => save([]),
    };
  }, [rows, ready, isOpen, save]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}
