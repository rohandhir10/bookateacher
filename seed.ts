import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { createUser, getUserByEmail, getUserById, updateUser } from "./lib/db";
import { hashPassword } from "./lib/auth-utils";
import { SITE_URL } from "next/headers";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

async function main() {
  console.log("🌱 Seeding bookateacher.db...");
  const dbPath = process.env.DB_PATH ?? path.resolve(__dirname, "../../bookateacher.db");
  console.log("Using DB path:", dbPath);

  // Clear existing seed data so re-runs are idempotent
  const existingAdmin = getUserByEmail("admin@bookateacher.in");
  if (existingAdmin) {
    console.log("Admin user already exists, skipping admin seed.");
  } else {
    const adminId = crypto.randomUUID();
    createUser({
      id: adminId,
      email: "admin@bookateacher.in",
      name: "Platform Admin",
      password_hash: await hashPassword("Admin@1234"),
      role: "admin",
      verified: 1,
      status: "active",
    });
    console.log("✅ Admin user created:", adminId);
  }

  const existingTutor = getUserByEmail("rahul@tutor.example");
  if (existingTutor) {
    console.log("Sample tutor already exists, skipping tutor seed.");
  } else {
    const tutorId = crypto.randomUUID();
    createUser({
      id: tutorId,
      email: "rahul@tutor.example",
      name: "Rahul Kumar",
      password_hash: await hashPassword("Tutor@1234"),
      role: "tutor",
      phone: "+91-9876543210",
      credentials: {
        certification: "IDP Certified IELTS Trainer",
        experience_years: 8,
        teaching_style: "Interactive, practice-oriented. I focus on weak areas and mock tests.",
        background: "Ex-British Council trainer, 8 years of IELTS coaching, band 8.5 scorer.",
        verified_document_url: "https://example.com/certs/rahul-ielts.pdf",
      },
      bio: "Ex-British Council trainer with 8 years of experience helping students achieve Band 7+ in IELTS Academic and General Training.",
      hourly_rate: 800,
      subjects: ["ielts", "toefl", "spoken-english"],
      availability: {
        monday: ["morning", "evening"],
        tuesday: ["morning", "afternoon", "evening"],
        wednesday: ["morning", "evening"],
        thursday: ["afternoon", "evening"],
        friday: ["morning", "evening"],
        saturday: ["morning", "afternoon"],
        sunday: [],
      },
      verified: 1,
      status: "active",
    });
    console.log("✅ Sample tutor created:", tutorId);
  }

  const existingStudent = getUserByEmail("priya@student.example");
  if (existingStudent) {
    console.log("Sample student already exists, skipping student seed.");
  } else {
    const studentId = crypto.randomUUID();
    createUser({
      id: studentId,
      email: "priya@student.example",
      name: "Priya Mehta",
      password_hash: await hashPassword("Student@1234"),
      role: "student",
      phone: "+91-9876543211",
      bio: "Preparing for IELTS Academic. Target Band 7.5.",
      verified: 0,
      status: "active",
    });
    console.log("✅ Sample student created:", studentId);
  }

  console.log("🌱 Seed complete.");
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
