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
      <div className="flex flex-col gap-3 border-b border-[rgba(142,195,224,0.2)] pb-5">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
          <span className="font-display text-[22px] text-heading">Only 10 readings a day</span>
          <span className="text-[15px] font-semibold text-saffron">
            {inr(consultation.fee)} · {consultation.durationMinutes} minutes
          </span>
        </div>
        <span className="text-sm text-muted">
          {site.founder.shortName} keeps each day to 10 readings so every one gets his full attention.
        </span>
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
            className="min-h-[52px] rounded-full border-0 bg-saffron text-[17px] font-semibold text-on-saffron disabled:opacity-50"
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
