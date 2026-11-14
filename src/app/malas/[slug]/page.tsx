import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMala, malas } from "@/data/malas";
import { MalaPage } from "@/components/product/mala-page";

export const dynamicParams = false;

export function generateStaticParams() {
  return malas.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: PageProps<"/malas/[slug]">): Promise<Metadata> {
  const m = getMala((await params).slug);
  if (!m) return {};
  return {
    title: m.title,
    description: m.about,
    alternates: { canonical: `/malas/${m.slug}/` },
    openGraph: m.photos[0] ? { images: [m.photos[0]] } : undefined,
  };
}

export default async function Page({ params }: PageProps<"/malas/[slug]">) {
  const m = getMala((await params).slug);
  if (!m) notFound();
  return <MalaPage m={m} />;
}
