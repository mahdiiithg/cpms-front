'use client';

import { logout } from '@/lib/actions/auth';
import { Button } from 'antd';

const LogoutButton = () => {
  return (
    <Button onClick={() => logout()} variant="filled">
      Logout
    </Button>
  );
};

export default LogoutButton;
