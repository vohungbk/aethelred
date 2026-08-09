import { Schema, model, models, type InferSchemaType } from "mongoose";

const productSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    descriptor: { type: String, required: true },
    description: { type: String, required: true },
    collectionId: { type: Schema.Types.ObjectId, ref: "Collection", required: true, index: true },
    category: {
      type: String,
      required: true,
      enum: ["sofa", "armchair", "bed", "table", "case-goods", "lighting", "accessory"],
      index: true,
    },
    basePrice: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    images: {
      type: [{ url: { type: String, required: true }, alt: { type: String, required: true } }],
      default: [],
    },
    isCustomizable: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "published",
      index: true,
    },
    featured: { type: Boolean, default: false, index: true },
    featuredOrder: { type: Number, default: 0 },
    tags: { type: [String], default: [] },
    seo: {
      title: { type: String },
      description: { type: String },
    },
  },
  { timestamps: true },
);

productSchema.index({ name: "text", description: "text", tags: "text" });

export type ProductDocument = InferSchemaType<typeof productSchema>;
export const Product = models.Product ?? model("Product", productSchema);
