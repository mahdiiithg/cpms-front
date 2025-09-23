import { gql } from '@apollo/client';

export const GET_ALL_PLANS = gql`
  query GetAllCardPlans {
    getAllCardPlans {
      id
      title
      price
      type
      description
      countOfClasses
      features {
        icon
        name
      }
    }
  }
`;
