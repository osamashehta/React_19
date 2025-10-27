// src/app/api/auth-cookie/route.ts
// import { getServerAuthCookies } from "@/lib/utils";
import { getServerAuthCookies } from "@/lib/getServerSession";
import { NextResponse } from "next/server";


export async function GET() {
  const { token, guestId } = await getServerAuthCookies();
  return NextResponse.json({ token, guestId });
}
