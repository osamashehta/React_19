import { cookies } from 'next/headers';

export async function GET(): Promise<Response> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const guestId = cookieStore.get('uuid')?.value;
  if (token) {
    return new Response(JSON.stringify({ token, guestId }));
  } else {
    return new Response('Token not found', { status: 404 });
  }
}
