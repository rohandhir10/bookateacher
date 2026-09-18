import { NextRequest, NextResponse } from "next/server";
import { handleRegister, handleLogin } from "@/lib/actions";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body?.action) {
      return NextResponse.json({ error: "Missing action" }, { status: 400 });
    }

    if (body.action === "register") {
      const result = await handleRegister(body.data);
      return NextResponse.json({ success: true, user: result });
    }

    if (body.action === "login") {
      const result = await handleLogin(body.data);
      return NextResponse.json({ success: true, user: result });
    }

    throw new Error("Unknown action");
  } catch (error) {
    const message = error instanceof Error ? error.message : "An error occurred";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
