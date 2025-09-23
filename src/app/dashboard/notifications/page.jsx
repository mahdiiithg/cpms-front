'use client';

import { useState } from 'react';
import NotificationsList from '@/components/ui/NotificationsList';
import NotificationTabButton from '@/components/ui/NotificationTabButton';
import useMediaQuery from '@/hooks/useMediaQuery';
import DashboardHeader from '@/components/ui/DashboardHeader';
import { Bell } from 'lucide-react';

function generateRandomNotifications(count = 20) {
  const types = [
    'New Message',
    'Booking',
    'Alert',
    'Reminder',
    'Promotion',
    'Update',
  ];

  const descriptions = [
    'You received a new message from our support team. Please check your inbox to view the full conversation and respond at your convenience.',
    'Your gym booking has been confirmed successfully. Make sure to arrive at least 10 minutes early and bring your membership ID.',
    'We’ve detected unusual activity on your account. For your security, please review your recent actions and update your password if needed.',
    'Don’t forget about your scheduled workout session today. Staying consistent is the key to achieving your fitness goals!',
    'You’ve unlocked a special promotion! Enjoy 30% off on all gym merchandise this week — visit the store section to redeem it.',
    'We’ll be performing system maintenance tonight from 11:00 PM to 2:00 AM. Some features may be temporarily unavailable during this time.',
    'A new gym partner has joined our platform in your area. Check out their profile and explore exclusive classes and offers.',
    'Your subscription is about to expire in 3 days. Renew now to continue enjoying full access without interruption.',
    'A new blog post has been published: “5 Tips to Stay Fit Without the Gym.” Head over to the blog section to read more.',
    'A new app update is available with performance improvements and new features. Update now to enjoy the best experience.',
  ];

  const getRandomDate = () => {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    return date.toISOString().split('T')[0];
  };

  const getRandomTime = () => {
    const hour = String(Math.floor(Math.random() * 24)).padStart(2, '0');
    const minute = String(Math.floor(Math.random() * 60)).padStart(2, '0');
    return `${hour}:${minute}`;
  };

  const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const generateId = () =>
    'id-' +
    Math.random().toString(36).substring(2, 10) +
    Date.now().toString(36);

  const getRandomBoolean = () => Math.random() < 0.5;

  const notifications = Array.from({ length: count }, () => ({
    id: generateId(),
    type: getRandomItem(types),
    date: getRandomDate(),
    time: getRandomTime(),
    description: getRandomItem(descriptions),
    isRead: getRandomBoolean(),
  }));

  return notifications;
}

const NotificationPage = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [activeTab, setActiveTab] = useState('unread');

  const handleClickTabs = (tabKey) => {
    if (activeTab === tabKey) return;
    setActiveTab(tabKey);
  };

  const filteredNotifications = generateRandomNotifications().filter((notif) =>
    activeTab === 'read' ? notif.isRead : !notif.isRead,
  );

  return (
    <div>
      <DashboardHeader />
      <div className="flex h-full items-center justify-center overflow-y-auto">
        <div className="flex h-full w-full max-w-[1200px] flex-col items-start justify-between gap-2 md:p-10 lg:p-32 lg:py-5">
          {/* header */}
          <div className="flex h-fit w-full items-center justify-between">
            <div className="flex w-fit items-center justify-start gap-1">
              <Bell size={isMobile ? 23 : 38} />
              <h1 className="text-xl uppercase md:text-2xl lg:text-4xl">
                Notifications
              </h1>
            </div>
            <div className="flex w-fit items-center justify-start gap-1">
              <NotificationTabButton
                text="unread"
                isActive={activeTab === 'unread'}
                onClick={handleClickTabs}
                isMobileSize={isMobile}
              />
              <NotificationTabButton
                text="read"
                isActive={activeTab === 'read'}
                onClick={handleClickTabs}
                isMobileSize={isMobile}
              />
            </div>
          </div>
          {/* messages */}
          <NotificationsList messages={filteredNotifications} />
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
