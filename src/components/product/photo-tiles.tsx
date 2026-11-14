"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/drawer";
import { Close } from "@/components/ui/icons";

/** Real photos under the drawing. Tap one to see it large. */
export function PhotoTiles({ photos, alt }: { photos: string[]; alt: string }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <>
      <div className="flex w-full max-w-[480px] flex-col gap-2">
        <span className="text-[13px] tracking-[0.2em] text-muted uppercase">
          {photos.length > 1 ? "Photos" : "Photo"}
        </span>
        <div className="grid grid-cols-3 gap-3">
          {photos.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setOpen(src)}
              aria-label={`Show photo ${i + 1} of the ${alt} larger`}
              className="aspect-square overflow-hidden rounded-[14px] border border-[rgba(142,195,224,0.3)] bg-white p-0 hover:border-chalk"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`${alt}, photo ${i + 1}`} loading="lazy" className="size-full object-cover" />
            </button>
          ))}
        </div>
      </div>
      <Modal
        open={!!open}
        onClose={() => setOpen(null)}
        label={`${alt} photo`}
        className="m-auto w-[min(900px,calc(100%-32px))]"
      >
        <div className="relative overflow-hidden rounded-[18px] border border-[rgba(142,195,224,0.3)] bg-ground">
          {open && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={open} alt={alt} className="mx-auto block max-h-[80vh] w-auto max-w-full" />
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
