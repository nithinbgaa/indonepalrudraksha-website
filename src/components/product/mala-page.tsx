import type { MalaItem } from "@/data/malas";
import { ProductHeader } from "@/components/layout/header";
import { SiteFooter } from "@/components/layout/footer";
import { Details, ProductMain, ProductVisual, Steps, TitleBlock } from "./parts";
import { AskPrice } from "./ask-price";
import { MalaArt } from "@/components/art/mala-art";

const JAPA = [
  "Hold the mala in the right hand, resting over the middle finger.",
  "Move one bead at a time with the thumb for each repetition of your mantra.",
  "At the guru bead, turn the mala around instead of crossing it.",
];
const WEAR = [
  "Wear it on the wrist with the beads touching the skin.",
  "Remove it before bathing or sleep, and keep it clean and dry.",
  "Re-string it when the thread begins to loosen.",
];

export function MalaPage({ m }: { m: MalaItem }) {
  const isMala = m.form === "mala";
  const kar = m.material === "karungali";
  const rows: [string, React.ReactNode][] = [];
  if (m.madeOf) rows.push(["Made of", m.madeOf]);
  if (m.beads) rows.push([isMala ? "Beads" : "Wrist size", m.beads]);
  if (m.sizes.length) rows.push(["Bead sizes", m.sizes.join(" · ")]);
  if (m.strungOn) rows.push(["Strung on", m.strungOn]);
  if (m.purpose) rows.push(["Worn for", m.purpose]);
  if (m.origin) rows.push(["Origin", m.origin]);

  return (
    <>
      <ProductHeader back={{ href: "/#malas", label: "All malas" }} />
      <ProductMain
        crumbs={[{ href: "/", label: "Home" }, { href: "/#malas", label: "Malas & Bracelets" }, { label: m.title }]}
      >
        <ProductVisual
          caption={isMala ? "Strung with a guru bead" : "Strung for everyday wear"}
          photos={m.photos}
          photoAlt={m.title}
        >
          <div className="w-[88%]">
            <MalaArt uid="mp" material={m.material} form={m.form} pendant={m.pendant} />
          </div>
        </ProductVisual>

        <div className="flex min-w-0 flex-[1_1_460px] flex-col gap-[26px]">
          <TitleBlock
            eyebrow={`${kar ? "Karungali" : "Rudraksha"} ${m.form}`}
            title={m.title}
            sub={m.sub}
            subLang={kar ? "ta" : "hi"}
          />
          <div className="flex flex-wrap items-baseline gap-3">
            <span className="font-display text-[30px] text-heading">
              {m.available ? "Price on request" : "Currently unavailable"}
            </span>
            <span className="text-sm text-muted">
              per {m.form}
              {kar ? "" : " · certificate included"}
            </span>
          </div>
          <p className="m-0 text-pretty text-body">{m.about}</p>
          {rows.length > 0 && <Details rows={rows} />}
          <Steps title={isMala ? "How to use it for japa" : "How to wear it"} items={isMala ? JAPA : WEAR} />
          <AskPrice
            name={m.title}
            sizes={m.sizes}
            consultText={`Not sure which ${m.form} suits you? Book a horoscope consultation`}
          />
        </div>
      </ProductMain>
      <SiteFooter />
    </>
  );
}
