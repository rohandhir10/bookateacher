import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Site map",
  description: "Browse public pages and subject guides on bookateacher.in.",
  alternates: { canonical: "https://bookateacher.in/site-map" },
};

const links = [
  ["Home", "/"],
  ["Site map", "/site-map"],
  ["Tutor directory", "/tutors"],
  ["Subjects", "/subjects"],
  ["IELTS preparation", "/subjects/ielts"],
  ["TOEFL preparation", "/subjects/toefl"],
  ["Spoken English", "/subjects/spoken-english"],
  ["About", "/about"],
  ["Contact", "/contact"],
  ["Privacy policy", "/privacy"],
  ["Terms of service", "/terms"],
] as const;

export default function SiteMapPage() {
  return (
    <main id="main-content" tabIndex={-1} className="section">
      <div className="wrap" style={{ maxWidth: 820 }}>
        <nav aria-label="Breadcrumb" style={{ display: "flex", gap: 8, marginBottom: 24 }}>
          <Link href="/" className="site-map-home">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Site map</span>
        </nav>
        <h1 className="section-title">Site map</h1>
        <p className="section-copy">Browse the public pages on bookateacher.in.</p>
        <ul style={{ display: "grid", gap: 12, marginTop: 28, paddingLeft: 22 }}>
          {links.map(([label, href]) => (
            <li key={href}><Link href={href}>{label}</Link></li>
          ))}
        </ul>
      </div>
    </main>
  );
}
