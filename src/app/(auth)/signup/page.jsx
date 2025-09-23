import React from 'react';
import Link from 'next/link';
import SignupForm from '@/components/auth/SignupForm';
import ThirdPartyLoginButton from '@/components/auth/ThirdPartyLoginButton';

const SignupPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-gray-900 hover:text-primary transition-colors">
              Coast Planet
            </h1>
          </Link>
          <h2 className="mt-4 text-2xl font-semibold text-gray-700">
            Join Coast Planet
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Start your coastal property journey today
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-white/20">
          <SignupForm />
          
          <div className="mt-5 w-full text-center">
            <div className="flex items-center justify-center">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-sm text-gray-500">Or continue with</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>
          </div>
          
          <div className="mt-4 flex w-full items-center justify-center">
            <ThirdPartyLoginButton providerName="google" />
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link 
                href="/signin" 
                className="font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link 
            href="/" 
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
