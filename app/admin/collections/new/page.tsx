import type { Metadata } from "next";
import { CollectionForm } from "@/components/features/admin/CollectionForm";
import { createCollection } from "@/features/admin/collections/actions";

export const metadata: Metadata = {
  title: "Admin · New Collection — Aethelred",
};

export default function NewCollectionPage() {
  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-display-h1 text-text-primary">New Collection</h2>
      <CollectionForm action={createCollection} submitLabel="Create Collection" />
    </div>
  );
}
