'use client';

import { useState } from 'react';
import { Modal, Segmented } from 'antd';
import SigninForm from './SigninForm';
import SignupForm from './SignupForm';
import { modalSurfaceClass } from '@/lib/brandTheme';

const AuthModal = ({ open, onClose }) => {
  const [tab, setTab] = useState('Log In');

  const handleSuccess = () => {
    onClose?.();
  };

  return (
    <Modal
      title={tab === 'Log In' ? 'Log In' : 'Create an Account'}
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      destroyOnClose
      rootClassName={modalSurfaceClass}
      className={modalSurfaceClass}
      classNames={{
        content: 'cp-auth-modal__content',
        header: 'cp-auth-modal__header',
        body: 'cp-auth-modal__body',
        mask: 'cp-auth-modal__mask',
      }}
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
