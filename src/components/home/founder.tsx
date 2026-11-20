"use client";

// "Founder's Word": his bio beside a slideshow of his photos (all 17), with captions and thumbnails.
// The slideshow moves on every few seconds while it is on screen. It stops while the visitor hovers
// over it or uses it, and never moves by itself when reduced motion is asked for. Photos slide
// smoothly, 2 seconds each, at Rado's request.

import { useEffect, useRef, useState } from "react";
import { founderBio, publishedFounderSlides as slides } from "@/data/founder";
import { site } from "@/data/site";
import { useReducedMotion } from "@/lib/client-store";
import { ArrowButtons } from "./rail";
import { asset } from "@/lib/asset";

export function FounderCarousel() {
  const rail = useRef<HTMLDivElement>(null);
  const thumbs = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const count = slides.length;
  const reduced = useReducedMotion();
  const [holding, setHolding] = useState(false); // hover or keyboard focus inside
  const [visible, setVisible] = useState(false);
  const auto = !reduced && !holding && visible;
  const INTERVAL = 2000; // ms each photo stays

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    let raf = 0;
    const on = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setI(el.clientWidth > 0 ? Math.round(el.scrollLeft / el.clientWidth) : 0);
      });
    };
    el.addEventListener("scroll", on, { passive: true });
    return () => el.removeEventListener("scroll", on);
  }, []);

  // keep the active thumbnail in view (scroll the strip only, never the page)
  useEffect(() => {
    const box = thumbs.current;
    const t = box?.children[i] as HTMLElement | undefined;
    if (!box || !t) return;
    const left = t.getBoundingClientRect().left - box.getBoundingClientRect().left + box.scrollLeft;
    box.scrollTo({ left: left - box.clientWidth / 2 + t.clientWidth / 2, behavior: "smooth" });
  }, [i]);

  const go = (k: number) => {
    const el = rail.current;
    if (!el) return;
    const n = ((k % count) + count) % count;
    // jump straight back to the first photo instead of sliding past all of them
    el.scrollTo({ left: n * el.clientWidth, behavior: "smooth" });
  };

  // only run while the slideshow is on screen
  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!auto) return;
    const t = setTimeout(() => {
      const el = rail.current;
      if (!el) return;
      const n = (i + 1) % count;
      el.scrollTo({ left: n * el.clientWidth, behavior: "smooth" });
    }, INTERVAL);
    return () => clearTimeout(t);
  }, [auto, i, count]);

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] items-start gap-x-14 gap-y-10">
      {/* photos */}
      <div
        className="order-2 flex min-w-0 flex-col gap-4 lg:order-1"
        onMouseEnter={() => setHolding(true)}
        onMouseLeave={() => setHolding(false)}
        onFocus={() => setHolding(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setHolding(false);
        }}
      >
        <div
          ref={rail}
          role="region"
          aria-roledescription="carousel"
          aria-label="Photos of our founder"
          tabIndex={0}
          className="rail"
        >
          {slides.map((s, k) => (
            <figure
              key={s.id}
              aria-roledescription="slide"
              aria-label={s.caption}
              className="m-0 flex w-full flex-none snap-start flex-col gap-3"
            >
              <div className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-[22px] border border-edge bg-[rgba(0,0,0,0.35)] shadow-[0_0_36px_rgba(120,190,235,0.15)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset(`/images/founder/${s.id}.webp`)}
                  alt={`${site.founder.name} — ${s.caption}`}
                  loading={visible && k <= i + 2 ? "eager" : "lazy"}
                  className="size-full object-contain"
                />
              </div>
              <figcaption className="text-center text-[15px] text-muted">{s.caption}</figcaption>
            </figure>
          ))}
        </div>
        <div className="flex items-center justify-end gap-4">
          <ArrowButtons label="photo" onPrev={() => go(i - 1)} onNext={() => go(i + 1)} />
        </div>
        <div ref={thumbs} className="flex [scrollbar-width:none] gap-2 overflow-x-auto pb-1">
          {slides.map((s, k) => (
            <button
              key={s.id}
              type="button"
              onClick={() => go(k)}
              aria-label={`Show photo: ${s.caption}`}
              aria-current={k === i}
              className={`h-12 w-16 flex-none overflow-hidden rounded-lg border p-0 transition-opacity ${
                k === i
                  ? "border-chalk opacity-100 shadow-[0_0_10px_rgba(140,200,240,0.5)]"
                  : "border-[rgba(142,195,224,0.3)] opacity-55 hover:opacity-90"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset(`/images/founder/${s.id}.webp`)}
                alt=""
                loading="lazy"
                className="size-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* words */}
      <div className="order-1 flex min-w-0 flex-col gap-6 lg:order-2">
        <div className="flex flex-col gap-2.5">
          <span className="text-[13px] tracking-[0.3em] text-line uppercase">Founder&apos;s word</span>
          <h2 className="m-0 font-display text-[clamp(30px,3.4vw,42px)] leading-[1.15] font-normal text-heading">
            {site.founder.name}
          </h2>
          <span className="text-[15px] text-muted">{site.founder.title}</span>
        </div>
        <div aria-hidden="true" className="flex items-center gap-3.5">
          <span className="h-px w-10 bg-edge" />
          <span className="size-2 rotate-45 border border-line" />
        </div>
        <p className="m-0 font-display text-[clamp(21px,2vw,26px)] leading-[1.42] text-pretty text-heading">
          {founderBio[0]}
        </p>
        {founderBio.slice(1).map((p) => (
          <p key={p} className="m-0 text-pretty text-body">
            {p}
          </p>
        ))}
        <a
          href="#consult"
          className="inline-flex min-h-11 items-center self-start border-b border-edge text-[15px] text-chalk no-underline"
        >
          Book a horoscope consultation with him
        </a>
      </div>
    </div>
  );
}
