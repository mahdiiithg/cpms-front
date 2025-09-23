'use client';

import { useState, useEffect } from 'react';
import { Button } from 'antd';
import { Smartphone, CreditCard } from 'lucide-react';
import { toast } from 'sonner';
import { detectAvailableWallets, createApplePayRequest, createGooglePayRequest } from '@/utils/payments';

const DigitalWalletButtons = ({ 
  amount, 
  currency = 'AED', 
  onPaymentSuccess, 
  onPaymentError,
  disabled = false,
  className = '',
  items = []
}) => {
  const [wallets, setWallets] = useState({
    applePay: false,
    googlePay: false,
    samsungPay: false
  });
  const [loading, setLoading] = useState({
    applePay: false,
    googlePay: false,
    samsungPay: false
  });

  useEffect(() => {
    detectAvailableWallets().then(setWallets);
  }, []);

  const setWalletLoading = (wallet, isLoading) => {
    setLoading(prev => ({ ...prev, [wallet]: isLoading }));
  };

  const handleApplePay = async () => {
    setWalletLoading('applePay', true);

    try {
      const request = createApplePayRequest(amount, currency, items, 'Coast Planet');
      const session = new ApplePaySession(3, request);

      session.onvalidatemerchant = async (event) => {
        try {
          const response = await fetch('/api/payment/apple-pay/validate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              validationURL: event.validationURL,
              displayName: 'Coast Planet'
            })
          });
          const merchantSession = await response.json();
          session.completeMerchantValidation(merchantSession);
        } catch (error) {
          session.abort();
          onPaymentError?.(error);
        }
      };

      session.onpaymentauthorized = async (event) => {
        try {
          const success = await onPaymentSuccess?.(event.payment);
          session.completePayment(
            success ? ApplePaySession.STATUS_SUCCESS : ApplePaySession.STATUS_FAILURE
          );
        } catch (error) {
          session.completePayment(ApplePaySession.STATUS_FAILURE);
          onPaymentError?.(error);
        }
      };

      session.oncancel = () => {
        toast.info('Apple Pay cancelled');
      };

      session.begin();
    } catch (error) {
      onPaymentError?.(error);
    } finally {
      setWalletLoading('applePay', false);
    }
  };

  const handleGooglePay = async () => {
    setWalletLoading('googlePay', true);

    try {
      const paymentsClient = new google.payments.api.PaymentsClient({
        environment: process.env.NODE_ENV === 'production' ? 'PRODUCTION' : 'TEST'
      });

      const paymentDataRequest = createGooglePayRequest(
        amount,
        currency,
        process.env.NEXT_PUBLIC_GOOGLE_PAY_MERCHANT_ID,
        process.env.NEXT_PUBLIC_STRIPE_MERCHANT_ID
      );

      const paymentData = await paymentsClient.loadPaymentData(paymentDataRequest);
      await onPaymentSuccess?.(paymentData);
    } catch (error) {
      if (error.statusCode !== 'CANCELED') {
        onPaymentError?.(error);
      } else {
        toast.info('Google Pay cancelled');
      }
    } finally {
      setWalletLoading('googlePay', false);
    }
  };

  const handleSamsungPay = async () => {
    // Samsung Pay implementation would go here
    toast.info('Samsung Pay integration coming soon');
  };

  if (!wallets.applePay && !wallets.googlePay && !wallets.samsungPay) {
    return null;
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-center space-x-2 text-lg font-semibold text-gray-800">
        <Smartphone size={20} />
        <span>Express Checkout</span>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {wallets.applePay && (
          <Button
            type="default"
            size="large"
            className="h-16 bg-black text-white border-black hover:bg-gray-800 disabled:bg-gray-400 rounded-xl shadow-lg"
            onClick={handleApplePay}
            loading={loading.applePay}
            disabled={disabled || loading.applePay}
          >
            <div className="flex items-center justify-center space-x-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <span className="text-xl font-medium">Pay with Apple Pay</span>
            </div>
          </Button>
        )}

        {wallets.googlePay && (
          <Button
            type="default"
            size="large"
            className="h-16 bg-white border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 disabled:bg-gray-100 rounded-xl shadow-lg"
            onClick={handleGooglePay}
            loading={loading.googlePay}
            disabled={disabled || loading.googlePay}
          >
            <div className="flex items-center justify-center space-x-3">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-xl font-medium text-gray-700">Pay with Google Pay</span>
            </div>
          </Button>
        )}

        {wallets.samsungPay && (
          <Button
            type="default"
            size="large"
            className="h-16 bg-blue-600 text-white border-blue-600 hover:bg-blue-700 disabled:bg-gray-400 rounded-xl shadow-lg"
            onClick={handleSamsungPay}
            loading={loading.samsungPay}
            disabled={disabled || loading.samsungPay}
          >
            <div className="flex items-center justify-center space-x-3">
              <span className="text-2xl">📱</span>
              <span className="text-xl font-medium">Pay with Samsung Pay</span>
            </div>
          </Button>
        )}
      </div>

      <div className="flex items-center my-6">
        <div className="flex-1 border-t border-gray-300"></div>
        <div className="px-4 text-sm text-gray-500 bg-white flex items-center space-x-2">
          <CreditCard size={16} />
          <span>or enter payment details</span>
        </div>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>
    </div>
  );
};

export default DigitalWalletButtons;
