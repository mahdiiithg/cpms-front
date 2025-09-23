'use client';

import { useSession } from 'next-auth/react';
import { useAuthPromptContext } from '@/components/auth/AuthPromptProvider';
import { toast } from 'sonner';

export const useRequireAuth = () => {
  const { data: session } = useSession();
  const { openAuth } = useAuthPromptContext();

  const ensureAuth = (message) => {
    if (!session?.userId) {
      openAuth();
      if (message) toast.info(message);
      return false;
    }
    return true;
  };

  return { isAuthed: !!session?.userId, ensureAuth };
};
