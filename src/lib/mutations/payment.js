import { gql } from '@apollo/client';

export const CREATE_PAYMENT_INTENT = gql`
  mutation CreatePaymentIntent($input: PaymentIntentInput!) {
    createPaymentIntent(input: $input) {
      paymentIntentId
      paymentUrl
      clientSecret
      status
      amount
      currency
      orderId
      paymentMethod
      success
    }
  }
`;

export const PROCESS_WALLET_PAYMENT = gql`
  mutation ProcessWalletPayment($input: WalletPaymentInput!) {
    processWalletPayment(input: $input) {
      success
      transactionId
      subscriptionId
      message
      status
      receipt {
        orderId
        amount
        currency
        paidAt
        method
        walletType
      }
    }
  }
`;

export const APPLY_PROMO_CODE = gql`
  mutation ApplyPromoCode($code: String!, $planId: ID!, $userId: ID!) {
    applyPromoCode(code: $code, planId: $planId, userId: $userId) {
      valid
      code
      discount
      message
      expiresAt
    }
  }
`;

export const PROCESS_PAYMENT = gql`
  mutation ProcessPayment($input: PaymentProcessInput!) {
    processPayment(input: $input) {
      success
      transactionId
      subscriptionId
      message
      receipt {
        orderId
        amount
        currency
        paidAt
        method
      }
    }
  }
`;

export const CREATE_SUBSCRIPTION = gql`
  mutation CreateSubscription($input: SubscriptionInput!) {
    createSubscription(input: $input) {
      id
      userId
      planId
      status
      startDate
      endDate
      autoRenew
      paymentStatus
      subscriptionType
    }
  }
`;

export const CANCEL_SUBSCRIPTION = gql`
  mutation CancelSubscription($subscriptionId: ID!, $reason: String) {
    cancelSubscription(subscriptionId: $subscriptionId, reason: $reason) {
      success
      message
      cancellationDate
      refundAmount
    }
  }
`;
