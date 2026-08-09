import { Schema, model, models, type InferSchemaType } from "mongoose";

const collectionSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    editorialBody: { type: String },
    sortOrder: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export type CollectionDocument = InferSchemaType<typeof collectionSchema>;
export const Collection = models.Collection ?? model("Collection", collectionSchema);
