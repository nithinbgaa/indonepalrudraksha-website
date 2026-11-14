"use client";

// "Founder's Word": his bio beside a carousel of his photos (all 17), with captions and thumbnails.

import { useEffect, useRef, useState } from "react";
import { founderBio, publishedFounderSlides as slides } from "@/data/founder";
import { site } from "@/data/site";
import { ArrowButtons } from "./rail";

export function FounderCarousel() {
  const rail = useRef<HTMLDivElement>(null);
  const thumbs = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const count = slides.length;

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
    el.scrollTo({ left: n * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] items-start gap-x-14 gap-y-10">
      {/* photos */}
      <div className="order-2 flex min-w-0 flex-col gap-4 lg:order-1">
        <div
          ref={rail}
          role="region"
          aria-roledescription="carousel"
          aria-label="Photos of our founder, scroll sideways"
          tabIndex={0}
          className="rail"
        >
          {slides.map((s, k) => (
            <figure
              key={s.id}
              aria-roledescription="slide"
              aria-label={`${k + 1} of ${count}`}
              className="m-0 flex w-full flex-none snap-start flex-col gap-3"
            >
              <div className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-[22px] border border-edge bg-[rgba(0,0,0,0.35)] shadow-[0_0_36px_rgba(120,190,235,0.15)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/images/founder/${s.id}.webp`}
                  alt={`${site.founder.name} — ${s.caption}`}
                  loading={k < 2 ? "eager" : "lazy"}
                  className="size-full object-contain"
                />
              </div>
              <figcaption className="text-center text-[15px] text-muted">{s.caption}</figcaption>
            </figure>
          ))}
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm tracking-[0.12em] text-line" aria-live="polite">
            {i + 1} / {count}
          </span>
          <ArrowButtons label="photo" onPrev={() => go(i - 1)} onNext={() => go(i + 1)} />
        </div>
        <div ref={thumbs} className="flex [scrollbar-width:none] gap-2 overflow-x-auto pb-1">
          {slides.map((s, k) => (
            <button
              key={s.id}
              type="button"
              onClick={() => go(k)}
              aria-label={`Photo ${k + 1}: ${s.caption}`}
              aria-current={k === i}
              className={`h-12 w-16 flex-none overflow-hidden rounded-lg border p-0 transition-opacity ${
                k === i
                  ? "border-chalk opacity-100 shadow-[0_0_10px_rgba(140,200,240,0.5)]"
                  : "border-[rgba(142,195,224,0.3)] opacity-55 hover:opacity-90"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/images/founder/${s.id}.webp`} alt="" loading="lazy" className="size-full object-cover" />
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
        <a href="#consult" className="self-start border-b border-edge py-1.5 text-[15px] text-chalk no-underline">
          Book a horoscope consultation with him
        </a>
      </div>
    </div>
  );
}
