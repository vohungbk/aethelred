"use server";

import { dbConnect } from "@/lib/db/connect";
import { NewsletterSubscriber } from "@/lib/models/NewsletterSubscriber";

export interface NewsletterFormState {
  status: "idle" | "success" | "error";
  message?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function subscribeToNewsletter(
  _prevState: NewsletterFormState,
  formData: FormData,
): Promise<NewsletterFormState> {
  const email = String(formData.get("email") ?? "")
    .toLowerCase()
    .trim();

  if (!EMAIL_PATTERN.test(email)) {
    return { status: "error", message: "Enter a valid email address." };
  }

  await dbConnect();
  await NewsletterSubscriber.updateOne(
    { email },
    { $setOnInsert: { email, subscribedAt: new Date(), source: "footer" } },
    { upsert: true },
  );

  return { status: "success", message: "You're on the list." };
}
