"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import type { AdminFormState } from "@/features/admin/products/actions";

const initialState: AdminFormState = { status: "idle" };

export interface ProductFormValues {
  slug?: string;
  name?: string;
  descriptor?: string;
  description?: string;
  collectionId?: string;
  category?: string;
  basePriceDollars?: string;
  images?: string;
  isCustomizable?: boolean;
  status?: string;
  featured?: boolean;
  featuredOrder?: number;
  tags?: string;
  seoTitle?: string;
  seoDescription?: string;
}

interface ProductFormProps {
  action: (state: AdminFormState, formData: FormData) => Promise<AdminFormState>;
  collections: { id: string; name: string }[];
  categories: readonly string[];
  initialValues?: ProductFormValues;
  submitLabel: string;
}

export function ProductForm({
  action,
  collections,
  categories,
  initialValues = {},
  submitLabel,
}: ProductFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input label="Slug" name="slug" defaultValue={initialValues.slug} required />
        <Input label="Name" name="name" defaultValue={initialValues.name} required />
      </div>
      <Input label="Descriptor" name="descriptor" defaultValue={initialValues.descriptor} />
      <Textarea
        label="Description"
        name="description"
        defaultValue={initialValues.description}
        rows={3}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Select
          label="Collection"
          name="collectionId"
          defaultValue={initialValues.collectionId ?? ""}
          required
        >
          <option value="">Select a collection</option>
          {collections.map((collection) => (
            <option key={collection.id} value={collection.id}>
              {collection.name}
            </option>
          ))}
        </Select>
        <Select
          label="Category"
          name="category"
          defaultValue={initialValues.category ?? ""}
          required
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Base price (USD)"
          name="basePrice"
          type="number"
          step="0.01"
          min="0"
          defaultValue={initialValues.basePriceDollars}
          required
        />
        <Select label="Status" name="status" defaultValue={initialValues.status ?? "draft"}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </Select>
      </div>

      <Textarea
        label="Images (one per line: url|alt text)"
        name="images"
        defaultValue={initialValues.images}
        rows={3}
      />
      <Input label="Tags (comma-separated)" name="tags" defaultValue={initialValues.tags} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input label="SEO title" name="seoTitle" defaultValue={initialValues.seoTitle} />
        <Input
          label="SEO description"
          name="seoDescription"
          defaultValue={initialValues.seoDescription}
        />
      </div>

      <div className="flex flex-wrap items-end gap-6">
        <label className="text-meta text-text-secondary flex items-center gap-2">
          <input
            type="checkbox"
            name="isCustomizable"
            defaultChecked={initialValues.isCustomizable}
          />
          Customizable
        </label>
        <label className="text-meta text-text-secondary flex items-center gap-2">
          <input type="checkbox" name="featured" defaultChecked={initialValues.featured} />
          Featured
        </label>
        <Input
          label="Featured order"
          name="featuredOrder"
          type="number"
          defaultValue={initialValues.featuredOrder}
          className="w-32"
        />
      </div>

      <p role="alert" aria-live="polite" className="text-meta min-h-[1em]">
        {state.status === "error" && <span className="text-status-error">{state.message}</span>}
        {state.status === "idle" && state.message && (
          <span className="text-status-success">{state.message}</span>
        )}
      </p>

      <div>
        <Button type="submit" variant="solid" disabled={pending}>
          {pending ? "Saving…" : submitLabel}
        </Button>
      </div>
    </form>
  );
}
