'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Button, Form } from 'antd';
import RHFInput from '../shared/RHFInput';
import { Mail, KeyRound, User2 } from 'lucide-react';
import { REGISTER_USER } from '@/lib/mutations';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { signIn } from 'next-auth/react';

const schema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required')
    .transform((value) => value.toLowerCase()),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const SignupForm = ({ onSuccess }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const router = useRouter();

  const [registerWithEmail, { loading, error }] = useMutation(REGISTER_USER);

  const onSubmit = async (data) => {
    try {
      const { email, name, password } = data;

      // Step 1: Register the user
      const result = await registerWithEmail({
        variables: {
          email,
          name,
          password,
        },
      });

      if (result?.data?.registerWithEmail?.token) {
        toast.success('Registration successful! Signing you in...');

        // Step 2: Automatically sign in the user with NextAuth
        const signInResult = await signIn('credentials', {
          email,
          password,
          redirect: false, // Don't redirect automatically
        });

        if (signInResult?.ok) {
          toast.success('Welcome!');
          onSuccess?.();
          // Optional redirect if used standalone
          // router.push('/dashboard');
        } else {
          toast.error(
            'Registration successful, but auto sign-in failed. Please sign in manually.',
          );
          router.push('/signin');
        }
      }
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error(error?.message || 'Registration failed. Please try again.');
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
          validateStatus={errors.name ? 'error' : ''}
          help={errors.name?.message}
          style={{ marginBottom: 12 }}
        >
          <RHFInput
            name="name"
            control={control}
            placeholder="Full Name"
            autoComplete="new-name"
            prefix={<User2 size={20} color="#ADADAD" className="mr-1" />}
            disabled={loading}
          />
        </Form.Item>

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
            disabled={loading}
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
            disabled={loading}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            disabled={!isValid}
            loading={loading}
          >
            Sign Up
          </Button>
        </Form.Item>

        {!!error && (
          <Alert
            message={error.message || 'Registration Failed.'}
            type="error"
            showIcon
          />
        )}
      </Form>
    </div>
  );
};

export default SignupForm;
