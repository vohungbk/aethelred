import { Schema, model, models, type InferSchemaType } from "mongoose";

const variantSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true, index: true },
    attributes: {
      fabric: { type: String },
      finish: { type: String },
      size: { type: String },
      legColor: { type: String },
    },
    sku: { type: String, required: true, unique: true },
    priceDelta: { type: Number, default: 0 },
    fulfillmentType: {
      type: String,
      enum: ["in-stock", "made-to-order"],
      default: "made-to-order",
    },
    stock: { type: Number, default: 0 },
    inStock: { type: Boolean, default: true },
    leadTimeDays: { type: Number },
  },
  { timestamps: true },
);

export type VariantDocument = InferSchemaType<typeof variantSchema>;
export const Variant = models.Variant ?? model("Variant", variantSchema);
