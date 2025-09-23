'use client';
import { useEffect } from 'react';
import { usePushNotifications } from '@/hooks/usePushNotifications';
import { useRouter } from 'next/navigation';

export const PushNotificationHandler = () => {
  const { isSupported, isSubscribed, isLoading } = usePushNotifications();
  const router = useRouter();

  useEffect(() => {
    if (isSupported && !isLoading) {
      if (isSubscribed) {
        console.log('Push notifications are active');
      } else {
        console.log('Push notifications failed to initialize');
      }
    }
  }, [isSupported, isSubscribed, isLoading]);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data.type === 'NAVIGATE') {
          router.push(event.data.url);
        }
      });
    }
  }, []);

  // This component doesn't render anything visible
  return null;
};
