import Link from "next/link";
import { site } from "@/data/site";
import { CartButton } from "@/components/cart/cart-button";
import { SearchButton } from "@/components/layout/search";
import { ChevronLeft } from "@/components/ui/icons";

export const NAV = [
  { href: "/#collection", label: "Rudraksha" },
  { href: "/#malas", label: "Malas & Bracelets" },
  { href: "/#consult", label: "Horoscope Consultation" },
  { href: "/#founder", label: "Founder's Word" },
  { href: "/#promise", label: "Authenticity" },
  { href: "/contact/", label: "Contact" },
];

export function Logo({ small = false }: { small?: boolean }) {
  return (
    <Link
      href="/"
      className="flex items-center gap-3 text-heading no-underline hover:text-heading"
      aria-label={`${site.name}, home`}
    >
      <span
        aria-hidden="true"
        className={`flex items-center justify-center rounded-full border border-edge font-deva leading-none text-chalk [text-shadow:0_0_12px_rgba(140,200,240,0.5)] ${small ? "size-[42px] text-[22px]" : "size-11 text-2xl"}`}
      >
        ॐ
      </span>
      <span className="flex flex-col leading-[1.1]">
        <span className={`font-display tracking-[0.02em] ${small ? "text-[21px]" : "text-[22px]"}`}>IndoNepal</span>
        <span className={`tracking-[0.32em] text-muted uppercase ${small ? "text-[11px]" : "text-xs"}`}>Rudraksha</span>
      </span>
    </Link>
  );
}

export function Announcement() {
  return (
    <div className="flex flex-wrap justify-center gap-3 bg-announce px-6 py-2.5 text-center text-sm tracking-[0.04em] text-body">
      <span>Genuine Rudraksha from Nepal</span>
      {site.announcement && (
        <>
          <span className="text-line" aria-hidden="true">
            ·
          </span>
          <span>{site.announcement}</span>
        </>
      )}
    </div>
  );
}

export function SiteHeader() {
  return (
    <>
      <Announcement />
      <header className="border-b border-hairline bg-deep">
        <nav
          aria-label="Main"
          className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-x-8 gap-y-2 px-4 py-[18px] sm:px-6"
        >
          <Logo />
          <div className="order-3 -mx-4 flex w-[calc(100%+2rem)] [scrollbar-width:none] gap-x-6 overflow-x-auto px-4 text-base sm:-mx-6 sm:w-[calc(100%+3rem)] sm:px-6 lg:order-none lg:mx-0 lg:w-auto lg:flex-wrap lg:gap-x-7 lg:overflow-visible lg:px-0">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="flex min-h-11 shrink-0 items-center py-2.5 whitespace-nowrap text-body no-underline hover:text-heading"
              >
                {n.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <SearchButton />
            <CartButton />
          </div>
        </nav>
      </header>
    </>
  );
}

/** Slim top bar used on product pages (design: Product.dc.html). */
export function ProductHeader({ back }: { back: { href: string; label: string } }) {
  return (
    <header className="border-b border-hairline bg-deep">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6"
      >
        <Logo small />
        <div className="flex items-center gap-3">
          <Link
            href={back.href}
            className="inline-flex min-h-11 items-center gap-2 px-1 text-[15px] text-body no-underline hover:text-heading"
          >
            <ChevronLeft size={16} />
            {back.label}
          </Link>
          <SearchButton />
          <CartButton />
        </div>
      </nav>
    </header>
  );
}
