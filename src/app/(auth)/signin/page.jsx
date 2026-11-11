'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Segmented } from 'antd';
import { Waves } from 'lucide-react';
import SigninForm from '@/components/auth/SigninForm';
import SignupForm from '@/components/auth/SignupForm';
import ThirdPartyLoginButton from '@/components/auth/ThirdPartyLoginButton';
import { pageSurfaceClass, panelClass } from '@/lib/brandTheme';

const SigninPage = ({ searchParams }) => {
  const resolvedSearchParams = React.use(searchParams);
  const error = resolvedSearchParams?.error || null;
  const callbackUrl = resolvedSearchParams?.callbackUrl || null;

  const [activeTab, setActiveTab] = useState('Log In');

  return (
    <div className={`${pageSurfaceClass} grid min-h-[calc(100vh-1px)] items-stretch gap-0 lg:grid-cols-2`}>
      {/* Brand / atmosphere panel — CSS only (no missing decorative assets) */}
      <div className="relative hidden overflow-hidden border-r border-cp-stroke bg-gradient-to-br from-cp-surface via-cp-raised to-cp-elevated lg:block">
        <div
          className="pointer-events-none absolute -top-24 -left-16 h-80 w-80 rounded-full bg-cp-lime/15 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute right-0 bottom-10 h-96 w-96 rounded-full bg-cp-lime/10 blur-3xl"
          aria-hidden
        />
        <div className="relative z-10 flex h-full flex-col justify-between p-10 xl:p-14">
          <Link href="/" className="inline-flex items-center gap-3 text-white transition-opacity hover:opacity-90">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cp-lime shadow-[0_0_18px_rgba(204,255,0,0.45)]">
              <Waves className="h-5 w-5 text-cp-surface" />
            </span>
            <span className="text-xl font-bold tracking-tight">Coast Planet</span>
          </Link>

          <div className="max-w-xl space-y-4 pb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cp-lime">
              Discover Coastal Paradise
            </p>
            <h2 className="text-5xl font-semibold leading-tight text-white xl:text-6xl">
              Your Perfect{' '}
              <span className="text-cp-lime">Coastal Escape</span>
            </h2>
            <p className="max-w-md text-base text-cp-muted">
              Unlock access to stunning coastal properties worldwide. Book, swap,
              and discover your next beachfront adventure.
            </p>
          </div>
        </div>
      </div>

      {/* Auth form panel */}
      <div className="flex w-full flex-col justify-center px-4 py-10 sm:px-8 lg:px-12 xl:px-16">
        <div className={`mx-auto w-full max-w-md ${panelClass} p-6 sm:p-8`}>
          <div className="mb-6 text-center lg:text-left">
            <p className="text-2xl font-normal text-white sm:text-3xl">
              {activeTab === 'Log In' ? 'Log in to your account' : 'Create your account'}
            </p>
            <p className="mt-1 text-2xl font-semibold text-cp-lime sm:text-3xl">Coast Planet</p>
          </div>

          <div className="mb-5">
            <Segmented
              options={['Log In', 'Sign Up']}
              value={activeTab}
              onChange={setActiveTab}
              className="custom-segmented-auth w-full"
              size="large"
            />
          </div>

          {activeTab === 'Log In' ? (
            <SigninForm error={error} callbackUrl={callbackUrl} />
          ) : (
            <SignupForm />
          )}

          <div className="mt-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-cp-stroke" />
            <span className="text-xs font-medium uppercase tracking-wide text-cp-subtle">
              Or continue with
            </span>
            <div className="h-px flex-1 bg-cp-stroke" />
          </div>

          <div className="mt-4 flex w-full justify-center">
            <ThirdPartyLoginButton providerName="google" />
          </div>

          <div className="mt-6 text-center text-sm text-cp-muted">
            {activeTab === 'Log In' ? (
              <>
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  className="font-semibold text-cp-lime underline-offset-2 hover:underline"
                  onClick={() => setActiveTab('Sign Up')}
                >
                  Create an account
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  className="font-semibold text-cp-lime underline-offset-2 hover:underline"
                  onClick={() => setActiveTab('Log In')}
                >
                  Log in
                </button>
              </>
            )}
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-md text-center text-xs text-cp-faint">
          By continuing you agree to Coast Planet&apos;s terms of use.
        </p>
      </div>
    </div>
  );
};

export default SigninPage;
