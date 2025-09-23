/**
 * Payment utility functions for Coast Planet
 */

// Generate unique order ID
export const generateOrderId = () => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `ORD-${timestamp}-${random}`;
};

// Format currency amount
export const formatCurrency = (amount, currency = 'AED') => {
  return new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount);
};

// Convert amount to smallest currency unit (fils for AED)
export const toSmallestUnit = (amount, currency = 'AED') => {
  const multipliers = {
    AED: 100, // 1 AED = 100 fils
    USD: 100, // 1 USD = 100 cents
    EUR: 100, // 1 EUR = 100 cents
  };
  return Math.round(amount * (multipliers[currency] || 100));
};

// Convert from smallest currency unit to main unit
export const fromSmallestUnit = (amount, currency = 'AED') => {
  const divisors = {
    AED: 100,
    USD: 100,
    EUR: 100,
  };
  return amount / (divisors[currency] || 100);
};

// Calculate subscription end date
export const calculateEndDate = (startDate, billingCycle) => {
  const start = new Date(startDate);
  const endDate = new Date(start);
  
  switch (billingCycle) {
    case 'monthly':
      endDate.setMonth(endDate.getMonth() + 1);
      break;
    case 'yearly':
      endDate.setFullYear(endDate.getFullYear() + 1);
      break;
    case 'quarterly':
      endDate.setMonth(endDate.getMonth() + 3);
      break;
    default:
      endDate.setMonth(endDate.getMonth() + 1);
  }
  
  return endDate;
};

// Calculate prorated amount for plan changes
export const calculateProratedAmount = (currentPlan, newPlan, remainingDays, totalDays) => {
  const currentPlanDaily = currentPlan.price / totalDays;
  const newPlanDaily = newPlan.price / totalDays;
  
  const refund = currentPlanDaily * remainingDays;
  const newCharge = newPlanDaily * remainingDays;
  
  return newCharge - refund;
};

// Validate card number using Luhn algorithm
export const validateCardNumber = (cardNumber) => {
  const digits = cardNumber.replace(/\D/g, '');
  
  if (digits.length < 13 || digits.length > 19) {
    return false;
  }
  
  let sum = 0;
  let isEven = false;
  
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
};

// Get card type from card number
export const getCardType = (cardNumber) => {
  const digits = cardNumber.replace(/\D/g, '');
  
  if (/^4/.test(digits)) return 'visa';
  if (/^5[1-5]/.test(digits)) return 'mastercard';
  if (/^3[47]/.test(digits)) return 'amex';
  if (/^6(?:011|5)/.test(digits)) return 'discover';
  
  return 'unknown';
};

// Format card number with spaces
export const formatCardNumber = (cardNumber) => {
  const digits = cardNumber.replace(/\D/g, '');
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
};

// Validate expiry date
export const validateExpiryDate = (expiryDate) => {
  const [month, year] = expiryDate.split('/');
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear() % 100;
  
  const expMonth = parseInt(month, 10);
  const expYear = parseInt(year, 10);
  
  if (expMonth < 1 || expMonth > 12) return false;
  if (expYear < currentYear) return false;
  if (expYear === currentYear && expMonth < currentMonth) return false;
  
  return true;
};

// Validate CVV
export const validateCVV = (cvv, cardType = 'visa') => {
  const digits = cvv.replace(/\D/g, '');
  
  if (cardType === 'amex') {
    return digits.length === 4;
  }
  
  return digits.length === 3;
};

// Calculate yearly discount savings
export const calculateYearlyDiscount = (monthlyPrice, yearlyDiscount = 0.2) => {
  const yearlyPrice = monthlyPrice * 12;
  const discountAmount = yearlyPrice * yearlyDiscount;
  const finalPrice = yearlyPrice - discountAmount;
  
  return {
    yearlyPrice,
    discountAmount,
    finalPrice,
    savings: discountAmount,
    monthlyEquivalent: finalPrice / 12
  };
};

// Payment status helpers
export const isPaymentPending = (status) => {
  return ['pending', 'processing', 'authorized'].includes(status?.toLowerCase());
};

export const isPaymentSuccessful = (status) => {
  return ['completed', 'success', 'paid', 'settled'].includes(status?.toLowerCase());
};

export const isPaymentFailed = (status) => {
  return ['failed', 'declined', 'cancelled', 'error'].includes(status?.toLowerCase());
};

// Tax calculation (UAE VAT)
export const calculateVAT = (amount, vatRate = 0.05) => {
  return amount * vatRate;
};

// Payment gateway specific formatting
export const formatPaymentPayload = (data) => {
  return {
    amount: toSmallestUnit(data.amount, data.currency),
    currency: data.currency,
    orderId: data.orderId,
    description: `Coast Planet ${data.planName} - ${data.billingCycle}`,
    customerInfo: {
      email: data.userEmail,
      name: data.userName,
      userId: data.userId
    },
    metadata: {
      planId: data.planId,
      billingCycle: data.billingCycle,
      autoRenew: data.autoRenew,
      promoCode: data.promoCode
    },
    redirectUrls: {
      success: data.successUrl,
      failure: data.failureUrl,
      webhook: data.webhookUrl
    }
  };
};

