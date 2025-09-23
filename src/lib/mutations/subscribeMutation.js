import { gql } from "@apollo/client";

export const SUBSCRIBE_TO_PUSH = gql`
  mutation SubscribeToPush($input: PushSubscriptionInput!) {
    subscribeToPush(input: $input)
  }
`;
