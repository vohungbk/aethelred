import Link from "next/link";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

interface HeroProps {
  headline: string[];
  ctaLabel: string;
  ctaHref: string;
}

export function Hero({ headline, ctaLabel, ctaHref }: HeroProps) {
  return (
    <div className="relative flex h-[70vh] min-h-104 flex-col">
      <ImagePlaceholder
        aspect="aspect-auto"
        label="Living room interior"
        className="absolute inset-0 h-full w-full border-0"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black/70 via-black/10 to-transparent"
        aria-hidden="true"
      />
      <div data-theme="dark" className="relative mt-auto flex flex-col gap-4 p-6 sm:p-10 lg:p-14">
        <h1 className="text-display-h1 text-text-primary">
          {headline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>
        <Link
          href={ctaHref}
          className="text-nav text-link hover:text-link-hover inline-flex w-fit items-center underline decoration-1 underline-offset-4 transition-colors duration-150"
        >
          {ctaLabel}
        </Link>
      </div>
    </div>
  );
}
