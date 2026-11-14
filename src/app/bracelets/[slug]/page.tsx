import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBracelet, bracelets } from "@/data/malas";
import { MalaPage } from "@/components/product/mala-page";

export const dynamicParams = false;

export function generateStaticParams() {
  return bracelets.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: PageProps<"/bracelets/[slug]">): Promise<Metadata> {
  const m = getBracelet((await params).slug);
  if (!m) return {};
  return {
    title: m.title,
    description: m.about,
    alternates: { canonical: `/bracelets/${m.slug}/` },
    openGraph: m.photos[0] ? { images: [m.photos[0]] } : undefined,
  };
}

export default async function Page({ params }: PageProps<"/bracelets/[slug]">) {
  const m = getBracelet((await params).slug);
  if (!m) notFound();
  return <MalaPage m={m} />;
}
