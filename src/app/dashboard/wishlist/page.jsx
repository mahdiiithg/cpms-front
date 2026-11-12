'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Heart } from 'lucide-react';
import { Button, Spin } from 'antd';
import { pageSurfaceClass, panelClass, outlineCtaClass } from '@/lib/brandTheme';

const WishListPage = () => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/signin?callbackUrl=%2Fdashboard%2Fwishlist');
    }
  }, [status, router]);

  if (status === 'loading' || status === 'unauthenticated') {
    return (
      <div className={`${pageSurfaceClass} flex min-h-[50vh] items-center justify-center`}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center gap-2">
        <Heart className="h-7 w-7 text-cp-lime" />
        <h1 className="text-3xl font-semibold text-white">Wishlist</h1>
      </div>
      <div className={`${panelClass} p-8 text-center`}>
        <p className="text-cp-muted">
          Saved properties will appear here. Browse listings to start building
          your shortlist.
        </p>
        <div className="mt-6">
          <Link href="/listings">
            <Button className={outlineCtaClass}>Browse listings</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WishListPage;
