"use client";

// A slowly rotating Rudraksha bead (ported from design/source/Rudraksha.dc.html).
// The first frame is rendered on the server; the spin then updates the SVG paths directly,
// about 30 times a second, only while the bead is on screen and motion is allowed.

import { useEffect, useId, useRef } from "react";

const CX = 200,
  CY = 200,
  R = 150,
  T = 0.34,
  ct = Math.cos(T),
  st = Math.sin(T),
  TAU = Math.PI * 2;

type Bump = { th: number; la: number; r: number };
const cache = new Map<number, Bump[]>();

function bumpsFor(m: number) {
  const hit = cache.get(m);
  if (hit) return hit;
  let seed = 7 + m * 13;
  const rnd = () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const list: Bump[] = [];
  let tries = 0;
  while (list.length < 680 && tries < 6000) {
    tries++;
    const th = rnd() * TAU,
      la = Math.asin(2 * rnd() - 1) * 0.97;
    let near = 9;
    for (let g = 0; g < m; g++) {
      const d = Math.abs(((((th - (g * TAU) / m) % TAU) + TAU + Math.PI) % TAU) - Math.PI);
      if (d < near) near = d;
    }
    if (near * Math.cos(la) < 0.075) continue;
    list.push({ th, la, r: 5 + rnd() * 4.5 });
  }
  cache.set(m, list);
  return list;
}

const proj = (th: number, la: number): [number, number, number] => {
  const x0 = Math.cos(la) * Math.sin(th),
    y0 = Math.sin(la),
    z0 = Math.cos(la) * Math.cos(th);
  const y1 = y0 * ct - z0 * st,
    z1 = y0 * st + z0 * ct;
  return [CX + R * x0, CY - R * y1, z1];
};
const circ = (x: number, y: number, r: number) =>
  `M${(x - r).toFixed(1)} ${y.toFixed(1)}a${r.toFixed(1)} ${r.toFixed(1)} 0 1 0 ${(2 * r).toFixed(1)} 0a${r.toFixed(1)} ${r.toFixed(1)} 0 1 0 ${(-2 * r).toFixed(1)} 0`;

/** 12 bump paths (shadow/body/highlight × 4 depths), grooves, ridges. */
function frame(m: number, phi: number): string[] {
  const b = ["", "", "", "", "", "", "", "", "", "", "", ""];
  for (const bp of bumpsFor(m)) {
    const q = proj(bp.th + phi, bp.la);
    if (q[2] <= 0.03) continue;
    const r = bp.r * (0.5 + 0.5 * q[2]);
    const bi = q[2] < 0.25 ? 0 : q[2] < 0.5 ? 1 : q[2] < 0.75 ? 2 : 3;
    b[bi] += circ(q[0] + r * 0.3, q[1] + r * 0.34, r);
    b[4 + bi] += circ(q[0], q[1], r * 0.9);
    b[8 + bi] += circ(q[0] - r * 0.3, q[1] - r * 0.34, r * 0.42);
  }
  const line = (off: number) => {
    let d = "";
    for (let g = 0; g < m; g++) {
      const th = (g * TAU) / m + phi + off;
      let pen = false;
      for (let a = -88; a <= 88; a += 4) {
        const q = proj(th, (a * Math.PI) / 180);
        if (q[2] > 0.02) {
          d += (pen ? "L" : "M") + q[0].toFixed(1) + " " + q[1].toFixed(1);
          pen = true;
        } else pen = false;
      }
    }
    return d;
  };
  return [...b, line(0), line(0.06) + line(-0.06)];
}

const BUMP_STYLE: [string, number, "s" | "b" | "h"][] = [
  ["#2E0E05", 0.35, "s"],
  ["#2E0E05", 0.6, "s"],
  ["#2E0E05", 0.85, "s"],
  ["#2E0E05", 1, "s"],
  ["#8C431D", 0.35, "b"],
  ["#8C431D", 0.6, "b"],
  ["#94481F", 0.85, "b"],
  ["#9C4E22", 1, "b"],
  ["#D8925C", 0.25, "h"],
  ["#D8925C", 0.45, "h"],
  ["#E3A06A", 0.65, "h"],
  ["#EDAE78", 0.8, "h"],
];

