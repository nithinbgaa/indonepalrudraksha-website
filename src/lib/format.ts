import { site } from "@/data/site";

/** ₹1,25,000 (Indian digit grouping). */
export function inr(v: number) {
  return "₹" + v.toLocaleString("en-IN");
}

/** wa.me link that opens a chat with the business, message pre-filled. */
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function askPriceMessage(name: string, size?: string | null) {
  return `Namaste! Please share the price of the ${name}${size ? ` (${size} beads)` : ""}. I found it on ${site.url.replace("https://", "")}.`;
}

/** Order number like IR-261114-4821: date (IST) + 4 random digits. */
export function newOrderNumber(now = new Date()) {
  const ist = new Date(now.getTime() + (330 + now.getTimezoneOffset()) * 60000);
  const p = (n: number) => String(n).padStart(2, "0");
  const ymd = `${String(ist.getFullYear()).slice(2)}${p(ist.getMonth() + 1)}${p(ist.getDate())}`;
  const rnd = String(Math.floor(1000 + Math.random() * 9000));
  return `IR-${ymd}-${rnd}`;
}

export const plural = (n: number, one: string, many = one + "s") => `${n} ${n === 1 ? one : many}`;
