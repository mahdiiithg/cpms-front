'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Segmented } from 'antd';
import SigninForm from '@/components/auth/SigninForm';
import SignupForm from '@/components/auth/SignupForm';
import ThirdPartyLoginButton from '@/components/auth/ThirdPartyLoginButton';

const SigninPage = ({ searchParams }) => {
  const resolvedSearchParams = React.use(searchParams);
  const error = resolvedSearchParams?.error || null;
  const callbackUrl = resolvedSearchParams?.callbackUrl || null;

  const [activeTab, setActiveTab] = useState('Log In');

  return (
    <div className="grid min-h-screen grid-rows-1 items-center justify-items-center gap-2 font-sans md:grid-rows-1 lg:grid-cols-2 lg:p-2">
      <div
        className="relative hidden h-full w-full rounded-2xl bg-cover bg-no-repeat lg:block lg:p-8"
        style={{ backgroundImage: "url('/assets/images/signin-image.png')" }}
      >
        <Image
          width={400}
          height={400}
          className="absolute top-0 left-0 z-0"
          alt="shadow-image"
          src="/assets/images/login-img-shadow.svg"
        />
        <div className="flex h-full w-full flex-col justify-end">
                      <p className="text-primary 3xl:text-2xl z-10 lg:text-lg">
              Discover Coastal Paradise
            </p>
            <p className="3xl:text-8xl z-10 font-semibold text-white lg:text-6xl">
              Your
            </p>
            <p className="3xl:text-8xl z-10 font-semibold text-white lg:text-6xl">
              {' '}
              Perfect
            </p>
            <p className="text-primary 3xl:text-8xl z-10 font-semibold lg:text-6xl">
              Coastal
            </p>
            <p className="text-primary 3xl:text-8xl z-10 mb-4 font-semibold lg:text-6xl">
              Escape
            </p>
            <p className="3xl:text-2xl z-10 text-white lg:w-2/3 lg:text-base">
              Unlock access to stunning coastal properties worldwide. Book, swap, 
              and discover your next beachfront adventure.
            </p>
        </div>
      </div>
      <div className="flex h-full w-full flex-col items-start justify-between gap-1 xl:p-4 xl:py-0">
        <h1 className="text-primary hidden text-2xl font-bold lg:block">
          COAST PLANET
        </h1>
        <div className="flex h-full w-full flex-col items-start justify-start gap-2 p-4 md:gap-8 md:p-2 lg:p-10 lg:pb-0">
          <div className="mb-6 w-full text-center md:mb-2">
            <p className="text-left text-3xl font-normal lg:text-center lg:text-[40px] lg:leading-12">
              Log in to your account
            </p>
            <p className="text-left text-3xl font-semibold lg:text-center lg:text-[40px] lg:leading-12">
              Coast Planet!
            </p>
          </div>
          <div className="mb-4 w-full text-center lg:hidden">
            <Segmented
              options={['Log In', 'Sign Up']}
              value={activeTab}
              onChange={setActiveTab}
              className="custom-segmented-auth mx-auto w-full sm:w-1/2 md:w-2/3 xl:max-w-[500px]"
              size="large"
            />
          </div>
          <div className="mx-auto w-full lg:max-w-2xl">
            {activeTab === 'Log In' ? (
              <SigninForm error={error} callbackUrl={callbackUrl} />
            ) : (
              <SignupForm />
            )}
            <div className="mt-5 w-full text-center">
              <div className="flex items-center justify-center gap-2 sm:gap-4">
                <Image
                  alt="arrow-right-image"
                  width={166}
                  height={5}
                  src="/assets/images/arrow-right.svg"
                  className="w-[110px] sm:w-[140px] md:w-[166px]"
                />
                <span className="text-sm text-gray-500 capitalize md:text-base">
                  Or continue with
                </span>
                <Image
                  alt="arrow-left-image"
                  width={166}
                  height={5}
                  src="/assets/images/arrow-left.svg"
                  className="w-[110px] sm:w-[140px] md:w-[166px]"
                />
              </div>
            </div>
            {/* Login Providers */}
            <div className="mt-4 flex w-full items-center justify-center gap-3">
              <ThirdPartyLoginButton providerName="google" />
            </div>
          </div>
        </div>
        {/* signup link */}
        <div className="mx-auto hidden w-fit items-center justify-center gap-1 lg:flex">
          {activeTab === 'Log In' ? (
            <>
              <span>Do you have an account?</span>
              <span
                role="button"
                tabIndex={0}
                className="text-primary cursor-pointer font-semibold underline"
                onClick={() => setActiveTab('Sign Up')}
              >
                Create an account
              </span>
            </>
          ) : (
            <>
              <span>Already have an account?</span>
              <span
                role="button"
                tabIndex={0}
                className="text-primary cursor-pointer font-semibold underline"
                onClick={() => setActiveTab('Log In')}
              >
                Login
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
