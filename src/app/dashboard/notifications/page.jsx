'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Bell } from 'lucide-react';
import { Spin } from 'antd';
import { pageSurfaceClass, panelClass } from '@/lib/brandTheme';

const NotificationsPage = () => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/signin?callbackUrl=%2Fdashboard%2Fnotifications');
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
        <Bell className="h-7 w-7 text-cp-lime" />
        <h1 className="text-3xl font-semibold text-white">Notifications</h1>
      </div>
      <div className={`${panelClass} p-8 text-center`}>
        <p className="text-cp-muted">
          You are all caught up. Property alerts and account messages will show
          here.
        </p>
      </div>
    </div>
  );
};

export default NotificationsPage;
