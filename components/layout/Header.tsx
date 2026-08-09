import Link from "next/link";
import { CollectionsDropdown } from "@/components/features/navigation/CollectionsDropdown";
import { MobileNav } from "@/components/features/navigation/MobileNav";
import { ThemeToggle } from "@/components/features/theme/ThemeToggle";
import { Container } from "@/components/ui/Container";
import { IconLink } from "@/components/ui/IconLink";
import { Logo } from "@/components/ui/Logo";
import { BagIcon, SearchIcon, UserIcon } from "@/components/ui/icons";
import { mockCollections } from "@/lib/mock/collections";

export function Header({ cartCount = 0 }: { cartCount?: number }) {
  return (
    <header className="border-border bg-bg sticky top-0 z-30 border-b">
      <Container>
        <div className="grid h-20 grid-cols-[auto_1fr_auto] items-center lg:grid-cols-[1fr_auto_1fr]">
          <div className="flex items-center gap-8">
            <MobileNav />
            <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
              <Link
                href="/our-story"
                className="text-nav text-link hover:text-link-hover transition-colors duration-150"
              >
                Our Story
              </Link>
              <CollectionsDropdown collections={mockCollections} />
              <Link
                href="/the-atelier"
                className="text-nav text-link hover:text-link-hover transition-colors duration-150"
              >
                The Atelier
              </Link>
            </nav>
          </div>

          <div className="flex justify-center">
            <Logo />
          </div>

          <div className="flex items-center justify-end gap-1">
            <div className="hidden items-center gap-1 lg:flex">
              <IconLink href="/search" label="Search">
                <SearchIcon className="h-5 w-5" />
              </IconLink>
              <IconLink href="/account" label="Account">
                <UserIcon className="h-5 w-5" />
              </IconLink>
              <IconLink href="/cart" label="Shopping bag" badge={cartCount}>
                <BagIcon className="h-5 w-5" />
              </IconLink>
              <ThemeToggle />
            </div>
            <IconLink href="/cart" label="Shopping bag" badge={cartCount} className="lg:hidden">
              <BagIcon className="h-5 w-5" />
            </IconLink>
          </div>
        </div>
      </Container>
    </header>
  );
}
