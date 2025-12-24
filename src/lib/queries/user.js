import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      email
      name
      last_name
      provider
      hasPassword
      city
      phone
    }
  }
`;

export const GET_WISHLIST_PROPERTIES = gql`
  query GetWishlistProperties($userId: ID!) {
    getWishlistProperties(userId: $userId) {
      id
      title
      type
      listingType
      salePrice
      rentPrice
      location {
        city
        state
      }
      images
    }
  }
`;

export const GET_USER_GYM_BOOKINGS = gql`
  query GetUserBookings($userId: ID!) {
    getUserBookings(userId: $userId) {
      id
      userId
      dateOfBooking
      createdAt
      status
      qrCode
      gym {
        id
        name
        address
        place
        parking
        rating
        facilities
        distance
        availability
        images
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_USER_SUBSCRIPTION = gql`
  query GetUserSubscription($userId: ID!) {
    getUserSubscription(userId: $userId) {
      currentPlan {
        id
        name
        type
        price
        features
        expiresAt
        status
        autoRenew
      }
      paymentMethods {
        id
        type
        lastFour
        expiryMonth
        expiryYear
        brand
        isDefault
      }
      subscriptionHistory {
        id
        planName
        amount
        startDate
        endDate
        status
        paymentStatus
      }
      upcomingPayments {
        amount
        dueDate
        status
      }
    }
  }
`;
