import { ApolloWrapper } from '@/lib/ApolloWrapper';
import { ConfigProvider } from 'antd';
import { SessionProvider } from 'next-auth/react';
import { Poppins } from 'next/font/google';
import antdTheme from '@/lib/antd-theme';
import './globals.css';
import { Toaster } from 'sonner';
import { PushNotificationHandler } from '@/components/PushNotificationHandler';
import { auth } from '@/auth';
import { AuthPromptProvider } from '@/components/auth/AuthPromptProvider';
import LayoutWrapper from '@/components/LayoutWrapper';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata = {
  title: 'Coast Planet - Property Management',
  description:
    'Coast Planet - All-inclusive property management services for coastal properties. Professional property management, building management, and real estate services.',
};

async function loadSession() {
  try {
    return await auth();
  } catch (error) {
    // Missing AUTH_SECRET / misconfigured Auth.js must not white-screen public pages.
    console.error('[layout] auth() failed (continuing unauthenticated):', error?.message || error);
    return null;
  }
}

export default async function RootLayout({ children }) {
  const session = await loadSession();

  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={`${poppins.className} font-sans`}>
        <SessionProvider
          session={session}
          refetchOnWindowFocus={false}
          refetchInterval={0}
        >
          <ConfigProvider theme={antdTheme}>
            <ApolloWrapper>
              <AuthPromptProvider>
                {session?.token && <PushNotificationHandler />}
                <LayoutWrapper>{children}</LayoutWrapper>
              </AuthPromptProvider>
            </ApolloWrapper>
          </ConfigProvider>
        </SessionProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
