import Link from "next/link";
import type { Metadata } from "next";
import { mukhi } from "@/data/beads";
import { TextPage } from "@/components/layout/text-page";

export const metadata: Metadata = {
  title: "How to wear Rudraksha",
  description:
    "Cleansing, energising with the beej mantra and wearing your Rudraksha, with each mukhi's deity and mantra.",
  alternates: { canonical: "/how-to-wear/" },
};

export default function HowToWear() {
  return (
    <TextPage
      eyebrow="Guide"
      title="How to wear Rudraksha"
      intro="Tradition offers a simple way to begin wearing a Rudraksha. If you are unsure which bead suits you, book a horoscope consultation first."
    >
      <h2>Before you first wear it</h2>
      <ol>
        <li>Choose a Monday morning, after bathing.</li>
        <li>Cleanse the bead with clean water or raw milk, then pat it dry.</li>
        <li>Hold it in your right hand and chant its beej mantra 108 times (listed below), or “ॐ नमः शिवाय”.</li>
        <li>Wear it on a silk or wool thread, or set in silver or gold, so that it touches the skin.</li>
      </ol>
      <h2>Caring for it</h2>
      <ul>
        <li>Remove it before sleep and when using soap or chemicals; keep it dry.</li>
        <li>Now and then, wipe it with a soft cloth and a drop of oil to keep it from drying out.</li>
        <li>Re-string it when the thread begins to loosen.</li>
      </ul>
      <h2>Each mukhi, its deity and mantra</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-[15px]">
          <thead>
            <tr className="border-b border-hairline text-[13px] tracking-[0.14em] text-muted uppercase">
              <th className="py-2 pr-4 font-normal">Mukhi</th>
              <th className="py-2 pr-4 font-normal">Deity</th>
              <th className="py-2 pr-4 font-normal">Beej mantra</th>
            </tr>
          </thead>
          <tbody>
            {mukhi.map((b) => (
              <tr key={b.slug} className="border-b border-[rgba(142,195,224,0.12)]">
                <td className="py-2 pr-4">
                  <Link href={`/rudraksha/${b.slug}/`}>{b.short}</Link>
                </td>
                <td className="py-2 pr-4">{b.deity}</td>
                <td lang="sa" className="py-2 pr-4 font-deva text-heading">
                  {b.mantra ?? "ॐ नमः शिवाय"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TextPage>
  );
}
