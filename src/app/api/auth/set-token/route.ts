import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { token } = await req.json();
  console.log("Received token:", token);

  if (!token) {
    return NextResponse.json({ error: "Token is missing" }, { status: 400 });
  }

  const cookieStore = await cookies();

  cookieStore.set({
    name: "token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 2,
  });

  return NextResponse.json({ message: "Token stored successfully" });
}
