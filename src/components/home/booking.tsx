"use client";

import Link from "next/link";

// Horoscope consultation (design: the booking card in Main.dc.html).
// A static site cannot see real bookings, so the visitor picks a *preferred* slot, then pays ₹500
// through the Razorpay Payment Button (or, until it is set up, sends the request on WhatsApp).
// The assistant confirms the slot on WhatsApp, or offers another time or a full refund.

import { useEffect, useRef, useState } from "react";
import { consultation, site } from "@/data/site";
import { useMinute, writeLocal } from "@/lib/client-store";
import { inr, whatsappLink } from "@/lib/format";
import { CONSULT_KEY, dayName, slotLabel, weekDays, weekLabel, WD, MO, type ChosenSlot } from "@/lib/slots";
import { ChevronLeft, ChevronRight, WhatsAppIcon } from "@/components/ui/icons";

function RazorpayButton({ id }: { id: string }) {
  const ref = useRef<HTMLFormElement>(null);
  useEffect(() => {
    const form = ref.current;
    if (!form) return;
    form.innerHTML = "";
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/payment-button.js";
    s.async = true;
    s.setAttribute("data-payment_button_id", id);
    form.appendChild(s);
  }, [id]);
  return <form ref={ref} className="flex min-h-[52px] justify-center" />;
}

export function bookingMessage(chosen: ChosenSlot | null, paid: boolean) {
  return [
    paid ? "Namaste! I have paid for a horoscope consultation." : "Namaste! I'd like to book a horoscope consultation.",
    chosen ? `Preferred slot: ${chosen.label}` : "",
    "",
    "My name:",
    "Date of birth:",
    "Time of birth:",
    "Place of birth:",
  ]
    .filter((x, i) => x !== "" || i > 1)
    .join("\n");
}

const nav =
  "flex size-11 items-center justify-center rounded-full border border-edge bg-[rgba(5,12,20,0.5)] text-heading";

