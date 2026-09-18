import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { updateUser, recordAdminAction } from "@/lib/db";
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

    updateUser(user.id, {
      ...parsed,
      subjects: parsed.subjects,
      credentials: credentialsData,
    });

    recordAdminAction(user.id, "updated_profile", "user", user.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "An error occurred";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
