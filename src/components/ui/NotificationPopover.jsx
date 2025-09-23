'use client';

import { useRouter } from 'next/navigation';
import useMediaQuery from '@/hooks/useMediaQuery';
import { Avatar, Dropdown } from 'antd';
import { Bell } from 'lucide-react';

const NotificationPopover = ({ triggerType = 'hover' }) => {
  const isMobile = useMediaQuery('(max-width: 639px)');
  const router = useRouter();

  const handleMenuClick = ({ key }) => {
    if (key === '1') {
      router.push('/dashboard/notifications');
    }
  };

  const items = [
    {
      key: '1',
      label: 'Notifications',
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      label: 'Message #1',
    },
  ];

  return (
    <Dropdown
      menu={{ items, onClick: handleMenuClick }}
      placement="bottomLeft"
      trigger={[triggerType]}
    >
      <Avatar
        style={{ backgroundColor: '#f2f2f2', verticalAlign: 'middle' }}
        className="cursor-pointer"
        icon={<Bell color="#212121" size={isMobile ? 20 : 25} />}
        size={isMobile ? 'small' : 'default'}
      />
    </Dropdown>
  );
};

export default NotificationPopover;
