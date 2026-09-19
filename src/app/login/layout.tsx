import Link from "next/link";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      {children}
      <footer className="border-t border-border bg-bg-secondary/30 py-6 mt-auto">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-semibold text-sm">
            <span className="w-8 h-8 rounded bg-[#14213D] flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <path d="M3 8h18M3 12h13M3 16h9" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </span>
            <span style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              bookateacher<span className="text-foreground-subtle font-normal">.in</span>
            </span>
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
