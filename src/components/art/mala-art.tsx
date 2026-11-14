// Drawn mala or bracelet (ported from design/source/MalaArt.dc.html).
// `uid` must be unique on the page: it names the SVG gradients.

const f = (v: number) => v.toFixed(1);
const circ = (x: number, y: number, r: number) =>
  `M${f(x - r)} ${f(y)}a${f(r)} ${f(r)} 0 1 0 ${f(2 * r)} 0a${f(r)} ${f(r)} 0 1 0 ${f(-2 * r)} 0`;

export function MalaArt({
  uid,
  material,
  form,
  pendant = false,
  className,
}: {
  uid: string;
  material: "rudraksha" | "karungali";
  form: "mala" | "bracelet";
  pendant?: boolean;
  className?: string;
}) {
  const kar = material === "karungali";
  const bracelet = form === "bracelet";
  const pend = !bracelet && pendant;
  const cx = 200,
    cy = bracelet ? 196 : 166,
    R = bracelet ? 112 : 128;
  const N = bracelet ? 18 : kar ? 54 : 44;
  const r = bracelet ? 17 : kar ? 6.6 : 8.2;
  const gap = bracelet ? 0 : 0.22;
  let beads = "",
    grooves = "",
    shine = "";
  for (let i = 0; i < N; i++) {
    const a = Math.PI / 2 + gap / 2 + ((2 * Math.PI - gap) * (i + 0.5)) / N;
    const x = cx + R * Math.cos(a),
      y = cy + R * Math.sin(a);
    beads += circ(x, y, r);
    shine += circ(x - r * 0.34, y - r * 0.38, r * 0.28);
    if (!kar) {
      grooves += `M${f(x - r * 0.15)} ${f(y - r * 0.85)}Q${f(x - r * 0.45)} ${f(y)} ${f(x - r * 0.15)} ${f(y + r * 0.85)}`;
      grooves += `M${f(x + r * 0.3)} ${f(y - r * 0.8)}Q${f(x + r * 0.62)} ${f(y)} ${f(x + r * 0.3)} ${f(y + r * 0.8)}`;
    }
  }
  let thread = bracelet
    ? circ(cx, cy, R)
    : `M${f(cx + R * Math.cos(Math.PI / 2 + gap / 2))} ${f(cy + R * Math.sin(Math.PI / 2 + gap / 2))}A${R} ${R} 0 1 1 ${f(cx + R * Math.cos(Math.PI / 2 - gap / 2))} ${f(cy + R * Math.sin(Math.PI / 2 - gap / 2))}`;
  let guru = "",
    guruShine = "",
    tassel = "",
    tasselCap = "",
    pendantD = "",
    pendantLine = "",
    pendantShine = "";
  if (!bracelet) {
    const gy = cy + R + 10,
      gr = r * 1.55;
    guru = circ(cx, gy, gr);
    guruShine = circ(cx - gr * 0.34, gy - gr * 0.38, gr * 0.28);
    thread += `M${f(cx)} ${f(cy + R - 2)}L${f(cx)} ${f(gy)}`;
    if (pend) {
      const py = gy + gr + 30,
        pr = 24;
      thread += `M${f(cx)} ${f(gy + gr)}L${f(cx)} ${f(py - pr)}`;
      pendantD = circ(cx, py, pr);
      pendantLine = `M${f(cx - 4)} ${f(py - pr + 3)}Q${f(cx - 12)} ${f(py)} ${f(cx - 4)} ${f(py + pr - 3)}`;
      pendantShine = circ(cx - 8, py - 9, 6);
    } else {
      const ty = gy + gr;
      tasselCap = `M${f(cx - 5)} ${f(ty)}L${f(cx + 5)} ${f(ty)}L${f(cx + 7)} ${f(ty + 12)}L${f(cx - 7)} ${f(ty + 12)}Z`;
      for (let t = -6; t <= 6; t++) {
        tassel += `M${f(cx + t * 0.9)} ${f(ty + 12)}Q${f(cx + t * 1.6)} ${f(ty + 30)} ${f(cx + t * 2.6 + (t % 2) * 1.2)} ${f(ty + 52 + Math.abs(t) * -1.2)}`;
      }
    }
  }
  const label =
    (kar ? "Karungali" : "Rudraksha") + " " + (bracelet ? "bracelet" : "mala") + (pend ? " with a pendant" : "");
  const fill = kar ? `url(#${uid}k)` : `url(#${uid}r)`;
  const shineO = kar ? 0.55 : 0.28;
  return (
    <svg
      viewBox="0 0 400 400"
      role="img"
      aria-label={label}
      className={className}
      style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}
    >
      <defs>
        <radialGradient id={`${uid}a`} cx="200" cy="190" r="200" gradientUnits="userSpaceOnUse">
          <stop offset="0.35" stopColor="#5FA8DA" stopOpacity="0.22" />
          <stop offset="1" stopColor="#5FA8DA" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${uid}r`} cx="0.36" cy="0.32" r="0.75">
          <stop offset="0" stopColor="#C27845" />
          <stop offset="0.5" stopColor="#7E3A1A" />
          <stop offset="1" stopColor="#3A1409" />
        </radialGradient>
        <radialGradient id={`${uid}k`} cx="0.36" cy="0.32" r="0.75">
          <stop offset="0" stopColor="#4A3A34" />
          <stop offset="0.45" stopColor="#1C1411" />
          <stop offset="1" stopColor="#050302" />
        </radialGradient>
        <filter id={`${uid}s`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="0.8" />
        </filter>
      </defs>
      <circle cx="200" cy="190" r="200" fill={`url(#${uid}a)`} />
      <path d={thread} fill="none" stroke="#C9A24A" strokeWidth={1.4} strokeOpacity={0.7} />
      {tassel && (
        <path d={tassel} fill="none" stroke="#E39A4C" strokeWidth={1.6} strokeLinecap="round" strokeOpacity={0.9} />
      )}
      {tasselCap && <path d={tasselCap} fill="#C9A24A" />}
      <path d={beads} fill={fill} stroke={kar ? "rgba(190, 225, 245, 0.3)" : "rgba(0,0,0,0)"} strokeWidth={0.9} />
      {grooves && (
        <path
          d={grooves}
          fill="none"
          filter={`url(#${uid}s)`}
          stroke="rgba(36, 9, 3, 0.75)"
          strokeWidth={1.2}
          strokeLinecap="round"
        />
      )}
      <path d={shine} filter={`url(#${uid}s)`} fill="#FFFFFF" fillOpacity={shineO} />
      {guru && <path d={guru} fill={fill} stroke="#C9A24A" strokeWidth={1.2} strokeOpacity={0.6} />}
      {guruShine && <path d={guruShine} filter={`url(#${uid}s)`} fill="#FFFFFF" fillOpacity={shineO} />}
      {pendantD && (
        <>
          <path d={pendantD} fill={`url(#${uid}r)`} stroke="#C9A24A" strokeWidth={1.4} strokeOpacity={0.7} />
          <path d={pendantLine} fill="none" stroke="#2A0C04" strokeWidth={2.4} strokeLinecap="round" />
          <path d={pendantShine} filter={`url(#${uid}s)`} fill="#FFFFFF" fillOpacity={0.3} />
        </>
      )}
    </svg>
  );
}
