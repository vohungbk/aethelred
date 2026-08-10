"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import type { AdminFormState } from "@/features/admin/orders/actions";
import { ORDER_STATUSES } from "@/types/order";

const initialState: AdminFormState = { status: "idle" };

interface OrderStatusFormProps {
  action: (state: AdminFormState, formData: FormData) => Promise<AdminFormState>;
  currentStatus: string;
}

export function OrderStatusForm({ action, currentStatus }: OrderStatusFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="flex flex-wrap items-end gap-4">
      <Select label="Status" name="status" defaultValue={currentStatus} className="w-56">
        {ORDER_STATUSES.map((option) => (
          <option key={option} value={option}>
            {option.replace("_", " ")}
          </option>
        ))}
      </Select>
      <Button type="submit" variant="solid" disabled={pending}>
        {pending ? "Updating…" : "Update Status"}
      </Button>
      <p role="alert" aria-live="polite" className="text-meta min-h-[1em] basis-full">
        {state.status === "error" && <span className="text-status-error">{state.message}</span>}
        {state.status === "idle" && state.message && (
          <span className="text-status-success">{state.message}</span>
        )}
      </p>
    </form>
  );
}
