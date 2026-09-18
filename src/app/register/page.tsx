import { RegisterForm } from "@/components/RegisterForm";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up | bookateacher.in",
  description:
    "Create your account to find verified IELTS, TOEFL, and Spoken English tutors, or to become a tutor on bookateacher.in",
};

export const dynamic = "force-dynamic";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-primary">
      <header className="sticky top-0 z-50 bg-bg-primary/90 backdrop-blur-sm border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-lg"
          >
            <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="#4f46e5" />
              <path d="M8 11h16M8 16h12M8 21h8"
                stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <span className="hidden sm:inline">
              bookateacher
              <span className="text-sm text-foreground-subtle font-normal">.in</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login" className="btn btn-ghost btn-sm text-foreground-muted hover:text-foreground">
              Sign in
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Create your account
            </h1>
            <p className="text-foreground-muted max-w-lg mx-auto">
              Join bookateacher.in to find verified tutors or start earning as a tutor.
            </p>
          </div>

          <div className="card p-6 sm:p-8">
            <RegisterForm />
          </div>

          {/* Trust badges */}
          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            {[
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 3.373-1.204 6.994-3.04 9-5.408V9c0-.489-.012-.97-.025-1.4-.074-.672.216-1.926.79-2.895.098-.14.173-.282.222-.436H12v.188c0 .243.092.445.222.436.574.969.79 2.223.79 2.895.013.43.025.92.025 1.4 0 2.466-2.11 4.39-4.79 4.911m0 3a8.001 8.001 0 100-16 8.001 8.001 0 000 16z" />
                  </svg>
                ),
                title: "Verified tutors",
                desc: "Every tutor vetted and verified",
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Fast matching",
                desc: "Matched within 24 hours",
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M18.364 5.636a9 9 0 11-12.728 0 9 9 0 0112.728 0zM11 5.835h-.019a60.45 60.45 0 00-3.827.397 1 1 0 10-1.087-1.714 11.96 11.96 0 006.553 6.487A9.96 9.96 0 0111 5.835z" />
                  </svg>
                ),
                title: "Secure payments",
                desc: "Safe, encrypted transactions",
              },
            ].map((item) => (
              <div key={item.title} className="card p-4 text-center">
                <div className="w-10 h-10 rounded-xl bg-accent-soft flex items-center justify-center mx-auto mb-2 text-accent">
                  {item.icon}
                </div>
                <div className="text-sm font-medium text-foreground">{item.title}</div>
                <div className="text-xs text-foreground-muted mt-0.5">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
