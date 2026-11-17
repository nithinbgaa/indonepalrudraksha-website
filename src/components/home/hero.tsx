"use client";

import Link from "next/link";

// Scroll-driven hero: abhishekam on the Shivalinga → one drop → zoom → falls onto Om → the words.
// Ported from design/source/Hero.dc.html. The design scrolled inside the hero; here the section is
// tall (frame height × 2.5, set in globals.css so anchors below it land correctly before any script
// runs) with a sticky inner frame, and progress comes from the page scroll.
//
// Smoothness: React renders the layout once (and again only on resize). Each animation frame then
// writes only `transform` and `opacity` on a fixed set of elements, which the browser's compositor
// handles without repainting. The shown progress eases towards the scroll position, so mouse-wheel
// steps and phone flicks flow instead of jumping.
// With reduced motion the final frame shows straight away and the section is one screen tall.

import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { LINGAM_SVG } from "@/components/art/lingam-markup";
import { asset } from "@/lib/asset";

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
const SPLASH_DEG = [12, 36, 60, 84, 104, 128, 152, 172];
const SMOOTH_MS = 90; // how quickly the shown progress catches up with the scroll

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const ease = (t: number) => t * t * (3 - 2 * t);

type Layout = ReturnType<typeof layoutFor>;

/** Positions that depend only on the frame size. */
function layoutFor(W: number, H: number) {
  const narrow = W < 860;
  const cl = Math.max(24, (W - 1200) / 2 + 24),
    C = Math.min(1152, W - 48);
  const Lw = Math.max(220, Math.min(620, W - 32, ((H - 40) * 600) / 720));
  const Lh = (Lw * 720) / 600;
  const Lx = (W - Lw) / 2,
    Ly = (H - Lh) / 2;
  const spX = Lx + (Lw * 564) / 600,
    spY = Ly + (Lh * 458) / 720;
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
  const big = Math.min(H * 0.44, W * 0.5, 340);
  return {
    W,
    H,
    narrow,
    Lw,
    Lh,
    Lx,
    Ly,
    spX,
    spY,
    Iw,
    Ih,
    Ix,
    Iy,
    Tx,
    Ty,
    Tw,
    h1,
    omX,
    omY,
    big,
    cx: W / 2,
    cy: H / 2,
    landY: omY - 24,
    aboveY: Math.max(24, omY - 180),
    dropH: big * 1.5, // the drop element is drawn at full size and only ever scaled down (stays crisp)
  };
}

