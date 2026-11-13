import { ApolloWrapper } from '@/lib/ApolloWrapper';
import { ConfigProvider } from 'antd';
import { SessionProvider } from 'next-auth/react';
import { Manrope, Noto_Sans_Arabic, Syne } from 'next/font/google';
import antdTheme from '@/lib/antd-theme';
import './globals.css';
import '@/styles/sefir-evolution.css';
import { Toaster } from 'sonner';
import { PushNotificationHandler } from '@/components/PushNotificationHandler';
import { auth } from '@/auth';
import { AuthPromptProvider } from '@/components/auth/AuthPromptProvider';
import LayoutWrapper from '@/components/LayoutWrapper';

const syne = Syne({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
  variable: '--font-syne',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-manrope',
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-noto-arabic',
});

export const metadata = {
  title: 'Sefir — AI customer communication',
  description:
    'Sefir is an AI-powered customer communication platform for WhatsApp, Instagram, and Email — answering from approved knowledge, handing off to humans, and respecting opt-outs.',
};

async function loadSession() {
  try {
    return await auth();
  } catch (error) {
    // Let Next.js keep its dynamic-render signal; only soft-fail real auth config errors.
    const message = String(error?.message || error || '');
    if (
      message.includes('Dynamic server usage') ||
      error?.digest === 'DYNAMIC_SERVER_USAGE'
    ) {
      throw error;
    }
    // Missing AUTH_SECRET / misconfigured Auth.js must not white-screen public pages.
    console.error(
      '[layout] auth() failed (continuing unauthenticated):',
      message,
    );
    return null;
  }
}

export default async function RootLayout({ children }) {
  const session = await loadSession();

  return (
    <html
      lang="en"
      className={`${syne.variable} ${manrope.variable} ${notoArabic.variable}`}
    >
      <head>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body
        className={`${manrope.className} font-sans`}
        style={{
          fontFamily:
            'var(--font-manrope), var(--font-noto-arabic), ui-sans-serif, system-ui, sans-serif',
        }}
      >
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
