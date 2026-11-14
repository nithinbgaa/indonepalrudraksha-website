"use client";

// Native <dialog> as a modal panel: Esc closes it, focus stays inside, the page behind is inert.
import { useEffect, useRef } from "react";

export function Modal({
  open,
  onClose,
  label,
  className = "",
  children,
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      document.documentElement.style.overflow = "hidden";
    } else if (!open && d.open) {
      d.close();
    }
    if (!open) document.documentElement.style.overflow = "";
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={label}
      onClose={onClose}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        // click on the backdrop (outside the panel) closes
        if (e.target === ref.current) onClose();
      }}
      className={`m-0 max-h-none max-w-none bg-transparent p-0 text-body backdrop:bg-[rgba(4,9,16,0.66)] ${className}`}
    >
      {children}
    </dialog>
  );
}
