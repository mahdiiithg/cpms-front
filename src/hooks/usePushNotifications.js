'use client';
import { useEffect, useState } from 'react';
import { initialPushNotifications } from '../lib/push-notifications';
import { useSession } from 'next-auth/react';

export const usePushNotifications = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    // Check if push notifications are supported
    const supported = 'serviceWorker' in navigator && 'PushManager' in window;
    setIsSupported(supported);

    if (supported && session?.token) {
      initializePushNotifications(session?.token);
    } else {
      setIsLoading(false);
    }
  }, [session]);

  const initializePushNotifications = async (userToken) => {
    try {
      setIsLoading(true);
      const success = await initialPushNotifications(userToken);
      setIsSubscribed(success);
    } catch (error) {
      console.error('Failed to initialize push notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isSupported,
    isSubscribed,
    isLoading,
  };
};
