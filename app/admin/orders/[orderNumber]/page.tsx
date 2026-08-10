import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { OrderStatusForm } from "@/components/features/admin/OrderStatusForm";
import { updateOrderStatus } from "@/features/admin/orders/actions";
import { getAdminOrderByNumber } from "@/lib/queries/admin";
import { formatPrice } from "@/lib/utils/price";

interface AdminOrderPageProps {
  params: Promise<{ orderNumber: string }>;
}

export async function generateMetadata({ params }: AdminOrderPageProps): Promise<Metadata> {
  const { orderNumber } = await params;
  return { title: `Admin · Order ${orderNumber} — Aethelred` };
}

export default async function AdminOrderPage({ params }: AdminOrderPageProps) {
  const { orderNumber } = await params;
  const order = await getAdminOrderByNumber(orderNumber);
  if (!order) notFound();

  const boundUpdate = updateOrderStatus.bind(null, orderNumber);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h2 className="text-display-h1 text-text-primary">{order.orderNumber}</h2>
        <p className="text-meta text-text-muted">
          Payment: <span className="capitalize">{order.paymentStatus}</span>
        </p>
      </div>

      <OrderStatusForm action={boundUpdate} currentStatus={order.status} />

      <div className="divide-border flex flex-col divide-y">
        {order.items.map((item, index) => (
          <div
            key={`${item.sku ?? item.name}-${index}`}
            className="flex flex-wrap items-center justify-between gap-4 py-4"
          >
            <div className="flex flex-col gap-1">
              <p className="text-heading-3 text-text-primary">{item.name}</p>
              {item.variantLabel && (
                <p className="text-meta text-text-muted">{item.variantLabel}</p>
              )}
              <p className="text-meta text-text-secondary">Qty {item.quantity}</p>
            </div>
            <p className="text-price text-text-primary">
              {formatPrice(item.unitPrice * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      <div className="border-border flex flex-col items-end gap-2 border-t pt-6">
        <p className="text-body text-text-secondary">Subtotal: {formatPrice(order.subtotal)}</p>
        <p className="text-body text-text-secondary">Shipping: {formatPrice(order.shippingCost)}</p>
        <p className="text-body text-text-secondary">Tax: {formatPrice(order.tax)}</p>
        <p className="text-heading-3 text-text-primary">Total: {formatPrice(order.total)}</p>
      </div>

      {order.shippingAddress?.line1 && (
        <div className="flex flex-col gap-1">
          <p className="text-heading-3 text-text-primary">Shipping Address</p>
          <p className="text-body text-text-secondary">{order.shippingAddress.name}</p>
          <p className="text-body text-text-secondary">
            {order.shippingAddress.line1}
            {order.shippingAddress.line2 ? `, ${order.shippingAddress.line2}` : ""}
          </p>
          <p className="text-body text-text-secondary">
            {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
            {order.shippingAddress.postalCode}
          </p>
        </div>
      )}
    </div>
  );
}
