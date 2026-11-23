import { SiteHeader } from "./header";
import { SiteFooter } from "./footer";
import { Backdrop, Divider } from "@/components/ui/backdrop";

/** Plain page for policies and help: heading, optional intro, long text. */
export function TextPage({
  eyebrow,
  title,
  intro,
  updated,
  plain = false,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: React.ReactNode;
  updated?: string;
  /** Lay children out as-is instead of with the long-text (policy) styles. */
  plain?: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main
        id="main"
        className="relative overflow-hidden"
        style={{ background: "radial-gradient(ellipse 80% 40% at 50% 0%, #173E5E 0%, #0B1A29 70%)" }}
      >
        <Backdrop id="tp" mantras={[{ text: "ॐ नमः शिवाय", top: "3%", left: "60%", size: 44, rotate: -4 }]} />
        <div className="relative mx-auto flex max-w-[820px] flex-col gap-6 px-6 pt-20 pb-24">
          <div className="flex flex-col items-start gap-4">
            <span className="text-[13px] tracking-[0.3em] text-line uppercase">{eyebrow}</span>
            <h1 className="glow-heading m-0 font-display text-[clamp(34px,4vw,50px)] leading-[1.1] font-normal text-heading">
              {title}
            </h1>
            {intro && <p className="m-0 max-w-[640px] text-lg text-pretty text-body">{intro}</p>}
            {updated && <span className="text-sm text-muted">Last updated {updated}</span>}
            <Divider />
          </div>
          {plain ? (
            <div className="flex flex-col gap-10">{children}</div>
          ) : (
            <div className="prose-policy">{children}</div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
