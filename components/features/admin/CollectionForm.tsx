"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import type { AdminFormState } from "@/features/admin/collections/actions";

const initialState: AdminFormState = { status: "idle" };

export interface CollectionFormValues {
  slug?: string;
  name?: string;
  heroImage?: string;
  description?: string;
  editorialBody?: string;
  sortOrder?: number;
  isVisible?: boolean;
}

interface CollectionFormProps {
  action: (state: AdminFormState, formData: FormData) => Promise<AdminFormState>;
  initialValues?: CollectionFormValues;
  submitLabel: string;
}

export function CollectionForm({ action, initialValues = {}, submitLabel }: CollectionFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input label="Slug" name="slug" defaultValue={initialValues.slug} required />
        <Input label="Name" name="name" defaultValue={initialValues.name} required />
      </div>
      <Input label="Hero image URL" name="heroImage" defaultValue={initialValues.heroImage} />
      <Textarea
        label="Description"
        name="description"
        defaultValue={initialValues.description}
        rows={3}
        required
      />
      <Textarea
        label="Editorial body"
        name="editorialBody"
        defaultValue={initialValues.editorialBody}
        rows={4}
      />
      <div className="flex flex-wrap items-end gap-6">
        <Input
          label="Sort order"
          name="sortOrder"
          type="number"
          defaultValue={initialValues.sortOrder}
          className="w-32"
        />
        <label className="text-meta text-text-secondary flex items-center gap-2">
          <input
            type="checkbox"
            name="isVisible"
            defaultChecked={initialValues.isVisible ?? true}
          />
          Visible on site
        </label>
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
