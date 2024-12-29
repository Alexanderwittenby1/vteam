import { NextResponse, type NextRequest } from "next/server";
import { authenticate } from "./auth-provider";

const protectedRoutes: { [key: string]: string[] } = {
  '/payment': ['user', 'admin'],
  '/profile': ['user', 'admin'],
  '/logout': ['user', 'admin'],
  '/mobile/profile': ['user', 'admin'],
  '/admin': ['admin'] 
  };

export async function middleware(request: NextRequest) {
  const roles = protectedRoutes[request.nextUrl.pathname];

  if (roles) {
    const user = await authenticate(request);
    console.log("User in mw",user);
    
    

    if (user && roles.includes(user.role)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  return NextResponse.next(); 
}