import { registerSchema, loginSchema } from "@/lib/validations";
import { hashPassword, verifyPassword } from "@/lib/auth-utils";
import {
  getUserByEmail,
  createUser,
  getUserById,
  updateUser,
} from "@/lib/db";
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
  if (existing) {
    throw new Error("An account with this email already exists");
  }

  const passwordHash = await hashPassword(parsed.password);
  const id = generateId();

  await createUser({
    id,
    email: parsed.email.toLowerCase(),
    name: parsed.name.trim(),
    password_hash: passwordHash,
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

export async function handleLogin(data: {
  email: string;
  password: string;
}) {
  const parsed = loginSchema.parse(data);
  const user = await getUserByEmail(parsed.email.toLowerCase());
  if (!user) return null;
  if (!user.password_hash) return null;
  const valid = await verifyPassword(parsed.password, user.password_hash);
  if (!valid) return null;
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    verified: user.verified,
  };
}

export async function createUserFromGoogle(googleUser: any, db: any) {
  const id = googleUser.sub || generateId();
  const existing = await getUserByEmail(googleUser.email);
  if (existing) return existing;

  await createUser({
    id,
    email: googleUser.email,
    name: googleUser.name,
    avatar_url: googleUser.picture || undefined,
    role: "student",
  });

  const user = await getUserById(id);
  if (!user) throw new Error("Failed to create user from Google");
  return user;
}