export function Booking() {
  const minute = useMinute(); // 0 during the server render; re-renders each minute so passed slots close
  const mounted = minute > 0;
  const [week, setWeek] = useState(0);
  const [selDay, setSelDay] = useState<string | null>(null);
  const [selSlot, setSelSlot] = useState<number | null>(null);
  const [step, setStep] = useState<"pick" | "pay">("pick");

  const days = mounted ? weekDays(week) : [];
  const firstOpen = days.find((d) => d.open > 0);
  const cur = days.find((d) => d.key === selDay) ?? firstOpen ?? null;
  const slotOk = cur && selSlot != null && cur.slots.some((s) => s.start === selSlot && s.open);
  const ready = !!(cur && slotOk);
  const chosen: ChosenSlot | null = ready
    ? { day: cur!.key, start: selSlot!, label: `${dayName(cur!.date)} · ${slotLabel(selSlot!)} IST` }
    : null;
  const maxW = consultation.weeksAhead;

  const toPay = () => {
    if (!chosen) return;
    writeLocal(CONSULT_KEY, JSON.stringify(chosen));
    setStep("pay");
  };

  const slotButton = (s: { start: number; open: boolean }) => {
    const sel = s.start === selSlot && cur?.key === (selDay ?? cur?.key);
    const lbl = slotLabel(s.start);
    return (
      <button
        key={s.start}
        type="button"
        disabled={!s.open}
        aria-pressed={sel}
        aria-label={lbl + (s.open ? "" : ", not available")}
        onClick={() => {
          setSelDay(cur!.key);
          setSelSlot(s.start);
        }}
        className={`min-h-[46px] rounded-full border px-3 text-base disabled:opacity-55 ${
          sel
            ? "border-chalk bg-[rgba(95,168,218,0.3)] text-white"
            : "border-[rgba(142,195,224,0.35)] bg-transparent text-body"
        } ${s.open ? "hover:border-chalk" : "text-dim"}`}
      >
        {lbl}
      </button>
    );
  };

  return (
    <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-6 rounded-[22px] border border-[rgba(142,195,224,0.3)] bg-[rgba(5,12,20,0.62)] p-5 shadow-[0_0_60px_rgba(95,168,218,0.12)] sm:p-7">
      {/* Ten readings a day. Every claim here is true for every visitor: a static site cannot know
          how many slots are really left, so it never shows a fake "only N left" count. */}
      <div
        className="relative -mx-5 -mt-5 overflow-hidden rounded-t-[22px] border-b border-[rgba(227,154,76,0.35)] px-5 pt-6 pb-5 sm:-mx-7 sm:-mt-7 sm:px-7"
        style={{
          background:
            "radial-gradient(ellipse 70% 120% at 0% 0%, rgba(227,154,76,0.22) 0%, rgba(227,154,76,0) 60%), radial-gradient(ellipse 60% 100% at 100% 100%, rgba(95,168,218,0.18) 0%, rgba(95,168,218,0) 70%)",
        }}
      >
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="relative flex size-[84px] flex-none items-center justify-center rounded-full border border-[rgba(227,154,76,0.7)] bg-[rgba(5,12,20,0.55)] shadow-[0_0_32px_rgba(227,154,76,0.35)] sm:size-[96px]">
            <span className="font-display text-[46px] leading-none text-saffron [text-shadow:0_0_18px_rgba(227,154,76,0.6)] sm:text-[54px]">
              10
            </span>
          </div>
          <div className="flex min-w-0 flex-col gap-1">
            <span className="text-[12px] tracking-[0.28em] text-saffron uppercase">Strictly limited</span>
            <span className="glow-heading font-display text-[26px] leading-[1.1] text-heading sm:text-[30px]">
              Only 10 readings a day
            </span>
            <span className="text-[15px] text-chalk">
              {inr(consultation.fee)} · {consultation.durationMinutes} minutes, one to one
            </span>
          </div>
        </div>

        <div aria-hidden="true" className="mt-5 flex gap-1.5">
          {Array.from({ length: 10 }, (_, k) => (
            <span key={k} className="h-1.5 flex-1 rounded-full bg-saffron shadow-[0_0_8px_rgba(227,154,76,0.6)]" />
          ))}
        </div>

        <p className="mt-4 mb-0 text-[15px] leading-relaxed text-body">
          After three decades of guiding millions, {site.founder.name} still reads every chart himself — and only ten a
          day, so each reading gets his full, unhurried attention. When a day&apos;s ten are taken, the next opening may
          be days away.
        </p>
        <p className="mt-2 mb-0 text-[15px] font-semibold text-heading">Choose your day now, before it fills.</p>
      </div>

      {step === "pick" && (
        <>
          <div className="flex flex-col gap-3.5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[13px] tracking-[0.2em] text-line uppercase">
                {mounted && days[0] ? weekLabel(days[0].date) : "This week"}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Previous week"
                  disabled={week === 0}
                  onClick={() => {
                    setWeek(week - 1);
                    setSelDay(null);
                    setSelSlot(null);
                  }}
                  className={`${nav} disabled:opacity-35`}
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  aria-label="Next week"
                  disabled={week >= maxW}
                  onClick={() => {
                    setWeek(week + 1);
                    setSelDay(null);
                    setSelSlot(null);
                  }}
                  className={`${nav} disabled:opacity-35`}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(64px,1fr))] gap-2">
              {(mounted ? days : Array.from({ length: 7 }, () => null)).map((d, i) => {
                if (!d)
                  return (
                    <div
                      key={i}
                      className="min-h-[84px] rounded-[14px] border border-[rgba(142,195,224,0.3)] bg-[rgba(11,26,41,0.6)]"
                    />
                  );
                const sel = cur?.key === d.key;
                const can = d.open > 0;
                const note = d.past ? "—" : d.closed ? "Closed" : can ? "Open" : "—";
                return (
                  <button
                    key={d.key}
                    type="button"
                    disabled={!can}
                    aria-pressed={sel}
                    aria-label={`${WD[d.date.getUTCDay()]} ${d.date.getUTCDate()} ${MO[d.date.getUTCMonth()]}, ${can ? "open" : d.closed ? "closed" : "not available"}`}
                    onClick={() => {
                      setSelDay(d.key);
                      setSelSlot(null);
                    }}
                    className={`flex min-h-[84px] flex-col items-center justify-center gap-0.5 rounded-[14px] border px-1 py-2 disabled:opacity-45 ${
                      sel
                        ? "border-chalk bg-[rgba(95,168,218,0.28)] text-white"
                        : "border-[rgba(142,195,224,0.3)] bg-[rgba(11,26,41,0.6)] text-body"
                    } ${can && !sel ? "hover:border-chalk" : ""}`}
                  >
                    <span className="text-xs tracking-[0.12em] uppercase">{WD[d.date.getUTCDay()]}</span>
                    <span className="font-display text-[22px] leading-[1.1]">{d.date.getUTCDate()}</span>
                    <span className={`text-xs ${can ? (sel ? "text-heading" : "text-line") : "text-dim"}`}>{note}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-3.5">
            <span className="text-[13px] tracking-[0.2em] text-line uppercase">
              {cur ? `Preferred slot on ${dayName(cur.date)}` : "Slots"}
            </span>
            {cur ? (
              <div className="flex flex-wrap gap-x-5 gap-y-4">
                <div className="flex min-w-0 flex-[1_1_200px] flex-col gap-2">
                  <span className="text-[13px] text-muted">Morning</span>
                  {cur.slots.slice(0, 5).map(slotButton)}
                </div>
                <div className="flex min-w-0 flex-[1_1_200px] flex-col gap-2">
                  <span className="text-[13px] text-muted">Afternoon</span>
                  {cur.slots.slice(5).map(slotButton)}
                </div>
              </div>
            ) : (
              <span className="text-[15px] text-muted">
                {mounted ? "No slots left this week. Try the next week." : "Loading slots…"}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={toPay}
            disabled={!ready}
            className="sticky bottom-[max(12px,env(safe-area-inset-bottom))] z-10 min-h-[52px] rounded-full border-0 bg-saffron text-[17px] font-semibold text-on-saffron shadow-[0_8px_28px_rgba(0,0,0,0.55)] disabled:bg-[#7a5634] disabled:text-[rgba(26,14,5,0.8)]"
          >
            {ready ? `Continue with ${slotLabel(selSlot!)}` : "Choose a slot"}
          </button>
        </>
      )}

      {step === "pay" && chosen && (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="font-display text-xl text-heading">{chosen.label}</span>
            <button
              type="button"
              onClick={() => setStep("pick")}
              className="min-h-11 rounded-full border border-edge bg-transparent px-4 text-[15px] text-chalk"
            >
              Change time
            </button>
          </div>
          {consultation.razorpayButtonId ? (
            <div className="flex flex-col gap-4">
              <p className="m-0 text-body">
                Pay {inr(consultation.fee)} securely with Razorpay by UPI or card. In the payment form, enter your name,
                WhatsApp number, this preferred slot and your date, time and place of birth.
              </p>
              <RazorpayButton id={consultation.razorpayButtonId} />
              <p className="m-0 text-sm text-muted">
                We confirm your slot on WhatsApp within {consultation.confirmWithinHours} hours. If it has just been
                taken, we offer you another time or a full refund.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <p className="m-0 text-body">
                Send us your preferred slot on WhatsApp with your date, time and place of birth. We confirm the slot and
                send a secure link to pay {inr(consultation.fee)} by UPI or card.
              </p>
              <a
                href={whatsappLink(bookingMessage(chosen, false))}
                data-conversion="consultRequest"
                target="_blank"
                rel="noopener"
                className="flex min-h-[52px] items-center justify-center gap-2.5 rounded-full bg-saffron text-[17px] font-semibold text-on-saffron no-underline hover:text-on-saffron"
              >
                <WhatsAppIcon size={20} />
                Book on WhatsApp
              </a>
            </div>
          )}
          <p className="m-0 text-center text-sm text-muted">
            Your birth details are used only for your reading. See our{" "}
            <Link href="/privacy/" className="text-line">
              privacy policy
            </Link>
            .
          </p>
        </>
      )}
    </div>
  );
}
