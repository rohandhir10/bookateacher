import { NextRequest, NextResponse } from "next/server";
import { handleRegister } from "@/lib/actions";
import { getClientIdentifier, consumeRateLimit, rateLimitHeaders } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const client = await getClientIdentifier();
  const limit = consumeRateLimit("register:" + client, { limit: 5, windowMs: 15 * 60 * 1000 });

  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many registration attempts. Please try again later." },
      { status: 429, headers: rateLimitHeaders(limit) },
    );
  }

  try {
    const body = await request.json();

    if (body?.action !== "register") {
      return NextResponse.json({ error: "Unsupported authentication action" }, { status: 405 });
    }

    const result = await handleRegister(body.data);
    return NextResponse.json({ success: true, user: result }, { headers: rateLimitHeaders(limit) });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Registration failed";
    return NextResponse.json({ error: message }, { status: 400, headers: rateLimitHeaders(limit) });
  }
}
