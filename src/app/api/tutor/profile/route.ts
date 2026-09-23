import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getUserById, updateUser, recordAdminAction } from "@/lib/db";
import { tutorProfileSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = session.user as { id: string; role: string };
    if (user.role !== "tutor") {
      return NextResponse.json({ error: "Only tutors can update profiles" }, { status: 403 });
    }

    const body = await request.json();
    const parsed = tutorProfileSchema.parse({
      name: body.name || "",
      bio: body.bio || "",
      hourly_rate: body.hourly_rate,
      subjects: body.subjects || [],
      ielts_band: body.ielts_band,
      certification: body.certification || "",
      experience_years: body.experience_years,
      teaching_style: body.teaching_style || "",
      background: body.background || "",
    });

    const credentialsData: Record<string, unknown> = {};
    if (parsed.certification) credentialsData.certification = parsed.certification;
    if (parsed.experience_years) credentialsData.experience_years = parsed.experience_years;
    if (parsed.ielts_band) credentialsData.ielts_band = parsed.ielts_band;
    if (parsed.teaching_style) credentialsData.teaching_style = parsed.teaching_style;
    if (parsed.background) credentialsData.background = parsed.background;

    await updateUser(user.id, {
      ...parsed,
      subjects: parsed.subjects,
      credentials: credentialsData,
    });

    await recordAdminAction(user.id, "updated_profile", "user", user.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "An error occurred";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}


export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (session.user.role !== "tutor") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const user = await getUserById(session.user.id);
  if (!user) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

  return NextResponse.json({
    profile: {
      id: user.id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      hourly_rate: user.hourly_rate,
      subjects: user.subjects ? JSON.parse(user.subjects) : [],
      credentials: user.credentials ? JSON.parse(user.credentials) : {},
      availability: user.availability ? JSON.parse(user.availability) : null,
      avatar_url: user.avatar_url,
      verified: !!user.verified,
    },
  });
}
