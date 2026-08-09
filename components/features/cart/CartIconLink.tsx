"use client";

import { IconLink } from "@/components/ui/IconLink";
import { BagIcon } from "@/components/ui/icons";
import { useCartCount } from "@/stores/cartStore";

export function CartIconLink({ className = "" }: { className?: string }) {
  const count = useCartCount();

  return (
    <IconLink href="/cart" label="Shopping bag" badge={count} className={className}>
      <BagIcon className="h-5 w-5" />
    </IconLink>
  );
}
