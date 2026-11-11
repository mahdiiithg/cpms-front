'use client';

import Link from 'next/link';
import { Waves } from 'lucide-react';
import SignupForm from '@/components/auth/SignupForm';
import ThirdPartyLoginButton from '@/components/auth/ThirdPartyLoginButton';
import { pageSurfaceClass, panelClass } from '@/lib/brandTheme';

const SignupPage = () => {
  return (
    <div className={`${pageSurfaceClass} flex min-h-[calc(100vh-1px)] items-center justify-center px-4 py-12`}>
      <div className={`w-full max-w-md ${panelClass} p-6 sm:p-8`}>
        <div className="mb-6 text-center">
          <Link href="/" className="mb-4 inline-flex items-center gap-2 text-white transition-opacity hover:opacity-90">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cp-lime shadow-[0_0_15px_rgba(204,255,0,0.45)]">
              <Waves className="h-4 w-4 text-cp-surface" />
            </span>
            <span className="text-xl font-bold tracking-tight">Coast Planet</span>
          </Link>
          <h2 className="mt-4 text-2xl font-semibold text-white">Join Coast Planet</h2>
          <p className="mt-2 text-sm text-cp-subtle">
            Start your coastal property journey today
          </p>
        </div>

        <SignupForm />

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
          Already have an account?{' '}
          <Link href="/signin" className="font-semibold text-cp-lime hover:underline">
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
