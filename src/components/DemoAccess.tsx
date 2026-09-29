"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export function DemoAccess() {
  const [loading, setLoading] = useState<"student" | "tutor" | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function enter(role: "student" | "tutor") {
    setLoading(role);
    setError(null);

    try {
      const res = await fetch("/api/demo/bootstrap", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Demo setup failed.");

      const account = data.users[role];
      await signIn("credentials", {
        email: account.email,
        password: account.password,
        callbackUrl: role === "tutor" ? "/tutor/dashboard" : "/dashboard",
        redirect: true,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Demo setup failed.");
      setLoading(null);
    }
  }

  return (
    <div className="demo-access">
      <div className="demo-access-head">
        <span>Preview workspace</span>
        <small>Available on local development and Vercel Preview</small>
      </div>
      <div className="demo-access-actions">
        <button
          type="button"
          className="btn btn-secondary"
          disabled={!!loading}
          onClick={() => enter("student")}
        >
          {loading === "student" ? "Opening…" : "Try student dashboard"}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          disabled={!!loading}
          onClick={() => enter("tutor")}
        >
          {loading === "tutor" ? "Opening…" : "Try tutor dashboard"}
        </button>
      </div>
      {error ? <p className="demo-access-error" role="alert">{error}</p> : null}
    </div>
  );
}
