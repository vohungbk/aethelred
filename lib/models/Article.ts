import { Schema, model, models, type InferSchemaType } from "mongoose";

const articleSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    coverImage: {
      url: { type: String },
      alt: { type: String },
    },
    body: { type: String, required: true },
    author: {
      name: { type: String, required: true },
    },
    publishedAt: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
      index: true,
    },
  },
  { timestamps: true },
);

export type ArticleDocument = InferSchemaType<typeof articleSchema>;
export const Article = models.Article ?? model("Article", articleSchema);
