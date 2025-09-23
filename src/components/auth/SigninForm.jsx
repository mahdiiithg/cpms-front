'use client';

import React from 'react';
import * as Yup from 'yup';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Button, Form } from 'antd';
import RHFInput from '../shared/RHFInput';

import { Mail, KeyRound } from 'lucide-react';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required')
    .transform((value) => value.toLowerCase()),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const SigninForm = (props) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    const { email, password } = data;
    const result = await signIn('credentials', {
      email,
      password,
      redirect: props.redirect !== false,
      callbackUrl: props.callbackUrl ?? '/',
    });
    if (props.redirect === false && result?.ok) {
      props.onSuccess?.();
    }
  };

  return (
    <div className="mx-auto w-full xl:max-w-10/12">
      <Form
        onFinish={handleSubmit(onSubmit)}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item
          validateStatus={errors.email ? 'error' : ''}
          help={errors.email?.message}
          style={{ marginBottom: 12 }}
        >
          <RHFInput
            name="email"
            control={control}
            placeholder="Email address"
            autoComplete="new-email"
            lowercase
            prefix={<Mail size={20} color="#ADADAD" className="mr-1" />}
          />
        </Form.Item>

        <Form.Item
          validateStatus={errors.password ? 'error' : ''}
          help={errors.password?.message}
          style={{ marginBottom: 12 }}
        >
          <RHFInput
            name="password"
            control={control}
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            prefix={<KeyRound size={20} color="#ADADAD" className="mr-1" />}
          />
        </Form.Item>

        <div className="mt-0 mb-7 flex items-center justify-start">
          <Link href="/reset-password" style={{ color: '#6A7282' }}>
            Forgot Password?
          </Link>
        </div>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            disabled={!isValid}
          >
            Login
          </Button>
        </Form.Item>

        {!!props.error && (
          <Alert message="Authentication failed!" type="error" showIcon />
        )}
      </Form>
    </div>
  );
};

export default SigninForm;
