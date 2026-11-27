// Click log for the static site. Cloudflare serves every page from ./out without running this script;
// only /api/* comes here (run_worker_first in wrangler.jsonc).
//
//   POST /api/click          one Call / WhatsApp / Book click, sent by the browser with navigator.sendBeacon
//   GET  /api/clicks?key=…   totals and recent clicks for the private /stats/ page
//
// Stored per click: time, button, kind (order, ask price, consultation…), page path, city, whether the visitor
// came from a Google ad (gclid in the page address), and phone or desktop. No IP address, no cookies, nothing
// that identifies the visitor. Bindings: DB (D1 database), STATS_KEY (secret set in the Cloudflare dashboard).

const BUTTONS = new Set(["call", "whatsapp", "book"]);
const clip = (v, n) => (typeof v === "string" ? v.slice(0, n) : "");
const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

let ready = false;
async function ensureTable(db) {
  if (ready) return;
  await db
    .prepare(
      `CREATE TABLE IF NOT EXISTS clicks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ts TEXT NOT NULL,          -- UTC, ISO 8601
        day TEXT NOT NULL,         -- IST date, YYYY-MM-DD
        button TEXT NOT NULL,      -- call | whatsapp | book
        kind TEXT NOT NULL,        -- e.g. order, askPrice, consultRequest, visit, contact
        page TEXT NOT NULL,        -- path the click happened on
        city TEXT NOT NULL,        -- visit city slug, or "" for the main number
        from_ad INTEGER NOT NULL,  -- 1 if the page address carried a Google Ads click id
        device TEXT NOT NULL       -- phone | desktop
      )`,
    )
    .run();
  await db.prepare("CREATE INDEX IF NOT EXISTS clicks_day ON clicks(day)").run();
  ready = true;
}

const istDay = (d) => new Date(d.getTime() + 330 * 60000).toISOString().slice(0, 10);

async function logClick(request, env) {
  const raw = await request.text();
  if (raw.length > 2000) return new Response(null, { status: 413 });
  let b;
  try {
    b = JSON.parse(raw);
  } catch {
    return new Response(null, { status: 400 });
  }
  if (!BUTTONS.has(b.button)) return new Response(null, { status: 400 });
  const ua = request.headers.get("user-agent") || "";
  if (/bot|crawl|spider|preview|headless/i.test(ua)) return new Response(null, { status: 204 });
  const now = new Date();
  await ensureTable(env.DB);
  await env.DB.prepare(
    "INSERT INTO clicks (ts, day, button, kind, page, city, from_ad, device) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
  )
    .bind(
      now.toISOString(),
      istDay(now),
      b.button,
      clip(b.kind, 32),
      clip(b.page, 200),
      clip(b.city, 40),
      b.fromAd ? 1 : 0,
      /Mobi|Android|iPhone/i.test(ua) ? "phone" : "desktop",
    )
    .run();
  return new Response(null, { status: 204 });
}

function sameKey(a, b) {
  if (!a || !b || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function readClicks(url, env) {
  if (!env.STATS_KEY) return json({ error: "STATS_KEY is not set in Cloudflare" }, 503);
  if (!sameKey(url.searchParams.get("key") || "", env.STATS_KEY)) return json({ error: "Wrong key" }, 401);
  const days = Math.min(Math.max(parseInt(url.searchParams.get("days") || "14", 10) || 14, 1), 90);
  const since = istDay(new Date(Date.now() - (days - 1) * 86400000));
  await ensureTable(env.DB);
  const q = (sql) => env.DB.prepare(sql).bind(since).all();
  const [byDay, byCity, byPage, recent] = await Promise.all([
    q("SELECT day, button, COUNT(*) AS n FROM clicks WHERE day >= ? GROUP BY day, button ORDER BY day DESC"),
    q("SELECT city, button, COUNT(*) AS n FROM clicks WHERE day >= ? GROUP BY city, button ORDER BY n DESC"),
    q("SELECT page, COUNT(*) AS n FROM clicks WHERE day >= ? GROUP BY page ORDER BY n DESC LIMIT 30"),
    q("SELECT ts, button, kind, page, city, from_ad, device FROM clicks WHERE day >= ? ORDER BY id DESC LIMIT 300"),
  ]);
  return json({
    since,
    byDay: byDay.results,
    byCity: byCity.results,
    byPage: byPage.results,
    recent: recent.results,
  });
}

const worker = {
  async fetch(request, env) {
    const url = new URL(request.url);
    try {
      if (url.pathname === "/api/click" && request.method === "POST") return await logClick(request, env);
      if (url.pathname === "/api/clicks" && request.method === "GET") return await readClicks(url, env);
    } catch (e) {
      return json({ error: String(e && e.message ? e.message : e) }, 500);
    }
    return json({ error: "Not found" }, 404);
  },
};

export default worker;
