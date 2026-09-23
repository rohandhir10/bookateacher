import crypto from "node:crypto";
import { createUser, getUserByEmail } from "./src/lib/db";
import { hashPassword } from "./src/lib/auth-utils";

async function main() {
  if (process.env.NODE_ENV === "production" && process.env.ALLOW_DEMO_SEED !== "true") {
    throw new Error("Refusing to run the demo seed in production without ALLOW_DEMO_SEED=true.");
  }

  const seedPassword = process.env.SEED_PASSWORD;
  if (!seedPassword || seedPassword.length < 12) {
    throw new Error("Set SEED_PASSWORD to a value of at least 12 characters before running the seed.");
  }

  const users = [
    {
      email: "admin@bookateacher.in",
      name: "Platform Admin",
      role: "admin" as const,
      verified: 1,
      phone: null,
      subjects: null,
      bio: null,
      hourly_rate: null,
    },
    {
      email: "rahul@tutor.example",
      name: "Rahul Kumar",
      role: "tutor" as const,
      verified: 1,
      phone: "+91-9876543210",
      subjects: ["ielts", "toefl", "spoken-english"],
      bio: "IELTS-focused tutor with structured practice and targeted feedback.",
      hourly_rate: 800,
    },
    {
      email: "ananya@tutor.example",
      name: "Ananya Sharma",
      role: "tutor" as const,
      verified: 1,
      phone: "+91-9876543212",
      subjects: ["toefl", "spoken-english"],
      bio: "TOEFL and spoken English tutor focused on speaking and writing.",
      hourly_rate: 1200,
    },
    {
      email: "vikram@tutor.example",
      name: "Vikram Singh",
      role: "tutor" as const,
      verified: 1,
      phone: "+91-9876543213",
      subjects: ["ielts"],
      bio: "IELTS tutor focused on band-descriptor coaching and exam strategy.",
      hourly_rate: 1800,
    },
    {
      email: "priya@student.example",
      name: "Priya Mehta",
      role: "student" as const,
      verified: 0,
      phone: "+91-9876543211",
      subjects: null,
      bio: "Sample student account for development environments.",
      hourly_rate: null,
    },
  ];

  const passwordHash = await hashPassword(seedPassword);

  for (const user of users) {
    const existing = await getUserByEmail(user.email);
    if (existing) {
      console.log("Skipping existing seed user:", user.email);
      continue;
    }

    await createUser({
      id: crypto.randomUUID(),
      email: user.email,
      name: user.name,
      password_hash: passwordHash,
      role: user.role,
      phone: user.phone,
      subjects: user.subjects,
      bio: user.bio,
      hourly_rate: user.hourly_rate,
      verified: user.verified,
      status: "active",
    });

    console.log("Created seed user:", user.email);
  }

  console.log("Seed complete.");
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
