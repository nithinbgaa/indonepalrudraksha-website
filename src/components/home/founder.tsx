"use client";

import { useEffect, useRef, useState } from "react";
import { publishedFounderSlides as slides } from "@/data/founder";
import { site } from "@/data/site";
import { ArrowButtons } from "./rail";

export function FounderCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const count = slides.length;

  useEffect(() => {
    const el = ref.current;
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

  const go = (k: number) => {
    const el = ref.current;
    if (!el) return;
    const n = ((k % count) + count) % count;
    el.scrollTo({ left: n * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-9">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-2.5">
          <span className="text-[13px] tracking-[0.3em] text-line uppercase">From our founder</span>
          <h2 className="m-0 font-display text-[clamp(30px,3.4vw,42px)] leading-[1.15] font-normal text-heading">
            {site.founder.name}
          </h2>
          <span className="text-[15px] text-muted">{site.founder.title}</span>
        </div>
        {count > 1 && <ArrowButtons label="photo" onPrev={() => go(i - 1)} onNext={() => go(i + 1)} />}
      </div>

      <div ref={ref} role="region" aria-label="About our founder, scroll sideways" tabIndex={0} className="rail">
        {slides.map((s, k) => (
          <figure
            key={s.id}
            aria-roledescription="slide"
            aria-label={`${k + 1} of ${count}`}
            className="m-0 grid w-full flex-none snap-start grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] items-center gap-x-14 gap-y-10 p-1"
          >
            <div className="arch relative aspect-[4/5] w-full max-w-[380px] justify-self-center overflow-hidden border border-edge bg-black/25 shadow-[0_0_36px_rgba(120,190,235,0.15)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/images/founder/${s.id}.webp`}
                alt={`${site.founder.name} — ${s.caption}`}
                loading="lazy"
                className="size-full object-cover"
              />
            </div>
            <div className="flex min-w-0 flex-col gap-6">
              <div aria-hidden="true" className="flex items-center gap-3.5">
                <span className="h-px w-10 bg-edge" />
                <span className="size-2 rotate-45 border border-line" />
              </div>
              <p className="m-0 font-display text-[clamp(22px,2.2vw,30px)] leading-[1.38] text-pretty text-heading">
                {s.text}
              </p>
              <figcaption className="flex items-center gap-4">
                <span className="h-px w-10 flex-none bg-line" />
                <span className="flex flex-col leading-[1.35]">
                  <span className="text-lg font-medium text-heading">{site.founder.name}</span>
                  <span className="text-[15px] text-muted">{s.caption}</span>
                </span>
              </figcaption>
            </div>
          </figure>
        ))}
      </div>

      {count > 1 && (
        <div className="flex justify-center gap-1.5">
          {slides.map((s, k) => (
            <button
              key={s.id}
              type="button"
              aria-label={`Photo ${k + 1}`}
              aria-current={k === i}
              onClick={() => go(k)}
              className="flex size-11 items-center justify-center border-0 bg-transparent"
            >
              <span
                className="h-2 rounded-lg transition-all"
                style={
                  k === i
                    ? { width: 28, background: "#BFE0F2", boxShadow: "0 0 10px rgba(140,200,240,0.6)" }
                    : { width: 8, background: "rgba(142,195,224,0.35)" }
                }
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
