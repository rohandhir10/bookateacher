import Link from "next/link";
import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header — minimal */}
      <header className="w-full">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
            <svg
              className="w-7 h-7"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="32" height="32" rx="8" fill="#4f46e5" />
              <path
                d="M8 11h16M8 16h12M8 21h8"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
            bookateacher
            <span className="text-sm text-foreground-subtle font-normal">.in</span>
          </Link>
          <Link
            href="/"
            className="text-sm text-foreground-muted hover:text-foreground transition-colors"
          >
            Back to home
          </Link>
        </div>
      </header>

      {/* Hero — centered auth */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="card p-6 sm:p-8">
            {/* Headline */}
            <div className="text-center mb-6">
              <h1 className="text-xl font-semibold text-foreground mb-1">
                {typeof window !== "undefined" &&
                window.location.pathname.includes("register") ? (
                  "Join bookateacher.in"
                ) : (
                  "Welcome back"
                )}
              </h1>
              <p className="text-sm text-foreground-muted">
                {typeof window !== "undefined" &&
                window.location.pathname.includes("register") ? (
                  "Create your account to get started"
                ) : (
                  "Sign in to access your dashboard"
                )}
              </p>
            </div>

            <LoginForm />
          </div>

          {/* Footer note */}
          <p className="mt-6 text-center text-xs text-foreground-subtle">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </main>
    </div>
  );
}
