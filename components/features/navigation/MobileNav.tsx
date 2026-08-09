"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/features/theme/ThemeToggle";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { mockCollections } from "@/lib/mock/collections";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="text-text-primary inline-flex h-11 w-11 items-center justify-center lg:hidden"
      >
        <MenuIcon className="h-5 w-5" />
      </button>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        aria-label="Site navigation"
        className="bg-bg text-text-primary m-0 h-full max-h-none w-full max-w-none p-6 backdrop:bg-black/40"
      >
        <div className="flex items-center justify-between">
          <span className="text-display text-accent-gold-large">Aethelred</span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="inline-flex h-11 w-11 items-center justify-center"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <nav aria-label="Primary" className="mt-10 flex flex-col gap-6">
          <Link
            href="/our-story"
            className="text-heading-3 text-link hover:text-link-hover"
            onClick={() => setOpen(false)}
          >
            Our Story
          </Link>

          <div className="flex flex-col gap-3">
            <span className="text-heading-3 text-text-primary">Collections</span>
            <div className="flex flex-col gap-3 pl-2">
              {mockCollections.map((collection) => (
                <Link
                  key={collection.slug}
                  href={`/collections/${collection.slug}`}
                  className="text-body text-link hover:text-link-hover"
                  onClick={() => setOpen(false)}
                >
                  {collection.name}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/the-atelier"
            className="text-heading-3 text-link hover:text-link-hover"
            onClick={() => setOpen(false)}
          >
            The Atelier
          </Link>
        </nav>

        <div className="border-border mt-10 flex items-center gap-6 border-t pt-6">
          <Link
            href="/search"
            className="text-nav text-link hover:text-link-hover"
            onClick={() => setOpen(false)}
          >
            Search
          </Link>
          <Link
            href="/account"
            className="text-nav text-link hover:text-link-hover"
            onClick={() => setOpen(false)}
          >
            Account
          </Link>
          <Link
            href="/cart"
            className="text-nav text-link hover:text-link-hover"
            onClick={() => setOpen(false)}
          >
            Bag
          </Link>
          <ThemeToggle />
        </div>
      </dialog>
    </>
  );
}
