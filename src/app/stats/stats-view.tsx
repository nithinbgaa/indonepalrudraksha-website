"use client";

import { useEffect, useState } from "react";
import { visits } from "@/data/visit";

type Row = Record<string, string | number>;
type Data = { since: string; byDay: Row[]; byCity: Row[]; byPage: Row[]; recent: Row[] };

const KEY_STORE = "inr-stats-key";
const BUTTONS = ["call", "whatsapp", "book"] as const;
const LABEL: Record<string, string> = { call: "Call", whatsapp: "WhatsApp", book: "Book" };
const cityName = (slug: string) => visits.find((v) => v.slug === slug)?.city ?? (slug || "Main number");
const istTime = (iso: string) =>
  new Date(iso).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

function pivot(rows: Row[], by: string) {
  const out = new Map<string, Record<string, number>>();
  for (const r of rows) {
    const k = String(r[by] ?? "");
    const o = out.get(k) ?? {};
    o[String(r.button)] = Number(r.n);
    out.set(k, o);
  }
  return [...out.entries()];
}

const th =
  "border-b border-hairline px-3 py-2 text-left text-[13px] font-normal tracking-[0.08em] text-muted uppercase";
const td = "border-b border-hairline px-3 py-2 text-[15px] text-body";
const card = "rounded-[18px] border border-[rgba(142,195,224,0.26)] bg-card p-4 sm:p-5";

function CountTable({
  title,
  rows,
  first,
}: {
  title: string;
  rows: [string, Record<string, number>][];
  first: string;
}) {
  return (
    <section className={card}>
      <h2 className="m-0 mb-3 font-display text-[22px] font-normal text-heading">{title}</h2>
      {rows.length === 0 ? (
        <p className="m-0 text-muted">No clicks yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={th}>{first}</th>
                {BUTTONS.map((b) => (
                  <th key={b} className={`${th} text-right`}>
                    {LABEL[b]}
                  </th>
                ))}
                <th className={`${th} text-right`}>Total</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([k, o]) => (
                <tr key={k}>
                  <td className={`${td} text-heading`}>{k}</td>
                  {BUTTONS.map((b) => (
                    <td key={b} className={`${td} text-right`}>
                      {o[b] ?? 0}
                    </td>
                  ))}
                  <td className={`${td} text-right font-semibold text-heading`}>
                    {BUTTONS.reduce((s, b) => s + (o[b] ?? 0), 0)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export function StatsView() {
  const [key, setKey] = useState("");
  const [days, setDays] = useState(7);
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const load = async (k: string, d: number) => {
    if (!k) return;
    setLoading(true);
    setError("");
    try {
      const r = await fetch(`/api/clicks?key=${encodeURIComponent(k)}&days=${d}`, { cache: "no-store" });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || `Error ${r.status}`);
      setData(j);
      try {
        localStorage.setItem(KEY_STORE, k);
      } catch {}
    } catch (e) {
      setData(null);
      setError(e instanceof Error ? e.message : "Could not load the clicks");
    } finally {
      setLoading(false);
    }
  };

  // use the key saved on this device, if any
  useEffect(() => {
    let saved = "";
    try {
      saved = localStorage.getItem(KEY_STORE) || "";
    } catch {}
    if (!saved) return;
    const t = setTimeout(() => {
      setKey(saved);
      void load(saved, 7);
    }, 0);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <form
        className={`${card} flex flex-col gap-3 sm:flex-row sm:items-end`}
        onSubmit={(e) => {
          e.preventDefault();
          void load(key, days);
        }}
      >
        <label className="flex flex-1 flex-col gap-1.5 text-[14px] text-muted">
          Secret key
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            autoComplete="current-password"
            className="min-h-12 rounded-xl border border-edge bg-ground px-3 text-base text-heading"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-[14px] text-muted">
          Period
          <select
            value={days}
            onChange={(e) => {
              const d = Number(e.target.value);
              setDays(d);
              if (data) void load(key, d);
            }}
            className="min-h-12 rounded-xl border border-edge bg-ground px-3 text-base text-heading"
          >
            <option value={1}>Today</option>
            <option value={7}>Last 7 days</option>
            <option value={14}>Last 14 days</option>
            <option value={30}>Last 30 days</option>
          </select>
        </label>
        <button
          type="submit"
          className="min-h-12 rounded-full bg-saffron px-6 text-base font-semibold text-on-saffron disabled:opacity-60"
          disabled={loading || !key}
        >
          {loading ? "Loading…" : data ? "Refresh" : "Show clicks"}
        </button>
      </form>

      {error && <p className="m-0 text-delete">{error}</p>}

      {data && (
        <>
          <CountTable title="By day" first="Day" rows={pivot(data.byDay, "day")} />
          <CountTable
            title="By city / number"
            first="City"
            rows={pivot(data.byCity, "city").map(([k, o]) => [cityName(k), o])}
          />
          <section className={card}>
            <h2 className="m-0 mb-3 font-display text-[22px] font-normal text-heading">Latest clicks</h2>
            {data.recent.length === 0 ? (
              <p className="m-0 text-muted">No clicks yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      {["Time (IST)", "Button", "What", "City", "Page", "From ad", "Device"].map((h) => (
                        <th key={h} className={th}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.recent.map((r, i) => (
                      <tr key={i}>
                        <td className={`${td} whitespace-nowrap`}>{istTime(String(r.ts))}</td>
                        <td className={`${td} text-heading`}>{LABEL[String(r.button)] ?? r.button}</td>
                        <td className={td}>{r.kind}</td>
                        <td className={td}>{cityName(String(r.city))}</td>
                        <td className={td}>{r.page}</td>
                        <td className={td}>{Number(r.from_ad) ? "Yes" : "—"}</td>
                        <td className={td}>{r.device}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
