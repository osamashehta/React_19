// app/api/guest/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  const cookieStore = await cookies();
  let guestId = cookieStore.get('uuid')?.value;
  console.log('runnnnning');
  if (!guestId) {
    guestId = uuidv4();
    const res = NextResponse.json({ guestId });
    res.cookies.set('uuid', guestId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    return res;
  }

  return NextResponse.json({ guestId });
}
