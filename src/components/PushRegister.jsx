'use client';

import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { SUBSCRIBE_TO_PUSH } from '../app/lib/mutations/subscribeMutation';
import { urlBase64ToUint8Array } from '../utils/push';

export default function PushRegister() {
  const [subscribeToPush] = useMutation(SUBSCRIBE_TO_PUSH);

  useEffect(() => {
    const setupPush = async () => {
      if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        console.log('Push not supported in this browser.');
        return;
      }

      try {
        const registration = await navigator.serviceWorker.register('/sw.js');

        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(
            process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
          ),
        });

        await subscribeToPush({
          variables: {
            input: {
              endpoint: subscription.endpoint,
              keys: {
                auth: subscription.toJSON().keys.auth,
                p256dh: subscription.toJSON().keys.p256dh,
              },
            },
          },
        });

        console.log('Push Subscription sent to backend');
      } catch (error) {
        console.error('Push subscription failed', error);
      }
    };

    setupPush();
  }, []);

  return null;
}
