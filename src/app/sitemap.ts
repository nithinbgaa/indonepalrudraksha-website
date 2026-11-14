import type { MetadataRoute } from "next";
import { beads } from "@/data/beads";
import { bracelets, itemHref, malas } from "@/data/malas";
import { site } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "/",
    "/consultation/",
    "/how-to-wear/",
    "/contact/",
    "/shipping-and-returns/",
    "/cancellation-and-refunds/",
    "/terms/",
    "/privacy/",
    ...beads.map((b) => `/rudraksha/${b.slug}/`),
    ...[...malas, ...bracelets].map(itemHref),
  ];
  return pages.map((p) => ({ url: site.url + p }));
}
