import { gql } from '@apollo/client';

// Property Mutations
export const CREATE_PROPERTY = gql`
  mutation CreateProperty($input: PropertyInput!) {
    createProperty(input: $input) {
      id
      title
      description
      propertyType
      bedrooms
      bathrooms
      maxGuests
      pricePerNight
      location {
        address
        city
        state
        country
        zipCode
        coordinates {
          coordinates
        }
        distanceToBeach
        oceanView
        beachfront
      }
      images {
        url
        alt
        isPrimary
      }
      amenities
      houseRules
      checkInTime
      checkOutTime
      minimumStay
      maximumStay
      availableForSwap
      isActive
      createdAt
    }
  }
`;

export const UPDATE_PROPERTY = gql`
  mutation UpdateProperty($id: ID!, $input: UpdatePropertyInput!) {
    updateProperty(id: $id, input: $input) {
      id
      title
      description
      propertyType
      bedrooms
      bathrooms
      maxGuests
      pricePerNight
      location {
        address
        city
        state
        country
        zipCode
        distanceToBeach
        oceanView
        beachfront
      }
      images {
        url
        alt
        isPrimary
      }
      amenities
      houseRules
      checkInTime
      checkOutTime
      minimumStay
      maximumStay
      availableForSwap
      isActive
      featured
      updatedAt
    }
  }
`;

export const DELETE_PROPERTY = gql`
  mutation DeleteProperty($id: ID!) {
    deleteProperty(id: $id)
  }
`;

export const TOGGLE_PROPERTY_STATUS = gql`
  mutation TogglePropertyStatus($id: ID!) {
    togglePropertyStatus(id: $id) {
      id
      isActive
      updatedAt
    }
  }
`;

export const TOGGLE_SWAP_AVAILABILITY = gql`
  mutation ToggleSwapAvailability($id: ID!) {
    toggleSwapAvailability(id: $id) {
      id
      availableForSwap
      updatedAt
    }
  }
`;

export const ADD_BLOCKED_DATES = gql`
  mutation AddBlockedDates($propertyId: ID!, $blockedDates: [BlockedDateInput!]!) {
    addBlockedDates(propertyId: $propertyId, blockedDates: $blockedDates) {
      id
      blockedDates {
        startDate
        endDate
        reason
      }
      updatedAt
    }
  }
`;

export const UPLOAD_PROPERTY_IMAGES = gql`
  mutation UploadPropertyImages($propertyId: ID!, $images: [PropertyImageInput!]!) {
    uploadPropertyImages(propertyId: $propertyId, images: $images) {
      id
      images {
        url
        alt
        isPrimary
      }
      updatedAt
    }
  }
`;

// Booking Mutations
export const CREATE_BOOKING = gql`
  mutation CreateBooking($input: BookingInput!) {
    createBooking(input: $input) {
      id
      property {
        id
        title
        location {
          address
          city
          state
        }
      }
      guest {
        id
        name
        email
      }
      checkInDate
      checkOutDate
      numberOfGuests
      totalAmount
      status
      payment {
        paymentStatus
        currency
      }
      guestDetails {
        firstName
        lastName
        email
        phone
        specialRequests
      }
      createdAt
    }
  }
`;

export const UPDATE_BOOKING = gql`
  mutation UpdateBooking($id: ID!, $input: UpdateBookingInput!) {
    updateBooking(id: $id, input: $input) {
      id
      checkInDate
      checkOutDate
      numberOfGuests
      guestDetails {
        firstName
        lastName
        email
        phone
        specialRequests
      }
      guestNotes
      hostNotes
      updatedAt
    }
  }
`;

export const CANCEL_BOOKING = gql`
  mutation CancelBooking($input: CancelBookingInput!) {
    cancelBooking(input: $input) {
      id
      status
      cancellation {
        cancelledAt
        reason
        refundAmount
      }
      updatedAt
    }
  }
`;

export const CONFIRM_BOOKING = gql`
  mutation ConfirmBooking($id: ID!) {
    confirmBooking(id: $id) {
      id
      status
      updatedAt
    }
  }
`;

export const DECLINE_BOOKING = gql`
  mutation DeclineBooking($id: ID!, $reason: String!) {
    declineBooking(id: $id, reason: $reason) {
      id
      status
      cancellation {
        reason
      }
      updatedAt
    }
  }
`;

export const CHECK_IN_GUEST = gql`
  mutation CheckInGuest($id: ID!) {
    checkInGuest(id: $id) {
      id
      status
      updatedAt
    }
  }
`;

export const CHECK_OUT_GUEST = gql`
  mutation CheckOutGuest($id: ID!) {
    checkOutGuest(id: $id) {
      id
      status
      updatedAt
    }
  }
`;

export const PROCESS_PAYMENT = gql`
  mutation ProcessPayment($bookingId: ID!, $paymentMethodId: String!) {
    processPayment(bookingId: $bookingId, paymentMethodId: $paymentMethodId) {
      id
      payment {
        paymentStatus
        paidAt
        paymentIntentId
      }
      updatedAt
    }
  }
`;

