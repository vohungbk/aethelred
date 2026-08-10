import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { listAdminProducts } from "@/lib/queries/admin";
import { formatPrice } from "@/lib/utils/price";

export const metadata: Metadata = {
  title: "Admin · Products — Aethelred",
};

export default async function AdminProductsPage() {
  const products = await listAdminProducts();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-display-h1 text-text-primary">Products</h2>
        <Link href="/admin/products/new">
          <Button type="button" variant="solid">
            New Product
          </Button>
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-body text-text-secondary">No products yet.</p>
      ) : (
        <div className="divide-border flex flex-col divide-y">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/admin/products/${product.id}`}
              className="flex flex-wrap items-center justify-between gap-4 py-4 transition-opacity duration-150 hover:opacity-70"
            >
              <div className="flex flex-col gap-1">
                <p className="text-heading-3 text-text-primary">{product.name}</p>
                <p className="text-meta text-text-muted">
                  {product.collectionName} · <span className="capitalize">{product.status}</span>
                </p>
              </div>
              <p className="text-price text-text-primary">{formatPrice(product.basePrice)}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
