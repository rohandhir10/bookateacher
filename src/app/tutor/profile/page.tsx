import { TutorRegistrationForm } from "@/components/TutorRegistrationForm";

export default function TutorOnboardingPage() {
  return (
    <div className="min-h-screen bg-bg-primary py-12">
      <div className="container">
        <div className="card p-6 sm:p-8 max-w-xl mx-auto">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.105a9.003 9.003 0 011.745-5.743 12.876 12.876 0 017.293 2.237c.074-.033.147-.07.216-.11l.037.053c.175.248.416.48.618.646.373-1.58.944-2.828 1.574-3.614C10.83 11.405 10.087 10.577 9.36 10.03c-.082-.024-.164-.047-.247-.07l-.005-.003a5.025 5.025 0 01-.82-2.429 9.05 9.05 0 013.973-3.345M11.25 2.25A3.75 3.75 0 0115 6h12a3.75 3.75 0 013.75 3.75v8.25a3.75 3.75 0 01-3.75 3.75h-5.558c.04-.222.07-.453.07-.694V9.75c0-.592-.22-1.133-.54-1.557a3.004 3.004 0 00-.966-1.232 1.5 1.5 0 00-.222-.195c-.074-.05-.156-.1-.246-.145l-.055-.03-.037-.022c-.025-.014-.05-.03-.075-.044a1.5 1.5 0 00-.633-.414 8.52 8.52 0 00-3.317-1.13 4.47 4.47 0 00-3.132-1.056 4.47 4.47 0 00-3.132 1.056 8.52 8.52 0 00-3.317 1.13 1.5 1.5 0 00-.633.414c-.025.014-.05.03-.075.044l-.037.022-.055.03c-.09.045-.172.095-.246.145a1.5 1.5 0 00-.222.195 3.004 3.004 0 00-.966 1.232c-.32.424-.54 1.045-.54 1.557v8.594c0 .241.03.472.07.694H15a3.75 3.75 0 01-3.75-3.75v-8.25z" />
              </svg>
            </div>
            <h1 className="text-xl font-semibold text-foreground mb-2">
              Complete your tutor profile
            </h1>
            <p className="text-sm text-foreground-muted">
              This takes about 5 minutes. Your profile will be reviewed within 48 hours.
            </p>
          </div>

          <TutorRegistrationForm />

          <p className="text-center text-xs text-foreground-subtle mt-6">
            By completing your profile, you agree to our{" "}
            <a href="/terms" className="underline">Terms of Service</a>
            . All tutors are vetted before their profile goes live.
          </p>
        </div>
      </div>
    </div>
  );
}