// Property Swap Mutations
export const CREATE_SWAP_REQUEST = gql`
  mutation CreateSwapRequest($input: PropertySwapInput!) {
    createSwapRequest(input: $input) {
      id
      requester {
        id
        name
      }
      requestedHost {
        id
        name
      }
      requesterProperty {
        id
        title
        images {
          url
          alt
          isPrimary
        }
      }
      requestedProperty {
        id
        title
        images {
          url
          alt
          isPrimary
        }
      }
      requesterDates {
        checkInDate
        checkOutDate
      }
      requestedDates {
        checkInDate
        checkOutDate
      }
      requesterGuests
      requestedGuests
      initialMessage
      status
      requestExpiryDate
      createdAt
    }
  }
`;

export const RESPOND_TO_SWAP_REQUEST = gql`
  mutation RespondToSwapRequest($input: SwapResponseInput!) {
    respondToSwapRequest(input: $input) {
      id
      status
      updatedAt
    }
  }
`;

export const MAKE_COUNTER_OFFER = gql`
  mutation MakeCounterOffer($input: CounterOfferInput!) {
    makeCounterOffer(input: $input) {
      id
      status
      counterOffer {
        message
        alternativeDates {
          requesterDates {
            checkInDate
            checkOutDate
          }
          requestedDates {
            checkInDate
            checkOutDate
          }
        }
        createdAt
      }
      updatedAt
    }
  }
`;

export const ACCEPT_SWAP = gql`
  mutation AcceptSwap($swapId: ID!) {
    acceptSwap(swapId: $swapId) {
      id
      status
      agreement {
        agreedAt
      }
      updatedAt
    }
  }
`;

export const DECLINE_SWAP = gql`
  mutation DeclineSwap($swapId: ID!, $reason: String) {
    declineSwap(swapId: $swapId, reason: $reason) {
      id
      status
      updatedAt
    }
  }
`;

export const CANCEL_SWAP = gql`
  mutation CancelSwap($swapId: ID!, $reason: String!) {
    cancelSwap(swapId: $swapId, reason: $reason) {
      id
      status
      updatedAt
    }
  }
`;

// Review Mutations
export const CREATE_REVIEW = gql`
  mutation CreateReview($input: ReviewInput!) {
    createReview(input: $input) {
      id
      reviewer {
        id
        name
      }
      reviewee {
        id
        name
      }
      property {
        id
        title
      }
      reviewType
      overallRating
      ratings {
        cleanliness
        accuracy
        location
        checkIn
        communication
        value
      }
      title
      comment
      photos {
        url
        caption
      }
      status
      createdAt
    }
  }
`;

export const UPDATE_REVIEW = gql`
  mutation UpdateReview($id: ID!, $input: UpdateReviewInput!) {
    updateReview(id: $id, input: $input) {
      id
      title
      comment
      overallRating
      ratings {
        cleanliness
        accuracy
        location
        checkIn
        communication
        value
      }
      photos {
        url
        caption
      }
      updatedAt
    }
  }
`;

export const RESPOND_TO_REVIEW = gql`
  mutation RespondToReview($input: HostResponseInput!) {
    respondToReview(input: $input) {
      id
      hostResponse {
        response
        respondedAt
        respondedBy {
          id
          name
        }
      }
      updatedAt
    }
  }
`;

export const MARK_REVIEW_HELPFUL = gql`
  mutation MarkReviewHelpful($reviewId: ID!) {
    markReviewHelpful(reviewId: $reviewId) {
      id
      helpfulVotes
      updatedAt
    }
  }
`;

export const FLAG_REVIEW = gql`
  mutation FlagReview($input: FlagReviewInput!) {
    flagReview(input: $input) {
      id
      flags {
        flaggedBy {
          id
          name
        }
        reason
        description
        flaggedAt
      }
      updatedAt
    }
  }
`;

// Wishlist Mutations (updated for properties)
export const ADD_PROPERTY_TO_WISHLIST = gql`
  mutation AddPropertyToWishlist($userId: ID!, $propertyId: ID!) {
    addPropertyToWishlist(userId: $userId, propertyId: $propertyId) {
      id
      # Return updated wishlist or success status
    }
  }
`;

export const REMOVE_PROPERTY_FROM_WISHLIST = gql`
  mutation RemovePropertyFromWishlist($userId: ID!, $propertyId: ID!) {
    removePropertyFromWishlist(userId: $userId, propertyId: $propertyId) {
      id
      # Return updated wishlist or success status
    }
  }
`;

// User Mutations (updated)
export const BECOME_HOST = gql`
  mutation BecomeHost {
    becomeHost {
      id
      isHost
      hostingSince
      updatedAt
    }
  }
`;

export const UPDATE_HOST_PROFILE = gql`
  mutation UpdateHostProfile($input: HostPreferencesInput!) {
    updateHostProfile(input: $input) {
      id
      hostPreferences {
        instantBook
        advanceNotice
        maxGuests
        allowPets
        allowSmoking
      }
      updatedAt
    }
  }
`;
