import { gql } from '@apollo/client';

export const GET_PAYMENT_DETAILS = gql`
  query GetPaymentDetails($orderId: String!, $transactionId: String!) {
    getPaymentDetails(orderId: $orderId, transactionId: $transactionId) {
      orderId
      transactionId
      amount
      currency
      status
      planName
      planId
      billingCycle
      startDate
      nextBillingDate
      autoRenew
      paymentMethod
      paidAt
      receipt {
        receiptUrl
        receiptId
      }
    }
  }
`;

export const GET_PAYMENT_HISTORY = gql`
  query GetPaymentHistory($userId: ID!, $limit: Int, $offset: Int) {
    getPaymentHistory(userId: $userId, limit: $limit, offset: $offset) {
      payments {
        id
        orderId
        amount
        currency
        status
        planName
        paymentMethod
        paidAt
        receipt {
          receiptUrl
          receiptId
        }
      }
      totalCount
      hasMore
    }
  }
`;

export const GET_PAYMENT_METHODS = gql`
  query GetPaymentMethods($userId: ID!) {
    getPaymentMethods(userId: $userId) {
      id
      type
      lastFour
      expiryMonth
      expiryYear
      brand
      isDefault
      createdAt
    }
  }
`;
