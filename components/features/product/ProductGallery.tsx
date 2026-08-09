"use client";

import { useState } from "react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

interface ProductGalleryProps {
  productName: string;
  viewCount?: number;
}

export function ProductGallery({ productName, viewCount = 3 }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const views = Array.from({ length: viewCount }, (_, index) => index);

  return (
    <div className="flex flex-col gap-3">
      <ImagePlaceholder aspect="aspect-square" label={`${productName} — view ${activeIndex + 1}`} />
      {views.length > 1 && (
        <div className="flex gap-3">
          {views.map((index) => (
            <button
              key={index}
              type="button"
              aria-label={`Show view ${index + 1}`}
              aria-current={index === activeIndex}
              onClick={() => setActiveIndex(index)}
              className={`focus-visible:outline-accent-gold w-20 shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 ${
                index === activeIndex ? "outline-accent-gold-large outline-2" : ""
              }`}
            >
              <ImagePlaceholder aspect="aspect-square" label={`${index + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
