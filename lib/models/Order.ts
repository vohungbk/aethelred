import { Schema, model, models, type InferSchemaType } from "mongoose";

const orderItemSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    variantId: { type: Schema.Types.ObjectId, ref: "Variant" },
    sku: { type: String },
    name: { type: String, required: true },
    variantLabel: { type: String },
    unitPrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { type: String },
  },
  { _id: false },
);

const addressSchema = new Schema(
  {
    name: { type: String },
    line1: { type: String },
    line2: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: String },
    country: { type: String },
  },
  { _id: false },
);

const orderSchema = new Schema(
  {
    orderNumber: { type: String, required: true, unique: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    items: { type: [orderItemSchema], required: true },
    subtotal: { type: Number, required: true },
    shippingCost: { type: Number, required: true },
    tax: { type: Number, default: 0 },
    total: { type: Number, required: true },
    currency: { type: String, default: "usd" },
    shippingAddress: { type: addressSchema },
    billingAddress: { type: addressSchema },
    status: {
      type: String,
      enum: ["pending", "paid", "in_production", "shipped", "delivered", "cancelled", "refunded"],
      default: "pending",
      index: true,
    },
    paymentProvider: { type: String, default: "stripe" },
    stripeCheckoutSessionId: { type: String, index: true },
    paymentIntentId: { type: String },
    paymentStatus: { type: String, enum: ["unpaid", "paid", "refunded"], default: "unpaid" },
  },
  { timestamps: true },
);

export type OrderDocument = InferSchemaType<typeof orderSchema>;
export const Order = models.Order ?? model("Order", orderSchema);
