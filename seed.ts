import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { createUser, getUserByEmail, getUserById, updateUser } from "./src/lib/db";
import { hashPassword } from "./src/lib/auth-utils";

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

  // Second tutor — TOEFL/Spoken English specialist
  const existingTutor2 = getUserByEmail("ananya@tutor.example");
  if (existingTutor2) {
    console.log("Sample tutor 2 already exists, skipping.");
  } else {
    const tutorId2 = crypto.randomUUID();
    createUser({
      id: tutorId2,
      email: "ananya@tutor.example",
      name: "Ananya Sharma",
      password_hash: await hashPassword("Tutor@1234"),
      role: "tutor",
      phone: "+91-9876543212",
      credentials: {
        certification: "TESOL Certified, TOEFL iBT 112 scorer",
        experience_years: 5,
        teaching_style: "Structured, feedback-focused. I use official ETS materials and timed practice.",
        background: "5 years TOEFL and spoken English coaching. TOEFL iBT 112 (30R/30L/26S/26W). Specialises in speaking and writing.",
      },
      bio: "TESOL-certified tutor who scored 112 on TOEFL iBT. I specialise in speaking and writing — the two sections where most students lose points.",
      hourly_rate: 1200,
      subjects: ["toefl", "spoken-english"],
      availability: {
        monday: ["morning", "evening"],
        tuesday: ["afternoon", "evening"],
        wednesday: ["morning", "evening"],
        thursday: ["morning", "afternoon", "evening"],
        friday: ["evening"],
        saturday: ["morning", "afternoon"],
        sunday: [],
      },
      verified: 1,
      status: "active",
    });
    console.log("✅ Sample tutor 2 created:", tutorId2);
  }

  // Third tutor — IELTS specialist with premium rate
  const existingTutor3 = getUserByEmail("vikram@tutor.example");
  if (existingTutor3) {
    console.log("Sample tutor 3 already exists, skipping.");
  } else {
    const tutorId3 = crypto.randomUUID();
    createUser({
      id: tutorId3,
      email: "vikram@tutor.example",
      name: "Vikram Singh",
      password_hash: await hashPassword("Tutor@1234"),
      role: "tutor",
      phone: "+91-9876543213",
      credentials: {
        certification: "IDP Certified IELTS Trainer, C1 Advanced (CAE)",
        experience_years: 11,
        teaching_style: "Intensive, score-obsessed. I break down every band descriptor and coach to it.",
        background: "11 years IELTS coaching. Former head of test prep at a Delhi coaching centre. 200+ students to Band 7+. IELTS Band 8.5 (8.5R/9.0L/8.0S/8.0W).",
      },
      bio: "11-year IELTS veteran who coaches to the band descriptors. If you're stuck at 6.5 and need 7.5+, I'll show you exactly what the examiners are looking for.",
      hourly_rate: 1800,
      subjects: ["ielts"],
      availability: {
        monday: ["morning"],
        tuesday: ["morning", "evening"],
        wednesday: ["morning"],
        thursday: ["morning", "evening"],
        friday: ["morning", "evening"],
        saturday: ["morning"],
        sunday: [],
      },
      verified: 1,
      status: "active",
    });
    console.log("✅ Sample tutor 3 created:", tutorId3);
  }

  console.log("🌱 Seed complete.");
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
