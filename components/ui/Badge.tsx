import { type HTMLAttributes } from "react";

export function Badge({ className = "", children, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={`text-meta border-accent-gold text-text-primary inline-flex items-center border px-2.5 py-1 ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
