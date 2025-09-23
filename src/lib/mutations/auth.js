import { gql } from '@apollo/client';

// GraphQL mutation to sync user with backend
export const SYNC_USER_MUTATION = gql`
  mutation GoogleAuth($googleToken: String!) {
    googleAuth(googleToken: $googleToken) {
      id
      email
      name
      provider
      hasPassword
      token
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginWithEmail($email: String!, $password: String!) {
    loginWithEmail(email: $email, password: $password) {
      id
      email
      name
      provider
      hasPassword
      token
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterWithEmail(
    $email: String!
    $name: String!
    $password: String!
  ) {
    registerWithEmail(email: $email, name: $name, password: $password) {
      id
      email
      name
      provider
      hasPassword
      token
    }
  }
`;
