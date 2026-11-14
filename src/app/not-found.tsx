import Link from "next/link";
import { SiteHeader } from "@/components/layout/header";
import { SiteFooter } from "@/components/layout/footer";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex flex-col items-center gap-4 px-6 py-28 text-center">
        <span lang="sa" aria-hidden="true" className="font-deva text-[56px] leading-none text-chalk">
          ॐ
        </span>
        <h1 className="m-0 font-display text-4xl font-normal text-heading">This page could not be found</h1>
        <p className="m-0 text-body">The bead you were looking for may have moved.</p>
        <Link
          href="/#collection"
          className="mt-2 rounded-full bg-saffron px-7 py-3.5 font-semibold text-on-saffron no-underline hover:text-on-saffron"
        >
          See all Rudraksha
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
