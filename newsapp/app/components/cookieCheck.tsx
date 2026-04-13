import { cookies } from 'next/headers'
 
export default async function cookieCheck() {
  const cookieStore = await cookies()
  const subscribed = cookieStore.has('subscribed') ? cookieStore.get('subscribed')?.value === 'true' : false;
  return subscribed;
}