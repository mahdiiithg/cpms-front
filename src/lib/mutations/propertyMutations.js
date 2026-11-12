import { gql } from '@apollo/client';

const PROPERTY_CORE = `
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
  features
  location {
    address
    city
    state
    country
    zipCode
    coordinates {
      latitude
      longitude
    }
  }
  agent {
    id
    name
    email
  }
  createdAt
  updatedAt
`;

export const CREATE_PROPERTY = gql`
  mutation CreateProperty($input: PropertyInput!) {
    createProperty(input: $input) {
      ${PROPERTY_CORE}
    }
  }
`;

export const UPDATE_PROPERTY = gql`
  mutation UpdateProperty($id: ID!, $input: PropertyInput!) {
    updateProperty(id: $id, input: $input) {
      ${PROPERTY_CORE}
    }
  }
`;

export const DELETE_PROPERTY = gql`
  mutation DeleteProperty($id: ID!) {
    deleteProperty(id: $id)
  }
`;

export const APPROVE_PROPERTY = gql`
  mutation ApproveProperty($id: ID!) {
    approveProperty(id: $id) {
      ${PROPERTY_CORE}
    }
  }
`;

export const REJECT_PROPERTY = gql`
  mutation RejectProperty($id: ID!, $reason: String!) {
    rejectProperty(id: $id, reason: $reason) {
      ${PROPERTY_CORE}
    }
  }
`;
