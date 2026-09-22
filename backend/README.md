# bookateacher backend — Hono API + PostgreSQL

Connects to a Railway PostgreSQL database. Runs as a standalone API server.

## Start

\`\`\`bash
npm install
npm run dev       # local dev (needs DATABASE_URL env)
npm run migrate   # create schema
npm run seed      # seed test data
npm start         # production start
\`\`\`

## Environment variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| DATABASE_URL | yes | — | PostgreSQL connection string (Railway provides this) |
| NEXTAUTH_URL | yes | — | Base URL of this backend, e.g. \`https://your-backend.railway.app` |
| NEXTAUTH_SECRET | yes | — | Session encryption secret (generate: \`openssl rand -base64 32\`) |
| GOOGLE_CLIENT_ID | no | — | Google OAuth client ID (for Google login) |
| GOOGLE_CLIENT_SECRET | no | — | Google OAuth client secret |
| CORS_ORIGINS | no | \`http://localhost:3000\` | Comma-separated list of allowed frontend origins |

## API

All routes are under \`/api\`.

### Auth
- \`POST /api/auth/general\` — register or login (JSON body: \`{ action: "register"|"login", data: {...} }\`)
- \`GET/POST /api/auth/[...nextauth]\` — NextAuth handlers (login with Google, session check, signout)

### Leads
- \`POST /api/leads\` — create lead, update lead, accept/decline, create session, complete session, testimonial requests

### Tutor profile
- \`POST /api/tutor/profile\` — update tutor profile

### Health
- \`GET /api/health\` — returns \`{ ok: true }\`