// Apple Pay specific utilities
export const isApplePaySupported = () => {
  return window.ApplePaySession && ApplePaySession.canMakePayments();
};

export const canMakeApplePayments = () => {
  if (!window.ApplePaySession) return false;
  return ApplePaySession.canMakePaymentsWithActiveCard(
    process.env.NEXT_PUBLIC_APPLE_PAY_MERCHANT_ID
  );
};

export const createApplePayRequest = (amount, currency, items, merchantName) => {
  return {
    countryCode: currency === 'AED' ? 'AE' : 'US',
    currencyCode: currency,
    supportedNetworks: ['visa', 'masterCard', 'amex', 'discover'],
    merchantCapabilities: ['supports3DS'],
    total: {
      label: merchantName || 'Coast Planet',
      amount: amount.toFixed(2),
      type: 'final'
    },
    lineItems: items || []
  };
};

// Google Pay specific utilities
export const isGooglePaySupported = () => {
  return window.google && window.google.payments;
};

export const createGooglePayRequest = (amount, currency, merchantId, gatewayMerchantId) => {
  return {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [{
      type: 'CARD',
      parameters: {
        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
        allowedCardNetworks: ['MASTERCARD', 'VISA', 'AMEX', 'DISCOVER']
      },
      tokenizationSpecification: {
        type: 'PAYMENT_GATEWAY',
        parameters: {
          gateway: 'stripe', // or your preferred gateway
          gatewayMerchantId: gatewayMerchantId
        }
      }
    }],
    merchantInfo: {
      merchantId: merchantId,
      merchantName: 'Coast Planet'
    },
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPrice: amount.toFixed(2),
      currencyCode: currency,
      countryCode: currency === 'AED' ? 'AE' : 'US'
    }
  };
};

export const checkGooglePayReadiness = async (paymentsClient) => {
  const isReadyToPayRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [{
      type: 'CARD',
      parameters: {
        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
        allowedCardNetworks: ['MASTERCARD', 'VISA', 'AMEX']
      }
    }]
  };

  try {
    const response = await paymentsClient.isReadyToPay(isReadyToPayRequest);
    return response.result;
  } catch (error) {
    console.error('Google Pay readiness check failed:', error);
    return false;
  }
};

// Digital wallet detection
export const detectAvailableWallets = async () => {
  const wallets = {
    applePay: false,
    googlePay: false,
    samsungPay: false
  };

  // Check Apple Pay
  if (isApplePaySupported()) {
    try {
      wallets.applePay = await canMakeApplePayments();
    } catch (error) {
      console.warn('Apple Pay detection failed:', error);
    }
  }

  // Check Google Pay
  if (isGooglePaySupported()) {
    try {
      const paymentsClient = new google.payments.api.PaymentsClient({
        environment: process.env.NODE_ENV === 'production' ? 'PRODUCTION' : 'TEST'
      });
      wallets.googlePay = await checkGooglePayReadiness(paymentsClient);
    } catch (error) {
      console.warn('Google Pay detection failed:', error);
    }
  }

  // Check Samsung Pay (basic detection)
  if (navigator.userAgent.includes('SamsungBrowser')) {
    wallets.samsungPay = true; // Basic detection, would need Samsung Pay SDK for proper detection
  }

  return wallets;
};

// Payment method icons and labels
export const getPaymentMethodInfo = (type) => {
  const methods = {
    card: {
      label: 'Credit/Debit Card',
      icon: '💳',
      description: 'Visa, Mastercard, Amex accepted'
    },
    apple_pay: {
      label: 'Apple Pay',
      icon: '🍎',
      description: 'Touch ID or Face ID required'
    },
    google_pay: {
      label: 'Google Pay',
      icon: 'G',
      description: 'One-tap checkout'
    },
    samsung_pay: {
      label: 'Samsung Pay',
      icon: '📱',
      description: 'Samsung devices only'
    },
    paypal: {
      label: 'PayPal',
      icon: '🏪',
      description: 'PayPal account required'
    },
    bank_transfer: {
      label: 'Bank Transfer',
      icon: '🏦',
      description: 'Direct bank transfer'
    }
  };

  return methods[type] || methods.card;
};

// Mobile wallet specific validation
export const validateWalletPayment = (type, data) => {
  switch (type) {
    case 'apple_pay':
      return data.token && data.token.paymentData;
    
    case 'google_pay':
      return data.token && data.token.length > 0;
    
    case 'samsung_pay':
      return data.token && data.referenceId;
    
    default:
      return false;
  }
};
