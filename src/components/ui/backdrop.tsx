// Parchment grain and faint hand-written mantras behind a section (design brief §3).
export interface Mantra {
  text: string;
  top: string;
  left: string;
  size: number;
  rotate: number;
}

// `id` must be unique on the page (it names the SVG filters).
export function Backdrop({
  id,
  mantras = [],
  blot = false,
  seed = 11,
}: {
  id: string;
  mantras?: Mantra[];
  blot?: boolean;
  seed?: number;
}) {
  return (
    <div
      aria-hidden="true"
      lang="sa"
      className="pointer-events-none absolute inset-0 overflow-hidden font-mantra leading-[1.2] whitespace-nowrap text-black/[0.22]"
    >
      <svg width="100%" height="100%" className="absolute inset-0 opacity-55 mix-blend-multiply">
        {blot && (
          <filter id={`b${id}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.006 0.012" numOctaves={3} seed={seed} />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        )}
        <filter id={`g${id}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        {blot && <rect width="100%" height="100%" filter={`url(#b${id})`} opacity={0.6} />}
        <rect width="100%" height="100%" filter={`url(#g${id})`} opacity={0.4} />
      </svg>
      {mantras.map((m, i) => (
        <div
          key={i}
          className="absolute"
          style={{ top: m.top, left: m.left, fontSize: m.size, transform: `rotate(${m.rotate}deg)` }}
        >
          {m.text}
        </div>
      ))}
    </div>
  );
}

export function Divider() {
  return (
    <div aria-hidden="true" className="flex items-center gap-3.5">
      <span className="h-px w-16 bg-edge" />
      <span className="size-2 rotate-45 border border-line" />
      <span className="h-px w-16 bg-edge" />
    </div>
  );
}

export function SectionHead({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-[18px] text-center">
      <Divider />
      <h2 className="glow-heading m-0 font-display text-[clamp(34px,4vw,48px)] leading-[1.15] font-normal text-heading">
        {title}
      </h2>
      {children && <p className="m-0 max-w-[620px] text-pretty text-body">{children}</p>}
    </div>
  );
}

export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`text-[13px] tracking-[0.3em] text-line uppercase ${className}`}>{children}</span>;
}
