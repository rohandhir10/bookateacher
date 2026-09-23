"use client";

import { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { registerSchema, loginSchema } from "@/lib/validations";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student" as "student" | "tutor",
    phone: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === "login") {
        const parsed = loginSchema.parse(formData);
        const result = await signIn("credentials", {
          email: parsed.email,
          password: parsed.password,
          redirect: false,
        });
        if (!result?.ok) throw new Error("Invalid email or password");
        router.push(callbackUrl);
        router.refresh();
      } else {
        const parsed = registerSchema.parse(formData);
        const res = await fetch("/api/auth/general", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "register", data: parsed }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error ?? "Registration failed");

        // Auto-login after registration
        await signIn("credentials", {
          email: parsed.email,
          password: parsed.password,
          redirect: false,
        });
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Tab switcher */}
      <div className="flex bg-bg-secondary rounded-lg p-1 mb-6" role="tablist">
        <button
          role="tab"
          aria-selected={mode === "login"}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
            mode === "login"
              ? "bg-surface text-foreground shadow-sm"
              : "text-foreground-muted hover:text-foreground"
          }`}
          onClick={() => setMode("login")}
        >
          Sign in
        </button>
        <button
          role="tab"
          aria-selected={mode === "register"}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
            mode === "register"
              ? "bg-surface text-foreground shadow-sm"
              : "text-foreground-muted hover:text-foreground"
          }`}
          onClick={() => setMode("register")}
        >
          Create account
        </button>
      </div>

      {/* Error */}
      {error && (
        <div
          className="mb-4 p-3 rounded-lg bg-error-soft text-error text-sm flex items-start gap-2"
          role="alert"
        >
          <svg
            className="w-4 h-4 flex-shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {mode === "register" && (
          <div className="form-group">
            <label className="label" htmlFor="reg-name">
              Full name
            </label>
            <input
              id="reg-name"
              type="text"
              autoComplete="name"
              className={`input ${error ? "input-error" : ""}`}
              placeholder="Priya Sharma"
              value={formData.name}
              onChange={(e) =>
                setFormData((f) => ({ ...f, name: e.target.value }))
              }
              required
              aria-invalid={!!error}
            />
          </div>
        )}

        <div className="form-group">
          <label className="label" htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className={`input ${error ? "input-error" : ""}`}
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) =>
              setFormData((f) => ({ ...f, email: e.target.value }))
            }
            required
            aria-invalid={!!error}
          />
        </div>

        {mode === "register" && (
          <>
            <div className="form-group">
              <label className="label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                className="input"
                placeholder="At least 8 characters"
                value={formData.password}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, password: e.target.value }))
                }
                required
                minLength={8}
              />
              <p className="text-xs text-foreground-subtle mt-1">
                At least 8 characters
              </p>
            </div>

            <div className="form-group">
              <label className="label" htmlFor="role">
                I am a...
              </label>
              <select
                id="role"
                className="input"
                value={formData.role}
                onChange={(e) =>
                  setFormData((f) => ({
                    ...f,
                    role: e.target.value as "student" | "tutor",
                  }))
                }
              >
                <option value="student">Student / Parent</option>
                <option value="tutor">Tutor</option>
              </select>
            </div>

            {formData.role === "tutor" && (
              <div className="form-group">
                <label className="label" htmlFor="phone">
                  Phone number <span className="text-foreground-subtle font-normal">(optional)</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  className="input"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((f) => ({ ...f, phone: e.target.value }))
                  }
                />
                <p className="text-xs text-foreground-subtle mt-1">
                  Used to contact you about student matches
                </p>
              </div>
            )}
          </>
        )}

        {mode === "login" && (
          <div className="form-group">
            <label className="label" htmlFor="login-password">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              className="input"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData((f) => ({ ...f, password: e.target.value }))
              }
              required
            />
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary w-full btn-lg"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              {mode === "login" ? "Signing in..." : "Creating account..."}
            </span>
          ) : mode === "login" ? (
            "Sign in"
          ) : (
            "Create account"
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-foreground-subtle uppercase tracking-wider">
          or continue with
        </span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Google OAuth */}
      <form
        action="/api/auth/signin/google"
        method="POST"
        className="flex w-full"
      >
        <input type="hidden" name="csrfToken" defaultValue="" />
        <button
          type="submit"
          className="flex-1 btn btn-secondary w-full justify-center gap-2 hover:bg-bg-secondary"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.21h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 9.04 1 6.55 2.55 4.79 5.21l3.2 3.2c.86-.63 1.92-1.08 3.01-1.38z"
            />
            <path
              fill="currentColor"
              d="M1 1C1 1 5.68 8.1 12 14.36V23h3.57c2.08-1.92 3.28-4.74 3.28-8.09l-.01-2.84c0-4.55-1.93-8.55-4.79-11.21z"
            />
          </svg>
          Continue with Google
        </button>
      </form>

      {/* Footer links */}
      <p className="mt-6 text-center text-sm text-foreground-muted">
        {mode === "login" ? (
          <>
            Don&apos;t have an account?{" "}
            <button
              className="text-accent hover:underline font-medium"
              onClick={() => setMode("register")}
            >
              Sign up
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button
              className="text-accent hover:underline font-medium"
              onClick={() => setMode("login")}
            >
              Sign in
            </button>
          </>
        )}
      </p>
    </div>
  );
}
