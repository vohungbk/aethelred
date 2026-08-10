import type { Metadata } from "next";
import { ProductForm } from "@/components/features/admin/ProductForm";
import { createProduct } from "@/features/admin/products/actions";
import { PRODUCT_CATEGORIES } from "@/lib/constants/catalog";
import { listAdminCollectionOptions } from "@/lib/queries/admin";

export const metadata: Metadata = {
  title: "Admin · New Product — Aethelred",
};

export default async function NewProductPage() {
  const collections = await listAdminCollectionOptions();

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-display-h1 text-text-primary">New Product</h2>
      <ProductForm
        action={createProduct}
        collections={collections}
        categories={PRODUCT_CATEGORIES}
        submitLabel="Create Product"
      />
    </div>
  );
}
