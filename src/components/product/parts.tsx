import Link from "next/link";
import { Backdrop } from "@/components/ui/backdrop";
import { ProductPhotos } from "./photo-tiles";

export function ProductMain({
  crumbs,
  children,
}: {
  crumbs: { href?: string; label: string }[];
  children: React.ReactNode;
}) {
  return (
    <main
      id="main"
      className="relative overflow-hidden"
      style={{ background: "radial-gradient(ellipse 55% 60% at 26% 42%, #1E4E74 0%, #102C46 48%, #0B1A29 100%)" }}
    >
      <Backdrop
        id="pd"
        mantras={[
          { text: "ॐ नमः शिवाय", top: "4%", left: "-2%", size: 46, rotate: -4 },
          { text: "हर हर महादेव", top: "86%", left: "6%", size: 40, rotate: -3 },
        ]}
      />
      <div className="relative mx-auto flex max-w-[1200px] flex-col gap-7 px-4 pt-10 pb-24 sm:px-6">
        <nav aria-label="Breadcrumb" className="text-sm text-muted">
          <ol className="m-0 flex list-none flex-wrap gap-2 p-0">
            {crumbs.map((c, i) => (
              <li key={i} className="flex gap-2">
                {i > 0 && <span aria-hidden="true">/</span>}
                {c.href ? (
                  <Link href={c.href} className="text-muted no-underline hover:text-heading">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-heading">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <div className="flex flex-wrap items-start gap-x-16 gap-y-12">{children}</div>
      </div>
    </main>
  );
}

/** Left column: the real photo (or, if there is none yet, the drawing inside the double ring) and a caption. */
export function ProductVisual({
  caption,
  photos,
  photoAlt,
  shape,
  children,
}: {
  caption: string;
  photos: string[];
  photoAlt: string;
  shape: "circle" | "arch";
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-[1_1_380px] flex-col items-center gap-5">
      {photos.length > 0 ? (
        <ProductPhotos photos={photos} alt={photoAlt} shape={shape} />
      ) : (
        <div className="relative flex aspect-square w-full max-w-[480px] items-center justify-center rounded-full">
          <div aria-hidden="true" className="absolute inset-0 rounded-full border border-[rgba(142,195,224,0.35)]" />
          <div
            aria-hidden="true"
            className="absolute inset-[7%] rounded-full border border-dashed border-[rgba(142,195,224,0.25)]"
          />
          {children}
        </div>
      )}
      <span className="text-center text-[13px] tracking-[0.2em] text-line uppercase">{caption}</span>
      {photos.length === 0 && (
        <span className="-mt-3 text-center text-[13px] text-muted">Illustration · photo coming soon</span>
      )}
    </div>
  );
}

export function Details({ rows }: { rows: [string, React.ReactNode, string?][] }) {
  return (
    <dl className="m-0 grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] border-t border-hairline">
      {rows.map(([k, v, lang]) => (
        <div key={k} className="border-b border-hairline py-3.5 pr-4">
          <dt className="text-[13px] tracking-[0.14em] text-muted uppercase">{k}</dt>
          <dd lang={lang} className={`mt-0.5 mb-0 ml-0 text-heading ${lang === "sa" ? "font-deva" : ""}`}>
            {v}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function Steps({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-2.5">
      <h2 className="m-0 font-display text-xl font-normal text-heading">{title}</h2>
      <ol className="m-0 flex list-decimal flex-col gap-1.5 pl-[22px] text-body">
        {items.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>
    </div>
  );
}

export function TitleBlock({
  eyebrow,
  title,
  sub,
  subLang,
}: {
  eyebrow: string;
  title: string;
  sub?: string | null;
  subLang?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[13px] tracking-[0.3em] text-line uppercase">{eyebrow}</span>
      <h1 className="glow-heading m-0 font-display text-[clamp(36px,4vw,54px)] leading-[1.08] font-normal text-heading">
        {title}
      </h1>
      {sub && (
        <span lang={subLang} className="[font-family:var(--font-deva),var(--font-tamil)] text-[22px] text-chalk">
          {sub}
        </span>
      )}
    </div>
  );
}
