import { cookies } from 'next/headers';

export async function getServerAuthCookies() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value || null;
  const guestId = cookieStore.get('uuid')?.value || null;

  return { token, guestId };
}
