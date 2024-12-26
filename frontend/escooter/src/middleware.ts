import { NextResponse, type NextRequest } from "next/server";
import { authenticate } from "./auth-provider";
export function middleware(request: NextRequest) {

  if (request.nextUrl.pathname === "/payment" ) {
    const user = authenticate(request);
    console.log('User:', user);
    if (user) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL ("/login", request.url));
  }
  
  return NextResponse.next(); 
  }

