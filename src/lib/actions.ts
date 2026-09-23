import { registerSchema } from "@/lib/validations";
import { hashPassword } from "@/lib/auth-utils";
import { getUserByEmail, createUser, getUserById } from "@/lib/db";
import { generateId } from "@/lib/utils";

export async function handleRegister(data: {
  name: string;
  email: string;
  password: string;
  role: "student" | "tutor";
  phone?: string;
}) {
  const parsed = registerSchema.parse(data);

  const existing = await getUserByEmail(parsed.email);
  if (existing) throw new Error("An account with this email already exists");

  const id = generateId();
  await createUser({
    id,
    email: parsed.email.toLowerCase(),
    name: parsed.name.trim(),
    password_hash: await hashPassword(parsed.password),
    role: parsed.role,
    phone: parsed.phone?.trim() || undefined,
  });

  const user = await getUserById(id);
  if (!user) throw new Error("Failed to create user");

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
}
