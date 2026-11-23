import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { beads, getBead, type Bead } from "@/data/beads";
import { site } from "@/data/site";
import { ProductHeader } from "@/components/layout/header";
import { SiteFooter } from "@/components/layout/footer";
import { Details, ProductMain, ProductNote, ProductVisual, Steps, TitleBlock } from "@/components/product/parts";
import { BeadPurchase } from "@/components/product/bead-purchase";
import { AskPrice } from "@/components/product/ask-price";
import { RudrakshaArt } from "@/components/art/rudraksha-art";

export const dynamicParams = false;

export function generateStaticParams() {
  return beads.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps<"/rudraksha/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const b = getBead(slug);
  if (!b) return {};
  return {
    title: `${b.title} (${b.hiFull})`,
    description: `${b.about} ${b.prices ? "Normal and Collector sizes." : "A rare bead — ask us for the price."}${b.certificate ? " Certificate of authenticity included." : ""}`,
    alternates: { canonical: `/rudraksha/${b.slug}/` },
    openGraph: b.photos[0] ? { images: [b.photos[0]] } : undefined,
  };
}

function TrunkSvg() {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden="true"
      className="absolute top-[8%] right-[4%] h-auto w-[30%] overflow-visible"
    >
      <defs>
        <radialGradient id="trunkG" cx="0.35" cy="0.35" r="0.8">
          <stop offset="0" stopColor="#B8693C" />
          <stop offset="0.6" stopColor="#7A3518" />
          <stop offset="1" stopColor="#34110A" />
        </radialGradient>
      </defs>
      <path
        d="M6 96 C4 70 18 44 42 30 C62 18 86 16 98 26 C110 36 104 52 90 56 C78 60 70 56 62 62 C52 70 46 84 40 100 Z"
        fill="url(#trunkG)"
      />
      <path
        d="M24 56 C34 50 40 54 46 48 M52 34 C60 30 66 34 72 28 M80 24 C86 22 92 26 96 30"
        fill="none"
        stroke="#2E0E05"
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeOpacity={0.7}
      />
      <circle cx="40" cy="44" r="3" fill="#E3A06A" fillOpacity={0.5} />
      <circle cx="68" cy="34" r="2.6" fill="#E3A06A" fillOpacity={0.5} />
    </svg>
  );
}

function BeadDrawing({ b }: { b: Bead }) {
  const label = `Drawing of the ${b.title}, slowly rotating`;
  if (b.shape === "ganesh")
    return (
      <div className="relative w-[70%]">
        <RudrakshaArt mukhi={b.lines} label={label} />
        <TrunkSvg />
      </div>
    );
  if (b.shape === "gs")
    return (
      <div className="flex w-[92%] items-center justify-center">
        <div className="relative z-[1] mr-[-19%] w-[56%]">
          <RudrakshaArt mukhi={b.lines} label={label} />
        </div>
        <div className="w-[56%]">
          <RudrakshaArt mukhi={b.lines} startPhi={1.4} label="" />
        </div>
      </div>
    );
  if (b.shape === "ggs")
    return (
      <div className="flex w-[92%] flex-col items-center">
        <div className="relative z-[2] mb-[-15%] w-[32%]">
          <RudrakshaArt mukhi={b.lines} startPhi={2.2} label="" />
        </div>
        <div className="flex w-full items-center justify-center">
          <div className="relative z-[1] mr-[-17%] w-[52%]">
            <RudrakshaArt mukhi={b.lines} label={label} />
          </div>
          <div className="w-[52%]">
            <RudrakshaArt mukhi={b.lines} startPhi={1.4} label="" />
          </div>
        </div>
      </div>
    );
  return (
    <div className="w-[78%]">
      <RudrakshaArt mukhi={b.lines} />
    </div>
  );
}

export default async function BeadPage({ params }: PageProps<"/rudraksha/[slug]">) {
  const { slug } = await params;
  const b = getBead(slug);
  if (!b) notFound();

  const rows: [string, React.ReactNode, string?][] = [["Presiding deity", b.deity]];
  if (b.planet) rows.push(["Ruling planet", b.planet]);
  if (b.mantra) rows.push(["Beej mantra", b.mantra, "sa"]);
  rows.push(["Traditional association", b.purpose], ["Origin", "Nepal"]);
  if (b.prices) rows.push(["Sizes", "Normal, or Collector (bigger)"]);
  if (b.certificate) rows.push(["Certificate", "Certificate of authenticity included"]);
  rows.push(["Best day to wear", "Monday"]);

  const wear = [
    "On a Monday morning after bathing, cleanse the bead with water or raw milk.",
    b.mantra ? "Chant its beej mantra 108 times while holding it." : "Chant “ॐ नमः शिवाय” 108 times while holding it.",
    "Wear it on a silk or wool thread, or set in silver or gold, so it touches the skin.",
  ];

  // Product and breadcrumb details for search engines. Prices must match the page exactly.
  const url = `${site.url}/rudraksha/${b.slug}/`;
  const availability = b.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock";
  // Rare beads have no listed price, and Google treats a Product without an offer as an error, so they only
  // get the breadcrumb.
  const jsonLd = [
    b.prices && {
      "@context": "https://schema.org",
      "@type": "Product",
      name: b.title,
      sku: b.slug,
      url,
      description: b.about,
      image: b.photos.map((p) => site.url + p),
      brand: { "@type": "Brand", name: site.name },
      ...(b.prices && {
        offers: (["normal", "collector"] as const).map((z) => ({
          "@type": "Offer",
          name: `${b.title}, ${z === "normal" ? "Normal" : "Collector"} size`,
          price: b.prices![z],
          priceCurrency: "INR",
          availability,
          itemCondition: "https://schema.org/NewCondition",
          url,
          seller: { "@id": `${site.url}/#store` },
        })),
      }),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
        { "@type": "ListItem", position: 2, name: "Rudraksha", item: `${site.url}/#collection` },
        { "@type": "ListItem", position: 3, name: b.title, item: url },
      ],
    },
  ].filter(Boolean);

  return (
    <>
      <ProductHeader back={{ href: "/#collection", label: "All Rudraksha" }} />
      <ProductMain
        crumbs={[{ href: "/", label: "Home" }, { href: "/#collection", label: "Rudraksha" }, { label: b.short }]}
      >
        <ProductVisual caption={b.caption} photos={b.photos} photoAlt={b.title} shape="circle">
          <BeadDrawing b={b} />
        </ProductVisual>

        <div className="flex min-w-0 flex-[1_1_460px] flex-col gap-[26px]">
          <TitleBlock
            eyebrow={b.kind === "rare" ? "Rare Nepal Rudraksha" : "Nepal Rudraksha"}
            title={b.title}
            sub={b.hiFull}
            subLang="hi"
          />

          {b.prices && b.available ? (
            <BeadPurchase slug={b.slug}>
              <Details rows={rows} />
              <Steps title="How to wear it" items={wear} />
            </BeadPurchase>
          ) : (
            <>
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="font-display text-[30px] text-heading">
                    {b.available ? "Price on request" : "Currently unavailable"}
                  </span>
                </div>
                <ProductNote />
              </div>
              <p className="m-0 text-pretty text-body">{b.about}</p>
              <Details rows={rows} />
              <Steps title="How to wear it" items={wear} />
            </>
          )}

          {!(b.prices && b.available) && (
            <AskPrice name={b.title} consultText="Not sure this is your bead? Book a horoscope consultation" />
          )}
        </div>
      </ProductMain>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteFooter />
    </>
  );
}
