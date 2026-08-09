import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { dbConnect } from "@/lib/db/connect";
import { Order } from "@/lib/models/Order";
import { getStripe } from "@/lib/stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: Request) {
  if (!webhookSecret) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const body = await request.text();

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${message}` },
      { status: 400 },
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    await dbConnect();
    const order = await Order.findOne({ stripeCheckoutSessionId: session.id });

    if (order) {
      if (session.payment_status === "paid") {
        order.paymentStatus = "paid";
        order.status = "in_production";
      }

      order.tax = session.total_details?.amount_tax ?? order.tax;
      order.total = session.amount_total ?? order.total;
      order.paymentIntentId =
        typeof session.payment_intent === "string"
          ? session.payment_intent
          : (session.payment_intent?.id ?? order.paymentIntentId);

      const shipping = session.collected_information?.shipping_details;
      const billing = session.customer_details;

      if (shipping) {
        order.shippingAddress = {
          name: shipping.name,
          line1: shipping.address.line1,
          line2: shipping.address.line2,
          city: shipping.address.city,
          state: shipping.address.state,
          postalCode: shipping.address.postal_code,
          country: shipping.address.country,
        };
      }

      if (billing?.address) {
        order.billingAddress = {
          name: billing.name ?? undefined,
          line1: billing.address.line1 ?? undefined,
          line2: billing.address.line2 ?? undefined,
          city: billing.address.city ?? undefined,
          state: billing.address.state ?? undefined,
          postalCode: billing.address.postal_code ?? undefined,
          country: billing.address.country ?? undefined,
        };
      } else if (shipping) {
        order.billingAddress = order.shippingAddress;
      }

      await order.save();
    }
  }

  return NextResponse.json({ received: true });
}
