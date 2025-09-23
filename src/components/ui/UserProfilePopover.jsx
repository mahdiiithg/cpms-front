'use client';

import useMediaQuery from '@/hooks/useMediaQuery';
import { Avatar, Dropdown, Modal } from 'antd';
import {
  Settings,
  User,
  LogOut,
  Heart,
  Ticket,
  Dumbbell,
  User2,
  LucideMessageCircleQuestion,
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const UserProfilePopover = ({ triggerType = 'hover' }) => {
  const isMobile = useMediaQuery('(max-width: 639px)');
  const router = useRouter();

  const confirmLogout = () => {
    signOut();
    // Modal.confirm({
    //   title: 'Confirm Logout',
    //   content: 'Are you sure you want to log out?',
    //   okText: 'Yes, Log Out',
    //   cancelText: 'Cancel',
    //   okType: 'danger',
    //   onOk: handleLogout,
    //   centered: true,
    // });
  };

  const items = [
    {
      key: '1',
      label: 'My Account',
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      label: 'Profile',
      icon: <User2 size={16} />,
      extra: '⌘P',
    },
    {
      key: '3',
      label: 'Wishlist',
      icon: <Heart size={16} />,
      extra: '⌘W',
    },
    {
      key: '4',
      label: 'Bookings',
      icon: <Ticket size={16} />,
      extra: '⌘B',
    },
    {
      key: '7',
      label: 'Plans',
      icon: <Dumbbell size={16} />,
      extra: '⌘P',
    },
    {
      key: '6',
      label: 'FAQ',
      icon: <LucideMessageCircleQuestion size={16} />,
      extra: '⌘F',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: <span style={{ color: '#ff4d4f' }}>Log out</span>,
      icon: <LogOut size={16} color="#ff4d4f" />,
    },
  ];

  const handleMenuClick = ({ key }) => {
    switch (key) {
      case '2':
        // Handle Profile click
        router.push('/dashboard/profile');
        break;
      case '3':
        // Handle wishlist click
        router.push('/dashboard/wishlist');
        break;
      case '4':
        // Handle Settings click
        router.push('/dashboard/booking');
        break;
      case '6':
        // Handle FAQ click
        router.push('/dashboard/FAQ');
        break;
      case '7':
        // Handle FAQ click
        router.push('/dashboard/plans');
        break;
      case 'logout':
        confirmLogout();
        break;
      default:
        break;
    }
  };

  return (
    <Dropdown
      menu={{ items, onClick: handleMenuClick }}
      placement="bottomLeft"
      trigger={triggerType}
    >
      <Avatar
        style={{ backgroundColor: '#f2f2f2', verticalAlign: 'middle' }}
        className="cursor-pointer"
        icon={<User color="#212121" size={isMobile ? 20 : 25} />}
        size={isMobile ? 'small' : 'default'}
      />
    </Dropdown>
  );
};

export default UserProfilePopover;
