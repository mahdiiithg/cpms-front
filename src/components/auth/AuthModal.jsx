'use client';

import { useState } from 'react';
import { Modal, Segmented } from 'antd';
import SigninForm from './SigninForm';
import SignupForm from './SignupForm';

const AuthModal = ({ open, onClose }) => {
  const [tab, setTab] = useState('Log In');

  const handleSuccess = () => {
    // Close modal on successful auth; session will update via NextAuth
    onClose?.();
  };

  return (
    <Modal
      title={tab === 'Log In' ? 'Log In' : 'Create an Account'}
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <div className="mb-4">
        <Segmented
          options={['Log In', 'Sign Up']}
          value={tab}
          onChange={setTab}
          className="custom-segmented-auth w-full"
        />
      </div>

      {tab === 'Log In' ? (
        <SigninForm redirect={false} onSuccess={handleSuccess} />
      ) : (
        <SignupForm onSuccess={handleSuccess} />
      )}
    </Modal>
  );
};

export default AuthModal;
