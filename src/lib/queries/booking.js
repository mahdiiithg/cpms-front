import { gql } from '@apollo/client';

// Get current user's bookings (uses auth context)
export const GET_USER_BOOKINGS = gql`
  query GetUserBookings($status: BookingStatus, $limit: Int, $offset: Int) {
    myBookings(status: $status, limit: $limit, offset: $offset) {
      bookings {
        id
        property {
          id
          title
          images
          location {
            city
            state
          }
        }
        checkInDate
        checkOutDate
        totalAmount
        status
        createdAt
      }
      totalCount
      hasMore
    }
  }
`;

// Get property's bookings (for property owners)
export const GET_PROPERTY_BOOKINGS = gql`
  query GetPropertyBookings($propertyId: ID!, $status: BookingStatus, $limit: Int, $offset: Int) {
    propertyBookings(propertyId: $propertyId, status: $status, limit: $limit, offset: $offset) {
      bookings {
        id
        guest {
          id
          name
          email
          avatar
        }
        checkInDate
        checkOutDate
        totalAmount
        status
        createdAt
      }
      totalCount
      hasMore
    }
  }
`;

// Get booking details
export const GET_BOOKING = gql`
  query GetBooking($id: ID!) {
    booking(id: $id) {
      id
      property {
        id
        title
        images
        location {
          address
          city
          state
        }
        host {
          name
          email
          phone
        }
      }
      guest {
        id
        name
        email
        phone
      }
      checkInDate
      checkOutDate
      totalAmount
      status
      createdAt
      updatedAt
    }
  }
`;
