"use server";

export interface NewsletterFormState {
  status: "idle" | "success" | "error";
  message?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function subscribeToNewsletter(
  _prevState: NewsletterFormState,
  formData: FormData,
): Promise<NewsletterFormState> {
  const email = String(formData.get("email") ?? "").trim();

  if (!EMAIL_PATTERN.test(email)) {
    return { status: "error", message: "Enter a valid email address." };
  }

  // Simulated for Phase 2 — Phase 7 wires this to the NewsletterSubscriber model.
  await new Promise((resolve) => setTimeout(resolve, 400));

  return { status: "success", message: "You're on the list." };
}
