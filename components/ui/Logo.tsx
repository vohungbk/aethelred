import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Aethelred — home"
      className={`text-accent-gold-large inline-flex flex-col items-center gap-1 ${className}`}
    >
      <svg
        viewBox="0 0 32 32"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        aria-hidden="true"
      >
        <path d="M16 5c-.8 2.6-2.6 3.6-5 2.6 1.6 2 3.4 2 5-.4 1.6 2.4 3.4 2.4 5 .4-2.4 1-4.2 0-5-2.6Z" />
        <path d="M9 27 15.5 8h1L23 27M11.5 21h9" />
      </svg>
      <span className="text-display">Aethelred</span>
    </Link>
  );
}
