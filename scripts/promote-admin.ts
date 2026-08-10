import { config } from "dotenv";
import mongoose from "mongoose";
import { dbConnect } from "../lib/db/connect";
import { User } from "../lib/models/User";

config({ path: ".env.local" });

const email = process.argv[2];

async function promote() {
  if (!email) {
    console.error("Usage: npm run promote-admin -- <email>");
    process.exit(1);
  }

  await dbConnect();
  const user = await User.findOneAndUpdate(
    { email: email.toLowerCase().trim() },
    { role: "admin" },
    { new: true },
  );

  if (!user) {
    console.error(`No user found with email ${email}. Register an account first.`);
    process.exit(1);
  }

  console.log(`${user.email} is now an admin.`);
  await mongoose.disconnect();
}

promote().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
