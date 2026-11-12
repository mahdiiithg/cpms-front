'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button, Spin } from 'antd';
import { Building2, Heart, UserRound, MapPin } from 'lucide-react';
import {
  pageSurfaceClass,
  panelClass,
  solidCtaClass,
  outlineCtaClass,
} from '@/lib/brandTheme';

const DashboardPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/signin?callbackUrl=%2Fdashboard');
    }
  }, [status, router]);

  if (status === 'loading' || status === 'unauthenticated') {
    return (
      <div className={`${pageSurfaceClass} flex min-h-[50vh] items-center justify-center`}>
        <Spin size="large" />
      </div>
    );
  }

  const firstName =
    session?.user?.name?.split(' ')?.[0] ||
    session?.user?.email?.split('@')?.[0] ||
    'there';

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cp-lime">
          Account
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
          Welcome back, {firstName}
        </h1>
        <p className="mt-2 max-w-2xl text-cp-muted">
          Your submitted properties live under My listings — check approval
          status, edit, and resubmit for review.
        </p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <Link
          href="/dashboard/listings"
          className={`${panelClass} block p-5 transition hover:border-cp-lime/40`}
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-cp-lime/20 bg-cp-lime/10">
            <Building2 className="h-5 w-5 text-cp-lime" />
          </div>
          <p className="text-sm text-cp-subtle">My listings</p>
          <p className="mt-1 text-2xl font-semibold text-white">
            Open →
          </p>
          <p className="mt-1 text-xs text-cp-faint">
            Pending, live, and re-approval status
          </p>
        </Link>
        <div className={`${panelClass} p-5`}>
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-cp-lime/20 bg-cp-lime/10">
            <MapPin className="h-5 w-5 text-cp-lime" />
          </div>
          <p className="text-sm text-cp-subtle">Focus</p>
          <p className="mt-1 text-2xl font-semibold text-white">Coastal AU</p>
        </div>
        <div className={`${panelClass} p-5`}>
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-cp-lime/20 bg-cp-lime/10">
            <UserRound className="h-5 w-5 text-cp-lime" />
          </div>
          <p className="text-sm text-cp-subtle">Signed in as</p>
          <p className="mt-1 truncate text-lg font-semibold text-white">
            {session?.user?.email || 'Member'}
          </p>
        </div>
      </div>

      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/dashboard/listings"
          className={`${panelClass} block p-6 transition hover:border-cp-lime/40`}
        >
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cp-lime text-cp-surface">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">My listings</h2>
              <p className="mt-1 text-sm text-cp-muted">
                Find every property you submitted, with Pending / Live / Needs
                re-approval badges.
              </p>
            </div>
          </div>
        </Link>
        <Link
          href="/dashboard/profile"
          className={`${panelClass} block p-6 transition hover:border-cp-lime/40`}
        >
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cp-lime/30 bg-cp-lime/10 text-cp-lime">
              <UserRound className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Your profile</h2>
              <p className="mt-1 text-sm text-cp-muted">
                Update name, email, phone, and location for your Coast Planet
                account.
              </p>
            </div>
          </div>
        </Link>
        <Link
          href="/listings"
          className={`${panelClass} block p-6 transition hover:border-cp-lime/40`}
        >
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cp-lime/30 bg-cp-lime/10 text-cp-lime">
              <Heart className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Browse listings</h2>
              <p className="mt-1 text-sm text-cp-muted">
                Explore buy, rent, and management rights opportunities along the
                coast.
              </p>
            </div>
          </div>
        </Link>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button type="primary" className={solidCtaClass} href="/dashboard/listings">
          My listings
        </Button>
        <Button className={outlineCtaClass} href="/dashboard/profile">
          Edit profile
        </Button>
        <Button className={outlineCtaClass} href="/listings">
          View all properties
        </Button>
      </div>
    </div>
  );
};

export default DashboardPage;
