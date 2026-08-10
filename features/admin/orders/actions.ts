"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth-guard";
import { dbConnect } from "@/lib/db/connect";
import { Order } from "@/lib/models/Order";
import { ORDER_STATUSES } from "@/types/order";

export interface AdminFormState {
  status: "idle" | "error";
  message?: string;
}

export async function updateOrderStatus(
  orderNumber: string,
  _prevState: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  await requireAdmin();
  const nextStatus = String(formData.get("status") ?? "");

  if (!ORDER_STATUSES.includes(nextStatus as (typeof ORDER_STATUSES)[number])) {
    return { status: "error", message: "Invalid status." };
  }

  await dbConnect();
  const order = await Order.findOneAndUpdate({ orderNumber }, { status: nextStatus });
  if (!order) {
    return { status: "error", message: "Order not found." };
  }

  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderNumber}`);
  return { status: "idle", message: "Order updated." };
}
