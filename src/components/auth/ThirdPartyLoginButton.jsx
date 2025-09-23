import React from 'react';
import { Button } from 'antd';
import { login } from '@/lib/actions/auth';

const ThirdPartyLoginButton = ({ providerName }) => {
  if (!providerName) return null;

  return (
    <Button
      onClick={() => login(providerName)}
      className="flex w-full items-center gap-3 border-gray-300 bg-white px-6 py-3 text-black capitalize hover:shadow-md md:max-w-[250px]"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.45rem',
        backgroundColor: 'white',
        borderColor: '#d1d5db',
        color: 'black',
      }}
    >
      <img
        src={`/assets/images/${providerName}-logo.png`}
        alt={`${providerName}-icon`}
        style={{ width: '20px', height: '20px' }}
      />
      {providerName}
    </Button>
  );
};

export default ThirdPartyLoginButton;
