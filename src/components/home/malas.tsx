"use client";

import Link from "next/link";

import { useState } from "react";
import { bracelets, itemHref, malas } from "@/data/malas";
import { askPriceMessage, whatsappLink } from "@/lib/format";
import { MalaArt } from "@/components/art/mala-art";
import { ArrowRight, WhatsAppIcon } from "@/components/ui/icons";
import { ArrowButtons, Segmented, useRail } from "./rail";

export function MalaCollection() {
  const [kind, setKind] = useState<"malas" | "bracelets">("malas");
  const { ref: railRef, by, reset } = useRail<HTMLDivElement>();
  const items = kind === "malas" ? malas : bracelets;

  return (
    <div className="flex min-w-0 flex-col gap-[22px]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <span className="text-[15px] text-muted">
          {kind === "malas" ? `${malas.length} malas` : `${bracelets.length} bracelets`} · prices on request
        </span>
        <div className="ml-auto flex flex-wrap items-center gap-x-4 gap-y-2.5">
          <Segmented
            label="Malas or bracelets"
            value={kind}
            onChange={(k) => {
              setKind(k);
              reset();
            }}
            options={[
              { key: "malas", label: "Malas" },
              { key: "bracelets", label: "Bracelets" },
            ]}
          />
          <ArrowButtons
            label={kind === "malas" ? "mala" : "bracelet"}
            onPrev={() => by(-1, 260)}
            onNext={() => by(1, 260)}
          />
        </div>
      </div>
      <div
        ref={railRef}
        role="region"
        aria-label={kind === "malas" ? "Malas, scroll sideways" : "Bracelets, scroll sideways"}
        tabIndex={0}
        className="rail rail-fade gap-5 px-0.5 pt-1 pb-2"
      >
        {items.map((m) => (
          <article
            key={m.slug}
            className="flex w-[260px] flex-none snap-start scroll-ml-6 flex-col items-center gap-3 rounded-[18px] border border-[rgba(142,195,224,0.26)] bg-card p-5 text-center"
          >
            <Link
              href={itemHref(m)}
              tabIndex={-1}
              aria-hidden="true"
              className="flex size-44 items-center justify-center"
            >
              <MalaArt uid={`mc-${m.slug}`} material={m.material} form={m.form} pendant={m.pendant} />
            </Link>
            <span className="rounded-full border border-[rgba(142,195,224,0.4)] px-2.5 py-0.5 text-[11px] tracking-[0.18em] text-line uppercase">
              {m.material === "karungali" ? "Karungali" : "Rudraksha"} {m.form}
            </span>
            <div className="flex flex-col">
              <h3 className="m-0 font-display text-[23px] leading-tight font-normal text-balance text-heading">
                {m.title}
              </h3>
              {m.sub && (
                <span className="[font-family:var(--font-deva),var(--font-tamil)] font-deva text-[15px] text-line">
                  {m.sub}
                </span>
              )}
            </div>
            <span className="text-base leading-[1.45] text-body">{m.line}</span>
            {m.sizes.length > 0 && <span className="text-sm text-muted">Sizes: {m.sizes.join(" · ")}</span>}
            <div className="mt-auto flex w-full items-center justify-between gap-2 border-t border-hairline pt-3.5">
              <a
                href={whatsappLink(askPriceMessage(m.title))}
                target="_blank"
                rel="noopener"
                aria-label={`Ask for the price of the ${m.title} on WhatsApp`}
                className="inline-flex min-h-11 items-center gap-1.5 text-[15px] font-semibold text-heading no-underline hover:text-saffron"
              >
                <WhatsAppIcon size={16} className="text-saffron" />
                Ask for price
              </a>
              <Link
                href={itemHref(m)}
                aria-label={`View the ${m.title}`}
                className="inline-flex min-h-11 items-center gap-1.5 py-2.5 text-[15px] font-medium text-line no-underline"
              >
                View
                <ArrowRight size={14} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
