import { gql } from '@apollo/client';

// Get all properties with filtering options
export const GET_PROPERTIES = gql`
  query GetProperties($filters: PropertyFilters, $limit: Int, $offset: Int) {
    properties(filters: $filters, limit: $limit, offset: $offset) {
      id
      title
      description
      type
      mode
      pricePerNight
      location {
        address
        city
        state
        country
        
        coastalFeatures
      }
      amenities
      images
      
      host {
        id
        name
        avatar
      }
      rating
      reviewCount
      createdAt
    }
  }
`;

// Get a single property by ID
export const GET_PROPERTY = gql`
  query GetProperty($id: ID!) {
    property(id: $id) {
      id
      title
      description
      type
      pricePerNight
      maxGuests
      bedrooms
      bathrooms
      location {
        address
        city
        state
        country
        coordinates {
          latitude
          longitude
        }
        coastalFeatures
        nearbyAttractions
      }
      amenities
      images
      availability {
        startDate
        endDate
      }
      host {
        id
        name
        email
        avatar
        isVerified
      }
      rating
      reviewCount
      createdAt
      updatedAt
    }
  }
`;

// Get properties near a specific location
export const GET_NEARBY_PROPERTIES = gql`
  query GetNearbyProperties($latitude: Float!, $longitude: Float!, $radius: Float!, $limit: Int) {
    nearbyProperties(latitude: $latitude, longitude: $longitude, radius: $radius, limit: $limit) {
      id
      title
      type
      pricePerNight
      location {
        address
        city
        coordinates {
          latitude
          longitude
        }
      }
      images
      rating
      reviewCount
      distance
    }
  }
`;

// Search properties with text query
export const SEARCH_PROPERTIES = gql`
  query SearchProperties($query: String!, $filters: PropertyFilters, $limit: Int, $offset: Int) {
    searchProperties(query: $query, filters: $filters, limit: $limit, offset: $offset) {
      id
      title
      description
      type
      mode
      pricePerNight
      location {
        address
        city
        state
        country
      }
      images
      rating
      reviewCount
      host {
        name
        avatar
      }
    }
  }
`;

// Get user's property listings
export const GET_USER_PROPERTIES = gql`
  query GetUserProperties($userId: ID!) {
    userProperties(userId: $userId) {
      id
      title
      type
      pricePerNight
      location {
        city
        state
      }
      images
      status
      rating
      reviewCount
      createdAt
    }
  }
`;