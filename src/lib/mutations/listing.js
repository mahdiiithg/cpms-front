import { gql } from '@apollo/client';

/** Slim create mutation for seller list flow (string image URLs / data URLs). */
export const CREATE_LISTING = gql`
  mutation CreateListing($input: PropertyInput!) {
    createProperty(input: $input) {
      id
      title
      description
      type
      listingType
      salePrice
      rentPrice
      bedrooms
      bathrooms
      images
      location {
        address
        city
        state
        country
        zipCode
      }
    }
  }
`;
