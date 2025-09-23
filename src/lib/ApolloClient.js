import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

export const getClient = (token) => {
  const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}/graphql`,
    fetch,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { authorization: `Bearer ${token}` }),
    },
  });

  return new ApolloClient({
    ssrMode: true,
    link: httpLink,
    cache: new InMemoryCache(),
  });
};
