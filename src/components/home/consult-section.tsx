import { consultation, site } from "@/data/site";
import { inr } from "@/lib/format";
import { Backdrop } from "@/components/ui/backdrop";
import { Booking } from "./booking";

const STEPS = [
  "Choose a preferred day and a 30-minute slot.",
  "Send it to us on WhatsApp with your date, time and place of birth.",
  `We confirm your slot, share the payment details for ${inr(consultation.fee)} (UPI or bank transfer) and send the call details.`,
];

export function ConsultSection({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const H = headingLevel;
  return (
    <section
      id="consult"
      aria-label="Book a horoscope consultation"
      className="relative scroll-mt-4 overflow-clip border-t border-hairline"
      style={{ background: "radial-gradient(ellipse 70% 60% at 70% 40%, #1E4E74 0%, #102C46 50%, #0B1A29 100%)" }}
    >
      <Backdrop
        id="consult"
        mantras={[
          { text: "ॐ नमः शिवाय", top: "8%", left: "-2%", size: 44, rotate: -4 },
          { text: "ॐ त्र्यम्बकं यजामहे", top: "82%", left: "4%", size: 40, rotate: -3 },
          { text: "हर हर महादेव", top: "90%", left: "62%", size: 38, rotate: -4 },
        ]}
      />
      <div className="relative mx-auto flex max-w-[1200px] flex-wrap items-start gap-x-14 gap-y-12 px-4 pt-24 pb-[104px] sm:px-6">
        <div className="flex min-w-0 flex-[1_1_340px] flex-col gap-6">
          <span className="text-[13px] tracking-[0.3em] text-line uppercase">Horoscope consultation</span>
          <H className="glow-heading m-0 font-display text-[clamp(32px,3.6vw,46px)] leading-[1.12] font-normal text-balance text-heading">
            Find the Rudraksha your horoscope calls for
          </H>
          <p className="m-0 max-w-[480px] text-pretty text-body">
            Book a one-to-one call with <strong className="font-medium text-heading">{site.founder.name}</strong>. He
            reads your horoscope with you and recommends the mukhi best matched to your chart.
          </p>
          <ol className="m-0 flex list-none flex-col gap-4 p-0">
            {STEPS.map((s, i) => (
              <li key={s} className="flex items-start gap-3.5">
                <span className="flex size-8 flex-none items-center justify-center rounded-full border border-edge font-display text-chalk">
                  {i + 1}
                </span>
                <span className="pt-[3px]">{s}</span>
              </li>
            ))}
          </ol>
          <div className="flex flex-wrap gap-x-6 gap-y-2.5 text-[15px] text-muted">
            <span>{consultation.durationMinutes}-minute call</span>
            <span>{inr(consultation.fee)}</span>
            <span>{consultation.hoursLabel}</span>
          </div>
        </div>
        <Booking />
      </div>
    </section>
  );
}
