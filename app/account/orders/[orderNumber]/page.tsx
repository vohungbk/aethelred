import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { auth } from "@/lib/auth";
import { dbConnect } from "@/lib/db/connect";
import { Order } from "@/lib/models/Order";
import { formatPrice } from "@/lib/utils/price";
import type { OrderLean } from "@/types/order";

interface OrderDetailPageProps {
  params: Promise<{ orderNumber: string }>;
}

export async function generateMetadata({ params }: OrderDetailPageProps): Promise<Metadata> {
  const { orderNumber } = await params;
  return { title: `Order ${orderNumber} — Aethelred` };
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { orderNumber } = await params;
  const session = await auth();

  await dbConnect();
  const order = (await Order.findOne({
    orderNumber,
    userId: session!.user.id,
  }).lean()) as OrderLean | null;
  if (!order) notFound();

  return (
    <Container className="flex flex-col gap-10 py-16 sm:py-24">
      <div className="flex flex-col gap-2">
        <Link
          href="/account/orders"
          className="text-meta text-link hover:text-link-hover underline decoration-1 underline-offset-4"
        >
          ← All orders
        </Link>
        <h1 className="text-display-h1 text-text-primary">{order.orderNumber}</h1>
        <p className="text-meta text-text-muted capitalize">{order.status.replace("_", " ")}</p>
      </div>

      <div className="divide-border flex flex-col divide-y">
        {order.items.map((item, index) => (
          <div
            key={`${item.sku ?? item.name}-${index}`}
            className="flex flex-wrap items-center justify-between gap-4 py-6"
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
    </Container>
  );
}
