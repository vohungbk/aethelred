import Link from "next/link";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { auth } from "@/lib/auth";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/collections", label: "Collections" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/journal", label: "Journal" },
];

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    // proxy.ts already redirects non-admins away from /admin/**; this is defense-in-depth.
    redirect("/");
  }

  return (
    <div className="flex flex-col gap-8 py-10">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-heading-2 text-text-secondary">Admin</h1>
          <nav aria-label="Admin" className="flex flex-wrap gap-6">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-nav text-link hover:text-link-hover transition-colors duration-150"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
      <Container>{children}</Container>
    </div>
  );
}
