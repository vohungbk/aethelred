import { Schema, model, models, type InferSchemaType } from "mongoose";

const newsletterSubscriberSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    subscribedAt: { type: Date, default: Date.now },
    source: { type: String, default: "footer" },
  },
  { timestamps: true },
);

export type NewsletterSubscriberDocument = InferSchemaType<typeof newsletterSubscriberSchema>;
export const NewsletterSubscriber =
  models.NewsletterSubscriber ?? model("NewsletterSubscriber", newsletterSubscriberSchema);
