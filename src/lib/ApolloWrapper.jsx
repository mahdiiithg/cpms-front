'use client';

import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';

export const ApolloWrapper = ({ children }) => {
  const { data: session } = useSession();

  const client = useMemo(() => {
    const httpLink = createHttpLink({
      uri: `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}/graphql`,
    });

    const authLink = setContext((_, { headers }) => {
      const token = session?.token;

      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
        },
      };
    });

    const link = authLink.concat(httpLink);

    return new ApolloClient({
      link,
      cache: new InMemoryCache(),
    });
  }, [session?.token]);

  // Do not gate the tree on session status — public property pages must render
  // even when /api/auth/session fails or is still loading.
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