/** Everything that changes with progress (0 → 1). Same timeline as the design. */
function frameAt(prog: number, L: Layout) {
  const seg = (a: number, b: number) => clamp((prog - a) / (b - a), 0, 1);
  const tA = seg(0.04, 0.14),
    tB = ease(seg(0.14, 0.4));
  let dX: number, dY: number, dW: number;
  const fallX = L.spX,
    fallY = L.spY + 40 * tA;
  if (prog < 0.46) {
    dX = fallX + (L.cx - fallX) * tB;
    dY = fallY + (L.cy - fallY) * tB - 6 * Math.sin(seg(0.4, 0.46) * Math.PI);
    dW = 10 + 4 * tA + (L.big - 14) * tB;
  } else if (prog < 0.58) {
    const tZ = ease(seg(0.46, 0.58));
    dX = L.cx + (L.omX - L.cx) * tZ;
    dY = L.cy + (L.aboveY - L.cy) * tZ;
    dW = L.big + (16 - L.big) * tZ;
  } else if (prog < 0.74) {
    const tF = seg(0.58, 0.74);
    dX = L.omX;
    dY = L.aboveY + (L.landY - L.aboveY) * tF * tF;
    dW = 16 - 2 * tF;
  } else {
    const tS = seg(0.74, 0.765);
    dX = L.omX;
    dY = L.landY + 10 * tS;
    dW = 14 + 18 * tS;
  }
  const ratio = prog < 0.74 ? 1.32 - 0.14 * seg(0.14, 0.4) + 0.16 * seg(0.46, 0.58) : 1.48 - 1.1 * seg(0.74, 0.765);
  const tI = seg(0.745, 0.84);
  const item = (i: number) => seg(0.8 + i * 0.03, 0.88 + i * 0.03);
  return {
    dX,
    dY,
    dW,
    ratio,
    dO: seg(0.03, 0.06) * (1 - seg(0.76, 0.785)),
    tI,
    splashO: prog < 0.745 ? 0 : (1 - tI) * (1 - tI) * 1.1,
    wetT: seg(0.745, 0.8),
    wetO: prog < 0.745 ? 0 : 0.55 - 0.3 * seg(0.8, 1),
    Lo: (1 - 0.6 * seg(0.04, 0.14)) * (1 - seg(0.18, 0.32)),
    Ls: 1 + 0.22 * ease(seg(0.04, 0.32)),
    fO: seg(0.04, 0.12) * (1 - seg(0.4, 0.5)),
    fR: 40 + dW * 0.9,
    omO: seg(0.54, 0.62),
    hit: seg(0.745, 0.86),
    hit2: seg(0.78, 0.9),
    burst: prog < 0.745 ? 0 : 1 - seg(0.745, 0.9),
    items: [item(1), item(2), item(3), item(4)],
    t4: seg(0.92, 1),
    iO: seg(0.8, 0.94),
    hint: 1 - seg(0, 0.05),
  };
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState<{ w: number; h: number; reduced: boolean } | null>(null);
  const [textH, setTextH] = useState(0);

  // elements the animation writes to
  const lingamEl = useRef<HTMLDivElement>(null);
  const focusEl = useRef<HTMLDivElement>(null);
  const hintEl = useRef<HTMLDivElement>(null);
  const paintEl = useRef<HTMLDivElement>(null);
  const omRowEl = useRef<HTMLDivElement>(null);
  const omEl = useRef<HTMLSpanElement>(null);
  const omGlowEl = useRef<HTMLSpanElement>(null);
  const itemEls = useRef<(HTMLElement | null)[]>([]);
  const wetEl = useRef<HTMLDivElement>(null);
  const rip1El = useRef<HTMLDivElement>(null);
  const rip2El = useRef<HTMLDivElement>(null);
  const splashEls = useRef<(HTMLDivElement | null)[]>([]);
  const dropEl = useRef<HTMLDivElement>(null);
  const dropGlowEl = useRef<HTMLDivElement>(null);
  const shown = useRef(0); // progress currently drawn

  // Phones: the final words end well above the bottom of the frame (no "Choose your Mukhi" row there),
  // so the section is pulled up by the empty space and the trust strip follows the buttons closely.
  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setTextH(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // measure the frame (its height comes from CSS: clamp(600px, 100vh, 920px))
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

  const W = dims?.w ?? 1440;
  const H = dims?.h ?? 900;
  const reduced = dims?.reduced ?? false;
  const L = useMemo(() => layoutFor(W, H), [W, H]);
  const live = !!dims;
  const trim = live && L.narrow && textH ? Math.max(0, Math.round(H - (L.Ty + textH) - 44)) : 0;

  /** Write one frame: transforms and opacities only. */
  const draw = useCallback(
    (prog: number) => {
      const f = frameAt(prog, L);
      const set = (el: HTMLElement | null | undefined, opacity: number, transform?: string) => {
        if (!el) return;
        el.style.opacity = String(opacity);
        if (transform !== undefined) el.style.transform = transform;
      };
      set(lingamEl.current, f.Lo, `scale(${f.Ls})`);
      const lingam = lingamEl.current;
      if (lingam) {
        // once the Shivalinga has faded out, hide it and stop its water animation (saves battery)
        const on = f.Lo > 0.001;
        lingam.style.visibility = on ? "visible" : "hidden";
        const svg = lingam.querySelector("svg");
        if (svg && !reduced && svg.animationsPaused() === on) {
          if (on) svg.unpauseAnimations();
          else svg.pauseAnimations();
        }
      }
      if (focusEl.current) {
        focusEl.current.style.opacity = String(f.fO * 0.9);
        if (f.fO > 0)
          focusEl.current.style.background = `radial-gradient(circle at ${f.dX}px ${f.dY}px, rgba(4,9,16,0) 0px, rgba(4,9,16,0) ${f.fR}px, rgba(4,9,16,0.85) ${f.fR + 320}px)`;
      }
      set(hintEl.current, reduced ? 0 : f.hint);
      set(paintEl.current, f.iO, `translate3d(0,-50%,0) scale(${0.94 + 0.06 * ease(f.iO)})`);
      set(omRowEl.current, f.omO);
      if (omEl.current) omEl.current.style.color = f.hit > 0.05 ? "#FFFFFF" : "#8EC3E0";
      set(omGlowEl.current, Math.min(0.9, 0.2 + 0.7 * f.burst + 0.15 * f.hit), `scale(${0.6 + 0.8 * f.burst})`);
      f.items.forEach((o, i) => set(itemEls.current[i], o, `translate3d(${36 * (1 - o)}px,0,0)`));
      if (textRef.current) textRef.current.style.pointerEvents = f.t4 > 0.5 ? "auto" : "none";
      set(wetEl.current, f.wetO, `translate3d(-50%,-50%,0) scaleX(${(10 + 60 * f.wetT) / 70})`);
      set(rip1El.current, prog < 0.745 ? 0 : 1 - f.hit, `translate3d(-50%,-50%,0) scale(${0.15 + 1.6 * f.hit})`);
      set(
        rip2El.current,
        prog < 0.78 ? 0 : 0.7 * (1 - f.hit2),
        `translate3d(-50%,-50%,0) scale(${0.15 + 2.2 * f.hit2})`,
      );
      SPLASH_DEG.forEach((deg, k) => {
        const a = (deg * Math.PI) / 180,
          reach = 44 + (k % 3) * 12;
        const x = Math.cos(a) * reach * f.tI;
        const y = -16 - Math.sin(a) * reach * 1.15 * f.tI + 80 * f.tI * f.tI;
        set(splashEls.current[k], f.splashO, `translate3d(${x}px,${y}px,0) scale(${1 - 0.5 * f.tI})`);
      });
      // the drop: drawn at full size (big × 1.5 big), positioned and scaled down to dW × dW·ratio
      const sx = f.dW / L.big,
        sy = (f.dW * f.ratio) / L.dropH;
      set(
        dropEl.current,
        f.dO,
        `translate3d(${f.dX - L.big / 2}px,${f.dY - L.dropH / 2}px,0) scale(${sx.toFixed(4)},${sy.toFixed(4)})`,
      );
      set(
        dropGlowEl.current,
        f.dO * 0.9,
        `translate3d(${f.dX - 50}px,${f.dY - 50}px,0) scale(${((f.dW + 16) / 70).toFixed(4)})`,
      );
    },
    [L, reduced],
  );

  // after every render (first paint, resize) draw the current progress before the browser paints
  useLayoutEffect(() => {
    draw(reduced ? 1 : shown.current);
  });

  // follow the scroll, easing the drawn progress towards it
  useEffect(() => {
    if (!dims || dims.reduced) return;
    let raf = 0,
      last = 0,
      target = shown.current;
    const readTarget = () => {
      const el = sectionRef.current;
      if (!el) return target;
      const max = el.offsetHeight - dims.h;
      return max > 0 ? clamp(-el.getBoundingClientRect().top / max, 0, 1) : 0;
    };
    const tick = (ts: number) => {
      const dt = last ? Math.min(64, ts - last) : 16;
      last = ts;
      target = readTarget();
      const k = 1 - Math.exp(-dt / SMOOTH_MS);
      let next = shown.current + (target - shown.current) * k;
      if (Math.abs(target - next) < 0.0004) next = target;
      if (next !== shown.current) {
        shown.current = next;
        draw(next);
      }
      raf = next === target ? 0 : requestAnimationFrame(tick);
      if (!raf) last = 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    // land exactly on the current position at start (no catch-up animation on load)
    shown.current = readTarget();
    draw(shown.current);
    window.addEventListener("scroll", kick, { passive: true });
    return () => {
      window.removeEventListener("scroll", kick);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [dims, draw]);

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

  const layer = { willChange: "transform, opacity" } as const;

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
          contain: "layout paint",
        }}
      >
        {/* parchment grain and faint mantras: painted once on its own layer */}
        <div
          aria-hidden="true"
          lang="sa"
          className="pointer-events-none absolute inset-0 overflow-hidden font-mantra leading-[1.2] whitespace-nowrap text-black/[0.22]"
        >
          {/* grain: black whose opacity follows the noise, which looks the same as the design's "multiply"
              blend but needs no blending work on each frame; its own GPU layer, painted once */}
          <div className="absolute inset-0 opacity-55" style={{ willChange: "transform" }}>
            <svg width="100%" height="100%" className="absolute inset-0">
              <filter id="heroBlot">
                <feTurbulence type="fractalNoise" baseFrequency="0.006 0.012" numOctaves={3} seed={7} />
                <feColorMatrix
                  type="matrix"
                  values={"0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -0.1063 -0.3576 -0.0361 0 0.5"}
                />
              </filter>
              <filter id="heroGrain">
                <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} stitchTiles="stitch" />
                <feColorMatrix
                  type="matrix"
                  values={"0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -0.1063 -0.3576 -0.0361 0 0.5"}
                />
              </filter>
              <rect width="100%" height="100%" filter="url(#heroBlot)" opacity={0.6} />
              <rect width="100%" height="100%" filter="url(#heroGrain)" opacity={0.4} />
            </svg>
          </div>
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
        <div
          ref={lingamEl}
          className="pointer-events-none absolute"
          style={{
            ...layer,
            left: L.Lx,
            top: L.Ly,
            width: L.Lw,
            transformOrigin: `${(L.Lw * 564) / 600}px ${(L.Lh * 458) / 720}px`,
          }}
        >
          <Lingam />
        </div>

        {/* focus: everything darkens except the chosen drop */}
        <div
          ref={focusEl}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ opacity: 0, willChange: "opacity" }}
        />

        {/* side hint */}
        <div
          ref={hintEl}
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-[22px] flex -translate-y-1/2 flex-col items-center gap-3.5 text-line"
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
          ref={paintEl}
          className="pointer-events-none absolute"
          style={{ ...layer, left: L.Ix, top: L.Iy, width: L.Iw, height: L.Ih, opacity: 0 }}
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
            src={asset("/images/shiva-painting.webp")}
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
            left: L.Tx,
            top: L.Ty,
            width: L.Tw,
            alignItems: L.narrow ? "center" : "flex-start",
            textAlign: L.narrow ? "center" : "left",
            pointerEvents: "none",
          }}
        >
          <div
            ref={omRowEl}
            lang="sa"
            className="flex h-[42px] items-center gap-3 font-deva text-2xl tracking-[0.06em] whitespace-nowrap text-chalk"
            style={{ ...layer, opacity: 0 }}
          >
            <span className="relative inline-block w-[34px] text-center text-[36px] leading-none">
              <span
                ref={omGlowEl}
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 -mt-[40px] -ml-[40px] size-[80px] rounded-full"
                style={{
                  ...layer,
                  background: "radial-gradient(circle, rgba(190,230,255,0.75) 0%, rgba(190,230,255,0) 65%)",
                }}
              />
              <span
                ref={omEl}
                className="relative"
                style={{ color: "#8EC3E0", textShadow: "0 0 10px rgba(190,230,255,0.95)" }}
              >
                ॐ
              </span>
            </span>
            <span>नमः शिवाय</span>
          </div>
          <h1
            ref={(el) => {
              itemEls.current[0] = el;
            }}
            className="m-0 font-display leading-[1.1] font-normal text-balance text-heading"
            style={{
              ...layer,
              opacity: 0,
              fontSize: L.h1,
              textShadow: "0 0 28px rgba(120,190,235,0.38), 0 2px 2px rgba(2,6,10,0.6)",
            }}
          >
            The sacred tears of Shiva, from the hills of Nepal.
          </h1>
          <p
            ref={(el) => {
              itemEls.current[1] = el;
            }}
            className="m-0 max-w-[540px] text-lg text-pretty text-body"
            style={{ ...layer, opacity: 0 }}
          >
            Tradition says the first Rudraksha grew from Lord Shiva&apos;s tears. Ours come from Nepal — 1 to 16 Mukhi
            and rare beads, chosen one by one and sent with a certificate of authenticity.
          </p>
          <div
            ref={(el) => {
              itemEls.current[2] = el;
            }}
            className="flex flex-col items-start gap-3"
            style={{ ...layer, opacity: 0, display: L.narrow ? "none" : undefined }}
          >
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
          <div
            ref={(el) => {
              itemEls.current[3] = el;
            }}
            className="flex flex-wrap items-center gap-x-6 gap-y-3"
            style={{ ...layer, opacity: 0, justifyContent: L.narrow ? "center" : "flex-start" }}
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
          ref={wetEl}
          aria-hidden="true"
          className="pointer-events-none absolute h-2.5 w-[70px] rounded-full"
          style={{
            ...layer,
            left: L.omX,
            top: L.omY + 18,
            opacity: 0,
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(220,242,255,0.9) 0%, rgba(150,210,245,0.35) 55%, rgba(150,210,245,0) 100%)",
          }}
        />
        <div
          ref={rip1El}
          aria-hidden="true"
          className="pointer-events-none absolute size-[90px] rounded-full border-2 border-[rgba(200,235,255,0.9)] shadow-[0_0_24px_rgba(150,210,245,0.6)]"
          style={{ ...layer, left: L.omX, top: L.omY, opacity: 0 }}
        />
        <div
          ref={rip2El}
          aria-hidden="true"
          className="pointer-events-none absolute size-[90px] rounded-full border-[1.5px] border-[rgba(200,235,255,0.8)]"
          style={{ ...layer, left: L.omX, top: L.omY, opacity: 0 }}
        />
        {SPLASH_DEG.map((_, k) => (
          <div
            key={k}
            ref={(el) => {
              splashEls.current[k] = el;
            }}
            aria-hidden="true"
            className="pointer-events-none absolute rounded-full shadow-[0_0_8px_rgba(160,215,245,0.8)]"
            style={{
              ...layer,
              left: L.omX - (k % 2 ? 2.5 : 3.5),
              top: L.omY - (k % 2 ? 2.9 : 4),
              width: k % 2 ? 5 : 7,
              height: (k % 2 ? 5 : 7) * 1.15,
              opacity: 0,
              background: "radial-gradient(circle at 35% 35%, #FFFFFF 0%, #BFE6FB 45%, #4F97CC 100%)",
            }}
          />
        ))}

        {/* 2 · the single drop from the somasutram, with a soft glow that follows it */}
        <div
          ref={dropGlowEl}
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 size-[100px] rounded-full"
          style={{
            ...layer,
            opacity: 0,
            background:
              "radial-gradient(circle, rgba(160,215,245,0.55) 0%, rgba(160,215,245,0.18) 45%, rgba(160,215,245,0) 70%)",
          }}
        />
        <div
          ref={dropEl}
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0"
          style={{ ...layer, width: L.big, height: L.dropH, opacity: 0, transformOrigin: "50% 50%" }}
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
