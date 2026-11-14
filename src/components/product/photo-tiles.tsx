"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/drawer";
import { Close } from "@/components/ui/icons";

/**
 * The product's real photos. The first is the main picture: round inside the double ring for beads,
 * an arch for malas. Any further photos show as tiles underneath. Tap any photo to see it large.
 */
export function ProductPhotos({ photos, alt, shape }: { photos: string[]; alt: string; shape: "circle" | "arch" }) {
  const [open, setOpen] = useState<string | null>(null);
  const [main, ...more] = photos;
  return (
    <>
      {shape === "circle" ? (
        <div className="relative flex aspect-square w-full max-w-[480px] items-center justify-center rounded-full">
          <div aria-hidden="true" className="absolute inset-0 rounded-full border border-[rgba(142,195,224,0.35)]" />
          <div
            aria-hidden="true"
            className="absolute inset-[4%] rounded-full border border-dashed border-[rgba(142,195,224,0.3)]"
          />
          <button
            type="button"
            onClick={() => setOpen(main)}
            aria-label={`Show the photo of the ${alt} larger`}
            className="absolute inset-[8%] overflow-hidden rounded-full border border-[rgba(142,195,224,0.5)] bg-white p-0 shadow-[0_0_48px_rgba(120,190,235,0.28)] transition-transform hover:scale-[1.01]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={main} alt={`Photo of the ${alt}`} className="size-full object-cover" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(main)}
          aria-label={`Show the photo of the ${alt} larger`}
          className="arch relative aspect-[4/5] w-full max-w-[420px] overflow-hidden border border-edge bg-black/25 p-0 shadow-[0_0_36px_rgba(120,190,235,0.18)] transition-transform hover:scale-[1.01]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={main} alt={`Photo of the ${alt}`} className="size-full object-cover" />
        </button>
      )}

      {more.length > 0 && (
        <div className="grid w-full max-w-[480px] grid-cols-3 gap-3">
          {more.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setOpen(src)}
              aria-label={`Show photo ${i + 2} of the ${alt} larger`}
              className="aspect-square overflow-hidden rounded-[14px] border border-[rgba(142,195,224,0.3)] bg-white p-0 hover:border-chalk"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`${alt}, photo ${i + 2}`} loading="lazy" className="size-full object-cover" />
            </button>
          ))}
        </div>
      )}

      <Modal
        open={!!open}
        onClose={() => setOpen(null)}
        label={`${alt} photo`}
        className="m-auto w-[min(900px,calc(100%-32px))]"
      >
        <div className="relative overflow-hidden rounded-[18px] border border-[rgba(142,195,224,0.3)] bg-ground">
          {open && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={open} alt={alt} className="mx-auto block max-h-[85vh] w-auto max-w-full" />
          )}
          <button
            type="button"
            onClick={() => setOpen(null)}
            aria-label="Close photo"
            className="absolute top-3 right-3 flex size-11 items-center justify-center rounded-full border border-edge bg-[rgba(5,12,20,0.75)] text-heading"
          >
            <Close size={18} />
          </button>
        </div>
      </Modal>
    </>
  );
}
