'use client';

import useMediaQuery from '@/hooks/useMediaQuery';
import { Avatar, Dropdown } from 'antd';
import { User, LogOut, Heart, User2 } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const UserProfilePopover = ({ triggerType = 'hover' }) => {
  const isMobile = useMediaQuery('(max-width: 639px)');
  const router = useRouter();

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
    },
    {
      key: '3',
      label: 'Wishlist',
      icon: <Heart size={16} />,
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
        router.push('/dashboard/profile');
        break;
      case '3':
        router.push('/dashboard/wishlist');
        break;
      case 'logout':
        signOut({ callbackUrl: '/' });
        break;
      default:
        break;
    }
  };

  return (
    <Dropdown
      menu={{ items, onClick: handleMenuClick }}
      placement="bottomLeft"
      trigger={[triggerType]}
    >
      <Avatar
        style={{ backgroundColor: '#ccff00', verticalAlign: 'middle' }}
        className="cursor-pointer"
        icon={<User color="#171717" size={isMobile ? 20 : 25} />}
        size={isMobile ? 'small' : 'default'}
      />
    </Dropdown>
  );
};

export default UserProfilePopover;
