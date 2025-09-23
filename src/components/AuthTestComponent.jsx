'use client';

import { Button } from 'antd';
import { useSession } from 'next-auth/react';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { toast } from 'sonner';

export default function AuthTestComponent() {
  const { data: session } = useSession();
  const { ensureAuth } = useRequireAuth();

  const testAuth = () => {
    if (!ensureAuth('Please login to test this feature.')) return;
    toast.success(`Hello ${session?.user?.name || 'User'}! Auth is working.`);
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-4">Auth Test Component</h3>
      <div className="space-y-2">
        <p><strong>Session Status:</strong> {session ? 'Logged In' : 'Not Logged In'}</p>
        {session && (
          <>
            <p><strong>User:</strong> {session.user?.name}</p>
            <p><strong>Email:</strong> {session.user?.email}</p>
            <p><strong>User ID:</strong> {session.userId}</p>
          </>
        )}
        <Button type="primary" onClick={testAuth}>
          Test Auth Required Action
        </Button>
      </div>
    </div>
  );
}
