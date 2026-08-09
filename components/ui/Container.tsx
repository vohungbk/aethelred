import { type HTMLAttributes } from "react";

export function Container({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`mx-auto w-full max-w-360 px-6 sm:px-8 lg:px-12 ${className}`} {...props} />
  );
}
