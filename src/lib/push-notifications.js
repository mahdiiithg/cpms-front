import { gql } from '@apollo/client';
import { getClient } from './ApolloClient';
import { urlBase64ToUint8Array } from '@/utils/push';
import { SUBSCRIBE_TO_PUSH } from './mutations/subscribeMutation';

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

const UNSUBSCRIBE_FROM_PUSH = gql`
  mutation UnsubscribeFromPush($endpoint: String!) {
    unsubscribeFromPush(endpoint: $endpoint)
  }
`;

// Module-level state
let registration = null;

// Register service worker
export const registerServiceWorker = async () => {
  if (!('serviceWorker' in navigator)) {
    console.log('Service Worker not supported');
    return false;
  }

  try {
    registration = await navigator.serviceWorker.register('/sw.js');
    console.log('Service Worker registered successfully');
    return true;
  } catch (error) {
    console.error('Service Worker registration failed:', error);
    return false;
  }
};

// Request notification permission
export const requestPermission = async () => {
  if (!('Notification' in window)) {
    console.log('Notifications not supported');
    return 'denied';
  }

  if (Notification.permission === 'granted') {
    return 'granted';
  }

  const permission = await Notification.requestPermission();
  return permission;
};

// Send subscription to backend
const sendSubscriptionToBackend = async (subscription, userToken) => {
  try {
    const subscriptionData = {
      endpoint: subscription.endpoint,
      keys: {
        auth: subscription.toJSON().keys.auth,
        p256dh: subscription.toJSON().keys.p256dh,
      },
    };

    const client = getClient(userToken);

    await client.mutate({
      mutation: SUBSCRIBE_TO_PUSH,
      variables: { input: subscriptionData },
    });

    console.log('Subscription sent to backend successfully');
  } catch (error) {
    console.error('Failed to send subscription to backend:', error);
  }
};

// Subscribe to push notifications
export const subscribe = async (userToken) => {
  if (!registration) {
    console.error('Service Worker not registered');
    return null;
  }

  try {
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
    });

    // Send subscription to backend via GraphQL
    await sendSubscriptionToBackend(subscription, userToken);

    return subscription;
  } catch (error) {
    console.error('Push subscription failed:', error);
    return null;
  }
};

// Unsubscribe from push notifications
export const unsubscribe = async (userToken) => {
  if (!registration) {
    return false;
  }

  try {
    const subscription = await registration.pushManager.getSubscription();
    if (subscription) {
      await subscription.unsubscribe();

      const client = getClient(userToken);

      // Notify backend about unsubscription
      await client.mutate({
        mutation: UNSUBSCRIBE_FROM_PUSH,
        variables: { endpoint: subscription.endpoint },
      });

      console.log('Unsubscribed successfully');
      return true;
    }
    return false;
  } catch (error) {
    console.error('Unsubscription failed:', error);
    return false;
  }
};

// Check if user is already subscribed
export const isSubscribed = async () => {
  if (!registration) {
    return false;
  }

  try {
    const subscription = await registration.pushManager.getSubscription();
    return subscription !== null;
  } catch (error) {
    console.error('Failed to check subscription status:', error);
    return false;
  }
};

// Initialize push notifications (main function to call)
export const initialPushNotifications = async (userToken) => {
  // Register service worker
  const swRegistered = await registerServiceWorker();
  if (!swRegistered) return false;

  // Check if already subscribed
  const alreadySubscribed = await isSubscribed();
  if (alreadySubscribed) {
    console.log('User already subscribed to push notifications');
    return true;
  }

  // Request permission
  const permission = await requestPermission();
  if (permission !== 'granted') {
    console.log('Notification permission denied');
    return false;
  }

  // Subscribe to push notifications
  const subscription = await subscribe(userToken);
  return subscription !== null;
};
