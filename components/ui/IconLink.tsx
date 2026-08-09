import Link from "next/link";
import type { ReactNode } from "react";

interface IconLinkProps {
  href: string;
  label: string;
  badge?: number;
  className?: string;
  children: ReactNode;
}

export function IconLink({ href, label, badge, className = "", children }: IconLinkProps) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={`text-text-primary hover:text-link-hover focus-visible:outline-accent-gold relative inline-flex h-11 w-11 items-center justify-center transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 ${className}`}
    >
      {children}
      {badge ? (
        <span className="bg-accent-gold text-primary absolute top-1.5 right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-semibold">
          {badge}
        </span>
      ) : null}
    </Link>
  );
}
