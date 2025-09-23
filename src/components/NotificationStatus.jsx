'use client';

import { Button } from 'antd';
import { usePushNotifications } from '@/hooks/usePushNotifications';
import { subscribe, unsubscribe } from '@/lib/push-notifications';

export const NotificationStatus = () => {
  const { isSupported, isSubscribed, isLoading } = usePushNotifications();

  if (!isSupported) {
    return <div>Push notifications are not supported in this browser.</div>;
  }

  if (isLoading) {
    return <div>Loading notification status...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <p>Notifications: {isSubscribed ? 'Enabled' : 'Disabled'}</p>
      <Button onClick={isSubscribed ? unsubscribe : subscribe}>
        {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
      </Button>
    </div>
  );
};
