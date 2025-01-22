import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest){
    const cookie = req.cookies.get("jwt");
    const {origin} = req.nextUrl;
    console.log("Cookie >>",cookie);
    if(!cookie){
        return NextResponse.redirect(new URL("/",origin));
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/private/:path*'
    ]
}