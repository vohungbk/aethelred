import { Schema, model, models, type InferSchemaType } from "mongoose";

const addressSchema = new Schema(
  {
    label: { type: String },
    line1: { type: String, required: true },
    line2: { type: String },
    city: { type: String, required: true },
    state: { type: String },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String },
  },
  { _id: false },
);

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    name: { type: String, required: true },
    passwordHash: { type: String },
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
    authProviders: { type: [String], default: [] },
    image: { type: String },
    addresses: { type: [addressSchema], default: [] },
  },
  { timestamps: true },
);

export type UserDocument = InferSchemaType<typeof userSchema>;
export const User = models.User ?? model("User", userSchema);
