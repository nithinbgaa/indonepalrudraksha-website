"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "@/components/ui/icons";

/** Scroll position of a horizontal rail: p = 0..1 progress, w = visible fraction. */
export function useRail<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [state, setState] = useState({ p: 0, w: 0.33 });

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setState({ p: max > 0 ? el.scrollLeft / max : 0, w: el.scrollWidth > 0 ? el.clientWidth / el.scrollWidth : 1 });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const on = () => {
      if (!raf)
        raf = requestAnimationFrame(() => {
          raf = 0;
          measure();
        });
    };
    measure();
    el.addEventListener("scroll", on, { passive: true });
    const ro = new ResizeObserver(on);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", on);
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [measure]);

  const by = (dir: number, min = 240) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * Math.max(min, el.clientWidth * 0.85), behavior: "smooth" });
  };
  const to = (selector: string) => {
    const el = ref.current;
    const card = el?.querySelector<HTMLElement>(selector);
    if (el && card) el.scrollTo({ left: card.offsetLeft - el.offsetLeft - 2, behavior: "smooth" });
  };
  const reset = () => ref.current?.scrollTo({ left: 0 });

  return { ref, ...state, by, to, reset, measure };
}

export function ArrowButtons({
  onPrev,
  onNext,
  prevOff = false,
  nextOff = false,
  label,
}: {
  onPrev: () => void;
  onNext: () => void;
  prevOff?: boolean;
  nextOff?: boolean;
  label: string;
}) {
  const cls =
    "flex size-12 items-center justify-center rounded-full border border-edge bg-[rgba(5,12,20,0.5)] text-heading transition-opacity hover:border-chalk";
  return (
    <div className="flex gap-2.5">
      <button
        type="button"
        aria-label={`Previous ${label}`}
        onClick={onPrev}
        className={cls}
        style={{ opacity: prevOff ? 0.4 : 1 }}
      >
        <ChevronLeft size={18} />
      </button>
      <button
        type="button"
        aria-label={`Next ${label}`}
        onClick={onNext}
        className={cls}
        style={{ opacity: nextOff ? 0.4 : 1 }}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}

export function Segmented<K extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: K;
  options: { key: K; label: string }[];
  onChange: (k: K) => void;
}) {
  return (
    <div role="group" aria-label={label} className="flex rounded-full border border-edge bg-[rgba(5,12,20,0.55)] p-1">
      {options.map((o) => {
        const on = o.key === value;
        return (
          <button
            key={o.key}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(o.key)}
            className={`min-h-11 rounded-full border-0 px-5 text-[15px] font-medium ${on ? "bg-[rgba(95,168,218,0.32)] text-white shadow-[0_0_14px_rgba(140,200,240,0.35)]" : "bg-transparent text-body"}`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export function ProgressBar({ p, w }: { p: number; w: number }) {
  const ww = Math.max(0.08, Math.min(1, w));
  return (
    <div aria-hidden="true" className="relative h-0.5 overflow-hidden rounded-sm bg-[rgba(142,195,224,0.18)]">
      <div
        className="absolute inset-y-0 rounded-sm bg-line shadow-[0_0_10px_rgba(140,200,240,0.6)]"
        style={{ left: `${p * (1 - ww) * 100}%`, width: `${ww * 100}%` }}
      />
    </div>
  );
}