export function RudrakshaArt({
  mukhi,
  spin = true,
  startPhi = 0.6,
  label,
}: {
  mukhi: number;
  spin?: boolean;
  startPhi?: number;
  label?: string;
}) {
  const m = Math.max(1, Math.min(21, Math.round(mukhi) || 5));
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const svgRef = useRef<SVGSVGElement>(null);
  const first = frame(m, startPhi);

  useEffect(() => {
    if (!spin) return;
    const el = svgRef.current;
    if (!el) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const paths = Array.from(el.querySelectorAll<SVGPathElement>("path[data-i]")).sort(
      (a, b) => Number(a.dataset.i) - Number(b.dataset.i),
    );
    let phi = startPhi,
      last = 0,
      acc = 0,
      raf = 0,
      visible = false;
    const tick = (ts: number) => {
      const dt = last ? Math.min(0.1, (ts - last) / 1000) : 0;
      last = ts;
      phi += dt * 0.24;
      acc += dt;
      if (acc >= 1 / 30) {
        acc = 0;
        const d = frame(m, phi);
        d.forEach((v, i) => paths[i]?.setAttribute("d", v));
      }
      raf = requestAnimationFrame(tick);
    };
    const update = () => {
      const run = visible && !mq.matches && !document.hidden;
      if (run && !raf) {
        last = 0;
        raf = requestAnimationFrame(tick);
      } else if (!run && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      update();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", update);
    mq.addEventListener("change", update);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", update);
      mq.removeEventListener("change", update);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [m, spin, startPhi]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 400 400"
      role="img"
      aria-label={label ?? `${m} Mukhi Rudraksha bead, slowly rotating`}
      style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}
    >
      <defs>
        <radialGradient id={`${id}au`} cx="200" cy="200" r="200" gradientUnits="userSpaceOnUse">
          <stop offset="0.55" stopColor="#5FA8DA" stopOpacity="0.28" />
          <stop offset="1" stopColor="#5FA8DA" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}ba`} cx="0.38" cy="0.32" r="0.75">
          <stop offset="0" stopColor="#B8693C" />
          <stop offset="0.5" stopColor="#7A3518" />
          <stop offset="1" stopColor="#34110A" />
        </radialGradient>
        <radialGradient id={`${id}sh`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.62" stopColor="#0F0401" stopOpacity="0" />
          <stop offset="1" stopColor="#0F0401" stopOpacity="0.7" />
        </radialGradient>
        <clipPath id={`${id}cl`}>
          <circle cx="200" cy="200" r="150" />
        </clipPath>
        <filter id={`${id}s`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.9" />
        </filter>
        <filter id={`${id}s2`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.6" />
        </filter>
        <filter id={`${id}bl`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
        <filter id={`${id}gr`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves={3} seed={21} />
          <feColorMatrix type="matrix" values="0 0 0 0 0.12  0 0 0 0 0.04  0 0 0 0 0.01  0 0 0 1.6 -0.55" />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
      </defs>
      <circle cx="200" cy="200" r="200" fill={`url(#${id}au)`} />
      <g clipPath={`url(#${id}cl)`}>
        <circle cx="200" cy="200" r="150" fill={`url(#${id}ba)`} />
        <circle cx="200" cy="200" r="150" filter={`url(#${id}gr)`} fill="#000" />
        {BUMP_STYLE.map(([c, o, k], i) => (
          <path
            key={i}
            data-i={i}
            d={first[i]}
            fill={c}
            fillOpacity={o}
            filter={k === "s" ? `url(#${id}s)` : k === "h" ? `url(#${id}s2)` : undefined}
          />
        ))}
        <path
          data-i={13}
          d={first[13]}
          fill="none"
          filter={`url(#${id}s)`}
          stroke="#C98450"
          strokeWidth={1.8}
          strokeOpacity={0.55}
          strokeLinecap="round"
        />
        <path
          data-i={12}
          d={first[12]}
          fill="none"
          filter={`url(#${id}s)`}
          stroke="#1E0702"
          strokeWidth={7}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="200" cy="200" r="150" fill={`url(#${id}sh)`} />
        <ellipse
          cx="148"
          cy="138"
          rx="52"
          ry="30"
          transform="rotate(-32 148 138)"
          filter={`url(#${id}bl)`}
          fill="#FFF"
          fillOpacity={0.16}
        />
      </g>
      <path
        d="M 318 108 A 150 150 0 0 1 300 312"
        fill="none"
        filter={`url(#${id}s)`}
        stroke="#8EC9EE"
        strokeWidth={3}
        strokeOpacity={0.45}
        strokeLinecap="round"
      />
      <ellipse
        cx="200"
        cy={(CY - R * ct).toFixed(1)}
        rx="12"
        ry={(12 * st).toFixed(1)}
        fill="#140502"
        stroke="#C27A4A"
        strokeWidth={1.5}
        strokeOpacity={0.7}
      />
    </svg>
  );
}
