"use client";

import Link from "next/link";

// Scroll-driven hero: abhishekam on the Shivalinga → one drop → zoom → falls onto Om → the words.
// Ported from design/source/Hero.dc.html. The design scrolled inside the hero; here the section is
// tall (frame height × 4.2, set in globals.css so anchors below it land correctly before any script
// runs) with a sticky inner frame, and progress comes from the page scroll.
// With reduced motion the final frame shows straight away and the section is one screen tall.

import { memo, useEffect, useRef, useState } from "react";
import { LINGAM_SVG } from "@/components/art/lingam-markup";

const Lingam = memo(function Lingam() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const svg = ref.current?.querySelector("svg");
    if (svg && window.matchMedia("(prefers-reduced-motion: reduce)").matches) svg.pauseAnimations();
  }, []);
  return <div ref={ref} dangerouslySetInnerHTML={{ __html: LINGAM_SVG }} />;
});

const MANTRAS = [
  { t: "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्", top: "6%", left: "-2%", s: 42, r: -4 },
  { t: "शिवोऽहम्", top: "16%", left: "72%", s: 50, r: -6 },
  { t: "कर्पूरगौरं करुणावतारं", top: "44%", left: "2%", s: 46, r: -3 },
  { t: "हर हर महादेव", top: "58%", left: "74%", s: 40, r: -4 },
  { t: "ॐ नमो भगवते रुद्राय", top: "84%", left: "6%", s: 36, r: -2 },
];

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const ease = (t: number) => t * t * (3 - 2 * t);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [dims, setDims] = useState<{ w: number; h: number; reduced: boolean } | null>(null);
  const [p, setP] = useState(0);
  // Phones: the final words end well above the bottom of the frame (no "Choose your Mukhi" row there),
  // so the section is pulled up by the empty space and the trust strip follows the buttons closely.
  const textRef = useRef<HTMLDivElement>(null);
  const [textH, setTextH] = useState(0);
  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setTextH(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // measure the frame (its height comes from CSS: clamp(600px, 100vh, 920px))
  const frameRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const measure = () => {
      const w = document.documentElement.clientWidth || window.innerWidth;
      const h = frameRef.current?.offsetHeight || clamp(window.innerHeight, 600, 920);
      setDims((d) => (d && d.w === w && d.h === h && d.reduced === mq.matches ? d : { w, h, reduced: mq.matches }));
    };
    measure();
    window.addEventListener("resize", measure);
    mq.addEventListener("change", measure);
    return () => {
      window.removeEventListener("resize", measure);
      mq.removeEventListener("change", measure);
    };
  }, []);

  // scroll progress through the tall section
  useEffect(() => {
    if (!dims || dims.reduced) return;
    let raf = 0;
    const read = () => {
      raf = 0;
      const el = sectionRef.current;
      if (!el) return;
      const max = el.offsetHeight - dims.h;
      const top = el.getBoundingClientRect().top;
      const next = max > 0 ? clamp(-top / max, 0, 1) : 0;
      setP((prev) => (Math.abs(prev - next) > 0.0005 ? next : prev));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [dims]);

  const W = dims?.w ?? 1440;
  const H = dims?.h ?? 900;
  const reduced = dims?.reduced ?? false;
  const prog = reduced ? 1 : p;
  const seg = (a: number, b: number) => clamp((prog - a) / (b - a), 0, 1);
  const narrow = W < 860;

  // Shivalinga, centred
  const cl = Math.max(24, (W - 1200) / 2 + 24),
    C = Math.min(1152, W - 48);
  const Lw = Math.max(220, Math.min(620, W - 32, ((H - 40) * 600) / 720));
  const Lh = (Lw * 720) / 600;
  const Lx = (W - Lw) / 2,
    Ly = (H - Lh) / 2;
  const spX = Lx + (Lw * 564) / 600,
    spY = Ly + (Lh * 458) / 720;

  // final layout: Shiva on the left, words on the right (stacked when narrow)
  const IMG = 409 / 1136;
  let Iw: number, Ih: number, Ix: number, Iy: number, Tx: number, Ty: number, Tw: number, h1: number, omX: number;
  if (!narrow) {
    h1 = clamp(W * 0.031, 32, 46);
    Iw = Math.min(C * 0.58, 740);
    Ih = Iw * IMG;
    Ix = cl - 16;
    Iy = H / 2;
    Tx = cl + C * 0.56;
    Tw = Math.min(C * 0.44, 540);
    Ty = Math.max(30, (H - (370 + h1 * 4.4)) / 2);
    omX = Tx + 17;
  } else {
    h1 = 30;
    Iw = W;
    Ih = Iw * IMG;
    Ix = 0;
    Iy = 16 + Ih / 2;
    Tx = 24;
    Tw = W - 48;
    Ty = Iy + Ih / 2 + 12;
    omX = W / 2 - 64;
  }
  const omY = Ty + 21;

  // the drop: somasutram → centre (zoom in) → above Om (zoom out) → falls onto Om
  const cx = W / 2,
    cy = H / 2;
  const big = Math.min(H * 0.44, W * 0.5, 340);
  const landY = omY - 24;
  const aboveY = Math.max(24, omY - 180);
  const tA = seg(0.04, 0.14),
    tB = ease(seg(0.14, 0.4));
  let dX: number, dY: number, dW: number;
  const fallX = spX,
    fallY = spY + 40 * tA;
  if (prog < 0.46) {
    dX = fallX + (cx - fallX) * tB;
    dY = fallY + (cy - fallY) * tB - 6 * Math.sin(seg(0.4, 0.46) * Math.PI);
    dW = 10 + 4 * tA + (big - 14) * tB;
  } else if (prog < 0.58) {
    const tZ = ease(seg(0.46, 0.58));
    dX = cx + (omX - cx) * tZ;
    dY = cy + (aboveY - cy) * tZ;
    dW = big + (16 - big) * tZ;
  } else if (prog < 0.74) {
    const tF = seg(0.58, 0.74);
    dX = omX;
    dY = aboveY + (landY - aboveY) * tF * tF;
    dW = 16 - 2 * tF;
  } else {
    const tS = seg(0.74, 0.765);
    dX = omX;
    dY = landY + 10 * tS;
    dW = 14 + 18 * tS;
  }
  const ratio = prog < 0.74 ? 1.32 - 0.14 * seg(0.14, 0.4) + 0.16 * seg(0.46, 0.58) : 1.48 - 1.1 * seg(0.74, 0.765);
  const dO = seg(0.03, 0.06) * (1 - seg(0.76, 0.785));

  // splash: droplets thrown up and out, falling back
  const tI = seg(0.745, 0.84);
  const splash = [12, 36, 60, 84, 104, 128, 152, 172].map((deg, k) => {
    const a = (deg * Math.PI) / 180,
      reach = 44 + (k % 3) * 12;
    const sz = (k % 2 ? 5 : 7) * (1 - 0.5 * tI);
    return {
      x: omX + Math.cos(a) * reach * tI,
      y: omY - 16 - Math.sin(a) * reach * 1.15 * tI + 80 * tI * tI,
      s: sz,
      o: prog < 0.745 ? 0 : (1 - tI) * (1 - tI) * 1.1,
    };
  });
  const wetT = seg(0.745, 0.8);

  const Lo = (1 - 0.6 * seg(0.04, 0.14)) * (1 - seg(0.18, 0.32));
  const Ls = 1 + 0.22 * ease(seg(0.04, 0.32));
  const fO = seg(0.04, 0.12) * (1 - seg(0.4, 0.5));
  const fR = 40 + dW * 0.9;
  const omO = seg(0.54, 0.62);
  const hit = seg(0.745, 0.86);
  const hit2 = seg(0.78, 0.9);
  const burst = prog < 0.745 ? 0 : 1 - seg(0.745, 0.9);
  const item = (i: number) => {
    const o = seg(0.8 + i * 0.03, 0.88 + i * 0.03);
    return { opacity: o, transform: `translateX(${36 * (1 - o)}px)` };
  };
  const t4 = seg(0.92, 1);
  const iO = seg(0.8, 0.94);
  const live = !!dims;
  const trim = live && narrow && textH ? Math.max(0, Math.round(H - (Ty + textH) - 44)) : 0;

  // A link like /#collection is followed before the trim is known; re-land on it whenever the trim
  // settles during the first few seconds (fonts loading can change it), unless the visitor has scrolled.
  const mountedAt = useRef(0);
  const userScrolled = useRef(false);
  useEffect(() => {
    mountedAt.current = performance.now();
    const mark = () => (userScrolled.current = true);
    window.addEventListener("wheel", mark, { passive: true, once: true });
    window.addEventListener("touchmove", mark, { passive: true, once: true });
    window.addEventListener("keydown", mark, { once: true });
    return () => {
      window.removeEventListener("wheel", mark);
      window.removeEventListener("touchmove", mark);
      window.removeEventListener("keydown", mark);
    };
  }, []);
  useEffect(() => {
    const hash = window.location.hash;
    if (!trim || hash.length < 2 || userScrolled.current || performance.now() - mountedAt.current > 4000) return;
    const id = requestAnimationFrame(() =>
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ behavior: "instant" }),
    );
    return () => cancelAnimationFrame(id);
  }, [trim]);

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-label="Abhishekam — the sacred tears of Shiva"
      className="hero-tall relative bg-ground"
      style={{ marginBottom: -trim }}
    >
      <div
        ref={frameRef}
        className="hero-frame sticky top-0 overflow-hidden"
        style={{
          background: "radial-gradient(ellipse 60% 60% at 50% 45%, #1E4E74 0%, #0F2A44 45%, #0B1A29 100%)",
          visibility: live ? "visible" : "hidden",
        }}
      >
        {/* parchment grain and faint mantras */}
        <div
          aria-hidden="true"
          lang="sa"
          className="pointer-events-none absolute inset-0 overflow-hidden font-mantra leading-[1.2] whitespace-nowrap text-black/[0.22]"
        >
          <svg width="100%" height="100%" className="absolute inset-0 opacity-55 mix-blend-multiply">
            <filter id="heroBlot">
              <feTurbulence type="fractalNoise" baseFrequency="0.006 0.012" numOctaves={3} seed={7} />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <filter id="heroGrain">
              <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#heroBlot)" opacity={0.6} />
            <rect width="100%" height="100%" filter="url(#heroGrain)" opacity={0.4} />
          </svg>
          {MANTRAS.map((m) => (
            <div
              key={m.t}
              className="absolute"
              style={{ top: m.top, left: m.left, fontSize: m.s, transform: `rotate(${m.r}deg)` }}
            >
              {m.t}
            </div>
          ))}
        </div>

        {/* 1 · the Shivalinga receiving abhishekam */}
        {Lo > 0.001 && (
          <div
            className="pointer-events-none absolute"
            style={{
              left: Lx,
              top: Ly,
              width: Lw,
              opacity: Lo,
              transform: `scale(${Ls})`,
              transformOrigin: `${(Lw * 564) / 600}px ${(Lh * 458) / 720}px`,
            }}
          >
            <Lingam />
          </div>
        )}

        {/* focus: everything darkens except the chosen drop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: fO * 0.9,
            background: `radial-gradient(circle at ${dX}px ${dY}px, rgba(4,9,16,0) 0px, rgba(4,9,16,0) ${fR}px, rgba(4,9,16,0.85) ${fR + 320}px)`,
          }}
        />

        {/* side hint */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-[22px] flex -translate-y-1/2 flex-col items-center gap-3.5 text-line"
          style={{ opacity: reduced ? 0 : 1 - seg(0, 0.05) }}
        >
          <span className="text-[12px] tracking-[0.34em] uppercase [writing-mode:vertical-rl]">Scroll down</span>
          <svg width="12" height="72" viewBox="0 0 12 72">
            <line x1="6" y1="0" x2="6" y2="72" stroke="#4F86AD" strokeWidth={1} />
            <circle cx="6" cy="6" r="3" fill="#BFE0F2">
              <animate attributeName="cy" values="6;66;6" dur="2.6s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>

        {/* 4 · Shiva, the painting, melting into the blue */}
        <div
          className="pointer-events-none absolute"
          style={{
            left: Ix,
            top: Iy,
            width: Iw,
            height: Ih,
            transform: `translateY(-50%) scale(${0.94 + 0.06 * ease(iO)})`,
            opacity: iO,
          }}
        >
          <div
            aria-hidden="true"
            className="absolute -inset-x-[15%] -inset-y-[45%]"
            style={{
              background:
                "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(95,168,218,0.28) 0%, rgba(95,168,218,0) 72%)",
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/shiva-painting.webp"
            alt="Chalk painting of Lord Shiva in meditation, eyes closed, a crescent moon in his hair and a trishul beside him"
            className="relative block size-full object-cover"
            style={{
              WebkitMaskImage: "radial-gradient(ellipse 50% 50% at 50% 50%, #000 58%, transparent 100%)",
              maskImage: "radial-gradient(ellipse 50% 50% at 50% 50%, #000 58%, transparent 100%)",
            }}
          />
        </div>

        {/* 3 · Om waiting for the drop; 4 · the words */}
        <div
          ref={textRef}
          className="absolute flex flex-col gap-[22px]"
          style={{
            left: Tx,
            top: Ty,
            width: Tw,
            alignItems: narrow ? "center" : "flex-start",
            textAlign: narrow ? "center" : "left",
            pointerEvents: t4 > 0.5 ? "auto" : "none",
          }}
        >
          <div
            lang="sa"
            className="flex h-[42px] items-center gap-3 font-deva text-2xl tracking-[0.06em] whitespace-nowrap text-chalk"
            style={{ opacity: omO }}
          >
            <span
              className="inline-block w-[34px] text-center text-[36px] leading-none"
              style={{
                color: hit > 0.05 ? "#FFFFFF" : "#8EC3E0",
                textShadow: `0 0 ${8 + 36 * burst + 6 * hit}px rgba(190,230,255,0.95)`,
              }}
            >
              ॐ
            </span>
            <span>नमः शिवाय</span>
          </div>
          <h1
            className="m-0 font-display leading-[1.1] font-normal text-balance text-heading"
            style={{
              ...item(1),
              fontSize: h1,
              textShadow: "0 0 28px rgba(120,190,235,0.38), 0 2px 2px rgba(2,6,10,0.6)",
            }}
          >
            The sacred tears of Shiva, from the hills of Nepal.
          </h1>
          <p className="m-0 max-w-[540px] text-lg text-pretty text-body" style={item(2)}>
            Tradition says the first Rudraksha grew from Lord Shiva&apos;s tears. Ours come from Nepal — 1 to 16 Mukhi
            and rare beads, chosen one by one and sent with a certificate of authenticity.
          </p>
          {!narrow && (
            <div className="flex flex-col items-start gap-3" style={item(3)}>
              <span className="text-[13px] tracking-[0.3em] text-line uppercase">Choose your Mukhi</span>
              <nav aria-label="Rudraksha by mukhi" className="flex max-w-[470px] flex-wrap gap-2.5">
                {Array.from({ length: 16 }, (_, i) => i + 1).map((n) => (
                  <Link
                    key={n}
                    href={`/rudraksha/${n}-mukhi/`}
                    aria-label={`${n} Mukhi Rudraksha`}
                    className="flex size-11 items-center justify-center rounded-full border border-edge font-display text-base text-chalk no-underline shadow-[0_0_12px_rgba(120,190,235,0.25)] hover:border-chalk hover:text-white"
                    style={{ background: "radial-gradient(circle at 40% 35%, #13304A 0%, #04080D 75%)" }}
                  >
                    {n}
                  </Link>
                ))}
              </nav>
            </div>
          )}
          <div
            className="flex flex-wrap items-center gap-x-6 gap-y-3"
            style={{ ...item(4), justifyContent: narrow ? "center" : "flex-start" }}
          >
            <a
              href="#collection"
              className="inline-flex min-h-11 items-center rounded-full bg-saffron px-7 py-3.5 text-[17px] font-semibold text-on-saffron no-underline shadow-[0_0_24px_rgba(120,190,235,0.3)] hover:bg-[#EBAA63] hover:text-on-saffron"
            >
              Explore the collection
            </a>
            <a href="#founder" className="border-b border-edge py-2 text-heading no-underline">
              Read the founder&apos;s word
            </a>
          </div>
        </div>

        {/* impact on Om: wet sheen, two ripples, thrown droplets */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute h-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            left: omX,
            top: omY + 18,
            width: 10 + 60 * wetT,
            opacity: prog < 0.745 ? 0 : 0.55 - 0.3 * seg(0.8, 1),
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(220,242,255,0.9) 0%, rgba(150,210,245,0.35) 55%, rgba(150,210,245,0) 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute size-[90px] rounded-full border-2 border-[rgba(200,235,255,0.9)] shadow-[0_0_24px_rgba(150,210,245,0.6)]"
          style={{
            left: omX,
            top: omY,
            transform: `translate(-50%,-50%) scale(${0.15 + 1.6 * hit})`,
            opacity: prog < 0.745 ? 0 : 1 - hit,
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute size-[90px] rounded-full border-[1.5px] border-[rgba(200,235,255,0.8)]"
          style={{
            left: omX,
            top: omY,
            transform: `translate(-50%,-50%) scale(${0.15 + 2.2 * hit2})`,
            opacity: prog < 0.78 ? 0 : 0.7 * (1 - hit2),
          }}
        />
        {splash.map((sp, i) => (
          <div
            key={i}
            aria-hidden="true"
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_8px_rgba(160,215,245,0.8)]"
            style={{
              left: sp.x,
              top: sp.y,
              width: sp.s,
              height: sp.s * 1.15,
              opacity: sp.o,
              background: "radial-gradient(circle at 35% 35%, #FFFFFF 0%, #BFE6FB 45%, #4F97CC 100%)",
            }}
          />
        ))}

        {/* 2 · the single drop from the somasutram */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
          style={{
            left: dX,
            top: dY,
            width: dW,
            height: dW * ratio,
            opacity: dO,
            filter: `drop-shadow(0 0 ${4 + 20 * (dW / big)}px rgba(160,215,245,0.8))`,
          }}
        >
          <svg viewBox="0 0 100 132" preserveAspectRatio="none" className="block size-full overflow-visible">
            <defs>
              <radialGradient id="heroDrop" cx="0.42" cy="0.66" r="0.62">
                <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.95" />
                <stop offset="0.35" stopColor="#CFEFFF" stopOpacity="0.7" />
                <stop offset="0.78" stopColor="#4F97CC" stopOpacity="0.55" />
                <stop offset="1" stopColor="#B4E2FA" stopOpacity="0.95" />
              </radialGradient>
            </defs>
            <path
              d="M50 0 C66 34 92 62 92 88 C92 113 73 132 50 132 C27 132 8 113 8 88 C8 62 34 34 50 0 Z"
              fill="url(#heroDrop)"
              stroke="#E4F5FF"
              strokeWidth={1.2}
              strokeOpacity={0.8}
            />
            <ellipse cx="34" cy="84" rx="8" ry="15" fill="#FFFFFF" fillOpacity={0.85} />
            <ellipse cx="64" cy="112" rx="14" ry="5" fill="#FFFFFF" fillOpacity={0.35} />
          </svg>
        </div>
      </div>
    </section>
  );
}
