// bookateacher backend — Seed script
// Creates schema (if not exists) + test users + test data
import { migrate, seedAdminUser, seedTestUsers } from "./schema.js";

async function main() {
  console.log("=== bookateacher backend seed ===\n");

  // Step 1: Ensure schema exists
  await migrate();
  console.log("");

  // Step 2: Create admin user
  await seedAdminUser();
  console.log("");

  // Step 3: Create test users (tutors + student)
  await seedTestUsers();
  console.log("");

  console.log("=== Seed complete ===");
  console.log("Test accounts:");
  console.log("  Tutor: rahul.kapoor@bookateacher.in / Test@1234");
  console.log("  Tutor: anita.sharma@bookateacher.in / Test@1234");
  console.log("  Tutor: vikram.singh@bookateacher.in / Test@1234");
  console.log("  Student: priya.mehta@example.com / Test@1234");
  console.log("  Admin: admin@bookateacher.in (no password — use DB reset)");
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
