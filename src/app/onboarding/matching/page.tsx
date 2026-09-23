import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { MatchingIntakeForm } from "@/components/MatchingIntakeForm";

export const dynamic = "force-dynamic";

export default async function MatchingIntakePage({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role !== "student") redirect("/tutor/dashboard");

  const params = await searchParams;
  return (
    <main className="min-h-screen bg-bg-primary py-12 px-4">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            Step 2 of 2
          </p>
          <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-foreground">
            Tell us what you need from your tutor
          </h1>
          <p className="mt-2 text-foreground-muted">
            A few details help us match you with the right person without making sign-up feel like a long application.
          </p>
        </div>
        <div className="card p-6 sm:p-8">
          <MatchingIntakeForm initialSubject={params.subject ?? "ielts"} />
        </div>
      </div>
    </main>
  );
}
