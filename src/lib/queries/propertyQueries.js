import { gql } from '@apollo/client';

// Property Queries
export const GET_ALL_PROPERTIES = gql`
  query GetAllProperties($filters: PropertyFilters, $limit: Int, $offset: Int) {
    searchProperties(filters: $filters, limit: $limit, offset: $offset) {
      properties {
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
          distanceToBeach
          oceanView
          beachfront
          coordinates {
            coordinates
          }
        }
        owner {
          id
          name
          avatar
          hostRating
          superHost {
            isSuper
          }
        }
        images {
          url
          alt
          isPrimary
        }
        amenities
        rating
        reviewCount
        availableForSwap
        featured
        createdAt
      }
      totalCount
      hasMore
    }
  }
`;

export const GET_PROPERTY_BY_ID = gql`
  query GetProperty($id: ID!) {
    property(id: $id) {
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
      owner {
        id
        name
        avatar
        bio
        hostRating
        hostReviewCount
        hostingSince
        superHost {
          isSuper
          achievedAt
        }
        responseRate: hostRating
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
      rating
      reviewCount
      availableForSwap
      featured
      isActive
      blockedDates {
        startDate
        endDate
        reason
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_COASTAL_PROPERTIES = gql`
  query GetCoastalProperties($filters: PropertyFilters, $limit: Int, $offset: Int) {
    coastalProperties(filters: $filters, limit: $limit, offset: $offset) {
      properties {
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
          distanceToBeach
          oceanView
          beachfront
          coordinates {
            coordinates
          }
        }
        owner {
          id
          name
          avatar
          hostRating
          superHost {
            isSuper
          }
        }
        images {
          url
          alt
          isPrimary
        }
        amenities
        rating
        reviewCount
        availableForSwap
        featured
      }
      totalCount
      hasMore
    }
  }
`;

export const GET_PROPERTIES_NEARBY = gql`
  query GetPropertiesNearby(
    $longitude: Float!
    $latitude: Float!
    $radius: Float
    $limit: Int
    $filters: PropertyFilters
  ) {
    propertiesNearby(
      longitude: $longitude
      latitude: $latitude
      radius: $radius
      limit: $limit
      filters: $filters
    ) {
      id
      title
      description
      propertyType
      pricePerNight
      location {
        address
        city
        state
        distanceToBeach
        oceanView
        beachfront
        coordinates {
          coordinates
        }
      }
      images {
        url
        alt
        isPrimary
      }
      rating
      reviewCount
      availableForSwap
      featured
    }
  }
`;

export const GET_FEATURED_PROPERTIES = gql`
  query GetFeaturedProperties($limit: Int) {
    featuredProperties(limit: $limit) {
      id
      title
      description
      propertyType
      pricePerNight
      location {
        city
        state
        distanceToBeach
        oceanView
        beachfront
        coordinates {
          coordinates
        }
      }
      images {
        url
        alt
        isPrimary
      }
      rating
      reviewCount
      featured
    }
  }
`;

export const GET_MY_PROPERTIES = gql`
  query GetMyProperties {
    myProperties {
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
      rating
      reviewCount
      isActive
      availableForSwap
      featured
      createdAt
    }
  }
`;

export const GET_USER_PROPERTIES = gql`
  query GetUserProperties($userId: ID!) {
    userProperties(userId: $userId) {
      id
      title
      description
      propertyType
      pricePerNight
      location {
        city
        state
        distanceToBeach
        oceanView
        beachfront
      }
      images {
        url
        alt
        isPrimary
      }
      rating
      reviewCount
      availableForSwap
    }
  }
`;

export const CHECK_PROPERTY_AVAILABILITY = gql`
  query CheckPropertyAvailability(
    $propertyId: ID!
    $checkInDate: Date!
    $checkOutDate: Date!
  ) {
    checkPropertyAvailability(
      propertyId: $propertyId
      checkInDate: $checkInDate
      checkOutDate: $checkOutDate
    )
  }
`;

export const GET_PROPERTY_CALENDAR = gql`
  query GetPropertyCalendar(
    $propertyId: ID!
    $startDate: Date!
    $endDate: Date!
  ) {
    propertyCalendar(
      propertyId: $propertyId
      startDate: $startDate
      endDate: $endDate
    ) {
      date
      isBooked
      isBlocked
      booking {
        id
        guest {
          name
        }
        checkInDate
        checkOutDate
        status
      }
    }
  }
`;

// User Queries (updated for properties)
export const GET_USER_WISHLIST = gql`
  query GetUserWishlist($userId: ID!) {
    userWishlist(userId: $userId) {
      id
      title
      propertyType
      pricePerNight
      location {
        city
        state
        distanceToBeach
        oceanView
        beachfront
      }
      images {
        url
        alt
        isPrimary
      }
      rating
      reviewCount
    }
  }
`;

// Booking Queries
export const CALCULATE_BOOKING_COST = gql`
  query CalculateBookingCost(
    $propertyId: ID!
    $checkInDate: Date!
    $checkOutDate: Date!
    $numberOfGuests: Int!
  ) {
    calculateBookingCost(
      propertyId: $propertyId
      checkInDate: $checkInDate
      checkOutDate: $checkOutDate
      numberOfGuests: $numberOfGuests
    ) {
      pricePerNight
      numberOfNights
      subtotal
      cleaningFee
      serviceFee
      taxes
      totalAmount
    }
  }
`;

// Property Swap Queries
export const GET_MY_SWAP_REQUESTS = gql`
  query GetMySwapRequests($status: SwapStatus) {
    mySentSwapRequests(status: $status) {
      swaps {
        id
        requestedProperty {
          id
          title
          images {
            url
            alt
            isPrimary
          }
          location {
            city
            state
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
        status
        createdAt
      }
    }
  }
`;

export const GET_RECEIVED_SWAP_REQUESTS = gql`
  query GetReceivedSwapRequests($status: SwapStatus) {
    myReceivedSwapRequests(status: $status) {
      swaps {
        id
        requester {
          id
          name
          avatar
        }
        requesterProperty {
          id
          title
          images {
            url
            alt
            isPrimary
          }
          location {
            city
            state
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
        initialMessage
        status
        createdAt
      }
    }
  }
`;

// Review Queries
export const GET_PROPERTY_REVIEWS = gql`
  query GetPropertyReviews($propertyId: ID!, $limit: Int, $offset: Int) {
    propertyReviews(propertyId: $propertyId, limit: $limit, offset: $offset) {
      reviews {
        id
        reviewer {
          name
          avatar
        }
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
        helpfulVotes
        stayDates {
          checkInDate
          checkOutDate
        }
        createdAt
      }
      totalCount
      averageRating
    }
  }
`;

export const GET_PROPERTY_REVIEW_STATS = gql`
  query GetPropertyReviewStats($propertyId: ID!) {
    propertyReviewStats(propertyId: $propertyId) {
      averageRating
      totalReviews
      averageCleanliness
      averageAccuracy
      averageLocation
      averageCheckIn
      averageCommunication
      averageValue
      ratingBreakdown {
        five
        four
        three
        two
        one
      }
    }
  }
`;
