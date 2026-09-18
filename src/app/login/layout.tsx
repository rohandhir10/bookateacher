import Link from "next/link";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      {children}
      <footer className="border-t border-border bg-bg-secondary/30 py-6 mt-auto">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-semibold text-sm">
            <svg className="w-5 h-5" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="#4f46e5" />
              <path d="M8 11h16M8 16h12M8 21h8"
                stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <span>bookateacher<span className="text-foreground-subtle font-normal">.in</span></span>
          </div>
          <div className="flex items-center gap-5 text-xs text-foreground-muted">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
          </div>
          <p className="text-xs text-foreground-subtle">© {new Date().getFullYear()} bookateacher.in</p>
        </div>
      </footer>
    </div>
  );
}
