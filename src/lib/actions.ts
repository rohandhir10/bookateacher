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

  const existing = getUserByEmail(parsed.email);
  if (existing) {
    throw new Error("An account with this email already exists");
  }

  const passwordHash = await hashPassword(parsed.password);
  const id = generateId();

  createUser({
    id,
    email: parsed.email.toLowerCase(),
    name: parsed.name.trim(),
    password_hash: passwordHash,
    role: parsed.role,
    phone: parsed.phone?.trim() || undefined,
  });

  const user = getUserById(id);
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
  const user = getUserByEmail(parsed.email.toLowerCase());
  if (!user || !user.password_hash) {
    throw new Error("Invalid email or password");
  }
  const valid = await verifyPassword(parsed.password, user.password_hash);
  if (!valid) {
    throw new Error("Invalid email or password");
  }
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
}

export function ensureUserExists(
  email: string,
  name: string,
  image?: string | null
) {
  const existing = getUserByEmail(email);
  if (existing) {
    if (name && existing.name !== name) {
      updateUser(existing.id, { name });
    }
    return existing;
  }

  const id = generateId();
  createUser({
    id,
    email: email.toLowerCase(),
    name: name.trim(),
    role: "student",
    avatar_url: image ?? undefined,
  });

  const user = getUserById(id);
  if (!user) throw new Error("Failed to create user from Google");
  return user;
}
