'use client';

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Button, Form } from 'antd';
import { Mail, Lock } from 'lucide-react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import RHFInput from '@/components/shared/RHFInput';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

// GraphQL Mutations
const REQUEST_RESET_LINK = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

const RESET_PASSWORD = gql`
  mutation ResetPassword($token: String!, $newPassword: String!) {
    resetPassword(token: $token, newPassword: $newPassword)
  }
`;

// Constants for steps
const STEP_EMAIL = 1;
const STEP_PASSWORD = 2; // Changed from 3 to 2 as code step is removed

// Validation schemas for each step
const schemas = {
  email: Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email is required')
      .transform((value) => value.toLowerCase()),
  }),
  password: Yup.object().shape({
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  }),
};

// Step-specific components
const EmailStepForm = ({ control, errors }) => (
  <Form.Item
    validateStatus={errors.email ? 'error' : ''}
    help={errors.email?.message}
    className="mb-5" // Using Tailwind class instead of inline style
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
);

const PasswordStepForm = ({ control, errors }) => (
  <>
    <Form.Item
      validateStatus={errors.password ? 'error' : ''}
      help={errors.password?.message}
      className="mb-0"
    >
      <RHFInput
        name="password"
        control={control}
        placeholder="New password"
        type="password"
        autoComplete="new-password"
        prefix={<Lock size={20} color="#ADADAD" className="mr-1" />}
      />
    </Form.Item>
    <Form.Item
      validateStatus={errors.confirmPassword ? 'error' : ''}
      help={errors.confirmPassword?.message}
      className="mb-5"
    >
      <RHFInput
        name="confirmPassword"
        control={control}
        placeholder="Confirm new password"
        type="password"
        autoComplete="new-password"
        prefix={<Lock size={20} color="#ADADAD" className="mr-1" />}
      />
    </Form.Item>
  </>
);

const getFormConfig = (step) => {
  switch (step) {
    case STEP_EMAIL:
      return { schema: schemas.email, defaultValues: { email: '' } };
    case STEP_PASSWORD:
      return {
        schema: schemas.password,
        defaultValues: { password: '', confirmPassword: '' },
      };
    default:
      return {};
  }
};

const ResetPasswordPage = () => {
  const [step, setStep] = useState(STEP_EMAIL);
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [requestResetLinkMutation, { error: requestResetPassError }] =
    useMutation(REQUEST_RESET_LINK); // Renamed mutation
  const [resetPasswordMutation, { error: resetPassSubmitError }] =
    useMutation(RESET_PASSWORD);

  const { schema, defaultValues } = useMemo(() => getFormConfig(step), [step]);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    const tokenParam = searchParams.get('token');

    if (tokenParam) {
      setToken(tokenParam);
      setStep(STEP_PASSWORD);
      // Reset form for password fields
      reset({ password: '', confirmPassword: '' });
    } else {
      setStep(STEP_EMAIL);
      // Reset form for email field
      reset({ email: '' });
    }
  }, [searchParams, reset]);

  const handleEmailSubmit = useCallback(
    async (data) => {
      const response = await requestResetLinkMutation({
        variables: { email: data.email },
      });

      if (response.data.forgotPassword) {
        setEmail(data.email);
        toast.info('Password reset link sent to your email!');
        router.push('/signin');
      } else {
        setError(
          requestResetPassError?.message ||
            'Failed to send reset link, Please try again!',
        );
      }
    },
    [requestResetLinkMutation],
  );

  const handlePasswordSubmit = useCallback(
    async (data) => {
      const response = await resetPasswordMutation({
        variables: { token, newPassword: data.password },
      });

      if (response.data.resetPassword) {
        toast.success('Password has reset successfully!');
        setTimeout(() => {
          router.push('/signin');
        }, 1000);
      } else {
        setError(resetPassSubmitError?.message || 'Failed to reset password');
      }
    },
    [resetPasswordMutation, token, router],
  );

  const onSubmit = async (data) => {
    setError(null);
    setLoading(true);

    try {
      if (step === STEP_EMAIL) {
        await handleEmailSubmit(data);
      } else if (step === STEP_PASSWORD) {
        await handlePasswordSubmit(data);
      }
    } catch (err) {
      setError(err?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getTitleText = () => {
    switch (step) {
      case STEP_EMAIL:
        return 'Reset password';
      case STEP_PASSWORD:
        return 'Set new password';
      default:
        return '';
    }
  };

  const getButtonText = () => {
    switch (step) {
      case STEP_EMAIL:
        return 'Send reset link';
      case STEP_PASSWORD:
        return 'Reset password';
      default:
        return '';
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-start gap-10 p-4 md:justify-center">
      <div className="mb-6 w-full text-center md:mb-2">
        <p className="text-left text-3xl font-semibold md:text-center lg:text-[40px] lg:leading-12">
          Coast Planet!
        </p>
        <p className="text-left text-3xl font-normal md:text-center lg:text-[40px] lg:leading-12">
          {getTitleText()}
        </p>
      </div>
      <div className="mx-auto w-full md:max-w-3xl">
        <Form
          onFinish={handleSubmit(onSubmit)}
          layout="vertical"
          autoComplete="off"
        >
          {step === STEP_EMAIL && (
            <EmailStepForm control={control} errors={errors} />
          )}

          {step === STEP_PASSWORD && (
            <PasswordStepForm control={control} errors={errors} />
          )}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              disabled={!isValid || loading}
              loading={loading}
            >
              {getButtonText()}
            </Button>
          </Form.Item>

          {error && <Alert message={error} type="error" showIcon />}
        </Form>

        {step === STEP_EMAIL && (
          <div className="flex w-full justify-center pt-2 text-center">
            <Link
              href="/signin"
              className="text-primary font-semibold underline"
            >
              Back to login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
