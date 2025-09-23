import { gql } from '@apollo/client';

export const ADD_PROPERTY_TO_WISHLIST = gql`
  mutation AddToWishlist($userId: ID!, $propertyId: ID!) {
    addToWishlist(userId: $userId, propertyId: $propertyId) {
      id
      userId
      propertyId
    }
  }
`;

export const CREATE_BOOKING = gql`
  mutation CreateBooking($userId: ID!, $propertyId: ID!, $checkInDate: Date!, $checkOutDate: Date!, $totalAmount: Float!) {
    createBooking(
      userId: $userId
      propertyId: $propertyId
      checkInDate: $checkInDate
      checkOutDate: $checkOutDate
      totalAmount: $totalAmount
    ) {
      id
      userId
      propertyId
      checkInDate
      checkOutDate
      totalAmount
      status
      createdAt
    }
  }
`;

export const REMOVE_PROPERTY_FROM_WISHLIST = gql`
  mutation RemoveFromWishlist($userId: ID!, $propertyId: ID!) {
    removeFromWishlist(userId: $userId, propertyId: $propertyId) {
      success
      message
    }
  }
`;

export const CREATE_PROPERTY_SWAP_REQUEST = gql`
  mutation CreatePropertySwapRequest($requesterId: ID!, $ownerPropertyId: ID!, $requesterPropertyId: ID!, $swapDates: SwapDatesInput!) {
    createPropertySwapRequest(
      requesterId: $requesterId
      ownerPropertyId: $ownerPropertyId
      requesterPropertyId: $requesterPropertyId
      swapDates: $swapDates
    ) {
      id
      requesterId
      ownerPropertyId
      requesterPropertyId
      status
      swapDates {
        startDate
        endDate
      }
      createdAt
    }
  }
`;

export const UPDATE_BOOKING_STATUS = gql`
  mutation UpdateBookingStatus($bookingId: ID!, $status: BookingStatus!) {
    updateBookingStatus(bookingId: $bookingId, status: $status) {
      id
      status
      updatedAt
    }
  }
`;

export const CANCEL_BOOKING = gql`
  mutation CancelBooking($bookingId: ID!) {
    cancelBooking(bookingId: $bookingId) {
      id
      status
      updatedAt
    }
  }
`;
