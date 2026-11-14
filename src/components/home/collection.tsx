"use client";

import Link from "next/link";

// "The Faces of Rudra": 1–16 Mukhi then the rare beads, in one sideways rail.
// The Normal / Collector switch changes every card's size and price.

import { useState } from "react";
import { mukhi, rare, type BeadSize } from "@/data/beads";
import { inr } from "@/lib/format";
import { ArrowRight } from "@/components/ui/icons";
import { ArrowButtons, ProgressBar, Segmented, useRail } from "./rail";
import { RareShape } from "./bead-shapes";

const jump =
  "min-h-11 rounded-full border border-[rgba(142,195,224,0.4)] bg-[rgba(5,12,20,0.4)] px-[18px] text-[15px] text-body hover:border-chalk";

export function Collection() {
  const [size, setSize] = useState<BeadSize>("normal");
  const { ref: railRef, p, w, by, to } = useRail<HTMLDivElement>();

  return (
    <div className="flex min-w-0 flex-col gap-[22px]">
      <p className="m-0 mx-auto -mt-[38px] max-w-[620px] text-center text-pretty text-body">
        {size === "normal"
          ? "Each mukhi — a natural line running from the bead's crown to its base — carries its own deity and its own blessing. Find the one meant for you."
          : "The same faces of Rudra in a bigger size, chosen for collectors and for those who want a bolder bead."}
      </p>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <button type="button" className={jump} onClick={() => to("#mukhi-1")}>
            1 – 5 Mukhi
          </button>
          <button type="button" className={jump} onClick={() => to("#mukhi-6")}>
            6 – 10 Mukhi
          </button>
          <button type="button" className={jump} onClick={() => to("#mukhi-11")}>
            11 – 16 Mukhi
          </button>
          <button type="button" className={jump} onClick={() => to(`#rare-${rare[0].slug}`)}>
            Rare beads
          </button>
        </div>
        <div className="ml-auto flex flex-wrap items-center gap-x-4 gap-y-2.5">
          <Segmented
            label="Bead size"
            value={size}
            onChange={setSize}
            options={[
              { key: "normal", label: "Normal" },
              { key: "collector", label: "Collector" },
            ]}
          />
          <ArrowButtons
            label="rudraksha"
            onPrev={() => by(-1)}
            onNext={() => by(1)}
            prevOff={p < 0.01}
            nextOff={p > 0.99 || w >= 0.99}
          />
        </div>
      </div>

      <div
        ref={railRef}
        role="region"
        aria-label="1 to 16 Mukhi and rare Rudraksha, scroll sideways"
        tabIndex={0}
        className="rail rail-fade gap-5 px-0.5 pt-1 pb-2"
      >
        {mukhi.map((b) => {
          const n = b.lines;
          const href = `/rudraksha/${b.slug}/${size === "collector" ? "?size=collector" : ""}`;
          return (
            <article
              key={b.slug}
              id={`mukhi-${n}`}
              className="flex w-[236px] flex-none snap-start scroll-ml-6 flex-col items-center gap-3.5 rounded-[18px] border border-[rgba(142,195,224,0.26)] bg-card px-5 pt-7 pb-5 text-center"
            >
              <Link href={href} tabIndex={-1} aria-hidden="true" className="no-underline">
                <div
                  className="flex size-32 items-center justify-center rounded-full border border-[rgba(142,195,224,0.5)] shadow-[0_0_22px_rgba(120,190,235,0.18)]"
                  style={{ background: "radial-gradient(circle at 50% 42%, #1B3F60 0%, #07111B 100%)" }}
                >
                  <span
                    lang="hi"
                    className="pt-2.5 font-mantra text-[60px] leading-none text-chalk [text-shadow:0_0_16px_rgba(140,200,240,0.55)]"
                  >
                    {b.numeral}
                  </span>
                </div>
              </Link>
              <div className="flex flex-col">
                <h3 className="m-0 font-display text-[25px] leading-tight font-normal text-heading">{b.short}</h3>
                <span lang="hi" className="font-deva text-base text-line">
                  {b.hi}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[13px] tracking-[0.14em] text-muted uppercase">{b.deity}</span>
                <span className="text-base leading-[1.45] text-body">{b.purpose}</span>
              </div>
              <div className="mt-auto flex w-full items-center justify-between gap-2 border-t border-hairline pt-3.5">
                <span className="flex flex-col items-start leading-tight">
                  <span className="text-base font-semibold text-heading">{b.prices ? inr(b.prices[size]) : ""}</span>
                  {size === "collector" && <span className="text-xs text-muted">Collector size</span>}
                </span>
                <Link
                  href={href}
                  aria-label={`View the ${b.title}${size === "collector" ? ", collector size" : ""}`}
                  className="inline-flex min-h-11 items-center gap-1.5 py-2.5 text-[15px] font-medium text-line no-underline"
                >
                  View bead
                  <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          );
        })}
        {rare.map((b) => (
          <article
            key={b.slug}
            id={`rare-${b.slug}`}
            className="flex w-[236px] flex-none snap-start scroll-ml-6 flex-col items-center gap-3.5 rounded-[18px] border border-[rgba(142,195,224,0.26)] bg-card px-5 pt-7 pb-5 text-center"
          >
            <div
              className="flex size-32 items-center justify-center rounded-full border border-[rgba(142,195,224,0.5)] shadow-[0_0_22px_rgba(120,190,235,0.18)]"
              style={{ background: "radial-gradient(circle at 50% 42%, #1B3F60 0%, #07111B 100%)" }}
            >
              <RareShape shape={b.shape as "gs" | "ggs" | "ganesh"} />
            </div>
            <div className="flex flex-col">
              <span className="mb-1.5 self-center rounded-full border border-[rgba(227,154,76,0.6)] px-2.5 py-0.5 text-[11px] tracking-[0.18em] text-saffron uppercase">
                Rare bead
              </span>
              <h3 className="m-0 font-display text-[25px] leading-tight font-normal text-heading">{b.short}</h3>
              <span lang="hi" className="font-deva text-base text-line">
                {b.hi}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[13px] tracking-[0.14em] text-muted uppercase">{b.deity}</span>
              <span className="text-base leading-[1.45] text-body">{b.purpose}</span>
            </div>
            <div className="mt-auto flex w-full items-center justify-between gap-2 border-t border-hairline pt-3.5">
              <span className="text-[15px] font-semibold text-heading">Price on request</span>
              <Link
                href={`/rudraksha/${b.slug}/`}
                aria-label={`View the ${b.title}`}
                className="inline-flex min-h-11 items-center gap-1.5 py-2.5 text-[15px] font-medium text-line no-underline"
              >
                View bead
                <ArrowRight size={14} />
              </Link>
            </div>
          </article>
        ))}
      </div>
      <ProgressBar p={p} w={w} />
    </div>
  );
}
