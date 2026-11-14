import { site } from "@/data/site";
import { whatsappLink } from "@/lib/format";
import { SiteHeader } from "@/components/layout/header";
import { SiteFooter } from "@/components/layout/footer";
import { Backdrop, SectionHead } from "@/components/ui/backdrop";
import { Mountains, Shield, Truck, WhatsAppIcon } from "@/components/ui/icons";
import { Hero } from "@/components/home/hero";
import { Collection } from "@/components/home/collection";
import { MalaCollection } from "@/components/home/malas";
import { ConsultSection } from "@/components/home/consult-section";
import { FounderCarousel } from "@/components/home/founder";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <noscript>
          <style>{`#top>div{visibility:visible!important}`}</style>
        </noscript>
        <Hero />

        {/* Trust strip */}
        <section aria-label="Our assurances" className="border-y border-hairline bg-deep">
          <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-x-8 gap-y-[18px] px-6 py-[26px]">
            {[
              {
                icon: <Mountains size={28} className="flex-none text-line" />,
                title: "Origin: Nepal",
                text: site.assurances.origin,
              },
              {
                icon: <Shield size={28} className="flex-none text-line" />,
                title: "Certified",
                text: site.assurances.certified,
              },
              {
                icon: <Truck size={28} className="flex-none text-line" />,
                title: "Delivery",
                text: site.assurances.delivery,
              },
            ].map((a) => (
              <div key={a.title} className="flex items-center gap-3.5">
                {a.icon}
                <span>
                  <strong className="font-semibold text-heading">{a.title}</strong> — {a.text}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Collection */}
        <section
          id="collection"
          className="relative scroll-mt-4 overflow-hidden"
          style={{ background: "radial-gradient(ellipse 90% 45% at 50% 18%, #1E4E74 0%, #133450 50%, #0B1A29 100%)" }}
        >
          <Backdrop
            id="col"
            blot
            mantras={[
              { text: "ॐ तत्पुरुषाय विद्महे महादेवाय धीमहि", top: "2%", left: "-3%", size: 40, rotate: -4 },
              { text: "तन्नो रुद्रः प्रचोदयात्", top: "4%", left: "66%", size: 44, rotate: -5 },
              { text: "ॐ नमः शिवाय", top: "26%", left: "10%", size: 64, rotate: -3 },
              { text: "नागेन्द्रहाराय त्रिलोचनाय", top: "45%", left: "48%", size: 40, rotate: -4 },
              { text: "भस्माङ्गरागाय महेश्वराय", top: "63%", left: "-2%", size: 44, rotate: -3 },
              { text: "हर हर महादेव", top: "80%", left: "54%", size: 52, rotate: -5 },
              { text: "शिवोऽहम् शिवोऽहम्", top: "94%", left: "14%", size: 34, rotate: -2 },
            ]}
          />
          <div className="relative mx-auto flex max-w-[1200px] flex-col gap-14 px-4 pt-[104px] pb-28 sm:px-6">
            <SectionHead title="The Faces of Rudra" />
            <Collection />
          </div>
        </section>

        {/* Malas & Bracelets */}
        <section
          id="malas"
          aria-label="Malas and bracelets"
          className="relative scroll-mt-4 overflow-hidden border-t border-hairline"
          style={{ background: "radial-gradient(ellipse 80% 50% at 50% 22%, #173E5E 0%, #0F2A44 50%, #0B1A29 100%)" }}
        >
          <Backdrop
            id="mal"
            mantras={[
              { text: "ॐ नमः शिवाय", top: "6%", left: "62%", size: 44, rotate: -4 },
              { text: "ॐ त्र्यम्बकं यजामहे", top: "84%", left: "2%", size: 40, rotate: -3 },
            ]}
          />
          <div className="relative mx-auto flex max-w-[1200px] flex-col gap-12 px-4 pt-24 pb-[104px] sm:px-6">
            <SectionHead title="Malas & Bracelets">
              Rudraksha and Karungali strung for japa and for everyday wear.
            </SectionHead>
            <MalaCollection />
          </div>
        </section>

        <ConsultSection />

        {/* Founder */}
        <section
          id="founder"
          className="relative scroll-mt-4 overflow-hidden border-y border-hairline text-body"
          style={{ background: "radial-gradient(ellipse 60% 70% at 25% 50%, #0F2638 0%, #071019 70%)" }}
        >
          <Backdrop id="fd" />
          <div className="relative mx-auto max-w-[1200px] px-4 py-24 sm:px-6">
            <FounderCarousel />
          </div>
        </section>

        {/* Promise */}
        <section
          id="promise"
          className="relative scroll-mt-4 overflow-hidden"
          style={{ background: "radial-gradient(ellipse 70% 70% at 50% 50%, #1E4E74 0%, #133450 55%, #0B1A29 100%)" }}
        >
          <Backdrop
            id="pr"
            blot
            seed={3}
            mantras={[
              { text: "सदा वसन्तं हृदयारविन्दे", top: "8%", left: "2%", size: 40, rotate: -4 },
              { text: "भवं भवानीसहितं नमामि", top: "14%", left: "62%", size: 36, rotate: -3 },
              { text: "ॐ नमः शिवाय", top: "52%", left: "30%", size: 70, rotate: -5 },
              { text: "ॐ त्र्यम्बकं यजामहे", top: "82%", left: "-2%", size: 38, rotate: -3 },
              { text: "शिवोऽहम्", top: "84%", left: "66%", size: 40, rotate: -4 },
            ]}
          />
          <div className="relative mx-auto flex max-w-[1200px] flex-col gap-14 px-6 py-[104px]">
            <SectionHead title="From Nepal to your hands" />
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-10">
              {[
                ["I", "Sourced at origin", "Our beads come from Nepal, where the Rudraksha tree grows naturally."],
                [
                  "II",
                  "Checked bead by bead",
                  "Every mukhi is counted and checked, and a certificate of authenticity goes in your box.",
                ],
                [
                  "III",
                  "Sent with reverence",
                  "Packed by hand and sent to your door, ready to wear or to place in your mandir.",
                ],
              ].map(([n, t, d]) => (
                <div key={n} className="flex flex-col items-center gap-3 text-center">
                  <span className="flex size-14 items-center justify-center rounded-full border border-edge bg-[rgba(5,12,20,0.55)] font-display text-[22px] text-chalk">
                    {n}
                  </span>
                  <h3 className="m-0 font-display text-2xl font-normal text-heading">{t}</h3>
                  <p className="m-0 max-w-[320px] text-body">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing call to action */}
        <section className="bg-ground px-4 pb-[104px] sm:px-6">
          <div
            className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[28px] border border-[rgba(142,195,224,0.35)] shadow-[0_0_60px_rgba(120,190,235,0.12)]"
            style={{ background: "radial-gradient(ellipse 70% 90% at 50% 40%, #285E8A 0%, #16395A 55%, #0E2840 100%)" }}
          >
            <Backdrop
              id="cta"
              blot
              seed={5}
              mantras={[
                { text: "कर्पूरगौरं करुणावतारं", top: "10%", left: "-2%", size: 44, rotate: -4 },
                { text: "हर हर महादेव", top: "18%", left: "68%", size: 40, rotate: -5 },
                { text: "ॐ नमो भगवते रुद्राय", top: "74%", left: "4%", size: 38, rotate: -3 },
                { text: "संसारसारं भुजगेन्द्रहारम्", top: "78%", left: "60%", size: 44, rotate: -4 },
              ]}
            />
            <div className="relative flex flex-col items-center gap-[22px] px-6 py-[72px] text-center">
              <span
                lang="sa"
                aria-hidden="true"
                className="font-deva text-[56px] leading-none text-chalk [text-shadow:0_0_24px_rgba(140,200,240,0.6)]"
              >
                ॐ
              </span>
              <h2 className="glow-heading m-0 font-display text-[clamp(30px,3.6vw,44px)] leading-[1.15] font-normal text-balance text-heading">
                Find the bead that calls to you
              </h2>
              <p className="m-0 max-w-[520px] text-body">
                Not sure which mukhi is right? Speak with us and we&apos;ll guide you personally.
              </p>
              <div className="flex flex-wrap justify-center gap-3.5 pt-1.5">
                <a
                  href="#collection"
                  className="inline-flex min-h-11 items-center rounded-full bg-saffron px-[30px] py-[15px] text-[17px] font-semibold text-[#2A140A] no-underline shadow-[0_0_24px_rgba(120,190,235,0.35)] hover:bg-[#EBAA63] hover:text-[#2A140A]"
                >
                  Explore all 16 Mukhi
                </a>
                <a
                  href={whatsappLink("Namaste! I'd like help choosing the right Rudraksha.")}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-edge bg-[rgba(5,12,20,0.35)] px-[26px] py-[15px] text-[17px] text-heading no-underline hover:border-chalk"
                >
                  <WhatsAppIcon size={18} />
                  WhatsApp {site.whatsappDisplay}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
