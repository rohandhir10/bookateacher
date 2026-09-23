import { Metadata } from "next";
import Link from "next/link";
import { getTutorById } from "@/lib/tutor-data";
import { SUBJECT_LABELS } from "@/lib/utils";
import { tutorProfileMetadata } from "@/lib/page-seo";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tutor: any = await getTutorById(id);
  if (!tutor || tutor.role !== "tutor") {
    return { title: "Tutor not found | bookateacher.in" };
  }
  const subjects: string[] = (tutor.subjects || []).map((s: string) => SUBJECT_LABELS[s] ?? s);
  const subjectLabel = subjects.join(" / ") || "Tutor";

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `https://bookateacher.in/tutors/${tutor.id}#webpage`,
        url: `https://bookateacher.in/tutors/${tutor.id}`,
        name: `${tutor.name} — ${subjectLabel} Tutor | bookateacher.in`,
        description: tutor.bio || `Certified ${subjectLabel.toLowerCase()} tutor on bookateacher.in.`,
        isPartOf: { "@id": "https://bookateacher.in/#website" },
        about: { "@id": "https://bookateacher.in/#organization" },
        inLanguage: "en-IN",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://bookateacher.in" },
          { "@type": "ListItem", position: 2, name: "Tutors", item: "https://bookateacher.in/tutors" },
          { "@type": "ListItem", position: 3, name: tutor.name, item: `https://bookateacher.in/tutors/${tutor.id}` },
        ],
      },
      {
        "@type": "Person",
        "@id": `https://bookateacher.in/tutors/${tutor.id}#person`,
        name: tutor.name,
        givenName: tutor.name.split(" ")[0],
        familyName: tutor.name.split(" ").slice(1).join(" "),
        url: `https://bookateacher.in/tutors/${tutor.id}`,
        image: tutor.avatar_url || `https://bookateacher.in/og-default.svg`,
        description: tutor.bio || `Certified ${subjectLabel.toLowerCase()} tutor on bookateacher.in.`,
        jobTitle: `Certified ${subjects.join(" / ")} Tutor`,
        sameAs: [],
        knowsAbout: [subjects.join(", "), "IELTS", "TOEFL", "Spoken English", "Test Preparation", "English Language Teaching"].slice(0, 5),
        hasCredential: tutor.credentials?.certification ? {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "Certification",
          name: tutor.credentials.certification,
          educationalLevel: `Verified ${subjects.join(" / ")} tutor`,
        } : undefined,
        award: tutor.credentials?.ielts_score ? { "@type": "Award", name: `IELTS Band ${tutor.credentials.ielts_score}` } : tutor.credentials?.toefl_score ? { "@type": "Award", name: `TOEFL iBT Score ${tutor.credentials.toefl_score}` } : undefined,
        experienceSummary: {
          "@type": "OccupationalExperience",
          description: tutor.credentials?.background || `Certified ${subjects.join(" / ")} tutor with ${tutor.credentials?.experience_years ?? 5} years of experience.`,
          duration: `${tutor.credentials?.experience_years ?? 5} years`,
        },
      },
      {
        "@type": "Offer",
        "@id": `https://bookateacher.in/tutors/${tutor.id}#offer`,
        url: `https://bookateacher.in/tutors/${tutor.id}`,
        name: `Book a session with ${tutor.name}`,
        description: `1-on-1 ${subjects.join(", ")} coaching session with ${tutor.name}. Live, personalised.`,
        provider: { "@type": "Person", "@id": `https://bookateacher.in/tutors/${tutor.id}#person` },
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "INR",
          price: tutor.hourly_rate ?? 800,
          unitText: "HOUR",
        },
        availability: "https://schema.org/InStock",
        category: subjects.join(", "),
      },
      {
        "@type": "AggregateRating",
        "@id": `https://bookateacher.in/tutors/${tutor.id}#rating`,
        ratingValue:
          (tutor.rating ?? 4.5).toFixed(1) as any,
        bestRating: 5,
        worstRating: 1,
        ratingCount: Number(tutor.reviews ?? 0),
        reviewCount: Number(tutor.reviews ?? 0),
      },
    ],
  });

  return {
    ...tutorProfileMetadata(tutor, subjectLabel),
    other: {
      "application/ld+json": jsonLd,
    },
  };
}

