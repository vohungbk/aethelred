import Link from "next/link";
import type { Metadata } from "next";
import { listAdminOrders } from "@/lib/queries/admin";
import { formatPrice } from "@/lib/utils/price";

export const metadata: Metadata = {
  title: "Admin · Orders — Aethelred",
};

export default async function AdminOrdersPage() {
  const orders = await listAdminOrders();

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-display-h1 text-text-primary">Orders</h2>

      {orders.length === 0 ? (
        <p className="text-body text-text-secondary">No orders yet.</p>
      ) : (
        <div className="divide-border flex flex-col divide-y">
          {orders.map((order) => (
            <Link
              key={order.orderNumber}
              href={`/admin/orders/${order.orderNumber}`}
              className="flex flex-wrap items-center justify-between gap-4 py-4 transition-opacity duration-150 hover:opacity-70"
            >
              <div className="flex flex-col gap-1">
                <p className="text-heading-3 text-text-primary">{order.orderNumber}</p>
                <p className="text-meta text-text-muted">
                  {order.customerEmail} ·{" "}
                  <span className="capitalize">{order.status.replace("_", " ")}</span>
                </p>
              </div>
              <p className="text-price text-text-primary">{formatPrice(order.total)}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
