import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { listAdminCollections } from "@/lib/queries/admin";

export const metadata: Metadata = {
  title: "Admin · Collections — Aethelred",
};

export default async function AdminCollectionsPage() {
  const collections = await listAdminCollections();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-display-h1 text-text-primary">Collections</h2>
        <Link href="/admin/collections/new">
          <Button type="button" variant="solid">
            New Collection
          </Button>
        </Link>
      </div>

      {collections.length === 0 ? (
        <p className="text-body text-text-secondary">No collections yet.</p>
      ) : (
        <div className="divide-border flex flex-col divide-y">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/admin/collections/${collection.id}`}
              className="flex flex-wrap items-center justify-between gap-4 py-4 transition-opacity duration-150 hover:opacity-70"
            >
              <p className="text-heading-3 text-text-primary">{collection.name}</p>
              <p className="text-meta text-text-muted">
                {collection.isVisible ? "Visible" : "Hidden"}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
