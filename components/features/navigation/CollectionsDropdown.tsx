"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDownIcon } from "@/components/ui/icons";
import type { CollectionSummary } from "@/lib/mock/collections";

export function CollectionsDropdown({ collections }: { collections: CollectionSummary[] }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="text-nav text-link hover:text-link-hover inline-flex items-center gap-1.5 transition-colors duration-150"
      >
        Collections
        <ChevronDownIcon
          className={`h-2 w-3 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div
          id={panelId}
          className="border-border bg-surface absolute top-full left-1/2 z-20 flex w-56 -translate-x-1/2 flex-col gap-1 border p-3 shadow-lg"
        >
          {collections.map((collection) => (
            <Link
              key={collection.slug}
              href={`/collections/${collection.slug}`}
              className="text-body text-link hover:text-link-hover px-2 py-1.5 transition-colors duration-150"
              onClick={() => setOpen(false)}
            >
              {collection.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
