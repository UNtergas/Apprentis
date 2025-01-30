import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { CONFIG } from "@/env.config";
import { ROLE, Role } from "@shared/frontend";

const JWT_SECRET = new TextEncoder().encode(CONFIG.JWT_SECRET);

export async function middleware(req: NextRequest) {
  const cookie = req.cookies.get("jwt");
  const { origin, pathname } = req.nextUrl;

  if (!cookie) {
    // Redirect unauthenticated users to the sign-in page
    if (pathname === "/signIn" || pathname === "/signUp") {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/signIn", origin));
  }

  try {
    // Verify the JWT
    const { payload } = await jwtVerify(cookie.value, JWT_SECRET);
    const userRole = payload["role"] as Role;

    // If the user is trying to access sign-in or sign-up while already logged in, redirect them
    if (pathname === "/signIn" || pathname === "/signUp") {
      if (userRole === ROLE.STUDENT) {
        return NextResponse.redirect(new URL("/user", origin));
      } else if (userRole === ROLE.TUTOR) {
        return NextResponse.redirect(new URL("/school", origin));
      } else if (userRole === ROLE.ADMIN) {
        return NextResponse.redirect(new URL("/admin", origin));
      } else if (userRole === ROLE.COMPANY) {
        return NextResponse.redirect(new URL("/company", origin));
      }
    }

    // Role-based redirection logic (if user is on the wrong section)
    if (userRole === ROLE.STUDENT && !pathname.startsWith("/user")) {
      return NextResponse.redirect(new URL("/user", origin));
    } else if (userRole === ROLE.TUTOR && !pathname.startsWith("/school")) {
      return NextResponse.redirect(new URL("/school", origin));
    } else if (userRole === ROLE.ADMIN && !pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/admin", origin));
    } else if (userRole === ROLE.COMPANY && !pathname.startsWith("/company")) {
      return NextResponse.redirect(new URL("/company", origin));
    }

    // If the user is already on the correct page, allow them to proceed
    return NextResponse.next();
  } catch (err) {
    console.error("Invalid JWT:", err);
    return NextResponse.redirect(new URL("/signIn", origin));
  }
}

export const config = {
  matcher: [
    "/signIn",
    "/signUp",
    '/user/:path*',
    '/admin/:path*',
    '/school/:path*',
    '/company/:path*',
  ],
};
