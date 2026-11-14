// Line drawings used in the numeral disc for rare beads (from Main.dc.html).
const base = {
  fill: "none",
  stroke: "#BFE0F2",
  strokeWidth: 1.6,
  "aria-hidden": true,
  style: { filter: "drop-shadow(0 0 6px rgba(140, 200, 240, 0.6))" },
} as const;

export function RareShape({ shape }: { shape: "gs" | "ggs" | "ganesh" }) {
  if (shape === "gs")
    return (
      <svg width="96" height="72" viewBox="0 0 96 72" {...base}>
        <circle cx="33" cy="38" r="22" />
        <circle cx="63" cy="38" r="22" />
        <path
          d="M33 16v44M22 19c-5 12-5 26 0 38M44 19c5 12 5 26 0 38M63 16v44M52 19c-5 12-5 26 0 38M74 19c5 12 5 26 0 38"
          strokeOpacity={0.55}
          strokeWidth={1.1}
        />
      </svg>
    );
  if (shape === "ggs")
    return (
      <svg width="96" height="80" viewBox="0 0 96 80" {...base}>
        <circle cx="33" cy="46" r="21" />
        <circle cx="63" cy="46" r="21" />
        <circle cx="48" cy="16" r="11" />
        <path d="M33 25v42M63 25v42M48 5v22" strokeOpacity={0.55} strokeWidth={1.1} />
      </svg>
    );
  return (
    <svg width="88" height="80" viewBox="0 0 88 80" {...base}>
      <circle cx="40" cy="44" r="26" />
      <path d="M58 26c10-6 18-2 18 8 0 8-6 12-10 18" strokeLinecap="round" />
      <path d="M40 18v52M28 21c-6 14-6 32 0 46M52 21c6 14 6 32 0 46" strokeOpacity={0.55} strokeWidth={1.1} />
    </svg>
  );
}
