import { ApolloWrapper } from '@/lib/ApolloWrapper';
import { ConfigProvider } from 'antd';
import { SessionProvider } from 'next-auth/react';
import antdTheme from '@/lib/antd-theme';
import './globals.css';
import '@/styles/fonts.css';
import { Toaster } from 'sonner';
import { PushNotificationHandler } from '@/components/PushNotificationHandler';
import { auth } from '@/auth';
import { AuthPromptProvider } from '@/components/auth/AuthPromptProvider';

export const metadata = {
  title: 'Coast Planet - Property Management',
  description: 'Coast Planet - All-inclusive property management services for coastal properties. Professional property management, building management, and real estate services.',
};

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html lang="en">
      <head>
        {/* Google Pay API */}
        {/* <script 
          async 
          src="https://pay.google.com/gp/p/js/pay.js"
          onLoad="console.log('Google Pay script loaded')"
        ></script> */}
        
        {/* Apple Pay Domain Verification (add your domain verification file) */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Preload Google Pay for better performance */}
        <link rel="preload" href="https://pay.google.com/gp/p/js/pay.js" as="script" />
      </head>
      <body className="font-sans">
        <SessionProvider>
          <ConfigProvider theme={antdTheme}>
            <ApolloWrapper>
              <AuthPromptProvider>
                {session?.token && <PushNotificationHandler />}
                {children}
              </AuthPromptProvider>
            </ApolloWrapper>
          </ConfigProvider>
        </SessionProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
