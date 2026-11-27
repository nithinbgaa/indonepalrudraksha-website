import type { Metadata } from "next";
import { TextPage } from "@/components/layout/text-page";
import { StatsView } from "./stats-view";

// Private click counts (Call / WhatsApp / Book). Not linked anywhere, not in the sitemap, hidden from search
// engines; the numbers only load with the secret key (STATS_KEY in Cloudflare).
export const metadata: Metadata = {
  title: "Click stats",
  robots: { index: false, follow: false },
};

export default function Stats() {
  return (
    <TextPage
      eyebrow="Private"
      title="Button clicks"
      intro="Call, WhatsApp and Book clicks on the website, in IST."
      plain
    >
      <StatsView />
    </TextPage>
  );
}
