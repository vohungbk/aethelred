"use client";

import { useActionState } from "react";
import { subscribeToNewsletter, type NewsletterFormState } from "@/features/newsletter/actions";
import { Input } from "@/components/ui/Input";
import { ArrowRightIcon } from "@/components/ui/icons";

const initialState: NewsletterFormState = { status: "idle" };

export function NewsletterForm() {
  const [state, formAction, pending] = useActionState(subscribeToNewsletter, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <div className="flex items-stretch">
        <div className="flex-1">
          <Input
            label="Email address"
            hideLabel
            name="email"
            type="email"
            required
            placeholder="Enter your email"
            className="w-full"
          />
        </div>
        <button
          type="submit"
          disabled={pending}
          aria-label="Subscribe"
          className="border-border bg-btn-bg text-btn-text hover:bg-btn-bg-hover disabled:bg-btn-bg-disabled disabled:text-btn-text-disabled inline-flex w-12 shrink-0 items-center justify-center border border-l-0 disabled:cursor-not-allowed"
        >
          <ArrowRightIcon className="h-4 w-4" />
        </button>
      </div>
      <p role="status" aria-live="polite" className="text-meta min-h-[1em]">
        {state.status === "error" && <span className="text-status-error">{state.message}</span>}
        {state.status === "success" && <span className="text-status-success">{state.message}</span>}
      </p>
    </form>
  );
}
