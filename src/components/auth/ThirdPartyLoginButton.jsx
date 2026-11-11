'use client';

import React from 'react';
import { Button } from 'antd';
import { login } from '@/lib/actions/auth';

function GoogleGlyph({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l5.7-5.7C34.2 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.9z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.7 16.1 19 13 24 13c3.1 0 5.8 1.1 8 3l5.7-5.7C34.2 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.2 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.5l.0.0 6.2 5.2C39.2 36.3 44 31 44 24c0-1.3-.1-2.7-.4-3.9z"
      />
    </svg>
  );
}

const providerMeta = {
  google: {
    label: 'Continue with Google',
    icon: <GoogleGlyph />,
  },
};

/**
 * Shared OAuth CTA — dark Coast Planet chrome, no missing logo assets.
 */
const ThirdPartyLoginButton = ({ providerName }) => {
  if (!providerName) return null;
  const meta = providerMeta[providerName] || {
    label: providerName,
    icon: null,
  };

  return (
    <Button
      onClick={() => login(providerName)}
      className="!flex h-11 w-full !items-center !justify-center !gap-2 !rounded-xl !border !border-cp-stroke !bg-cp-elevated !px-4 !font-medium !text-white hover:!border-cp-lime/50 hover:!text-cp-lime md:!max-w-[280px]"
    >
      {meta.icon}
      <span className="capitalize">{meta.label}</span>
    </Button>
  );
};

export default ThirdPartyLoginButton;
