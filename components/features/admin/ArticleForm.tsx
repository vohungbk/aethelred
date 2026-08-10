"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import type { AdminFormState } from "@/features/admin/articles/actions";

const initialState: AdminFormState = { status: "idle" };

export interface ArticleFormValues {
  slug?: string;
  title?: string;
  excerpt?: string;
  coverImageUrl?: string;
  coverImageAlt?: string;
  body?: string;
  authorName?: string;
  status?: string;
}

interface ArticleFormProps {
  action: (state: AdminFormState, formData: FormData) => Promise<AdminFormState>;
  initialValues?: ArticleFormValues;
  submitLabel: string;
}

export function ArticleForm({ action, initialValues = {}, submitLabel }: ArticleFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input label="Slug" name="slug" defaultValue={initialValues.slug} required />
        <Input label="Title" name="title" defaultValue={initialValues.title} required />
      </div>
      <Textarea
        label="Excerpt"
        name="excerpt"
        defaultValue={initialValues.excerpt}
        rows={2}
        required
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Cover image URL"
          name="coverImageUrl"
          defaultValue={initialValues.coverImageUrl}
        />
        <Input
          label="Cover image alt text"
          name="coverImageAlt"
          defaultValue={initialValues.coverImageAlt}
        />
      </div>
      <Textarea label="Body" name="body" defaultValue={initialValues.body} rows={10} required />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Author name"
          name="authorName"
          defaultValue={initialValues.authorName}
          required
        />
        <Select label="Status" name="status" defaultValue={initialValues.status ?? "draft"}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </Select>
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
