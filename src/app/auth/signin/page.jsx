import { redirect } from 'next/navigation';

/** Legacy path — canonical auth is /signin */
export default function LegacyAuthSigninRedirect() {
  redirect('/signin');
}
