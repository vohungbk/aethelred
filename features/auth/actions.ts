"use server";

import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { signIn } from "@/lib/auth";
import { dbConnect } from "@/lib/db/connect";
import { User } from "@/lib/models/User";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface AuthFormState {
  status: "idle" | "error";
  message?: string;
}

const initialState: AuthFormState = { status: "idle" };

export async function registerUser(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "")
    .toLowerCase()
    .trim();
  const password = String(formData.get("password") ?? "");
  const callbackUrl = String(formData.get("callbackUrl") ?? "/account");

  if (name.length < 2) {
    return { status: "error", message: "Enter your full name." };
  }
  if (!EMAIL_PATTERN.test(email)) {
    return { status: "error", message: "Enter a valid email address." };
  }
  if (password.length < 8) {
    return { status: "error", message: "Password must be at least 8 characters." };
  }

  await dbConnect();
  const existing = await User.findOne({ email }).lean();
  if (existing) {
    return { status: "error", message: "An account with this email already exists." };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await User.create({ name, email, passwordHash, authProviders: ["credentials"] });

  try {
    await signIn("credentials", { email, password, redirectTo: callbackUrl });
  } catch (error) {
    if (error instanceof AuthError) {
      return { status: "error", message: "Account created, but sign-in failed. Try logging in." };
    }
    throw error;
  }

  return initialState;
}

export async function loginWithCredentials(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "")
    .toLowerCase()
    .trim();
  const password = String(formData.get("password") ?? "");
  const callbackUrl = String(formData.get("callbackUrl") ?? "/account");

  try {
    await signIn("credentials", { email, password, redirectTo: callbackUrl });
  } catch (error) {
    if (error instanceof AuthError) {
      return { status: "error", message: "Invalid email or password." };
    }
    throw error;
  }

  return initialState;
}

export async function signInWithGoogle(formData: FormData) {
  const callbackUrl = String(formData.get("callbackUrl") ?? "/account");
  await signIn("google", { redirectTo: callbackUrl });
}