export default async function TutorProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tutor: any = await getTutorById(id);

  if (!tutor || tutor.role !== "tutor") {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#FAF7F0", color: "#14213D", fontFamily: "'Inter', system-ui, sans-serif", alignItems: "center", justifyContent: "center", padding: 48 }}>
        <div style={{ textAlign: "center", maxWidth: 400 }}>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "2rem", fontWeight: 600, color: "#B23A2E", marginBottom: 16, letterSpacing: "-0.02em" }}>
            Tutor not found
          </h1>
          <p style={{ fontSize: "0.9375rem", color: "#3D4A63", lineHeight: 1.6, marginBottom: 24 }}>
            This tutor profile doesn't exist or has been removed.
          </p>
          <a href="/tutors" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 20px", borderRadius: 6, fontSize: "0.9375rem", fontWeight: 500, background: "#14213D", color: "#FAF7F0", textDecoration: "none" }}>
            Back to tutors
          </a>
        </div>
      </div>
    );
  }

  const subjects: string[] = (tutor.subjects || []).map((s: string) => SUBJECT_LABELS[s] ?? s);
  const subjectLabel = subjects.join(" / ") || "Tutor";
  const initials = tutor.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();
  const price = tutor.hourly_rate ? `₹${tutor.hourly_rate.toLocaleString("en-IN")}/hr` : "From ₹800/hr";
  const rating = Number(tutor.rating ?? 0).toFixed(1);
  const reviewCount = Number(tutor.reviews ?? 0);

  const INK = "#14213D";
  const INK_SOFT = "#3D4A63";
  const PAPER = "#FAF7F0";
  const PAPER_2 = "#F2ECE0";
  const LINE = "#D9D2C5";
  const MUTED = "#6B6557";
  const RED = "#B23A2E";
  const GREEN = "#2F5233";

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `https://bookateacher.in/tutors/${tutor.id}#webpage`,
        url: `https://bookateacher.in/tutors/${tutor.id}`,
        name: `${tutor.name} — ${subjectLabel} Tutor | bookateacher.in`,
        description: tutor.bio || `Certified ${subjectLabel} tutor on bookateacher.in.`,
        isPartOf: { "@id": "https://bookateacher.in/#website" },
        about: { "@id": "https://bookateacher.in/#organization" },
        inLanguage: "en-IN",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://bookateacher.in" },
          { "@type": "ListItem", position: 2, name: "Tutors", item: "https://bookateacher.in/tutors" },
          { "@type": "ListItem", position: 3, name: tutor.name, item: `https://bookateacher.in/tutors/${tutor.id}` },
        ],
      },
      {
        "@type": "Person",
        "@id": `https://bookateacher.in/tutors/${tutor.id}#person`,
        name: tutor.name,
        givenName: tutor.name.split(" ")[0],
        familyName: tutor.name.split(" ").slice(1).join(" "),
        url: `https://bookateacher.in/tutors/${tutor.id}`,
        image: tutor.avatar_url || `https://bookateacher.in/og-default.svg`,
        description: tutor.bio || `Certified ${subjectLabel.toLowerCase()} tutor on bookateacher.in.`,
        jobTitle: `Certified ${subjects.join(" / ")} Tutor`,
        sameAs: [],
        knowsAbout: [subjects.join(", "), "IELTS", "TOEFL", "Spoken English", "Test Preparation", "English Language Teaching"].slice(0, 5),
        hasCredential: tutor.credentials?.certification ? {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "Certification",
          name: tutor.credentials.certification,
          educationalLevel: `Verified ${subjects.join(" / ")} tutor`,
        } : undefined,
        award: tutor.ielts_score ? { "@type": "Award", name: `IELTS Band ${tutor.ielts_score}` } : tutor.toefl_score ? { "@type": "Award", name: `TOEFL iBT Score ${tutor.toefl_score}` } : undefined,
        experienceSummary: {
          "@type": "OccupationalExperience",
          description: tutor.credentials?.background || `Certified ${subjects.join(" / ")} tutor with ${tutor.credentials?.experience_years ?? 5} years of experience.`,
          duration: `${tutor.credentials?.experience_years ?? 5} years`,
        },
        alumniOf: tutor.credentials?.experience_years && tutor.credentials?.experience_years >= 8 ? [{ "@type": "EducationalOrganization", name: "IDP Certified IELTS Trainer Programme" }] : [],
      },
      {
        "@type": "Offer",
        "@id": `https://bookateacher.in/tutors/${tutor.id}#offer`,
        url: `https://bookateacher.in/tutors/${tutor.id}`,
        name: `Book a session with ${tutor.name}`,
        description: `1-on-1 ${subjects.join(", ")} coaching session with ${tutor.name}. Live, personalised, ${price}.`,
        provider: { "@type": "Person", "@id": `https://bookateacher.in/tutors/${tutor.id}#person` },
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "INR",
          price: tutor.hourly_rate ?? 800,
          unitText: "HOUR",
        },
        availability: "https://schema.org/InStock",
        category: subjects.join(", "),
      },
      {
        "@type": "AggregateRating",
        "@id": `https://bookateacher.in/tutors/${tutor.id}#rating`,
        ratingValue: rating,
        bestRating: 5,
        worstRating: 1,
        ratingCount: reviewCount,
        reviewCount,
      },
    ],
  });

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: PAPER, color: INK, fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* JSON-LD schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      {/* Header */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: `rgba(${parseInt(INK_SOFT.slice(1,3),16)}, ${parseInt(INK_SOFT.slice(3,5),16)}, ${parseInt(INK_SOFT.slice(5,7),16)}, 0.92)`, backdropFilter: "blur(8px)", borderBottom: `1px solid ${LINE}` }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, gap: 24, width: "100%", maxWidth: 960, margin: "0 auto", padding: "0 24px" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, color: INK, textDecoration: "none", fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600, fontSize: "1.25rem", letterSpacing: "-0.02em" }}>
            <span style={{ width: 28, height: 28, background: INK, borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M3 8h18M3 12h13M3 16h9" stroke={PAPER} strokeWidth="2.5" strokeLinecap="round" /></svg>
            </span>
            <span style={{ color: INK }}>bookateacher<span style={{ color: MUTED, fontFamily: "Inter, sans-serif", fontSize: "0.75rem", fontWeight: 400 }}>.in</span></span>
          </Link>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <Link href="/tutors" style={{ fontSize: "0.875rem", color: INK_SOFT, textDecoration: "none", padding: "6px 14px", border: `1px solid ${LINE}`, borderRadius: 6, transition: "all 0.15s" }}>All tutors</Link>
            <Link href="/register?role=student" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 18px", borderRadius: 6, fontSize: "0.875rem", fontWeight: 500, background: INK, color: PAPER, textDecoration: "none", transition: "all 0.15s" }}>Find a tutor</Link>
          </div>
        </div>
      </header>

      {/* Main */}
      <main style={{ flex: 1, padding: "40px 24px" }}>
        <div style={{ width: "100%", maxWidth: 960, margin: "0 auto" }}>
          {/* Breadcrumb */}
          <nav style={{ display: "flex", gap: 8, marginBottom: 28, fontSize: "0.8125rem", color: MUTED }} aria-label="Breadcrumb">
            <Link href="/" style={{ color: INK_SOFT, textDecoration: "none" }}>Home</Link><span>/</span>
            <Link href="/tutors" style={{ color: INK_SOFT, textDecoration: "none" }}>Tutors</Link><span>/</span>
            <span style={{ color: INK, fontWeight: 500 }}>{tutor.name}</span>
          </nav >

          {/* Profile card */}
          <div style={{ background: PAPER_2, border: `1px solid ${LINE}`, borderRadius: 18, overflow: "hidden" }}>
            {/* Header image strip */}
            <div style={{ height: 100, background: `linear-gradient(135deg, ${INK} 0%, ${INK_SOFT} 100%)`, position: "relative" }}>
              <div style={{ position: "absolute", top: 0, right: 0, width: 120, height: 120, background: "rgba(178,58,46,0.15)", borderRadius: "50%", pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, width: 80, height: 80, background: "rgba(47,82,51,0.15)", borderRadius: "50%", pointerEvents: "none" }} />
            </div>

            {/* Profile header */}
            <div style={{ padding: "24px 28px 0", display: "flex", gap: 20, alignItems: "flex-end" }}>
              <div style={{ width: 72, height: 72, borderRadius: 16, background: INK, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.625rem", fontWeight: 600, color: PAPER, border: `3px solid ${PAPER_2}`, marginTop: -32 }}>
                {initials}
              </div>
              <div style={{ flex: "1", padding: "0 0 24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
                  <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.75rem", fontWeight: 600, color: INK, letterSpacing: "-0.02em", lineHeight: 1.2, marginRight: 8 }}>
                    {tutor.name}
                  </h1>
                  {tutor.verified ? (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 20, fontSize: "0.75rem", fontWeight: 600, background: "#E8F0E4", color: GREEN, border: `1px solid #C8D8C0` }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="3"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      Verified
                    </span>
                  ) : (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 20, fontSize: "0.75rem", fontWeight: 600, background: PAPER, color: MUTED, border: `1px solid ${LINE}` }}>
                      Pending review
                    </span>
                  )}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
                  {subjects.map((subj) => (
                    <span key={subj} style={{ display: "inline-block", padding: "4px 10px", borderRadius: 20, fontSize: "0.75rem", fontWeight: 600, background: INK, color: PAPER }}>{subj}</span>
                  ))}
                  {tutor.credentials?.experience_years && (
                    <span style={{ display: "inline-block", padding: "4px 10px", borderRadius: 20, fontSize: "0.75rem", fontWeight: 600, background: PAPER_2, color: INK_SOFT, border: `1px solid ${LINE}` }}>{tutor.credentials.experience_years} years experience</span>
                  )}
                </div>
                {tutor.credentials?.certification && (
                  <div style={{ fontSize: "0.8125rem", color: MUTED, fontStyle: "italic", fontFamily: "Inter, sans-serif" }}>
                    {tutor.credentials.certification}
                  </div>
                )}
              </div>
              {/* Rating */}
              <div style={{ textAlign: "center", paddingBottom: 24, flexShrink: 0 }}>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "2rem", fontWeight: 600, color: RED, letterSpacing: "-0.02em", lineHeight: 1 }}>
                  {rating}
                </div>
                <div style={{ fontSize: "0.75rem", color: MUTED, marginTop: 4 }}>out of 5</div>
                <div style={{ display: "flex", gap: 2, justifyContent: "center", marginTop: 6 }}>
                  {Array(Math.round(Number(rating))).fill(null).map((_: null, i: number) => (
                    <span key={i} style={{ color: RED, fontSize: "1rem" }}>★</span>
                  ))}
                  {Array(Math.max(0, 5 - Math.round(Number(rating)))).fill(null).map((_: null, i: number) => (
                    <span key={i} style={{ color: LINE, fontSize: "1rem" }}>★</span>
                  ))}
                </div>
                <div style={{ fontSize: "0.75rem", color: MUTED, marginTop: 2 }}>
                  {reviewCount === 0 ? "No reviews yet" : "(" + reviewCount + " reviews)"}
                </div>
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: "0 28px 28px" }}>
              {/* Price + CTA */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", background: PAPER, border: `1px solid ${LINE}`, borderRadius: 12, marginBottom: 24 }}>
                <div>
                  <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.5rem", fontWeight: 600, color: RED, letterSpacing: "-0.02em", marginBottom: 4 }}>
                    {price}
                  </div>
                  <div style={{ fontSize: "0.8125rem", color: MUTED }}>per hour · live 1-on-1 session</div>
                </div>
                <Link href="/register?role=student" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 20px", borderRadius: 8, fontSize: "0.875rem", fontWeight: 600, background: INK, color: PAPER, textDecoration: "none", transition: "all 0.15s" }}>
                  Book a session
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={PAPER} strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </Link>
              </div>

              {/* Bio */}
              {tutor.bio && (
                <div style={{ marginBottom: 24 }}>
                  <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.125rem", fontWeight: 600, color: INK, marginBottom: 12, letterSpacing: "-0.02em" }}>
                    About
                  </h2>
                  <p style={{ fontSize: "0.9375rem", color: INK_SOFT, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
                    {tutor.bio}
                  </p>
                </div>
              )}

              {/* Credentials */}
              {(tutor.credentials?.experience_years || tutor.credentials?.teaching_style || tutor.credentials?.background) && (
                <div style={{ marginBottom: 24 }}>
                  <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.125rem", fontWeight: 600, color: INK, marginBottom: 12, letterSpacing: "-0.02em" }}>
                    Credentials & experience
                  </h2>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    {[
                      { label: "Experience", value: `${tutor.credentials?.experience_years ?? 5} years` },
                      { label: "Certification", value: tutor.credentials?.certification ?? "—" },
                      { label: "Teaching style", value: tutor.credentials?.teaching_style ?? "—" },
                      { label: "Background", value: tutor.credentials?.background ? tutor.credentials.background.slice(0, 120) + (tutor.credentials.background.length > 120 ? "…" : "") : "—" },
                    ].map((item) => (
                      <div key={item.label} style={{ padding: 12, background: PAPER_2, border: `1px solid ${LINE}`, borderRadius: 8 }}>
                        <div style={{ fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: MUTED, marginBottom: 6 }}>{item.label}</div>
                        <div style={{ fontSize: "0.8125rem", color: INK_SOFT, lineHeight: 1.5 }}>{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* What they teach */}
              {subjects.length > 0 && (
                <div style={{ marginBottom: 24 }}>
                  <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.125rem", fontWeight: 600, color: INK, marginBottom: 12, letterSpacing: "-0.02em" }}>
                    Subjects
                  </h2>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {subjects.map((subj) => (
                      <Link key={subj} href={`/subjects/${subj.toLowerCase().replace(" ", "-").replace("/", "-")}`} style={{ display: "inline-block", padding: "6px 14px", borderRadius: 8, fontSize: "0.8125rem", fontWeight: 500, background: PAPER_2, color: INK, border: `1px solid ${LINE}`, textDecoration: "none", transition: "all 0.15s" }}>
                        {subj}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Availability (summary) */}
              {tutor.availability && (
                <div style={{ marginBottom: 24 }}>
                  <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.125rem", fontWeight: 600, color: INK, marginBottom: 12, letterSpacing: "-0.02em" }}>
                    Availability
                  </h2>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {(["monday","tuesday","wednesday","thursday","friday","saturday","sunday"] as string[]).map((day) => {
                      const slots = (tutor.availability as any)[day];
                      const hasSlots = slots && slots.length > 0;
                      return (
                        <span key={day} style={{ display: "inline-block", padding: "4px 10px", borderRadius: 6, fontSize: "0.75rem", fontWeight: 500, textTransform: "capitalize", background: hasSlots ? "#E8F0E4" : PAPER_2, color: hasSlots ? GREEN : MUTED, border: `1px solid ${hasSlots ? "#C8D8C0" : LINE}` }}>
                          {day}
                          {hasSlots && ` · ${slots.length} slot${slots.length > 1 ? "s" : ""}`}
                        </span>
                      );
                    })}
                  </div>
                  <div style={{ fontSize: "0.8125rem", color: MUTED, marginTop: 8 }}>
                    Slots shown are typical. Message the tutor to see their current availability.
                  </div>
                </div>
              )}

              {/* Contact / next step */}
              <div style={{ padding: "16px 20px", background: INK, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                <div>
                  <div style={{ fontWeight: 600, color: PAPER, marginBottom: 4, fontSize: "0.9375rem" }}>Ready to start?</div>
                  <div style={{ fontSize: "0.8125rem", color: "rgba(250,247,240,0.65)" }}>
                    Message {tutor.name} or book a session directly.
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <Link href="/register?role=student" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "9px 18px", borderRadius: 8, fontSize: "0.8125rem", fontWeight: 600, background: PAPER, color: INK, textDecoration: "none", transition: "all 0.15s" }}>
                    Message tutor
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </Link>
                  <Link href={`/register?role=student&ref=tutor-${tutor.id}`} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "9px 18px", borderRadius: 8, fontSize: "0.8125rem", fontWeight: 500, background: "transparent", color: PAPER, border: `1px solid rgba(250,247,240,0.25)`, textDecoration: "none", transition: "all 0.15s" }}>
                    Book session
                  </Link>
                </div>
              </div>

              {/* CTA band */}
              <div style={{ marginTop: 24, padding: "20px 24px", background: PAPER_2, border: `1px solid ${LINE}`, borderRadius: 12, textAlign: "center" }}>
                <p style={{ fontSize: "0.875rem", color: INK_SOFT, lineHeight: 1.5, marginBottom: 12 }}>
                  Not sure if {tutor.name} is the right fit? Tell us what you need and we'll match you with the best tutor for your goals and budget.
                </p>
                <Link href="/register?role=student" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 20px", borderRadius: 8, fontSize: "0.875rem", fontWeight: 600, background: INK, color: PAPER, textDecoration: "none", transition: "all 0.15s" }}>
                  Get matched instead
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={PAPER} strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${LINE}`, padding: "24px 0", background: PAPER_2 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap", width: "100%", maxWidth: 960, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600, fontSize: "1.125rem", display: "flex", alignItems: "center", gap: 8, color: INK }}>
            <span style={{ width: 28, height: 28, background: INK, borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M3 8h18M3 12h13M3 16h9" stroke={PAPER} strokeWidth="2.5" strokeLinecap="round" /></svg>
            </span>
            <span style={{ color: INK }}>bookateacher<span style={{ color: MUTED, fontFamily: "Inter, sans-serif", fontSize: "0.75rem", fontWeight: 400 }}>.in</span></span>
          </div>
          <div style={{ display: "flex", gap: 28 }}>
            <Link href="/privacy" style={{ fontSize: "0.875rem", color: INK_SOFT, textDecoration: "none" }}>Privacy</Link>
            <Link href="/terms" style={{ fontSize: "0.875rem", color: INK_SOFT, textDecoration: "none" }}>Terms</Link>
            <Link href="/contact" style={{ fontSize: "0.875rem", color: INK_SOFT, textDecoration: "none" }}>Contact</Link>
          </div>
          <p style={{ fontSize: "0.8125rem", color: MUTED, textAlign: "right", flex: 1 }}>© {new Date().getFullYear()} bookateacher.in — Made in India</p>
        </div>
      </footer>
    </div>
  );
}
