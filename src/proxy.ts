import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function proxy(request: Request) {
  const session = await auth();

  const protectedPaths = ["/dashboard", "/tutor", "/admin"];
  const loginPaths = ["/login", "/register"];

  const pathname = new URL(request.url).pathname;
  const isProtected = protectedPaths.some((p) => pathname.startsWith(p));
  const isLoginPage = loginPaths.some((p) => pathname.startsWith(p));

  // Protected routes — redirect to login if not authenticated
  if (isProtected && !session) {
    const url = new URL("/login", request.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  // Login/register pages — redirect to dashboard if already authenticated
  if (isLoginPage && session) {
    const role = (session.user as { role?: string }).role;
    if (role === "tutor") {
      return NextResponse.redirect(new URL("/tutor/dashboard", request.url));
    }
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Student dashboard — only students
  if (pathname.startsWith("/dashboard") && session) {
    const role = (session.user as { role?: string }).role;
    if (role === "tutor") return NextResponse.redirect(new URL("/tutor/dashboard", request.url));
    if (role === "admin") return NextResponse.redirect(new URL("/admin", request.url));
  }

  // Tutor dashboard — only tutors
  if (pathname.startsWith("/tutor") && session) {
    const role = (session.user as { role?: string }).role;
    if (role !== "tutor") return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Admin — only admins
  if (pathname.startsWith("/admin") && session) {
    const role = (session.user as { role?: string }).role;
    if (role !== "admin") return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
