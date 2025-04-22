// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl.clone();

  if (url.pathname === "/google") {
    return NextResponse.redirect("https://www.google.com");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/google"],
};
