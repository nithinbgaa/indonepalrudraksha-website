"use client";

// Phones and tablets: a bar pinned to the bottom of the screen with the price and the main action,
// shown until the visitor scrolls down to the page's own button (then it gets out of the way).

import { useEffect, useState } from "react";

export function useBelowFold(ref: React.RefObject<HTMLElement | null>) {
  const [below, setBelow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setBelow(!e.isIntersecting && e.boundingClientRect.top > 0));
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return below;
}

export function MobileBar({ show, children }: { show: boolean; children: React.ReactNode }) {
  return (
    <div
      aria-hidden={!show}
      inert={!show}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-[rgba(142,195,224,0.3)] bg-[rgba(8,19,32,0.94)] px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] shadow-[0_-12px_32px_rgba(0,0,0,0.45)] backdrop-blur-md transition-transform duration-300 lg:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-[640px] items-center justify-between gap-3">{children}</div>
    </div>
  );
}
