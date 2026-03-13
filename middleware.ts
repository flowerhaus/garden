import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // TODO: Genaktiver auth-check når login er klar
  // const session = request.cookies.get("session")?.value;
  // const { pathname } = request.nextUrl;
  // if (pathname.startsWith("/dashboard") && !session) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
