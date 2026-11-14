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
    images: [{ url: "/images/shiva-painting.webp", width: 1480, height: 533 }],
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0B1A29",
  colorScheme: "dark",
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
      </body>
    </html>
  );
}
