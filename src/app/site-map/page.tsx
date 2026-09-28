import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Site map",
  description: "Browse every public section of bookateacher.in, including preparation guides, tutor listings, and information pages.",
  alternates: { canonical: "https://bookateacher.in/site-map" },
};

const groups = [
  {
    title: "Start here",
    links: [
      ["Home", "/"],
      ["All subjects", "/subjects"],
      ["Browse tutors", "/tutors"],
    ],
  },
  {
    title: "Preparation guides",
    links: [
      ["IELTS preparation", "/subjects/ielts"],
      ["TOEFL preparation", "/subjects/toefl"],
      ["Spoken English", "/subjects/spoken-english"],
    ],
  },
  {
    title: "About and support",
    links: [
      ["About", "/about"],
      ["Contact", "/contact"],
    ],
  },
  {
    title: "Policies",
    links: [
      ["Privacy policy", "/privacy"],
      ["Terms of service", "/terms"],
    ],
  },
];

export default function SiteMapPage() {
  return (
    <div className="site-map-page">
      <header className="site-map-header">
        <Link href="/" aria-label="bookateacher.in home">bookateacher.in</Link>
        <nav aria-label="Primary navigation">
          <Link href="/subjects">Subjects</Link>
          <Link href="/tutors">Tutors</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </header>
      <main id="main-content" tabIndex={-1}>
        <nav aria-label="Breadcrumb" className="site-map-breadcrumb">
          <Link href="/">Home</Link><span aria-hidden="true"> / </span><span aria-current="page">Site map</span>
        </nav>
        <h1>Site map</h1>
        <p className="site-map-intro">Find your way around the public pages. Account pages and private dashboards are intentionally not listed here.</p>
        <div className="site-map-groups">
          {groups.map((group) => (
            <section key={group.title} aria-labelledby={`group-${group.title.replaceAll(" ", "-")}`}>
              <h2 id={`group-${group.title.replaceAll(" ", "-")}`}>{group.title}</h2>
              <ul>
                {group.links.map(([label, href]) => (
                  <li key={href}><Link href={href}>{label}</Link></li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
      <footer className="site-map-footer">
        <nav aria-label="Legal and support">
          <Link href="/site-map" aria-current="page">Site map</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>
        <Link href="/" className="site-map-home">Back to home</Link>
      </footer>
      <style>{`
        .site-map-page { min-height: 100vh; display: flex; flex-direction: column; background: #FAF7F0; color: #14213D; }
        .site-map-header, .site-map-footer { display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap; padding: 18px max(24px, calc((100% - 960px) / 2)); border-bottom: 1px solid #D9D2C5; }
        .site-map-header > a { font-weight: 700; text-decoration: none; }
        .site-map-header nav, .site-map-footer nav { display: flex; gap: 20px; flex-wrap: wrap; }
        .site-map-page a { color: #14213D; text-underline-offset: 3px; }
        .site-map-page a:focus-visible { outline: 3px solid #B23A2E; outline-offset: 3px; border-radius: 2px; }
        .site-map-page main { width: min(100% - 48px, 960px); margin: 32px auto 64px; flex: 1; }
        .site-map-breadcrumb { font-size: .9rem; margin-bottom: 28px; }
        .site-map-page h1 { font-size: clamp(2rem, 5vw, 3rem); margin: 0 0 12px; }
        .site-map-intro { max-width: 650px; line-height: 1.65; color: #3D4A63; margin-bottom: 32px; }
        .site-map-groups { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; }
        .site-map-groups section { border: 1px solid #D9D2C5; border-radius: 8px; padding: 20px; background: #fffdf8; }
        .site-map-groups h2 { font-size: 1.1rem; margin: 0 0 12px; }
        .site-map-groups ul { margin: 0; padding-left: 20px; line-height: 2; }
        .site-map-footer { border-top: 1px solid #D9D2C5; border-bottom: 0; background: #F2ECE0; }
        @media (max-width: 560px) { .site-map-header, .site-map-footer { padding-left: 20px; padding-right: 20px; } .site-map-header nav, .site-map-footer nav { gap: 12px; } }
      `}</style>
    </div>
  );
}
