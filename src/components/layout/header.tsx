import Link from "next/link";
import { site } from "@/data/site";
import { CartButton } from "@/components/cart/cart-button";
import { SearchButton } from "@/components/layout/search";
import { MenuButton } from "@/components/layout/menu";
import { ChevronLeft } from "@/components/ui/icons";

export const NAV = [
  { href: "/#collection", label: "Rudraksha" },
  { href: "/#malas", label: "Malas & Bracelets" },
  { href: "/#consult", label: "Horoscope Consultation" },
  { href: "/#founder", label: "Founder's Word" },
  { href: "/#promise", label: "Our Promise" },
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
        <span className={`tracking-[0.32em] text-muted uppercase ${small ? "text-xs" : "text-xs"}`}>Rudraksha</span>
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
          <span className="hidden text-line sm:inline" aria-hidden="true">
            ·
          </span>
          <span>
            {site.announcement}{" "}
            <a href={`tel:${site.phone}`} className="text-chalk no-underline hover:text-heading">
              {site.phoneDisplay}
            </a>
          </span>
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
          className="mx-auto flex max-w-[1200px] items-center justify-between gap-x-3 px-4 py-3.5 sm:px-6 lg:py-[18px] xl:gap-x-8"
        >
          <Logo />
          {/* desktop: links in the bar; phones and tablets: the ☰ menu */}
          <div className="hidden gap-x-7 text-base xl:flex">
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
          <div className="flex items-center gap-2 sm:gap-3">
            <SearchButton className="max-[349px]:hidden" />
            <CartButton />
            <MenuButton items={NAV} />
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
        className="mx-auto flex max-w-[1200px] items-center justify-between gap-3 px-4 py-3.5 sm:px-6 lg:py-4"
      >
        <Logo small />
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href={back.href}
            className="hidden min-h-11 items-center gap-2 px-1 text-[15px] text-body no-underline hover:text-heading sm:inline-flex"
          >
            <ChevronLeft size={16} />
            {back.label}
          </Link>
          <SearchButton className="max-[349px]:hidden" />
          <CartButton />
          <MenuButton items={NAV} />
        </div>
      </nav>
    </header>
  );
}
