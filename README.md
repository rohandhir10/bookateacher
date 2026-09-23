# bookateacher.in

bookateacher.in is a curated tutoring marketplace focused on IELTS, TOEFL, Spoken English, and related high-intent learning goals.

## Canonical architecture

The production application is intentionally one stack: Next.js App Router, NextAuth, Turso/libSQL, better-sqlite3 for local development, and Razorpay for payments.

The retired Hono/Railway backend is no longer part of the application path.

## Security rules

- Authentication is authoritative on the server.
- API routes derive the current user from the NextAuth session.
- Client-supplied ownership IDs are not trusted for authorization.
- Database update fields are explicitly allowlisted.
- Payment verification fails closed and records server-created orders.
- Session cookies are never written through browser JavaScript.
- Registration and credential authentication are rate-limited.

The current rate limiter is process-local. A distributed limiter or platform WAF/rate limit should be added before high-volume production traffic.

## Environment

Production normally requires AUTH_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, TURSO_DATABASE_URL, TURSO_AUTH_TOKEN, RAZORPAY_KEY_ID, and RAZORPAY_KEY_SECRET.

Development seed data requires a SEED_PASSWORD of at least 12 characters. Demo seeding is explicitly guarded in production.

## Development

    npm install
    npm run dev

Validation:

    npm run lint
    npx tsc --noEmit

GitHub Actions runs lint and typecheck for pushes to main/refactor-security-architecture-business and pull requests targeting main.

## Marketplace integrity

Tutor ratings and review counts come from stored testimonial records. The application does not generate reputation values randomly.

When the production database is unavailable, the public tutor directory fails closed instead of silently presenting static demo tutors as marketplace truth. Static demo tutors are development-only.

## Product flow

Student intent -> matching intake -> human/tutor match -> booking -> payment -> completed session -> review/repeat booking.

Registration is intentionally lightweight. Detailed matching requirements are collected after account creation.

## Refactor branch

The production-hardening work from the codebase audit lives on refactor/security-architecture-business and is intentionally kept separate from main until reviewed and validated.