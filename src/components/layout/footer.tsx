import Link from "next/link";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/format";

const link = "text-body no-underline hover:text-heading";

export function SiteFooter() {
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-hairline bg-deepest text-body">
      <div className="relative mx-auto flex max-w-[1200px] flex-col gap-12 px-6 pt-16 pb-8">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-10">
          <div className="flex flex-col gap-3.5">
            <span className="font-display text-2xl text-heading">{site.name}</span>
            <span className="max-w-[260px] text-[15px] text-muted">
              Genuine Nepali Rudraksha, 1 to 16 Mukhi and rare beads.
            </span>
          </div>
          <nav aria-label="Shop" className="flex flex-col gap-2 text-[15px]">
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
          <nav aria-label="Help" className="flex flex-col gap-2 text-[15px]">
            <span className="text-[13px] tracking-[0.2em] text-line uppercase">Help</span>
            <Link href="/#promise" className={link}>
              Authenticity
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
          </nav>
          <div className="flex flex-col gap-2 text-[15px]">
            <span className="text-[13px] tracking-[0.2em] text-line uppercase">Contact</span>
            <a href={whatsappLink()} target="_blank" rel="noopener" className={link}>
              WhatsApp {site.whatsappDisplay}
            </a>
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
