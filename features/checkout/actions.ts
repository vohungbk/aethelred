"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { SHIPPING_FLAT_RATE_CENTS } from "@/lib/constants/shipping";
import { dbConnect } from "@/lib/db/connect";
import { Order } from "@/lib/models/Order";
import { Product } from "@/lib/models/Product";
import { Variant } from "@/lib/models/Variant";
import { getStripe } from "@/lib/stripe";
import { generateOrderNumber } from "@/lib/utils/orderNumber";
import type { VariantAttributes } from "@/types/product";

export interface CheckoutLineInput {
  productSlug: string;
  variantSku?: string;
  quantity: number;
}

export interface CheckoutResult {
  url?: string;
  error?: string;
}

interface LeanProductForCheckout {
  _id: unknown;
  name: string;
  basePrice: number;
}

interface LeanVariantForCheckout {
  _id: unknown;
  sku: string;
  priceDelta: number;
  inStock: boolean;
  attributes?: VariantAttributes;
}

interface CheckoutOrderItem {
  productId: unknown;
  variantId?: unknown;
  sku?: string;
  name: string;
  variantLabel?: string;
  unitPrice: number;
  quantity: number;
}

const MAX_LINE_QUANTITY = 20;

async function getBaseUrl() {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host");
  const protocol =
    requestHeaders.get("x-forwarded-proto") ?? (host?.startsWith("localhost") ? "http" : "https");
  return `${protocol}://${host}`;
}

// Re-derives price/name/availability from the database for every line — the client
// only ever supplies slug/sku/quantity, never trust a client-sent unitPrice for payment.
export async function createCheckoutSession(lines: CheckoutLineInput[]): Promise<CheckoutResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "You must be signed in to check out." };
  }

  if (lines.length === 0) {
    return { error: "Your bag is empty." };
  }

  await dbConnect();

  const orderItems: CheckoutOrderItem[] = [];

  for (const line of lines) {
    const quantity = Math.min(Math.max(Math.trunc(line.quantity), 1), MAX_LINE_QUANTITY);

    const product = (await Product.findOne({
      slug: line.productSlug,
      status: "published",
    }).lean()) as LeanProductForCheckout | null;
    if (!product) {
      return { error: "A product in your bag is no longer available." };
    }

    let unitPrice = product.basePrice;
    let variantLabel: string | undefined;
    let variantId: unknown;
    let sku: string | undefined;

    if (line.variantSku) {
      const variant = (await Variant.findOne({
        sku: line.variantSku,
        productId: product._id,
      }).lean()) as LeanVariantForCheckout | null;
      if (!variant || !variant.inStock) {
        return { error: `"${product.name}" — the selected option is no longer available.` };
      }
      unitPrice += variant.priceDelta;
      variantLabel = Object.values(variant.attributes ?? {}).find(Boolean);
      variantId = variant._id;
      sku = variant.sku;
    }

    orderItems.push({
      productId: product._id,
      variantId,
      sku,
      name: product.name,
      variantLabel,
      unitPrice,
      quantity,
    });
  }

  const subtotal = orderItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const shippingCost = SHIPPING_FLAT_RATE_CENTS;
  const total = subtotal + shippingCost;

  const order = await Order.create({
    orderNumber: generateOrderNumber(),
    userId: session.user.id,
    items: orderItems,
    subtotal,
    shippingCost,
    tax: 0,
    total,
    currency: "usd",
    status: "pending",
    paymentProvider: "stripe",
    paymentStatus: "unpaid",
  });

  const baseUrl = await getBaseUrl();

  const checkoutSession = await getStripe().checkout.sessions.create({
    mode: "payment",
    customer_email: session.user.email ?? undefined,
    automatic_tax: { enabled: true },
    shipping_address_collection: { allowed_countries: ["US", "CA"] },
    line_items: [
      ...orderItems.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: "usd",
          unit_amount: item.unitPrice,
          product_data: {
            name: item.variantLabel ? `${item.name} — ${item.variantLabel}` : item.name,
          },
        },
      })),
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: shippingCost,
          product_data: { name: "White-Glove Delivery" },
        },
      },
    ],
    success_url: `${baseUrl}/checkout/success?order=${order.orderNumber}`,
    cancel_url: `${baseUrl}/checkout`,
    metadata: { orderId: order._id.toString(), orderNumber: order.orderNumber },
  });

  order.stripeCheckoutSessionId = checkoutSession.id;
  await order.save();

  if (!checkoutSession.url) {
    return { error: "Could not start checkout. Please try again." };
  }

  return { url: checkoutSession.url };
}
