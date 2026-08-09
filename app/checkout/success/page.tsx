import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { auth } from "@/lib/auth";
import { dbConnect } from "@/lib/db/connect";
import { Order } from "@/lib/models/Order";
import { formatPrice } from "@/lib/utils/price";
import type { OrderLean } from "@/types/order";

export const metadata: Metadata = {
  title: "Order Confirmed — Aethelred",
};

interface CheckoutSuccessPageProps {
  searchParams: Promise<{ order?: string }>;
}

export default async function CheckoutSuccessPage({ searchParams }: CheckoutSuccessPageProps) {
  const { order: orderNumber } = await searchParams;
  const session = await auth();
  if (!orderNumber || !session?.user?.id) notFound();

  await dbConnect();
  const order = (await Order.findOne({
    orderNumber,
    userId: session.user.id,
  }).lean()) as OrderLean | null;
  if (!order) notFound();

  return (
    <Container className="flex flex-col items-start gap-6 py-16 sm:py-24">
      <h1 className="text-display-h1 text-text-primary">Thank You</h1>
      <p className="text-body text-text-secondary">
        Your order <span className="text-text-primary">{order.orderNumber}</span> has been placed.{" "}
        {order.paymentStatus === "paid"
          ? "Payment confirmed — we'll begin production shortly."
          : "We're confirming your payment; this page will reflect the final status shortly."}
      </p>
      <p className="text-heading-3 text-text-primary">Total: {formatPrice(order.total)}</p>
      <Link
        href="/account/orders"
        className="text-link hover:text-link-hover underline decoration-1 underline-offset-4"
      >
        View order history
      </Link>
    </Container>
  );
}
