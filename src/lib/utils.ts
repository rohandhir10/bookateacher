export function generateId(): string {
  const arr = new Uint8Array(16);
  crypto.getRandomValues(arr);
  const hex = Array.from(arr, (b) => b.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export function formatCurrencyInRupees(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

export function formatDateTime(iso: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h} hr`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const SUBJECT_LABELS: Record<string, string> = {
  ielts: "IELTS",
  toefl: "TOEFL",
  "spoken-english": "Spoken English",
  gre: "GRE",
  gmat: "GMAT",
  sat: "SAT",
  ptet: "PTE",
  other: "Other",
};

export const SUBJECT_DESCRIPTIONS: Record<string, string> = {
  ielts: "International English Language Testing System — for study, work, and migration abroad",
  toefl: "Test of English as a Foreign Language — widely accepted for university admissions",
  "spoken-english": "Conversational English, fluency, pronunciation, and confidence",
  gre: "Graduate Record Examination — for graduate school admissions",
  gmat: "Graduate Management Admission Test — for business school admissions",
  sat: "Scholastic Assessment Test — for undergraduate admissions",
  ptet: "Pearson Test of English — fast, computer-based English proficiency test",
  other: "Other subjects and exams",
};
