'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import AuthModal from './AuthModal';

const AuthPromptContext = createContext({ openAuth: () => {}, closeAuth: () => {} });

export const AuthPromptProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  const openAuth = useCallback(() => setOpen(true), []);
  const closeAuth = useCallback(() => setOpen(false), []);

  const value = useMemo(() => ({ openAuth, closeAuth }), [openAuth, closeAuth]);

  return (
    <AuthPromptContext.Provider value={value}>
      {children}
      <AuthModal open={open} onClose={closeAuth} />
    </AuthPromptContext.Provider>
  );
};

export const useAuthPromptContext = () => useContext(AuthPromptContext);
