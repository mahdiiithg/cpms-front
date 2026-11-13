'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const LayoutWrapper = ({ children }) => {
  const pathname = usePathname();

  // Don't show main header/footer on dashboard pages (they have their own layout)
  const isDashboardPage = pathname.startsWith('/dashboard');
  // Evolution landing owns its chrome
  const isSefirLanding = pathname === '/';

  const hideChrome = isDashboardPage || isSefirLanding;

  return (
    <>
      {!hideChrome && <Header />}
      {children}
      {!hideChrome && <Footer />}
    </>
  );
};

export default LayoutWrapper;
