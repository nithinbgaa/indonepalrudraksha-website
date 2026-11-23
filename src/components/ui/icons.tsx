// Line icons from the design (24×24, stroke = currentColor).
type P = { size?: number; className?: string; strokeWidth?: number };

const svg = (d: React.ReactNode, { size = 20, className, strokeWidth = 1.8 }: P) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className={className}
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {d}
  </svg>
);

export const ChevronLeft = (p: P) => svg(<path d="M15 6l-6 6 6 6" />, p);
export const ChevronRight = (p: P) => svg(<path d="M9 6l6 6-6 6" />, p);
export const ArrowRight = (p: P) => svg(<path d="M5 12h14M13 6l6 6-6 6" />, { strokeWidth: 2, ...p });
export const Minus = (p: P) => svg(<path d="M6 12h12" />, { strokeWidth: 2, ...p });
export const Plus = (p: P) => svg(<path d="M6 12h12M12 6v12" />, { strokeWidth: 2, ...p });
export const Close = (p: P) => svg(<path d="M6 6l12 12M18 6L6 18" />, p);
export const PhoneIcon = (p: P) =>
  svg(
    <path d="M5 4h3.5l1.6 4.2-2.2 1.4a11 11 0 0 0 6.5 6.5l1.4-2.2L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4z" />,
    p,
  );
export const Check = (p: P) => svg(<path d="M5 12.5l4.5 4.5L19 7.5" />, p);
export const Search = (p: P) =>
  svg(
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </>,
    { strokeWidth: 1.6, ...p },
  );
export const Bag = (p: P) =>
  svg(
    <>
      <path d="M5 8h14l-1.2 11.2a1 1 0 0 1-1 .8H7.2a1 1 0 0 1-1-.8L5 8z" />
      <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
    </>,
    p,
  );
export const Trash = (p: P) =>
  svg(<path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3" />, {
    strokeWidth: 1.7,
    ...p,
  });
export const Mountains = (p: P) => svg(<path d="M3 19l6-10 4 6 3-4 5 8H3z" />, { strokeWidth: 1.5, ...p });
export const Shield = (p: P) =>
  svg(
    <>
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </>,
    { strokeWidth: 1.5, ...p },
  );
export const Truck = (p: P) =>
  svg(
    <>
      <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="17" cy="18" r="1.6" />
    </>,
    { strokeWidth: 1.5, ...p },
  );

export function WhatsAppIcon({ size = 20, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91A9.85 9.85 0 0 0 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24a8.24 8.24 0 0 1 8.24 8.25c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.29z" />
    </svg>
  );
}

export const Pause = (p: P) => svg(<path d="M8 5v14M16 5v14" />, { strokeWidth: 2.2, ...p });
export const Play = (p: P) => svg(<path d="M7 5l12 7-12 7z" fill="currentColor" />, { strokeWidth: 1.6, ...p });
