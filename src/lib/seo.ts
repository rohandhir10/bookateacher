import { Metadata } from "next";

// FAQ schema data — shared between page.tsx metadata and the visible FAQ section
export const FAQ_DATA = [
  {
    question: "What if I don't get matched with someone good?",
    answer:
      "You can reject your first match for free — no questions, no wait. We'll send another within 24 hours. If your first session doesn't feel right, message us and we'll re-match you. You're not locked into anyone.",
  },
  {
    question: "What's your refund policy if I don't like the first session?",
    answer:
      "If you don't feel the session was worth it, we refund the session fee in full — including any trial session fee, if applicable. Email us within 48 hours. Most students stay after the first session, but the option is there.",
  },
  {
    question: "How fast can you match me if my test is in 10 days?",
    answer:
      "We match within 24 hours even on short timelines — we keep a pool of available tutors for exactly this. But be realistic: 10 days is enough for targeted strategy and final polish, not a full overhaul. Tell us your test date upfront and we'll suggest a realistic plan.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Tutor rates vary by experience and subject — typically ₹800–₹2,500 per hour for test prep. You see the rate before you book. Payment is collected at booking time through Razorpay (UPI, cards). No hidden fees. Trial sessions may be free or discounted — check the tutor's profile.",
  },
  {
    question: "Can I chat with a tutor before booking?",
    answer:
      "Yes — every tutor profile has a message button. Send a short intro, ask about their approach, and see if it's a fit before you pay. Most tutors reply within a few hours.",
  },
  {
    question: "What if my English is very basic — is this still for me?",
    answer:
      "If you're below Band 4, we'll be honest: 1:1 test-prep coaching works best from Band 5+ where there's a foundation to build on. For absolute beginners, we can suggest general English tutors first. Tell us your current level in the form and we'll guide you.",
  },
];

export const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_DATA.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: {
      "@type": "Answer",
      text: answer,
    },
  })),
};

export const COURSE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "IELTS, TOEFL & Spoken English Coaching",
  description:
    "Certified 1-on-1 IELTS, TOEFL, and Spoken English tutoring across India. Live coaching sessions, mock tests under real test conditions, and targeted feedback on writing and speaking.",
  provider: {
    "@type": "Organization",
    name: "bookateacher.in",
    url: "https://bookateacher.in",
  },
  courseMode: "online",
  courseType: [
    "one-on-one tutoring",
    "live coaching",
    "mock tests",
    "writing feedback",
    "speaking practice",
  ],
  learningResourceType: [
    "online course",
    "personal tuition",
    "test prep",
  ],
  typicalAgeRange: "16-35",
  inLanguage: "en",
  hasCourse: [
    {
      "@type": "Course",
      name: "IELTS Test Preparation",
      description:
        "Targeted 1-on-1 coaching for IELTS Academic and General Training — writing, speaking, reading, and listening. Mock tests under timed conditions.",
      provider: {
        "@type": "Organization",
        name: "bookateacher.in",
        url: "https://bookateacher.in",
      },
    },
    {
      "@type": "Course",
      name: "TOEFL Test Preparation",
      description:
        "Section-by-section TOEFL iBT coaching with strategy for every question type and full-length mock tests under timed conditions.",
      provider: {
        "@type": "Organization",
        name: "bookateacher.in",
        url: "https://bookateacher.in",
      },
    },
    {
      "@type": "Course",
      name: "Spoken English Coaching",
      description:
        "Live conversation practice, pronunciation work, fluency building, and the exact language you need for your situation — interviews, presentations, daily conversation.",
      provider: {
        "@type": "Organization",
        name: "bookateacher.in",
        url: "https://bookateacher.in",
      },
    },
  ],
};

export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://bookateacher.in/#organization",
  name: "bookateacher.in",
  url: "https://bookateacher.in",
  description:
    "Online platform connecting students with certified IELTS, TOEFL, and Spoken English tutors across India.",
  logo: "https://bookateacher.in/favicon.svg",
  sameAs: [
    "https://www.instagram.com/bookateacher_in",
    "https://www.linkedin.com/company/bookateacher-in",
  ],
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 28.6139,
    longitude: 77.2090,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Delhi",
    addressRegion: "Delhi",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-9876543210",
    contactType: "customer service",
    availableLanguage: ["English", "Hindi"],
  },
};

export const WEBPAGE_SCHEMA = (pageTitle: string, pageDescription: string, pageUrl: string) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${pageUrl}#webpage`,
  url: pageUrl,
  name: pageTitle,
  description: pageDescription,
  isPartOf: {
    "@id": "https://bookateacher.in/#website",
  },
  about: {
    "@id": "https://bookateacher.in/#organization",
  },
  inLanguage: "en-IN",
});

// Generate combined JSON-LD for homepage
export function getHomepageJsonLd() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZATION_SCHEMA,
      {
        "@type": "WebSite",
        "@id": "https://bookateacher.in/#website",
        url: "https://bookateacher.in",
        name: "bookateacher.in",
        description:
          "Certified IELTS, TOEFL, and Spoken English tutors across India. Live 1-on-1 coaching, mock tests, and personal feedback.",
        publisher: { "@id": "https://bookateacher.in/#organization" },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://bookateacher.in/search?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "WebPage",
        "@id": "https://bookateacher.in/#webpage",
        url: "https://bookateacher.in",
        name: "bookateacher.in — From 6.5 to 7.5. In six weeks.",
        description:
          "Certified IELTS, TOEFL, and Spoken English tutors across India. Live 1-on-1 coaching, mock tests under real test conditions, and personal feedback.",
        isPartOf: { "@id": "https://bookateacher.in/#website" },
        about: { "@id": "https://bookateacher.in/#organization" },
        inLanguage: "en-IN",
      },
      COURSE_SCHEMA,
      FAQ_SCHEMA,
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://bookateacher.in",
          },
        ],
      },
    ],
  });
}


