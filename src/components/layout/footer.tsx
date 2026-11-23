import Link from "next/link";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/format";
import { CookieSettingsButton } from "./consent";

const link = "flex min-h-11 items-center text-body no-underline hover:text-heading lg:min-h-0 lg:py-0.5";

export function SiteFooter() {
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-hairline bg-deepest text-body">
      <div className="relative mx-auto flex max-w-[1200px] flex-col gap-12 px-6 pt-16 pb-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-10">
          <div className="col-span-2 flex flex-col gap-3.5 lg:col-span-1">
            <span className="font-display text-2xl text-heading">{site.name}</span>
            <span className="max-w-[260px] text-[15px] text-muted">
              Genuine Nepali Rudraksha, 1 to 16 Mukhi and rare beads.
            </span>
          </div>
          <nav aria-label="Shop" className="flex flex-col text-[15px] lg:gap-2">
            <span className="text-[13px] tracking-[0.2em] text-line uppercase">Shop</span>
            <Link href="/#collection" className={link}>
              1 – 5 Mukhi
            </Link>
            <Link href="/#collection" className={link}>
              6 – 10 Mukhi
            </Link>
            <Link href="/#collection" className={link}>
              11 – 16 Mukhi
            </Link>
            <Link href="/#collection" className={link}>
              Rare beads
            </Link>
            <Link href="/#malas" className={link}>
              Malas
            </Link>
            <Link href="/#malas" className={link}>
              Bracelets
            </Link>
            <Link href="/consultation/" className={link}>
              Horoscope consultation
            </Link>
          </nav>
          <nav aria-label="Help" className="flex flex-col text-[15px] lg:gap-2">
            <span className="text-[13px] tracking-[0.2em] text-line uppercase">Help</span>
            <Link href="/#promise" className={link}>
              Our promise
            </Link>
            <Link href="/how-to-wear/" className={link}>
              How to wear Rudraksha
            </Link>
            <Link href="/shipping-and-returns/" className={link}>
              Shipping and returns
            </Link>
            <Link href="/cancellation-and-refunds/" className={link}>
              Cancellation and refunds
            </Link>
            <Link href="/terms/" className={link}>
              Terms of use
            </Link>
            <Link href="/privacy/" className={link}>
              Privacy policy
            </Link>
            <CookieSettingsButton
              className={`${link} cursor-pointer border-0 bg-transparent p-0 text-left text-[15px]`}
            />
          </nav>
          <div className="col-span-2 flex flex-col gap-2 text-[15px] lg:col-span-1">
            <span className="text-[13px] tracking-[0.2em] text-line uppercase">Contact</span>
            <a href={`tel:${site.phone}`} className={link}>
              Call {site.phoneDisplay}
            </a>
            <a href={whatsappLink()} target="_blank" rel="noopener" className={link}>
              WhatsApp {site.whatsappDisplay}
            </a>
            <span className="text-muted">{site.hours}</span>
            <a href={`mailto:${site.email}`} className={`${link} break-all`}>
              {site.email}
            </a>
            <address className="text-muted not-italic">
              {site.address.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
          </div>
        </div>
        <div className="flex max-w-[900px] flex-col gap-2 text-[13px] leading-normal text-muted">
          <p className="m-0">
            <strong className="font-semibold text-body">{site.legal.tradeName}</strong> · Proprietor {site.legal.name} ·
            GSTIN: {site.legal.gstin}
          </p>
          <p className="m-0">
            {site.legal.tradeName} guarantees the authenticity and natural origin of every bead, not specific outcomes.
            Rudraksha, mantras and astrology are traditional spiritual practices; descriptions of deities, planets and
            benefits reflect traditional belief, and a consultation is not a substitute for medical, legal or financial
            advice.
          </p>
        </div>
        <div className="flex flex-wrap justify-between gap-3 border-t border-[rgba(142,195,224,0.18)] pt-6 text-sm text-muted">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span lang="sa" className="font-deva text-line">
            ॐ नमः शिवाय
          </span>
        </div>
      </div>
    </footer>
  );
}
