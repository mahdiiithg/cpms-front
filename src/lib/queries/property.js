import { gql } from '@apollo/client';

// Enhanced properties query aligned with Property Management schema
export const GET_PROPERTIES = gql`
  query GetProperties($filters: PropertyFilters) {
    properties(filters: $filters) {
      properties {
        id
        title
        description
        type
        listingType
        bedrooms
        bathrooms
        salePrice
        rentPrice
        propertySize
        landSize
        yearBuilt
        parking
        features
        condition
        orientation
        floorLevel
        totalFloors
        availableFrom
        leaseTerm
        bond
        views
        inquiries
        saves
        listingStatus
        status
        rejectionReason
        featured
        urgent
        contactPerson
        contactPhone
        contactEmail
        slug
        tags
        location {
          address
          city
          state
          country
          zipCode
          suburb
          region
          distanceToCBD
          transportLinks
          schools
          shopping
          hospitals
          walkScore
          transitScore
        }
        images
        inspectionTimes { id date startTime endTime type notes }
        agent { id name avatar email }
        createdAt
        updatedAt
      }
      totalCount
      hasNextPage
      hasPreviousPage
      currentPage
      totalPages
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
      listingType
      salePrice
      rentPrice
      bedrooms
      bathrooms
      propertySize
      landSize
      yearBuilt
      parking
      features
      condition
      orientation
      floorLevel
      totalFloors
      availableFrom
      leaseTerm
      bond
      views
      inquiries
      saves
      listingStatus
      status
      rejectionReason
      featured
      urgent
      contactPerson
      contactPhone
      contactEmail
      slug
      tags
      location {
        address
        city
        state
        country
        zipCode
        suburb
        region
        walkScore
        transitScore
        coordinates {
          latitude
          longitude
        }
      }
      images
      inspectionTimes { id date startTime endTime type notes }
      agent { id name email avatar }
      createdAt
      updatedAt
    }
  }
`;

// Get properties near a specific location
export const GET_NEARBY_PROPERTIES = gql`
  query GetNearby($coordinates: CoordinatesInput!, $radius: Float!, $filters: PropertyFilters) {
    propertiesNearLocation(coordinates: $coordinates, radius: $radius, filters: $filters) {
      id
      title
      type
      listingType
      salePrice
      rentPrice
      location { address city }
      images
    }
  }
`;

// Search properties with text query (full fields for consistency)
export const SEARCH_PROPERTIES = gql`
  query SearchProperties($query: String!, $filters: PropertyFilters) {
    searchProperties(query: $query, filters: $filters) {
      properties {
        id
        title
        description
        type
        listingType
        bedrooms
        bathrooms
        salePrice
        rentPrice
        propertySize
        landSize
        yearBuilt
        parking
        features
        condition
        orientation
        floorLevel
        totalFloors
        availableFrom
        leaseTerm
        bond
        views
        inquiries
        saves
        listingStatus
        status
        rejectionReason
        featured
        urgent
        contactPerson
        contactPhone
        contactEmail
        slug
        tags
        location { city state country suburb region }
        images
        agent { id name avatar email }
        createdAt
        updatedAt
      }
      totalCount
      hasNextPage
      hasPreviousPage
      currentPage
      totalPages
    }
  }
`;

export const GET_MY_PROPERTIES = gql`
  query GetMyProperties {
    myProperties {
      id
      title
      description
      type
      listingType
      bedrooms
      bathrooms
      salePrice
      rentPrice
      status
      rejectionReason
      listingStatus
      isActive
      images
      location {
        address
        city
        state
        country
      }
      agent {
        id
        name
        email
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_PENDING_PROPERTIES = gql`
  query GetPendingProperties {
    pendingProperties {
      id
      title
      description
      type
      listingType
      bedrooms
      bathrooms
      salePrice
      rentPrice
      status
      rejectionReason
      listingStatus
      images
      location {
        address
        city
        state
        country
      }
      agent {
        id
        name
        email
      }
      createdAt
      updatedAt
    }
  }
`;

// Re-export if needed
export default {
  GET_PROPERTIES,
  GET_PROPERTY,
  GET_NEARBY_PROPERTIES,
  SEARCH_PROPERTIES,
  GET_MY_PROPERTIES,
  GET_PENDING_PROPERTIES,
};