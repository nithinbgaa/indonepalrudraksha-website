// Consultation calendar maths, always in IST (UTC+5:30) whatever the visitor's time zone.
// A "day" is a Date whose UTC fields hold the IST calendar date at 00:00.

import { consultation } from "@/data/site";

const IST = 330 * 60000;
export const WD = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const MO = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTH = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const istNow = () => new Date(Date.now() + IST); // read with getUTC*
export function istToday() {
  const n = istNow();
  return new Date(Date.UTC(n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate()));
}
export const addDays = (d: Date, n: number) => new Date(d.getTime() + n * 86400000);
export const dayKey = (d: Date) => d.toISOString().slice(0, 10);

const hm = (m: number) => {
  const h = Math.floor(m / 60),
    mm = m % 60,
    h12 = ((h + 11) % 12) + 1;
  return `${h12}:${mm < 10 ? "0" : ""}${mm}`;
};
const ap = (m: number) => (m < 720 ? "AM" : "PM");
export function slotLabel(start: number) {
  const end = start + consultation.durationMinutes;
  return `${hm(start)}${ap(start) === ap(end) ? "" : " " + ap(start)} – ${hm(end)} ${ap(end)}`;
}
export const dayName = (d: Date) => `${WD[d.getUTCDay()]}, ${d.getUTCDate()} ${MO[d.getUTCMonth()]}`;
export function weekLabel(start: Date) {
  const end = addDays(start, 6);
  return start.getUTCMonth() === end.getUTCMonth()
    ? `${MONTH[start.getUTCMonth()]} ${start.getUTCDate()} – ${end.getUTCDate()}`
    : `${start.getUTCDate()} ${MO[start.getUTCMonth()]} – ${end.getUTCDate()} ${MO[end.getUTCMonth()]}`;
}

export interface DayInfo {
  date: Date;
  key: string;
  past: boolean;
  closed: boolean;
  slots: { start: number; open: boolean }[];
  open: number;
}

export function weekDays(week: number): DayInfo[] {
  const today = istToday();
  const start = addDays(today, -((today.getUTCDay() + 6) % 7) + week * 7); // Monday
  const cutoff = istNow().getTime() + consultation.minLeadMinutes * 60000;
  return Array.from({ length: 7 }, (_, i) => {
    const date = addDays(start, i);
    const past = date < today;
    const closed = consultation.closedWeekdays.includes(date.getUTCDay());
    const slots = consultation.slots.map((s) => ({
      start: s,
      open: !past && !closed && date.getTime() + s * 60000 > cutoff,
    }));
    return { date, key: dayKey(date), past, closed, slots, open: slots.filter((s) => s.open).length };
  });
}

export const CONSULT_KEY = "inr-consult-v1";
export interface ChosenSlot {
  day: string; // YYYY-MM-DD (IST)
  start: number; // minutes from midnight IST
  label: string; // "Mon, 16 Nov · 11:00 – 11:30 AM IST"
}
