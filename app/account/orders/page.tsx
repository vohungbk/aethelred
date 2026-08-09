import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { auth } from "@/lib/auth";
import { dbConnect } from "@/lib/db/connect";
import { Order } from "@/lib/models/Order";
import { formatPrice } from "@/lib/utils/price";
import type { OrderLean } from "@/types/order";

export const metadata: Metadata = {
  title: "Order History — Aethelred",
};

export default async function OrdersPage() {
  const session = await auth();

  await dbConnect();
  const orders = (await Order.find({ userId: session!.user.id })
    .sort({ createdAt: -1 })
    .lean()) as OrderLean[];

  return (
    <Container className="flex flex-col gap-10 py-16 sm:py-24">
      <h1 className="text-display-h1 text-text-primary">Order History</h1>

      {orders.length === 0 ? (
        <p className="text-body text-text-secondary">You haven&rsquo;t placed any orders yet.</p>
      ) : (
        <div className="divide-border flex flex-col divide-y">
          {orders.map((order) => (
            <Link
              key={order.orderNumber}
              href={`/account/orders/${order.orderNumber}`}
              className="flex flex-wrap items-center justify-between gap-4 py-6 transition-opacity duration-150 hover:opacity-70"
            >
              <div className="flex flex-col gap-1">
                <p className="text-heading-3 text-text-primary">{order.orderNumber}</p>
                <p className="text-meta text-text-muted capitalize">
                  {order.status.replace("_", " ")}
                </p>
              </div>
              <p className="text-price text-text-primary">{formatPrice(order.total)}</p>
            </Link>
          ))}
        </div>
      )}
    </Container>
  );
}
