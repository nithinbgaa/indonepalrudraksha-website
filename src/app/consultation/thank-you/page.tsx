import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/header";
import { SiteFooter } from "@/components/layout/footer";
import { ThankYou } from "./thank-you";

// Razorpay Payment Button redirects here after a successful payment.
export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false },
};

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main
        id="main"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 30%, #1E4E74 0%, #102C46 50%, #0B1A29 100%)" }}
      >
        <ThankYou />
      </main>
      <SiteFooter />
    </>
  );
}
