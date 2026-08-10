import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductForm } from "@/components/features/admin/ProductForm";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { addVariant, deleteVariant, updateProduct } from "@/features/admin/products/actions";
import { PRODUCT_CATEGORIES } from "@/lib/constants/catalog";
import { getAdminProductById, listAdminCollectionOptions } from "@/lib/queries/admin";
import { formatPrice } from "@/lib/utils/price";

interface AdminProductPageProps {
  params: Promise<{ productId: string }>;
}

export async function generateMetadata({ params }: AdminProductPageProps): Promise<Metadata> {
  const { productId } = await params;
  const result = await getAdminProductById(productId);
  return { title: result ? `Admin · ${result.product.name} — Aethelred` : "Admin · Product" };
}

export default async function AdminProductPage({ params }: AdminProductPageProps) {
  const { productId } = await params;
  const [result, collections] = await Promise.all([
    getAdminProductById(productId),
    listAdminCollectionOptions(),
  ]);
  if (!result) notFound();

  const { product, variants } = result;
  const boundUpdate = updateProduct.bind(null, product.id);
  const boundAddVariant = addVariant.bind(null, product.id);

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-8">
        <h2 className="text-display-h1 text-text-primary">{product.name}</h2>
        <ProductForm
          action={boundUpdate}
          collections={collections}
          categories={PRODUCT_CATEGORIES}
          submitLabel="Save Changes"
          initialValues={{
            slug: product.slug,
            name: product.name,
            descriptor: product.descriptor,
            description: product.description,
            collectionId: product.collectionId,
            category: product.category,
            basePriceDollars: (product.basePrice / 100).toFixed(2),
            images: product.images.map((image) => `${image.url}|${image.alt}`).join("\n"),
            isCustomizable: product.isCustomizable,
            status: product.status,
            featured: product.featured,
            featuredOrder: product.featuredOrder,
            tags: product.tags.join(", "),
            seoTitle: product.seo.title,
            seoDescription: product.seo.description,
          }}
        />
      </div>

      <div className="flex flex-col gap-6">
        <h3 className="text-heading-2 text-text-secondary">Variants</h3>

        {variants.length > 0 && (
          <div className="divide-border flex flex-col divide-y">
            {variants.map((variant) => (
              <div
                key={variant.id}
                className="flex flex-wrap items-center justify-between gap-4 py-4"
              >
                <div className="flex flex-col gap-1">
                  <p className="text-heading-3 text-text-primary">{variant.sku}</p>
                  <p className="text-meta text-text-muted">
                    {Object.values(variant.attributes).filter(Boolean).join(" · ") || "—"} ·{" "}
                    {formatPrice(variant.priceDelta)} ·{" "}
                    {variant.inStock ? "In stock" : "Unavailable"}
                  </p>
                </div>
                <form action={deleteVariant.bind(null, variant.id, product.id)}>
                  <Button type="submit" variant="outline" size="sm">
                    Delete
                  </Button>
                </form>
              </div>
            ))}
          </div>
        )}

        <form action={boundAddVariant} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Input label="SKU" name="sku" required />
          <Input label="Fabric" name="fabric" />
          <Input label="Finish" name="finish" />
          <Input label="Size" name="size" />
          <Input label="Leg color" name="legColor" />
          <Input
            label="Price delta (USD)"
            name="priceDelta"
            type="number"
            step="0.01"
            defaultValue="0"
          />
          <Select label="Fulfillment" name="fulfillmentType" defaultValue="made-to-order">
            <option value="in-stock">In stock</option>
            <option value="made-to-order">Made to order</option>
          </Select>
          <Input label="Lead time (days)" name="leadTimeDays" type="number" min="0" />
          <label className="text-meta text-text-secondary flex items-center gap-2 self-end pb-2.5">
            <input type="checkbox" name="inStock" defaultChecked />
            In stock
          </label>
          <div className="self-end">
            <Button type="submit" variant="outline">
              Add Variant
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
