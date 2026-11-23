import type { Metadata, Viewport } from "next";
// Self-hosted fonts (no request to Google at runtime)
import "@fontsource/marcellus/400.css";
import "@fontsource/mukta/300.css";
import "@fontsource/mukta/400.css";
import "@fontsource/mukta/500.css";
import "@fontsource/mukta/600.css";
import "@fontsource/tiro-devanagari-sanskrit/400.css";
import "@fontsource/kalam/300.css";
import "@fontsource/kalam/400.css";
import "@fontsource/noto-sans-tamil/400.css";
import "@fontsource/noto-sans-tamil/500.css";
import "./globals.css";
import { site } from "@/data/site";
import { CartProvider } from "@/lib/cart";
import { CartPanel } from "@/components/cart/cart-panel";
import { ConsentManager } from "@/components/layout/consent";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Genuine Nepali Rudraksha, 1 to 16 Mukhi`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.name,
    url: "/",
    title: `${site.name} Organisation — Genuine Nepali Rudraksha`,
    description: site.description,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: `${site.name} — Genuine Nepali Rudraksha` }],
  },
  twitter: { card: "summary_large_image", images: ["/og-image.jpg"] },
  // Ownership checks for Google Search Console and Meta (set the codes in src/data/site.ts).
  verification: {
    ...(site.verification.google ? { google: site.verification.google } : {}),
    ...(site.verification.facebook ? { other: { "facebook-domain-verification": site.verification.facebook } } : {}),
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0B1A29",
  colorScheme: "dark",
  viewportFit: "cover", // lets the bottom bar sit above the iPhone home indicator
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN">
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-saffron px-5 py-3 font-semibold text-on-saffron focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <CartProvider>
          {children}
          <CartPanel />
        </CartProvider>
        <ConsentManager />
      </body>
    </html>
  );
}
